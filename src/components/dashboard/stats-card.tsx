import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 통계 카드 컴포넌트
interface StatsCardProps {
  title: string;
  description: string;
  value: string | number;
}

export function StatsCard({ title, description, value }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
