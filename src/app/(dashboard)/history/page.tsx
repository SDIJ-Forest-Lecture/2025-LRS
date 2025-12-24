import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">내 이력</h2>
        <p className="text-muted-foreground">활동 이력을 확인하세요</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">신청 내역</TabsTrigger>
          <TabsTrigger value="reviews">제출 내역</TabsTrigger>
          <TabsTrigger value="attendance">출결</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>신청 내역</CardTitle>
              <CardDescription>과거 신청한 강의 목록</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">신청 내역이 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>제출 내역</CardTitle>
              <CardDescription>제출한 강의평과 평가 결과</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">제출 내역이 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>출결 현황</CardTitle>
              <CardDescription>주차별 출석 상태</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">출결 현황이 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
