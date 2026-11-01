"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/lib/i18n/LanguageContext";
import { PublicHeader } from "../PublicHeader";
import { ScrollMotion } from "../ScrollMotion";
import { PublicFooter } from "../PublicFooter";
import { VirtualTourModal } from "../VirtualTourModal";
import { PrestigeExperienceSection } from "../PrestigeExperienceSection";
import {
  Sparkles,
  Trophy,
  Dumbbell,
  Music,
  Cpu,
  Globe2,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";

export function CampusLifePageClient({ user }: { user?: any }) {
  return (
    <LanguageProvider>
      <CampusLifeContent user={user} />
    </LanguageProvider>
  );
}

function CampusLifeContent({ user }: { user?: any }) {
  const { language, t } = useLanguage();
  const [tourOpen, setTourOpen] = useState(false);

  const clubs = [
    {
      name: "Robotics & Artificial Intelligence Club",
      category: "STEM",
      desc: "Microcontroller circuit design, autonomous drone piloting, Python coding, and preparation for national competitions.",
      icon: <Cpu className="w-5 h-5 text-flectere-gold" />,
    },
    {
      name: "Prestige Symphony & Chamber Ensembles",
      category: "Arts",
      desc: "Classical orchestral rehearsal, contemporary African choral singing, and performance at bi-annual grand academy galas.",
      icon: <Music className="w-5 h-5 text-flectere-gold" />,
    },
    {
      name: "Competitive Swimming Academy",
      category: "Athletics",
      desc: "FINA-certified squad training in our 25m heated pool, stroke refinement, and Maputo inter-school league galas.",
      icon: <Dumbbell className="w-5 h-5 text-flectere-gold" />,
    },
    {
      name: "Model United Nations & Debate Union",
      category: "Leadership",
      desc: "Geopolitical resolution drafting, parliamentary debate, oratory competitions, and delegations to Nairobi and Geneva.",
      icon: <Globe2 className="w-5 h-5 text-flectere-gold" />,
    },
    {
      name: "Eco-Warriors & Marine Conservation",
      category: "Service",
      desc: "Maputo Bay coastal mangrove cleanup, recycling initiatives, solar energy monitoring, and Gorongosa biodiversity research.",
      icon: <Compass className="w-5 h-5 text-flectere-gold" />,
    },
    {
      name: "Grand Theatrical Society",
      category: "Arts",
      desc: "Acting, stage lighting, set design, sound engineering, and full-scale annual Broadway-standard musical production.",
      icon: <Sparkles className="w-5 h-5 text-flectere-gold" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060E1E] text-white flex flex-col selection:bg-flectere-gold/30">
      <PublicHeader onOpenTour={() => setTourOpen(true)} user={user} />
      <ScrollMotion />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#081226] via-[#0A1734] to-[#060E1E]">
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/sports-complex.jpg')" }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-flectere-crimson/15 border border-flectere-crimson/30 text-flectere-crimson text-xs font-bold tracking-widest uppercase mb-4">
            {language === "en" ? "BEYOND THE CLASSROOM" : "ALÉM DA SALA DE AULA"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {language === "en"
              ? "Vibrant Spirit & Endless Discovery"
              : "Energia, Talento & Descoberta Contínua"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Sports championships, grand theatrical productions, autonomous robotics, and expeditions across Mozambique that foster character and lifelong camaraderie."
              : "Campeonatos desportivos, grandes produções cénicas, robótica autónoma e expedições por Moçambique que moldam o carácter e criam laços para a vida."}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/admissions#visit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-flectere-gold text-[#081226] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-flectere-gold/90 transition-all"
            >
              <span>{t.nav.scheduleVisit}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Experience Component */}
      <PrestigeExperienceSection />

      {/* Clubs & Societies Directory */}
      <section className="py-20 bg-white text-flectere-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
              CO-CURRICULAR COUNCILS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-flectere-navy mt-1">
              Clubs & Student Societies
            </h2>
            <p className="text-xs sm:text-sm text-flectere-slate mt-2">
              Every Wednesday and Friday afternoon, our campus transforms into hubs of passion, discovery, and creative courage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, idx) => (
              <div
                key={idx}
                className="bg-flectere-light/70 p-6 rounded-2xl border border-flectere-slateLight hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-flectere-slateLight flex items-center justify-center mb-4 shadow-sm">
                  {club.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-flectere-gold">
                  {club.category}
                </span>
                <h4 className="font-serif font-bold text-base text-flectere-navy mt-0.5 mb-2">
                  {club.name}
                </h4>
                <p className="text-xs text-flectere-slate leading-relaxed">
                  {club.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />

      <VirtualTourModal isOpen={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
