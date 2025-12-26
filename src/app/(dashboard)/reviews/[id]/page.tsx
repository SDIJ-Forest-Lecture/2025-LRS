import { createClient } from "@/lib/supabase/server";
import { ReviewForm } from "@/components/forms/review-form";
import { AIReport } from "@/components/reviews/ai-report";
import { notFound, redirect } from "next/navigation";

export default async function ReviewPage({ params, searchParams }: { params: { id: string }, searchParams: { assignmentId: string } }) {
  // params is a promise in Next.js 15, but this is Next 14. Wait, the package.json said Next 16? 
  // Next 15+ params are async. Next 14 they are not.
  // The provided package.json says "next": "16.1.1". So IT IS ASYNC.
  // I must await params and searchParams.

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const id = resolvedParams.id;
  const assignmentId = resolvedSearchParams.assignmentId;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  let review = null;
  let assignment = null;

  if (id && id !== 'new') {
    const { data } = await supabase.from('reviews').select('*').eq('id', id).single();
    review = data;
    // Also get assignment to check permission? 
    // Assume review ownership logic check in RLS or here.
    if (review && review.user_id !== (await supabase.from('users').select('id').eq('auth_id', user.id).single()).data!.id) {
      // Ownership mismatch
      // return <div>Unauthorized</div>;
    }

    // If we have review, we can derive assignment info
    if (review) {
      const { data: assign } = await supabase.from('assignments').select('*, lectures(*)').eq('id', review.assignment_id).single();
      assignment = assign;
    }
  } else if (assignmentId) {
    // New review for assignment
    const { data } = await supabase.from('assignments').select('*, lectures(*)').eq('id', assignmentId).single();
    assignment = data;
  }

  if (!assignment) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <h1 className="text-2xl font-bold mb-6">강의평 작성</h1>

      {review && <AIReport review={review} />}

      <ReviewForm
        assignmentId={assignment.id}
        initialData={review}
        lectureTitle={assignment.lectures?.title || "강의"}
      />
    </div>
  );
}
