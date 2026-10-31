"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Calendar,
  Calculator,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageCircle,
  FileText,
  UserCheck,
} from "lucide-react";

export function AdmissionsEngineSection() {
  const { t } = useLanguage();

  // Tuition Calculator State
  const [selectedStage, setSelectedStage] = useState<string>("primary");
  const [isBoarding, setIsBoarding] = useState<boolean>(false);
  const [includeTransport, setIncludeTransport] = useState<boolean>(true);
  const [includeCatering, setIncludeCatering] = useState<boolean>(true);

  // Stage pricing base in MZN (Mozambican Meticais) per term (3 terms per year)
  const basePrices: Record<string, { termly: number; usd: number; label: string }> = {
    eyfs: { termly: 180000, usd: 2800, label: "Early Years (Ages 3-5)" },
    primary: { termly: 240000, usd: 3750, label: "Cambridge Primary (Grades 1-5)" },
    "lower-secondary": { termly: 290000, usd: 4500, label: "Lower Secondary (Grades 6-8)" },
    "upper-secondary": { termly: 360000, usd: 5600, label: "Upper Secondary (IGCSE / A-Levels)" },
  };

  const boardingFee = isBoarding ? 120000 : 0;
  const transportFee = includeTransport && !isBoarding ? 35000 : 0;
  const cateringFee = includeCatering ? 28000 : 0;

  const currentBase = basePrices[selectedStage] || basePrices.primary;
  const totalTermlyMZN = currentBase.termly + boardingFee + transportFee + cateringFee;
  const totalAnnualMZN = totalTermlyMZN * 3;
  const totalTermlyUSD = Math.round(totalTermlyMZN / 64);
  const totalAnnualUSD = totalTermlyUSD * 3;

  // Tour Booking State
  const [tourForm, setTourForm] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    studentStage: "Cambridge Primary",
    preferredDate: "2026-11-15",
    timeSlot: "09:30 AM (Morning Session)",
    focusArea: "STEM & Robotics Laboratories",
  });
  const [tourBooked, setTourBooked] = useState(false);
  const [tourRef, setTourRef] = useState("");

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = "TOUR-2026-" + Math.floor(1000 + Math.random() * 9000);
    setTourRef(generatedRef);
    setTourBooked(true);
  };

  // Application Tracker State
  const [trackingId, setTrackingId] = useState("");
  const [trackedApp, setTrackedApp] = useState<{
    id: string;
    studentName: string;
    stage: string;
    status: string;
    stepIndex: number;
    updatedDate: string;
    notes: string;
  } | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const demoApplications: Record<
    string,
    {
      id: string;
      studentName: string;
      stage: string;
      status: string;
      stepIndex: number;
      updatedDate: string;
      notes: string;
    }
  > = {
    "PIA-2026-4081": {
      id: "PIA-2026-4081",
      studentName: "Lucas de Carvalho",
      stage: "Cambridge Primary Grade 4",
      status: "Assessment & Interview Scheduled",
      stepIndex: 3,
      updatedDate: "29 October 2026",
      notes: "Academic transcripts verified. Family interview confirmed for 5 November 2026 at 10:00 AM.",
    },
    "PIA-2026-9214": {
      id: "PIA-2026-9214",
      studentName: "Amina Al-Mansoor",
      stage: "Lower Secondary Grade 7",
      status: "Offer Letter Issued",
      stepIndex: 5,
      updatedDate: "27 October 2026",
      notes: "Admissions offer dispatched. Registration deposit window open until 10 November 2026.",
    },
    "PIA-2026-1105": {
      id: "PIA-2026-1105",
      studentName: "Keara Santos-Chilundo",
      stage: "Upper Secondary (IGCSE Year 10)",
      status: "Enrolled & Buddy Assigned",
      stepIndex: 6,
      updatedDate: "24 October 2026",
      notes: "Enrolment finalized. Welcome packet and school iPad setup credentials sent to parents.",
    },
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const cleaned = trackingId.trim().toUpperCase();
    if (demoApplications[cleaned]) {
      setTrackedApp(demoApplications[cleaned]);
    } else if (cleaned.length > 3) {
      // Create a dynamic realistic response for any user query
      setTrackedApp({
        id: cleaned,
        studentName: "Prospective Candidate",
        stage: "Cambridge Dual-Stream Division",
        status: "Application Under Review",
        stepIndex: 2,
        updatedDate: "Today",
        notes: "All submitted documents received and queued for Admissions Committee academic review.",
      });
    } else {
      setTrackedApp(null);
    }
  };

  return (
    <section id="admissions" className="py-20 lg:py-28 bg-[#071126] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.admissions.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.admissions.heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.admissions.subheading}
          </p>
        </div>

        {/* 6-Step Admission Journey Grid */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-white">
              {t.admissions.stepsTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {t.admissions.steps.map((st) => (
              <div
                key={st.step}
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-black text-flectere-gold/40 group-hover:text-flectere-gold transition-colors block mb-2">
                    {st.step}
                  </span>
                  <h4 className="font-bold text-sm text-white mb-1.5">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Suite: Fee Calculator + Tour Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Column 1: Interactive Tuition & Fee Estimator (7 cols) */}
          <div id="calculator" className="lg:col-span-7 bg-[#0b1833] rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-flectere-gold">
                <Calculator className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Transparent Tuition Model
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t.admissions.calculator.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6">
                {t.admissions.calculator.subtitle}
              </p>

              {/* Stage Selection */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.admissions.calculator.selectStage}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(basePrices).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedStage(key)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all ${
                        selectedStage === key
                          ? "bg-flectere-gold text-[#081226] border-flectere-gold font-bold shadow-md"
                          : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <p className="font-semibold">{val.label}</p>
                      <p className="text-[10px] opacity-80 mt-0.5">
                        {val.termly.toLocaleString()} MZN / term
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Day vs Boarding Switch */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.admissions.calculator.dayVsBoarding}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsBoarding(false)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      !isBoarding
                        ? "bg-white/20 border-white text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {t.admissions.calculator.dayStudent}
                  </button>
                  <button
                    onClick={() => setIsBoarding(true)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isBoarding
                        ? "bg-white/20 border-white text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {t.admissions.calculator.boardingStudent} (+120k MZN)
                  </button>
                </div>
              </div>

              {/* Optional Services Toggles */}
              <div className="space-y-3 mb-6">
                {!isBoarding && (
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeTransport}
                      onChange={(e) => setIncludeTransport(e.target.checked)}
                      className="w-4 h-4 rounded text-flectere-gold focus:ring-0 accent-flectere-gold"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-white">
                        {t.admissions.calculator.transportOption} (+35,000 MZN)
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {t.admissions.calculator.transportLabel}
                      </p>
                    </div>
                  </label>
                )}

                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeCatering}
                    onChange={(e) => setIncludeCatering(e.target.checked)}
                    className="w-4 h-4 rounded text-flectere-gold focus:ring-0 accent-flectere-gold"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-white">
                      {t.admissions.calculator.cateringOption} (+28,000 MZN)
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {t.admissions.calculator.cateringLabel}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Total Price Display Box */}
            <div className="bg-gradient-to-br from-[#060E1E] to-[#0A1835] rounded-2xl p-5 border border-flectere-gold/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">
                    {t.admissions.calculator.termlyTuition}
                  </span>
                  <p className="font-serif text-2xl sm:text-3xl font-black text-flectere-gold mt-1">
                    {totalTermlyMZN.toLocaleString()} MZN
                  </p>
                  <p className="text-xs text-slate-400">
                    &approx; ${totalTermlyUSD.toLocaleString()} USD
                  </p>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">
                    {t.admissions.calculator.annualTuition}
                  </span>
                  <p className="font-serif text-2xl sm:text-3xl font-black text-white mt-1">
                    {totalAnnualMZN.toLocaleString()} MZN
                  </p>
                  <p className="text-xs text-slate-400">
                    &approx; ${totalAnnualUSD.toLocaleString()} USD (3 Terms)
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 mt-3 pt-3 border-t border-white/10 leading-normal">
                {t.admissions.calculator.disclaimer}
              </p>
            </div>
          </div>

          {/* Column 2: Book a Campus Tour (5 cols) */}
          <div id="visit" className="lg:col-span-5 bg-[#0b1833] rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-flectere-gold">
                <Calendar className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Private Admissions Visit
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t.admissions.tourBooking.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6">
                {t.admissions.tourBooking.subtitle}
              </p>

              {tourBooked ? (
                <div className="bg-flectere-green/20 border border-flectere-green/40 rounded-2xl p-6 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-flectere-green text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-white">
                    Tour Reservation Confirmed!
                  </h4>
                  <p className="text-xs text-slate-200 mt-2">
                    {t.admissions.tourBooking.successMsg}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
                    <p className="text-slate-400">Booking Pass Reference:</p>
                    <p className="font-mono text-base font-bold text-flectere-gold">
                      {tourRef}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {tourForm.parentName} &bull; {tourForm.preferredDate} ({tourForm.timeSlot})
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <a
                      href="https://wa.me/258840000000?text=Hello%20Prestige%20Admissions%20Team%2C%20I%20have%20booked%20a%20campus%20tour%20reference%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-black font-bold text-xs hover:bg-[#20bd5a] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat with Admissions on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setTourBooked(false)}
                      className="text-xs text-slate-400 hover:text-white underline mt-1"
                    >
                      Book another date
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTourSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      {t.admissions.tourBooking.parentName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dra. Maria Manuela Santos"
                      value={tourForm.parentName}
                      onChange={(e) =>
                        setTourForm({ ...tourForm, parentName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-flectere-gold transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        {t.admissions.tourBooking.parentPhone}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+258 84 123 4567"
                        value={tourForm.parentPhone}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, parentPhone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-flectere-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        {t.admissions.tourBooking.parentEmail}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="parent@company.mz"
                        value={tourForm.parentEmail}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, parentEmail: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-flectere-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        {t.admissions.tourBooking.preferredDate}
                      </label>
                      <input
                        type="date"
                        required
                        value={tourForm.preferredDate}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, preferredDate: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-flectere-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        {t.admissions.tourBooking.timeSlot}
                      </label>
                      <select
                        value={tourForm.timeSlot}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, timeSlot: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#081226] border border-white/15 text-white text-xs focus:outline-none focus:border-flectere-gold transition-colors"
                      >
                        <option>09:30 AM (Morning Tour)</option>
                        <option>11:30 AM (Academic Session)</option>
                        <option>02:30 PM (Afternoon Tour)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      {t.admissions.tourBooking.focusArea}
                    </label>
                    <select
                      value={tourForm.focusArea}
                      onChange={(e) =>
                        setTourForm({ ...tourForm, focusArea: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#081226] border border-white/15 text-white text-xs focus:outline-none focus:border-flectere-gold transition-colors"
                    >
                      <option>STEM & Robotics Laboratories</option>
                      <option>Early Years & Primary Foundation</option>
                      <option>Sports Complex & Olympic Aquatics</option>
                      <option>Performing Arts & Youth Orchestra</option>
                      <option>Sixth Form & University Advisory</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] hover:from-[#d4af37] hover:to-flectere-gold text-[#081226] font-bold text-xs uppercase tracking-wider shadow-lg shadow-flectere-gold/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.admissions.tourBooking.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Live Application Status Tracker Banner */}
        <div id="tracker" className="bg-[#0b1833] rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
              Live Intake Portal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              {t.admissions.tracker.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              {t.admissions.tracker.subtitle}
            </p>

            {/* Input Form */}
            <form onSubmit={handleTrackSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t.admissions.tracker.placeholder}
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-flectere-gold"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-flectere-gold text-[#081226] font-bold text-xs sm:text-sm shadow-md hover:bg-flectere-gold/90 transition-colors"
              >
                {t.admissions.tracker.checkBtn}
              </button>
            </form>
            <p className="text-[11px] text-slate-400 mt-2">
              {t.admissions.tracker.demoHint}
            </p>
          </div>

          {/* Result Card */}
          {trackedApp && (
            <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-md max-w-4xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-flectere-gold tracking-widest uppercase">
                    Application ID: {trackedApp.id}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {trackedApp.studentName}
                  </h4>
                  <p className="text-xs text-slate-300">{trackedApp.stage}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-flectere-gold/20 text-flectere-gold border border-flectere-gold/40 text-xs font-bold">
                    {trackedApp.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Updated: {trackedApp.updatedDate}
                  </p>
                </div>
              </div>

              {/* Stepper Progress Bar */}
              <div className="mt-8 mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {[
                    "1. Received",
                    "2. Verification",
                    "3. Assessment",
                    "4. Committee",
                    "5. Offer",
                    "6. Enrolled",
                  ].map((stepLabel, idx) => {
                    const stepNum = idx + 1;
                    const isDone = stepNum < trackedApp.stepIndex;
                    const isCurrent = stepNum === trackedApp.stepIndex;

                    return (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                            isDone
                              ? "bg-flectere-green text-white"
                              : isCurrent
                              ? "bg-flectere-gold text-[#081226] ring-4 ring-flectere-gold/30 animate-pulse"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                        </div>
                        <span
                          className={`text-[10px] leading-tight font-medium ${
                            isCurrent
                              ? "text-flectere-gold font-bold"
                              : isDone
                              ? "text-slate-200"
                              : "text-slate-500"
                          }`}
                        >
                          {stepLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-xs text-slate-200 flex items-start gap-3">
                <Clock className="w-4 h-4 text-flectere-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Admissions Note:</p>
                  <p className="text-slate-300 mt-0.5">{trackedApp.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
