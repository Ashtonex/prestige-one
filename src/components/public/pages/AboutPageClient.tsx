"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/lib/i18n/LanguageContext";
import { PublicHeader } from "../PublicHeader";
import { PublicFooter } from "../PublicFooter";
import { VirtualTourModal } from "../VirtualTourModal";
import {
  Building,
  Sparkles,
  Users,
  Award,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export function AboutPageClient({ user }: { user?: any }) {
  return (
    <LanguageProvider>
      <AboutContent user={user} />
    </LanguageProvider>
  );
}

function AboutContent({ user }: { user?: any }) {
  const { language, t } = useLanguage();
  const [tourOpen, setTourOpen] = useState(false);

  const leaders = [
    {
      name: "Dr. Alistair Sterling, PhD",
      role:
        language === "en"
          ? "Head of School & Executive Principal"
          : "Director Executivo & Reitor do Colégio",
      qualifications: "MA (Oxon), PhD (Harvard Graduate School of Education)",
      bio:
        language === "en"
          ? "With over 24 years of international school leadership across Geneva, London, and Nairobi, Dr. Sterling champions bilingual intellectual rigor and child wellbeing."
          : "Com mais de 24 anos de experiência na direcção de colégios internacionais em Genebra, Londres e Nairobi, o Dr. Sterling lidera com foco em rigor intelectual e bem-estar do aluno.",
    },
    {
      name: "Dra. Isabela Chissano de Abreu",
      role:
        language === "en"
          ? "Director of Academic Studies & Cambridge Officer"
          : "Directora de Estudos Académicos & Oficial Cambridge",
      qualifications: "MSc Mathematics (Imperial), Licenciatura (UEM)",
      bio:
        language === "en"
          ? "Architect of our dual-stream curriculum, overseeing Cambridge IGCSE and A-Level standards harmonized with Mozambican Ministry benchmarks."
          : "Responsável pelo modelo dual-stream bilingue, assegurando a harmonização dos exames de Cambridge com o currículo de referência nacional.",
    },
    {
      name: "Jean-Paul Delacroix",
      role:
        language === "en"
          ? "Head of Secondary & Pre-University College"
          : "Director do Ensino Secundário & Sixth Form",
      qualifications: "Agrégation (Sorbonne), MEd (King's College London)",
      bio:
        language === "en"
          ? "Directs pre-university seminar teaching, international olympiad coaching, and Ivy League and European university placement advisory."
          : "Coordena a preparação pré-universitária, olimpíadas científicas e candidaturas às universidades da Ivy League, Reino Unido e União Europeia.",
    },
    {
      name: "Marta Guimarães Couto",
      role:
        language === "en"
          ? "Head of Early Years & Primary Foundation"
          : "Directora do Pré-Escolar & Ensino Primário",
      qualifications: "Postgrad Early Childhood (Coimbra), AMI Montessori Dip.",
      bio:
        language === "en"
          ? "Fosters a nurturing, wonder-filled Reggio-Emilia and Cambridge foundation cultivating bilingual literacy, emotional security, and mathematical play."
          : "Promove um ambiente alegre e enriquecedor de inspiração Reggio-Emilia e Cambridge, estimulando a literacia bilingue e autonomia da criança.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060E1E] text-white flex flex-col selection:bg-flectere-gold/30">
      <PublicHeader onOpenTour={() => setTourOpen(true)} user={user} />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#081226] via-[#0A1734] to-[#060E1E]">
        <div className="absolute inset-0 z-0 opacity-25">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/campus-exterior.jpg')" }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            {language === "en" ? "DISCOVER PRESTIGE" : "CONHEÇA A PRESTIGE"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {language === "en"
              ? "A Heritage of Ambition & Global Distinction"
              : "Uma Tradição de Ambição & Distinção Global"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Founded to provide families in Mozambique with an uncompromising international education, Prestige International Academy unites Cambridge excellence with deep civic responsibility."
              : "Fundada para oferecer às famílias em Moçambique uma educação internacional sem concessões, a Prestige une a excelência de Cambridge a um sentido ético e cívico exemplar."}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setTourOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-flectere-gold text-[#081226] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-flectere-gold/90 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{t.nav.virtualTour}</span>
            </button>
            <Link
              href="/admissions#visit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.scheduleVisit}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Vision, Mission & Values */}
      <section id="vision" className="py-20 bg-white text-flectere-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-flectere-light p-8 rounded-3xl border border-flectere-slateLight shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-flectere-navy text-flectere-gold flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-flectere-navy mb-3">
                {language === "en" ? "Our Vision" : "A Nossa Visão"}
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                {language === "en"
                  ? "To be Southern Africa's premier dual-stream international learning community, empowering inquisitive minds to lead transformative discoveries on the global stage."
                  : "Ser a comunidade de aprendizagem internacional dual-stream de referência na África Austral, capacitando mentes curiosas a liderar descobertas transformadoras no cenário global."}
              </p>
            </div>

            <div className="bg-flectere-light p-8 rounded-3xl border border-flectere-slateLight shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-flectere-navy text-flectere-gold flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-flectere-navy mb-3">
                {language === "en" ? "Our Mission" : "A Nossa Missão"}
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                {language === "en"
                  ? "To cultivate intellectual curiosity, bilingual mastery, scientific innovation, and ethical stewardship through individualized mentorship and world-class curricula."
                  : "Cultivar a curiosidade intelectual, o bilinguismo de excelência, a inovação científica e a integridade ética através de mentoria individualizada e programas de padrão mundial."}
              </p>
            </div>

            <div className="bg-flectere-light p-8 rounded-3xl border border-flectere-slateLight shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-flectere-navy text-flectere-gold flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-flectere-navy mb-3">
                {language === "en" ? "Aude Sapere (Our Ethos)" : "Aude Sapere (O Nosso Lema)"}
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                {language === "en"
                  ? "Dare to know. We encourage courage in inquiry, disciplined pursuit of truth, and compassionate application of knowledge in service of humanity."
                  : "Ousa saber. Incentivamos a coragem de questionar, a busca disciplinada da verdade e a aplicação compassiva do conhecimento ao serviço da sociedade."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Directorate */}
      <section id="leadership" className="py-20 bg-flectere-light text-flectere-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
              {language === "en" ? "ACADEMIC GOVERNANCE" : "CORPO DIRECTIVO"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-flectere-navy mt-1">
              {language === "en" ? "Executive Leadership Team" : "Direcção Executiva do Colégio"}
            </h2>
            <p className="text-xs sm:text-sm text-flectere-slate mt-2">
              {language === "en"
                ? "Distinguished international educators dedicated to academic excellence, faculty mentorship, and learner safeguarding."
                : "Educadores internacionais de renome dedicados ao sucesso académico, formação contínua do corpo docente e protecção integral do aluno."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.map((leader, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-flectere-slateLight shadow-sm hover:shadow-xl transition-all"
              >
                <span className="text-[11px] font-bold text-flectere-gold uppercase tracking-wider">
                  {leader.qualifications}
                </span>
                <h3 className="font-serif text-2xl font-bold text-flectere-navy mt-1">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-flectere-slate mb-4">
                  {leader.role}
                </p>
                <p className="text-xs sm:text-sm text-flectere-slate leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section id="facilities" className="py-20 bg-[#081226] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
                SOMMERSCHIELD CAMPUS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                {language === "en" ? "World-Class Infrastructure" : "Instalações de Padrão Internacional"}
              </h2>
            </div>
            <button
              onClick={() => setTourOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-flectere-gold hover:underline"
            >
              <span>{t.nav.virtualTour}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="font-serif font-bold text-lg text-white mb-2">
                Ada Lovelace STEM Wing
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-performance physics, biochemistry, robotics labs, 3D printers, laser cutters, and individual research benches.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="font-serif font-bold text-lg text-white mb-2">
                Olympic 25m Aquatics Complex
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Heated 8-lane competition pool, electronic touch pads, certified lifeguards, and shaded spectator stands.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="font-serif font-bold text-lg text-white mb-2">
                Grand Performing Arts Hall
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                450-seat acoustically tuned auditorium, hydraulic orchestral pit, professional digital soundboard, and recording booth.
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
