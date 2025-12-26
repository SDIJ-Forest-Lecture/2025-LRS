// 애플리케이션 상수

export const APP_NAME = "LRS - Lecture Review System";
export const APP_DESCRIPTION = "강의체험단 운영 통합 관리 시스템";

// 사용자 역할
export const USER_ROLES = {
  MEMBER: "member",
  OPERATOR: "operator",
  ADMIN: "admin",
} as const;

// 신청 상태
export const APPLICATION_STATUS = {
  PENDING: "pending",
  ASSIGNED: "assigned",
  CANCELLED: "cancelled",
} as const;

// 강의평 상태
export const REVIEW_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  EVALUATED: "evaluated",
} as const;

// 출결 상태
export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  LATE: "late",
  ABSENT: "absent",
} as const;

// 등급
export const GRADES = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
} as const;

// 라우트
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  APPLICATIONS: "/applications",
  ASSIGNMENTS: "/assignments",
  REVIEWS: "/reviews",
  HISTORY: "/history",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_LECTURES: "/admin/lectures",
  ADMIN_ASSIGNMENTS: "/admin/assignments",
  ADMIN_ANALYTICS: "/admin/analytics",
} as const;
