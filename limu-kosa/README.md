# 🎨 Limu Kosa Woreda Web Portal - Frontend (`limu-kosa`)

The web frontend for the **Limu Kosa Woreda Government Administration** public portal and integrated CMS Admin Panel, built using Next.js 16 (App Router), React 19, Tailwind CSS, and TypeScript.

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
- Instant switching between **English (EN)**, **Amharic (AM)**, and **Afaan Oromoo (OM)**.
- Automated client-side translation fallback for dynamic database records.

### 2. Public Portal Pages
- **Homepage (`/`)**: Animated hero section slider, woreda statistical metrics, public notices, and highlighted news.
- **Departments (`/departments`, `/departments/[id]`)**: Detailed public listings of woreda administrative offices.
- **News & Announcements (`/news`, `/news/[slug]`, `/announcements`)**: Searchable and paginated news archive.
- **Leadership (`/leadership`)**: Biographies and contact info for woreda leadership.
- **Development Projects (`/projects`, `/projects/[slug]`)**: Overview of infrastructure and social initiatives.
- **Tourism & Culture (`/tourism`)**: Spotlighting Limu shade-grown coffee trails, Bolo Caves, and Lake Cheleleki.
- **Downloads (`/downloads`)**: Downloadable public reports and government publications.
- **Gallery (`/gallery`)**: Photo gallery with category filtering.
- **Contact Form (`/contact`)**: Public citizen message dispatcher.

### 3. Integrated Admin Management Portal (`/admin`)
- **HttpOnly Session Manager**: Handles refresh token recovery, dual-token access, and automatic session logout.
- **Collapsible Icon Navigation Bar**: Side panel collapses to a compact icon-only strip with hover tooltips or expands to full width.
- **Full Screen Editor**: Overlapping fullscreen modal window for spacious content creation with side-by-side Live Preview.
- **Custom Confirmation Modals**: Confirmation dialogs for Delete and Edit operations.
- **Role-Based Views**: Automatically restricts management tabs (e.g. `Users`) based on user role (`ADMIN` vs `EDITOR`).
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

## 🌐 Deployment (Vercel / Netlify / Render)

When deploying to [Vercel](https://vercel.com/) or similar platforms:
1. Set the root directory to `limu-kosa`.
2. Add the environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-api-url.onrender.com/api`.
3. Build command: `npm run build`.
