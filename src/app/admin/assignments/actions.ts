'use server'

import { createClient } from "@/lib/supabase/server";
import { runAutoAssignment } from "@/lib/assignment-algorithm";
import { revalidatePath } from "next/cache";

export async function executeAutoAssignment(weekNumber: number) {
    const supabase = await createClient();

    try {
        const assignments = await runAutoAssignment(weekNumber);

        // Save to DB
        // 1. Transaction-like update? Supabase doesn't support easy transactions via JS client for complex logic.
        // We will loop and insert.

        let successCount = 0;

        // Get all application IDs map
        const { data: apps } = await supabase
            .from('applications')
            .select('id, user_id')
            .eq('week_number', weekNumber);

        if (!apps) throw new Error("No applications found to link.");
        const appMap = new Map(apps.map(a => [a.user_id, a.id]));

        for (const result of assignments) {
            const appId = appMap.get(result.userId);
            if (!appId) continue;

            for (const lecId of result.lectureIds) {
                // Insert assignment
                const { error } = await supabase.from('assignments').insert({
                    application_id: appId,
                    user_id: result.userId,
                    lecture_id: lecId,
                    week_number: weekNumber
                });
                if (!error) successCount++;
            }

            // Update application status
            await supabase.from('applications')
                .update({ status: 'assigned' })
                .eq('id', appId);
        }

        revalidatePath('/admin/assignments');
        return { success: true, count: successCount };

    } catch (e: any) {
        return { error: e.message };
    }
}

export async function clearAssignments(weekNumber: number) {
    const supabase = await createClient();

    // Delete assignments for this week
    const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('week_number', weekNumber);

    if (error) return { error: error.message };

    // Reset application status to pending
    await supabase.from('applications')
        .update({ status: 'pending' })
        .eq('week_number', weekNumber);

    revalidatePath('/admin/assignments');
    return { success: true };
}
