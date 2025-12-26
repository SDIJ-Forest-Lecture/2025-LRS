import OpenAI from 'openai';
import { Review, Lecture, Subject, Instructor, User } from '@/types';

// 싱글톤 인스턴스 (Server Side Only)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface EvaluationResult {
    grade: 'A' | 'B' | 'C' | 'D';
    specificity_score: number;
    logic_score: number;
    evidence_score: number;
    strengths: string;
    weaknesses: string;
    suggestions: string;
}

export async function evaluateReview(
    review: Review,
    lecture: Lecture & { subjects: Subject | null, instructors: Instructor | null }
): Promise<EvaluationResult | null> {
    if (!process.env.OPENAI_API_KEY) {
        console.error("Missing OPENAI_API_KEY");
        return null;
    }

    const prompt = `
당신은 강의 품질 평가 전문가입니다. 제출된 강의평을 다음 기준으로 평가합니다:

1. 구체성 (0.0~1.0): 구체적인 예시와 근거가 포함되어 있는가?
2. 논리성 (0.0~1.0): 평가 내용이 논리적으로 구성되어 있는가?
3. 근거 기반 (0.0~1.0): 실제 강의 시청 내용을 기반으로 작성되었는가? (타임스탬프 등 활용 여부)

[강의 정보]
과목: ${lecture.subjects?.name || '미정'}
강사: ${lecture.instructors?.name || '미정'}
강의명: ${lecture.title}
영상 길이: ${lecture.duration_minutes || '?'}분

[강의평 내용]
총점: ${review.total_score}점
타임스탬프 개수: ${review.timestamps?.length || 0}개
강의 내용 평가: ${review.content_review}
전달력 평가: ${review.delivery_review}
구조 평가: ${review.structure_review}
종합 평가: ${review.overall_review}

평가 후 다음 형식의 JSON으로만 응답해주세요 (마크다운 코드블록 없이):
{
  "grade": "A" | "B" | "C" | "D",
  "specificity_score": 0.0,
  "logic_score": 0.0,
  "evidence_score": 0.0,
  "strengths": "잘한 점 (한국어, 명확하게)",
  "weaknesses": "부족한 점 (한국어, 명확하게)",
  "suggestions": "개선 방향 (한국어, 명확하게)"
}

등급 기준 (엄격하게 평가):
- A: 구체성, 논리성, 근거 기반 모두 우수 (평균 0.85 이상)
- B: 대체로 양호하나 일부 부족 (평균 0.70 이상)
- C: 형식은 갖췄으나 내용이 평이함 (평균 0.50 이상)
- D: 내용이 부실하거나 성의 없음 (평균 0.50 미만)
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a strict lecture review evaluator. Response in JSON only." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2, // Consistent results
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("No content from OpenAI");

        const result = JSON.parse(content) as EvaluationResult;
        return result;

    } catch (error) {
        console.error("AI Evaluation Error:", error);
        return null;
    }
}
