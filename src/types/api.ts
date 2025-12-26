// API 요청/응답 타입

// 공통 응답
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 신청 요청
export interface CreateApplicationRequest {
  subject_id: string;
  requested_count: number;
}

// 강의평 요청
export interface CreateReviewRequest {
  assignment_id: string;
  total_score: number;
  timestamps: { time: string; content: string }[];
  content_review: string;
  delivery_review: string;
  structure_review: string;
  overall_review: string;
}

// AI 평가 요청
export interface EvaluateReviewRequest {
  review_id: string;
}

// AI 평가 응답
export interface EvaluateReviewResponse {
  grade: "A" | "B" | "C" | "D";
  specificity_score: number;
  logic_score: number;
  evidence_score: number;
  strengths: string;
  weaknesses: string;
  suggestions: string;
}
