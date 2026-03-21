import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";
import { listConnectedAccounts } from "@/lib/firestore/repositories";

export default async function ConnectedAccountsPage() {
  const session = await requireServerSession();
  const accounts = await listConnectedAccounts(session.uid).catch(() => []);

  return (
    <AppShell
      title="🔗 Connected Accounts"
      description="Hubungkan akun platform Anda untuk menciptakan workflow publish otomatis yang stabil dan scalable."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ProviderCard
          title="YouTube"
          description="Hubungkan channel YouTube menggunakan OAuth dan simpan token terenkripsi."
          status={accounts.some((a) => a.provider === "youtube") ? "Connected" : "Not connected"}
        />
        <ProviderCard
          title="TikTok"
          description="Hubungkan akun TikTok untuk posting terjadwal melalui worker pipeline."
          status={accounts.some((a) => a.provider === "tiktok") ? "Connected" : "Not connected"}
        />
      </div>

      <article className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          📋 Daftar Akun Tersambung
        </h2>
        {accounts.length === 0 ? (
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            Belum ada akun terhubung. Hubungkan akun untuk membuka otomasi lintas platform.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {accounts.map((account) => (
              <li
                key={account.id}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
                style={{ borderColor: "var(--border)", background: "var(--surface-strong)" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {account.provider}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {account.providerAccountId}
                  </p>
                </div>
                <span className="rounded-md px-2 py-1 text-xs font-semibold" style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}>
                  {account.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </AppShell>
  );
}

function ProviderCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <article className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          {title}
        </h2>
        <span className="rounded-md px-2 py-1 text-xs font-semibold" style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}>
          {status}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
        {description}
      </p>
      <button
        type="button"
        className="interactive-btn mt-4 inline-flex items-center rounded-lg border px-3 py-2 text-sm font-semibold"
        style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
      >
        ✨ Connect (MVP Stub)
      </button>
    </article>
  );
}

