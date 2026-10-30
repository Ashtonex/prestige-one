"use client";

import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { ToastProvider } from "@/components/ui/Toast";
import type { User } from "@prisma/client";

declare global {
  interface Window {
    __app_initialized?: boolean;
    __shell_mount_count?: number;
  }
}

interface AppShellProps {
  user: User;
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  useEffect(() => {
    // Record persistent mount state for Playwright verification
    window.__app_initialized = true;
    window.__shell_mount_count = (window.__shell_mount_count || 0) + 1;
  }, []);

  return (
    <ToastProvider>
      <div
        id="prestige-app-shell"
        data-persistent-shell="true"
        className="flex min-h-screen bg-flectere-light text-flectere-navy antialiased selection:bg-flectere-gold/30 selection:text-flectere-navy overflow-x-hidden"
      >
        {/* Desktop Sidebar */}
        <Sidebar user={user} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header user={user} />

          {/* Page Viewport: safe-area padding for mobile bottom bar */}
          <main
            id="main-content"
            className="flex-1 p-4 sm:p-6 lg:p-8 pb-28 lg:pb-12 max-w-7xl w-full mx-auto overflow-x-hidden"
          >
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileNav user={user} />
      </div>
    </ToastProvider>
  );
}
