import { describe, it, expect } from "vitest";
import { studentCreateSchema, studentUpdateSchema } from "./student";
import { loginSchema } from "./auth";

describe("Validation Schemas", () => {
  describe("studentCreateSchema", () => {
    it("accepts valid student enrollment input", () => {
      const valid = {
        admissionNumber: "PIA-2026-999",
        firstName: "Alima",
        lastName: "Couto",
        dateOfBirth: "2012-04-10",
        gender: "Female" as const,
        gradeLevel: "Grade 7",
        classId: "cls_12345",
        guardianFullName: "Eduardo Couto",
        guardianEmail: "eduardo@example.com",
        guardianPhone: "+258 84 999 8888",
        guardianRelationship: "Father",
      };

      const result = studentCreateSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects invalid email and missing required names", () => {
      const invalid = {
        admissionNumber: "P", // too short
        firstName: "",
        lastName: "",
        dateOfBirth: "not-a-date",
        gender: "Unknown",
        gradeLevel: "",
        classId: "",
        guardianFullName: "",
        guardianEmail: "not-an-email",
        guardianPhone: "",
        guardianRelationship: "",
      };

      const result = studentCreateSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.admissionNumber).toBeDefined();
        expect(errors.firstName).toBeDefined();
        expect(errors.guardianEmail).toBeDefined();
      }
    });

    it("rejects future dates of birth", () => {
      const futureDOB = {
        admissionNumber: "PIA-2026-998",
        firstName: "Lucas",
        lastName: "Machel",
        dateOfBirth: "2035-01-01",
        gender: "Male" as const,
        gradeLevel: "Grade 7",
        classId: "cls_12345",
        guardianFullName: "Maria Machel",
        guardianEmail: "maria@example.com",
        guardianPhone: "+258 84 123 4567",
        guardianRelationship: "Mother",
      };

      const result = studentCreateSchema.safeParse(futureDOB);
      expect(result.success).toBe(false);
    });
  });

  describe("studentUpdateSchema", () => {
    it("validates permitted profile update payload", () => {
      const updateData = {
        firstName: "Tiago Manuel",
        lastName: "Mondlane",
        dateOfBirth: "2012-05-14",
        gender: "Male" as const,
        gradeLevel: "Grade 7",
        status: "ENROLLED" as const,
        phone: "+258 84 100 2004",
        address: "Av. Julius Nyerere, Polana, Maputo",
        medicalNotes: "Carries asthma inhaler",
      };

      const result = studentUpdateSchema.safeParse(updateData);
      expect(result.success).toBe(true);
    });
  });

  describe("loginSchema", () => {
    it("validates proper email and password minimum length", () => {
      const valid = { email: "admin@prestige.co.mz", password: "PrestigeAdmin2026!" };
      expect(loginSchema.safeParse(valid).success).toBe(true);

      const invalid = { email: "invalid", password: "123" };
      expect(loginSchema.safeParse(invalid).success).toBe(false);
    });
  });
});
