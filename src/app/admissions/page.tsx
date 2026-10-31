import { getCurrentUser } from "@/lib/auth";
import { AdmissionsPageClient } from "@/components/public/pages/AdmissionsPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admissions & Tuition | Prestige International Academy",
  description:
    "Apply to Prestige International Academy. Calculate tuition fees, schedule a private campus tour, and track application status.",
};

export default async function AdmissionsPage() {
  const user = await getCurrentUser();
  return <AdmissionsPageClient user={user} />;
}
