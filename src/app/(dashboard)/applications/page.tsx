import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">강의 신청</h2>
        <p className="text-muted-foreground">이번 주 강의를 신청하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>신청 가능한 강의</CardTitle>
          <CardDescription>과목을 선택하고 수강할 강의 개수를 선택하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">신청 폼이 여기에 표시됩니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}
