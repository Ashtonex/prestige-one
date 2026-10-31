# Prestige ONE

> **Next-Generation Educational Management & School Portal Platform**  
> *Cambridge International Curriculum & National Curriculum Aligned Institutional System*

Prestige ONE is an enterprise-grade School Information System (SIS) and Institutional Web Portal designed for elite private academies. Built with Next.js 15, React 19, Tailwind CSS, Prisma ORM, and PostgreSQL, the platform delivers a dual-interface experience: a rich public-facing admissions portal and an authenticated operational back-office for administrators, educators, guardians, and students.

---

## 🌟 Key Capabilities & Features

### 1. Public School Showcase & Admissions Portal
- **Multilingual Support**: Real-time language switching between English and Portuguese (`pt-MZ`).
- **Interactive Admissions**: Online application requests, tuition fee estimator, and campus tour bookings.
- **Institutional Discoverability**: Dedicated portals for About, Academics, Admissions, Campus Life, News, and Contact.
- **Brand Identity**: Polished navy-and-gold aesthetic representing academic prestige and authority.

### 2. Operational Back-Office & Dashboard
- **Role-Based Access Control (RBAC)**: Tailored dashboards and permissions for `ADMIN`, `DIRECTOR`, `TEACHER`, `GUARDIAN`, and `STUDENT`.
- **Institutional Metrics**: Live KPI cards covering student enrollment, class allocations, invoice collections, and attendance.
- **Guardian & Student Isolation**: Guardians can only view records, invoices, and attendance for their linked wards.

### 3. Financial & Bursar Management
- **Mozambican Metical (MZN) Support**: Native currency formatting and handling.
- **Invoice Tracking**: Automated invoice generation, status lifecycle (`PAID`, `PENDING`, `OVERDUE`), and payment receipts.

### 4. PWA & Mobile-First Architecture
- Installable Progressive Web App (PWA) shell.
- Touch-friendly attendance register and quick grading controls.
- Fast, secure client navigation powered by Next.js Server Components.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **ORM & Database** | [Prisma 6](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/) |
| **Forms & Validation**| [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Testing** | [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL instance running locally or remotely

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Ashtonex/prestige-one.git
cd prestige-one
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and configure your database connection:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prestige_one?schema=public"
NEXTAUTH_SECRET="your-development-secret-key-at-least-32-chars-long"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed Demo Data
```bash
# Push Prisma schema to PostgreSQL
npm run db:push

# Generate Prisma Client
npm run db:generate

# Seed initial institutional data, academic year, and demo users
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

After running `npm run db:seed`, test the platform using the pre-seeded accounts:

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@prestige.co.mz` | `PrestigeAdmin2026!` |
| **Director** | `director@prestige.co.mz` | `PrestigeDirector2026!` |
| **Teacher** | `teacher@prestige.co.mz` | `PrestigeTeacher2026!` |
| **Guardian** | `guardian@prestige.co.mz` | `PrestigeGuardian2026!` |
| **Student** | `student@prestige.co.mz` | `PrestigeStudent2026!` |

---

## 🧪 Available Scripts

- `npm run dev` – Launch development server on port 3000
- `npm run build` – Build optimized production bundle
- `npm run start` – Run production server
- `npm run typecheck` – Verify TypeScript types (`tsc --noEmit`)
- `npm run lint` – Run Next.js ESLint checks
- `npm run test` – Run Vitest unit tests
- `npm run test:e2e` – Run Playwright end-to-end test suite
- `npm run db:push` – Synchronize Prisma schema with database
- `npm run db:seed` – Seed sample data and demonstration users

---

## 📖 Demonstration Guide & Documentation

A printable demonstration manual and operational guide is included in:
- `docs/Prestige_ONE_Demo_Guide.pdf`

---

## 📄 License & Attribution

Developed for **Prestige International Academy, Maputo, Mozambique** by **Flectēre (Private) Limited**. All rights reserved.
