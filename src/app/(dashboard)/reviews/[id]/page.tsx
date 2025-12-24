import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">강의평 작성</h2>
        <p className="text-muted-foreground">강의를 시청하고 평가를 작성하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>강의 정보</CardTitle>
          <CardDescription>강의 ID: {params.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">강의평 작성 폼이 여기에 표시됩니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}
