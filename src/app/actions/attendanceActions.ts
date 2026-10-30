"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import type { AttendanceStatus } from "@prisma/client";

interface AttendanceEntry {
  studentId: string;
  status: AttendanceStatus;
  remarks?: string;
}

export async function saveAttendanceAction(classId: string, dateStr: string, records: AttendanceEntry[]) {
  const user = await requireAuth(["TEACHER", "ADMIN", "DIRECTOR"]);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  try {
    await prisma.$transaction(async (tx) => {
      for (const rec of records) {
        await tx.attendanceRecord.upsert({
          where: {
            classId_studentId_date: {
              classId,
              studentId: rec.studentId,
              date,
            },
          },
          update: {
            status: rec.status,
            remarks: rec.remarks || null,
            takenById: user.id,
          },
          create: {
            classId,
            studentId: rec.studentId,
            date,
            status: rec.status,
            remarks: rec.remarks || null,
            takenById: user.id,
          },
        });
      }

      await tx.auditLog.create({
        data: {
          institutionId: user.institutionId,
          userId: user.id,
          action: "ATTENDANCE_REGISTERED",
          entityType: "Class",
          entityId: classId,
          details: `Recorded register for ${records.length} learners on ${date.toISOString().split("T")[0]}`,
        },
      });
    });

    revalidatePath("/attendance");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to save attendance register:", error);
    return { success: false, error: error.message || "Failed to record attendance in database." };
  }
}
