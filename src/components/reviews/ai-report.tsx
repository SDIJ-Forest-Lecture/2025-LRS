import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/types";
import { Gauge, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

interface AIReportProps {
    review: Review;
}

export function AIReport({ review }: AIReportProps) {
    if (review.status !== 'evaluated') return null;

    const scoreColor = (score: number) => {
        if (score >= 0.8) return "text-green-600";
        if (score >= 0.6) return "text-yellow-600";
        return "text-red-600";
    };

    const GradeColor = {
        'A': 'bg-green-100 text-green-800 border-green-200',
        'B': 'bg-blue-100 text-blue-800 border-blue-200',
        'C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'D': 'bg-red-100 text-red-800 border-red-200'
    }

    return (
        <Card className="mb-6 border-2 border-primary/20 shadow-lg">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                        <Gauge className="h-5 w-5 text-primary" />
                        AI 품질 분석 리포트
                    </CardTitle>
                    <div className={`text-2xl font-black px-4 py-1 rounded-xl border ${GradeColor[review.evaluation_grade || 'C']}`}>
                        Grade {review.evaluation_grade}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">구체성</div>
                        <div className={`text-xl font-bold ${scoreColor(review.specificity_score || 0)}`}>
                            {Math.round((review.specificity_score || 0) * 100)}점
                        </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">논리성</div>
                        <div className={`text-xl font-bold ${scoreColor(review.logic_score || 0)}`}>
                            {Math.round((review.logic_score || 0) * 100)}점
                        </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">근거 기반</div>
                        <div className={`text-xl font-bold ${scoreColor(review.evidence_score || 0)}`}>
                            {Math.round((review.evidence_score || 0) * 100)}점
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm mb-1">잘한 점</h4>
                            <p className="text-sm text-muted-foreground">{review.strengths}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm mb-1">부족한 점</h4>
                            <p className="text-sm text-muted-foreground">{review.weaknesses}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm mb-1">개선 팁</h4>
                            <p className="text-sm text-muted-foreground">{review.improvement_tips}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
