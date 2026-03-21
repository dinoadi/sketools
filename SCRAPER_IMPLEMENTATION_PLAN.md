# Plan Implementasi Scraper TikTok dan Instagram

## 📋 Overview
Mengimplementasikan scraper untuk TikTok dan Instagram agar bisa mencari konten berdasarkan username secara real, bukan mock data.

## 🔍 Riset Library Scraper

### TikTok Scraper Options

#### 1. `tiktok-scraper` (npm)
- **Kelebihan**: Mudah digunakan, API sederhana
- **Kekurangan**: Mungkin tidak stabil, bisa di-block
- **Install**: `npm install tiktok-scraper`

#### 2. `tiktok-api` (npm)
- **Kelebihan**: API resmi, lebih stabil
- **Kekurangan**: Perlu API key, mungkin berbayar
- **Install**: `npm install tiktok-api`

#### 3. Custom Scraper dengan Puppeteer/Playwright
- **Kelebihan**: Full control, bisa bypass beberapa限制
- **Kekurangan**: Lebih kompleks, resource intensive
- **Install**: `npm install puppeteer` atau `npm install playwright`

### Instagram Scraper Options

#### 1. `instagram-url-direct` (npm)
- **Kelebihan**: Bisa download video dari URL
- **Kekurangan**: Tidak bisa search by username
- **Install**: `npm install instagram-url-direct`

#### 2. `instagram-scraper` (npm)
- **Kelebihan**: Bisa search by username
- **Kekurangan**: Mungkin tidak stabil
- **Install**: `npm install instagram-scraper`

#### 3. Custom Scraper dengan Puppeteer/Playwright
- **Kelebihan**: Full control
- **Kekurangan**: Lebih kompleks, Instagram anti-bot kuat
- **Install**: `npm install puppeteer` atau `npm install playwright`

## 🎯 Rekomendasi

### Untuk MVP (Development):
Gunakan library npm yang sudah ada:
- **TikTok**: `tiktok-scraper`
- **Instagram**: `instagram-scraper`

### Untuk Production:
Pertimbangkan:
- **TikTok**: Custom scraper dengan Puppeteer atau API resmi
- **Instagram**: API resmi Instagram Graph API (berbayar) atau custom scraper

## 📝 Implementation Plan

### Phase 1: Setup Dependencies
```bash
npm install tiktok-scraper instagram-scraper
```

### Phase 2: Implementasi TikTok Scraper
Buat file: `src/lib/scrapers/tiktok.ts`

```typescript
import { TikTokScraper } from 'tiktok-scraper';

export async function getTikTokVideosByUsername(username: string) {
  try {
    const scraper = new TikTokScraper();
    const videos = await scraper.getUserVideos(username);
    return videos;
  } catch (error) {
    console.error('Error scraping TikTok:', error);
    throw error;
  }
}
```

### Phase 3: Implementasi Instagram Scraper
Buat file: `src/lib/scrapers/instagram.ts`

```typescript
import { InstagramScraper } from 'instagram-scraper';

export async function getInstagramReelsByUsername(username: string) {
  try {
    const scraper = new InstagramScraper();
    const reels = await scraper.getUserReels(username);
    return reels;
  } catch (error) {
    console.error('Error scraping Instagram:', error);
    throw error;
  }
}
```

### Phase 4: Update TikTok Viewer API
Update file: `src/app/api/tiktok/view/route.ts`

```typescript
import { getTikTokVideosByUsername } from '@/lib/scrapers/tiktok';

export async function GET(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const videos = await getTikTokVideosByUsername(query);
    return NextResponse.json({ videos });
  } catch (error) {
    // Fallback to mock data if scraper fails
    console.error('Scraper failed, using mock data:', error);
    const mockVideos = generateMockVideos(query);
    return NextResponse.json({ videos: mockVideos });
  }
}
```

### Phase 5: Update Instagram Downloader API
Update file: `src/app/api/downloader/instagram/route.ts`

```typescript
import { getInstagramReelsByUsername } from '@/lib/scrapers/instagram';

export async function GET(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const reels = await getInstagramReelsByUsername(username);
    return NextResponse.json({ reels });
  } catch (error) {
    // Fallback to mock data if scraper fails
    console.error('Scraper failed, using mock data:', error);
    const mockReels = generateMockReels(username);
    return NextResponse.json({ reels: mockReels });
  }
}
```

### Phase 6: Error Handling & Rate Limiting
- Implementasi retry logic
- Cache results untuk mengurangi requests
- Handle rate limiting dari platform
- Log errors untuk debugging

### Phase 7: Testing
- Test dengan username real TikTok
- Test dengan username real Instagram
- Test error handling
- Test rate limiting

### Phase 8: Documentation
- Update dokumentasi deployment
- Tambahkan catatan tentang legalitas scraping
- Tambahkan catatan tentang rate limiting

## ⚠️ Catatan Penting

### Legalitas Scraping
- Scraping mungkin melanggar Terms of Service TikTok/Instagram
- Untuk production, pertimbangkan menggunakan API resmi
- Gunakan scraping hanya untuk development/testing

### Rate Limiting
- TikTok dan Instagram memiliki rate limiting
- Implementasi cache untuk mengurangi requests
- Gunakan delay antar requests

### Anti-Bot
- Instagram dan TikTok memiliki anti-bot measures
- Scraper mungkin tidak bekerja 100% waktu
- Siapkan fallback ke mock data

## 🚀 Next Steps

1. Install dependencies scraper
2. Implementasi TikTok scraper
3. Implementasi Instagram scraper
4. Update API routes
5. Test dengan username real
6. Handle error dan rate limiting
7. Update dokumentasi
8. Commit dan push ke GitHub
