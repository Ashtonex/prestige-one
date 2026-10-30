import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { GraduationCap, Users, ArrowRight, UserCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ClassesPage() {
  const user = await requireAuth(["ADMIN", "DIRECTOR", "TEACHER"]);

  const classes = await prisma.class.findMany({
    where: { institutionId: user.institutionId },
    include: {
      teacher: true,
      enrollments: {
        where: { status: "ACTIVE" },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight">
          Class Sections & Cohorts
        </h1>
        <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
          Curriculum cohorts, homeroom sections, and active teacher assignments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm p-5 hover:border-flectere-gold transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-flectere-gold/15 text-flectere-navy uppercase tracking-wider">
                  {cls.gradeLevel} &bull; Stream {cls.stream || "General"}
                </span>
                <span className="text-xs text-flectere-slate font-medium">
                  {cls.room || "Room 101"}
                </span>
              </div>

              <h2 className="text-lg font-bold text-flectere-navy group-hover:text-flectere-gold transition-colors">
                {cls.name}
              </h2>

              <p className="text-xs text-flectere-slate mt-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-flectere-gold shrink-0" />
                <span>Instructor: {cls.teacher?.name || "Unassigned"}</span>
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-flectere-slateLight/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-flectere-navy font-semibold">
                <Users className="w-4 h-4 text-flectere-slate" />
                <span>{cls.enrollments.length} Enrolled</span>
              </div>

              <Link
                href={`/classes/${cls.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-flectere-navy group-hover:text-flectere-gold transition-colors"
                id={`view-class-${cls.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                View Roster <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
