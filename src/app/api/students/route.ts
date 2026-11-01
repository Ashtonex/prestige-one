import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { studentScopeWhere } from "@/lib/access";
import { studentCreateSchema } from "@/lib/validations/student";
import type { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim();
  const gradeLevel = searchParams.get("gradeLevel");

  const where: Prisma.StudentWhereInput = studentScopeWhere(user);

  if (gradeLevel && gradeLevel !== "ALL") {
    where.gradeLevel = gradeLevel;
  }

  if (search) {
    // Safe alongside the scope: studentScopeWhere never sets OR
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

  return NextResponse.json({ students });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "DIRECTOR")) {
    return NextResponse.json({ error: "Forbidden: administrative privileges required" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const result = studentCreateSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check duplicate admission number
    const existing = await prisma.student.findUnique({
      where: { admissionNumber: data.admissionNumber.toUpperCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Admission number ${data.admissionNumber} is already registered.` },
        { status: 409 }
      );
    }

    // Class check
    const classRecord = await prisma.class.findFirst({
      where: { id: data.classId, institutionId: user.institutionId },
    });

    if (!classRecord) {
      return NextResponse.json(
        { error: "Selected class section not found." },
        { status: 404 }
      );
    }

    const student = await prisma.$transaction(async (tx) => {
      let guardian = await tx.guardian.findFirst({
        where: {
          institutionId: user.institutionId,
          email: data.guardianEmail.toLowerCase().trim(),
        },
      });

      if (!guardian) {
        guardian = await tx.guardian.create({
          data: {
            institutionId: user.institutionId,
            fullName: data.guardianFullName.trim(),
            relationship: data.guardianRelationship.trim(),
            email: data.guardianEmail.toLowerCase().trim(),
            phone: data.guardianPhone.trim(),
            address: data.address?.trim() || null,
          },
        });
      }

      const created = await tx.student.create({
        data: {
          institutionId: user.institutionId,
          admissionNumber: data.admissionNumber.toUpperCase().trim(),
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          dateOfBirth: new Date(data.dateOfBirth),
          gender: data.gender,
          gradeLevel: data.gradeLevel,
          status: "ENROLLED",
          email: data.email?.trim() || null,
          phone: data.phone?.trim() || null,
          address: data.address?.trim() || null,
        },
      });

      await tx.guardianStudent.create({
        data: {
          guardianId: guardian.id,
          studentId: created.id,
        },
      });

      await tx.enrollment.create({
        data: {
          studentId: created.id,
          classId: classRecord.id,
          academicYearId: classRecord.academicYearId,
          status: "ACTIVE",
        },
      });

      await tx.auditLog.create({
        data: {
          institutionId: user.institutionId,
          userId: user.id,
          action: "STUDENT_ENROLLED_API",
          entityType: "Student",
          entityId: created.id,
          details: `Enrolled via API: ${created.admissionNumber}`,
        },
      });

      return created;
    });

    return NextResponse.json({ success: true, student }, { status: 201 });
  } catch (error: any) {
    console.error("API Create Student Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
