import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

export interface TikTokUploadOptions {
  title: string;
  description: string;
  hashtags?: string[];
  privacyLevel?: 'public_to_everyone' | 'friends_only' | 'self_only';
  videoPath?: string;
  videoUrl?: string;
  onProgress?: (progress: number) => void;
}

export interface TikTokUploadResult {
  videoId: string;
  url: string;
  shareUrl: string;
}

export interface TikTokOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * TikTok Uploader Service with OAuth 2.0
 * Uses TikTok's official OAuth 2.0 flow for authentication
 */
export class TikTokUploader {
  private config: TikTokOAuthConfig;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  constructor(config: TikTokOAuthConfig) {
    this.config = config;
  }

  /**
   * Get OAuth authorization URL
   */
  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_key: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: 'user.info.basic,video.upload',
      response_type: 'code',
      state: state || 'random_state_' + Date.now(),
    });

    return `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }> {
    try {
      const response = await axios.post(
        'https://open.tiktokapis.com/v2/oauth/token/',
        new URLSearchParams({
          client_key: this.config.clientId,
          client_secret: this.config.clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data = response.data.data;
      
      // Store tokens
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.tokenExpiresAt = Date.now() + (data.expires_in * 1000);

      return data;
    } catch (error: any) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
      throw new Error('Failed to exchange authorization code for access token');
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(
        'https://open.tiktokapis.com/v2/oauth/token/',
        new URLSearchParams({
          client_key: this.config.clientId,
          client_secret: this.config.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data = response.data.data;
      
      // Update tokens
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.tokenExpiresAt = Date.now() + (data.expires_in * 1000);

      return data;
    } catch (error: any) {
      console.error('Error refreshing token:', error.response?.data || error.message);
      throw new Error('Failed to refresh access token');
    }
  }

  /**
   * Set credentials directly (for already authenticated sessions)
   */
  setCredentials(accessToken: string, refreshToken?: string, expiresAt?: number) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken || null;
    this.tokenExpiresAt = expiresAt || null;
  }

  /**
   * Get valid access token, refreshing if necessary
   */
  private async getValidAccessToken(): Promise<string> {
    if (!this.accessToken) {
      throw new Error('No access token available. Please authenticate first.');
    }

    // Check if token is expired or will expire soon (5 minutes buffer)
    if (this.tokenExpiresAt && Date.now() > this.tokenExpiresAt - 300000) {
      await this.refreshAccessToken();
    }

    return this.accessToken!;
  }

  /**
   * Upload video from URL
   */
  async uploadVideoFromUrl(options: TikTokUploadOptions): Promise<TikTokUploadResult> {
    const {
      title,
      description,
      hashtags = [],
      privacyLevel = 'public_to_everyone',
      videoUrl,
      onProgress,
    } = options;

    if (!videoUrl) {
      throw new Error('videoUrl is required for URL upload');
    }

    // Get valid access token
    const accessToken = await this.getValidAccessToken();

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

    return this.uploadVideoBuffer({
      title,
      description,
      hashtags,
      privacyLevel,
      videoBuffer,
      fileSize: videoBuffer.length,
      onProgress,
    });
  }

  /**
   * Upload video from Google Drive URL
   */
  async uploadVideoFromDriveUrl(
    driveUrl: string,
    options: Omit<TikTokUploadOptions, 'videoUrl'>
  ): Promise<TikTokUploadResult> {
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
   * Upload video buffer to TikTok
   */
  private async uploadVideoBuffer(options: {
    title: string;
    description: string;
    hashtags: string[];
    privacyLevel: string;
    videoBuffer: Buffer;
    fileSize: number;
    onProgress?: (progress: number) => void;
  }): Promise<TikTokUploadResult> {
    const {
      title,
      description,
      hashtags,
      privacyLevel,
      videoBuffer,
      fileSize,
      onProgress,
    } = options;

    try {
      const accessToken = await this.getValidAccessToken();

      // Step 1: Initialize upload
      const initResponse = await axios.post(
        'https://open.tiktokapis.com/v2/video/upload/',
        {
          video_size: fileSize,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { data: { upload_url, video_id } } = initResponse.data;

      // Step 2: Upload video file
      await axios.put(upload_url, videoBuffer, {
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Range': `bytes 0-${fileSize - 1}/${fileSize}`,
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress(Math.round(progress));
          }
        },
      });

      // Step 3: Publish video with metadata
      const publishResponse = await axios.post(
        'https://open.tiktokapis.com/v2/video/publish/',
        {
          video_id: video_id,
          caption: this.formatCaption(description, hashtags),
          privacy_level: privacyLevel,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { data: { data: { video: { id, share_url, video_url } } } } = publishResponse.data;

      return {
        videoId: id,
        url: video_url,
        shareUrl: share_url,
      };
    } catch (error: any) {
      console.error('Error uploading to TikTok:', error.response?.data || error.message);
      throw new Error(`Failed to upload to TikTok: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Format caption with hashtags
   */
  private formatCaption(description: string, hashtags: string[]): string {
    const hashtagString = hashtags.map(tag => 
      tag.startsWith('#') ? tag : `#${tag}`
    ).join(' ');
    
    return `${description}\n\n${hashtagString}`;
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
    const accessToken = await this.getValidAccessToken();

    try {
      const response = await axios.get(
        `https://open.tiktokapis.com/v2/video/query/?ids=${videoId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.data.videos[0];
    } catch (error: any) {
      console.error('Error getting video info:', error.response?.data || error.message);
      throw new Error('Failed to get video info');
    }
  }

  /**
   * Delete video
   */
  async deleteVideo(videoId: string): Promise<void> {
    const accessToken = await this.getValidAccessToken();

    try {
      await axios.post(
        'https://open.tiktokapis.com/v2/video/delete/',
        {
          video_id: videoId,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      console.error('Error deleting video:', error.response?.data || error.message);
      throw new Error('Failed to delete video');
    }
  }

  /**
   * List uploaded videos
   */
  async listVideos(maxResults = 50, cursor?: string) {
    const accessToken = await this.getValidAccessToken();

    try {
      const params: any = {
        max_count: maxResults,
      };

      if (cursor) {
        params.cursor = cursor;
      }

      const response = await axios.get(
        'https://open.tiktokapis.com/v2/video/list/',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          params,
        }
      );

      return response.data.data;
    } catch (error: any) {
      console.error('Error listing videos:', error.response?.data || error.message);
      throw new Error('Failed to list videos');
    }
  }
}

/**
 * Create TikTok uploader instance
 */
export function createTikTokUploader(config: TikTokOAuthConfig): TikTokUploader {
  return new TikTokUploader(config);
}

/**
 * Format description with hashtags
 */
export function formatTikTokDescription(
  description: string,
  hashtags: string[] = []
): string {
  const hashtagString = hashtags.map(tag => 
    tag.startsWith('#') ? tag : `#${tag}`
  ).join(' ');
  
  return `${description}\n\n${hashtagString}`;
}
