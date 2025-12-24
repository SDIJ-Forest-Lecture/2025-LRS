import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
        <p className="text-muted-foreground">강의체험단 활동 현황을 확인하세요</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>이번 주 신청</CardTitle>
            <CardDescription>신청한 강의 수</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>배정 강의</CardTitle>
            <CardDescription>시청할 강의 수</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>제출 완료</CardTitle>
            <CardDescription>작성한 강의평</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>출석률</CardTitle>
            <CardDescription>전체 출석 비율</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
