import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssignmentControls } from "@/components/admin/assignments/assignment-controls";

export default async function AssignmentsPage() {
  const supabase = await createClient();

  // Fetch week settings to populate dropdown (passed to client component or handled via URL params)
  // For simplicity, let's fetch the latest active week or just list all weeks?
  // Let's list active weeks.

  const { data: weeks } = await supabase.from('week_settings').select('*').order('week_number', { ascending: false });
  const currentWeek = weeks?.[0]?.week_number || 1; // Default to latest

  // Fetch Stats for current week
  const { count: appCount } = await supabase.from('applications').select('*', { count: 'exact', head: true }).eq('week_number', currentWeek);
  const { count: assignCount } = await supabase.from('assignments').select('*', { count: 'exact', head: true }).eq('week_number', currentWeek);

  // Fetch details
  const { data: assignments } = await supabase
    .from('assignments')
    .select('*, users(name), lectures(title)')
    .eq('week_number', currentWeek);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">배정 관리 (Week {currentWeek})</h2>
        <AssignmentControls weekNumber={currentWeek} hasAssignments={!!assignCount && assignCount > 0} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">총 신청자</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{appCount || 0}명</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">배정 완료</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{assignCount || 0}건</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>배정 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>배정 강의</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments?.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.users?.name}</TableCell>
                  <TableCell>{a.lectures?.title}</TableCell>
                  <TableCell>배정됨</TableCell>
                </TableRow>
              ))}
              {assignments?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">배정 데이터가 없습니다.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
