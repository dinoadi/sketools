import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";
import { listRecentJobs } from "@/lib/firestore/repositories";

export default async function DashboardPage() {
  const session = await requireServerSession();

  const recentJobs = await listRecentJobs(session.uid, 6).catch(() => []);

  return (
    <AppShell
      title="📊 Performance Dashboard"
      description="Pantau momentum produksi konten, progres job, dan peluang optimasi dari satu layar eksekutif."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStat label="⚡ Jobs Hari Ini" value={`${recentJobs.length}`} />
        <DashboardStat label="🔗 Connected Account" value="0" />
        <DashboardStat label="🗓️ Schedule Aktif" value="0" />
        <DashboardStat label="💎 Plan" value="Growth MVP" />
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          🚀 Akses Cepat
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickLink href="/tools" label="Katalog Tools" />
          <QuickLink href="/downloader" label="Instagram Downloader" />
          <QuickLink href="/scheduler-center" label="Scheduler Center" />
          <QuickLink href="/tiktok-viewer" label="TikTok Viewer" />
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          🧠 Recent Jobs
        </h2>
        {recentJobs.length === 0 ? (
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            Belum ada job. Mulai eksekusi dari downloader atau scheduler untuk memicu pipeline pertumbuhan.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recentJobs.map((job) => (
              <li
                key={job.id}
                className="flex items-center justify-between rounded-xl border px-3 py-2"
                style={{ borderColor: "var(--border)", background: "var(--surface-strong)" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {job.tool}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {job.createdAt}
                  </p>
                </div>
                <span
                  className="rounded-md px-2 py-1 text-xs font-semibold"
                  style={{ background: "var(--surface)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                >
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}

function DashboardStat({ label, value }: { label: string; value: string }) {
  return (
    <article className="glass rounded-2xl p-5">
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
        {value}
      </p>
    </article>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="interactive-btn inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold"
      style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
    >
      ✨ {label}
    </Link>
  );
}

