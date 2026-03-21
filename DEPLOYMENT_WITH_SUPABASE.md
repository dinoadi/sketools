# Panduan Deployment SkeTools ke Vercel dengan Supabase

## 📋 Daftar Isi
1. [Persiapan](#persiapan)
2. [Setup Supabase](#setup-supabase)
3. [Setup GitHub Repository](#setup-github-repository)
4. [Deployment ke Vercel](#deployment-ke-vercel)
5. [Konfigurasi Environment Variables](#konfigurasi-environment-variables)
6. [Setup Custom Domain](#setup-custom-domain)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Persiapan

### 1. Pastikan Project Siap

```bash
# Install dependencies
npm install

# Test build lokal
npm run build
```

### 2. Cek File yang Diperlukan

Pastikan file-file berikut ada:
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `src/lib/supabase/server.ts` (sudah ada di project)

---

## 🗄️ Setup Supabase

### Langkah 1: Buat Project Supabase

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Klik **"New Project"**
3. Isi form:
   - **Name**: `sketools`
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih region terdekat dengan pengguna (misal: Singapore)
   - **Pricing Plan**: Pilih **Free** untuk MVP
4. Klik **"Create new project"**
5. Tunggu 1-2 menit untuk setup selesai

### Langkah 2: Buat Tabel Database

Setelah project siap, buka **SQL Editor** di sidebar kiri, lalu jalankan SQL berikut:

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
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
```

Klik **"Run"** untuk menjalankan SQL.

### Langkah 3: Setup Authentication

1. Buka **Authentication** → **Providers** di sidebar kiri
2. Klik **Google** provider
3. Toggle **"Enable Sign in with Google"** ke ON
4. Isi:
   - **Client ID**: Dapatkan dari [Google Cloud Console](https://console.cloud.google.com/)
   - **Client Secret**: Dapatkan dari Google Cloud Console
   - **Redirect URL**: Copy dari Supabase (otomatis terisi)
5. Klik **"Save"**

**Cara mendapatkan Google Client ID & Secret:**

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing project
3. Masuk ke **APIs & Services** → **Credentials**
4. Klik **"Create Credentials"** → **OAuth client ID**
5. Pilih **"Web application"**
6. Isi:
   - **Name**: `SkeTools`
   - **Authorized redirect URIs**: Tambahkan URL dari Supabase (format: `https://your-project.supabase.co/auth/v1/callback`)
7. Klik **"Create"**
8. Copy **Client ID** dan **Client Secret**
9. Paste ke Supabase Dashboard

### Langkah 4: Setup Storage

1. Buka **Storage** di sidebar kiri
2. Klik **"New bucket"**
3. Isi:
   - **Name**: `videos`
   - **Public bucket**: Centang jika ingin file bisa diakses publik
4. Klik **"Create bucket"**

### Langkah 5: Copy API Keys

1. Buka **Settings** → **API** di sidebar kiri
2. Copy nilai-nilai berikut:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role secret**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

⚠️ **PENTING**: 
- `anon public` key bisa digunakan di client-side
- `service_role secret` key HANYA untuk server-side, jangan pernah expose ke client!

---

## 📦 Setup GitHub Repository

### Langkah 1: Inisialisasi Git

```bash
# Inisialisasi git
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit - SkeTools with Supabase"
```

### Langkah 2: Buat Repository di GitHub

1. Buka [GitHub](https://github.com/)
2. Klik **+** → **New repository**
3. Isi:
   - **Repository name**: `sketools`
   - **Public/Private**: Sesuaikan kebutuhan
4. Klik **"Create repository"**

### Langkah 3: Push ke GitHub

```bash
# Tambahkan remote
git remote add origin https://github.com/USERNAME/sketools.git

# Push ke main branch
git branch -M main
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda.

---

## 🌐 Deployment ke Vercel

### Langkah 1: Buat Akun Vercel

1. Buka [Vercel](https://vercel.com/)
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"** (direkomendasikan)
4. Authorize Vercel untuk akses GitHub Anda
5. Verifikasi email jika diminta

### Langkah 2: Import Repository

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New..."** → **"Project"**
3. Cari repository `sketools` Anda
4. Klik **"Import"**

### Langkah 3: Konfigurasi Project

Vercel akan mendeteksi Next.js secara otomatis:

**Framework Preset:**
- **Framework**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

**Environment Variables:**

Tambahkan environment variables berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# YouTube API (Opsional - untuk auto-upload)
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
YOUTUBE_REDIRECT_URI=https://sketools.vercel.app/api/youtube/callback

# TikTok API (Opsional - untuk auto-upload)
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=https://sketools.vercel.app/api/tiktok/callback

# Storage (Opsional)
STORAGE_BUCKET=videos
```

⚠️ **PENTING**: 
- Ganti nilai-nilai di atas dengan nilai asli dari Supabase
- Untuk redirect URIs, gunakan URL production Vercel (bukan localhost)

### Langkah 4: Deploy

1. Klik **"Deploy"**
2. Tunggu proses deployment (2-5 menit)
3. Setelah selesai, Anda akan melihat URL production (misal: `https://sketools-xyz.vercel.app`)
4. Klik **"Visit"** untuk membuka website

---

## 🔧 Konfigurasi Environment Variables

### Menambah Environment Variables di Vercel

Jika Anda lupa menambahkan environment variables saat deployment awal:

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik project `sketools` Anda
3. Pilih tab **"Settings"**
4. Klik **"Environment Variables"** di sidebar kiri
5. Klik **"Add New"**
6. Masukkan:
   - **Name**: Nama variable
   - **Value**: Nilai variable
   - **Environment**: Pilih **Production**, **Preview**, dan **Development**
7. Klik **"Save"**
8. Ulangi untuk semua variables
9. Kembali ke tab **"Deployments"**
10. Klik **"..."** pada deployment terbaru → **"Redeploy"**

### Environment Variables yang Diperlukan

#### Supabase (Wajib)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### YouTube API (Opsional - untuk auto-upload)
```env
YOUTUBE_CLIENT_ID=123456789-abcde.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=GOCSPX-abcdef123456
YOUTUBE_REDIRECT_URI=https://sketools.vercel.app/api/youtube/callback
```

#### TikTok API (Opsional - untuk auto-upload)
```env
TIKTOK_CLIENT_KEY=awb123456789
TIKTOK_CLIENT_SECRET=abcdef123456789
TIKTOK_REDIRECT_URI=https://sketools.vercel.app/api/tiktok/callback
```

#### Storage (Opsional)
```env
STORAGE_BUCKET=videos
```

---

## 🌍 Setup Custom Domain

### Langkah 1: Tambah Domain di Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik project `sketools` Anda
3. Pilih tab **"Settings"**
4. Klik **"Domains"** di sidebar kiri
5. Masukkan domain Anda (misal: `sketools.com`)
6. Klik **"Add"**

### Langkah 2: Konfigurasi DNS

Vercel akan menampilkan DNS records yang perlu ditambahkan:

**Untuk Root Domain (sketools.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Untuk Subdomain (www.sketools.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Langkah 3: Update DNS di Domain Registrar

1. Buka dashboard domain registrar Anda (GoDaddy, Namecheap, dll)
2. Cari bagian **DNS Management** atau **DNS Settings**
3. Tambahkan DNS records sesuai instruksi Vercel
4. Simpan perubahan
5. Tunggu propagasi DNS (5-30 menit)

### Langkah 4: Update Redirect URIs

Setelah custom domain aktif, update redirect URIs:

**Di Supabase:**
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Masuk ke **Authentication** → **URL Configuration**
3. Update **Site URL**: `https://sketools.com`
4. Update **Redirect URLs**: Tambahkan `https://sketools.com/**`
5. Klik **"Save"**

**Di Google Cloud Console (jika menggunakan YouTube API):**
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Masuk ke **APIs & Services** → **Credentials**
3. Edit OAuth 2.0 Client ID
4. Update redirect URI:
   ```
   https://sketools.com/api/youtube/callback
   ```
5. Klik **"Save"**

---

## 🔍 Troubleshooting

### Masalah 1: Build Gagal

**Gejala:**
- Deployment gagal dengan error build
- Log menunjukkan error saat `npm run build`

**Solusi:**
```bash
# Test build lokal
npm run build

# Jika error, coba:
rm -rf .next node_modules
npm install
npm run build
```

### Masalah 2: Supabase Connection Error

**Gejala:**
- Error "Supabase connection failed"
- Error "Missing Supabase public keys"

**Solusi:**
1. Verifikasi Supabase URL dan API keys di Vercel Dashboard
2. Pastikan environment variables sudah ditambahkan dengan benar
3. Cek nama variable (case-sensitive)
4. Redeploy setelah menambah environment variables
5. Pastikan Supabase project sudah aktif

### Masalah 3: Authentication Error

**Gejala:**
- Error saat login dengan Google
- Error "Invalid redirect URL"

**Solusi:**
1. Cek Google OAuth credentials di Supabase Dashboard
2. Pastikan redirect URL di Google Cloud Console sesuai dengan Supabase
3. Update redirect URLs di Supabase Dashboard → Authentication → URL Configuration
4. Pastikan domain sudah ditambahkan di Supabase

### Masalah 4: Database Error

**Gejala:**
- Error "relation does not exist"
- Error saat mengakses data

**Solusi:**
1. Pastikan tabel-tabel sudah dibuat di Supabase
2. Cek SQL Editor di Supabase Dashboard
3. Jalankan ulang SQL untuk membuat tabel
4. Cek nama tabel (case-sensitive)

### Masalah 5: Custom Domain Tidak Berfungsi

**Gejala:**
- Domain tidak bisa diakses
- DNS error

**Solusi:**
1. Cek DNS records di domain registrar
2. Tunggu propagasi DNS (bisa sampai 48 jam)
3. Verifikasi DNS dengan:
   ```bash
   nslookup sketools.com
   dig sketools.com
   ```
4. Cek SSL certificate di Vercel Dashboard

### Masalah 6: Environment Variables Tidak Berfungsi

**Gejala:**
- Error "undefined" saat mengakses environment variables
- Supabase connection failed

**Solusi:**
1. Cek environment variables di Vercel Dashboard
2. Pastikan nama variable benar (case-sensitive)
3. Pastikan value tidak ada spasi ekstra
4. Redeploy setelah menambah environment variables
5. Pastikan variables ditambahkan untuk Production, Preview, dan Development

---

## ✅ Checklist Deployment

Sebelum deploy ke production, pastikan:

- [ ] Project sudah di-push ke GitHub
- [ ] Build lokal berhasil (`npm run build`)
- [ ] Supabase project sudah dibuat
- [ ] Tabel-tabel database sudah dibuat
- [ ] Google OAuth sudah di-setup di Supabase
- [ ] Storage bucket sudah dibuat
- [ ] Environment variables sudah disiapkan
- [ ] Environment variables sudah ditambahkan di Vercel
- [ ] Redirect URIs sudah di-update untuk production
- [ ] Custom domain sudah dikonfigurasi (opsional)
- [ ] DNS records sudah ditambahkan (jika menggunakan custom domain)
- [ ] SSL certificate sudah aktif

---

## 📊 Monitoring

### Melihat Deployment Logs

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik project `sketools` Anda
3. Pilih tab **"Deployments"**
4. Klik deployment yang ingin dicek
5. Scroll ke bawah untuk melihat logs

### Monitoring Supabase

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project `sketools`
3. Cek:
   - **Database**: Query logs, table usage
   - **Authentication**: User activity, sign-in logs
   - **Storage**: File usage, bandwidth
   - **Logs**: Error logs, API logs

---

## 💡 Tips

1. **Gunakan Environment Variables**: Jangan hardcode credentials
2. **Enable Git Integration**: Deploy otomatis setiap push ke main branch
3. **Setup Preview Deployments**: Test changes sebelum production
4. **Monitor Logs**: Cek logs secara berkala
5. **Update Dependencies**: Keep dependencies up-to-date
6. **Backup Data**: Regular backup Supabase database
7. **Monitor Costs**: Track usage dan costs di Supabase dan Vercel

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

---

## 🆘 Dukungan

Jika mengalami masalah:

1. Cek [Vercel Status](https://www.vercel-status.com/)
2. Cek [Supabase Status](https://status.supabase.com/)
3. Baca [Vercel Documentation](https://vercel.com/docs)
4. Baca [Supabase Documentation](https://supabase.com/docs)
5. Hubungi [Vercel Support](https://vercel.com/support)
6. Hubungi [Supabase Support](https://supabase.com/support)

---

**Selamat! SkeTools Anda sekarang sudah live di Vercel dengan Supabase! 🚀**
