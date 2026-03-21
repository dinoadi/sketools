import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { createSchedule, writeAuditLog } from "@/lib/firestore/repositories";

export async function POST(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const body = await request.json();
  const { provider, videoUrl, title, description, scheduleTime, connectedAccountId } = body;

  if (!provider || !videoUrl || !title || !scheduleTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const schedule = await createSchedule(session.uid, {
    provider,
    connectedAccountId: connectedAccountId || "",
    sourceType: "url",
    sourceValue: videoUrl,
    title,
    description,
    scheduledAtUtc: scheduleTime,
    timezone: "Asia/Jakarta",
    status: "draft",
  });

  await writeAuditLog({
    userId: session.uid,
    action: "schedule.create",
    targetType: "schedule",
    targetId: schedule.id,
    metadata: {
      provider,
      scheduleTime,
    },
  });

  return NextResponse.json({ success: true, schedule });
}
