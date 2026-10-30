import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Prestige ONE database seed...");

  // 1. Institution
  const institution = await prisma.institution.upsert({
    where: { code: "PIA-MAPUTO" },
    update: {},
    create: {
      name: "Prestige International Academy, Maputo",
      code: "PIA-MAPUTO",
      currency: "MZN",
      country: "Mozambique",
      city: "Maputo",
    },
  });
  console.log(`✓ Institution: ${institution.name}`);

  // 2. Academic Year & Terms
  const academicYear = await prisma.academicYear.upsert({
    where: {
      institutionId_name: {
        institutionId: institution.id,
        name: "2026",
      },
    },
    update: {},
    create: {
      institutionId: institution.id,
      name: "2026",
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-11-30"),
      isCurrent: true,
    },
  });

  const term1 = await prisma.term.upsert({
    where: {
      academicYearId_name: {
        academicYearId: academicYear.id,
        name: "Term 1",
      },
    },
    update: {},
    create: {
      academicYearId: academicYear.id,
      name: "Term 1",
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-04-10"),
      isCurrent: true,
    },
  });

  const term2 = await prisma.term.upsert({
    where: {
      academicYearId_name: {
        academicYearId: academicYear.id,
        name: "Term 2",
      },
    },
    update: {},
    create: {
      academicYearId: academicYear.id,
      name: "Term 2",
      startDate: new Date("2026-05-04"),
      endDate: new Date("2026-08-07"),
      isCurrent: false,
    },
  });

  console.log(`✓ Academic Year: ${academicYear.name} (Terms: ${term1.name}, ${term2.name})`);

  // 3. Demo Users
  const passwordAdmin = await bcrypt.hash("PrestigeAdmin2026!", 10);
  const passwordTeacher = await bcrypt.hash("PrestigeTeacher2026!", 10);
  const passwordGuardian = await bcrypt.hash("PrestigeGuardian2026!", 10);
  const passwordStudent = await bcrypt.hash("PrestigeStudent2026!", 10);
  const passwordDirector = await bcrypt.hash("PrestigeDirector2026!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@prestige.co.mz" },
    update: { passwordHash: passwordAdmin },
    create: {
      institutionId: institution.id,
      email: "admin@prestige.co.mz",
      passwordHash: passwordAdmin,
      name: "Graça Machel-Sitoe",
      role: "ADMIN",
      phoneNumber: "+258 84 100 2001",
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@prestige.co.mz" },
    update: { passwordHash: passwordTeacher },
    create: {
      institutionId: institution.id,
      email: "teacher@prestige.co.mz",
      passwordHash: passwordTeacher,
      name: "Prof. Manuel Cossa",
      role: "TEACHER",
      phoneNumber: "+258 84 100 2002",
    },
  });

  const director = await prisma.user.upsert({
    where: { email: "director@prestige.co.mz" },
    update: { passwordHash: passwordDirector },
    create: {
      institutionId: institution.id,
      email: "director@prestige.co.mz",
      passwordHash: passwordDirector,
      name: "Dr. Armando Guebuza",
      role: "DIRECTOR",
      phoneNumber: "+258 84 100 2000",
    },
  });

  const guardianUser = await prisma.user.upsert({
    where: { email: "guardian@prestige.co.mz" },
    update: { passwordHash: passwordGuardian },
    create: {
      institutionId: institution.id,
      email: "guardian@prestige.co.mz",
      passwordHash: passwordGuardian,
      name: "Dona Beatriz Mondlane",
      role: "GUARDIAN",
      phoneNumber: "+258 84 100 2003",
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: "student@prestige.co.mz" },
    update: { passwordHash: passwordStudent },
    create: {
      institutionId: institution.id,
      email: "student@prestige.co.mz",
      passwordHash: passwordStudent,
      name: "Tiago Mondlane",
      role: "STUDENT",
      phoneNumber: "+258 84 100 2004",
    },
  });

  console.log("✓ Core Demo Accounts seeded (Admin, Teacher, Director, Guardian, Student)");

  // 4. Classes
  const class7A = await prisma.class.upsert({
    where: {
      institutionId_academicYearId_name: {
        institutionId: institution.id,
        academicYearId: academicYear.id,
        name: "Grade 7A",
      },
    },
    update: { teacherId: teacher.id },
    create: {
      institutionId: institution.id,
      academicYearId: academicYear.id,
      name: "Grade 7A",
      gradeLevel: "Grade 7",
      stream: "A",
      room: "Room 101",
      teacherId: teacher.id,
    },
  });

  const class7B = await prisma.class.upsert({
    where: {
      institutionId_academicYearId_name: {
        institutionId: institution.id,
        academicYearId: academicYear.id,
        name: "Grade 7B",
      },
    },
    update: {},
    create: {
      institutionId: institution.id,
      academicYearId: academicYear.id,
      name: "Grade 7B",
      gradeLevel: "Grade 7",
      stream: "B",
      room: "Room 102",
    },
  });

  const class8A = await prisma.class.upsert({
    where: {
      institutionId_academicYearId_name: {
        institutionId: institution.id,
        academicYearId: academicYear.id,
        name: "Grade 8A",
      },
    },
    update: {},
    create: {
      institutionId: institution.id,
      academicYearId: academicYear.id,
      name: "Grade 8A",
      gradeLevel: "Grade 8",
      stream: "A",
      room: "Room 201",
    },
  });

  console.log(`✓ Classes: Grade 7A, Grade 7B, Grade 8A`);

  // 5. Guardian Profile
  const guardian = await prisma.guardian.upsert({
    where: { userId: guardianUser.id },
    update: {},
    create: {
      institutionId: institution.id,
      userId: guardianUser.id,
      fullName: "Dona Beatriz Mondlane",
      relationship: "Mother",
      email: "guardian@prestige.co.mz",
      phone: "+258 84 100 2003",
      address: "Av. Julius Nyerere 1450, Polana, Maputo",
    },
  });

  // 6. Primary Demo Student: Tiago Mondlane
  const tiago = await prisma.student.upsert({
    where: { admissionNumber: "PIA-2026-001" },
    update: {},
    create: {
      institutionId: institution.id,
      admissionNumber: "PIA-2026-001",
      firstName: "Tiago",
      lastName: "Mondlane",
      dateOfBirth: new Date("2012-05-14"),
      gender: "Male",
      gradeLevel: "Grade 7",
      status: "ENROLLED",
      email: "student@prestige.co.mz",
      phone: "+258 84 100 2004",
      address: "Av. Julius Nyerere 1450, Polana, Maputo",
      medicalNotes: "No known allergies; carrying inhaler for mild sports asthma.",
    },
  });

  // Link Tiago to Guardian
  await prisma.guardianStudent.upsert({
    where: {
      guardianId_studentId: {
        guardianId: guardian.id,
        studentId: tiago.id,
      },
    },
    update: {},
    create: {
      guardianId: guardian.id,
      studentId: tiago.id,
      hasCustody: true,
      hasFinancialResponsibility: true,
      isEmergencyContact: true,
    },
  });

  // Enroll Tiago in Grade 7A
  await prisma.enrollment.upsert({
    where: {
      studentId_classId_academicYearId: {
        studentId: tiago.id,
        classId: class7A.id,
        academicYearId: academicYear.id,
      },
    },
    update: {},
    create: {
      studentId: tiago.id,
      classId: class7A.id,
      academicYearId: academicYear.id,
      status: "ACTIVE",
    },
  });

  // 7. Sibling Demo Student: Yara Mondlane
  const yara = await prisma.student.upsert({
    where: { admissionNumber: "PIA-2026-002" },
    update: {},
    create: {
      institutionId: institution.id,
      admissionNumber: "PIA-2026-002",
      firstName: "Yara",
      lastName: "Mondlane",
      dateOfBirth: new Date("2011-09-22"),
      gender: "Female",
      gradeLevel: "Grade 8",
      status: "ENROLLED",
      email: "yara.mondlane@prestige.co.mz",
      phone: "+258 84 100 2005",
      address: "Av. Julius Nyerere 1450, Polana, Maputo",
    },
  });

  await prisma.guardianStudent.upsert({
    where: {
      guardianId_studentId: {
        guardianId: guardian.id,
        studentId: yara.id,
      },
    },
    update: {},
    create: {
      guardianId: guardian.id,
      studentId: yara.id,
      hasCustody: true,
      hasFinancialResponsibility: true,
      isEmergencyContact: true,
    },
  });

  await prisma.enrollment.upsert({
    where: {
      studentId_classId_academicYearId: {
        studentId: yara.id,
        classId: class8A.id,
        academicYearId: academicYear.id,
      },
    },
    update: {},
    create: {
      studentId: yara.id,
      classId: class8A.id,
      academicYearId: academicYear.id,
      status: "ACTIVE",
    },
  });

  // 8. Cohort students in Grade 7A
  const cohortNames = [
    { first: "Amina", last: "Chissano", dob: "2012-03-12", gender: "Female", adm: "PIA-2026-003" },
    { first: "Carlos", last: "Mabote", dob: "2012-07-28", gender: "Male", adm: "PIA-2026-004" },
    { first: "Fatima", last: "Da Silva", dob: "2012-01-19", gender: "Female", adm: "PIA-2026-005" },
    { first: "Lucas", last: "Tembe", dob: "2012-11-05", gender: "Male", adm: "PIA-2026-006" },
  ];

  for (const c of cohortNames) {
    const s = await prisma.student.upsert({
      where: { admissionNumber: c.adm },
      update: {},
      create: {
        institutionId: institution.id,
        admissionNumber: c.adm,
        firstName: c.first,
        lastName: c.last,
        dateOfBirth: new Date(c.dob),
        gender: c.gender,
        gradeLevel: "Grade 7",
        status: "ENROLLED",
      },
    });

    await prisma.enrollment.upsert({
      where: {
        studentId_classId_academicYearId: {
          studentId: s.id,
          classId: class7A.id,
          academicYearId: academicYear.id,
        },
      },
      update: {},
      create: {
        studentId: s.id,
        classId: class7A.id,
        academicYearId: academicYear.id,
        status: "ACTIVE",
      },
    });
  }

  console.log("✓ Cohort students enrolled in Grade 7A and 8A");

  // 9. Attendance records for Grade 7A
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const grade7AEnrollments = await prisma.enrollment.findMany({
    where: { classId: class7A.id },
    include: { student: true },
  });

  for (const enr of grade7AEnrollments) {
    await prisma.attendanceRecord.upsert({
      where: {
        classId_studentId_date: {
          classId: class7A.id,
          studentId: enr.studentId,
          date: today,
        },
      },
      update: {},
      create: {
        classId: class7A.id,
        studentId: enr.studentId,
        date: today,
        status: "PRESENT",
        takenById: teacher.id,
      },
    });
  }
  console.log("✓ Daily attendance seeded for Grade 7A");

  // 10. Sample Assessment & Results
  const mathAssessment = await prisma.assessment.create({
    data: {
      classId: class7A.id,
      termId: term1.id,
      title: "Cambridge Checkpoint Mathematics Mid-term",
      type: "Exam",
      maxScore: 100,
      weight: 1.0,
      date: new Date("2026-02-28"),
    },
  });

  await prisma.assessmentResult.createMany({
    data: [
      { assessmentId: mathAssessment.id, studentId: tiago.id, score: 88, feedback: "Excellent problem solving in geometry and algebra." },
      { assessmentId: mathAssessment.id, studentId: grade7AEnrollments[1].studentId, score: 76, feedback: "Good effort; review fractional indices." },
    ],
    skipDuplicates: true,
  });

  // 11. Invoices & Payments for Tiago
  const invoice1 = await prisma.invoice.upsert({
    where: { invoiceNumber: "INV-2026-T1-001" },
    update: {},
    create: {
      institutionId: institution.id,
      studentId: tiago.id,
      termId: term1.id,
      invoiceNumber: "INV-2026-T1-001",
      amount: 45000, // 45,000 MZN
      paidAmount: 45000,
      status: "PAID",
      dueDate: new Date("2026-01-30"),
    },
  });

  await prisma.payment.upsert({
    where: { reference: "PAY-MPESA-849120" },
    update: {},
    create: {
      invoiceId: invoice1.id,
      amount: 45000,
      reference: "PAY-MPESA-849120",
      method: "M-Pesa",
      status: "CONFIRMED",
      receiptNumber: "REC-2026-0042",
      confirmedAt: new Date("2026-01-25"),
    },
  });

  // Term 2 Pending Invoice
  await prisma.invoice.upsert({
    where: { invoiceNumber: "INV-2026-T2-001" },
    update: {},
    create: {
      institutionId: institution.id,
      studentId: tiago.id,
      termId: term2.id,
      invoiceNumber: "INV-2026-T2-001",
      amount: 45000,
      paidAmount: 0,
      status: "PENDING",
      dueDate: new Date("2026-05-15"),
    },
  });

  console.log("✓ Financial invoices and receipts seeded for Tiago Mondlane");

  // 12. Audit Log
  await prisma.auditLog.create({
    data: {
      institutionId: institution.id,
      userId: admin.id,
      action: "DEMO_SEED_INITIALIZED",
      entityType: "System",
      entityId: institution.id,
      details: "Initial synthetic demo dataset successfully created for Prestige International Academy.",
    },
  });

  console.log("✨ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
