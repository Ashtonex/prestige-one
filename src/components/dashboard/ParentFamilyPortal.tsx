"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  CalendarCheck,
  CreditCard,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  MessageCircle,
  Phone,
  Send,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Trophy,
  Dumbbell,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { formatMZN } from "@/lib/utils";

interface ChildProfile {
  id: string;
  name: string;
  grade: string;
  section: string;
  admissionNo: string;
  academicAverage: number;
  averageDelta: string;
  attendanceRate: number;
  balanceDue: number;
  dueDate: string;
  subjects: { name: string; score: number; teacher: string; comment: string }[];
  weeklyDigest: string;
  nextFixture: string;
  pendingConsent: { title: string; date: string; fee: string; status: "pending" | "signed" };
}

export function ParentFamilyPortal() {
  const childrenData: ChildProfile[] = [
    {
      id: "child-1",
      name: "Ana Mondlane",
      grade: "Grade 8",
      section: "Class A",
      admissionNo: "PIA-2024-0819",
      academicAverage: 84,
      averageDelta: "+6 pts this term",
      attendanceRate: 96,
      balanceDue: 12500,
      dueDate: "05 November 2026",
      weeklyDigest:
        "Ana attended all scheduled classes this week, completed four of five assignments, improved significantly in Mathematics (+6 pts), and has a varsity football fixture on Saturday. Your next tuition instalment is due in seven days.",
      nextFixture: "Saturday 10:00 AM &bull; Inter-School Football Match vs Maputo International",
      pendingConsent: {
        title: "Gorongosa National Park Ecology & Biology Expedition",
        date: "18 &ndash; 21 November 2026",
        fee: "Covered by Term Science Levy",
        status: "pending",
      },
      subjects: [
        {
          name: "Mathematics",
          score: 91,
          teacher: "Prof. Manuel Cossa",
          comment: "Exceptional mastery of quadratic factorization and algebraic reasoning.",
        },
        {
          name: "English & Literature",
          score: 86,
          teacher: "Ms. Sarah Jenkins",
          comment: "Eloquent discourse and perceptive character analysis in African literature.",
        },
        {
          name: "Integrated Sciences",
          score: 82,
          teacher: "Dr. Alistair Sterling",
          comment: "Diligent laboratory procedure and high-precision spectrophotometry write-ups.",
        },
        {
          name: "History & Global Studies",
          score: 77,
          teacher: "M. Jean-Paul Delacroix",
          comment: "Solid grasp of colonial trade routes; continue practicing primary source critique.",
        },
      ],
    },
    {
      id: "child-2",
      name: "Lucas Mondlane",
      grade: "Grade 4",
      section: "Class B",
      admissionNo: "PIA-2025-1102",
      academicAverage: 89,
      averageDelta: "+4 pts this term",
      attendanceRate: 98,
      balanceDue: 0,
      dueDate: "Paid in Full",
      weeklyDigest:
        "Lucas completed all daily reading logs this week, built a motorized LEGO robotics crane in junior STEM, and earned a swimming ribbon for 25m freestyle progress.",
      nextFixture: "Friday 14:00 PM &bull; Junior House Aquatics Gala",
      pendingConsent: {
        title: "Maputo Natural History Museum Botanical Tour",
        date: "12 November 2026",
        fee: "1,200 MT (Transport & Museum Guide)",
        status: "signed",
      },
      subjects: [
        {
          name: "Primary Mathematics",
          score: 94,
          teacher: "Dra. Isabela Chissano",
          comment: "Quick mental arithmetic and enthusiastic geometry exploration.",
        },
        {
          name: "Bilingual Literacy (PT/EN)",
          score: 88,
          teacher: "Prof. Marta Couto",
          comment: "Confident storytelling and beautiful cursive handwriting in both languages.",
        },
        {
          name: "Junior Discovery Science",
          score: 85,
          teacher: "Mr. Thomas Khumalo",
          comment: "Very inquisitive nature during the seed germination lab experiment.",
        },
      ],
    },
  ];

  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [activeTab, setActiveTab] = useState<
    "overview" | "academics" | "timetable" | "finance" | "consent" | "messages"
  >("overview");

  // Payment modal state
  const [showPayModal, setShowPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState<"mpesa" | "emola" | "bank">("mpesa");
  const [payPhone, setPayPhone] = useState("+258 84 920 1827");
  const [paySuccess, setPaySuccess] = useState(false);

  // Consent state
  const [consents, setConsents] = useState<Record<string, boolean>>({
    "child-1": false,
    "child-2": true,
  });

  // Moderated message state
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const currentChild =
    childrenData.find((c) => c.id === selectedChildId) || childrenData[0];

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaySuccess(true);
  };

  const signConsent = () => {
    setConsents((prev) => ({ ...prev, [selectedChildId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Top Guardian Header & Multi-Child Switcher */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-flectere-gold/20 text-flectere-gold">
              Prestige Family
            </span>
            <span className="text-xs text-flectere-slate">&bull; Parent & Guardian Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy mt-1 tracking-tight font-serif">
            Mondlane Family Learning Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
            Logged in as <strong className="text-flectere-navy">Dona Beatriz Mondlane</strong> &bull; Maputo, Mozambique
          </p>
        </div>

        {/* Multi-Child Profile Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-flectere-light border border-flectere-slateLight shrink-0">
          <span className="text-[11px] font-bold text-flectere-slate px-2 uppercase tracking-wider">
            Switch Child:
          </span>
          {childrenData.map((child) => {
            const isSelected = child.id === selectedChildId;
            return (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-flectere-navy text-white shadow-sm"
                    : "text-flectere-slate hover:text-flectere-navy hover:bg-white/60"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected
                      ? "bg-flectere-gold text-flectere-navy"
                      : "bg-flectere-slateLight text-flectere-slate"
                  }`}
                >
                  {child.name[0]}
                </div>
                <span>{child.name.split(" ")[0]} ({child.grade})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Narrative Weekly Digest Box (Core Innovation) */}
      <div className="bg-gradient-to-br from-[#0c1b3d] to-[#081226] text-white rounded-2xl p-6 sm:p-7 border border-flectere-gold/30 shadow-lg relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-flectere-gold/20 text-flectere-gold flex items-center justify-center shrink-0 border border-flectere-gold/40">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-flectere-gold">
                Prestige Weekly Family Digest &bull; Term 3 Week 9
              </span>
              <span className="text-xs text-slate-400 font-medium">Updated 2 hours ago</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-serif leading-relaxed italic">
              &ldquo;{currentChild.weeklyDigest}&rdquo;
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-flectere-gold" />
                <span dangerouslySetInnerHTML={{ __html: currentChild.nextFixture }} />
              </div>
              <div className="flex items-center gap-1.5 text-flectere-gold font-semibold">
                <CreditCard className="w-3.5 h-3.5" />
                <span>
                  {currentChild.balanceDue > 0
                    ? `Tuition Due: ${currentChild.balanceDue.toLocaleString()} MT (${currentChild.dueDate})`
                    : "Account in Good Standing (0 MT)"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Academic Average */}
        <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between mb-3 text-flectere-slate">
            <span className="text-xs font-bold uppercase tracking-wider">Academic Average</span>
            <GraduationCap className="w-5 h-5 text-flectere-gold" />
          </div>
          <div className="text-4xl font-extrabold text-flectere-navy font-serif">
            {currentChild.academicAverage}%
          </div>
          <p className="text-xs font-semibold text-flectere-green mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{currentChild.averageDelta}</span>
          </p>
          <p className="text-[11px] text-flectere-slate mt-1">
            {currentChild.grade} &bull; {currentChild.section} &bull; Enrolled
          </p>
        </div>

        {/* Card 2: Attendance */}
        <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between mb-3 text-flectere-slate">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Attendance</span>
            <CalendarCheck className="w-5 h-5 text-flectere-green" />
          </div>
          <div className="text-4xl font-extrabold text-flectere-navy font-serif">
            {currentChild.attendanceRate}%
          </div>
          <p className="text-xs font-semibold text-flectere-green mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>0 Unexcused Absences Current Term</span>
          </p>
          <p className="text-[11px] text-flectere-slate mt-1">
            Morning roll call completed at 08:05 AM
          </p>
        </div>

        {/* Card 3: School Account Balance & Local Payment Button */}
        <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 text-flectere-slate">
              <span className="text-xs font-bold uppercase tracking-wider">School Account Balance</span>
              <CreditCard className="w-5 h-5 text-flectere-crimson" />
            </div>
            <div className="text-3xl font-extrabold text-flectere-navy font-serif">
              {currentChild.balanceDue.toLocaleString()} MT
            </div>
            <p className="text-xs text-flectere-slate mt-1">
              Due Date: <strong className="text-flectere-navy">{currentChild.dueDate}</strong>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-flectere-slateLight">
            {currentChild.balanceDue > 0 ? (
              <button
                onClick={() => {
                  setPaySuccess(false);
                  setShowPayModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] hover:from-[#d4af37] text-[#081226] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Explore Payment Experience (M-Pesa / Bank)</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-flectere-green flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Account Cleared for Term 3
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Subject Performance Breakdown & Teacher Feedback */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-flectere-slateLight mb-6">
          <div>
            <h3 className="font-serif font-bold text-xl text-flectere-navy">
              Academic Progress by Subject &bull; {currentChild.name}
            </h3>
            <p className="text-xs text-flectere-slate">
              Continuous markbook publication &bull; Term 3 Cambridge & National Standards
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-flectere-light text-flectere-navy text-xs font-semibold border border-flectere-slateLight">
            {currentChild.subjects.length} Enrolled Courses
          </span>
        </div>

        <div className="space-y-4">
          {currentChild.subjects.map((subj, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-flectere-light/70 border border-flectere-slateLight flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-serif font-bold text-base text-flectere-navy">
                    {subj.name}
                  </h4>
                  <span className="text-xs text-flectere-slate">
                    Educator: <strong className="text-flectere-navy">{subj.teacher}</strong>
                  </span>
                </div>
                <p className="text-xs text-flectere-slate leading-relaxed">
                  &ldquo;{subj.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="w-28 bg-flectere-slateLight/80 rounded-full h-2.5 overflow-hidden hidden sm:block">
                  <div
                    className="h-full bg-flectere-navy rounded-full"
                    style={{ width: `${subj.score}%` }}
                  />
                </div>
                <div className="text-right w-16">
                  <span className="font-serif text-2xl font-bold text-flectere-navy">
                    {subj.score}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parent Actions: Excursion Consent & Moderated Messaging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Excursion Digital Consent */}
        <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-flectere-gold">
              <FileCheck2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Digital Guardian Consent
              </span>
            </div>
            <h3 className="font-serif font-bold text-lg text-flectere-navy">
              {currentChild.pendingConsent.title}
            </h3>
            <p className="text-xs text-flectere-slate mt-1">
              Dates: <strong className="text-flectere-navy" dangerouslySetInnerHTML={{ __html: currentChild.pendingConsent.date }} />
            </p>
            <p className="text-xs text-flectere-slate mt-0.5">
              Cost: <strong className="text-flectere-navy">{currentChild.pendingConsent.fee}</strong>
            </p>

            <p className="text-xs text-flectere-slate mt-3 leading-relaxed">
              Provides guardian authorization for student participation, certified school bus travel, and accredited ecological field study.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-flectere-slateLight">
            {consents[selectedChildId] ? (
              <div className="flex items-center gap-2 text-flectere-green text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorized by Dona Beatriz Mondlane on 31 Oct 2026</span>
              </div>
            ) : (
              <button
                onClick={signConsent}
                className="w-full py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-bold hover:bg-flectere-navyLight transition-colors flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-flectere-gold" />
                <span>Sign & Grant Excursion Consent</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Moderated Parent-Teacher Messaging */}
        <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-flectere-gold">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Audited School Messaging
              </span>
            </div>
            <h3 className="font-serif font-bold text-lg text-flectere-navy">
              Direct Enquiry to Teaching Faculty
            </h3>
            <p className="text-xs text-flectere-slate mt-1 mb-4">
              Messages are routed through leadership-moderated channels with a 24-hour response standard.
            </p>

            {messageSent ? (
              <div className="p-4 rounded-xl bg-flectere-greenLight border border-flectere-green/30 text-xs text-flectere-green font-medium">
                Message delivered to Prof. Manuel Cossa (Mathematics). A notification will appear once the teacher responds.
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  rows={3}
                  placeholder={`Send a confidential query regarding ${currentChild.name}'s progress...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-flectere-light border border-flectere-slateLight text-xs text-flectere-navy focus:outline-none focus:border-flectere-gold"
                />
                <button
                  onClick={() => {
                    if (messageText.trim()) setMessageSent(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-bold hover:bg-flectere-navyLight transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-flectere-gold" />
                  <span>Send Moderated Message</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mozambique Local Payments Modal (M-Pesa / e-Mola / Bank) */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-flectere-slateLight">
            <div className="flex items-center justify-between pb-4 border-b border-flectere-slateLight">
              <div>
                <h3 className="font-serif font-bold text-lg text-flectere-navy">
                  Settle School Account
                </h3>
                <p className="text-xs text-flectere-slate">
                  Invoice for {currentChild.name} &bull; {currentChild.balanceDue.toLocaleString()} MT
                </p>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {paySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-flectere-green text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-flectere-navy">
                  Payment Confirmed!
                </h4>
                <p className="text-xs text-flectere-slate">
                  Transaction ref: <strong className="font-mono text-flectere-navy">MP-2026-948192</strong>
                </p>
                <p className="text-xs text-flectere-slate">
                  Receipt for 12,500 MT dispatched via SMS and added to your financial audit history.
                </p>
                <button
                  onClick={() => setShowPayModal(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-flectere-navy text-white text-xs font-bold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handlePaySubmit} className="mt-5 space-y-4">
                {/* Method selector */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayMethod("mpesa")}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      payMethod === "mpesa"
                        ? "bg-[#E60000] text-white border-[#E60000] shadow-sm"
                        : "bg-flectere-light border-flectere-slateLight text-flectere-navy"
                    }`}
                  >
                    M-Pesa (Vodacom)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayMethod("emola")}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      payMethod === "emola"
                        ? "bg-[#FFCC00] text-black border-[#FFCC00] shadow-sm"
                        : "bg-flectere-light border-flectere-slateLight text-flectere-navy"
                    }`}
                  >
                    e-Mola (Movitel)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayMethod("bank")}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      payMethod === "bank"
                        ? "bg-flectere-navy text-white border-flectere-navy shadow-sm"
                        : "bg-flectere-light border-flectere-slateLight text-flectere-navy"
                    }`}
                  >
                    Bank Transfer
                  </button>
                </div>

                {payMethod === "mpesa" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-flectere-navy">
                      M-Pesa Registered Number:
                    </label>
                    <input
                      type="text"
                      value={payPhone}
                      onChange={(e) => setPayPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-flectere-slateLight text-xs text-flectere-navy font-mono"
                    />
                    <p className="text-[11px] text-flectere-slate">
                      A prompt will appear on your phone asking you to enter your M-Pesa PIN.
                    </p>
                  </div>
                )}

                {payMethod === "bank" && (
                  <div className="p-3 rounded-xl bg-flectere-light border border-flectere-slateLight text-xs text-flectere-navy space-y-1">
                    <p><strong>Bank:</strong> Millennium BIM / BCI</p>
                    <p><strong>Entity:</strong> 00481 (Prestige School)</p>
                    <p><strong>Reference:</strong> 849 201 928</p>
                    <p><strong>Amount:</strong> 12,500 MT</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-flectere-navy hover:bg-flectere-navyLight text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Confirm Payment (12,500 MT)
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
