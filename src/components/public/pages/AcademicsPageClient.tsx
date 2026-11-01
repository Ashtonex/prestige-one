"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/lib/i18n/LanguageContext";
import { PublicHeader } from "../PublicHeader";
import { ScrollMotion } from "../ScrollMotion";
import { PublicFooter } from "../PublicFooter";
import { VirtualTourModal } from "../VirtualTourModal";
import { AcademicExcellenceSection } from "../AcademicExcellenceSection";
import {
  GraduationCap,
  BookOpen,
  Award,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Compass,
} from "lucide-react";

export function AcademicsPageClient({ user }: { user?: any }) {
  return (
    <LanguageProvider>
      <AcademicsContent user={user} />
    </LanguageProvider>
  );
}

function AcademicsContent({ user }: { user?: any }) {
  const { language, t } = useLanguage();
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060E1E] text-white flex flex-col selection:bg-flectere-gold/30">
      <PublicHeader onOpenTour={() => setTourOpen(true)} user={user} />
      <ScrollMotion />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#081226] via-[#0A1734] to-[#060E1E]">
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/library-study.jpg')" }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            {language === "en" ? "ACADEMIC PATHWAYS" : "CICLOS DE ENSINO"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {language === "en"
              ? "Dual-Stream Intellectual Mastery"
              : "Excelência Académica Dual-Stream"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "A synchronized educational continuum from age 3 to 18, synthesizing Cambridge International rigor with the cultural depth of Mozambique."
              : "Um percurso formativo contínuo dos 3 aos 18 anos, integrando o rigor de Cambridge com a herança e os padrões curriculares de Moçambique."}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/admissions#calculator"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-flectere-gold text-[#081226] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-flectere-gold/90 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.nav.feeCalculator}</span>
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs"
            >
              <span>{t.nav.applyNow}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Interactive Pathway & Stages Component */}
      <AcademicExcellenceSection />

      {/* Assessment Methods & Benchmark Standards */}
      <section className="py-20 bg-flectere-light text-flectere-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
              {language === "en" ? "RIGOROUS DIAGNOSTICS" : "AVALIAÇÃO & DIAGNÓSTICO"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-flectere-navy mt-1">
              {language === "en"
                ? "Assessment Methods & Learning Insights"
                : "Métodos de Avaliação & Evolução Contínua"}
            </h2>
            <p className="text-xs sm:text-sm text-flectere-slate mt-2">
              {language === "en"
                ? "We measure progress transparently using global benchmarks and continuous formative feedback."
                : "Avaliamos o progresso do aluno com rigor internacional e acompanhamento pedagógico constante."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-flectere-slateLight shadow-sm">
              <h3 className="font-serif font-bold text-xl text-flectere-navy mb-2">
                Cambridge Checkpoint & Benchmark
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                Standardized diagnostic exams at Grade 5 (Primary) and Grade 8 (Lower Secondary) measuring attainment against international cohort percentiles in English, Mathematics, and Science.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-flectere-slateLight shadow-sm">
              <h3 className="font-serif font-bold text-xl text-flectere-navy mb-2">
                Formative Portfolios & Projects
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                Continuous markbook logging in the Prestige ONE platform. Parents observe weekly feedback, rubrics, lab reports, and oral defense marks in real-time through the family portal.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-flectere-slateLight shadow-sm">
              <h3 className="font-serif font-bold text-xl text-flectere-navy mb-2">
                IGCSE & International A-Levels
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                External invigilated examinations recognized by all premier universities worldwide, backed by extensive mock exams and individual grade improvement coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />

      <VirtualTourModal isOpen={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
