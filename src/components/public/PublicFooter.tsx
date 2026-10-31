"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PrestigeLogo } from "./PrestigeLogo";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  LogIn,
} from "lucide-react";

export function PublicFooter() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-[#050C1B] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <PrestigeLogo variant="dark" size="lg" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-flectere-gold block mb-2">
                Accreditations & Affiliations
              </span>
              <p
                className="text-[11px] text-slate-400 leading-normal"
                dangerouslySetInnerHTML={{ __html: t.footer.accreditations }}
              />
            </div>

            {/* Language Switcher in footer */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-slate-400">Language:</span>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  language === "en"
                    ? "bg-flectere-gold text-[#081226]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                English
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setLanguage("pt")}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  language === "pt"
                    ? "bg-flectere-gold text-[#081226]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Português
              </button>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white tracking-wider uppercase">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-flectere-gold transition-colors">
                  {t.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-flectere-gold transition-colors">
                  {t.nav.curriculum}
                </Link>
              </li>
              <li>
                <Link href="/campus-life" className="hover:text-flectere-gold transition-colors">
                  {t.nav.campusLife}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-flectere-gold transition-colors">
                  {t.nav.newsCommunity}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-flectere-gold transition-colors">
                  {t.nav.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions Hub (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white tracking-wider uppercase">
              {t.footer.admissionsHeading}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/admissions" className="hover:text-flectere-gold transition-colors">
                  {t.nav.howToApply}
                </Link>
              </li>
              <li>
                <Link href="/admissions#calculator" className="hover:text-flectere-gold transition-colors">
                  {t.nav.feeCalculator}
                </Link>
              </li>
              <li>
                <Link href="/admissions#visit" className="hover:text-flectere-gold transition-colors">
                  {t.nav.scheduleVisit}
                </Link>
              </li>
              <li>
                <Link href="/admissions#tracker" className="hover:text-flectere-gold transition-colors">
                  {t.nav.applicationTracker}
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://wa.me/258840000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Admissions Office</span>
              </a>
            </div>
          </div>

          {/* Institutional Contact & Portal Access (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white tracking-wider uppercase">
              {t.footer.contactHeading}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-flectere-gold shrink-0 mt-0.5" />
                <span>
                  Av. Kenneth Kaunda &bull; Sommerschield II, Maputo, Mozambique
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-flectere-gold shrink-0" />
                <span>+258 21 490 000 / +258 84 000 0000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-flectere-gold shrink-0" />
                <span>admissions@prestige.ac.mz</span>
              </div>
            </div>

            {/* Portal Link Box */}
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all hover:border-flectere-gold"
              >
                <LogIn className="w-4 h-4 text-flectere-gold" />
                <span>{t.footer.portalAccess}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Engineering Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 text-center sm:text-left">
          <p>{t.footer.copyright}</p>
          <p>
            Operating System Architecture by Flectēre (Private) Limited &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
