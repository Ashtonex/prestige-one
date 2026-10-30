import { z } from "zod";

export const studentCreateSchema = z.object({
  admissionNumber: z
    .string()
    .min(3, "Admission number must be at least 3 characters")
    .max(30, "Admission number cannot exceed 30 characters")
    .regex(/^[A-Z0-9-]+$/i, "Admission number can only contain alphanumeric characters and hyphens"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  dateOfBirth: z.string().refine((val) => {
    const d = new Date(val);
    return !isNaN(d.getTime()) && d < new Date();
  }, "Please provide a valid past date of birth"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  gradeLevel: z.string().min(1, "Please select a grade level"),
  classId: z.string().min(1, "Please assign the student to an initial class section"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  // Primary Guardian
  guardianFullName: z
    .string()
    .min(2, "Guardian full name must be at least 2 characters"),
  guardianEmail: z.string().email("Please provide a valid guardian email"),
  guardianPhone: z
    .string()
    .min(5, "Please provide a valid contact telephone number"),
  guardianRelationship: z
    .string()
    .min(2, "Please specify relationship (e.g. Mother, Father, Legal Guardian)"),
});

export type StudentCreateInput = z.infer<typeof studentCreateSchema>;

export const studentUpdateSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  dateOfBirth: z.string().refine((val) => {
    const d = new Date(val);
    return !isNaN(d.getTime()) && d < new Date();
  }, "Please provide a valid past date of birth"),
  gender: z.enum(["Male", "Female", "Other"]),
  gradeLevel: z.string().min(1, "Grade level is required"),
  status: z.enum(["ENROLLED", "APPLICANT", "TRANSFERRED", "GRADUATED", "SUSPENDED"]),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  medicalNotes: z.string().optional().or(z.literal("")),
});

export type StudentUpdateInput = z.infer<typeof studentUpdateSchema>;
