"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { studentCreateSchema, studentUpdateSchema, type StudentCreateInput, type StudentUpdateInput } from "@/lib/validations/student";

export async function createStudentAction(input: StudentCreateInput) {
  const user = await requireAuth(["ADMIN", "DIRECTOR"]);

  // 1. Validate server-side with Zod
  const validation = studentCreateSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: "Validation failed: please verify all form fields.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const data = validation.data;

  try {
    // 2. Check for duplicate admission number
    const existing = await prisma.student.findUnique({
      where: { admissionNumber: data.admissionNumber.toUpperCase().trim() },
    });

    if (existing) {
      return {
        success: false,
        error: `A student with admission number "${data.admissionNumber}" already exists in the institutional registry.`,
      };
    }

    // 3. Find the selected class and academic year
    const classRecord = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { academicYear: true },
    });

    if (!classRecord) {
      return {
        success: false,
        error: "The selected class section does not exist.",
      };
    }

    // 4. Perform atomic transaction: create student, guardian link, enrollment, and audit log
    const createdStudent = await prisma.$transaction(async (tx) => {
      // Find or create Guardian
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

      // Create Student
      const student = await tx.student.create({
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

      // Link Guardian to Student
      await tx.guardianStudent.create({
        data: {
          guardianId: guardian.id,
          studentId: student.id,
          hasCustody: true,
          hasFinancialResponsibility: true,
          isEmergencyContact: true,
        },
      });

      // Create Class Enrollment
      await tx.enrollment.create({
        data: {
          studentId: student.id,
          classId: classRecord.id,
          academicYearId: classRecord.academicYearId,
          status: "ACTIVE",
        },
      });

      // Attributable Audit Log
      await tx.auditLog.create({
        data: {
          institutionId: user.institutionId,
          userId: user.id,
          action: "STUDENT_ENROLLED",
          entityType: "Student",
          entityId: student.id,
          details: `Enrolled student ${student.firstName} ${student.lastName} (${student.admissionNumber}) into ${classRecord.name}`,
        },
      });

      return student;
    });

    // Revalidate affected views
    revalidatePath("/students");
    revalidatePath(`/classes/${classRecord.id}`);
    revalidatePath("/classes");
    revalidatePath("/dashboard");

    return {
      success: true,
      studentId: createdStudent.id,
      admissionNumber: createdStudent.admissionNumber,
    };
  } catch (error: any) {
    console.error("Failed to enroll student:", error);
    return {
      success: false,
      error: error.message || "A database error occurred while creating the student record.",
    };
  }
}

export async function updateStudentAction(studentId: string, input: StudentUpdateInput) {
  const user = await requireAuth(["ADMIN", "DIRECTOR"]);

  const validation = studentUpdateSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: "Validation failed: please check updated values.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const data = validation.data;

  try {
    const existing = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!existing || existing.institutionId !== user.institutionId) {
      return {
        success: false,
        error: "Student record not found or outside institutional authorization scope.",
      };
    }

    const updated = await prisma.$transaction(async (tx) => {
      const student = await tx.student.update({
        where: { id: studentId },
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
          action: "STUDENT_UPDATED",
          entityType: "Student",
          entityId: student.id,
          details: `Updated personal and demographic details for ${student.admissionNumber}`,
        },
      });

      return student;
    });

    revalidatePath(`/students/${studentId}`);
    revalidatePath("/students");
    revalidatePath("/classes");
    revalidatePath("/dashboard");

    return {
      success: true,
      student: updated,
    };
  } catch (error: any) {
    console.error("Failed to update student:", error);
    return {
      success: false,
      error: error.message || "Failed to update record in database.",
    };
  }
}
