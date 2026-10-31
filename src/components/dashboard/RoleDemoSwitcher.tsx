"use client";

import React from "react";
import { ShieldCheck, User, Users, GraduationCap, Sparkles } from "lucide-react";

export type DemoViewRole = "DIRECTOR" | "GUARDIAN" | "TEACHER" | "STUDENT";

interface RoleDemoSwitcherProps {
  currentView: DemoViewRole;
  onSelectView: (role: DemoViewRole) => void;
  actualUserRole: string;
}

export function RoleDemoSwitcher({
  currentView,
  onSelectView,
  actualUserRole,
}: RoleDemoSwitcherProps) {
  const roles: { id: DemoViewRole; label: string; icon: any; persona: string }[] = [
    {
      id: "DIRECTOR",
      label: "Director & CEO Command Centre",
      icon: ShieldCheck,
      persona: "Dr. Armando Guebuza",
    },
    {
      id: "GUARDIAN",
      label: "Prestige Family Portal",
      icon: Users,
      persona: "Dona Beatriz (Ana & Lucas)",
    },
    {
      id: "TEACHER",
      label: "Teacher's Workspace & AI",
      icon: User,
      persona: "Prof. Manuel Cossa (Math)",
    },
    {
      id: "STUDENT",
      label: "Prestige Student Journey",
      icon: GraduationCap,
      persona: "Tiago Mondlane (Grade 10)",
    },
  ];

  return (
    <div className="bg-[#0b1730] text-white p-3 sm:p-4 rounded-2xl border border-flectere-gold/30 shadow-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-flectere-gold shrink-0" />
          <span className="text-xs font-bold text-flectere-gold uppercase tracking-wider">
            Interactive Institutional Demo Simulator:
          </span>
          <span className="text-[11px] text-slate-300 hidden md:inline">
            (Switch between all 4 institutional roles instantly)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {roles.map((r) => {
            const isSelected = currentView === r.id;
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => onSelectView(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-flectere-gold text-[#081226] font-bold shadow-md scale-105"
                    : "bg-white/10 text-slate-300 hover:text-white hover:bg-white/15"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label.split(" ")[0]}</span>
                <span className="text-[10px] opacity-75 hidden lg:inline">
                  ({r.persona.split(" ")[0]})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
