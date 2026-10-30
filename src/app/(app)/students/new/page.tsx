import React from "react";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { StudentEnrollmentForm } from "@/components/students/StudentEnrollmentForm";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewStudentPage() {
  const user = await requireAuth(["ADMIN", "DIRECTOR"]);

  const classes = await prisma.class.findMany({
    where: { institutionId: user.institutionId },
    select: { id: true, name: true, gradeLevel: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-flectere-slate mb-1">
          <Link href="/students" className="hover:text-flectere-navy transition-colors">
            Student Management
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-flectere-navy">Institutional Enrolment</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight">
          Enroll New Student
        </h1>
        <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
          Create an authoritative learner master record, attach primary guardians, and assign to a classroom section.
        </p>
      </div>

      <StudentEnrollmentForm classes={classes} />
    </div>
  );
}
