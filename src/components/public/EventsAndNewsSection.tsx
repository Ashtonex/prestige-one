"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FloatingShapes } from "./FloatingShapes";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  CheckCircle2,
  Share2,
  Download,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface EventItem {
  id: string;
  category: "academic" | "sports" | "arts" | "community";
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
  seatsLeft: number;
}

export function EventsAndNewsSection() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [rsvpdEvents, setRsvpdEvents] = useState<Record<string, boolean>>({});

  const events: EventItem[] = [
    {
      id: "ev-1",
      category: "academic",
      title:
        language === "en"
          ? "Cambridge Science & AI Exhibition 2026"
          : "Exposição Científica e de IA Cambridge 2026",
      date: "14 November 2026",
      day: "14",
      month: "NOV",
      time: "09:00 - 15:30",
      location: "Ada Lovelace STEM Pavilion & Quadrangle",
      description:
        language === "en"
          ? "Secondary students present autonomous robotics, biochemistry research projects, and algorithmic simulations to visiting academics and industry guests."
          : "Alunos do secundário apresentam protótipos de robótica autónoma, bioquímica e simulações com IA a académicos e convidados empresariais.",
      seatsLeft: 34,
    },
    {
      id: "ev-2",
      category: "sports",
      title:
        language === "en"
          ? "Inter-House Swimming Gala & Aquatics Finals"
          : "Gala de Natação Inter-Casas & Finais de Natação",
      date: "21 November 2026",
      day: "21",
      month: "NOV",
      time: "08:30 - 14:00",
      location: "Olympic 25m Heated Aquatics Complex",
      description:
        language === "en"
          ? "Aurora, Helios, Terra, and Zephyr battle for the prestigious 2026 Aquatics Shield. Parents and families warmly invited."
          : "As casas Aurora, Helios, Terra e Zephyr disputam o troféu aquático 2026. Encarregados de educação e famílias convidados.",
      seatsLeft: 60,
    },
    {
      id: "ev-3",
      category: "community",
      title:
        language === "en"
          ? "Executive Leadership Open Morning & Campus Tour"
          : "Manhã de Portas Abertas da Direcção & Visita Guiada",
      date: "28 November 2026",
      day: "28",
      month: "NOV",
      time: "09:30 - 12:00",
      location: "Main Auditorium & Sommerschield Grounds",
      description:
        language === "en"
          ? "Prospective families meet Head of School, inspect dual-stream classrooms, and receive personalised admissions consultations."
          : "Famílias interessadas conhecem a Direcção, visitam salas bilingues e recebem atendimento personalizado de matrículas.",
      seatsLeft: 18,
    },
    {
      id: "ev-4",
      category: "arts",
      title:
        language === "en"
          ? "Annual Gala Symphony & Choral Winter Showcase"
          : "Grande Concerto Sinfónico & Coral da Academia",
      date: "05 December 2026",
      day: "05",
      month: "DEC",
      time: "18:30 - 21:00",
      location: "Prestige Grand Performing Arts Hall (450 Seats)",
      description:
        language === "en"
          ? "A celebration of orchestral virtuosity featuring classical suites, contemporary African choral arrangements, and chamber strings."
          : "Celebração musical com orquestra de câmara, arranjos de música clássica e coral africano pelos alunos de todos os ciclos.",
      seatsLeft: 45,
    },
  ];

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((e) => e.category === activeCategory);

  const toggleRSVP = (id: string) => {
    setRsvpdEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const stories = [
    {
      id: "st-1",
      category: "Academic Distinction",
      date: "26 October 2026",
      title:
        language === "en"
          ? "Cambridge IGCSE & A-Level 2026 Cohort Attains Record 94% A*-B Grades"
          : "Turma de IGCSE & A-Levels 2026 Atinge Recorde de 94% de Notas A*-B",
      excerpt:
        language === "en"
          ? "Prestige students once again outperform international averages across Pure Mathematics, Advanced Physics, and Economics."
          : "Alunos da Prestige superam novamente as médias internacionais em Matemática Pura, Física Avançada e Economia.",
      image: "/images/library-study.jpg",
      readTime: "4 min read",
    },
    {
      id: "st-2",
      category: "STEM & Robotics",
      date: "19 October 2026",
      title:
        language === "en"
          ? "Robotics Team Qualifies for All-Africa Championship in Nairobi"
          : "Equipa de Robótica Qualifica-se para Campeonato Pan-Africano em Nairobi",
      excerpt:
        language === "en"
          ? "The autonomous drone and terrain navigation prototype developed in our Ada Lovelace laboratory wins 1st Prize in Regional Trials."
          : "O drone autónomo e protótipo de navegação terrestre desenvolvido no laboratório Ada Lovelace conquista o 1º Lugar Regional.",
      image: "/images/stem-lab.jpg",
      readTime: "3 min read",
    },
    {
      id: "st-3",
      category: "Campus Infrastructure",
      date: "12 October 2026",
      title:
        language === "en"
          ? "Sommerschield Campus Unveils Solar-Powered Environmental Pavilion"
          : "Campus de Sommerschield Inaugura Pavilhão Ambiental com Energia Solar",
      excerpt:
        language === "en"
          ? "New botanical observation deck and marine biology testing laboratory support Gorongosa ecological research partnerships."
          : "Novo observatório botânico e laboratório marinho apoiam parcerias científicas de conservação ecológica da Gorongosa.",
      image: "/images/campus-exterior.jpg",
      readTime: "5 min read",
    },
  ];

  return (
    <section id="calendar" className="py-20 lg:py-28 bg-white relative isolate overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{t.calendar.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-flectere-navy tracking-tight leading-tight">
            {t.calendar.heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-flectere-slate leading-relaxed">
            {t.calendar.subheading}
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: t.calendar.filterAll },
            { id: "academic", label: t.calendar.filterAcademic },
            { id: "sports", label: t.calendar.filterSports },
            { id: "arts", label: t.calendar.filterArts },
            { id: "community", label: t.calendar.filterCommunity },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                activeCategory === cat.id
                  ? "bg-flectere-navy text-flectere-gold border-flectere-navy shadow-md"
                  : "bg-flectere-light text-flectere-slate hover:text-flectere-navy border-flectere-slateLight"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {filteredEvents.map((ev) => {
            const isRsvpd = rsvpdEvents[ev.id];

            return (
              <div
                key={ev.id}
                className="bg-flectere-light/70 hover:bg-white rounded-2xl p-6 border border-flectere-slateLight hover:border-flectere-gold/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Date Pill */}
                    <div className="w-14 h-14 rounded-xl bg-flectere-navy text-white flex flex-col items-center justify-center shrink-0 shadow-sm border border-flectere-navy">
                      <span className="text-[10px] uppercase font-bold text-flectere-gold tracking-wider">
                        {ev.month}
                      </span>
                      <span className="font-serif text-xl font-bold leading-none">
                        {ev.day}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-flectere-gold/15 text-flectere-gold text-[10px] font-bold uppercase tracking-wider">
                          {ev.category}
                        </span>
                        <span className="text-[11px] text-flectere-slate">
                          {ev.seatsLeft} seats available
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-lg text-flectere-navy leading-snug">
                        {ev.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-flectere-slate mb-4 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-flectere-navy font-medium mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-flectere-gold shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-flectere-crimson shrink-0" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-flectere-slateLight flex items-center justify-between">
                  <button
                    onClick={() => toggleRSVP(ev.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isRsvpd
                        ? "bg-flectere-green text-white shadow-sm"
                        : "bg-flectere-navy text-white hover:bg-flectere-navyLight"
                    }`}
                  >
                    {isRsvpd ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Seat Confirmed!</span>
                      </>
                    ) : (
                      <>
                        <span>{t.calendar.rsvpBtn}</span>
                        <ArrowRight className="w-3 h-3 text-flectere-gold" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      alert(
                        `Calendar invite (.ics) generated for "${ev.title}". Check your downloads.`
                      );
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-flectere-slate hover:text-flectere-navy"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.calendar.downloadCal}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stories & Chronicle Grid */}
        <div className="pt-12 border-t border-flectere-slateLight">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
                {t.news.badge}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-flectere-navy mt-1">
                {t.news.heading}
              </h3>
              <p className="text-xs sm:text-sm text-flectere-slate mt-1">
                {t.news.subheading}
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-flectere-navy hover:text-flectere-gold transition-colors"
            >
              <span>View All Academy Bulletins</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${story.image}')` }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-flectere-slate mb-2">
                      <span>{story.date}</span>
                      <span>{story.readTime}</span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-flectere-navy leading-snug group-hover:text-flectere-gold transition-colors">
                      {story.title}
                    </h4>
                    <p className="text-xs text-flectere-slate mt-2.5 leading-relaxed line-clamp-3">
                      {story.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/news#${story.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-flectere-navy group-hover:text-flectere-gold transition-colors"
                  >
                    <span>{t.news.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
