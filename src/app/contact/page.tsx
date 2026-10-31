import { getCurrentUser } from "@/lib/auth";
import { ContactPageClient } from "@/components/public/pages/ContactPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact & Connect | Prestige International Academy",
  description:
    "Connect with Prestige International Academy. Campus location in Sommerschield Maputo, admissions phone, email, and WhatsApp enquiry desk.",
};

export default async function ContactPage() {
  const user = await getCurrentUser();
  return <ContactPageClient user={user} />;
}
