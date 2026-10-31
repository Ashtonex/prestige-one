"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PrestigeLogo } from "./PrestigeLogo";
import {
  ChevronDown,
  Globe,
  ArrowRight,
  Menu,
  X,
  Compass,
  Calendar,
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  Building,
  LogIn,
  CheckCircle2,
} from "lucide-react";

interface PublicHeaderProps {
  onOpenTour?: () => void;
  user?: any;
}

export function PublicHeader({ onOpenTour, user }: PublicHeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#081226]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3"
          : "bg-gradient-to-b from-[#081226]/90 via-[#081226]/60 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Crest */}
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <PrestigeLogo variant="dark" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Discover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <span>{t.nav.discover}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {activeDropdown === "about" && (
              <div className="absolute top-full left-0 w-64 bg-[#0a1630] border border-white/10 rounded-2xl shadow-2xl p-2 py-3 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/about"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Building className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.aboutUs}</p>
                    <p className="text-[10px] text-slate-400">Sommerschield Campus</p>
                  </div>
                </Link>
                <Link
                  href="/about#vision"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.visionMission}</p>
                    <p className="text-[10px] text-slate-400">Ethos & Philosophy</p>
                  </div>
                </Link>
                <Link
                  href="/about#leadership"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Users className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.leadership}</p>
                    <p className="text-[10px] text-slate-400">Academic Directorate</p>
                  </div>
                </Link>
                {onOpenTour && (
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenTour();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-flectere-gold hover:bg-flectere-gold/15 transition-colors text-left"
                  >
                    <Compass className="w-4 h-4 text-flectere-gold" />
                    <div>
                      <p className="font-semibold">{t.nav.virtualTour}</p>
                      <p className="text-[10px] text-slate-400">Interactive 360° View</p>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Academics Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("academics")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <span>{t.nav.academics}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {activeDropdown === "academics" && (
              <div className="absolute top-full left-0 w-72 bg-[#0a1630] border border-white/10 rounded-2xl shadow-2xl p-2 py-3 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/academics"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.curriculum}</p>
                    <p className="text-[10px] text-slate-400">Dual-Stream Bilingual Path</p>
                  </div>
                </Link>
                <Link
                  href="/academics#stages"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.stages}</p>
                    <p className="text-[10px] text-slate-400">Early Years to Sixth Form</p>
                  </div>
                </Link>
                <Link
                  href="/academics#outcomes"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.outcomes}</p>
                    <p className="text-[10px] text-slate-400">100% University Placement</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Admissions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("admissions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <span>{t.nav.admissions}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {activeDropdown === "admissions" && (
              <div className="absolute top-full left-0 w-72 bg-[#0a1630] border border-white/10 rounded-2xl shadow-2xl p-2 py-3 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/admissions"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.howToApply}</p>
                    <p className="text-[10px] text-slate-400">6-Step Admission Journey</p>
                  </div>
                </Link>
                <Link
                  href="/admissions#calculator"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.feeCalculator}</p>
                    <p className="text-[10px] text-slate-400">Transparent Estimates</p>
                  </div>
                </Link>
                <Link
                  href="/admissions#visit"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Calendar className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.scheduleVisit}</p>
                    <p className="text-[10px] text-slate-400">Book Private Campus Tour</p>
                  </div>
                </Link>
                <Link
                  href="/admissions#tracker"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-flectere-gold" />
                  <div>
                    <p className="font-semibold">{t.nav.applicationTracker}</p>
                    <p className="text-[10px] text-slate-400">Real-Time Intake Status</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Campus Life */}
          <Link
            href="/campus-life"
            className="px-3 py-2 text-xs xl:text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            {t.nav.campusLife}
          </Link>

          {/* News & Community */}
          <Link
            href="/news"
            className="px-3 py-2 text-xs xl:text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            {t.nav.newsCommunity}
          </Link>

          {/* Connect */}
          <Link
            href="/contact"
            className="px-3 py-2 text-xs xl:text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            {t.nav.connect}
          </Link>
        </nav>

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 text-xs font-semibold transition-colors"
            title="Switch Language (English / Português)"
          >
            <Globe className="w-3.5 h-3.5 text-flectere-gold" />
            <span className="uppercase tracking-wider">{language}</span>
          </button>

          {/* Operations Portal Button */}
          {user ? (
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-flectere-gold" />
              <span>Command Centre</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.nav.portalLogin}</span>
            </Link>
          )}

          {/* Apply Now Primary Golden CTA */}
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] hover:from-[#d4af37] hover:to-flectere-gold text-[#081226] text-xs sm:text-sm font-bold shadow-lg shadow-flectere-gold/20 hover:shadow-flectere-gold/30 transition-all hover:-translate-y-0.5"
          >
            <span>{t.nav.applyNow}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071126] border-b border-white/10 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white flex flex-col gap-1"
            >
              <Building className="w-4 h-4 text-flectere-gold" />
              <span>{t.nav.discover}</span>
            </Link>
            <Link
              href="/academics"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white flex flex-col gap-1"
            >
              <BookOpen className="w-4 h-4 text-flectere-gold" />
              <span>{t.nav.academics}</span>
            </Link>
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white flex flex-col gap-1"
            >
              <GraduationCap className="w-4 h-4 text-flectere-gold" />
              <span>{t.nav.admissions}</span>
            </Link>
            <Link
              href="/campus-life"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white flex flex-col gap-1"
            >
              <Sparkles className="w-4 h-4 text-flectere-gold" />
              <span>{t.nav.campusLife}</span>
            </Link>
          </div>

          <div className="space-y-1">
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
            >
              {t.nav.newsCommunity}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
            >
              {t.nav.connect}
            </Link>
            {onOpenTour && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTour();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-flectere-gold hover:bg-flectere-gold/15 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>{t.nav.virtualTour}</span>
              </button>
            )}
            <Link
              href={user ? "/dashboard" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
            >
              {user ? "Prestige ONE Command Centre" : t.nav.portalLogin}
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white"
            >
              <Globe className="w-3.5 h-3.5 text-flectere-gold" />
              <span>Language: {language === "en" ? "English" : "Português"}</span>
            </button>
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-flectere-gold text-flectere-navyDark font-bold text-xs"
            >
              <span>{t.nav.applyNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
