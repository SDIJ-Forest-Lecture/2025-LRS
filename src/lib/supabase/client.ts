import { createBrowserClient } from "@supabase/ssr";

// 브라우저용 Supabase 클라이언트 (Phase 1.4에서 구현 예정)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
