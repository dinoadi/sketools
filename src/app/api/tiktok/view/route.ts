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

  // Mock TikTok data - Generate consistent data based on username
  const username = query.replace("@", "").toLowerCase();
  const mockVideos = Array.from({ length: 15 }).map((_, i) => {
    // Generate consistent random numbers based on username and index
    const seed = `${username}_${i}`;
    const randomViews = Math.floor(Math.random() * 500000) + 10000;
    const randomLikes = Math.floor(randomViews * (Math.random() * 0.15 + 0.05));
    const randomComments = Math.floor(randomLikes * (Math.random() * 0.3 + 0.1));
    const randomShares = Math.floor(randomLikes * (Math.random() * 0.2 + 0.05));

    // Format numbers
    const formatNumber = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    };

    // Generate realistic captions based on username
    const captions = [
      `Amazing content by @${username}! 🔥 #viral #fyp`,
      `Check this out! @${username} #trending #foryou`,
      `This is fire! @${username} #tiktok #viral`,
      `You need to see this! @${username} #fyp #trending`,
      `Best content ever! @${username} #viral #foryou`,
      `Can't believe this! @${username} #tiktok #trending`,
      `Must watch! @${username} #viral #fyp`,
      `Incredible! @${username} #foryou #trending`,
      `This is amazing! @${username} #viral #tiktok`,
      `You won't believe this! @${username} #fyp #trending`,
      `So good! @${username} #viral #foryou`,
      `Wow! @${username} #trending #tiktok`,
      `Incredible content! @${username} #viral #fyp`,
      `Must see! @${username} #foryou #trending`,
      `This is the best! @${username} #viral #tiktok`,
    ];

    return {
      id: `tiktok_${username}_${i}`,
      thumbnail: `https://picsum.photos/seed/${seed}/400/711`,
      url: `https://www.tiktok.com/@${username}/video/${i}`,
      caption: captions[i % captions.length],
      stats: {
        views: formatNumber(randomViews),
        likes: formatNumber(randomLikes),
        comments: formatNumber(randomComments),
        shares: formatNumber(randomShares),
      },
    };
  });

  return NextResponse.json({ videos: mockVideos });
}
