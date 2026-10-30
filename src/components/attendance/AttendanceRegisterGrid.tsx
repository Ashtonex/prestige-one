"use client";

import React, { useState } from "react";
import { saveAttendanceAction } from "@/app/actions/attendanceActions";
import { useToast } from "@/components/ui/Toast";
import { Check, X, Clock, HelpCircle, Save, Loader2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AttendanceStatus } from "@prisma/client";

interface StudentRosterItem {
  id: string;
  admissionNumber: string;
  name: string;
  initialStatus: AttendanceStatus;
}

interface AttendanceRegisterGridProps {
  classId: string;
  className: string;
  students: StudentRosterItem[];
}

export function AttendanceRegisterGrid({ classId, className, students }: AttendanceRegisterGridProps) {
  const { success, error: toastError } = useToast();
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      initial[s.id] = s.initialStatus || "PRESENT";
    });
    return initial;
  });
  const [isSaving, setIsSaving] = useState(false);

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const next: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      next[s.id] = status;
    });
    setRecords(next);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload = Object.entries(records).map(([studentId, status]) => ({
      studentId,
      status,
    }));

    try {
      const result = await saveAttendanceAction(classId, date, payload);
      if (result.success) {
        success("Attendance Saved", `Registered attendance for ${payload.length} students in ${className}.`);
      } else {
        toastError("Save Failed", result.error);
      }
    } catch (err: any) {
      toastError("Network Error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const statusConfigs: { key: AttendanceStatus; label: string; activeColor: string; icon: any }[] = [
    { key: "PRESENT", label: "Present", activeColor: "bg-flectere-green text-white", icon: Check },
    { key: "ABSENT", label: "Absent", activeColor: "bg-flectere-crimson text-white", icon: X },
    { key: "LATE", label: "Late", activeColor: "bg-flectere-gold text-flectere-navy", icon: Clock },
    { key: "EXCUSED", label: "Excused", activeColor: "bg-flectere-slate text-white", icon: HelpCircle },
  ];

  return (
    <div className="space-y-4">
      {/* Date & Bulk Controls */}
      <div className="bg-white p-4 rounded-2xl border border-flectere-slateLight shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-flectere-slate shrink-0" />
          <span className="text-xs font-semibold text-flectere-navy">Register Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-2.5 py-1.5 border border-flectere-slateLight rounded-xl text-xs text-flectere-navy focus:outline-none focus:ring-2 focus:ring-flectere-gold"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-flectere-slate">Quick Mark:</span>
          <button
            type="button"
            onClick={() => handleMarkAll("PRESENT")}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-flectere-greenLight text-flectere-green border border-flectere-green/30 hover:bg-flectere-green hover:text-white transition-colors"
          >
            All Present
          </button>
          <button
            type="button"
            onClick={() => handleMarkAll("ABSENT")}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-flectere-crimsonLight text-flectere-crimson border border-flectere-crimson/30 hover:bg-flectere-crimson hover:text-white transition-colors"
          >
            All Absent
          </button>
        </div>
      </div>

      {/* Mobile-Optimized Attendance Roster */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm overflow-hidden">
        <div className="divide-y divide-flectere-slateLight/60">
          {students.map((student) => {
            const currentStatus = records[student.id] || "PRESENT";

            return (
              <div
                key={student.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-flectere-light/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-flectere-slate">
                      {student.admissionNumber}
                    </span>
                    <span className="font-bold text-sm text-flectere-navy">
                      {student.name}
                    </span>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="grid grid-cols-4 gap-1.5 sm:flex sm:items-center shrink-0">
                  {statusConfigs.map(({ key, label, activeColor, icon: Icon }) => {
                    const isSelected = currentStatus === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setStatus(student.id, key)}
                        className={cn(
                          "flex items-center justify-center gap-1 min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
                          isSelected
                            ? cn(activeColor, "border-transparent shadow-sm")
                            : "bg-flectere-light/80 text-flectere-slate border-flectere-slateLight hover:bg-flectere-slateLight/40"
                        )}
                        aria-pressed={isSelected}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with Save Action */}
        <div className="p-4 bg-flectere-light/50 border-t border-flectere-slateLight flex items-center justify-between">
          <p className="text-xs text-flectere-slate">
            Status changes are held locally until saved to authoritative records.
          </p>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-flectere-navy text-white text-xs font-bold hover:bg-flectere-navyLight transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-flectere-gold" />
                Saving to PostgreSQL...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-flectere-gold" />
                Save Daily Register
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
