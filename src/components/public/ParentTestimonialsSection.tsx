"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MotionBackground3D } from "./MotionBackground3D";
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export function ParentTestimonialsSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: "t-1",
      quote:
        language === "en"
          ? "Prestige provided our daughter with not just an extraordinary Cambridge academic foundation, but an international mindset and personal resilience that secured her full scholarship admission to Stanford University."
          : "A Prestige proporcionou à nossa filha não apenas uma base académica Cambridge excepcional, mas uma mentalidade global e resiliência pessoal que lhe garantiu admissão com bolsa em Stanford.",
      author: "Dra. Amina & Eng. Carlos Tembe",
      role:
        language === "en"
          ? "Parents of Mariana (Class of 2025, now at Stanford University)"
          : "Encarregados de Educação de Mariana (Turma 2025, agora em Stanford)",
      location: "Sommerschield, Maputo",
      tag: "Stanford University Placement",
    },
    {
      id: "t-2",
      quote:
        language === "en"
          ? "As a diplomatic family moving between continents, we have experienced elite international schools in Geneva and Washington. Prestige stands shoulder to shoulder with the finest schools worldwide in its STEM facilities, bilingual mastery, and pastoral warmth."
          : "Como família diplomática com passagens por Genebra e Washington, conhecemos as melhores escolas internacionais do mundo. A Prestige está ao nível das mais conceituadas tanto nos laboratórios STEM como no apoio humano e bilinguismo.",
      author: "Hon. Ambassador Philippe & Dr. Claire Dupont",
      role:
        language === "en"
          ? "European Union Mission & Parents of Two Lower Secondary Scholars"
          : "Missão da União Europeia & Encarregados de Educação no Secundário",
      location: "Maputo Diplomatic Enclave",
      tag: "Diplomatic Community Endorsement",
    },
    {
      id: "t-3",
      quote:
        language === "en"
          ? "The dual-stream curriculum is unmatched in Mozambique. My sons think rigorously in both English and Portuguese, while the robotics program and swimming academy have turned them into disciplined, passionate young men."
          : "O currículo dual-stream é incomparável em Moçambique. Os meus filhos pensam com rigor tanto em Português como em Inglês, enquanto a robótica e a academia de natação os tornaram jovens disciplinados e apaixonados pelo saber.",
      author: "Dr. Inácio Macamo",
      role:
        language === "en"
          ? "Managing Director & Parent of Grade 4 and Grade 8 Scholars"
          : "Director Geral & Encarregado de Educação (4ª e 8ª Classes)",
      location: "Polana Cimento, Maputo",
      tag: "Bilingual Dual-Stream Mastery",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#0b1730] text-white relative overflow-hidden">
      {/* Ambient 3D starfield */}
      <MotionBackground3D showGlobe={false} intensity={0.5} />

      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-flectere-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
            {t.testimonials.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-1">
            {t.testimonials.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            {t.testimonials.subheading}
          </p>
        </div>

        {/* Carousel Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl relative shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-flectere-gold/20 border border-flectere-gold/40 flex items-center justify-center text-flectere-gold">
              <Quote className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-flectere-gold text-flectere-gold"
                />
              ))}
            </div>
          </div>

          <p className="font-serif text-lg sm:text-2xl text-slate-100 leading-relaxed italic mb-8">
            &ldquo;{current.quote}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-white">
                  {current.author}
                </h4>
                <CheckCircle2 className="w-4 h-4 text-flectere-gold" />
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{current.role}</p>
              <p className="text-[11px] text-flectere-gold font-medium mt-0.5">
                {current.location} &bull; {current.tag}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-slate-400 px-2 font-mono">
                {currentIndex + 1} / {testimonials.length}
              </span>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
