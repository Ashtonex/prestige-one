import { getCurrentUser } from "@/lib/auth";
import { PublicHomePageClient } from "@/components/public/PublicHomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();

  return <PublicHomePageClient user={user} />;
}
