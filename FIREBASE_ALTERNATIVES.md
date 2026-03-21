# Firebase dan Alternatif Database/Auth untuk SkeTools

## 🔥 Apa Fungsi Firebase di SkeTools?

Setelah menganalisis kode project, berikut adalah penggunaan Firebase di SkeTools:

### 1. **Authentication** (Autentikasi Pengguna)
Firebase digunakan untuk:
- Login dengan Google OAuth
- Manajemen session pengguna
- Verifikasi token JWT

**File terkait:**
- [`src/lib/firebase/client.ts`](src/lib/firebase/client.ts) - Firebase client untuk authentication
- [`src/lib/firebase/admin.ts`](src/lib/firebase/admin.ts) - Firebase admin untuk server-side auth
- [`src/lib/auth/session.ts`](src/lib/auth/session.ts) - Session management

### 2. **Firestore Database** (Penyimpanan Data)
⚠️ **PENTING**: Project ini sebenarnya **TIDAK** menggunakan Firestore sungguhan!

Project menggunakan **Memory Store** (in-memory storage) yang disimpan di variabel global:

**File terkait:**
- [`src/lib/firestore/repositories.ts`](src/lib/firestore/repositories.ts) - Semua data disimpan di memory

**Data yang disimpan:**
- `users` - Profil pengguna
- `connectedAccounts` - Akun sosial media yang terhubung
- `jobs` - Background jobs (download, upload)
- `schedules` - Jadwal upload
- `auditLogs` - Log aktivitas

**Catatan:** Data akan hilang jika server restart! Ini hanya cocok untuk development/testing.

### 3. **Firebase Storage** (Penyimpanan File)
Firebase Storage digunakan untuk:
- Menyimpan video yang didownload
- Menyimpan file upload

**Environment variable:**
```env
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sketools.appspot.com
```

---

## 🔄 Bisa Pakai Selain Firebase?

**JAWABAN: YA, BISA!** 

SkeTools sudah didesain dengan struktur yang modular, sehingga bisa diganti dengan alternatif lain.

---

## 📋 Alternatif yang Tersedia

### Opsi 1: Supabase (Sudah Ada di Project)

✅ **Kelebihan:**
- Sudah terinstall di project (`@supabase/supabase-js`)
- Open source dan gratis untuk penggunaan dasar
- PostgreSQL database (lebih powerful dari Firestore)
- Authentication built-in
- Real-time subscriptions
- Storage untuk file

**File terkait:**
- [`src/lib/supabase/server.ts`](src/lib/supabase/server.ts) - Supabase client sudah ada

**Setup Supabase:**

1. Buat project di [Supabase Dashboard](https://supabase.com/dashboard)
2. Buat tabel-tabel yang diperlukan:

```sql
-- Tabel users
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  photo_url TEXT,
  role TEXT DEFAULT 'user',
  timezone TEXT DEFAULT 'Asia/Jakarta',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel connected_accounts
CREATE TABLE connected_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(platform, account_id)
);

-- Tabel jobs
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  input JSONB,
  output JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel schedules
CREATE TABLE schedules (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel audit_logs
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes untuk performa
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_schedules_user_id ON schedules(user_id);
CREATE INDEX idx_schedules_status ON schedules(status);
CREATE INDEX idx_connected_accounts_user_id ON connected_accounts(user_id);
```

3. Update environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Buat file baru `src/lib/supabase/repositories.ts`:

```typescript
import { getSupabaseAdminClient } from './server';

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
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createJob(
  userId: string,
  job: Omit<any, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  const supabase = getSupabaseAdminClient();
  const id = crypto.randomUUID();

  const { data, error } = await supabase
    .from('jobs')
    .insert({
      id,
      user_id: userId,
      ...job,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ... implementasi fungsi lainnya
```

---

### Opsi 2: NextAuth.js (Auth) + PostgreSQL (Database)

✅ **Kelebihan:**
- NextAuth.js adalah auth library populer untuk Next.js
- Mendukung banyak provider (Google, GitHub, Email, dll)
- PostgreSQL adalah database yang powerful dan reliable
- Banyak hosting options (Neon, Supabase, Railway, dll)

**Setup:**

1. Install dependencies:

```bash
npm install next-auth @auth/prisma-adapter prisma @prisma/client
```

2. Setup Prisma:

```bash
npx prisma init
```

3. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Tabel-tabel lain untuk SkeTools
model ConnectedAccount {
  id              String   @id @default(cuid())
  userId          String
  platform        String
  accountId       String
  accessToken     String?  @db.Text
  refreshToken    String?  @db.Text
  tokenExpiresAt  DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([platform, accountId])
}

model Job {
  id          String   @id @default(cuid())
  userId      String
  type        String
  status      String
  input       Json?
  output      Json?
  errorMessage String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Schedule {
  id          String   @id @default(cuid())
  userId      String
  platform    String
  content     String   @db.Text
  scheduledAt DateTime
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String
  details   Json?
  createdAt DateTime @default(now())
}
```

4. Buat file `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
})

export const { GET, POST } = handlers
```

5. Update environment variables:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

### Opsi 3: Clerk (Auth) + Neon (PostgreSQL)

✅ **Kelebihan:**
- Clerk adalah auth service modern dengan UI yang bagus
- Neon adalah PostgreSQL serverless yang cepat dan scalable
- Setup sangat mudah
- Gratis untuk penggunaan dasar

**Setup:**

1. Install dependencies:

```bash
npm install @clerk/nextjs
```

2. Setup Clerk:

- Buat account di [Clerk Dashboard](https://dashboard.clerk.com/)
- Copy API keys

3. Update `src/middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/scheduler-center(.*)',
  '/connected-accounts(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

