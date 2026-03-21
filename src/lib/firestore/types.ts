export type ToolKey =
  | "instagram-downloader"
  | "youtube-scheduler"
  | "tiktok-scheduler"
  | "tiktok-viewer";

export type JobStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type ScheduleStatus = "draft" | "scheduled" | "published" | "failed";

export type PlatformProvider = "youtube" | "tiktok";

export interface UserDocument {
  id: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  role: "user" | "admin";
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectedAccountDocument {
  id: string;
  userId: string;
  provider: PlatformProvider;
  providerAccountId: string;
  channelName?: string;
  tokenCiphertext: string;
  refreshTokenCiphertext?: string;
  tokenExpiresAt?: string;
  status: "active" | "expired" | "revoked";
  createdAt: string;
  updatedAt: string;
}

export interface JobDocument<TPayload = Record<string, unknown>> {
  id: string;
  userId: string;
  tool: ToolKey;
  status: JobStatus;
  payload: TPayload;
  progress: number;
  message?: string;
  idempotencyKey?: string;
  resultUrl?: string;
  errorCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleDocument {
  id: string;
  userId: string;
  provider: PlatformProvider;
  connectedAccountId: string;
  sourceType: "upload" | "url" | "vps_path";
  sourceValue: string;
  title: string;
  description?: string;
  hashtags?: string[];
  scheduledAtUtc: string;
  timezone: string;
  status: ScheduleStatus;
  publishJobId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogDocument {
  id: string;
  userId: string;
  action: string;
  targetType: "job" | "schedule" | "account" | "auth";
  targetId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

