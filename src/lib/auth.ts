import { cookies } from "next/headers";
import { prisma } from "./prisma";
import type { Role, User } from "@prisma/client";
import { redirect } from "next/navigation";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "prestige_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error("Error reading current user session:", error);
    return null;
  }
}

export async function requireAuth(allowedRoles?: Role[]): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If user's role is not authorized for this view, redirect to dashboard or their designated portal
    redirect("/dashboard");
  }

  return user;
}

export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      await prisma.session.deleteMany({
        where: { token },
      });
      cookieStore.delete(SESSION_COOKIE_NAME);
    }
  } catch (error) {
    console.error("Error destroying session:", error);
  }
}
