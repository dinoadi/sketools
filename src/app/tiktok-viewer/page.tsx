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
        <div className="flex items-center gap-2">
          <TikTokLogo className="h-6 w-6" />
          <span>TikTok Viewer (No Login)</span>
        </div>
      }
      description="Lihat video dari username TikTok tanpa harus login. Cukup masukkan username atau link profil."
    >
      <section className="glass mx-auto max-w-2xl rounded-2xl p-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">@</span>
            <input
              type="text"
              placeholder="username_tiktok"
              className="w-full rounded-xl border py-2.5 pl-8 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-cyan-500/20"
              style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="interactive-btn rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isLoading ? "Mencari..." : "Lihat"}
          </button>
        </form>
      </section>

      {error && (
        <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
          {error}
        </div>
      )}

      {videos.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-6 text-lg font-semibold text-foreground">
            Video Terbaru dari @{query.replace("@", "")}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-xl border transition hover:border-primary"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="aspect-[9/16] w-full overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.caption}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-xs font-medium" style={{ color: "var(--foreground)" }}>
                    {video.caption || "No caption"}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: "var(--muted)" }}>
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
          <span className="mb-4 text-4xl">🔎</span>
          <p className="max-w-xs text-sm" style={{ color: "var(--muted)" }}>
            Masukkan username TikTok di atas untuk mulai melihat konten tanpa login.
          </p>
        </div>
      )}
    </AppShell>
  );
}
