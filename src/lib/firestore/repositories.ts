import type {
  AuditLogDocument,
  ConnectedAccountDocument,
  JobDocument,
  ScheduleDocument,
  UserDocument,
} from "@/lib/firestore/types";

type MemoryStore = {
  users: Record<string, UserDocument>;
  connectedAccounts: Record<string, ConnectedAccountDocument>;
  jobs: Record<string, JobDocument>;
  schedules: Record<string, ScheduleDocument>;
  auditLogs: AuditLogDocument[];
};

const memoryStore: MemoryStore =
  (globalThis as { __sketoolsMemoryStore?: MemoryStore }).__sketoolsMemoryStore ?? {
    users: {},
    connectedAccounts: {},
    jobs: {},
    schedules: {},
    auditLogs: [],
  };

(globalThis as { __sketoolsMemoryStore?: MemoryStore }).__sketoolsMemoryStore = memoryStore;

function nowIso() {
  return new Date().toISOString();
}

export async function upsertUserProfile(input: {
  id: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  timezone?: string;
}) {
  const nextUser: UserDocument = {
    id: input.id,
    email: input.email,
    displayName: input.displayName,
    photoUrl: input.photoUrl,
    role: memoryStore.users[input.id]?.role ?? "user",
    timezone: input.timezone ?? memoryStore.users[input.id]?.timezone ?? "Asia/Jakarta",
    createdAt: memoryStore.users[input.id]?.createdAt ?? nowIso(),
    updatedAt: nowIso(),
  };

  memoryStore.users[input.id] = nextUser;
  return nextUser;
}

export async function createJob(
  userId: string,
  job: Omit<JobDocument, "id" | "userId" | "createdAt" | "updatedAt">
) {
  const id = crypto.randomUUID();

  const payload: JobDocument = {
    id,
    userId,
    ...job,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  memoryStore.jobs[id] = payload;
  return payload;
}

export async function createSchedule(
  userId: string,
  schedule: Omit<ScheduleDocument, "id" | "userId" | "createdAt" | "updatedAt">
) {
  const id = crypto.randomUUID();

  const payload: ScheduleDocument = {
    id,
    userId,
    ...schedule,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  memoryStore.schedules[id] = payload;
  return payload;
}

export async function listConnectedAccounts(userId: string) {
  return Object.values(memoryStore.connectedAccounts)
    .filter((account) => account.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function upsertConnectedAccount(
  input: Omit<ConnectedAccountDocument, "createdAt" | "updatedAt">
) {
  const payload: ConnectedAccountDocument = {
    ...input,
    createdAt: memoryStore.connectedAccounts[input.id]?.createdAt ?? nowIso(),
    updatedAt: nowIso(),
  };

  memoryStore.connectedAccounts[input.id] = payload;
  return payload;
}

export async function listRecentJobs(userId: string, limit = 20) {
  return Object.values(memoryStore.jobs)
    .filter((job) => job.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function writeAuditLog(log: Omit<AuditLogDocument, "id" | "createdAt">) {
  const id = crypto.randomUUID();
  const payload: AuditLogDocument = {
    id,
    ...log,
    createdAt: nowIso(),
  };
  memoryStore.auditLogs.push(payload);
  return payload;
}
