import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { AttendanceRegisterGrid } from "@/components/attendance/AttendanceRegisterGrid";
import { CalendarCheck, ChevronRight } from "lucide-react";
import type { AttendanceStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ classId?: string }>;
}) {
  const user = await requireAuth(["TEACHER", "ADMIN", "DIRECTOR"]);
  const { classId } = await searchParams;

  const classes = await prisma.class.findMany({
    where: { institutionId: user.institutionId },
    select: { id: true, name: true, gradeLevel: true },
    orderBy: { name: "asc" },
  });

  const selectedClassId = classId || classes[0]?.id;
  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Load students enrolled in the selected class
  const enrollments = selectedClassId
    ? await prisma.enrollment.findMany({
        where: {
          classId: selectedClassId,
          status: "ACTIVE",
        },
        include: {
          student: {
            include: {
              attendance: {
                where: {
                  classId: selectedClassId,
                  date: today,
                },
              },
            },
          },
        },
        orderBy: {
          student: { lastName: "asc" },
        },
      })
    : [];

  const rosterItems = enrollments.map((enr) => ({
    id: enr.student.id,
    admissionNumber: enr.student.admissionNumber,
    name: `${enr.student.firstName} ${enr.student.lastName}`,
    initialStatus: (enr.student.attendance[0]?.status as AttendanceStatus) || "PRESENT",
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight">
          Daily Attendance Register
        </h1>
        <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
          Mobile-first class registers, attendance analytics, and authorized status tracking
        </p>
      </div>

      {/* Class Section Selector Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-flectere-slateLight shadow-sm flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-flectere-navy px-2 hidden sm:inline">
          Cohort:
        </span>
        {classes.map((c) => {
          const isSelected = c.id === selectedClassId;
          return (
            <Link
              key={c.id}
              href={`/attendance?classId=${c.id}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isSelected
                  ? "bg-flectere-navy text-white shadow-sm"
                  : "bg-flectere-light text-flectere-slate hover:bg-flectere-slateLight/60"
              }`}
            >
              {c.name}
            </Link>
          );
        })}
      </div>

      {/* Interactive Grid */}
      {currentClass && (
        <AttendanceRegisterGrid
          classId={currentClass.id}
          className={currentClass.name}
          students={rosterItems}
        />
      )}
    </div>
  );
}
