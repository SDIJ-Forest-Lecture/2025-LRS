import { Badge } from "@/components/ui/badge";

// 등급 배지 컴포넌트
type GradeType = "A" | "B" | "C" | "D";

interface GradeBadgeProps {
  grade: GradeType;
}

export function GradeBadge({ grade }: GradeBadgeProps) {
  const variants: Record<GradeType, string> = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-amber-500",
    D: "bg-red-500",
  };

  return (
    <Badge className={variants[grade]}>
      {grade}
    </Badge>
  );
}
