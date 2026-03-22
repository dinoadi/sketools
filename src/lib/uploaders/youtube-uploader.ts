import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export interface YouTubeUploadOptions {
  title: string;
  description: string;
  tags?: string[];
  privacyStatus?: 'public' | 'private' | 'unlisted';
  categoryId?: string;
  videoPath?: string;
  videoUrl?: string;
  onProgress?: (progress: number) => void;
}

export interface YouTubeUploadResult {
  videoId: string;
  url: string;
  thumbnailUrl?: string;
}

/**
 * YouTube Uploader Service
 * Based on youtubeuploader repository approach
 */
export class YouTubeUploader {
  private oauth2Client: OAuth2Client;
  private youtube: any;

  constructor(
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ) {
    this.oauth2Client = new OAuth2Client(
      clientId,
      clientSecret,
      redirectUri
    );
  }

  /**
   * Set OAuth credentials
   */
  setCredentials(accessToken: string, refreshToken?: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  /**
   * Get authorization URL
   */
  getAuthUrl(scopes: string[] = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube',
  ]): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    });
  }

  /**
   * Exchange code for tokens
   */
  async exchangeCodeForTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(): Promise<string> {
    const { credentials } = await this.oauth2Client.refreshAccessToken();
    return credentials.access_token as string;
  }

  /**
   * Upload video from local file
   */
  async uploadVideo(options: YouTubeUploadOptions): Promise<YouTubeUploadResult> {
    if (!this.youtube) {
      throw new Error('YouTube client not initialized. Call setCredentials first.');
    }

    const {
      title,
      description,
      tags = [],
      privacyStatus = 'public',
      categoryId = '22', // People & Blogs
      videoPath,
      onProgress,
    } = options;

    if (!videoPath) {
      throw new Error('videoPath is required for local file upload');
    }

    const fileSize = fs.statSync(videoPath).size;
    const fileStream = fs.createReadStream(videoPath);

    return new Promise((resolve, reject) => {
      const res = this.youtube.videos.insert(
        {
          part: 'snippet,status',
          requestBody: {
            snippet: {
              title,
              description,
              tags,
              categoryId,
            },
            status: {
              privacyStatus,
              selfDeclaredMadeForKids: false,
            },
          },
          media: {
            body: fileStream,
          },
        },
        {
          onUploadProgress: (evt: any) => {
            if (onProgress && evt.bytesRead && fileSize) {
              const progress = (evt.bytesRead / fileSize) * 100;
              onProgress(Math.round(progress));
            }
          },
        },
        (err: any, data: any) => {
          if (err) {
            reject(new Error(`YouTube upload failed: ${err.message}`));
          } else {
            resolve({
              videoId: data.id,
              url: `https://www.youtube.com/watch?v=${data.id}`,
            });
          }
        }
      );
    });
  }

  /**
   * Upload video from URL
   */
  async uploadVideoFromUrl(options: YouTubeUploadOptions): Promise<YouTubeUploadResult> {
    const {
      title,
      description,
      tags = [],
      privacyStatus = 'public',
      categoryId = '22',
      videoUrl,
      onProgress,
    } = options;

    if (!videoUrl) {
      throw new Error('videoUrl is required for URL upload');
    }

    // Download video from URL
    const response = await axios.get(videoUrl, {
      responseType: 'arraybuffer',
      onDownloadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(Math.round(progress));
        }
      },
    });

    const videoBuffer = Buffer.from(response.data);

    return new Promise((resolve, reject) => {
      const res = this.youtube.videos.insert(
        {
          part: 'snippet,status',
          requestBody: {
            snippet: {
              title,
              description,
              tags,
              categoryId,
            },
            status: {
              privacyStatus,
              selfDeclaredMadeForKids: false,
            },
          },
          media: {
            body: videoBuffer,
          },
        },
        {
          onUploadProgress: (evt: any) => {
            if (onProgress && evt.bytesRead && videoBuffer.length) {
              const progress = (evt.bytesRead / videoBuffer.length) * 100;
              onProgress(Math.round(progress));
            }
          }
        },
        (err: any, data: any) => {
          if (err) {
            reject(new Error(`YouTube upload failed: ${err.message}`));
          } else {
            resolve({
              videoId: data.id,
              url: `https://www.youtube.com/watch?v=${data.id}`,
            });
          }
        }
      );
    });
  }

  /**
   * Upload video from Google Drive URL
   */
  async uploadVideoFromDriveUrl(
    driveUrl: string,
    options: Omit<YouTubeUploadOptions, 'videoUrl'>
  ): Promise<YouTubeUploadResult> {
    // Extract file ID from Drive URL
    const fileId = this.extractDriveFileId(driveUrl);
    if (!fileId) {
      throw new Error('Invalid Google Drive URL');
    }

    // Download from Drive
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    return this.uploadVideoFromUrl({
      ...options,
      videoUrl: downloadUrl,
    });
  }

  /**
   * Extract file ID from Google Drive URL
   */
  private extractDriveFileId(url: string): string | null {
    const patterns = [
      /drive\.google\.com\/file\/d\/([^\/]+)/,
      /drive\.google\.com\/open\?id=([^&]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  }

  /**
   * Get video info
   */
  async getVideoInfo(videoId: string) {
    const response = await this.youtube.videos.list({
      part: 'snippet,statistics',
      id: videoId,
    });

    return response.data.items[0];
  }

  /**
   * Delete video
   */
  async deleteVideo(videoId: string): Promise<void> {
    await this.youtube.videos.delete({
      id: videoId,
    });
  }

  /**
   * List uploaded videos
   */
  async listVideos(maxResults = 50) {
    const response = await this.youtube.videos.list({
      part: 'snippet,statistics',
      mine: true,
      maxResults,
    });

    return response.data.items;
  }
}

/**
 * Create YouTube uploader instance with environment variables
 */
export function createYouTubeUploader(): YouTubeUploader {
  const clientId = process.env.YOUTUBE_CLIENT_ID || '';
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET || '';
  const redirectUri = process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3000/api/auth/youtube/callback';

  if (!clientId || !clientSecret) {
    throw new Error('YouTube OAuth credentials not configured');
  }

  return new YouTubeUploader(clientId, clientSecret, redirectUri);
}
