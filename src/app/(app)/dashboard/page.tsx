import React from "react";
import { requireAuth } from "@/lib/auth";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireAuth();

  return <DashboardClient user={user} />;
}
