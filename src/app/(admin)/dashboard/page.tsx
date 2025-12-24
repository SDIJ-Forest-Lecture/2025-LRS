import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">관리자 대시보드</h2>
        <p className="text-muted-foreground">전체 시스템 현황을 확인하세요</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>총 신청자</CardTitle>
            <CardDescription>이번 주</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>배정 완료</CardTitle>
            <CardDescription>자동 배정 완료</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>제출 완료</CardTitle>
            <CardDescription>강의평 제출</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>평가 완료</CardTitle>
            <CardDescription>AI 평가 완료</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>시스템 활동 로그</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">활동 로그가 여기에 표시됩니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}
