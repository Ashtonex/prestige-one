"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/lib/i18n/LanguageContext";
import { PublicHeader } from "../PublicHeader";
import { ScrollMotion } from "../ScrollMotion";
import { PublicFooter } from "../PublicFooter";
import { VirtualTourModal } from "../VirtualTourModal";
import { EventsAndNewsSection } from "../EventsAndNewsSection";
import {
  Calendar,
  FileText,
  Download,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function NewsPageClient({ user }: { user?: any }) {
  return (
    <LanguageProvider>
      <NewsContent user={user} />
    </LanguageProvider>
  );
}

function NewsContent({ user }: { user?: any }) {
  const { language, t } = useLanguage();
  const [tourOpen, setTourOpen] = useState(false);

  const termDates = [
    {
      term: "Term 1 (2026)",
      dates: "14 January – 03 April 2026",
      midTerm: "20 – 24 February 2026",
      focus: "Orientation, Swimming Gala & Diagnostic Benchmarks",
    },
    {
      term: "Term 2 (2026)",
      dates: "28 April – 24 July 2026",
      midTerm: "05 – 09 June 2026",
      focus: "Cambridge Mock Exams, Musical Production & Science Fair",
    },
    {
      term: "Term 3 (2026)",
      dates: "18 August – 27 November 2026",
      midTerm: "25 – 29 September 2026",
      focus: "Cambridge External Exams, Gorongosa Expedition & Graduation",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060E1E] text-white flex flex-col selection:bg-flectere-gold/30">
      <PublicHeader onOpenTour={() => setTourOpen(true)} user={user} />
      <ScrollMotion />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#081226] via-[#0A1734] to-[#060E1E]">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            {language === "en" ? "COMMUNITY & CALENDAR" : "COMUNIDADE & AGENDA"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {language === "en"
              ? "The Prestige Chronicle & Events"
              : "Notícias & Calendário da Academia"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Stay up-to-date with student milestones, international achievements, term schedules, and upcoming campus celebrations."
              : "Acompanhe as conquistas dos alunos, eventos desportivos e culturais, datas dos períodos letivos e celebrações escolares."}
          </p>
        </div>
      </section>

      {/* Embedded Events & News Section */}
      <EventsAndNewsSection />

      {/* Term Dates Table */}
      <section className="py-20 bg-flectere-light text-flectere-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
              OFFICIAL SCHEDULE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-flectere-navy mt-1">
              Academic Term Dates 2026
            </h2>
            <p className="text-xs sm:text-sm text-flectere-slate mt-2">
              Approved by the Executive Board and Ministry of Education and Human Development.
            </p>
          </div>

          <div className="space-y-4">
            {termDates.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-serif font-bold text-lg text-flectere-navy">
                    {item.term}
                  </h4>
                  <p className="text-xs font-semibold text-flectere-gold mt-0.5">
                    {item.dates}
                  </p>
                  <p className="text-xs text-flectere-slate mt-1">
                    Mid-Term Break: <strong>{item.midTerm}</strong>
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-flectere-light text-xs font-medium text-flectere-slate border border-flectere-slateLight">
                    {item.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Download Banner */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-flectere-gold/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-flectere-gold/15 text-flectere-gold flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-flectere-navy">
                  Prestige Quarterly Gazette &bull; Term 3 Issue
                </h4>
                <p className="text-xs text-flectere-slate">
                  48 pages of student poetry, robotics blueprints, and Cambridge honor roll.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                alert("Downloading Prestige Quarterly Gazette (PDF)...")
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-semibold hover:bg-flectere-navyLight transition-colors shrink-0"
            >
              <Download className="w-4 h-4 text-flectere-gold" />
              <span>Download Gazette (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />

      <VirtualTourModal isOpen={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
