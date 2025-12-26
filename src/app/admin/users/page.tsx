import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">사용자 관리</h2>
          <p className="text-muted-foreground">사용자를 관리하고 새 계정을 생성하세요</p>
        </div>
        <Button>새 사용자 추가</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>전체 사용자 및 권한 관리</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">사용자 테이블이 여기에 표시됩니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}
