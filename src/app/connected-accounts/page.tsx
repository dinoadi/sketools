import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";
import { listConnectedAccounts } from "@/lib/firestore/repositories";
import { YouTubeLogo } from "@/components/logos/youtube-logo";
import { TikTokLogo } from "@/components/logos/tiktok-logo";

export default async function ConnectedAccountsPage() {
  const session = await requireServerSession();
  const accounts = await listConnectedAccounts(session.uid).catch(() => []);

  return (
    <AppShell
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30">
            <span className="text-2xl">🔗</span>
          </div>
          <span className="text-white">Connected Accounts</span>
        </div>
      }
      description="Hubungkan akun platform Anda untuk menciptakan workflow publish otomatis yang stabil dan scalable."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <ProviderCard
          title="YouTube"
          description="Hubungkan channel YouTube menggunakan OAuth dan simpan token terenkripsi."
          status={accounts.some((a) => a.provider === "youtube") ? "Connected" : "Not connected"}
          color="from-red-500 to-red-600"
          borderColor="border-red-500/30"
          icon={<YouTubeLogo className="h-6 w-6 text-white" />}
        />
        <ProviderCard
          title="TikTok"
          description="Hubungkan akun TikTok untuk posting terjadwal melalui worker pipeline."
          status={accounts.some((a) => a.provider === "tiktok") ? "Connected" : "Not connected"}
          color="from-cyan-500 to-pink-600"
          borderColor="border-cyan-500/30"
          icon={<TikTokLogo className="h-6 w-6 text-white" />}
        />
      </div>

      <article className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-2xl">
        <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-2xl"></div>
        <div className="relative">
          <h2 className="text-lg font-bold text-white">
            📋 Daftar Akun Tersambung
          </h2>
          {accounts.length === 0 ? (
            <p className="mt-3 text-sm text-white/70">
              Belum ada akun terhubung. Hubungkan akun untuk membuka otomasi lintas platform.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {accounts.map((account) => (
                <li
                  key={account.id}
                  className="flex items-center justify-between rounded-xl border-2 border-white/20 bg-white/5 px-4 py-3 backdrop-blur-sm transition hover:border-white/30"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {account.provider}
                    </p>
                    <p className="text-xs text-white/70">
                      {account.providerAccountId}
                    </p>
                  </div>
                  <span className="rounded-xl border-2 border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                    {account.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </AppShell>
  );
}

function ProviderCard({
  title,
  description,
  status,
  color,
  borderColor,
  icon,
}: {
  title: string;
  description: string;
  status: string;
  color: string;
  borderColor: string;
  icon: React.ReactNode;
}) {
  const isConnected = status === "Connected";
  
  return (
    <article className="group relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-6 backdrop-blur-sm shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
      style={{ 
        borderColor: borderColor.replace('/30', '/20'),
        background: `linear-gradient(135deg, ${color.split(' ')[0].replace('from-', '')}10, ${color.split(' ')[1].replace('to-', '')}10)`
      }}
    >
      <div className={`absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br ${color} blur-2xl opacity-20`}></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
              {icon}
            </div>
            <h2 className="text-lg font-bold text-white">
              {title}
            </h2>
          </div>
          <span className={`rounded-xl border-2 px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${
            isConnected 
              ? `bg-gradient-to-r ${color} text-white border-transparent` 
              : 'border-white/20 bg-white/5 text-white/70'
          }`}>
            {status}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/70">
          {description}
        </p>
        <button
          type="button"
          className={`interactive-btn mt-4 inline-flex items-center rounded-xl border-2 bg-gradient-to-r ${color} px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105`}
        >
          ✨ Connect (MVP Stub)
        </button>
      </div>
    </article>
  );
}

