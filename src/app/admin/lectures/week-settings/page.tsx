import { createClient } from "@/lib/supabase/server";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { CreateWeekSettingDialog } from "@/components/admin/lectures/create-week-setting-dialog";
import { ToggleWeekStatus } from "@/components/admin/lectures/toggle-week-status";

export default async function WeekSettingsPage() {
    const supabase = await createClient();

    const { data: weekSettings, error } = await supabase
        .from("week_settings")
        .select("*")
        .order("week_number", { ascending: false });

    if (error) {
        return <div>에러가 발생했습니다: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">주차 설정 관리</h2>
                <CreateWeekSettingDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>주차 목록</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>주차</TableHead>
                                <TableHead>신청 기간</TableHead>
                                <TableHead>리뷰 마감</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead>관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {weekSettings?.map((setting) => (
                                <TableRow key={setting.id}>
                                    <TableCell className="font-medium">{setting.week_number}주차</TableCell>
                                    <TableCell>
                                        {format(new Date(setting.application_start), "MM.dd HH:mm")} ~{" "}
                                        {format(new Date(setting.application_end), "MM.dd HH:mm")}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(setting.review_deadline), "MM.dd HH:mm")}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={setting.is_active ? 'default' : 'secondary'}>
                                            {setting.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <ToggleWeekStatus id={setting.id} isActive={setting.is_active} />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {weekSettings?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        등록된 주차 설정이 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
