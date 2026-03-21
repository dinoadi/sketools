import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "sketools_session";
const DEV_SESSION_VALUE = "dev-admin-session";

export type AuthSession = {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
};

export async function getServerSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  if (sessionCookie === DEV_SESSION_VALUE) {
    return {
      uid: "admin",
      email: "admin@local.dev",
      name: "Administrator",
      picture: undefined,
    };
  }

  return null;
}

export function getDevSessionValue() {
  return DEV_SESSION_VALUE;
}
