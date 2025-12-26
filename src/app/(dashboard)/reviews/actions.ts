'use server'

import { createClient } from "@/lib/supabase/server";
import { reviewSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

type ReviewInput = z.infer<typeof reviewSchema>;

export async function saveReview(
    assignmentId: string,
    reviewId: string | undefined,
    data: ReviewInput,
    isSubmit: boolean = false
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const { data: userData } = await supabase.from('users').select('id').eq('auth_id', user.id).single();

    const payload = {
        assignment_id: assignmentId,
        user_id: userData!.id,
        total_score: data.total_score,
        content_review: data.content_review,
        delivery_review: data.delivery_review,
        structure_review: data.structure_review,
        overall_review: data.overall_review,
        timestamps: JSON.stringify(data.timestamps), // Store as JSONB in DB
        status: isSubmit ? 'submitted' : 'draft',
        submitted_at: isSubmit ? new Date().toISOString() : null
    };

    let error;

    if (reviewId && reviewId !== 'new') {
        // Update
        const res = await supabase
            .from('reviews')
            .update(payload)
            .eq('id', reviewId);
        error = res.error;
    } else {
        // Create - check if exists first to avoid dupes if 'new' is used carelessly? 
        // Rely on unique constraints or upsert? 
        // assignment_id is unique? No, assignment_id -> review is 1:1 roughly? Schema says assignment_id FK.
        // Schema doesn't strictly enforce UNIQUE(assignment_id) but one assignment usually has one review.

        const res = await supabase.from('reviews').insert(payload).select('id').single();
        error = res.error;
        // if successful, we could return new ID to redirect.
    }

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/assignments');
    revalidatePath(`/reviews/${reviewId}`);

    if (isSubmit) {
        redirect('/assignments');
    }

    return { success: true };
}
