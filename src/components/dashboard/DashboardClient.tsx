"use client";

import React, { useState } from "react";
import type { User } from "@prisma/client";
import { RoleDemoSwitcher, DemoViewRole } from "./RoleDemoSwitcher";
import { DirectorCommandCentre } from "./DirectorCommandCentre";
import { ParentFamilyPortal } from "./ParentFamilyPortal";
import { TeacherWorkspace } from "./TeacherWorkspace";
import { StudentJourneyView } from "./StudentJourneyView";

interface DashboardClientProps {
  user: User;
}

export function DashboardClient({ user }: DashboardClientProps) {
  // Map actual user role to initial demo role
  const getInitialRole = (): DemoViewRole => {
    if (user.role === "GUARDIAN") return "GUARDIAN";
    if (user.role === "TEACHER") return "TEACHER";
    if (user.role === "STUDENT") return "STUDENT";
    return "DIRECTOR";
  };

  const [activeView, setActiveView] = useState<DemoViewRole>(getInitialRole());

  return (
    <div className="space-y-6">
      {/* Role Demo Simulator Bar */}
      <RoleDemoSwitcher
        currentView={activeView}
        onSelectView={setActiveView}
        actualUserRole={user.role}
      />

      {/* Render the active role workspace */}
      {activeView === "DIRECTOR" && <DirectorCommandCentre />}
      {activeView === "GUARDIAN" && <ParentFamilyPortal />}
      {activeView === "TEACHER" && <TeacherWorkspace />}
      {activeView === "STUDENT" && <StudentJourneyView />}
    </div>
  );
}
