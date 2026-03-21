import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { createSchedule, writeAuditLog } from "@/lib/firestore/repositories";

export async function POST(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const body = await request.json();
  const { platform, videoUrl, title, description, scheduleTime } = body;

  if (!platform || !videoUrl || !title || !scheduleTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const schedule = await createSchedule(session.uid, {
    platform,
    videoUrl,
    title,
    description,
    scheduleTime,
    status: "pending",
    metadata: {
      originalUrl: videoUrl,
    },
  });

  await writeAuditLog({
    userId: session.uid,
    action: "schedule.create",
    targetType: "schedule",
    targetId: schedule.id,
    metadata: {
      platform,
      scheduleTime,
    },
  });

  return NextResponse.json({ success: true, schedule });
}
