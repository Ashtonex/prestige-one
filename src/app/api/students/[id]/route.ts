import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { studentUpdateSchema } from "@/lib/validations/student";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: { class: true, academicYear: true },
      },
      guardians: {
        include: { guardian: true },
      },
      attendance: {
        orderBy: { date: "desc" },
        take: 10,
      },
      assessmentResults: {
        include: { assessment: true },
      },
      invoices: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!student || student.institutionId !== user.institutionId) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  // Guardian relationship boundary check
  if (user.role === "GUARDIAN") {
    const isLinked = student.guardians.some((g) => g.guardian.userId === user.id);
    if (!isLinked) {
      return NextResponse.json({ error: "Access denied to unrelated learner" }, { status: 403 });
    }
  }

  return NextResponse.json({ student });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "DIRECTOR")) {
    return NextResponse.json({ error: "Forbidden: administrative privileges required" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const json = await request.json();
    const result = studentUpdateSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    const existing = await prisma.student.findUnique({
      where: { id },
    });

    if (!existing || existing.institutionId !== user.institutionId) {
      return NextResponse.json({ error: "Student record not found" }, { status: 404 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const student = await tx.student.update({
        where: { id },
        data: {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          dateOfBirth: new Date(data.dateOfBirth),
          gender: data.gender,
          gradeLevel: data.gradeLevel,
          status: data.status,
          email: data.email?.trim() || null,
          phone: data.phone?.trim() || null,
          address: data.address?.trim() || null,
          medicalNotes: data.medicalNotes?.trim() || null,
        },
      });

      await tx.auditLog.create({
        data: {
          institutionId: user.institutionId,
          userId: user.id,
          action: "STUDENT_UPDATED_API",
          entityType: "Student",
          entityId: student.id,
          details: `Updated personal and demographic details for ${student.admissionNumber}`,
        },
      });

      return student;
    });

    return NextResponse.json({ success: true, student: updated });
  } catch (error: any) {
    console.error("API Update Student Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update record" },
      { status: 500 }
    );
  }
}
