import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">내 강의 목록</h2>
        <p className="text-muted-foreground">배정받은 강의를 확인하고 시청하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>배정된 강의</CardTitle>
          <CardDescription>시청 후 강의평을 작성해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">강의 목록이 여기에 표시됩니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}
