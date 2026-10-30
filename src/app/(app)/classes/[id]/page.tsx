import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { GraduationCap, Users, ArrowLeft, ChevronRight, UserCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ClassRosterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth(["ADMIN", "DIRECTOR", "TEACHER"]);
  const { id } = await params;

  const classRecord = await prisma.class.findUnique({
    where: { id },
    include: {
      teacher: true,
      academicYear: true,
      enrollments: {
        where: { status: "ACTIVE" },
        include: {
          student: true,
        },
        orderBy: {
          student: { lastName: "asc" },
        },
      },
    },
  });

  if (!classRecord || classRecord.institutionId !== user.institutionId) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-flectere-slate mb-1">
          <Link href="/classes" className="hover:text-flectere-navy transition-colors">
            Classes
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-flectere-navy">{classRecord.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight" id="class-roster-title">
              {classRecord.name} Cohort Roster
            </h1>
            <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
              Grade: {classRecord.gradeLevel} &bull; Room: {classRecord.room || "Room 101"} &bull; Lead Instructor:{" "}
              <strong className="text-flectere-navy">{classRecord.teacher?.name || "Assigned Faculty"}</strong>
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-flectere-slateLight shadow-sm self-start sm:self-auto flex items-center gap-2">
            <Users className="w-4 h-4 text-flectere-gold" />
            <span className="text-xs font-bold text-flectere-navy" id="roster-count">
              {classRecord.enrollments.length} Enrolled Learners
            </span>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm overflow-hidden">
        <div className="p-4 border-b border-flectere-slateLight bg-flectere-light/40 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-flectere-navy">
            Authoritative Class Roster ({classRecord.enrollments.length} Students)
          </h2>
          <span className="text-[11px] text-flectere-slate font-medium">
            Synchronized with PostgreSQL Master Record
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs" id="class-roster-table">
            <thead>
              <tr className="bg-flectere-light text-flectere-slate uppercase text-[10px] font-semibold border-b border-flectere-slateLight tracking-wider">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Admission #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Date of Birth</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-flectere-slateLight/60">
              {classRecord.enrollments.map((enr, idx) => (
                <tr
                  key={enr.id}
                  className="hover:bg-flectere-light/50 transition-colors roster-row"
                  data-admission={enr.student.admissionNumber}
                  data-student-id={enr.student.id}
                >
                  <td className="py-3 px-4 text-flectere-slate font-mono text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-flectere-navy">
                    {enr.student.admissionNumber}
                  </td>
                  <td className="py-3 px-4 font-bold text-flectere-navy student-name-cell">
                    <Link
                      href={`/students/${enr.student.id}`}
                      className="hover:text-flectere-gold transition-colors"
                    >
                      {enr.student.firstName} {enr.student.lastName}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-flectere-slate">{enr.student.gender}</td>
                  <td className="py-3 px-4 text-flectere-slate">{formatDate(enr.student.dateOfBirth)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-flectere-greenLight text-flectere-green border border-flectere-green/20">
                      {enr.student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/students/${enr.student.id}`}
                      className="font-semibold text-xs text-flectere-navy hover:text-flectere-gold transition-colors"
                    >
                      Profile &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/classes"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-flectere-slateLight text-flectere-navy text-xs font-semibold hover:bg-flectere-slateLight/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Classes
        </Link>
      </div>
    </div>
  );
}
