import { NextResponse } from "next/server";

import { getServerSession } from "@/lib/auth/session";

export async function requireApiUser() {
  const session = await getServerSession();

  if (!session) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return {
    session,
    error: null,
  };
}

