import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>LRS 강의체험단 시스템에 오신 것을 환영합니다</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">로그인 폼이 여기에 표시됩니다.</p>
      </CardContent>
    </Card>
  );
}
