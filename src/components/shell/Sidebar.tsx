"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  BookOpen,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role, User } from "@prisma/client";

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Command Centre",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["DIRECTOR", "ADMIN", "TEACHER", "FINANCE", "GUARDIAN", "STUDENT"],
    },
    {
      label: "Students",
      href: "/students",
      icon: Users,
      roles: ["DIRECTOR", "ADMIN", "TEACHER"],
    },
    {
      label: "Classes & Rosters",
      href: "/classes",
      icon: GraduationCap,
      roles: ["DIRECTOR", "ADMIN", "TEACHER"],
    },
    {
      label: "Daily Attendance",
      href: "/attendance",
      icon: CalendarCheck,
      roles: ["DIRECTOR", "ADMIN", "TEACHER"],
    },
    {
      label: "Tuition & Finance",
      href: "/finance",
      icon: CreditCard,
      roles: ["DIRECTOR", "ADMIN", "FINANCE"],
    },
  ];

  const allowedNav = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside
      className="hidden lg:flex flex-col w-64 bg-flectere-navy text-white shrink-0 border-r border-flectere-navyDark min-h-screen select-none"
      aria-label="Desktop Navigation Sidebar"
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-flectere-gold flex items-center justify-center text-flectere-navy font-bold text-lg shadow-md shrink-0">
          P1
        </div>
        <div className="min-w-0">
          <h1 className="font-bold text-base tracking-tight leading-none text-white truncate">
            PRESTIGE ONE
          </h1>
          <p className="text-[11px] text-flectere-gold mt-1 font-medium tracking-wide uppercase truncate">
            Maputo Academy
          </p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-semibold tracking-wider text-flectere-slate uppercase mb-2">
          Operations
        </p>
        {allowedNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-flectere-gold text-flectere-navy font-semibold shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-flectere-navy" : "text-white/70")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-flectere-gold hover:bg-white/10 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-flectere-gold" />
            <span>Public School Portal</span>
          </Link>
        </div>
      </nav>

      {/* User Identity & Logout */}
      <div className="p-4 border-t border-white/10 bg-flectere-navyDark/40">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-semibold text-flectere-gold shrink-0">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-flectere-gold/20 text-flectere-gold">
                {user.role}
              </span>
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
