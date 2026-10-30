"use client";

import React, { useEffect, useState } from "react";
import { WifiOff, RefreshCw, ShieldAlert } from "lucide-react";

export default function OfflinePage() {
  const [isChecking, setIsChecking] = useState(false);

  const handleRetry = () => {
    setIsChecking(true);
    if (navigator.onLine) {
      window.location.href = "/dashboard";
    } else {
      setTimeout(() => {
        setIsChecking(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-flectere-light flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-flectere-navy flex items-center justify-center text-flectere-gold mb-6 shadow-md">
        <WifiOff className="w-8 h-8" />
      </div>

      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-flectere-crimson/10 text-flectere-crimson mb-3">
        Connection Offline
      </span>

      <h1 className="text-2xl font-bold text-flectere-navy mb-2">
        Prestige ONE Offline Reserve
      </h1>

      <p className="text-sm text-flectere-slate max-w-md mx-auto mb-6 leading-relaxed">
        You are currently disconnected from the authoritative school campus server.
        To maintain student safeguarding and financial reconciliation integrity,
        record creation and editing require an active network connection.
      </p>

      <div className="bg-white rounded-xl border border-flectere-slateLight p-4 max-w-sm w-full mb-6 text-left flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-flectere-gold shrink-0 mt-0.5" />
        <div className="text-xs text-flectere-slate">
          <p className="font-semibold text-flectere-navy">Records Security Protocol</p>
          <p className="mt-0.5">
            Cached authenticated responses are strictly blocked to protect learner privacy. Reconnect to resume operations.
          </p>
        </div>
      </div>

      <button
        onClick={handleRetry}
        disabled={isChecking}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-flectere-navy text-white text-sm font-semibold hover:bg-flectere-navyLight transition-colors shadow-sm disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
        {isChecking ? "Checking Network..." : "Retry Connection"}
      </button>

      <p className="text-[11px] text-flectere-slate mt-8">
        Prestige International Academy, Maputo &bull; Flectēre Operations
      </p>
    </div>
  );
}
