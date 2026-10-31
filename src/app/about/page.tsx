import { getCurrentUser } from "@/lib/auth";
import { AboutPageClient } from "@/components/public/pages/AboutPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Discover Prestige | Prestige International Academy",
  description:
    "Explore our vision, leadership, Sommerschield campus facilities, and heritage at Prestige International Academy, Mozambique.",
};

export default async function AboutPage() {
  const user = await getCurrentUser();
  return <AboutPageClient user={user} />;
}
