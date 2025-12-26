"use client";

import { Review } from "@/types";

// 강의평 관련 훅 (Phase 5에서 구현)
export function useReviews() {
  // 강의평 목록 가져오기
  return {
    reviews: [] as Review[],
    loading: true,
    error: null,
    createReview: async () => {},
    updateReview: async () => {},
    submitReview: async () => {},
  };
}
