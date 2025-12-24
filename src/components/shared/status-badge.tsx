import { Badge } from "@/components/ui/badge";

// 상태 배지 컴포넌트
type StatusType = "pending" | "assigned" | "submitted" | "evaluated";

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const labels: Record<StatusType, string> = {
    pending: "대기중",
    assigned: "배정됨",
    submitted: "제출완료",
    evaluated: "평가완료",
  };

  const variants: Record<StatusType, "default" | "secondary" | "outline"> = {
    pending: "outline",
    assigned: "secondary",
    submitted: "default",
    evaluated: "default",
  };

  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
