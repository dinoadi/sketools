import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { downloadInstagramReel, getInstagramPostsByUsername } from "@/lib/downloaders/instagram-downloader";

export async function GET(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    // Use Pitucode Stalker API to get posts by username
    const posts = await getInstagramPostsByUsername(username);
    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Instagram API error:', error.message);
    return NextResponse.json({ 
      error: error.message || "Gagal mengambil data Instagram"
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const body = await request.json();
  const { url, type } = body;

  if (type === "single" && !url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Process download immediately
    if (type === "single") {
      const reelData = await downloadInstagramReel(url);
      return NextResponse.json({ 
        success: true, 
        data: reelData,
        message: "Download successful" 
      });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    console.error('Instagram download error:', error.message);
    return NextResponse.json({ 
      error: error.message || "Gagal mengunduh Instagram"
    }, { status: 500 });
  }
}
