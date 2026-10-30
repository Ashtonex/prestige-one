import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Compass, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-flectere-light flex flex-col selection:bg-flectere-gold/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-flectere-slateLight px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-flectere-navy flex items-center justify-center text-flectere-gold font-bold text-lg shadow-md">
            P1
          </div>
          <div>
            <h1 className="font-bold text-base text-flectere-navy tracking-tight leading-none">
              PRESTIGE SCHOOL
            </h1>
            <p className="text-[10px] text-flectere-gold font-semibold tracking-wider uppercase mt-1">
              Mozambique &bull; Maputo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-flectere-navy text-white text-xs font-semibold hover:bg-flectere-navyLight transition-colors shadow-sm"
            >
              Open Operations Platform
              <ArrowRight className="w-3.5 h-3.5 text-flectere-gold" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-flectere-navy text-white text-xs font-semibold hover:bg-flectere-navyLight transition-colors shadow-sm"
            >
              Sign In to Portal
              <ArrowRight className="w-3.5 h-3.5 text-flectere-gold" />
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-flectere-gold/15 text-flectere-gold border border-flectere-gold/30 uppercase tracking-widest mb-4">
            Prestige ONE Digital Ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-flectere-navy tracking-tight leading-tight">
            Where Ambition Meets Opportunity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-flectere-slate leading-relaxed">
            One connected institutional platform for Prestige International Academy.
            Uniting student learning, admissions pipelines, teacher gradebooks, family communication,
            and executive command intelligence into an authoritative, auditable school operating system.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={user ? "/dashboard" : "/login"}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-flectere-navy text-white text-sm font-semibold hover:bg-flectere-navyLight transition-all shadow-md group"
            >
              {user ? "Continue to Command Centre" : "Access Live Demonstration"}
              <ArrowRight className="w-4 h-4 text-flectere-gold group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-flectere-slateLight text-flectere-navy text-sm font-semibold hover:bg-flectere-slateLight/30 transition-colors shadow-sm"
            >
              Demo Accounts & Roles
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-flectere-light text-flectere-navy flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-flectere-gold" />
            </div>
            <h3 className="font-bold text-base text-flectere-navy mb-2">
              Academic Excellence
            </h3>
            <p className="text-xs text-flectere-slate leading-relaxed">
              Cambridge International Curriculum dual-stream with national standards. Complete student lifecycle from enrollment to graduation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-flectere-light text-flectere-navy flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-flectere-green" />
            </div>
            <h3 className="font-bold text-base text-flectere-navy mb-2">
              Authoritative Records
            </h3>
            <p className="text-xs text-flectere-slate leading-relaxed">
              Durable relational storage in PostgreSQL with auditable change tracking, role-scoped permissions, and guardian child isolation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-flectere-light text-flectere-navy flex items-center justify-center mb-4">
              <Compass className="w-6 h-6 text-flectere-crimson" />
            </div>
            <h3 className="font-bold text-base text-flectere-navy mb-2">
              Mobile-First PWA
            </h3>
            <p className="text-xs text-flectere-slate leading-relaxed">
              Installable app shell that survives navigation, touch-optimized attendance, safe caching, and offline fallback guidance.
            </p>
          </div>
        </div>

        {/* Institutional Mission Quote */}
        <div className="bg-white rounded-2xl border border-flectere-gold/30 p-8 text-center max-w-2xl mx-auto shadow-sm">
          <p className="text-sm italic text-flectere-navy font-serif">
            &ldquo;One institution. One connected ecosystem. A more intelligent school.&rdquo;
          </p>
          <p className="text-xs font-semibold text-flectere-gold uppercase tracking-wider mt-2">
            Aude Sapere &bull; Flectēre Operations
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-flectere-slateLight bg-white py-6 px-4 text-center text-xs text-flectere-slate">
        <p>Prestige International Academy &bull; Sommerschield, Maputo, Mozambique</p>
        <p className="mt-1 text-[11px] text-flectere-slate/80">
          Digital Systems & Web Development by Flectēre (Private) Limited &copy; 2026
        </p>
      </footer>
    </div>
  );
}
