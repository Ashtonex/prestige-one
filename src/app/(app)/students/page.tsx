import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { Users, UserPlus, Search, Filter, ArrowRight, ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; gradeLevel?: string }>;
}) {
  const user = await requireAuth(["ADMIN", "DIRECTOR", "TEACHER"]);
  const { search, gradeLevel } = await searchParams;

  const where: any = {
    institutionId: user.institutionId,
  };

  if (gradeLevel && gradeLevel !== "ALL") {
    where.gradeLevel = gradeLevel;
  }

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { admissionNumber: { contains: search, mode: "insensitive" } },
    ];
  }

  const students = await prisma.student.findMany({
    where,
    include: {
      enrollments: {
        where: { status: "ACTIVE" },
        include: { class: true },
      },
      guardians: {
        include: { guardian: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight">
            Student Management & Directory
          </h1>
          <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
            Authoritative master records for Prestige International Academy ({students.length} Total Enrolled)
          </p>
        </div>

        {(user.role === "ADMIN" || user.role === "DIRECTOR") && (
          <Link
            href="/students/new"
            id="enroll-student-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-semibold hover:bg-flectere-navyLight transition-colors shadow-sm self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4 text-flectere-gold" />
            Enroll New Student
          </Link>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-flectere-slateLight shadow-sm flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <form method="GET" className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-flectere-slate">
            <Search className="h-4 w-4" />
          </div>
          <input
            name="search"
            type="text"
            defaultValue={search || ""}
            placeholder="Search by student name or admission number..."
            className="block w-full pl-9 pr-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-flectere-gold focus:border-transparent text-flectere-navy placeholder:text-flectere-slate/50"
          />
        </form>

        {/* Grade Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-flectere-slate font-medium hidden sm:inline">Grade:</span>
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["ALL", "Grade 7", "Grade 8", "Grade 9", "Grade 10"].map((g) => {
              const isSelected = (!gradeLevel && g === "ALL") || gradeLevel === g;
              return (
                <Link
                  key={g}
                  href={`/students?${new URLSearchParams({
                    ...(search ? { search } : {}),
                    ...(g !== "ALL" ? { gradeLevel: g } : {}),
                  }).toString()}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? "bg-flectere-navy text-white font-semibold"
                      : "bg-flectere-light text-flectere-slate hover:bg-flectere-slateLight/60"
                  }`}
                >
                  {g}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Directory Table / Cards */}
      {students.length === 0 ? (
        <EmptyState
          title="No student records match your query"
          description="Try broadening your search term or filter parameters, or enroll a new student to create their authoritative record."
          actionHref="/students/new"
          actionLabel="Enroll New Student"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs" id="students-table">
              <thead>
                <tr className="bg-flectere-light text-flectere-slate uppercase text-[10px] font-semibold border-b border-flectere-slateLight tracking-wider">
                  <th className="py-3 px-4">Admission #</th>
                  <th className="py-3 px-4">Learner Name</th>
                  <th className="py-3 px-4">Grade & Section</th>
                  <th className="py-3 px-4">Primary Guardian</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-flectere-slateLight/60">
                {students.map((student) => {
                  const currentClass = student.enrollments[0]?.class?.name || "Unassigned";
                  const primaryGuardian = student.guardians[0]?.guardian;

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-flectere-light/50 transition-colors student-row"
                      data-student-id={student.id}
                      data-admission={student.admissionNumber}
                    >
                      <td className="py-3.5 px-4 font-mono font-semibold text-flectere-navy">
                        {student.admissionNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/students/${student.id}`}
                          className="font-bold text-flectere-navy hover:text-flectere-gold transition-colors block text-sm"
                        >
                          {student.firstName} {student.lastName}
                        </Link>
                        <span className="text-[11px] text-flectere-slate">
                          DOB: {formatDate(student.dateOfBirth)} &bull; {student.gender}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-flectere-navy block">{student.gradeLevel}</span>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-flectere-gold/15 text-flectere-navy mt-0.5">
                          {currentClass}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-flectere-slate">
                        {primaryGuardian ? (
                          <div>
                            <p className="font-medium text-flectere-navy">{primaryGuardian.fullName}</p>
                            <p className="text-[10px] text-flectere-slate">{primaryGuardian.phone}</p>
                          </div>
                        ) : (
                          <span className="text-flectere-slate/50 italic">None recorded</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-flectere-greenLight text-flectere-green border border-flectere-green/20">
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/students/${student.id}`}
                          className="inline-flex items-center gap-1 font-semibold text-xs text-flectere-navy hover:text-flectere-gold transition-colors py-1 px-2.5 rounded-lg border border-flectere-slateLight hover:border-flectere-gold"
                        >
                          View Record &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
