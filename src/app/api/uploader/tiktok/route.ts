import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { createJob } from "@/lib/firestore/repositories";
import { TikTokUploader } from "@/lib/uploaders/tiktok-uploader";

export async function POST(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const body = await request.json();
  const { 
    title, 
    description, 
    hashtags, 
    privacyLevel, 
    videoUrl, 
    driveUrl,
    scheduleTime 
  } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!videoUrl && !driveUrl) {
    return NextResponse.json({ error: "Video URL or Drive URL is required" }, { status: 400 });
  }

  try {
    // Create job for tracking
    const job = await createJob(session.uid, {
      tool: "tiktok-uploader",
      status: "queued",
      payload: {
        title,
        description: description || "",
        hashtags: hashtags || [],
        privacyLevel: privacyLevel || "public_to_everyone",
        videoUrl,
        driveUrl,
        scheduleTime,
      },
      progress: 0,
      message: "Upload queued",
    });

    // Process upload in background
    processTikTokUpload(session.uid, body, job.id).catch(err => {
      console.error('TikTok upload failed:', err);
    });

    return NextResponse.json({ 
      success: true, 
      jobId: job.id, 
      message: scheduleTime ? "Upload scheduled" : "Upload started" 
    });
  } catch (error: any) {
    console.error('Error creating TikTok upload job:', error.message);
    return NextResponse.json({ error: error.message || "Gagal memproses upload TikTok" }, { status: 500 });
  }
}

/**
 * Process TikTok upload in background
 */
async function processTikTokUpload(userId: string, options: any, jobId: string) {
  try {
    // Get TikTok credentials from user's connected accounts
    // Note: You'll need to implement this based on your auth system
    const credentials = await getTikTokCredentials(userId);
    
    if (!credentials) {
      throw new Error('TikTok account not connected');
    }

    // Initialize TikTok uploader
    const uploader = new TikTokUploader(credentials.sessionCookie);
    
    // Upload video
    const result = await uploader.uploadVideoFromUrl({
      title: options.title,
      description: options.description || "",
      hashtags: options.hashtags || [],
      privacyLevel: options.privacyLevel || "public_to_everyone",
      videoUrl: options.videoUrl,
      onProgress: (progress) => {
        console.log(`Upload progress: ${progress}%`);
        // Update job progress
        // Note: You'll need to implement updateJob function
      },
    });

    console.log(`TikTok upload complete: ${result.url}`);
    
    // Update job status to completed
    // Note: You'll need to implement updateJob function
  } catch (error: any) {
    console.error('TikTok upload failed:', error.message);
    // Update job status to failed
    // Note: You'll need to implement updateJob function
  }
}

/**
 * Get TikTok credentials from user's connected accounts
 * Note: This is a placeholder - implement based on your auth system
 */
async function getTikTokCredentials(userId: string): Promise<any> {
  // TODO: Implement this function to retrieve TikTok session cookie
  // from your database or user's connected accounts
  return null;
}
