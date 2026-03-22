import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { createJob } from "@/lib/firestore/repositories";
import { downloadInstagramReel, getInstagramReelsByUsername, downloadVideoToBuffer } from "@/lib/downloaders/instagram-downloader";

export async function GET(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    // Try to scrape Instagram reels
    const reels = await getInstagramReelsByUsername(username);
    return NextResponse.json({ reels });
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

/**
 * Process single download in background
 */
async function processSingleDownload(userId: string, url: string, jobId: string) {
  try {
    // Download reel
    const reelData = await downloadInstagramReel(url);
    
    // Download video buffer
    const videoBuffer = await downloadVideoToBuffer(reelData.downloadUrl);
    
    // Upload to Firebase Storage (you'll need to implement this)
    const storagePath = `downloads/${userId}/instagram/${reelData.id}.mp4`;
    // const downloadUrl = await uploadToFirebaseStorage(storagePath, videoBuffer, 'video/mp4');
    
    // Update job status
    // Note: You'll need to implement updateJob function in repositories
    console.log(`Download complete: ${reelData.id}, stored at: ${storagePath}`);
  } catch (error: any) {
    console.error('Single download failed:', error.message);
    // Update job status to failed
  }
}

/**
 * Process mass downloads in background
 */
async function processMassDownloads(userId: string, reels: any[], jobIds: string[]) {
  for (let i = 0; i < reels.length; i++) {
    const reel = reels[i];
    const jobId = jobIds[i];
    
    try {
      // Update job status to processing
      console.log(`Processing reel ${i + 1}/${reels.length}: ${reel.id}`);
      
      // Download reel
      const reelData = await downloadInstagramReel(reel.url);
      
      // Download video buffer
      const videoBuffer = await downloadVideoToBuffer(reelData.downloadUrl);
      
      // Upload to Firebase Storage
      const storagePath = `downloads/${userId}/instagram/${reel.id}.mp4`;
      // const downloadUrl = await uploadToFirebaseStorage(storagePath, videoBuffer, 'video/mp4');
      
      // Update job status to completed
      console.log(`Download complete: ${reel.id}, stored at: ${storagePath}`);
      
      // Add delay between downloads to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error: any) {
      console.error(`Download failed for reel ${reel.id}:`, error.message);
      // Update job status to failed
    }
  }
}
