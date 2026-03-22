import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";

export default async function SettingsPage() {
  const session = await requireServerSession();

  return (
    <AppShell
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
            <span className="text-2xl">⚙️</span>
          </div>
          <span className="text-white">Settings</span>
        </div>
      }
      description="Kelola profil, preferensi, dan konfigurasi kerja agar operasional konten selalu konsisten dan efisien."
    >
      <article className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-2xl">
        <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-2xl"></div>
        <div className="relative">
          <h2 className="text-lg font-bold text-white">
            👤 Profile
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl border-2 border-white/20 bg-white/5 p-4 backdrop-blur-sm">
              <dt className="font-semibold text-white">
                User ID
              </dt>
              <dd className="mt-1 text-white/70 font-mono text-xs">{session.uid}</dd>
            </div>
            <div className="rounded-xl border-2 border-white/20 bg-white/5 p-4 backdrop-blur-sm">
              <dt className="font-semibold text-white">
                Email
              </dt>
              <dd className="mt-1 text-white/70">{session.email ?? "-"}</dd>
            </div>
          </dl>
        </div>
      </article>

      <article className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-sm shadow-2xl">
        <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-2xl"></div>
        <div className="relative">
          <h2 className="text-lg font-bold text-white">
            🌐 Default Timezone
          </h2>
          <div className="mt-4 rounded-xl border-2 border-white/20 bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-sm text-white/70">
              Saat ini workflow menggunakan timezone default <strong className="text-white">Asia/Jakarta</strong> untuk sinkronisasi jadwal tim.
            </p>
          </div>
        </div>
      </article>
    </AppShell>
  );
}

