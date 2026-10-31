import { getCurrentUser } from "@/lib/auth";
import { NewsPageClient } from "@/components/public/pages/NewsPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News, Calendar & Community | Prestige International Academy",
  description:
    "Latest bulletins, events calendar, term dates, and alumni stories from Prestige International Academy, Mozambique.",
};

export default async function NewsPage() {
  const user = await getCurrentUser();
  return <NewsPageClient user={user} />;
}
