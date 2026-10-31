import { getCurrentUser } from "@/lib/auth";
import { AcademicsPageClient } from "@/components/public/pages/AcademicsPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Academics & Curriculum | Prestige International Academy",
  description:
    "Explore our Cambridge International and Mozambique National dual-stream curriculum from Early Years to Sixth Form.",
};

export default async function AcademicsPage() {
  const user = await getCurrentUser();
  return <AcademicsPageClient user={user} />;
}
