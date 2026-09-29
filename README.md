# 🇪🇹 Limu Kosa Woreda Government Portal & Administration CMS

Official full-stack web application and Content Management System (CMS) for **Limu Kosa Woreda Government Administration** (Jimma Zone, Oromia Region, Ethiopia). 

This platform connects the public with woreda administration updates, official documents, department services, local development projects, shade-grown Arabica coffee heritage, and eco-tourism opportunities—powered by a secure, trilingual management system.

---

## 🏛️ System Architecture

The project is structured as a decoupled full-stack monorepo:

```
Limu Kosa Project/
├── limu-kosa/          # Frontend: Next.js 16 (App Router), React 19, Tailwind CSS
└── limu-kosa-api/      # Backend: NestJS, Prisma ORM, PostgreSQL, Passport JWT
```

- **Frontend (`limu-kosa/`)**: High-performance public portal with Next.js App Router, dynamic server/client rendering, trilingual internationalization (EN/AM/OM), responsive layout, and an integrated Admin Management Portal.
- **Backend (`limu-kosa-api/`)**: Enterprise NestJS REST API with Prisma ORM connecting to Neon PostgreSQL, dual-token HttpOnly cookie session management, PgBouncer multiplexing compatibility, and ImageKit.io CDN storage.

---

## ✨ Key Platform Features

### 🌐 Trilingual Internationalization (i18n)
- Seamless real-time language switching across **English 🇬🇧**, **Amharic 🇪🇹 (አማርኛ)**, and **Afaan Oromoo 🌳**.
- Dynamic translation fallback engine with automated caching for public content and administrative entries.

### 🛡️ Enterprise-Grade Admin Security
- **Dual-Token Authentication**: Short-lived JWT Access Tokens combined with HttpOnly SameSite Refresh Cookies and database revocation list.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` (Full Management + User Control) and `EDITOR` (Content Operations).
- **Session Protection**: Automatic silent session renewal, refresh rotation, and instant revocation on logout.

### ⚙️ Content Administration & Editing UI
- **Collapsible Icon Navigation**: Sidebar collapses to an icon-only strip with hover tooltip popups or expands to full width.
- **Full Screen Editor**: Overlapping fullscreen modal window featuring side-by-side Live Preview and Content Editor.
- **Custom Confirmation Modals**: Custom UI dialogs for Delete and Save/Edit actions replacing native browser alerts.
- **Image Management**: Built-in cloud uploader with instant thumbnail previews and one-click image removal.

### 🔍 Database-Wide Search & Pagination
- Backend-driven pagination (10 items per page) across all public pages and admin tabs (`News`, `Announcements`, `Departments`, `Leadership`, `Projects`, `Gallery`, `Downloads`, `Investment`, `Tourism`, `Messages`).
- Database `ILIKE` search filtering across all pages and records simultaneously.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or v20+
- [PostgreSQL](https://www.postgresql.org/) database (or a free [Neon PostgreSQL](https://neon.tech/) instance)

### 1. Clone & Configure Backend

```bash
cd limu-kosa-api
npm install
```

Create a `.env` file in `limu-kosa-api/`:

```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/limu_kosa?schema=public"
JWT_SECRET="your-secure-random-jwt-secret-key"
CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"

# Optional Cloud Storage (ImageKit.io CDN)
IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id/"
```

Initialize Database & Start API:

```bash
npx prisma db push
npm run prisma:seed
npm run start:dev
```
*Backend runs at `http://localhost:4000`.*

### 2. Configure & Start Frontend

Open a new terminal window:

```bash
cd limu-kosa
npm install
```

Create a `.env.local` file in `limu-kosa/`:

```env
NEXT_PUBLIC_API_URL="http://127.0.0.1:4000/api"
```

Start Development Server:

```bash
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

---

## 🔐 Default Admin Credentials (Seeded)

Upon running `npm run prisma:seed` in the backend, default credentials are initialized:

- **Email**: `admin@limukosa.gov.et`
- **Password**: `Admin@12345`
- **Role**: `ADMIN`

---

## 📜 Public & Admin Routes Summary

| Route | Description | Access |
| :--- | :--- | :--- |
| `/` | Homepage (Hero slider, woreda stats, latest news) | Public |
| `/about` | Geography, history, coffee heritage overview | Public |
| `/news` & `/news/[slug]` | Woreda news & announcements with detail pages | Public |
| `/departments` & `/departments/[id]` | Woreda administrative offices & responsibilities | Public |
| `/leadership` | Woreda executive leaders & biographies | Public |
| `/projects` & `/projects/[slug]` | Ongoing development projects & progress | Public |
| `/tourism` | Coffee trail, Bolo Caves, Cheleleki wetlands | Public |
| `/downloads` | Official downloadable documents & reports | Public |
| `/gallery` | Photo gallery of woreda activities | Public |
| `/contact` | Citizen message submission form | Public |
| `/admin` | Integrated Government Administration Panel | Restricted (Auth) |

---

## 📄 License & Ownership

Developed for **Limu Kosa Woreda Government Administration**, Jimma Zone, Oromia Region, Ethiopia. All rights reserved.
