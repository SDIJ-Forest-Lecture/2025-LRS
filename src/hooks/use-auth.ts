"use client";

// 인증 관련 훅 (Phase 2에서 구현)
export function useAuth() {
  // Supabase 인증 로직 구현 예정
  return {
    user: null,
    session: null,
    loading: true,
    signIn: async () => {},
    signOut: async () => {},
  };
}
