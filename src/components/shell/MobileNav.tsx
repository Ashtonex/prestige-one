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
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { User } from "@prisma/client";

interface MobileNavProps {
  user: User;
}

export function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
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
      label: "Classes",
      href: "/classes",
      icon: GraduationCap,
      roles: ["DIRECTOR", "ADMIN", "TEACHER"],
    },
    {
      label: "Attendance",
      href: "/attendance",
      icon: CalendarCheck,
      roles: ["DIRECTOR", "ADMIN", "TEACHER"],
    },
    {
      label: "Finance",
      href: "/finance",
      icon: CreditCard,
      roles: ["DIRECTOR", "ADMIN", "FINANCE"],
    },
  ];

  const allowedNav = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-flectere-navy text-white border-t border-flectere-navyDark/60 shadow-lg px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around"
      aria-label="Mobile Navigation Bar"
    >
      {allowedNav.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center min-w-[56px] min-h-[46px] px-2 py-1 rounded-xl text-[10px] font-medium transition-colors",
              isActive
                ? "text-flectere-gold font-bold"
                : "text-white/70 hover:text-white"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <div className={cn("p-1 rounded-lg", isActive && "bg-white/10")}>
              <Icon className="w-5 h-5 shrink-0" />
            </div>
            <span className="truncate mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