4. Update `src/app/layout.tsx`:

```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

5. Setup Neon:

- Buat project di [Neon Console](https://console.neon.tech/)
- Copy connection string

6. Update environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
DATABASE_URL=postgresql://user:password@ep-xxx.aws.neon.tech/neondb
```

---

### Opsi 4: Auth0 (Auth) + MongoDB (Database)

✅ **Kelebihan:**
- Auth0 adalah enterprise-grade auth service
- MongoDB adalah NoSQL database yang fleksibel
- Banyak fitur enterprise (SSO, MFA, dll)

**Setup:**

1. Install dependencies:

```bash
npm install next-auth @auth/mongodb-adapter mongodb
```

2. Setup MongoDB:

- Buat cluster di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Copy connection string

3. Update environment variables:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sketools
AUTH0_SECRET=your-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
```

---

## 📊 Perbandingan Alternatif

| Fitur | Firebase | Supabase | NextAuth + PostgreSQL | Clerk + Neon | Auth0 + MongoDB |
|-------|----------|----------|----------------------|--------------|-----------------|
| **Auth** | ✅ Built-in | ✅ Built-in | ✅ NextAuth.js | ✅ Clerk | ✅ Auth0 |
| **Database** | Firestore | PostgreSQL | PostgreSQL | PostgreSQL | MongoDB |
| **Real-time** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Storage** | ✅ Firebase Storage | ✅ Supabase Storage | ❌ Perlu setup | ❌ Perlu setup | ❌ Perlu setup |
| **Open Source** | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Free Tier** | ✅ Generous | ✅ Generous | ✅ (Neon) | ✅ | ❌ |
| **Setup Difficulty** | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ |
| **Scalability** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Enterprise Features** | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ |

---

## 🎯 Rekomendasi

### Untuk Development/Testing:
**Gunakan Memory Store (Saat Ini)**
- Tidak perlu setup database
- Data hilang saat restart
- Cocok untuk prototyping

### Untuk MVP/Production:
**Pilihan 1: Supabase (Rekomendasi)**
- Sudah ada di project
- Gratis dan open source
- PostgreSQL + Auth + Storage dalam satu platform
- Setup relatif mudah

**Pilihan 2: NextAuth.js + Neon**
- NextAuth.js sangat populer
- Neon adalah PostgreSQL serverless yang cepat
- Banyak dokumentasi dan community support

### Untuk Enterprise:
**Pilihan 1: Auth0 + MongoDB**
- Auth0 adalah enterprise-grade
- MongoDB fleksibel untuk data yang kompleks
- Banyak fitur enterprise (SSO, MFA, dll)

**Pilihan 2: Clerk + Neon**
- Clerk modern dengan UI yang bagus
- Neon scalable dan cepat
- Setup sangat mudah

---

## 🚀 Cara Migrasi dari Firebase ke Alternatif

### Langkah 1: Pilih Alternatif
Pilih salah satu alternatif di atas berdasarkan kebutuhan Anda.

### Langkah 2: Setup Database/Auth Service
Ikuti panduan setup untuk alternatif yang dipilih.

### Langkah 3: Update Code
Ganti import dan fungsi yang menggunakan Firebase:

**Dari Firebase:**
```typescript
import { clientAuth } from '@/lib/firebase/client'
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin'
```

**Ke Supabase:**
```typescript
import { getSupabaseServerClient } from '@/lib/supabase/server'
```

**Ke NextAuth:**
```typescript
import { auth } from '@/app/api/auth/[...nextauth]/route'
```

### Langkah 4: Update Environment Variables
Hapus Firebase variables dan tambahkan variables untuk alternatif yang dipilih.

### Langkah 5: Test
Test semua fitur untuk memastikan migrasi berhasil.

---

## 💡 Tips Tambahan

1. **Backup Data**: Sebelum migrasi, backup semua data dari Firebase
2. **Gradual Migration**: Migrasi satu fitur dalam satu waktu
3. **Test Thoroughly**: Test semua fitur setelah migrasi
4. **Monitor**: Monitor performance dan error setelah migrasi
5. **Rollback Plan**: Siapkan plan untuk rollback jika ada masalah

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://authjs.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Auth0 Documentation](https://auth0.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas)

---

## ❓ FAQ

### Q: Apakah harus migrasi dari Firebase?
**A:** Tidak! Firebase sudah bagus dan bisa digunakan untuk production. Tapi jika ingin alternatif, opsi-opsi di atas tersedia.

### Q: Mana yang paling mudah untuk pemula?
**A:** Clerk + Neon adalah yang paling mudah karena setup-nya sangat sederhana.

### Q: Mana yang paling murah untuk production?
**A:** Supabase dan Neon memiliki free tier yang sangat generous untuk production.

### Q: Bisa menggunakan Firebase Auth tapi database lain?
**A:** Ya! Firebase Auth bisa digunakan bersama database lain seperti PostgreSQL atau MongoDB.

### Q: Apakah data akan hilang saat migrasi?
**A:** Tidak jika Anda melakukan backup dan migrasi data dengan benar. Pastikan untuk backup sebelum migrasi.

---

**Semoga panduan ini membantu Anda memilih dan setup alternatif database/auth untuk SkeTools! 🚀**
