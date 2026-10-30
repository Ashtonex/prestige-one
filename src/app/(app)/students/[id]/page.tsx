import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { formatDate, formatMZN } from "@/lib/utils";
import {
  User,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Edit,
  ArrowLeft,
  ChevronRight,
  CreditCard,
  HeartPulse,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth();
  const { id } = await params;

  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: {
          class: {
            include: { teacher: true },
          },
          academicYear: true,
        },
        orderBy: { enrolledAt: "desc" },
      },
      guardians: {
        include: { guardian: true },
      },
      attendance: {
        orderBy: { date: "desc" },
        take: 5,
      },
      invoices: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!student || student.institutionId !== user.institutionId) {
    notFound();
  }

  // Guardian relationship boundary check
  if (user.role === "GUARDIAN") {
    const isLinked = student.guardians.some((g) => g.guardian.userId === user.id);
    if (!isLinked) {
      notFound();
    }
  }

  const activeEnrollment = student.enrollments.find((e) => e.status === "ACTIVE") || student.enrollments[0];
  const primaryGuardian = student.guardians[0]?.guardian;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumbs & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-flectere-slate mb-1">
            <Link href="/students" className="hover:text-flectere-navy transition-colors">
              Student Management
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-flectere-navy font-mono">
              {student.admissionNumber}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight" id="student-name-header">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-xs text-flectere-slate mt-0.5">
            Institutional Master Record &bull; Enrolled in {student.gradeLevel}
          </p>
        </div>

        {(user.role === "ADMIN" || user.role === "DIRECTOR") && (
          <Link
            href={`/students/${student.id}/edit`}
            id="edit-student-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-semibold hover:bg-flectere-navyLight transition-colors shadow-sm self-start sm:self-auto"
          >
            <Edit className="w-4 h-4 text-flectere-gold" />
            Edit Profile Record
          </Link>
        )}
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-flectere-navy text-flectere-gold font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md">
            {student.firstName[0]}
            {student.lastName[0]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-flectere-navy bg-flectere-light px-2.5 py-1 rounded-lg border border-flectere-slateLight">
                {student.admissionNumber}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-flectere-greenLight text-flectere-green border border-flectere-green/20">
                {student.status}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-flectere-gold/15 text-flectere-navy">
                {student.gradeLevel}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-flectere-slate flex-wrap">
              <span>Born: {formatDate(student.dateOfBirth)}</span>
              <span>&bull;</span>
              <span>Gender: {student.gender}</span>
              <span>&bull;</span>
              <span>Enrolled: {formatDate(student.createdAt)}</span>
            </div>
          </div>
        </div>

        {activeEnrollment && (
          <div className="p-3.5 rounded-xl bg-flectere-light border border-flectere-slateLight/80 text-right md:text-right shrink-0">
            <p className="text-[10px] font-bold text-flectere-slate uppercase tracking-wider">
              Assigned Class Section
            </p>
            <Link
              href={`/classes/${activeEnrollment.classId}`}
              className="text-base font-extrabold text-flectere-navy hover:text-flectere-gold transition-colors inline-block mt-0.5"
              id="student-assigned-class-link"
            >
              {activeEnrollment.class.name} &rarr;
            </Link>
            <p className="text-[11px] text-flectere-slate mt-0.5">
              Teacher: {activeEnrollment.class.teacher?.name || "Senior Staff"}
            </p>
          </div>
        )}
      </div>

      {/* Details Grid: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Col: Demographic & Medical Record */}
        <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm p-6 space-y-4">
          <div className="border-b border-flectere-slateLight pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-flectere-navy uppercase tracking-wider">
              Demographic & Contact Info
            </h2>
            <User className="w-4 h-4 text-flectere-gold" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-flectere-slateLight/40">
              <span className="text-flectere-slate">Student Email</span>
              <span className="font-semibold text-flectere-navy">
                {student.email || "None recorded"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-flectere-slateLight/40">
              <span className="text-flectere-slate">Phone Number</span>
              <span className="font-semibold text-flectere-navy">
                {student.phone || "None recorded"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-flectere-slateLight/40">
              <span className="text-flectere-slate">Residential Address</span>
              <span className="font-semibold text-flectere-navy truncate max-w-[200px]" id="student-profile-address">
                {student.address || "Maputo, Mozambique"}
              </span>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-flectere-navy mb-1">
                <HeartPulse className="w-3.5 h-3.5 text-flectere-crimson" />
                <span>Safeguarding & Health Notes</span>
              </div>
              <p className="text-xs text-flectere-slate bg-flectere-light p-3 rounded-xl border border-flectere-slateLight/60 leading-relaxed">
                {student.medicalNotes || "No medical conditions or special educational provisions recorded."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Guardian & Custodial Links */}
        <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm p-6 space-y-4">
          <div className="border-b border-flectere-slateLight pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-flectere-navy uppercase tracking-wider">
              Guardian & Family Record
            </h2>
            <ShieldCheck className="w-4 h-4 text-flectere-green" />
          </div>

          {primaryGuardian ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-flectere-slateLight/40">
                <span className="text-flectere-slate">Full Name</span>
                <span className="font-bold text-flectere-navy" id="guardian-name-val">
                  {primaryGuardian.fullName}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-flectere-slateLight/40">
                <span className="text-flectere-slate">Relationship</span>
                <span className="font-semibold text-flectere-navy">
                  {primaryGuardian.relationship}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-flectere-slateLight/40">
                <span className="text-flectere-slate">Contact Phone</span>
                <span className="font-semibold text-flectere-navy font-mono" id="guardian-phone-val">
                  {primaryGuardian.phone}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-flectere-slateLight/40">
                <span className="text-flectere-slate">Email Address</span>
                <span className="font-semibold text-flectere-navy">
                  {primaryGuardian.email}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-flectere-greenLight/60 border border-flectere-green/20 text-[11px] text-flectere-green font-medium">
                Verified Custody & Financial Responsibility Anchor
              </div>
            </div>
          ) : (
            <p className="text-xs text-flectere-slate italic">
              No primary guardian linked to this student record.
            </p>
          )}
        </div>
      </div>

      {/* Return Button */}
      <div className="pt-2">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-flectere-slateLight text-flectere-navy text-xs font-semibold hover:bg-flectere-slateLight/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Student Directory
        </Link>
      </div>
    </div>
  );
}
