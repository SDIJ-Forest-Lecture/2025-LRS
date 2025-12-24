import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">배정 관리</h2>
          <p className="text-muted-foreground">강의 자동 배정을 실행하고 관리하세요</p>
        </div>
        <Button>자동 배정 실행</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>신청 현황</CardTitle>
            <CardDescription>주차별 신청 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">신청 현황이 여기에 표시됩니다.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>배정 결과</CardTitle>
            <CardDescription>자동 배정 결과</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">배정 결과가 여기에 표시됩니다.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
