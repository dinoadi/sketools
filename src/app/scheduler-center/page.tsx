"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { YouTubeLogo } from "@/components/logos/youtube-logo";
import { TikTokLogo } from "@/components/logos/tiktok-logo";

export default function SchedulerCenterPage() {
  const [platform, setPlatform] = useState<"youtube" | "tiktok">("youtube");
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/scheduler", {
        method: "POST",
        body: JSON.stringify({
          platform,
          videoUrl,
          title,
          description,
          scheduleTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat jadwal");

      setMessage({ type: "success", text: "Jadwal berhasil dibuat! Video akan diupload otomatis." });
      setVideoUrl("");
      setTitle("");
      setDescription("");
      setScheduleTime("");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg shadow-red-500/30">
            <YouTubeLogo className="h-6 w-6 text-white" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-pink-600 shadow-lg shadow-cyan-500/30">
            <TikTokLogo className="h-6 w-6 text-white" />
          </div>
          <span className="text-white">Scheduler Center</span>
        </div>
      }
      description="Jadwalkan konten YouTube dan TikTok Anda secara otomatis dari URL video atau cloud storage."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Section */}
        <section className="relative overflow-hidden col-span-2 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-2xl">
          <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-2xl"></div>
          <div className="relative">
            <h2 className="mb-6 text-xl font-bold text-white">Buat Jadwal Upload Baru</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-white">Pilih Platform</span>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="rounded-xl border-2 border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                  >
                    <option value="youtube" className="bg-slate-900">YouTube</option>
                    <option value="tiktok" className="bg-slate-900">TikTok</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-white">Waktu Upload</span>
                  <input
                    type="datetime-local"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="rounded-xl border-2 border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-white">Video URL (Direct link, Drive, or Cloud)</span>
                <input
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="rounded-xl border-2 border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/50 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-white">Judul Konten</span>
                <input
                  type="text"
                  placeholder="Judul menarik untuk konten Anda"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl border-2 border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/50 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-white">Deskripsi / Captions</span>
                <textarea
                  placeholder="Tambahkan deskripsi dan hashtags..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="rounded-xl border-2 border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/50 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                />
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className={`interactive-btn mt-2 flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 ${
                  platform === "youtube" 
                    ? "bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/30" 
                    : "bg-gradient-to-r from-cyan-500 via-pink-500 to-pink-600 shadow-cyan-500/30"
                }`}
              >
                {isLoading ? "Memproses..." : "Jadwalkan Sekarang"}
              </button>

              {message && (
                <p className={`rounded-xl border-2 p-4 text-sm backdrop-blur-sm ${
                  message.type === "success" 
                    ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-green-500/10 text-emerald-300" 
                    : "border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-red-500/10 text-rose-300"
                }`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Info Section */}
        <aside className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-sm shadow-2xl">
            <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-2xl"></div>
            <div className="relative">
              <h3 className="font-bold text-white">💡 Tips Scheduling</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>• Gunakan direct link video (MP4) agar proses download cepat.</li>
                <li>• Pastikan akun sudah terhubung di menu <b className="text-white">Connected Accounts</b>.</li>
                <li>• Upload massal akan diproses satu per satu sesuai antrean.</li>
              </ul>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 backdrop-blur-sm shadow-2xl">
            <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-2xl"></div>
            <div className="relative">
              <h3 className="font-bold text-white">📈 Status Antrean</h3>
              <p className="mt-2 text-sm text-white/70">
                Semua jadwal upload Anda bisa dipantau di halaman Dashboard untuk melihat status real-time.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
