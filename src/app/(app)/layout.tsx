import { requireAuth } from "@/lib/auth";
import { AppShell } from "@/components/shell/AppShell";

export const dynamic = "force-dynamic";

export default async function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return <AppShell user={user}>{children}</AppShell>;
}
