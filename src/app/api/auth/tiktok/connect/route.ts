import { NextResponse } from "next/server";

// TikTok OAuth configuration
const TIKTOK_CONFIG = {
  clientId: process.env.TIKTOK_CLIENT_ID || 'awxg5h05uy9ok7sf',
  clientSecret: process.env.TIKTOK_CLIENT_SECRET || 'bxvJmq3pIkE43FMVynSeIB1QHirsxzMn',
  redirectUri: process.env.TIKTOK_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/tiktok/callback`,
};

export async function GET(request: Request) {
  // Generate a random state for security
  const state = `tiktok_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  // Build TikTok OAuth authorization URL
  const params = new URLSearchParams({
    client_key: TIKTOK_CONFIG.clientId,
    redirect_uri: TIKTOK_CONFIG.redirectUri,
    scope: 'user.info.basic,video.upload',
    response_type: 'code',
    state: state,
  });

  const authUrl = `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`;

  // Redirect to TikTok authorization page
  return NextResponse.redirect(authUrl);
}
