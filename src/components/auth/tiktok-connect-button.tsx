"use client";

import { TikTokLogo } from "@/components/logos/tiktok-logo";

interface TikTokConnectButtonProps {
  className?: string;
  label?: string;
}

export function TikTokConnectButton({ 
  className = "", 
  label = "Connect TikTok" 
}: TikTokConnectButtonProps) {
  const handleConnect = () => {
    // Redirect to TikTok OAuth connect endpoint
    window.location.href = "/api/auth/tiktok/connect";
  };

  return (
    <button
      onClick={handleConnect}
      className={`
        flex items-center justify-center gap-2 px-6 py-3
        bg-gradient-to-r from-cyan-500 to-cyan-600
        text-white font-medium
        hover:from-cyan-600 hover:to-cyan-700
        transition-all duration-200
        hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30
        ${className}
      `}
    >
      <TikTokLogo className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}
