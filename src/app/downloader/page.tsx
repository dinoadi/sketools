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
        <div className="flex items-center gap-2">
          <InstagramLogo className="h-6 w-6" />
          <span>Instagram Reels Downloader</span>
        </div>
      }
      description="Unduh reels satuan atau massal dari username target dengan preview seleksi."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Single Download */}
        <section className="glass flex flex-col gap-4 rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-500">
              <InstagramLogo className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">Single URL Download</h2>
          </div>
          <form onSubmit={handleSingleDownload} className="flex flex-col gap-3">
            <input
              type="url"
              placeholder="https://www.instagram.com/reels/..."
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-purple-500/20"
              style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="interactive-btn flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : "Download Sekarang"}
            </button>
          </form>
        </section>

        {/* Mass Download Search */}
        <section className="glass flex flex-col gap-4 rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/10 to-orange-500/10 text-pink-500">
              <InstagramLogo className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">Mass Download by Username</h2>
          </div>
          <form onSubmit={handleFetchUsername} className="flex flex-col gap-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">@</span>
              <input
                type="text"
                placeholder="username_instagram"
                className="w-full rounded-xl border py-2.5 pl-8 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-pink-500/20"
                style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="interactive-btn flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isLoading ? "Cari Reels..." : "Tampilkan Preview"}
            </button>
          </form>
        </section>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
          {error}
        </div>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Hasil Discovery ({previews.length} reels ditemukan)
            </h3>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-surface-strong"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
              >
                {selectedIds.size === previews.length ? "Batalkan Semua" : "Pilih Semua"}
              </button>
              <button
                onClick={handleMassDownload}
                disabled={selectedIds.size === 0 || isLoading}
                className="rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
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
                className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                  selectedIds.has(reel.id) ? "border-pink-500 ring-2 ring-pink-500/20" : "border-transparent"
                }`}
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.caption}
                  className="aspect-[9/16] w-full object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                  <p className="line-clamp-2 text-[10px] text-white">{reel.caption}</p>
                </div>
                {selectedIds.has(reel.id) && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
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
