"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateStudentAction } from "@/app/actions/studentActions";
import { useToast } from "@/components/ui/Toast";
import { Save, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Student } from "@prisma/client";

interface StudentEditFormProps {
  student: Student;
}

export function StudentEditForm({ student }: StudentEditFormProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    firstName: student.firstName,
    lastName: student.lastName,
    dateOfBirth: new Date(student.dateOfBirth).toISOString().split("T")[0],
    gender: student.gender as "Male" | "Female" | "Other",
    gradeLevel: student.gradeLevel,
    status: student.status,
    email: student.email || "",
    phone: student.phone || "",
    address: student.address || "",
    medicalNotes: student.medicalNotes || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const result = await updateStudentAction(student.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        gradeLevel: formData.gradeLevel,
        status: formData.status as any,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        medicalNotes: formData.medicalNotes,
      });

      if (!result.success) {
        setFormError(result.error || "Update could not be saved.");
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        toastError("Update Failed", result.error);
        setIsSubmitting(false);
        return;
      }

      success("Profile Updated", `${formData.firstName} ${formData.lastName}'s master record has been saved.`);
      router.push(`/students/${student.id}`);
      router.refresh();
    } catch (err: any) {
      setFormError("A network error occurred while updating the record.");
      toastError("Network Error", err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="student-edit-form">
      {formError && (
        <div
          className="p-4 rounded-xl bg-flectere-crimsonLight text-flectere-crimson border border-flectere-crimson/20 text-xs font-semibold flex items-center gap-2"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm space-y-5">
        <div className="border-b border-flectere-slateLight pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-flectere-navy">
            Demographic & Identification Fields
          </h2>
          <p className="text-xs text-flectere-slate mt-0.5">
            Admission Number: <strong className="font-mono text-flectere-navy">{student.admissionNumber}</strong> (Immutable)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-flectere-navy mb-1">
              First / Given Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.firstName && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium">
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
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
            {fieldErrors.lastName && (
              <p className="text-[11px] text-flectere-crimson mt-1 font-medium">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block text-xs font-semibold text-flectere-navy mb-1">
              Enrollment Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none bg-white font-medium"
            >
              <option value="ENROLLED">ENROLLED</option>
              <option value="APPLICANT">APPLICANT</option>
              <option value="TRANSFERRED">TRANSFERRED</option>
              <option value="GRADUATED">GRADUATED</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-flectere-navy mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-xs font-semibold text-flectere-navy mb-1">
            Residential Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="medicalNotes" className="block text-xs font-semibold text-flectere-navy mb-1">
            Safeguarding & Medical Notes
          </label>
          <textarea
            id="medicalNotes"
            name="medicalNotes"
            rows={2}
            value={formData.medicalNotes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-flectere-slateLight rounded-xl text-xs focus:ring-2 focus:ring-flectere-gold focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-flectere-slateLight text-flectere-navy text-xs font-semibold hover:bg-flectere-slateLight/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </Link>

        <button
          type="submit"
          id="save-student-btn"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-flectere-navy text-white text-xs font-bold hover:bg-flectere-navyLight transition-colors shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-flectere-gold" />
              Saving Record...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-flectere-gold" />
              Save Updates to PostgreSQL
            </>
          )}
        </button>
      </div>
    </form>
  );
}
