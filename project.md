# 🏛️ Limu Kosa Woreda Government Portal & Administration CMS — Project Blueprint (`project.md`)

## 1. Project Overview

The **Limu Kosa Woreda Government Portal & Administration CMS** is the official digital information and governance platform for Limu Kosa Woreda Administration (Jimma Zone, Oromia Region, Ethiopia).

The platform serves two primary purposes:
1. **Public Web Portal**: Provides citizens, investors, and visitors with official government announcements, department responsibilities, executive leadership biographies, development project tracking, tourism highlights (coffee trails, natural caves, wetlands), and official downloadable documents in three languages (**English**, **Amharic**, and **Afaan Oromoo**).
2. **Integrated Administration CMS**: A secure, modern web dashboard enabling authorized government administrators and editors to create, review, update, publish, and delete portal content in real time with side-by-side live previews.

---

## 2. Technology Stack

### Frontend (`limu-kosa/`)
- **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router with Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization (i18n)**: Custom React Context engine supporting English (`en`), Amharic (`am`), and Afaan Oromoo (`om`) with dynamic database fallbacks.
- **Hosting**: [Vercel](https://vercel.com/) (Serverless Next.js edge deployment)

### Backend API (`limu-kosa-api/`)
- **Framework**: [NestJS 11](https://nestjs.com/) (TypeScript)
- **Database ORM**: [Prisma ORM 6](https://www.prisma.io/)
- **Database**: PostgreSQL hosted on [Neon.tech](https://neon.tech/) (configured for transaction-mode PgBouncer connection pooling)
- **Authentication**: Passport.js JWT with dual-token HttpOnly SameSite cookie strategy
- **Email Delivery**:
  - **Google Gmail REST API (over HTTPS Port 443)** for cloud platforms (Render) to bypass SMTP port restrictions.
  - **Resend HTTPS REST API** as a cloud alternative.
  - **Nodemailer SMTP** (with IPv4 `family: 4` enforcement) for local and standard VPS environments.
- **Cloud Storage**: [ImageKit.io](https://imagekit.io/) CDN storage with automatic local filesystem fallback.
- **Hosting**: [Render.com](https://render.com/) (Web Service container)

---

## 3. High-Level Architecture

```
                  +----------------------------------------------+
                  |         Public Citizens / Visitors           |
                  +----------------------------------------------+
                                         │
                                         ▼
+─────────────────────────────────────────────────────────────────────────────+
|                         Frontend Web Portal (Vercel)                        |
|                                                                             |
|  • Public Trilingual Pages: Home, About, News, Depts, Leadership, Projects |
|  • Tourism, Documents, Gallery, Contact Form                                |
|  • Integrated Admin Portal (/admin) with Dual-Token Session Guard           |
|  • Full Screen Editor & Live Preview                                        |
+─────────────────────────────────────────────────────────────────────────────+
                                         │  HTTPS REST / JSON
                                         ▼
+─────────────────────────────────────────────────────────────────────────────+
|                        Backend REST API (Render.com)                        |
|                                                                             |
|  • /api/public/*  -> Unrestricted read-only endpoints (cached, paginated)   |
|  • /api/auth/*    -> Login, Refresh, Forgot/Reset Password, User RBAC        |
|  • /api/admin/*   -> Authenticated content CRUD, uploads, system settings   |
+───────────────────────────┬──────────────────────┬──────────────────────────+
                            │                      │
       Prisma ORM (PgBouncer)                      │ HTTPS REST (Port 443)
                            ▼                      ▼
           +─────────────────────────+    +─────────────────────────────+
           |  Neon PostgreSQL Cloud  |    |  External Cloud Services    |
           |                         |    |                             |
           |  • Users & RBAC         |    |  • Google Gmail REST API    |
           |  • Refresh Tokens       |    |  • Resend HTTPS API         |
           |  • Reset Tokens         |    |  • ImageKit.io Media CDN    |
           |  • Content Registry     |    +─────────────────────────────+
           +─────────────────────────+
```

---

## 4. Core System Modules

### 4.1. Public Portal
- **Homepage (`/`)**: Hero banner slider with woreda highlights, key facts & statistics counter, quick links, and latest announcements.
- **About Woreda (`/about`)**: Historic Limmu-Ennarea kingdom origins, agro-ecological zones, demographic profiles, and economic foundations.
- **Departments (`/departments`, `/departments/[id]`)**: Sector office directories, primary public duties, major programs, and contact channels.
- **News & Announcements (`/news`, `/news/[slug]`, `/announcements`)**: Searchable and paginated municipal news archive.
- **Leadership (`/leadership`)**: Official executive directory with portrait photographs, responsibilities, and public office hours.
- **Development Projects (`/projects`, `/projects/[slug]`)**: Public infrastructure and community development tracking.
- **Tourism & Heritage (`/tourism`)**: Spotlighting wild forest Arabica coffee trails, Bolo Caves, Lake Cheleleki, and eco-sites.
- **Document Center (`/downloads`)**: Downloadable government reports, public notices, and guidelines.
- **Photo Gallery (`/gallery`)**: Categorized photo showcase of community development programs.
- **Contact Channel (`/contact`)**: Secure citizen inquiry form connected directly to the CMS messages inbox.

### 4.2. Administration CMS & Security
- **Role-Based Access Control (RBAC)**:
  - `ADMIN`: Full system authority, including user creation, user deletion, password resets, and all content operations.
  - `EDITOR`: Content creation, editing, and publishing across all registries. The **Users** management tab is completely hidden and guarded against unauthorized access.
- **Session Lifecycle**: Short-lived JWT Access Tokens combined with automatic background token rotation via HttpOnly SameSite Refresh Cookies.
- **Password Management**:
  - Show/Hide password toggle buttons (`Eye` / `EyeOff`) across all forms.
  - User self-service **Forgot Password** workflow delivering 1-hour secure reset tokens via email.
  - Administrator user password reset tools inside the CMS.
  - Interactive CLI reset script (`npm run reset-password`) for direct server-level recovery.
- **Content Editor Suite**:
  - Collapsible icon navigation panel with floating hover tooltips.
  - Full Screen overlay editor with side-by-side synchronous Live Preview.
  - Custom branded modal dialogs for Delete and Update actions.
  - Multi-language input tabs (`EN`, `አማ`, `ORO`) with automated fallback caching.

---

## 5. Database Schema Entities (Prisma)

- **`User`**: Admin & Editor credentials (`id`, `name`, `email`, `passwordHash`, `role`, timestamps).
- **`RefreshToken`**: Session tracking table for rotation and immediate revocation upon logout.
- **`PasswordResetToken`**: Single-use cryptographically hashed reset tokens with 1-hour expiration.
- **`ContentItem`**: Polymorphic registry for News, Announcements, Projects, Investment, Tourism, and Site Settings.
- **`Department`**: Sector offices with trilingual name, responsibilities, programs, contact, and cover image.
- **`Leader`**: Executive profiles with name, title, biography, responsibilities, contact, and photo.
- **`GalleryImage`**: Curated woreda photographs with category, image URL, and alt text.
- **`DownloadItem`**: Official downloadable files and reports with category, file URL, and description.
- **`ContactMessage`**: Inbound citizen feedback, questions, and reports.

---

## 6. Deployment Topography

| Component | Provider | URL / Endpoint |
| :--- | :--- | :--- |
| **Frontend Application** | Vercel | `https://limu-kosa.vercel.app` |
| **Backend REST API** | Render.com | `https://limu-kosa-api.onrender.com` |
| **Relational Database** | Neon.tech | PostgreSQL with PgBouncer connection pool |
| **Media & CDN** | ImageKit.io | Cloud image hosting & thumbnail transformation |
| **Email Dispatch** | Google Gmail API | HTTPS Port 443 OAuth2 authenticated delivery |
