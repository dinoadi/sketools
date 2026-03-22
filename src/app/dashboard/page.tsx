import Link from "next/link";
import { requireServerSession } from "@/lib/auth/require-session";
import { listRecentJobs } from "@/lib/firestore/repositories";
import { InstagramLogo } from "@/components/logos/instagram-logo";
import { TikTokLogo } from "@/components/logos/tiktok-logo";
import { YouTubeLogo } from "@/components/logos/youtube-logo";
import { WhatsAppLogo } from "@/components/logos/whatsapp-logo";

export default async function DashboardPage() {
  const session = await requireServerSession();
  const recentJobs = await listRecentJobs(session.uid, 6).catch(() => []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SkeTools</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/connected-accounts"
                className="rounded-xl border-2 border-purple-500/30 bg-purple-100/50 dark:bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-100/80 dark:hover:bg-purple-900/50"
              >
                Accounts
              </Link>
              <Link
                href="/settings"
                className="rounded-xl border-2 border-purple-500/30 bg-purple-100/50 dark:bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-100/80 dark:hover:bg-purple-900/50"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back, <span className="gradient-text">Admin</span>! 👋
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Here's what's happening with your content today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStat 
            label="Jobs Hari Ini" 
            value={`${recentJobs.length}`} 
            color="from-pink-500 to-rose-600"
            icon="⚡"
            trend="+12%"
          />
          <DashboardStat 
            label="Connected Account" 
            value="0" 
            color="from-purple-500 to-violet-600"
            icon="🔗"
            trend="0%"
          />
          <DashboardStat 
            label="Schedule Aktif" 
            value="0" 
            color="from-cyan-500 to-blue-600"
            icon="🗓️"
            trend="+5%"
          />
          <DashboardStat 
            label="Total Downloads" 
            value="1,234" 
            color="from-emerald-500 to-green-600"
            icon="📥"
            trend="+23%"
          />
        </div>

        {/* Quick Access */}
        <div className="mb-8 rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-800/80 p-6 backdrop-blur-sm shadow-xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            🚀 Quick Access
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickLink 
              href="/downloader" 
              label="Instagram Downloader"
              color="from-pink-500 to-rose-600"
              icon={<InstagramLogo className="h-6 w-6" />}
            />
            <QuickLink 
              href="/scheduler-center" 
              label="Content Scheduler"
              color="from-purple-500 to-violet-600"
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            />
            <QuickLink 
              href="/tiktok-viewer" 
              label="TikTok Viewer"
              color="from-cyan-500 to-blue-600"
              icon={<TikTokLogo className="h-6 w-6" />}
            />
            <QuickLink 
              href="/whatsapp-checker" 
              label="WhatsApp Checker"
              color="from-emerald-500 to-green-600"
              icon={<WhatsAppLogo className="h-6 w-6" />}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Jobs */}
          <div className="rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-800/80 p-6 backdrop-blur-sm shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              🧠 Recent Jobs
            </h2>
            {recentJobs.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-purple-300/50 dark:border-purple-700/50 bg-purple-50/50 dark:bg-purple-900/20 p-8 text-center backdrop-blur-sm">
                <div className="mb-4 text-4xl">📭</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Belum ada job. Mulai eksekusi dari downloader atau scheduler untuk memicu pipeline pertumbuhan.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentJobs.map((job) => (
                  <li
                    key={job.id}
                    className="group flex items-center justify-between rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-900/20 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:shadow-lg"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {job.tool}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {job.createdAt}
                      </p>
                    </div>
                    <span
                      className={`rounded-xl border-2 px-3 py-1 text-xs font-semibold ${
                        job.status === 'completed' 
                          ? 'border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                          : job.status === 'running'
                          ? 'border-amber-500/30 bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'border-red-500/30 bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {job.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Platform Status */}
          <div className="rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-800/80 p-6 backdrop-blur-sm shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              📱 Platform Status
            </h2>
            <div className="space-y-4">
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
                color="from-cyan-500 to-blue-600"
              />
              <PlatformCard
                name="WhatsApp"
                logo={<WhatsAppLogo className="h-8 w-8" />}
                status="Active"
                color="from-emerald-500 to-green-600"
              />
            </div>
          </div>
        </div>

        {/* Tools Catalog */}
        <div className="mt-8 rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-800/80 p-6 backdrop-blur-sm shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🧰 All Tools
            </h2>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-purple-500/30 bg-purple-100/50 dark:bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-100/80 dark:hover:bg-purple-900/50"
            >
              <span>View All</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              href="/downloader"
              name="Instagram Downloader"
              description="Download reels, videos, and images from Instagram"
              color="from-pink-500 to-rose-600"
              icon={<InstagramLogo className="h-6 w-6" />}
            />
            <ToolCard
              href="/scheduler-center"
              name="Content Scheduler"
              description="Schedule uploads to YouTube and TikTok"
              color="from-purple-500 to-violet-600"
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            />
            <ToolCard
              href="/tiktok-viewer"
              name="TikTok Viewer"
              description="View and analyze TikTok accounts"
              color="from-cyan-500 to-blue-600"
              icon={<TikTokLogo className="h-6 w-6" />}
            />
            <ToolCard
              href="/whatsapp-checker"
              name="WhatsApp Checker"
              description="Check WhatsApp numbers and get profile info"
              color="from-emerald-500 to-green-600"
              icon={<WhatsAppLogo className="h-6 w-6" />}
            />
            <ToolCard
              href="/connected-accounts"
              name="Connected Accounts"
              description="Manage your connected social media accounts"
              color="from-amber-500 to-orange-600"
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
            <ToolCard
              href="/settings"
              name="Settings"
              description="Configure your preferences and settings"
              color="from-gray-500 to-gray-700"
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardStat({ label, value, color, icon, trend }: { label: string; value: string; color: string; icon: string; trend: string }) {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className={`group relative overflow-hidden rounded-3xl border-2 border-white/50 dark:border-white/10 bg-gradient-to-br ${color} p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
      <div className="absolute right-4 top-4 text-5xl opacity-20 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
        {label}
      </p>
      <p className="mt-2 text-4xl font-bold text-white">
        {value}
      </p>
      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{trend}</span>
      </div>
    </div>
  );
}

function QuickLink({ href, label, color, icon }: { href: string; label: string; color: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border-2 border-white/50 dark:border-white/10 bg-gradient-to-br ${color} p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="relative z-10">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
        <p className="text-sm font-semibold text-white">
          {label}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}

function PlatformCard({ name, logo, status, color }: { name: string; logo: React.ReactNode; status: string; color: string }) {
  const isConnected = status === "Connected" || status === "Active";
  
  return (
    <div className={`group flex items-center justify-between rounded-2xl border-2 border-white/50 dark:border-white/10 bg-gradient-to-br ${color} p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
          {logo}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className={`text-xs font-semibold ${isConnected ? 'text-emerald-100' : 'text-amber-100'}`}>
            {status}
          </p>
        </div>
      </div>
      <div className={`relative h-3 w-3 rounded-full ${isConnected ? 'bg-emerald-300' : 'bg-amber-300'}`}>
        {isConnected && (
          <span className="absolute inset-0 flex h-3 w-3 animate-ping rounded-full bg-emerald-300 opacity-75"></span>
        )}
      </div>
    </div>
  );
}

function ToolCard({ href, name, description, color, icon }: { href: string; name: string; description: string; color: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/50 dark:bg-gray-800/50 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-500/60"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Link>
  );
}
