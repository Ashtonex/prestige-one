# Demonstration Scope: Prestige ONE

**Client Demonstration Specification**  
**Institution**: Prestige International Academy, Maputo  
**Release Target**: Client Demonstration Ready  
**Date**: October 2026  

---

## 1. Fictional School Identity

- **School Name**: Prestige International Academy, Maputo (Escola Internacional Prestige de Maputo)
- **Campus**: Sommerschield Campus, Maputo, Mozambique
- **Curriculum**: Cambridge International Curriculum (IGCSE & A-Levels) dual-stream with Mozambican National Secondary Education
- **Academic Year**: 2026 Academic Year (Three Terms: Term 1, Term 2, Term 3)
- **Base Currency**: Mozambican Metical (MZN - MT)
- **Motto**: *Aude Sapere* (Dare to Know)
- **Corporate Brand**: Flectēre Visual Language (Deep Navy, Gold, Crimson, Slate, Light)

---

## 2. Demonstration Roles & Accounts

All demo accounts are pre-seeded and accessible via the interactive demo role selector on the login screen (`/login`).

| Role | Name | Demo Email | Demo Password | Primary Responsibilities & Access Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Director / Leadership** | Dr. Armando Guebuza | `director@prestige.co.mz` | `PrestigeDirector2026!` | Institutional KPI command centre, admissions funnel, collection overview, executive action queue. |
| **Administrator (Ops/Admissions)** | Graça Machel-Sitoe | `admin@prestige.co.mz` | `PrestigeAdmin2026!` | Full student lifecycle management, enrollment, class allocations, staff directory, academic setup. |
| **Teacher (Senior Educator)** | Prof. Manuel Cossa | `teacher@prestige.co.mz` | `PrestigeTeacher2026!` | Assigned class rosters, daily mobile attendance registers, gradebook marking, lesson planning. |
| **Guardian / Parent** | Dona Beatriz Mondlane | `guardian@prestige.co.mz` | `PrestigeGuardian2026!` | Multi-child portal for linked learners (Tiago & Yara Mondlane): attendance, marks, invoices, receipts. |
| **Student (Senior Secondary)** | Tiago Mondlane | `student@prestige.co.mz` | `PrestigeStudent2026!` | Student personal timetable, submitted homework, teacher feedback, extracurricular achievements. |

---

## 3. The One Primary Workflow

**Student Enrollment and Institutional Record (End-to-End Slice)**

The demonstration proves the integrity of the school operating platform through a complete, verifiable 12-step lifecycle workflow:

1. **Sign-In**: School Administrator signs into the platform with credentials.
2. **Navigation**: Administrator navigates to **Student Management** (`/students`) via the persistent navigation shell.
3. **Form Opening**: Administrator clicks **"Enroll New Student"** (`/students/new`).
4. **Server Validation**: The student creation form (personal info, date of birth, grade level, guardian contact, class selection) is submitted and validated on the server using Zod schemas.
5. **Durable Storage**: The student record is securely persisted in PostgreSQL with server-generated ID, timestamp, and audit trail.
6. **Class Enrollment**: A valid relational enrollment link is created attaching the student to an active classroom section (e.g., "Grade 7A").
7. **Directory Visibility**: The newly enrolled student immediately appears in the authoritative student directory (`/students`).
8. **Class Roster Consistency**: The student simultaneously appears in the relevant class roster (`/classes/[id]`).
9. **Profile Inspection**: Administrator opens the student's individual profile page (`/students/[id]`).
10. **Record Modification**: Administrator modifies permitted fields (e.g., updating emergency phone number or home address).
11. **Cross-Workspace Synchronization**: Updated data immediately updates both the student profile and the class roster view.
12. **Persistence Guarantee**: The updated record completely survives hard page refresh, session logout/login, and inspection from a second independent browser session.

---

## 4. Screens & Routes Included

| Screen / Feature | Route | Scope Description |
| :--- | :--- | :--- |
| **Public Flagship & Brand** | `/` | Editorial landing page highlighting academic pathways, admissions overview, and portal login. |
| **Authentication & Demo Selector** | `/login` | Secure login form with one-click demo persona switcher for instant testing. |
| **Executive Command Centre** | `/dashboard` | High-level metrics (Enrolment, Attendance %, Academic Average, Collections %) and Action Queue. |
| **Student Directory** | `/students` | Filterable, searchable directory of all registered students with status and grade tags. |
| **Student Enrollment Form** | `/students/new` | Full mobile-friendly enrollment form with Zod validation and class assignment. |
| **Student Detail Profile** | `/students/[id]` | Comprehensive student master record with academic history, guardian links, and quick actions. |
| **Student Edit Screen** | `/students/[id]/edit` | Controlled editing of demographic, academic, and contact information. |
| **Class Directory & Rosters** | `/classes`, `/classes/[id]` | List of all class sections and their real-time student rosters with teacher assignments. |
| **Teacher Attendance Register** | `/attendance` | Mobile-optimized daily attendance grid (Present, Absent, Late, Excused) with one-tap status toggles. |
| **Tuition & Finance Overview** | `/finance` | Summary of assessed tuition fees, invoices, verified receipts, and settlement status. |
| **PWA Offline Fallback Screen** | `/~offline` | Clean, reassuring offline notice with reconnection status indicator when disconnected. |

---

## 5. Screens & Features Explicitly Excluded

1. **Live Mozambique Telecom Gateways**: Real live API calls to Vodacom M-Pesa and Movitel e-Mola APIs are excluded from the standalone demo (synthetic reconciliation is provided).
2. **Live SMS/WhatsApp Provider Dispatch**: Direct SMS/WhatsApp telecom gateway dispatch is simulated via internal delivery logs and audit history.
3. **Hardware GPS Bus Tracking**: Real-time vehicle telematics are represented via route and bus stop schedules.
4. **Native App Store Binaries**: iOS IPA and Android APK packaging is deferred in favor of the immediate installable PWA.
5. **AI Predictive Psychometrics**: Black-box automated student profiling is deliberately excluded pursuant to proposal ethical guidelines.

---

## 6. Known Limitations

- **Single Primary Tenant for Demo**: While the database schema supports multi-tenant `Institution` isolation, the demonstration runs on the primary seeded institution ("Prestige International Academy, Maputo").
- **Offline Capabilities**: In strict compliance with architectural guidelines, offline mode serves a dedicated fallback page; offline data editing is not claimed or enabled to prevent unverified out-of-order mutations.
- **Client Cache Strategy**: Client caching uses standard Next.js revalidation and TanStack Query invalidation without exposing stale authenticated data across session changes.
