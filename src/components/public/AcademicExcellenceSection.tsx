"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award,
  Users2,
  Cpu,
  Globe2,
} from "lucide-react";

export function AcademicExcellenceSection() {
  const { t } = useLanguage();
  const [activeStageId, setActiveStageId] = useState<string>("eyfs");

  const stageImages: Record<string, string> = {
    eyfs: "/images/early-years.jpg",
    primary: "/images/library-study.jpg",
    "lower-secondary": "/images/campus-exterior.jpg",
    "upper-secondary": "/images/stem-lab.jpg",
  };

  const currentStage =
    t.academics.stages.find((s) => s.id === activeStageId) ||
    t.academics.stages[0];

  return (
    <section id="academics-section" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.academics.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-flectere-navy tracking-tight leading-tight">
            {t.academics.heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-flectere-slate leading-relaxed">
            {t.academics.subheading}
          </p>
        </div>

        {/* 4 Pillars of Pedagogical Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {t.academics.pillars.map((pillar, idx) => {
            const icons = [
              <Globe2 key={0} className="w-6 h-6 text-flectere-gold" />,
              <Cpu key={1} className="w-6 h-6 text-flectere-gold" />,
              <Award key={2} className="w-6 h-6 text-flectere-gold" />,
              <Users2 key={3} className="w-6 h-6 text-flectere-gold" />,
            ];

            return (
              <div
                key={idx}
                className="bg-flectere-light/70 hover:bg-white rounded-2xl p-6 border border-flectere-slateLight/80 hover:border-flectere-gold/40 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-flectere-navy text-flectere-gold group-hover:text-flectere-gold flex items-center justify-center mb-5 shadow-sm transition-colors border border-flectere-slateLight">
                  {icons[idx % icons.length]}
                </div>
                <h3 className="font-serif font-bold text-lg text-flectere-navy mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Academic Pathway Explorer */}
        <div className="bg-[#0b1730] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-flectere-gold to-transparent" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-flectere-gold">
                Interactive Pathway Explorer
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
                {t.academics.stagesTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                {t.academics.stagesSubtitle}
              </p>
            </div>

            <Link
              href="/academics"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-flectere-gold hover:text-white transition-colors"
            >
              <span>View Full Curriculum Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Academic Stage Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
            {t.academics.stages.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`text-left p-4 rounded-2xl transition-all duration-200 border ${
                    isActive
                      ? "bg-flectere-gold text-[#081226] border-flectere-gold shadow-lg font-bold"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wider opacity-80">
                    {stage.age}
                  </p>
                  <p className="text-sm sm:text-base font-bold mt-1 line-clamp-1">
                    {stage.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-md">
            {/* Visual Photography Column */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-white/15">
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url('${stageImages[currentStage.id]}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081226]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                  {currentStage.classRatio}
                </span>
                <span className="px-3 py-1 rounded-full bg-flectere-gold text-[#081226] text-[11px] font-bold">
                  {currentStage.age}
                </span>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-flectere-gold uppercase tracking-wider">
                  {currentStage.focus}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  {currentStage.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Core Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {currentStage.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-flectere-gold shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-snug">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Subjects Pills */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Subject Areas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentStage.keySubjects.map((subj, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Credential Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-flectere-gold" />
                  <span className="text-xs text-slate-300">
                    Certification: <strong className="text-white">{currentStage.credentials}</strong>
                  </span>
                </div>

                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-flectere-gold hover:underline"
                >
                  <span>Apply for this Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Global University Placements Banner */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Where Our Graduates Learn &bull; 100% University Acceptance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-300 text-xs sm:text-sm font-serif font-semibold tracking-wider">
              <span className="hover:text-flectere-gold transition-colors">University of Oxford</span>
              <span>&bull;</span>
              <span className="hover:text-flectere-gold transition-colors">Stanford University</span>
              <span>&bull;</span>
              <span className="hover:text-flectere-gold transition-colors">University of Cambridge</span>
              <span>&bull;</span>
              <span className="hover:text-flectere-gold transition-colors">Imperial College London</span>
              <span>&bull;</span>
              <span className="hover:text-flectere-gold transition-colors">Univ. of Cape Town (UCT)</span>
              <span>&bull;</span>
              <span className="hover:text-flectere-gold transition-colors">Nova de Lisboa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
