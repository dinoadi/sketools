import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/api-user";
import { createJob } from "@/lib/firestore/repositories";
import { YouTubeUploader } from "@/lib/uploaders/youtube-uploader";

export async function POST(request: Request) {
  const { session, error } = await requireApiUser();
  if (error || !session) return error!;

  const body = await request.json();
  const { 
    title, 
    description, 
    tags, 
    privacyStatus, 
    categoryId, 
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
      tool: "youtube-uploader",
      status: "queued",
      payload: {
        title,
        description: description || "",
        tags: tags || [],
        privacyStatus: privacyStatus || "public",
        categoryId: categoryId || "22",
        videoUrl,
        driveUrl,
        scheduleTime,
      },
      progress: 0,
      message: "Upload queued",
    });

    // Process upload in background
    processYouTubeUpload(session.uid, body, job.id).catch(err => {
      console.error('YouTube upload failed:', err);
    });

    return NextResponse.json({ 
      success: true, 
      jobId: job.id, 
      message: scheduleTime ? "Upload scheduled" : "Upload started" 
    });
  } catch (error: any) {
    console.error('Error creating YouTube upload job:', error.message);
    return NextResponse.json({ error: error.message || "Gagal memproses upload YouTube" }, { status: 500 });
  }
}

/**
 * Process YouTube upload in background
 */
async function processYouTubeUpload(userId: string, options: any, jobId: string) {
  try {
    // Get YouTube credentials from user's connected accounts
    // Note: You'll need to implement this based on your auth system
    const credentials = await getYouTubeCredentials(userId);
    
    if (!credentials) {
      throw new Error('YouTube account not connected');
    }

    // Initialize YouTube uploader
    const uploader = new YouTubeUploader(
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUri
    );
    
    uploader.setCredentials(credentials.accessToken, credentials.refreshToken);

    // Upload video
    const result = await uploader.uploadVideoFromUrl({
      title: options.title,
      description: options.description || "",
      tags: options.tags || [],
      privacyStatus: options.privacyStatus || "public",
      categoryId: options.categoryId || "22",
      videoUrl: options.videoUrl,
      onProgress: (progress) => {
        console.log(`Upload progress: ${progress}%`);
        // Update job progress
        // Note: You'll need to implement updateJob function
      },
    });

    console.log(`YouTube upload complete: ${result.url}`);
    
    // Update job status to completed
    // Note: You'll need to implement updateJob function
  } catch (error: any) {
    console.error('YouTube upload failed:', error.message);
    // Update job status to failed
    // Note: You'll need to implement updateJob function
  }
}

/**
 * Get YouTube credentials from user's connected accounts
 * Note: This is a placeholder - implement based on your auth system
 */
async function getYouTubeCredentials(userId: string): Promise<any> {
  // TODO: Implement this function to retrieve YouTube OAuth credentials
  // from your database or user's connected accounts
  return null;
}
