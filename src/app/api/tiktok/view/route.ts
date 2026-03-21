import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";

export async function GET(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  // Mock TikTok data
  const mockVideos = Array.from({ length: 15 }).map((_, i) => ({
    id: `tiktok_${i}`,
    thumbnail: `https://picsum.photos/seed/tiktok_${query}_${i}/400/711`,
    url: `https://www.tiktok.com/@${query.replace("@", "")}/video/mock_${i}`,
    caption: `Viral TikTok content by @${query} #${i} #trending`,
    stats: {
      views: `${(Math.random() * 100).toFixed(1)}K`,
      likes: `${(Math.random() * 10).toFixed(1)}K`,
    },
  }));

  return NextResponse.json({ videos: mockVideos });
}
