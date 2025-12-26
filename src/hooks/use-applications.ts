"use client";

import { Application } from "@/types";

// 신청 관련 훅 (Phase 3에서 구현)
export function useApplications() {
  // 신청 목록 가져오기
  return {
    applications: [] as Application[],
    loading: true,
    error: null,
    createApplication: async () => {},
    updateApplication: async () => {},
    deleteApplication: async () => {},
  };
}
