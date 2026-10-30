"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudentAction } from "@/app/actions/studentActions";
import { useToast } from "@/components/ui/Toast";
import { UserPlus, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ClassOption {
  id: string;
  name: string;
  gradeLevel: string;
}

interface StudentEnrollmentFormProps {
  classes: ClassOption[];
}

export function StudentEnrollmentForm({ classes }: StudentEnrollmentFormProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    admissionNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "2012-06-15",
    gender: "Male",
    gradeLevel: "Grade 7",
    classId: classes[0]?.id || "",
    email: "",
    phone: "",
    address: "Maputo, Mozambique",
    guardianFullName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianRelationship: "Mother",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error when user edits
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submission

    setIsSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const result = await createStudentAction({
        admissionNumber: formData.admissionNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as "Male" | "Female" | "Other",
        gradeLevel: formData.gradeLevel,
        classId: formData.classId,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        guardianFullName: formData.guardianFullName,
        guardianEmail: formData.guardianEmail,
        guardianPhone: formData.guardianPhone,
        guardianRelationship: formData.guardianRelationship,
      });

      if (!result.success) {
        setFormError(result.error || "Enrollment could not be processed.");
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        toastError("Enrollment Failed", result.error);
        setIsSubmitting(false);
        return;
      }

      success(
        "Student Enrolled Successfully",
        `${formData.firstName} ${formData.lastName} (${result.admissionNumber}) is now active.`
      );

      // Navigate to the newly created student profile
      router.push(`/students/${result.studentId}`);
      router.refresh();
    } catch (err: any) {
      setFormError("A network error occurred while submitting the enrollment.");
      toastError("Network Error", err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8" id="student-enrollment-form">
      {/* Top Banner Notice */}
      {formError && (
        <div
          className="p-4 rounded-xl bg-flectere-crimsonLight text-flectere-crimson border border-flectere-crimson/20 text-xs font-semibold flex items-center gap-2"
          role="alert"
          id="form-error-alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* 1. Academic & Student Demographics Card */}
      <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm space-y-5">
        <div className="border-b border-flectere-slateLight pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-flectere-navy">
            1. Learner Master Record & Identification
          </h2>
          <p className="text-xs text-flectere-slate mt-0.5">
            Core demographic and academic identification fields
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="admissionNumber" className="block text-xs font-semibold text-flectere-navy mb-1">
              Admission Number *
            </label>
            <input
              id="admissionNumber"
              name="admissionNumber"
              type="text"
              required
              placeholder="e.g. PIA-2026-042"
              value={formData.admissionNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs font-mono uppercase focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.admissionNumber && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium error-message">
                {fieldErrors.admissionNumber[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-flectere-navy mb-1">
              First / Given Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="e.g. Samuel"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.firstName && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium error-message">
                {fieldErrors.firstName[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold text-flectere-navy mb-1">
              Last / Surname *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="e.g. Muthemba"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.lastName && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium error-message">
                {fieldErrors.lastName[0]}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dateOfBirth" className="block text-xs font-semibold text-flectere-navy mb-1">
              Date of Birth *
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.dateOfBirth && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium error-message">
                {fieldErrors.dateOfBirth[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-xs font-semibold text-flectere-navy mb-1">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="gradeLevel" className="block text-xs font-semibold text-flectere-navy mb-1">
              Grade Level *
            </label>
            <select
              id="gradeLevel"
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none bg-white"
            >
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="classId" className="block text-xs font-semibold text-flectere-navy mb-1">
            Assigned Classroom Section *
          </label>
          <select
            id="classId"
            name="classId"
            required
            value={formData.classId}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none bg-white font-medium"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.gradeLevel})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-flectere-slate mt-1">
            This enrollment immediately links the student to the active class roster and daily attendance register.
          </p>
        </div>
      </div>

      {/* 2. Guardian & Custodial Relationship Card */}
      <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm space-y-5">
        <div className="border-b border-flectere-slateLight pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-flectere-navy">
            2. Primary Guardian & Custodial Contact
          </h2>
          <p className="text-xs text-flectere-slate mt-0.5">
            Verified parent or guardian responsible for billing and emergency notifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="guardianFullName" className="block text-xs font-semibold text-flectere-navy mb-1">
              Guardian Full Name *
            </label>
            <input
              id="guardianFullName"
              name="guardianFullName"
              type="text"
              required
              placeholder="e.g. Helena Muthemba"
              value={formData.guardianFullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.guardianFullName && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium error-message">
                {fieldErrors.guardianFullName[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="guardianRelationship" className="block text-xs font-semibold text-flectere-navy mb-1">
              Relationship to Learner *
            </label>
            <select
              id="guardianRelationship"
              name="guardianRelationship"
              value={formData.guardianRelationship}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none bg-white"
            >
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Legal Guardian">Legal Guardian</option>
              <option value="Grandparent">Grandparent</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="guardianEmail" className="block text-xs font-semibold text-flectere-navy mb-1">
              Guardian Email Address *
            </label>
            <input
              id="guardianEmail"
              name="guardianEmail"
              type="email"
              required
              placeholder="helena@example.com"
              value={formData.guardianEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.guardianEmail && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium error-message">
                {fieldErrors.guardianEmail[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="guardianPhone" className="block text-xs font-semibold text-flectere-navy mb-1">
              Guardian Contact Telephone *
            </label>
            <input
              id="guardianPhone"
              name="guardianPhone"
              type="tel"
              required
              placeholder="+258 84 000 0000"
              value={formData.guardianPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.guardianPhone && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium error-message">
                {fieldErrors.guardianPhone[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit / Action Bar */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-flectere-slateLight text-flectere-navy text-xs font-semibold hover:bg-flectere-slateLight/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel & Return
        </Link>

        <button
          type="submit"
          id="submit-student-btn"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-flectere-navy text-white text-xs font-bold hover:bg-flectere-navyLight transition-colors shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-flectere-gold" />
              Creating Relational Record...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-flectere-gold" />
              Complete Enrollment & Save Record
            </>
          )}
        </button>
      </div>
    </form>
  );
}
