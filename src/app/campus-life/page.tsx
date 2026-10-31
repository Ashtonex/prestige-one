import { getCurrentUser } from "@/lib/auth";
import { CampusLifePageClient } from "@/components/public/pages/CampusLifePageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Life at Prestige | Prestige International Academy",
  description:
    "Discover athletics, arts, robotics, Model UN, house system, and community expeditions at Prestige International Academy, Mozambique.",
};

export default async function CampusLifePage() {
  const user = await getCurrentUser();
  return <CampusLifePageClient user={user} />;
}
