"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FloatingShapes } from "./FloatingShapes";
import {
  Sparkles,
  Trophy,
  Shield,
  ArrowRight,
  CheckCircle2,
  Compass,
  Music,
  Dumbbell,
  Cpu,
  Users,
} from "lucide-react";

export function PrestigeExperienceSection() {
  const { t } = useLanguage();
  const [activeTabId, setActiveTabId] = useState<string>("athletics");

  const tabImages: Record<string, string> = {
    athletics: "/images/sports-complex.jpg",
    "stem-robotics": "/images/stem-lab.jpg",
    arts: "/images/arts-theatre.jpg",
    leadership: "/images/library-study.jpg",
    expeditions: "/images/campus-exterior.jpg",
  };

  const currentTab =
    t.experience.tabs.find((tab) => tab.id === activeTabId) ||
    t.experience.tabs[0];

  const houses = [
    {
      name: "Aurora",
      color: "from-amber-400 to-amber-600",
      border: "border-amber-400/40",
      text: "text-amber-500",
      motto: "Lumen et Virtus (Light & Virtue)",
      element: "Gold & Excellence",
    },
    {
      name: "Helios",
      color: "from-orange-500 to-red-600",
      border: "border-orange-500/40",
      text: "text-orange-500",
      motto: "Sapientia Regnat (Wisdom Reigns)",
      element: "Sun & Leadership",
    },
    {
      name: "Terra",
      color: "from-emerald-500 to-teal-700",
      border: "border-emerald-500/40",
      text: "text-emerald-500",
      motto: "Fortitudo in Concordia (Strength in Unity)",
      element: "Earth & Community",
    },
    {
      name: "Zephyr",
      color: "from-sky-400 to-blue-600",
      border: "border-sky-400/40",
      text: "text-sky-500",
      motto: "Invenire et Vincere (Discover & Conquer)",
      element: "Sky & Innovation",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-flectere-light relative overflow-hidden isolate">
      <FloatingShapes flip />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flectere-crimson/10 border border-flectere-crimson/20 text-flectere-crimson text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.experience.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-flectere-navy tracking-tight leading-tight">
            {t.experience.heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-flectere-slate leading-relaxed">
            {t.experience.subheading}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {t.experience.tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm border ${
                  isActive
                    ? "bg-flectere-navy text-flectere-gold border-flectere-navy shadow-md scale-105"
                    : "bg-white text-flectere-navy hover:bg-white/80 border-flectere-slateLight"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Card */}
        <div className="bg-white rounded-3xl border border-flectere-slateLight shadow-xl overflow-hidden mb-20 grid grid-cols-1 lg:grid-cols-12 transition-all duration-300">
          {/* Image Showcase */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('${tabImages[currentTab.id]}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-flectere-gold text-xs font-bold border border-white/20">
                <span dangerouslySetInnerHTML={{ __html: currentTab.stats }} />
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-flectere-crimson uppercase tracking-wider">
                Prestige Life Co-Curricular
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-flectere-navy mt-1">
                {currentTab.title}
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate mt-3 leading-relaxed">
                {currentTab.description}
              </p>

              {/* Feature Points */}
              <div className="space-y-3 mt-6">
                {currentTab.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-flectere-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-flectere-navy font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-flectere-slateLight flex items-center justify-between">
              <Link
                href="/campus-life"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-flectere-navy hover:text-flectere-gold transition-colors"
              >
                <span>Explore Life at Prestige</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admissions"
                className="px-4 py-2 rounded-xl bg-flectere-gold/15 text-flectere-gold font-bold text-xs hover:bg-flectere-gold/25 transition-colors"
              >
                Enroll Today
              </Link>
            </div>
          </div>
        </div>

        {/* The 4 Prestige Houses System */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-flectere-slateLight shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-flectere-gold tracking-widest uppercase">
              Collegiate Identity & Character
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-flectere-navy mt-1">
              {t.experience.housesTitle}
            </h3>
            <p className="text-xs sm:text-sm text-flectere-slate mt-2">
              {t.experience.housesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house) => (
              <div
                key={house.name}
                className={`p-6 rounded-2xl bg-flectere-light border ${house.border} hover:shadow-xl transition-all duration-300 relative group overflow-hidden`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${house.color} text-white flex items-center justify-center font-serif font-black text-xl mb-4 shadow-md group-hover:scale-110 transition-transform`}
                >
                  {house.name[0]}
                </div>
                <h4 className="font-serif font-bold text-lg text-flectere-navy">
                  House {house.name}
                </h4>
                <p className={`text-xs font-semibold ${house.text} mt-0.5`}>
                  {house.element}
                </p>
                <p className="text-xs text-flectere-slate italic mt-3">
                  &ldquo;{house.motto}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
