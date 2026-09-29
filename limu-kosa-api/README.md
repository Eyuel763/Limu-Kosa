# ⚙️ Limu Kosa Woreda CMS API - Backend (`limu-kosa-api`)

The backend REST API service for the **Limu Kosa Woreda Government Administration** web portal and CMS, built using NestJS, Prisma ORM, PostgreSQL, Passport.js JWT, and ImageKit.io CDN storage.

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
- **Database ORM**: [Prisma ORM](https://www.prisma.io/)
- **Database**: PostgreSQL (compatible with [Neon.tech](https://neon.tech/) & PgBouncer multiplexing)
- **Authentication**: Passport.js with dual Access Token & HttpOnly Refresh Cookie Strategy
- **Cloud Storage**: [ImageKit.io](https://imagekit.io/) CDN (with automatic local disk fallback)

---

## 🔒 Security & Backend Architecture

### 1. Dual-Token Architecture & Cookie Security
- **Access Tokens**: Short-lived JWT Bearer tokens passed via headers or credentials for API authorization.
- **Refresh Tokens**: HttpOnly, SameSite, Secure cookies stored in the browser that automatically refresh access tokens (`POST /api/auth/refresh`) without exposing refresh keys to JavaScript memory.
- **Database Revocation List**: Active refresh tokens are stored in the database and revoked upon logout or password change.

### 2. Neon PgBouncer Optimization
- Optimized queries to execute sequentially (`await count` then `await findMany`) rather than concurrent `Promise.all` batches to maintain stability over transaction-mode PgBouncer connection pools.

### 3. Unique Slug Generation (`ensureUniqueSlug`)
- Automatic collision detection and unique numerical suffix appending (`-2`, `-3`) for newly created content items and departments, preventing duplicate key database failures (`P2002`).

---

## 📋 Environment Configuration

Create a `.env` file in `limu-kosa-api/`:

```env
# Server Port
PORT=4000

# PostgreSQL Connection String
DATABASE_URL="postgresql://user:password@localhost:5432/limu_kosa?schema=public"

# JWT Auth Secret
JWT_SECRET="your-secure-random-jwt-secret-key"

# Allowed CORS Origins (Comma-separated)
CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"

# Optional Cloud Storage (ImageKit.io CDN)
IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id/"
```

---

## 🚀 Setup & Local Execution

### 1. Installation
```bash
npm install
```

### 2. Database Synchronization & Migration
Sync Prisma schema models with your database instance:
```bash
npx prisma db push
```

### 3. Database Seeding
Populate initial woreda information, leadership entries, department registries, news, and project articles:
```bash
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run start:dev
```
*API will run at `http://localhost:4000`.*

---

## 📡 API Endpoints Reference

### 🌐 Public Endpoints (`/api/public`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/public/:resource` | Get published entries with pagination & search (`news`, `announcements`, `departments`, `leaders`, `projects`, `gallery`, `downloads`, `investment`, `tourism`) |
| `GET` | `/api/public/:resource/:idOrSlug` | Get single entry by ID or unique slug |
| `POST` | `/api/public/messages` | Submit citizen contact form message |

### 🔐 Auth Endpoints (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user & issue access token + refresh cookie |
| `POST` | `/api/auth/refresh` | Refresh access token using HttpOnly cookie |
| `POST` | `/api/auth/logout` | Revoke refresh session and clear cookie |
| `POST` | `/api/auth/change-password` | Change password for authenticated admin |
| `GET` | `/api/auth/users` | List system users (ADMIN role required) |
| `POST` | `/api/auth/users` | Create user (ADMIN role required) |
| `DELETE` | `/api/auth/users/:id` | Delete user (ADMIN role required) |

### ⚙️ Admin CMS Endpoints (`/api/admin`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/:resource?page=1&limit=10&search=term` | List registry entries with pagination & DB search |
| `POST` | `/api/admin/:resource` | Create new registry entry |
| `PATCH` | `/api/admin/:resource/:id` | Update existing registry entry |
| `DELETE` | `/api/admin/:resource/:id` | Delete registry entry |
| `POST` | `/api/admin/uploads/file` | Upload file/image to ImageKit CDN (returns CDN URL) |

---

## ☁️ Production Deployment (Render.com)

### Web Service Build & Start Commands
- **Build Command**: `npm install && npm run build && npx prisma generate`
- **Start Command**: `node dist/src/main.js`

### Deployment Steps
1. Connect your GitHub repository on Render.
2. Add environment variables (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT`).
3. Deploy the service and run `npx prisma db push` against the production database URL.
