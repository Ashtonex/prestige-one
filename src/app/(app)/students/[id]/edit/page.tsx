import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { StudentEditForm } from "@/components/students/StudentEditForm";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth(["ADMIN", "DIRECTOR"]);
  const { id } = await params;

  const student = await prisma.student.findUnique({
    where: { id },
  });

  if (!student || student.institutionId !== user.institutionId) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-flectere-slate mb-1">
          <Link href="/students" className="hover:text-flectere-navy transition-colors">
            Student Management
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/students/${student.id}`} className="hover:text-flectere-navy transition-colors font-mono">
            {student.admissionNumber}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-flectere-navy">Edit Record</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight">
          Edit Student Profile
        </h1>
        <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
          Modifying authoritative data for {student.firstName} {student.lastName} ({student.admissionNumber})
        </p>
      </div>

      <StudentEditForm student={student} />
    </div>
  );
}
