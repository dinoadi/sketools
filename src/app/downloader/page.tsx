"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { InstagramLogo } from "@/components/logos/instagram-logo";

interface ReelPreview {
  id: string;
  thumbnail: string;
  url: string;
  caption: string;
}

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [previews, setPreviews] = useState<ReelPreview[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSingleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/downloader/instagram", {
        method: "POST",
        body: JSON.stringify({ url, type: "single" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunduh");
      alert("Download dimulai! Cek dashboard untuk status.");
      setUrl("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setIsLoading(true);
    setError(null);
    setPreviews([]);
    setSelectedIds(new Set());
    try {
      const res = await fetch(`/api/downloader/instagram?username=${username}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengambil data");
      setPreviews(data.reels);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMassDownload = async () => {
    if (selectedIds.size === 0) return;
    setIsLoading(true);
    setError(null);
    try {
      const selectedReels = previews.filter(p => selectedIds.has(p.id));
      const res = await fetch("/api/downloader/instagram", {
        method: "POST",
        body: JSON.stringify({ reels: selectedReels, type: "mass" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses mass download");
      alert(`${selectedIds.size} download dimulai!`);
      setPreviews([]);
      setSelectedIds(new Set());
      setUsername("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectAll = () => {
    if (selectedIds.size === previews.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(previews.map(p => p.id)));
    }
  };

  return (
    <AppShell
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/30">
            <InstagramLogo className="h-6 w-6 text-white" />
          </div>
          <span className="text-white">Instagram Reels Downloader</span>
        </div>
      }
      description="Unduh reels satuan atau massal dari username target dengan preview seleksi."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Single Download */}
        <section className="relative overflow-hidden rounded-2xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-rose-500/10 p-6 backdrop-blur-sm shadow-2xl">
          <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/10 blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/30">
                <InstagramLogo className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Single URL Download</h2>
            </div>
            <form onSubmit={handleSingleDownload} className="flex flex-col gap-3">
              <input
                type="url"
                placeholder="https://www.instagram.com/reels/..."
                className="w-full rounded-xl border-2 border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none transition focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 backdrop-blur-sm"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="interactive-btn flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? "Memproses..." : "Download Sekarang"}
              </button>
            </form>
          </div>
        </section>

        {/* Mass Download Search */}
        <section className="relative overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-2xl">
          <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30">
                <InstagramLogo className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Mass Download by Username</h2>
            </div>
            <form onSubmit={handleFetchUsername} className="flex flex-col gap-3">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">@</span>
                <input
                  type="text"
                  placeholder="username_instagram"
                  className="w-full rounded-xl border-2 border-white/20 bg-white/5 py-2.5 pl-8 pr-4 text-sm text-white placeholder-white/50 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="interactive-btn flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? "Cari Reels..." : "Tampilkan Preview"}
              </button>
            </form>
          </div>
        </section>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border-2 border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-red-500/10 p-4 text-sm text-rose-300 backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-white">
              Hasil Discovery ({previews.length} reels ditemukan)
            </h3>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="rounded-xl border-2 border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/30"
              >
                {selectedIds.size === previews.length ? "Batalkan Semua" : "Pilih Semua"}
              </button>
              <button
                onClick={handleMassDownload}
                disabled={selectedIds.size === 0 || isLoading}
                className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 disabled:opacity-50"
              >
                Download {selectedIds.size} Selected
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {previews.map((reel) => (
              <div
                key={reel.id}
                onClick={() => toggleSelect(reel.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all hover:scale-105 ${
                  selectedIds.has(reel.id) 
                    ? "border-pink-500 ring-2 ring-pink-500/20 shadow-lg shadow-pink-500/30" 
                    : "border-white/20 hover:border-pink-500/50"
                }`}
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.caption}
                  className="aspect-[9/16] w-full object-cover transition group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                  <p className="line-clamp-2 text-[10px] text-white font-medium">{reel.caption}</p>
                </div>
                {selectedIds.has(reel.id) && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/50">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
