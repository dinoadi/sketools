import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/auth/api-user";
import { createJob, listRecentJobs, writeAuditLog } from "@/lib/firestore/repositories";
import type { JobDocument, ToolKey } from "@/lib/firestore/types";

type CreateJobRequestBody = {
  tool: ToolKey;
  payload?: Record<string, unknown>;
  idempotencyKey?: string;
};

export async function GET() {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const jobs = await listRecentJobs(session.uid, 30);
  return NextResponse.json({ jobs });
}

export async function POST(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const body = (await request.json()) as CreateJobRequestBody;

  if (!body.tool) {
    return NextResponse.json({ error: "tool is required" }, { status: 400 });
  }

  const created = await createJob(session.uid, {
    tool: body.tool,
    status: "queued",
    payload: body.payload ?? {},
    progress: 0,
    message: "Job queued",
    idempotencyKey: body.idempotencyKey,
  } satisfies Omit<JobDocument, "id" | "userId" | "createdAt" | "updatedAt">);

  await writeAuditLog({
    userId: session.uid,
    action: "job.create",
    targetType: "job",
    targetId: created.id,
    metadata: {
      tool: created.tool,
      status: created.status,
    },
  });

  return NextResponse.json({ job: created }, { status: 201 });
}

