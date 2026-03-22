import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// TikTok OAuth configuration
const TIKTOK_CONFIG = {
  clientId: process.env.TIKTOK_CLIENT_ID || 'awxg5h05uy9ok7sf',
  clientSecret: process.env.TIKTOK_CLIENT_SECRET || 'bxvJmq3pIkE43FMVynSeIB1QHirsxzMn',
  redirectUri: process.env.TIKTOK_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/tiktok/callback`,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/connected-accounts?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/connected-accounts?error=missing_code", request.url)
    );
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_key: TIKTOK_CONFIG.clientId,
        client_secret: TIKTOK_CONFIG.clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: TIKTOK_CONFIG.redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error) {
      throw new Error(tokenData.error_description || "Failed to exchange code for token");
    }

    const { access_token, refresh_token, expires_in, open_id } = tokenData.data;

    // Get user info from TikTok
    const userResponse = await fetch("https://open.tiktokapis.com/v2/user/info/", {
      headers: {
        "Authorization": `Bearer ${access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok || userData.error) {
      throw new Error(userData.error_description || "Failed to get user info");
    }

    const userInfo = userData.data.user;

    // Get current user from Firebase session
    const auth = getAuth();
    const sessionCookie = request.headers.get("cookie") || "";
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Store TikTok connection in Firestore
    const db = getFirestore();
    const connectionRef = await db.collection("connected_accounts").add({
      userId: decodedClaims.uid,
      provider: "tiktok",
      providerAccountId: open_id,
      channelName: userInfo.display_name || userInfo.username,
      tokenCiphertext: access_token, // In production, encrypt this
      refreshTokenCiphertext: refresh_token, // In production, encrypt this
      tokenExpiresAt: new Date(Date.now() + expires_in * 1000).toISOString(),
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Redirect to connected accounts page with success
    return NextResponse.redirect(
      new URL("/connected-accounts?success=tiktok", request.url)
    );
  } catch (error: any) {
    console.error("TikTok OAuth callback error:", error);
    return NextResponse.redirect(
      new URL(`/connected-accounts?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}
