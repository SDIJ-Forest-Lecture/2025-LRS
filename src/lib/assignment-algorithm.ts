import { createClient } from "@/lib/supabase/server";

interface AssignmentResult {
    userId: string;
    lectureIds: string[];
}

export async function runAutoAssignment(weekNumber: number) {
    const supabase = await createClient();

    // 1. Fetch Applications for the week
    const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('*')
        .eq('week_number', weekNumber)
        .eq('status', 'pending');

    if (appError || !applications) {
        throw new Error(`Failed to fetch applications: ${appError?.message}`);
    }

    // 2. Fetch Active Lectures for the week
    const { data: lectures, error: lecError } = await supabase
        .from('lectures')
        .select('*')
        .eq('week_number', weekNumber)
        .eq('is_active', true);

    if (lecError || !lectures) {
        throw new Error(`Failed to fetch lectures: ${lecError?.message}`);
    }

    if (lectures.length === 0) {
        throw new Error("No active lectures found for this week.");
    }

    // 3. Algorithm: Balanced Random Distribution
    const assignments: AssignmentResult[] = [];
    const lectureCounts: Record<string, number> = {};
    lectures.forEach(l => lectureCounts[l.id] = 0);

    // Helper to get lectures sorted by least assigned
    const getSortedLectures = () => {
        return lectures.sort((a, b) => lectureCounts[a.id] - lectureCounts[b.id]);
    };

    for (const app of applications) {
        const requestedCount = app.requested_count;
        const userAssignments: string[] = [];

        // Simple greedy approach with randomness:
        // Try to pick 'requestedCount' lectures.
        // Prioritize lectures with fewer assignments to balance.
        // Avoid duplicates for the same user (obvious).

        let availableLectures = [...lectures];

        // Sort by count (asc) to balance, but add some randomness to avoid identical patterns
        // Random shuffle first, then sort stable? Or just Weighted random?
        // Let's stick to "Least Loaded First" strictly for balance in V1.
        // To prevent "First users always get Lecture A", we shuffle users? 
        // Yes, applications should be processed in random order ideally, but default order is fine for V1.

        availableLectures.sort((a, b) => lectureCounts[a.id] - lectureCounts[b.id]);

        for (let i = 0; i < requestedCount; i++) {
            // Filter out already picked
            const pool = availableLectures.filter(l => !userAssignments.includes(l.id));

            if (pool.length === 0) break;

            // Pick the one with min count. If tie, pick random among ties.
            const minCount = lectureCounts[pool[0].id];
            const candidates = pool.filter(l => lectureCounts[l.id] === minCount);
            const picked = candidates[Math.floor(Math.random() * candidates.length)];

            userAssignments.push(picked.id);
            lectureCounts[picked.id]++;
        }

        assignments.push({
            userId: app.user_id,
            lectureIds: userAssignments
        });
    }

    return assignments;
}
