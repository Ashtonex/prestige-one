"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    // Dev chunks live at stable, unhashed URLs, so the SW's cache-first rule
    // for /_next/static would serve stale JS against fresh HTML and break
    // hydration. Only run the SW in production, and clear any left over in dev.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      if ("caches" in window) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
      }
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("[PWA] Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("[PWA] Service Worker registration failed:", error);
      });
  }, []);

  return null;
}
