import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">분석 및 리포트</h2>
          <p className="text-muted-foreground">강의평 분석 및 PDF 리포트 생성</p>
        </div>
        <Button>PDF 리포트 생성</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>강사별 평가 분석</CardTitle>
          <CardDescription>강사 선택 후 평가 추이를 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">분석 데이터가 여기에 표시됩니다.</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>평균 점수 추이</CardTitle>
            <CardDescription>주차별 평균 점수</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">그래프가 여기에 표시됩니다.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>등급 분포</CardTitle>
            <CardDescription>A/B/C/D 등급 비율</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">차트가 여기에 표시됩니다.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
