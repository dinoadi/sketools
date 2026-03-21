# Supabase Repositories Code

File ini berisi kode untuk [`src/lib/supabase/repositories.ts`](src/lib/supabase/repositories.ts) yang menggantikan Firebase Firestore dengan Supabase PostgreSQL.

## Cara Menggunakan

1. Buat file baru: `src/lib/supabase/repositories.ts`
2. Copy kode di bawah ini ke file tersebut
3. Update import di file yang menggunakan Firestore repositories

## Kode Lengkap

```typescript
import { getSupabaseAdminClient } from './server';
import type {
  UserDocument,
  ConnectedAccountDocument,
  JobDocument,
  ScheduleDocument,
  AuditLogDocument,
} from '@/lib/firestore/types';

function nowIso() {
  return new Date().toISOString();
}

/**
 * User Profile Operations
 */
export async function upsertUserProfile(input: {
  id: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  timezone?: string;
}) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: input.id,
      email: input.email,
      display_name: input.displayName,
      photo_url: input.photoUrl,
      timezone: input.timezone || 'Asia/Jakarta',
      updated_at: nowIso(),
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    email: data.email,
    displayName: data.display_name,
    photoUrl: data.photo_url,
    role: data.role,
    timezone: data.timezone,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as UserDocument;
}

export async function getUserProfile(userId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    email: data.email,
    displayName: data.display_name,
    photoUrl: data.photo_url,
    role: data.role,
    timezone: data.timezone,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as UserDocument;
}

/**
 * Job Operations
 */
export async function createJob(
  userId: string,
  job: Omit<JobDocument, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  const supabase = getSupabaseAdminClient();
  const id = crypto.randomUUID();

  const { data, error } = await supabase
    .from('jobs')
    .insert({
      id,
      user_id: userId,
      type: job.type,
      status: job.status,
      input: job.input,
      output: job.output,
      error_message: job.errorMessage,
      created_at: nowIso(),
      updated_at: nowIso(),
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    status: data.status,
    input: data.input,
    output: data.output,
    errorMessage: data.error_message,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as JobDocument;
}

export async function updateJob(
  jobId: string,
  updates: Partial<Omit<JobDocument, 'id' | 'userId' | 'createdAt'>>
) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('jobs')
    .update({
      status: updates.status,
      input: updates.input,
      output: updates.output,
      error_message: updates.errorMessage,
      updated_at: nowIso(),
    })
    .eq('id', jobId)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    status: data.status,
    input: data.input,
    output: data.output,
    errorMessage: data.error_message,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as JobDocument;
}

export async function getJob(jobId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    status: data.status,
    input: data.input,
    output: data.output,
    errorMessage: data.error_message,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as JobDocument;
}

export async function listRecentJobs(userId: string, limit = 20) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data.map((job) => ({
    id: job.id,
    userId: job.user_id,
    type: job.type,
    status: job.status,
    input: job.input,
    output: job.output,
    errorMessage: job.error_message,
    createdAt: job.created_at,
    updatedAt: job.updated_at,
  })) as JobDocument[];
}

/**
 * Schedule Operations
 */
export async function createSchedule(
  userId: string,
  schedule: Omit<ScheduleDocument, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  const supabase = getSupabaseAdminClient();
  const id = crypto.randomUUID();

  const { data, error } = await supabase
    .from('schedules')
    .insert({
      id,
      user_id: userId,
      platform: schedule.platform,
      content: schedule.content,
      scheduled_at: schedule.scheduledAt,
      status: schedule.status || 'pending',
      created_at: nowIso(),
      updated_at: nowIso(),
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    platform: data.platform,
    content: data.content,
    scheduledAt: data.scheduled_at,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as ScheduleDocument;
}

export async function updateSchedule(
  scheduleId: string,
  updates: Partial<Omit<ScheduleDocument, 'id' | 'userId' | 'createdAt'>>
) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('schedules')
    .update({
      platform: updates.platform,
      content: updates.content,
      scheduled_at: updates.scheduledAt,
      status: updates.status,
      updated_at: nowIso(),
    })
    .eq('id', scheduleId)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    platform: data.platform,
    content: data.content,
    scheduledAt: data.scheduled_at,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as ScheduleDocument;
}

export async function getSchedule(scheduleId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('id', scheduleId)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    userId: data.user_id,
    platform: data.platform,
    content: data.content,
    scheduledAt: data.scheduled_at,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as ScheduleDocument;
}

export async function listSchedules(userId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('user_id', userId)
    .order('scheduled_at', { ascending: true });

  if (error) throw error;

  return data.map((schedule) => ({
    id: schedule.id,
    userId: schedule.user_id,
    platform: schedule.platform,
    content: schedule.content,
    scheduledAt: schedule.scheduled_at,
    status: schedule.status,
    createdAt: schedule.created_at,
    updatedAt: schedule.updated_at,
  })) as ScheduleDocument[];
}

/**
 * Connected Account Operations
 */
export async function upsertConnectedAccount(
  input: Omit<ConnectedAccountDocument, 'createdAt' | 'updatedAt'>
) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('connected_accounts')
    .upsert({
      id: input.id,
      user_id: input.userId,
      platform: input.platform,
      account_id: input.accountId,
      access_token: input.accessToken,
      refresh_token: input.refreshToken,
      token_expires_at: input.tokenExpiresAt,
      updated_at: nowIso(),
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    platform: data.platform,
    accountId: data.account_id,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenExpiresAt: data.token_expires_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as ConnectedAccountDocument;
}

export async function getConnectedAccount(accountId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('connected_accounts')
    .select('*')
    .eq('id', accountId)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    userId: data.user_id,
    platform: data.platform,
    accountId: data.account_id,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenExpiresAt: data.token_expires_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as ConnectedAccountDocument;
}

export async function listConnectedAccounts(userId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from('connected_accounts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map((account) => ({
    id: account.id,
    userId: account.user_id,
    platform: account.platform,
    accountId: account.account_id,
    accessToken: account.access_token,
    refreshToken: account.refresh_token,
    tokenExpiresAt: account.token_expires_at,
    createdAt: account.created_at,
    updatedAt: account.updated_at,
  })) as ConnectedAccountDocument[];
}

export async function deleteConnectedAccount(accountId: string) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from('connected_accounts')
    .delete()
    .eq('id', accountId);

  if (error) throw error;
}

/**
 * Audit Log Operations
 */
export async function writeAuditLog(log: Omit<AuditLogDocument, 'id' | 'createdAt'>) {
  const supabase = getSupabaseAdminClient();
  const id = crypto.randomUUID();

  const { data, error } = await supabase
    .from('audit_logs')
    .insert({
      id,
      user_id: log.userId,
      action: log.action,
      details: log.details,
      created_at: nowIso(),
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    action: data.action,
    details: data.details,
    createdAt: data.created_at,
  } as AuditLogDocument;
}

export async function listAuditLogs(userId?: string, limit = 50) {
  const supabase = getSupabaseAdminClient();

  let query = supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data.map((log) => ({
    id: log.id,
    userId: log.user_id,
    action: log.action,
    details: log.details,
    createdAt: log.created_at,
  })) as AuditLogDocument[];
}
```

## Cara Update Import

Setelah membuat file `src/lib/supabase/repositories.ts`, update import di file yang menggunakan Firestore repositories:

**Dari:**
```typescript
import { upsertUserProfile, createJob, listRecentJobs } from '@/lib/firestore/repositories';
```

**Ke:**
```typescript
import { upsertUserProfile, createJob, listRecentJobs } from '@/lib/supabase/repositories';
```

## File yang Perlu Diupdate

Cari file yang mengimport dari `@/lib/firestore/repositories` dan update ke `@/lib/supabase/repositories`:

```bash
# Cari file yang menggunakan Firestore repositories
grep -r "from '@/lib/firestore/repositories'" src/
```

File yang kemungkinan perlu diupdate:
- `src/app/api/jobs/route.ts`
- `src/app/api/scheduler/route.ts`
- File lain yang menggunakan repositories
