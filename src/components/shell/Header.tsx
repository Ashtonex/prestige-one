"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wifi,
  WifiOff,
  LogOut,
  Download,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { User } from "@prisma/client";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Compute breadcrumbs
  const pathParts = pathname.split("/").filter(Boolean);
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Executive Command Centre";
    if (pathname === "/students") return "Student Directory";
    if (pathname === "/students/new") return "Enroll New Student";
    if (pathname.startsWith("/students/") && pathname.endsWith("/edit")) return "Edit Student Record";
    if (pathname.startsWith("/students/")) return "Student Master Profile";
    if (pathname === "/classes") return "Class Sections & Rosters";
    if (pathname.startsWith("/classes/")) return "Class Roster View";
    if (pathname === "/attendance") return "Daily Attendance Register";
    if (pathname === "/finance") return "Tuition Operations & Collections";
    return "Operations Workspace";
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-flectere-slateLight px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Brand & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Brand Mark */}
        <Link href="/dashboard" className="lg:hidden flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-flectere-navy flex items-center justify-center text-flectere-gold font-bold text-sm shadow-sm">
            P1
          </div>
        </Link>

        {/* Breadcrumb Hierarchy */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-flectere-slate mb-0.5">
            <span className="hidden sm:inline">Prestige International Academy</span>
            {pathParts.length > 0 && <ChevronRight className="w-3 h-3 text-flectere-slate/60 hidden sm:inline" />}
            <span className="capitalize font-medium text-flectere-navy">
              {pathParts[0] || "Home"}
            </span>
          </div>
          <h2 className="text-base lg:text-lg font-bold text-flectere-navy truncate leading-tight">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right: Status Pills, PWA Install & User Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Network Status Indicator */}
        <div
          data-testid="network-status"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
            isOnline
              ? "bg-flectere-greenLight text-flectere-green border-flectere-green/30"
              : "bg-flectere-crimsonLight text-flectere-crimson border-flectere-crimson/30"
          )}
          title={isOnline ? "Authoritative connection verified" : "Operating in offline fallback mode"}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span className="inline text-xs font-semibold">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 animate-pulse" />
              <span className="inline text-xs font-semibold">Offline Mode</span>
            </>
          )}
        </div>

        {/* PWA Install Button (When prompt available) */}
        {deferredPrompt && !installed && (
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-flectere-gold text-flectere-navy hover:bg-flectere-gold/90 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Install App</span>
          </button>
        )}

        {/* Mobile User Identity & Sign Out */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-full bg-flectere-navy text-flectere-gold font-semibold text-xs flex items-center justify-center">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="p-1.5 text-flectere-slate hover:text-flectere-crimson transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
