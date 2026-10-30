# Product Requirements Document: Prestige ONE

**Project**: Prestige ONE — Integrated Digital Campus  
**Client**: Prestige School, Mozambique  
**Provider**: Flectēre (Private) Limited  
**Lead**: Ashton Tanaka Munene  
**Document Reference**: PRESTIGE-ONE-2026-001-R07  
**Date**: October 2026  

---

## 1. Executive Summary & Purpose

Prestige ONE is an integrated digital ecosystem designed for Prestige School, Mozambique. It unites the institution's public brand presence with a secure, mobile-first operating system. The platform replaces fragmented spreadsheets, manual paperwork, and disconnected communication channels with one authoritative institutional record and role-specific operational workspaces.

This document registers all functional and technical requirements extracted from the *Prestige ONE Integrated Ecosystem Proposal (R07)*, explicitly categorized into confirmed proposal requirements (`PR-xxx`), engineering requirements (`EN-xxx`), demonstration enhancements (`DX-xxx`), and deferred capabilities (`DF-xxx`).

---

## 2. Requirements Register

### 2.1 Confirmed Proposal Requirements (PR-xxx)

| ID | Title | Proposal Ref | Summary / Acceptance Intent |
| :--- | :--- | :--- | :--- |
| **PR-001** | Public Flagship Web Experience | Ch. 4 (§4.1–4.3) | Editorial-quality public presence featuring institutional vision, academic programmes, admissions pipeline overview, campus life, and clear CTAs (Apply, Inquire, Portal Login). |
| **PR-002** | Admissions Pipeline & Intake | Ch. 5 (§5.1–5.3) | End-to-end admissions pipeline (Enquiry → Application → Document Review → Interview/Assessment → Offer → Acceptance → Enrolment). Conversion into student master record without re-keying. |
| **PR-003** | Student Information System (SIS) Master Record | Ch. 6 (§6.1–6.2) | One authoritative learner master record with stable internal identifier, year-by-year academic history, class allocation, guardian links, emergency contacts, and change audit trails. |
| **PR-004** | Academic Operations & Curriculum (Prestige Learn) | Ch. 7 (§7.1–7.4) | Structured academic setup: academic years, terms, grades, sections/classes, subjects, and teacher assignments. Support for class registers and assessment recording. |
| **PR-005** | Teacher Daily Workspace | Ch. 8 (§8.1–8.2) | Task-oriented teacher dashboard: daily timetable, quick mobile-friendly attendance register, mark entry, and assignment overview. |
| **PR-006** | Guardian & Family Portal (Prestige Family) | Ch. 9 (§9.1–9.3) | Single-parent view for linked children: attendance summaries, academic marks and feedback, school timetable, fee invoices, and formal school notices. Strict child isolation. |
| **PR-007** | Student Digital Workspace | Ch. 10 (§10.1–10.2) | Student portal for personal timetable, assignments, teacher feedback, and announcements with age-appropriate boundaries. |
| **PR-008** | Student Life & Extracurriculars (Prestige Life) | Ch. 11 (§11.1–11.3) | Tracking of sports, clubs, and cultural activities, participant rosters, and guardian consent records. |
| **PR-009** | Tuition, Billing & Reconciliation (Prestige Finance) | Ch. 12 (§12.1–12.4) | Tuition fee schedule, invoice generation per term/student, payment tracking with explicit states (`PENDING`, `CONFIRMED`, `FAILED`, `REVERSED`), receipts, and debtor balances. |
| **PR-010** | Leadership Command Centre (Prestige Insight) | Ch. 13 (§13.1–13.3) | Executive oversight: active enrolment, aggregate attendance rate, academic attainment average, fee collection ratio, and an actionable Leadership Exception Queue. |
| **PR-011** | Controlled Communications (Prestige Connect) | Ch. 14 (§14.1–14.3) | Event-driven notices (attendance alerts, grade publication, invoice alerts) with delivery audit logging and parent-teacher boundary rules. |
| **PR-012** | Role-Based Access Control & Approvals | Ch. 15 (§15.1–15.2) | Strict multi-role separation (Director, Administrator, Teacher, Finance Officer, Guardian, Student) with relationship-based data authorization. |
| **PR-013** | Audit Trails & Records Governance | Ch. 16 (§16.1–16.2) | Immutability of sensitive updates: timestamps, user provenance, before/after values on student edits, grade revisions, and fee allocations. |
| **PR-014** | Mobile-First & Multilingual Readiness | Ch. 2, 17 | Core UI usable on 360px–420px mobile viewports; Portuguese/English linguistic awareness for curriculum and formal reporting terms. |

---

### 2.2 Engineering Requirements (EN-xxx)

