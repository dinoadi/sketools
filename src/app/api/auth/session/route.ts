import { NextResponse } from "next/server";

import {
  getDevSessionValue,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 5;

type SessionRequestBody = {
  email?: string;
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SessionRequestBody;

    // Hanya izinkan admin/admin atau email admin@admin.com dengan password admin
    const isAdmin = (body.username === "admin" || body.email === "admin@admin.com") && body.password === "admin";

    if (isAdmin) {
      const response = NextResponse.json({ ok: true });
      response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: getDevSessionValue(),
        maxAge: EXPIRES_IN / 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
      return response;
    }

    return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid authentication payload" }, { status: 401 });
  }
}

export function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return response;
}
