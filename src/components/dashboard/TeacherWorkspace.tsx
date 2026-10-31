"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  BookOpen,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  ChevronRight,
  Send,
  Plus,
  Play,
  Award,
  Layers,
  GraduationCap,
} from "lucide-react";

export function TeacherWorkspace() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<string>("Grade 8A Mathematics");

  // AI Assistant State
  const [aiPromptType, setAiPromptType] = useState<
    "lesson-plan" | "practice-questions" | "differentiation" | "gap-summary"
  >("lesson-plan");
  const [aiTopic, setAiTopic] = useState("Quadratic Factorization & Real-World Modeling");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const generateAiContent = () => {
    setAiGenerating(true);
    setAiResult(null);

    setTimeout(() => {
      setAiGenerating(false);
      if (aiPromptType === "lesson-plan") {
        setAiResult(
          `### Lesson Plan: ${aiTopic}\n**Target:** Cambridge Lower Secondary (Stage 8)\n**Duration:** 50 Minutes\n\n1. **Warm-up (8 min):** Rapid-fire mental expansion of binomial pairs (x+3)(x+5).\n2. **Direct Instruction (15 min):** The geometric area model for quadratic expressions; identifying common algebraic factors.\n3. **Guided Practice (15 min):** Differentiated tier 1 (factoring monic quadratics) and tier 2 (word problem application in physics projectile motion).\n4. **Formative Plenary (12 min):** Exit ticket: Solve x² - 7x + 12 = 0 with one-sentence mathematical justification.`
        );
      } else if (aiPromptType === "practice-questions") {
        setAiResult(
          `### Cambridge Checkpoint Style Practice Set: ${aiTopic}\n\n1. Factorise completely: 3x² + 12x - 36. [2 marks]\n2. A rectangular garden has an area of (x² + 9x + 20) m². If the length is (x + 5) m, find the expression for the width. [2 marks]\n3. Extended Challenge: Explain why x² + 4x + 7 cannot be factored using real integers. [3 marks]`
        );
      } else if (aiPromptType === "differentiation") {
        setAiResult(
          `### Differentiated Scaffolding Plan: ${aiTopic}\n\n* **Tier 1 (Foundation/EAL):** Use visual algebra tiles and color-coded factor trees before symbolic manipulation.\n* **Tier 2 (Core Mastery):** Standard algebraic decomposition and negative coefficient handling.\n* **Tier 3 (Extension/Olympiad):** Factorization of non-monic quadratics ax² + bx + c and introduction to completing the square.`
        );
      } else {
        setAiResult(
          `### Learning Gap Synthesis & Class Interventions:\n* **Identified Weakness:** 6 students struggled with negative product rules (e.g. factoring when c is negative).\n* **Recommended Next Step:** Schedule a 10-minute peer-assisted review station during tomorrow's Period 2.`
        );
      }
    }, 900);
  };

  // Mock gradebook marks
  const [grades, setGrades] = useState([
    { id: "1", name: "Ana Mondlane", score: 91, comment: "Consistently precise work.", support: false },
    { id: "2", name: "David Machel", score: 68, comment: "Needs extra practice on signs.", support: true },
    { id: "3", name: "Fatima Al-Noor", score: 85, comment: "Strong conceptual understanding.", support: false },
    { id: "4", name: "Lucas Tembe", score: 74, comment: "Improving step-by-step layout.", support: false },
  ]);

  return (
    <div className="space-y-6">
      {/* Teacher Workspace Header */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-flectere-gold/20 text-flectere-gold">
              Teacher&apos;s Digital Workspace
            </span>
            <span className="text-xs text-flectere-slate">&bull; Academic Year 2026 Term 3</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy mt-1 tracking-tight font-serif">
            Prof. Manuel Cossa &bull; Mathematics Directorate
          </h1>
          <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
            4 Scheduled Classes Today &bull; 2 Pending Markbooks &bull; All Registers Cleared
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/attendance"
            className="px-4 py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-semibold hover:bg-flectere-navyLight transition-colors flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-flectere-gold" />
            <span>Open Quick Register</span>
          </Link>
        </div>
      </div>

      {/* Today's Schedule Ribbon */}
      <div className="bg-[#0b1730] text-white rounded-2xl p-6 shadow-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-flectere-gold" />
            <h3 className="font-serif font-bold text-base text-white">
              Today&apos;s Timetable &bull; Thursday
            </h3>
          </div>
          <span className="text-xs text-slate-400">Current Time: 09:15 AM</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { period: "Period 1 (08:00 - 08:50)", class: "Grade 8A Math", room: "Room 204", status: "Completed", isCurrent: false },
            { period: "Period 2 (09:00 - 09:50)", class: "Grade 9B Algebra", room: "STEM Lab 1", status: "In Progress", isCurrent: true },
            { period: "Period 4 (11:20 - 12:10)", class: "Grade 8B Math", room: "Room 204", status: "Upcoming", isCurrent: false },
            { period: "Period 6 (14:15 - 15:05)", class: "Grade 11 Pure Math", room: "Seminar 3", status: "Upcoming", isCurrent: false },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs transition-all ${
                item.isCurrent
                  ? "bg-flectere-gold text-[#081226] border-flectere-gold font-bold shadow-md"
                  : "bg-white/5 border-white/10 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                  {item.period}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono">
                  {item.status}
                </span>
              </div>
              <p className="font-bold text-sm text-white">{item.class}</p>
              <p className="text-[11px] opacity-75 mt-0.5">{item.room}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Step Classroom Workflow Stepper (Core Proposition) */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 sm:p-8 shadow-sm">
        <div className="pb-4 border-b border-flectere-slateLight mb-6">
          <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
            Instructional Workflow
          </span>
          <h3 className="font-serif font-bold text-xl text-flectere-navy mt-0.5">
            Classroom Delivery & Assessment Pipeline
          </h3>
          <p className="text-xs text-flectere-slate">
            Select a phase in the educational lifecycle to execute lesson operations
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
            {[
              { num: 1, title: "1. Plan Lesson" },
              { num: 2, title: "2. Deliver & Register" },
              { num: 3, title: "3. Assign Work" },
              { num: 4, title: "4. Grade & Assess" },
              { num: 5, title: "5. Publish to Families" },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                  activeStep === step.num
                    ? "bg-flectere-navy text-white border-flectere-navy shadow-sm"
                    : "bg-flectere-light border-flectere-slateLight text-flectere-slate hover:text-flectere-navy"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Workflow Tab Display */}
        {activeStep === 1 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <h4 className="font-bold text-base text-flectere-navy font-serif">
              Step 1: Lesson Design & Curriculum Mapping
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-flectere-navy font-semibold mb-1">Select Active Class:</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-flectere-slateLight bg-flectere-light text-flectere-navy"
                >
                  <option>Grade 8A Mathematics</option>
                  <option>Grade 9B Advanced Algebra</option>
                  <option>Grade 11 Pure Mathematics</option>
                </select>
              </div>
              <div>
                <label className="block text-flectere-navy font-semibold mb-1">Curriculum Unit:</label>
                <input
                  type="text"
                  defaultValue="Unit 4: Quadratic Expressions & Algebraic Reasoning"
                  className="w-full p-2.5 rounded-xl border border-flectere-slateLight bg-flectere-light text-flectere-navy"
                />
              </div>
            </div>
            <div>
              <label className="block text-flectere-navy font-semibold mb-1">Lesson Objectives:</label>
              <textarea
                rows={2}
                defaultValue="Learners will factorise quadratics of the form x^2 + bx + c and apply solutions to rectangular area problems."
                className="w-full p-2.5 rounded-xl border border-flectere-slateLight bg-flectere-light text-flectere-navy"
              />
            </div>
            <div className="p-3 rounded-xl bg-flectere-greenLight border border-flectere-green/30 text-flectere-green">
              ✓ Lesson plan harmonized with Cambridge International Stage 8 Checkpoint syllabus.
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <h4 className="font-bold text-base text-flectere-navy font-serif">
              Step 2: Classroom Delivery & Attendance Verification
            </h4>
            <p className="text-flectere-slate">
              Record lesson coverage and confirm student attendance. Registered records synchronize instantly with guardian mobile notifications.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/attendance"
                className="px-4 py-2.5 rounded-xl bg-flectere-navy text-white font-bold hover:bg-flectere-navyLight"
              >
                Open Full Touch Register
              </Link>
              <button
                onClick={() => alert("Class syllabus coverage marked as completed for today.")}
                className="px-4 py-2.5 rounded-xl bg-flectere-light border border-flectere-slateLight text-flectere-navy font-semibold hover:bg-white"
              >
                Log Lesson Coverage (50 min completed)
              </button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <h4 className="font-bold text-base text-flectere-navy font-serif">
              Step 3: Assign Work & Practical Tasks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-flectere-navy font-semibold mb-1">Assignment Title:</label>
                <input
                  type="text"
                  defaultValue="Problem Set 4.2: Factoring Monic Quadratics"
                  className="w-full p-2.5 rounded-xl border border-flectere-slateLight bg-flectere-light text-flectere-navy"
                />
              </div>
              <div>
                <label className="block text-flectere-navy font-semibold mb-1">Due Date & Time:</label>
                <input
                  type="text"
                  defaultValue="Tuesday 04 Nov 2026, 08:00 AM"
                  className="w-full p-2.5 rounded-xl border border-flectere-slateLight bg-flectere-light text-flectere-navy"
                />
              </div>
            </div>
            <button
              onClick={() => alert("Assignment published to Student & Parent portals.")}
              className="px-5 py-2.5 rounded-xl bg-flectere-navy text-white font-bold"
            >
              Publish Assignment to {selectedClass}
            </button>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <h4 className="font-bold text-base text-flectere-navy font-serif">
              Step 4: Assess, Bulk Mark & Flag Support Needs
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-flectere-light text-flectere-slate text-[10px] uppercase font-semibold border-b border-flectere-slateLight">
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Mark (/100)</th>
                    <th className="py-2.5 px-3">Qualitative Feedback</th>
                    <th className="py-2.5 px-3">Academic Support Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-flectere-slateLight">
                  {grades.map((g) => (
                    <tr key={g.id}>
                      <td className="py-2.5 px-3 font-bold text-flectere-navy">{g.name}</td>
                      <td className="py-2.5 px-3">
                        <input
                          type="number"
                          defaultValue={g.score}
                          className="w-16 p-1 rounded border border-flectere-slateLight font-bold text-center"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-flectere-slate">{g.comment}</td>
                      <td className="py-2.5 px-3">
                        {g.support ? (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">
                            Needs Numeracy Clinic
                          </span>
                        ) : (
                          <span className="text-flectere-green text-[10px] font-semibold">
                            On Track
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <h4 className="font-bold text-base text-flectere-navy font-serif">
              Step 5: Official Markbook Release & Guardian Transparency
            </h4>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 leading-relaxed">
              <strong>Approval Safeguard Policy:</strong> Marks entered by teachers are audited by the Department Head before final publication to student and guardian workspaces.
            </div>
            <button
              onClick={() => alert("Markbook submitted to Directorate for validation and family portal release.")}
              className="px-6 py-2.5 rounded-xl bg-flectere-gold text-[#081226] font-bold text-xs"
            >
              Submit Markbook for Directorate Approval
            </button>
          </div>
        )}
      </div>

      {/* AI Teaching Assistant (Safeguarded & Privacy-Preserving) */}
      <div className="bg-gradient-to-br from-[#0c1833] to-[#081226] text-white rounded-2xl p-6 sm:p-8 border border-flectere-gold/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 gap-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-flectere-gold/20 text-flectere-gold flex items-center justify-center border border-flectere-gold/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Prestige AI Teaching Co-Pilot
              </h3>
              <p className="text-xs text-slate-300">
                Teacher-controlled pedagogical drafting with zero external transmission of student PII
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-mono text-flectere-gold border border-white/20 self-start md:self-auto">
            Safeguarded AI v2.4
          </span>
        </div>

        {/* AI Prompt Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
          {[
            { id: "lesson-plan", label: "Draft Lesson Plan" },
            { id: "practice-questions", label: "Generate Practice Questions" },
            { id: "differentiation", label: "Suggest Tiered Scaffolding" },
            { id: "gap-summary", label: "Synthesize Learning Gaps" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setAiPromptType(item.id as any)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                aiPromptType === item.id
                  ? "bg-flectere-gold text-[#081226] border-flectere-gold"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            placeholder="Enter curriculum topic or mathematical concept..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-flectere-gold"
          />
          <button
            onClick={generateAiContent}
            disabled={aiGenerating}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] text-[#081226] font-bold text-xs uppercase tracking-wider shrink-0 transition-all hover:opacity-90 disabled:opacity-50"
          >
            {aiGenerating ? "Generating..." : "Generate Resource"}
          </button>
        </div>

        {/* AI Output Card */}
        {aiResult && (
          <div className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/15 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap animate-in fade-in">
            {aiResult}
          </div>
        )}
      </div>
    </div>
  );
}
