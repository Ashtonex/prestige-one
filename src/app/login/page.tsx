"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Loader2,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_ACCOUNTS = [
  {
    role: "ADMIN",
    label: "School Administrator",
    name: "Graça Machel-Sitoe",
    email: "admin@prestige.co.mz",
    password: "PrestigeAdmin2026!",
    desc: "Full admissions, enrollment & student records",
  },
  {
    role: "TEACHER",
    label: "Senior Educator",
    name: "Prof. Manuel Cossa",
    email: "teacher@prestige.co.mz",
    password: "PrestigeTeacher2026!",
    desc: "Assigned classes, daily attendance & marking",
  },
  {
    role: "DIRECTOR",
    label: "Director & Leadership",
    name: "Dr. Armando Guebuza",
    email: "director@prestige.co.mz",
    password: "PrestigeDirector2026!",
    desc: "Executive command centre & institutional KPIs",
  },
  {
    role: "GUARDIAN",
    label: "Parent / Guardian",
    name: "Dona Beatriz Mondlane",
    email: "guardian@prestige.co.mz",
    password: "PrestigeGuardian2026!",
    desc: "Linked children, attendance & school account",
  },
  {
    role: "STUDENT",
    label: "Enrolled Student",
    name: "Tiago Mondlane",
    email: "student@prestige.co.mz",
    password: "PrestigeStudent2026!",
    desc: "Personal timetable, homework & marks",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // false on deployments without a database (public demo site)
  const [portalAvailable, setPortalAvailable] = useState(true);

  useEffect(() => {
    fetch("/api/auth/login")
      .then((res) => res.json())
      .then((data) => setPortalAvailable(data.portalAvailable !== false))
      .catch(() => {});
  }, []);

  const handleSubmit = async (
    e?: React.FormEvent,
    customEmail?: string,
    customPass?: string
  ) => {
    if (e) e.preventDefault();
    setError(null);
    setIsLoading(true);

    const submitEmail = customEmail || email;
    const submitPassword = customPass || password;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submitEmail, password: submitPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.demoOffline) {
          setPortalAvailable(false);
          setIsLoading(false);
          return;
        }
        setError(data.error || "Authentication failed");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Network error communicating with authentication service");
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    handleSubmit(undefined, demoEmail, demoPass);
  };

  return (
    <div className="min-h-screen bg-flectere-light flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-flectere-gold/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Crest */}
        <div className="w-16 h-16 rounded-2xl bg-flectere-navy mx-auto flex items-center justify-center text-flectere-gold font-bold text-2xl shadow-lg border border-flectere-navyDark">
          P1
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-flectere-navy tracking-tight">
          PRESTIGE ONE
        </h1>
        <p className="mt-1 text-xs font-semibold tracking-widest text-flectere-gold uppercase">
          Prestige International Academy &bull; Maputo
        </p>
        <p className="mt-2 text-xs text-flectere-slate">
          Authoritative institutional access and operations platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-flectere-slateLight sm:px-10">
          {!portalAvailable && (
            <div
              role="status"
              className="mb-6 p-5 rounded-2xl bg-flectere-navy text-white relative overflow-hidden shadow-lg"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-flectere-gold to-transparent" />
              <div className="flex items-center gap-2 text-flectere-gold text-[11px] font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Live Demonstration</span>
              </div>
              <p className="mt-2 font-serif text-lg leading-snug">
                The operations portal is presented in your guided demonstration.
              </p>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                This online preview showcases the Prestige public website.
                Prestige ONE runs on the school&apos;s secure records system, so
                sign-in is shown live during the walkthrough.
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] text-[#081226] text-xs font-bold shadow-md hover:-translate-y-0.5 transition-transform"
              >
                Explore the public website
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {error && (
            <div
              className="mb-5 p-3.5 rounded-xl bg-flectere-crimsonLight text-flectere-crimson border border-flectere-crimson/20 text-xs font-medium"
              role="alert"
            >
              {error}
            </div>
          )}

          <fieldset
            disabled={!portalAvailable}
            className={cn(
              "min-w-0 border-0 p-0 m-0",
              !portalAvailable && "opacity-40 pointer-events-none select-none"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-flectere-navy mb-1.5"
                >
                  Institutional Email
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-flectere-slate">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@prestige.co.mz"
                    className="block w-full pl-10 pr-3 py-2.5 border border-flectere-slateLight rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-flectere-gold focus:border-transparent text-flectere-navy placeholder:text-flectere-slate/50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-flectere-navy mb-1.5"
                >
                  Password
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-flectere-slate">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-3 py-2.5 border border-flectere-slateLight rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-flectere-gold focus:border-transparent text-flectere-navy placeholder:text-flectere-slate/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-flectere-navy hover:bg-flectere-navyLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-flectere-gold transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-flectere-gold" />
                    Verifying Credentials...
                  </>
                ) : (
                  <>
                    Enter Operations Portal
                    <ArrowRight className="w-4 h-4 text-flectere-gold" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Selector */}
            <div className="mt-8 pt-6 border-t border-flectere-slateLight">
              <div className="flex items-center gap-1.5 mb-3 text-xs font-bold uppercase tracking-wider text-flectere-navy">
                <UserCheck className="w-4 h-4 text-flectere-gold" />
                <span>One-Click Demonstration Access</span>
              </div>
              <p className="text-[11px] text-flectere-slate mb-3">
                Select a verified persona to instantly sign in:
              </p>

              <div className="space-y-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleQuickLogin(acc.email, acc.password)}
                    disabled={isLoading}
                    className="w-full text-left p-2.5 rounded-xl border border-flectere-slateLight/80 hover:border-flectere-gold hover:bg-flectere-goldLight/20 transition-all flex items-center justify-between group disabled:opacity-50"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-flectere-navy group-hover:text-flectere-gold transition-colors truncate">
                          {acc.name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-flectere-navy/10 text-flectere-navy shrink-0">
                          {acc.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-flectere-slate truncate mt-0.5">
                        {acc.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-flectere-slate group-hover:text-flectere-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-flectere-slate">
          Prestige School Mozambique &bull; Powered by Flectēre Digital
        </p>
      </div>
    </div>
  );
}
