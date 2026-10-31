"use client";

import React, { useState } from "react";
import {
  Trophy,
  Dumbbell,
  Sparkles,
  BookOpen,
  CalendarCheck,
  Award,
  HeartHandshake,
  Clock,
  CheckCircle2,
  Send,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function StudentJourneyView() {
  const [supportRequested, setSupportRequested] = useState(false);
  const [supportText, setSupportText] = useState("");

  const journeyMilestones = [
    {
      year: "2026 (Grade 10)",
      title: "IGCSE Pre-Candidate & Varsity Striker",
      highlights: [
        "Gold Medalist in Maputo Inter-School Athletics (400m)",
        "Cambridge Mock Examination average: 88.5% (A*)",
        "Lead autonomous drone programmer for Pan-African Robotics Trials",
        "Completed 42 of 50 community stewardship hours in Maputo Bay restoration",
      ],
    },
    {
      year: "2025 (Grade 9)",
      title: "House Zephyr Vice-Captain & Model UN Delegate",
      highlights: [
        "Awarded 'Best Delegate' at Maputo Youth MUN (UNEP Council)",
        "Distinction in Cambridge Lower Secondary Checkpoint Mathematics",
        "Selected for Gorongosa Biodiversity Ecology Expedition",
      ],
    },
    {
      year: "2024 (Grade 8)",
      title: "Prestige Junior Scholar & Orchestra Cellist",
      highlights: [
        "Performed at Winter Gala Symphony Showcase",
        "Junior STEM Fair 1st Prize for Water Filtration Prototype",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Student Banner */}
      <div className="bg-[#081226] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-flectere-gold text-[#081226]">
              House Zephyr
            </span>
            <span className="text-xs text-slate-400">&bull; Cambridge IGCSE Candidate &bull; Class of 2028</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Tiago Mondlane &bull; Student Digital Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            A longitudinal chronicle celebrating personal growth, academic rigor, athletic discipline, and university portfolio preparation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              House Points
            </p>
            <p className="font-serif text-2xl font-bold text-flectere-gold">
              340 Pts
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-flectere-gold/20 text-flectere-gold flex items-center justify-center border border-flectere-gold/40">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 4 Pillars Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">My Timetable</span>
            <Clock className="w-4 h-4 text-flectere-gold" />
          </div>
          <div className="text-lg font-bold text-flectere-navy">
            Next: Chemistry Lab
          </div>
          <p className="text-xs text-flectere-slate mt-1">10:15 AM &bull; Science Pavilion 3</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Tasks</span>
            <BookOpen className="w-4 h-4 text-flectere-gold" />
          </div>
          <div className="text-lg font-bold text-flectere-navy">
            2 Due Tomorrow
          </div>
          <p className="text-xs text-flectere-slate mt-1">Physics Problem Set & French Essay</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Sports Fixture</span>
            <Dumbbell className="w-4 h-4 text-flectere-crimson" />
          </div>
          <div className="text-lg font-bold text-flectere-navy">
            Saturday vs MIS
          </div>
          <p className="text-xs text-flectere-slate mt-1">Football Varsity Match &bull; 10:00 AM</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Service Hours</span>
            <Compass className="w-4 h-4 text-flectere-green" />
          </div>
          <div className="text-lg font-bold text-flectere-navy">
            42 / 50 Hours
          </div>
          <p className="text-xs text-flectere-slate mt-1">84% of Duke of Edinburgh Goal</p>
        </div>
      </div>

      {/* The Prestige Student Journey Timeline */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 sm:p-8 shadow-sm">
        <div className="pb-4 border-b border-flectere-slateLight mb-6">
          <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
            Longitudinal Growth Portfolio
          </span>
          <h3 className="font-serif font-bold text-xl text-flectere-navy mt-0.5">
            The Prestige Student Journey
          </h3>
          <p className="text-xs text-flectere-slate">
            Multi-year record of academic progress, artistic exhibitions, leadership roles, and athletic achievements.
          </p>
        </div>

        <div className="space-y-6">
          {journeyMilestones.map((m, idx) => (
            <div
              key={idx}
              className="relative pl-6 border-l-2 border-flectere-gold pb-4 last:pb-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-flectere-navy border-2 border-flectere-gold" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-flectere-gold uppercase tracking-wider">
                  {m.year}
                </span>
                <h4 className="font-serif font-bold text-base text-flectere-navy">
                  {m.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {m.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-flectere-slate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-flectere-green shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Wellbeing & Mentoring Request Box */}
      <div className="bg-flectere-light rounded-2xl border border-flectere-slateLight p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-flectere-navy">
          <HeartHandshake className="w-5 h-5 text-flectere-gold" />
          <h4 className="font-serif font-bold text-base">
            Pastoral Care & Mentoring Consultation
          </h4>
        </div>
        <p className="text-xs text-flectere-slate mb-4">
          Need academic coaching, university guidance, or personal wellbeing support? Submit a confidential request to your House Tutor.
        </p>

        {supportRequested ? (
          <div className="p-4 rounded-xl bg-flectere-greenLight border border-flectere-green/30 text-xs text-flectere-green font-medium">
            Your request has been received by House Zephyr Tutor (Dr. Sterling). A private 15-minute check-in has been scheduled for tomorrow during advisory period.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. Guidance on A-Level subject selections or exam stress..."
              value={supportText}
              onChange={(e) => setSupportText(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-flectere-slateLight bg-white text-xs text-flectere-navy"
            />
            <button
              onClick={() => {
                if (supportText.trim()) setSupportRequested(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-bold hover:bg-flectere-navyLight transition-colors shrink-0"
            >
              Request Tutor Consultation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
