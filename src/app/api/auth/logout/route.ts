import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  await destroySession();
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET(request: NextRequest) {
  await destroySession();
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}
