# SkeTools Growth OS

Dashboard otomasi konten berbasis [Next.js 16](https://nextjs.org) dengan desain interaktif (dark/light mode), copy marketing, dan backend yang sudah diarahkan ke Supabase.

## Local Development

1. Install dependency:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka `http://localhost:3000`.

## Environment Variables

Buat file `.env.local` dan isi minimal:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Mode fallback lokal (`admin/admin`) tetap tersedia untuk pengujian cepat tanpa koneksi Supabase.

## Reels Downloader Tanpa VPS

Bisa, tanpa VPS tetap bisa jalan.

Strategi yang disarankan:
- Jalankan job downloader langsung di server app (Node runtime) untuk skala awal.
- Simpan output ke local storage server atau object storage (mis. Supabase Storage).
- Saat trafik meningkat, baru pisahkan ke worker service/queue terpisah.

## Deploy ke Vercel

Langkah cepat:
1. Push project ke GitHub.
2. Import repository ke Vercel.
3. Set Environment Variables yang sama seperti `.env.local`.
4. Deploy.

Opsional via CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

Untuk project ini, Vercel sudah cukup untuk hosting dashboard + API route MVP tanpa VPS.
