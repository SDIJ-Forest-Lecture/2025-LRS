import { NextResponse } from "next/server";

// 인증 관련 API
export async function POST(request: Request) {
  return NextResponse.json({ message: "Auth API - 구현 예정" });
}
