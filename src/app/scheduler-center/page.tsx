"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";

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
      title="🗓️ Scheduler Center"
      description="Jadwalkan konten YouTube dan TikTok Anda secara otomatis dari URL video atau cloud storage."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Section */}
        <section className="glass col-span-2 rounded-2xl p-6">
          <h2 className="mb-6 text-xl font-semibold">Buat Jadwal Upload Baru</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Pilih Platform</span>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="rounded-xl border px-3 py-2.5 text-sm outline-none transition"
                  style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
                >
                  <option value="youtube">📺 YouTube</option>
                  <option value="tiktok">🎵 TikTok</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Waktu Upload</span>
                <input
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="rounded-xl border px-3 py-2.5 text-sm outline-none transition"
                  style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
                  required
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Video URL (Direct link, Drive, or Cloud)</span>
              <input
                type="url"
                placeholder="https://example.com/video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="rounded-xl border px-3 py-2.5 text-sm outline-none transition"
                style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Judul Konten</span>
              <input
                type="text"
                placeholder="Judul menarik untuk konten Anda"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl border px-3 py-2.5 text-sm outline-none transition"
                style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Deskripsi / Captions</span>
              <textarea
                placeholder="Tambahkan deskripsi dan hashtags..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="rounded-xl border px-3 py-2.5 text-sm outline-none transition"
                style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="interactive-btn mt-2 flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : "🗓️ Jadwalkan Sekarang"}
            </button>

            {message && (
              <p className={`rounded-xl border p-4 text-sm ${
                message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"
              }`}>
                {message.text}
              </p>
            )}
          </form>
        </section>

        {/* Info Section */}
        <aside className="flex flex-col gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold">💡 Tips Scheduling</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>• Gunakan direct link video (MP4) agar proses download cepat.</li>
              <li>• Pastikan akun sudah terhubung di menu <b>Connected Accounts</b>.</li>
              <li>• Upload massal akan diproses satu per satu sesuai antrean.</li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold">📈 Status Antrean</h3>
            <p className="mt-2 text-sm text-muted">
              Semua jadwal upload Anda bisa dipantau di halaman Dashboard untuk melihat status real-time.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
