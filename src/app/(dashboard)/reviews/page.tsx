import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">강의평 목록</h2>
        <p className="text-muted-foreground">작성한 강의평을 확인하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>내 강의평</CardTitle>
          <CardDescription>제출한 강의평과 평가 결과를 확인할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">강의평 목록이 여기에 표시됩니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}
