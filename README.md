# 🇪🇹 Limu Kosa Woreda Government Portal & Administration CMS

Official full-stack web application and Content Management System (CMS) for **Limu Kosa Woreda Government Administration** (Jimma Zone, Oromia Region, Ethiopia).

This platform connects the public with woreda administration updates, official documents, department services, local development projects, shade-grown Arabica coffee heritage, and eco-tourism opportunities—powered by an enterprise-grade, trilingual management system.

---

## 🏛️ System Architecture

The project is structured as a decoupled full-stack monorepo:

```
Limu Kosa Project/
├── limu-kosa/          # Frontend: Next.js 16 (App Router), React 19, Tailwind CSS, Lucide
└── limu-kosa-api/      # Backend: NestJS 11, Prisma ORM 6, PostgreSQL, Passport JWT, Nodemailer
```

- **Frontend (`limu-kosa/`)**: High-performance public portal with Next.js App Router, dynamic server/client rendering, trilingual internationalization (EN/AM/OM), responsive layout, and an integrated Admin Management Portal.
- **Backend (`limu-kosa-api/`)**: Enterprise NestJS REST API with Prisma ORM connecting to Neon PostgreSQL, dual-token HttpOnly cookie session management, PgBouncer multiplexing compatibility, ImageKit.io CDN storage, and dual HTTPS email dispatch engines.

---

## ✨ Key Platform Features

### 🌐 Trilingual Internationalization (i18n)
- Real-time language switching across **English (EN)**, **Amharic (አማ)**, and **Afaan Oromoo (ORO)**.
- Dynamic translation fallback engine with automated caching for public content and administrative entries.
- Clean localized input controls for titles, bodies, and descriptions without OS-specific flag rendering glitches.

### 🛡️ Enterprise-Grade Admin Security & Authentication
- **Dual-Token Authentication**: Short-lived JWT Access Tokens combined with HttpOnly SameSite Refresh Cookies and database revocation list.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` (Full Management + User Control) and `EDITOR` (Content Operations only). The **Users** tab is strictly restricted to `ADMIN` accounts.
- **Forgot Password Workflow**:
  - Secure token-based password reset links valid for 1 hour.
  - Multi-tier email delivery:
    1. **Google Gmail REST API (over HTTPS Port 443)**: Bypasses cloud host SMTP port blocks with zero timeout issues.
    2. **Resend HTTPS REST API**: Fast cloud delivery via standard HTTPS.
    3. **Nodemailer SMTP Fallback**: Configured with IPv4 socket enforcement (`family: 4`) and SSL.
    4. **Console Fallback**: Direct link logging in terminal for local testing.
  - Token is automatically captured from URL parameters, keeping reset forms clean and user-friendly.
- **Password Visibility Toggles**: Interactive show/hide eye icons (`Eye` / `EyeOff`) across all password input fields.
- **Session Protection**: Automatic silent session renewal, refresh rotation, and instant revocation on logout or password change.

### ⚙️ Content Administration & Editing UI
- **Collapsible Icon Navigation**: Sidebar collapses to an icon-only strip with hover tooltip popups or expands to full width.
- **Full Screen Editor**: Overlapping fullscreen modal window featuring side-by-side Live Preview and Content Editor.
- **Custom Confirmation Modals**: Custom UI dialogs for Delete and Save/Edit actions replacing native browser alerts.
- **Media Management**: Built-in cloud uploader with instant thumbnail previews and one-click removal.

### 🔍 Database-Wide Search & Pagination
- Backend-driven pagination (10 items per page) across all public pages and admin tabs (`News`, `Announcements`, `Departments`, `Leadership`, `Projects`, `Gallery`, `Downloads`, `Investment`, `Tourism`, `Messages`).
- Case-insensitive database `ILIKE` search filtering across all pages and records simultaneously.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18, v20, or v22+
- [PostgreSQL](https://www.postgresql.org/) database (or a free [Neon PostgreSQL](https://neon.tech/) instance)

### 1. Configure & Start Backend (`limu-kosa-api`)

```bash
cd limu-kosa-api
npm install
```

Create a `.env` file in `limu-kosa-api/`:

```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/limu_kosa?schema=public"
JWT_SECRET="your-secure-random-jwt-secret-key"
CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000,https://limu-kosa.vercel.app"
FRONTEND_URL="http://localhost:3000"

# --- Email Service Options (Pick One) ---
# Option A: Google Gmail REST API (Recommended for Cloud Hosts like Render)
GMAIL_CLIENT_ID="your_google_client_id"
GMAIL_CLIENT_SECRET="your_google_client_secret"
GMAIL_REFRESH_TOKEN="your_google_refresh_token"
GMAIL_USER="your-email@gmail.com"

# Option B: Resend HTTPS API
RESEND_API_KEY="re_your_resend_api_key"
SMTP_FROM="Limu Kosa Admin <onboarding@resend.dev>"

# Option C: Standard SMTP (Local / VPS)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-char-app-password"

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
*Backend API runs at `http://localhost:4000` (Swagger docs at `http://localhost:4000/api`).*

### 2. Configure & Start Frontend (`limu-kosa`)

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

> [!TIP]
> If you ever lose access to your admin account, you can reset passwords directly via the backend CLI tool:
> ```bash
> npm run reset-password
> ```

---

## 📜 Public & Admin Routes Summary

| Route | Description | Access |
| :--- | :--- | :--- |
| `/` | Homepage (Hero slider, woreda statistics, latest news) | Public |
| `/about` | Geography, history, coffee heritage overview | Public |
| `/news` & `/news/[slug]` | Woreda news & announcements with detail pages | Public |
| `/departments` & `/departments/[id]` | Woreda administrative offices & responsibilities | Public |
| `/leadership` | Woreda executive leaders & biographies | Public |
| `/projects` & `/projects/[slug]` | Ongoing development projects & progress tracking | Public |
| `/tourism` | Coffee trail, Bolo Caves, Cheleleki wetlands | Public |
| `/downloads` | Official downloadable documents & reports | Public |
| `/gallery` | Photo gallery of woreda activities | Public |
| `/contact` | Citizen message submission form | Public |
| `/admin` | Integrated Government Administration Panel & CMS | Restricted (Auth) |

---

## 📄 License & Ownership

Developed for **Limu Kosa Woreda Government Administration**, Jimma Zone, Oromia Region, Ethiopia. All rights reserved.
