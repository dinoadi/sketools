import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { createJob } from "@/lib/firestore/repositories";

export async function GET(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  // Mock data for demonstration
  const mockReels = Array.from({ length: 10 }).map((_, i) => ({
    id: `reel_${i}`,
    thumbnail: `https://picsum.photos/seed/${username}_${i}/400/711`,
    url: `https://www.instagram.com/reels/mock_${i}/`,
    caption: `Amazing content by @${username} #${i} #growth`,
  }));

  return NextResponse.json({ reels: mockReels });
}

export async function POST(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const body = await request.json();
  const { url, reels, type } = body;

  if (type === "single" && !url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  if (type === "mass" && (!reels || reels.length === 0)) {
    return NextResponse.json({ error: "No reels selected" }, { status: 400 });
  }

  // Create jobs in the background
  if (type === "single") {
    await createJob(session.uid, {
      tool: "instagram-downloader",
      status: "queued",
      payload: { url, type: "instagram_single" },
      progress: 0,
      message: "Single download initiated",
    });
  } else {
    for (const reel of reels) {
      await createJob(session.uid, {
        tool: "instagram-downloader",
        status: "queued",
        payload: { url: reel.url, type: "instagram_mass", reelId: reel.id },
        progress: 0,
        message: "Mass download item queued",
      });
    }
  }

  return NextResponse.json({ success: true, message: "Jobs created" });
}
