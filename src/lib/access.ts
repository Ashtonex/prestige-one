import type { Prisma, User } from "@prisma/client";

const STAFF_ROLES = ["ADMIN", "DIRECTOR", "TEACHER", "FINANCE"] as const;

export function isStaff(user: User): boolean {
  return (STAFF_ROLES as readonly string[]).includes(user.role);
}

/**
 * Prisma filter for the students a user may see.
 * Staff see their institution; guardians see only linked wards; students see only themselves.
 * Student accounts are matched to their record by email until Student gains a userId link.
 */
export function studentScopeWhere(user: User): Prisma.StudentWhereInput {
  const base: Prisma.StudentWhereInput = { institutionId: user.institutionId };

  if (isStaff(user)) return base;

  if (user.role === "GUARDIAN") {
    return { ...base, guardians: { some: { guardian: { userId: user.id } } } };
  }

  if (user.role === "STUDENT") {
    return { ...base, email: { equals: user.email, mode: "insensitive" } };
  }

  // Unknown roles see nothing
  return { id: "__none__" };
}

/** Prisma filter for the classes a user may take attendance for. Teachers only get their own classes. */
export function attendanceClassScopeWhere(user: User): Prisma.ClassWhereInput {
  const base: Prisma.ClassWhereInput = { institutionId: user.institutionId };
  return user.role === "TEACHER" ? { ...base, teacherId: user.id } : base;
}
