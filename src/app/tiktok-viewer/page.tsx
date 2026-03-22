"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { TikTokLogo } from "@/components/logos/tiktok-logo";

interface TikTokVideo {
  id: string;
  thumbnail: string;
  url: string;
  caption: string;
  stats: {
    views: string;
    likes: string;
    comments: string;
    shares: string;
  };
}

export default function TikTokViewerPage() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setVideos([]);

    try {
      const res = await fetch(`/api/tiktok/view?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengambil data TikTok");
      setVideos(data.videos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-pink-600 shadow-lg shadow-cyan-500/30">
            <TikTokLogo className="h-6 w-6 text-white" />
          </div>
          <span className="text-white">TikTok Viewer (No Login)</span>
        </div>
      }
      description="Lihat video dari username TikTok tanpa harus login. Cukup masukkan username atau link profil."
    >
      <section className="relative overflow-hidden mx-auto max-w-2xl rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-2xl">
        <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/10 blur-2xl"></div>
        <div className="relative">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">@</span>
              <input
                type="text"
                placeholder="username_tiktok"
                className="w-full rounded-xl border-2 border-white/20 bg-white/5 py-2.5 pl-8 pr-4 text-sm text-white placeholder-white/50 outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="interactive-btn rounded-xl bg-gradient-to-r from-cyan-500 to-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? "Mencari..." : "Lihat"}
            </button>
          </form>
        </div>
      </section>

      {error && (
        <div className="mx-auto mt-6 max-w-2xl rounded-xl border-2 border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-red-500/10 p-4 text-sm text-rose-300 backdrop-blur-sm">
          {error}
        </div>
      )}

      {videos.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-6 text-lg font-bold text-white">
            Video Terbaru dari @{query.replace("@", "")}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-white/20 bg-white/5 transition-all hover:scale-105 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm"
              >
                <div className="aspect-[9/16] w-full overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.caption}
                    className="h-full w-full object-cover transition group-hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-xs font-semibold text-white">
                    {video.caption || "No caption"}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-white/70">
                    <span>👁️ {video.stats.views}</span>
                    <span>❤️ {video.stats.likes}</span>
                    <span>💬 {video.stats.comments}</span>
                    <span>🔗 {video.stats.shares}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {videos.length === 0 && !isLoading && !error && (
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 shadow-lg shadow-cyan-500/20">
            <span className="text-4xl">🔎</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Masukkan username TikTok di atas untuk mulai melihat konten tanpa login.
          </p>
        </div>
      )}
    </AppShell>
  );
}
