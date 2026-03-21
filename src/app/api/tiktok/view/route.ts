import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { getTikTokVideosByUsername, generateMockTikTokVideos } from "@/lib/scrapers/tiktok";

export async function GET(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    // Try to scrape TikTok videos
    const videos = await getTikTokVideosByUsername(query);
    return NextResponse.json({ videos });
  } catch (error: any) {
    // If scraping fails, fallback to mock data
    console.error('TikTok scraper failed, using mock data:', error.message);
    const mockVideos = generateMockTikTokVideos(query);
    return NextResponse.json({ 
      videos: mockVideos,
      warning: "Using mock data - scraper failed. This may be due to rate limiting or anti-bot measures."
    });
  }
}