| ID | Title | Technical Specification |
| :--- | :--- | :--- |
| **EN-001** | Modern Next.js Architecture | Next.js App Router, TypeScript strict mode, React Server Components where beneficial, clean separation of concerns. |
| **EN-002** | Persistent Application Shell | Desktop sidebar, mobile top/bottom navigation, persistent header, user profile/logout controls. Shell does not remount on route transitions. |
| **EN-003** | PostgreSQL Persistence & Prisma ORM | Relational schema with foreign keys, server-generated UUIDs/CUIDs, indexes, decimal/minor-unit currency handling, and explicit tenant scoping. |
| **EN-004** | Server-Side Validation | Zod schema validation on every client input before database mutations. Defensive typing and actionable error messages. |
| **EN-005** | Secure Session Authentication | Session cookies with `HttpOnly`, `SameSite=Lax`, `Secure` in production; salted password hashing; server-side role and tenant verification. |
| **EN-006** | Progressive Web App (PWA) Foundation | Compliant Web App Manifest (`manifest.json`), brand-styled icons (standard and maskable), standalone display mode, safe service worker. |
| **EN-007** | Safe Service Worker Caching & Offline Fallback | Cache-first only for immutable versioned static assets; network-only/network-first for authenticated data; dedicated offline fallback page (`/~offline`); no stale authenticated data leaks. |
| **EN-008** | Client Cache Revalidation | TanStack Query or server-action `revalidatePath` to keep directory, rosters, and profile views instantly coherent without full document reload. |
| **EN-009** | Idempotency & Duplicate Protection | Submission state locking, disabled buttons during mutation, server-level uniqueness constraints to prevent duplicate enrollments or records. |
| **EN-010** | Automated Test Verification | Vitest unit tests for schemas and domain logic; Playwright end-to-end suite covering all 20 non-negotiable scenarios. |

---

### 2.3 Demonstration Enhancements (DX-xxx)

| ID | Title | Enhancement Intent |
| :--- | :--- | :--- |
| **DX-001** | Fictional Demonstration Dataset | Fictional school "Prestige International Academy, Maputo", populated with realistic synthetic records: classes, teachers, students, attendance, grades, and invoices. |
| **DX-002** | Quick Demo Role Switcher | Seamless one-click demo account selector on login page to facilitate swift switching between Administrator, Teacher, Guardian, and Director personas. |
| **DX-003** | Authentic Flectēre Visual Tokens | Faithful implementation of proposal visual identity: Flectēre Navy (`#0F2043`), Crimson (`#B41E2D`), Slate (`#708090`), Light (`#F5F7FA`), Gold (`#B88B36`), Green (`#267058`). |
| **DX-004** | PWA Installation Guidance UI | Mobile and desktop installation banners with customized instructions for iOS Safari ("Add to Home Screen") and Android/Chromium. |
| **DX-005** | Network Resilience Status Indicator | Interactive top bar showing online/offline status with graceful offline recovery notification. |

---

### 2.4 Deferred Capabilities (DF-xxx)

| ID | Title | Deferred Reason & Demo Handling |
| :--- | :--- | :--- |
| **DF-001** | Live Telecommunications Gateways | Real Mozambique telecom M-Pesa / e-Mola APIs require active corporate merchant contracts; demonstration simulates verified settlement states and receipts. |
| **DF-002** | Live SMS / WhatsApp Broadcasts | Real SMS gateway delivery requires localized aggregator accounts; demonstration implements persistent in-app communication logs and triggers. |
| **DF-003** | Real-Time Bus Fleet GPS Tracking | Real-time vehicle telematics require dedicated hardware installation; school transport stops and route schedules are represented via standard records. |
| **DF-004** | Native App Store Binaries | Packaging for Apple App Store / Google Play via Capacitor/React Native is planned for later phase; modern installable PWA provides the immediate mobile-first client experience. |
| **DF-005** | Automated Predictive AI Grading | Proposal §16 explicitly mandates operational intelligence before opaque predictive AI; statistical dashboards are backed by genuine recorded marks. |

---

## 3. Assumptions & Scope Boundaries

1. **Institutional Context**: Fictional school is modelled as a prestigious K-12 bilingual academy in Maputo, Mozambique, running Cambridge and national curricula.
2. **Currency Handling**: Financial values are recorded in Mozambican Meticais (MZN) using integer minor units or high-precision decimals to eliminate floating-point inaccuracies.
3. **Data Privacy**: Child safeguarding rules prevent any student's marks or disciplinary notes from being viewed by other students or unauthorized guardians.
4. **Offline Capability**: The PWA service worker provides a reassuring offline fallback screen with system status; offline editing is deliberately deferred to avoid unsafe out-of-order mutations.
