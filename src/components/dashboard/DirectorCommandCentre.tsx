"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  FileText,
  Filter,
  BarChart3,
  BookOpen,
  ChevronRight,
  UserCheck,
  Sparkles,
  Download,
  AlertCircle,
  Check,
} from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  category: "Academic" | "Finance" | "Curriculum" | "Pastoral";
  owner: string;
  priority: "Urgent" | "High" | "Medium";
  deadline: string;
  status: "Open" | "In Progress" | "Resolved";
  notes: string;
}

export function DirectorCommandCentre() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "academics" | "timeliness" | "finance" | "actions"
  >("overview");

  // Operational Attention Queue items
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: "act-1",
      title: "Grade 8 Mathematics Assessment Remediation Plan",
      category: "Academic",
      owner: "Prof. Manuel Cossa (Head of Math)",
      priority: "Urgent",
      deadline: "04 Nov 2026",
      status: "In Progress",
      notes: "Class average dropped to 64.2% on Algebra II benchmark. Remedial workshop scheduled for Tuesdays.",
    },
    {
      id: "act-2",
      title: "Unsubmitted Assessment Schedules (3 Classes)",
      category: "Curriculum",
      owner: "Dra. Isabela Chissano (Academic Director)",
      priority: "High",
      deadline: "06 Nov 2026",
      status: "Open",
      notes: "Grade 9 Physics, Grade 7 History, and Grade 10 Literature missing term assessment calendars.",
    },
    {
      id: "act-3",
      title: "Arrears Follow-Up Queue (18 Overdue Accounts > 60 Days)",
      category: "Finance",
      owner: "Graça Machel-Sitoe (Bursar / Finance)",
      priority: "High",
      deadline: "05 Nov 2026",
      status: "In Progress",
      notes: "4,200,000 MZN outstanding. Automated friendly M-Pesa & bank reminders queued. Strict guardian privacy respected.",
    },
    {
      id: "act-4",
      title: "Grade 11B Persistent Monday Absence Pattern",
      category: "Pastoral",
      owner: "Jean-Paul Delacroix (Head of Secondary)",
      priority: "Medium",
      deadline: "08 Nov 2026",
      status: "Open",
      notes: "Monday attendance averaging 78% in Section B. Parental briefing call scheduled.",
    },
  ]);

  const toggleActionStatus = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === "Open"
              ? "In Progress"
              : item.status === "In Progress"
              ? "Resolved"
              : "Open";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Grade Performance Benchmark Data (Grade 6 to Grade 12)
  const gradePerformance = [
    { grade: "Grade 6", score: 81.4, target: 75, delta: "+3.2%", status: "good" },
    { grade: "Grade 7", score: 79.2, target: 75, delta: "+1.8%", status: "good" },
    { grade: "Grade 8", score: 68.6, target: 75, delta: "-4.5%", status: "warning" },
    { grade: "Grade 9", score: 74.8, target: 75, delta: "+0.4%", status: "normal" },
    { grade: "Grade 10", score: 76.5, target: 75, delta: "+2.1%", status: "good" },
    { grade: "Grade 11", score: 78.0, target: 75, delta: "+3.8%", status: "good" },
    { grade: "Grade 12", score: 82.3, target: 75, delta: "+5.1%", status: "good" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Leadership Executive Banner */}
      <div className="bg-[#0b1730] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-flectere-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-flectere-gold/20 text-flectere-gold border border-flectere-gold/30">
                Institutional Operations & Intelligence
              </span>
              <span className="text-xs text-slate-400">&bull; Prestige ONE Command Centre</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Director&apos;s Executive Command Centre
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Real-time institutional oversight across academics, teacher workflows, attendance, and finance &mdash; replacing fragmented spreadsheets with authoritative operational intelligence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                alert(
                  "Generating Prestige ONE Institutional Intelligence Weekly Summary (PDF)... Includes academic attrition, cash flow forecasting, and teacher coverage audit."
                );
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all"
            >
              <Download className="w-4 h-4 text-flectere-gold" />
              <span>Weekly Institutional Brief</span>
            </button>
            <Link
              href="/students/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] hover:from-[#d4af37] text-[#081226] text-xs font-bold shadow-lg transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Admit Candidate</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs for Leadership View */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-semibold">
          {[
            { id: "overview", label: "Executive Overview" },
            { id: "academics", label: "Academic Trajectories" },
            { id: "timeliness", label: "Teacher Coverage & Workload" },
            { id: "finance", label: "Tuition & Cash Flow" },
            { id: "actions", label: `Action Centre (${actionItems.filter((i) => i.status !== "Resolved").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-flectere-gold text-[#081226] font-bold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Executive KPI Cards (Exact Values from Proposal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Enrolled Students */}
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-flectere-slate">
              Enrolled Students
            </span>
            <div className="p-2 rounded-xl bg-flectere-light text-flectere-navy">
              <Users className="w-4 h-4 text-flectere-gold" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-flectere-navy tracking-tight font-serif">
            1,248
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-flectere-green mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.2% vs last term</span>
          </div>
          <p className="text-[11px] text-flectere-slate mt-1">
            Capacity: 1,400 (89.1% utilization)
          </p>
        </div>

        {/* Metric 2: Average Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-amber-300 bg-amber-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-flectere-slate">
              Average Attendance
            </span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-flectere-navy tracking-tight font-serif">
            87.4%
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mt-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Requires attention (Benchmark: 92%)</span>
          </div>
          <p className="text-[11px] text-flectere-slate mt-1">
            Grade 8 & Grade 11 Monday dips flagged
          </p>
        </div>

        {/* Metric 3: Academic Average */}
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-flectere-slate">
              Academic Average
            </span>
            <div className="p-2 rounded-xl bg-flectere-light text-flectere-navy">
              <GraduationCap className="w-4 h-4 text-flectere-gold" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-flectere-navy tracking-tight font-serif">
            76.8%
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-flectere-green mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.1 pts vs last term</span>
          </div>
          <p className="text-[11px] text-flectere-slate mt-1">
            Top subject: Pure Math (84.1%)
          </p>
        </div>

        {/* Metric 4: Tuition Collection */}
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-flectere-slate mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-flectere-slate">
              Tuition Collection
            </span>
            <div className="p-2 rounded-xl bg-flectere-light text-flectere-navy">
              <CreditCard className="w-4 h-4 text-flectere-crimson" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-flectere-navy tracking-tight font-serif">
            82%
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-flectere-crimson mt-2">
            <span>18% outstanding (4.2M MZN)</span>
          </div>
          <p className="text-[11px] text-flectere-slate mt-1">
            M-Pesa reconciliation synced today
          </p>
        </div>
      </div>

      {/* Main Grid: Academic Performance by Grade + Operational Attention Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Academic Performance by Grade (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-flectere-slateLight p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-flectere-slateLight gap-2">
            <div>
              <h3 className="font-serif font-bold text-lg text-flectere-navy">
                Academic Performance by Grade
              </h3>
              <p className="text-xs text-flectere-slate">
                Average assessment scores across secondary cohorts vs 75% institutional threshold
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-flectere-light text-flectere-slate text-[11px] font-semibold border border-flectere-slateLight shrink-0">
              Cambridge & National Standards
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="mt-6 space-y-4">
            {gradePerformance.map((item) => (
              <div key={item.grade} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-flectere-navy font-bold w-18">{item.grade}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === "warning"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-flectere-greenLight text-flectere-green"
                      }`}
                    >
                      {item.delta}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-flectere-slate text-[11px]">
                      Target: {item.target}%
                    </span>
                    <span className="font-mono font-bold text-flectere-navy w-12 text-right">
                      {item.score}%
                    </span>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="relative h-3 w-full bg-flectere-slateLight/60 rounded-full overflow-hidden">
                  {/* Benchmark 75% Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-flectere-slate z-10 opacity-75"
                    style={{ left: "75%" }}
                    title="75% Institutional Benchmark"
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.status === "warning"
                        ? "bg-gradient-to-r from-amber-400 to-amber-600"
                        : "bg-gradient-to-r from-flectere-gold to-flectere-navy"
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-flectere-slateLight flex items-center justify-between text-xs text-flectere-slate">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-flectere-navy" />
              Cohort Score
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-0.5 h-3 bg-flectere-slate" />
              75% Institutional Benchmark
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Below Threshold (&lt;70%)
            </span>
          </div>
        </div>

        {/* Right Column: Operational Attention Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-flectere-slateLight p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-flectere-slateLight">
              <div>
                <h3 className="font-serif font-bold text-lg text-flectere-navy">
                  Operational Attention Queue
                </h3>
                <p className="text-xs text-flectere-slate">
                  Exceptions requiring leadership follow-up this week
                </p>
              </div>
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                {actionItems.filter((i) => i.status !== "Resolved").length}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {actionItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border text-xs transition-all ${
                    item.status === "Resolved"
                      ? "bg-flectere-light/40 border-flectere-slateLight opacity-60"
                      : item.priority === "Urgent"
                      ? "bg-red-50/40 border-red-200"
                      : "bg-flectere-light border-flectere-slateLight"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.priority === "Urgent"
                              ? "bg-red-100 text-red-700"
                              : item.priority === "High"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.priority}
                        </span>
                        <span className="text-[10px] text-flectere-slate font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-flectere-navy text-xs leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-flectere-slate text-[11px] mt-1 leading-normal">
                        {item.notes}
                      </p>
                      <p className="text-flectere-slate text-[10px] mt-1 font-medium">
                        Owner: <strong className="text-flectere-navy">{item.owner}</strong> &bull; Due: {item.deadline}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleActionStatus(item.id)}
                      className={`p-1.5 rounded-lg border text-[11px] font-bold shrink-0 transition-colors flex items-center gap-1 ${
                        item.status === "Resolved"
                          ? "bg-flectere-green text-white border-flectere-green"
                          : item.status === "In Progress"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-white text-flectere-slate border-flectere-slateLight hover:text-flectere-navy"
                      }`}
                      title="Click to cycle status: Open -> In Progress -> Resolved"
                    >
                      {item.status === "Resolved" ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Resolved</span>
                        </>
                      ) : (
                        <span>{item.status}</span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-flectere-slateLight flex items-center justify-between text-xs">
            <span className="text-flectere-slate">Click status button to update items</span>
            <button
              onClick={() => setActiveTab("actions")}
              className="font-bold text-flectere-navy hover:text-flectere-gold flex items-center gap-1"
            >
              Open Full Action Centre <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Leadership Action Centre & Decision Guardrail Principle */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-flectere-slateLight gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-flectere-navy text-white text-[10px] font-bold uppercase tracking-wider">
                Leadership Action Centre
              </span>
              <span className="text-xs text-flectere-slate">&bull; Human-in-the-Loop Governance</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-flectere-navy mt-1">
              Institutional Action Items & Accountability Matrix
            </h3>
          </div>

          {/* Core Design Principle Callout */}
          <div className="p-3 rounded-xl bg-flectere-light border border-flectere-gold/30 text-xs text-flectere-navy max-w-md">
            <p className="font-bold text-flectere-gold text-[11px] uppercase tracking-wider mb-0.5">
              Leadership Design Principle
            </p>
            <p className="text-[11px] text-flectere-slate leading-normal">
              Teacher performance cannot be reduced to student marks or assignment counts. Timeliness, curriculum coverage, and student progress are measured separately, with human review before personnel decisions.
            </p>
          </div>
        </div>

        {/* Action Items Full Matrix */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-flectere-light text-flectere-slate uppercase text-[10px] font-semibold border-b border-flectere-slateLight tracking-wider">
                <th className="py-3 px-4">Action Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Assigned Owner</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-flectere-slateLight/60">
              {actionItems.map((act) => (
                <tr key={act.id} className="hover:bg-flectere-light/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-flectere-navy max-w-xs">
                    {act.title}
                  </td>
                  <td className="py-3 px-4 text-flectere-slate">
                    <span className="px-2 py-0.5 rounded bg-flectere-light border border-flectere-slateLight text-[10px] font-medium">
                      {act.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-flectere-navy font-medium">
                    {act.owner}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        act.priority === "Urgent"
                          ? "bg-red-100 text-red-700"
                          : act.priority === "High"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {act.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-flectere-slate font-mono text-[11px]">
                    {act.deadline}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        act.status === "Resolved"
                          ? "bg-flectere-greenLight text-flectere-green"
                          : act.status === "In Progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {act.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleActionStatus(act.id)}
                      className="px-2.5 py-1 rounded-lg bg-flectere-navy text-white text-[11px] font-semibold hover:bg-flectere-navyLight transition-colors"
                    >
                      Cycle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
