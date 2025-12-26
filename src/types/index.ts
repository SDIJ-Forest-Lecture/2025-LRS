// 공통 타입 정의

export type UserRole = "member" | "operator" | "admin";
export type ApplicationStatus = "pending" | "assigned" | "cancelled";
export type ReviewStatus = "draft" | "submitted" | "evaluated";
export type AttendanceStatus = "present" | "late" | "absent";
export type GradeType = "A" | "B" | "C" | "D";

// 사용자
export interface User {
  id: string;
  auth_id: string;
  phone: string;
  email?: string;
  name: string;
  role: UserRole;
  is_active: boolean;
  total_assignments: number;
  created_at: string;
  updated_at: string;
}

// 과목
export interface Subject {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

// 강사
export interface Instructor {
  id: string;
  name: string;
  subject_id?: string;
  bio?: string;
  created_at: string;
}

// 강의
export interface Lecture {
  id: string;
  subject_id?: string;
  instructor_id?: string;
  title: string;
  kollus_code?: string;
  duration_minutes?: number;
  week_number: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 주차 설정
export interface WeekSetting {
  id: string;
  week_number: number;
  year: number;
  application_start: string;
  application_end: string;
  review_deadline: string;
  is_active: boolean;
  created_at: string;
}

// 신청
export interface Application {
  id: string;
  user_id: string;
  week_number: number;
  subject_id: string;
  requested_count: number;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

// 배정
export interface Assignment {
  id: string;
  application_id?: string;
  user_id: string;
  lecture_id: string;
  kollus_access_code?: string;
  week_number: number;
  watched_at?: string;
  assigned_at: string;
}

// 타임스탬프
export interface Timestamp {
  time: string;
  content: string;
}

// 강의평
export interface Review {
  id: string;
  assignment_id: string;
  user_id: string;
  total_score: number;
  content_review: string;
  delivery_review: string;
  structure_review: string;
  overall_review: string;
  timestamps: any[]; // JSONB
  status: 'draft' | 'submitted' | 'evaluated' | 'rejected';
  submitted_at?: string;
  evaluated_at?: string;

  // AI Evaluation Fields
  evaluation_grade?: 'A' | 'B' | 'C' | 'D';
  specificity_score?: number;
  logic_score?: number;
  evidence_score?: number;
  strengths?: string;
  weaknesses?: string;
  improvement_tips?: string;

  created_at: string;
  updated_at: string;
}

// AI 평가
export interface Evaluation {
  id: string;
  review_id: string;
  grade: GradeType;
  specificity_score: number;
  logic_score: number;
  evidence_score: number;
  strengths: string;
  weaknesses: string;
  suggestions: string;
  raw_response?: any;
  model_version?: string;
  evaluated_at: string;
}

// 출결
export interface Attendance {
  id: string;
  user_id: string;
  week_number: number;
  status: AttendanceStatus;
  note?: string;
  created_at: string;
  updated_at: string;
}
