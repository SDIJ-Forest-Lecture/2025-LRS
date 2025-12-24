import { Badge } from "@/components/ui/badge";

// 출결 배지 컴포넌트
type AttendanceType = "present" | "late" | "absent";

interface AttendanceBadgeProps {
  status: AttendanceType;
}

export function AttendanceBadge({ status }: AttendanceBadgeProps) {
  const labels: Record<AttendanceType, string> = {
    present: "출석",
    late: "지각",
    absent: "결석",
  };

  const variants: Record<AttendanceType, string> = {
    present: "bg-green-500",
    late: "bg-amber-500",
    absent: "bg-red-500",
  };

  return (
    <Badge className={variants[status]}>
      {labels[status]}
    </Badge>
  );
}
