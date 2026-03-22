import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";
import { listRecentJobs } from "@/lib/firestore/repositories";
import { InstagramLogo } from "@/components/logos/instagram-logo";
import { TikTokLogo } from "@/components/logos/tiktok-logo";
import { YouTubeLogo } from "@/components/logos/youtube-logo";

export default async function DashboardPage() {
  const session = await requireServerSession();

  const recentJobs = await listRecentJobs(session.uid, 6).catch(() => []);

  return (
    <AppShell
      title="📊 Performance Dashboard"
      description="Pantau momentum produksi konten, progres job, dan peluang optimasi dari satu layar eksekutif."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStat 
          label="⚡ Jobs Hari Ini" 
          value={`${recentJobs.length}`} 
          color="from-pink-500 to-rose-600"
          icon="⚡"
        />
        <DashboardStat 
          label="🔗 Connected Account" 
          value="0" 
          color="from-purple-500 to-violet-600"
          icon="🔗"
        />
        <DashboardStat 
          label="🗓️ Schedule Aktif" 
          value="0" 
          color="from-cyan-500 to-blue-600"
          icon="🗓️"
        />
        <DashboardStat 
          label="💎 Plan" 
          value="Growth MVP" 
          color="from-amber-500 to-orange-600"
          icon="💎"
        />
      </div>

      <div className="rounded-2xl border-2 border-white/10 bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white">
          🚀 Akses Cepat
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickLink 
            href="/tools" 
            label="Katalog Tools"
            color="from-pink-500 to-rose-600"
            icon="🧰"
          />
          <QuickLink 
            href="/downloader" 
            label="Instagram Downloader"
            color="from-purple-500 to-violet-600"
            icon="📸"
          />
          <QuickLink 
            href="/scheduler-center" 
            label="Scheduler Center"
            color="from-cyan-500 to-blue-600"
            icon="🗓️"
          />
          <QuickLink 
            href="/tiktok-viewer" 
            label="TikTok Viewer"
            color="from-amber-500 to-orange-600"
            icon="👀"
          />
        </div>
      </div>

      <div className="rounded-2xl border-2 border-white/10 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white">
          🧠 Recent Jobs
        </h2>
        {recentJobs.length === 0 ? (
          <p className="mt-3 text-sm text-white/70">
            Belum ada job. Mulai eksekusi dari downloader atau scheduler untuk memicu pipeline pertumbuhan.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recentJobs.map((job) => (
              <li
                key={job.id}
                className="flex items-center justify-between rounded-xl border-2 border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {job.tool}
                  </p>
                  <p className="text-xs text-white/60">
                    {job.createdAt}
                  </p>
                </div>
                <span
                  className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold text-white"
                >
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Platform Status */}
      <div className="rounded-2xl border-2 border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white">
          📱 Platform Status
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <PlatformCard
            name="Instagram"
            logo={<InstagramLogo className="h-8 w-8" />}
            status="Connected"
            color="from-pink-500 to-rose-600"
          />
          <PlatformCard
            name="YouTube"
            logo={<YouTubeLogo className="h-8 w-8" />}
            status="Not Connected"
            color="from-red-500 to-orange-600"
          />
          <PlatformCard
            name="TikTok"
            logo={<TikTokLogo className="h-8 w-8" />}
            status="Not Connected"
            color="from-slate-800 to-slate-900"
          />
        </div>
      </div>
    </AppShell>
  );
}

function DashboardStat({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <article className={`relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br ${color} p-5 shadow-lg backdrop-blur-sm`}>
      <div className="absolute right-4 top-4 text-3xl opacity-20">
        {icon}
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-white/80">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>
    </article>
  );
}

function QuickLink({ href, label, color, icon }: { href: string; label: string; color: string; icon: string }) {
  return (
    <Link
      href={href}
      className={`boxy-btn group relative overflow-hidden inline-flex items-center justify-center rounded-xl border-2 border-white/20 bg-gradient-to-r ${color} px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon} {label}
      </span>
    </Link>
  );
}

function PlatformCard({ name, logo, status, color }: { name: string; logo: React.ReactNode; status: string; color: string }) {
  const isConnected = status === "Connected";
  
  return (
    <div className={`rounded-xl border-2 border-white/10 bg-gradient-to-br ${color} p-4 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2">
            {logo}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{name}</p>
            <p className={`text-xs font-medium ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
              {status}
            </p>
          </div>
        </div>
        <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}>
          {isConnected && (
            <span className="absolute flex h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          )}
        </div>
      </div>
    </div>
  );
}

