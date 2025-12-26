import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LecturesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">강의 관리</h2>
          <p className="text-muted-foreground">과목, 강사, 강의를 관리하세요</p>
        </div>
      </div>

      <Tabs defaultValue="lectures" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lectures">강의</TabsTrigger>
          <TabsTrigger value="subjects">과목</TabsTrigger>
          <TabsTrigger value="instructors">강사</TabsTrigger>
        </TabsList>

        <TabsContent value="lectures" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>강의 목록</CardTitle>
                <CardDescription>주차별 강의 관리</CardDescription>
              </div>
              <Button>새 강의 추가</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">강의 목록이 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>과목 목록</CardTitle>
                <CardDescription>과목 관리</CardDescription>
              </div>
              <Button>새 과목 추가</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">과목 목록이 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructors" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>강사 목록</CardTitle>
                <CardDescription>강사 정보 관리</CardDescription>
              </div>
              <Button>새 강사 추가</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">강사 목록이 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
