# 🎨 Limu Kosa Woreda Web Portal - Frontend (`limu-kosa`)

The modern web frontend for the **Limu Kosa Woreda Government Administration** public portal and integrated CMS Admin Panel, built using Next.js 16 (App Router), React 19, Tailwind CSS, Lucide Icons, and TypeScript.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router with Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language & Types**: [TypeScript](https://www.typescriptlang.org/)

---

## ✨ Features & Architecture

### 1. Trilingual i18n Context (`LanguageContext.tsx`)
- Instant switching between **English (EN)**, **Amharic (አማ)**, and **Afaan Oromoo (ORO)** without reloading.
- Automated client-side translation fallback for dynamic database records.
- Clean language selector tabs on multilingual form fields avoiding operating-system-specific flag rendering glitches.

### 2. Public Portal Pages
- **Homepage (`/`)**: Animated hero section slider, woreda statistical metrics, public notices, and highlighted news.
- **Departments (`/departments`, `/departments/[id]`)**: Comprehensive public listings of woreda administrative offices and responsibilities.
- **News & Announcements (`/news`, `/news/[slug]`, `/announcements`)**: Searchable and paginated news archive.
- **Leadership (`/leadership`)**: Official biographies, position profiles, and contacts for woreda leaders.
- **Development Projects (`/projects`, `/projects/[slug]`)**: Overview of public infrastructure and agricultural initiatives.
- **Tourism & Culture (`/tourism`)**: Spotlighting Limu shade-grown coffee trails, Bolo Caves, and Cheleleki wetlands.
- **Downloads (`/downloads`)**: Downloadable public reports, directives, and government publications.
- **Gallery (`/gallery`)**: Photo gallery with category filtering.
- **Contact Form (`/contact`)**: Citizen message dispatcher with validation.

### 3. Integrated Admin Management Portal (`/admin`)
- **HttpOnly Session Manager**: Handles refresh token recovery, dual-token access, and automatic session logout.
- **Forgot Password Workflow**:
  - Direct password reset request form from the login screen.
  - Dedicated "Set New Password" mode with automatic token capture from email links.
- **Password Visibility Toggles**: Interactive show/hide eye toggle icons (`Eye` / `EyeOff`) across all password fields (Login, Create User, Reset Password, Site Settings Security).
- **Role-Based Access Control (RBAC)**: Automatically restricts sensitive views—the **Users** management tab is exclusively visible to users with the `ADMIN` role and hidden from `EDITOR` accounts.
- **Collapsible Icon Navigation Bar**: Sidebar collapses to a compact icon-only strip with hover tooltips or expands to full width.
- **Full Screen Editor**: Overlapping fullscreen modal window for spacious content creation with side-by-side Live Preview.
- **Custom Confirmation Modals**: Built-in modal dialogs for Delete and Edit operations.
- **File Uploader**: Image uploading with CDN previews and one-click image removal.

---

## 🚀 Environment Setup & Installation

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Create `.env.local` in the `limu-kosa/` directory:

```env
# Point to your NestJS Backend API URL
NEXT_PUBLIC_API_URL="http://127.0.0.1:4000/api"
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## 🌐 Deployment (Vercel / Netlify)

When deploying to [Vercel](https://vercel.com/):
1. Import your GitHub repository and set the root directory to `limu-kosa`.
2. Add the environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-api-url.onrender.com/api
   ```
3. Build command: `npm run build` (Output directory: `.next`).
