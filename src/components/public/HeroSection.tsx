"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Calendar,
  Play,
  Globe,
  Users,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  ChevronDown,
  Compass,
} from "lucide-react";

interface HeroSectionProps {
  onOpenTour?: () => void;
}

export function HeroSection({ onOpenTour }: HeroSectionProps) {
  const { t } = useLanguage();
  const [activeHero, setActiveHero] = React.useState<"students" | "campus">("students");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#060E1E]">
      {/* Background Images with High-Definition Cross-Fade */}
      <div className="absolute inset-0 z-0 select-none">
        {/* Layer 1: Scholars & Intellectual Collaboration (Default) */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            activeHero === "students" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{
            backgroundImage: "url('/images/hero-campus.jpg')",
          }}
        />

        {/* Layer 2: Grand Sommerschield Campus Colonnade */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            activeHero === "campus" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{
            backgroundImage: "url('/images/hero-architecture.jpg')",
          }}
        />

        {/* Left Dark Navy Vignette for crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060E1E] via-[#060E1E]/80 sm:via-[#060E1E]/60 to-transparent" />
        {/* Bottom Fade into ribbon */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#060E1E] via-[#060E1E]/75 to-transparent" />
        {/* Top Fade for header */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060E1E]/80 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Tagline Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-flectere-gold"></span>
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-flectere-gold uppercase">
              {t.hero.tagline}
            </span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08] drop-shadow-sm">
            {t.hero.title}
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-xl">
            {t.hero.subtitle}
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Schedule a Visit (Gold Button) */}
            <Link
              href="/admissions#visit"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] hover:from-[#d4af37] hover:to-flectere-gold text-[#081226] font-bold text-sm shadow-xl shadow-flectere-gold/25 hover:shadow-flectere-gold/35 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.hero.scheduleVisit}</span>
              <span className="text-xs">→</span>
            </Link>

            {/* Explore Programs (Dark Glass Button) */}
            <button
              onClick={() => scrollToSection("academics-section")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-0.5"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-white text-white translate-x-0.5" />
              </div>
              <span>{t.hero.explorePrograms}</span>
              <span className="text-xs">→</span>
            </button>

            {/* Virtual Tour Button */}
            {onOpenTour && (
              <button
                onClick={onOpenTour}
                className="hidden md:inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-black/30 hover:bg-black/50 border border-flectere-gold/40 text-flectere-gold text-xs font-semibold backdrop-blur-md transition-all hover:border-flectere-gold"
              >
                <Compass className="w-4 h-4" />
                <span>{t.hero.virtualTourBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Ribbon Badge Bar across Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="bg-[#0b1730]/85 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          {/* Subtle gold line accent along the top of ribbon */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-flectere-gold to-transparent opacity-80" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Stat 1: IB / Cambridge Dual-Stream */}
            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-2 first:pt-0 first:pl-0">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-flectere-gold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-white tracking-tight leading-snug">
                  {t.hero.stats.curriculumTitle}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  {t.hero.stats.curriculumDesc}
                </p>
              </div>
            </div>

            {/* Stat 2: 35+ Nationalities */}
            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-flectere-gold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-white tracking-tight leading-snug">
                  {t.hero.stats.nationalitiesTitle}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  {t.hero.stats.nationalitiesDesc}
                </p>
              </div>
            </div>

            {/* Stat 3: 100% University Guidance */}
            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-flectere-gold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-white tracking-tight leading-snug">
                  {t.hero.stats.universityTitle}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  {t.hero.stats.universityDesc}
                </p>
              </div>
            </div>

            {/* Stat 4: STEM + Arts */}
            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-flectere-gold">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-white tracking-tight leading-snug">
                  {t.hero.stats.stemTitle}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  {t.hero.stats.stemDesc}
                </p>
              </div>
            </div>

            {/* Stat 5: Safe & Inclusive */}
            <div className="col-span-2 md:col-span-1 flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-flectere-green">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-white tracking-tight leading-snug">
                  {t.hero.stats.safetyTitle}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  {t.hero.stats.safetyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View Perspective Selector & Scroll Chevron */}
        <div className="flex items-center justify-between mt-4">
          {/* Subtle View Toggle Pill */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md text-[11px]">
            <button
              onClick={() => setActiveHero("students")}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeHero === "students"
                  ? "bg-flectere-gold text-[#081226] shadow-sm font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Scholars in Action
            </button>
            <button
              onClick={() => setActiveHero("campus")}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeHero === "campus"
                  ? "bg-flectere-gold text-[#081226] shadow-sm font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Campus Grounds
            </button>
          </div>

          <button
            onClick={() => scrollToSection("academics-section")}
            className="text-slate-400 hover:text-flectere-gold transition-colors animate-bounce p-1"
            aria-label="Scroll down to explore"
          >
            <ChevronDown className="w-5 h-5" />
          </button>

          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono hidden sm:inline">
            8K Cinematic Photography
          </span>
        </div>
      </div>
    </section>
  );
}
