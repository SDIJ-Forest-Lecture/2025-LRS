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

    let currentReviewId = reviewId;

    if (reviewId && reviewId !== 'new') {
        // Update
        const res = await supabase
            .from('reviews')
            .update(payload)
            .eq('id', reviewId);
        error = res.error;
    } else {
        // Create
        // Need to return data to get ID
        const res = await supabase.from('reviews').insert(payload).select('id').single();
        error = res.error;
        if (res.data) {
            currentReviewId = res.data.id;
        }
    }

    if (error || !currentReviewId) {
        return { error: error?.message || "Creation failed" };
    }

    revalidatePath('/assignments');
    revalidatePath(`/reviews/${currentReviewId}`);

    if (isSubmit) {
        // Trigger AI Evaluation immediately (awaiting it for simplicity as traffic is low)
        try {
            // Need to fetch full data for AI
            const { data: fullReview } = await supabase.from('reviews').select('*').eq('id', currentReviewId).single();
            const { data: assignment } = await supabase
                .from('assignments')
                .select('*, lectures(*, subjects(*), instructors(*))')
                .eq('id', assignmentId)
                .single();

            if (fullReview && assignment && assignment.lectures) {
                const { evaluateReview } = await import('@/lib/openai');
                const evalResult = await evaluateReview(fullReview, assignment.lectures);

                if (evalResult) {
                    await supabase.from('reviews').update({
                        evaluation_grade: evalResult.grade,
                        specificity_score: evalResult.specificity_score,
                        logic_score: evalResult.logic_score,
                        evidence_score: evalResult.evidence_score,
                        strengths: evalResult.strengths,
                        weaknesses: evalResult.weaknesses,
                        improvement_tips: evalResult.suggestions,
                        status: 'evaluated', // Update status to evaluated
                        evaluated_at: new Date().toISOString()
                    }).eq('id', currentReviewId);
                }
            }
        } catch (aiError) {
            console.error("AI Trigger Failed", aiError);
            // Do not fail the submission itself, just log
        }

        redirect('/assignments');
    }

    return { success: true };
}
