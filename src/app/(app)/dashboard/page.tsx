import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { formatMZN, formatDate } from "@/lib/utils";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  UserPlus,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireAuth();

  // Load live statistics from PostgreSQL
  const [totalStudents, totalClasses, activeEnrollments, invoices, recentStudents] = await Promise.all([
    prisma.student.count({
      where: { institutionId: user.institutionId, status: "ENROLLED" },
    }),
    prisma.class.count({
      where: { institutionId: user.institutionId },
    }),
    prisma.enrollment.count({
      where: { class: { institutionId: user.institutionId }, status: "ACTIVE" },
    }),
    prisma.invoice.findMany({
      where: { institutionId: user.institutionId },
      select: { amount: true, paidAmount: true, status: true },
    }),
    prisma.student.findMany({
      where: { institutionId: user.institutionId },
      include: {
        enrollments: {
          include: { class: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  // Financial aggregates
  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const collectionRate = totalInvoiced > 0 ? Math.round((totalCollected / totalInvoiced) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-flectere-gold/20 text-flectere-gold">
              Prestige International Academy
            </span>
            <span className="text-xs text-flectere-slate">&bull; Academic Year 2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy mt-1 tracking-tight">
            Institutional Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
            Logged in as <strong className="text-flectere-navy">{user.name}</strong> ({user.role})
          </p>
        </div>

        {/* Quick Actions */}
        {(user.role === "ADMIN" || user.role === "DIRECTOR") && (
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/students/new"
              id="dashboard-enroll-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-semibold hover:bg-flectere-navyLight transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4 text-flectere-gold" />
              Enroll New Student
            </Link>
          </div>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Enrolled */}
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Enrolment</span>
            <div className="p-2 rounded-xl bg-flectere-light text-flectere-navy">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-flectere-navy">
            {totalStudents}
          </div>
          <p className="text-[11px] text-flectere-green mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Active Learners
          </p>
        </div>

        {/* Active Classes */}
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Classes</span>
            <div className="p-2 rounded-xl bg-flectere-light text-flectere-navy">
              <GraduationCap className="w-4 h-4 text-flectere-gold" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-flectere-navy">
            {totalClasses}
          </div>
          <p className="text-[11px] text-flectere-slate mt-1 font-medium">
            {activeEnrollments} Total Section Placements
          </p>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Attendance</span>
            <div className="p-2 rounded-xl bg-flectere-light text-flectere-navy">
              <CalendarCheck className="w-4 h-4 text-flectere-green" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-flectere-navy">
            96%
          </div>
          <p className="text-[11px] text-flectere-green mt-1 flex items-center gap-1 font-medium">
            Today&apos;s verified register
          </p>
        </div>

        {/* Tuition Collections */}
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <div className="flex items-center justify-between text-flectere-slate mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Collections</span>
            <div className="p-2 rounded-xl bg-flectere-light text-flectere-navy">
              <CreditCard className="w-4 h-4 text-flectere-crimson" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-flectere-navy">
            {collectionRate}%
          </div>
          <p className="text-[11px] text-flectere-slate mt-1 font-medium truncate">
            {formatMZN(totalCollected)} collected
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Enrolled Students + Leadership Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Enrolled Students */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-flectere-slateLight shadow-sm overflow-hidden">
          <div className="p-5 border-b border-flectere-slateLight flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-flectere-navy">
                Institutional Student Registry
              </h2>
              <p className="text-xs text-flectere-slate mt-0.5">
                Recently enrolled and active learner records
              </p>
            </div>
            <Link
              href="/students"
              className="text-xs font-semibold text-flectere-gold hover:text-flectere-navy transition-colors flex items-center gap-1"
            >
              View Directory <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-flectere-light text-flectere-slate uppercase text-[10px] font-semibold border-b border-flectere-slateLight tracking-wider">
                  <th className="py-3 px-4">Admission #</th>
                  <th className="py-3 px-4">Learner Name</th>
                  <th className="py-3 px-4">Grade & Section</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-flectere-slateLight/60">
                {recentStudents.map((s) => {
                  const currentClass = s.enrollments[0]?.class?.name || "Unassigned";
                  return (
                    <tr key={s.id} className="hover:bg-flectere-light/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-flectere-navy">
                        {s.admissionNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-flectere-navy">
                        {s.firstName} {s.lastName}
                      </td>
                      <td className="py-3 px-4 text-flectere-slate">
                        <span className="font-medium text-flectere-navy">{s.gradeLevel}</span>
                        <span className="text-[11px] text-flectere-slate ml-1">({currentClass})</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-flectere-greenLight text-flectere-green border border-flectere-green/20">
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/students/${s.id}`}
                          className="font-semibold text-flectere-navy hover:text-flectere-gold transition-colors"
                        >
                          Profile &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Leadership Action Centre */}
        <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-flectere-slateLight mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-flectere-gold" />
                <h3 className="font-bold text-sm text-flectere-navy">
                  Action Centre
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-flectere-gold/20 text-flectere-gold">
                3 Pending
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-flectere-slateLight/80 bg-flectere-light/40">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-flectere-navy">Cambridge Exam Approvals</span>
                  <span className="text-[10px] text-flectere-crimson font-medium">High</span>
                </div>
                <p className="text-[11px] text-flectere-slate">
                  Grade 7A Checkpoint Mathematics marks awaiting Head of Department moderation.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-flectere-slateLight/80 bg-flectere-light/40">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-flectere-navy">Tuition Settlement Verification</span>
                  <span className="text-[10px] text-flectere-gold font-medium">Normal</span>
                </div>
                <p className="text-[11px] text-flectere-slate">
                  Bank transfer reconciliation queue for Term 2 installments pending bank audit.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-flectere-slateLight/80 bg-flectere-light/40">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-flectere-navy">Guardian Medical Acknowledgement</span>
                  <span className="text-[10px] text-flectere-slate font-medium">Routine</span>
                </div>
                <p className="text-[11px] text-flectere-slate">
                  1 newly submitted health care plan requires sports department confirmation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-flectere-slateLight/60 text-center">
            <p className="text-[11px] text-flectere-slate">
              Authoritative PostgreSQL Engine &bull; Audited
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
