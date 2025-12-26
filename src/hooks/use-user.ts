"use client";

import { User } from "@/types";

// 사용자 정보 훅 (Phase 2에서 구현)
export function useUser() {
  // 현재 사용자 정보 가져오기
  return {
    user: null as User | null,
    loading: true,
    error: null,
  };
}
