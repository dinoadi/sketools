import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";

export default async function SettingsPage() {
  const session = await requireServerSession();

  return (
    <AppShell
      title="⚙️ Settings"
      description="Kelola profil, preferensi, dan konfigurasi kerja agar operasional konten selalu konsisten dan efisien."
    >
      <article className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          👤 Profile
        </h2>
        <dl className="mt-3 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
          <div>
            <dt className="font-medium" style={{ color: "var(--foreground)" }}>
              User ID
            </dt>
            <dd>{session.uid}</dd>
          </div>
          <div>
            <dt className="font-medium" style={{ color: "var(--foreground)" }}>
              Email
            </dt>
            <dd>{session.email ?? "-"}</dd>
          </div>
        </dl>
      </article>

      <article className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          🌐 Default Timezone
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Saat ini workflow menggunakan timezone default <strong>Asia/Jakarta</strong> untuk sinkronisasi jadwal tim.
        </p>
      </article>
    </AppShell>
  );
}

