# Limu Kosa Government Administration API (Backend)

This is the NestJS backend API serving the Limu Kosa Woreda Government Administration CMS and public portal. It integrates with PostgreSQL using Prisma ORM and handles file uploads via ImageKit.io CDN.

---

## Tech Stack
*   **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
*   **Database ORM**: [Prisma](https://www.prisma.io/)
*   **Database**: PostgreSQL
*   **Authentication**: Passport.js with JWT Strategy
*   **File Storage**: [ImageKit.io](https://imagekit.io/) CDN (with graceful local disk storage fallback)

---

## Environment Configuration
Create a `.env` file in the root directory (`limu-kosa-api/`) and add:

```env
PORT=4000
DATABASE_URL="postgresql://postgres:1412thue@localhost:5432/limu_kosa?schema=public"
JWT_SECRET="super-secret-jwt-key"
CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001"

# ImageKit.io Credentials (Required for cloud uploads. If omitted, falls back to local uploads)
IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id/"
```

---

## Local Setup

### 1. Installation
```bash
npm install
```

### 2. Database Sync
Push Prisma models to your local PostgreSQL instance:
```bash
npx prisma db push
```

### 3. Database Seeding
Seed initial woreda info, departments, leaders, news, and project articles:
```bash
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run start:dev
```
The server starts locally at `http://localhost:4000`.

---

## Render.com Deployment Guide

To deploy the NestJS API to [Render](https://render.com/), follow these steps:

### Option A: One-Click Blueprint Deployment (Recommended)
1. Commit the changes to your Git repository (GitHub/GitLab).
2. Go to your Render Dashboard, click **New +** and select **Blueprint**.
3. Connect your repository. Render will automatically read the `render.yaml` configuration file.
4. Set the value of the `DATABASE_URL` environment variable to your production PostgreSQL connection string.
5. Provide your **ImageKit.io** credentials in the fields shown.
6. Click **Approve**. Render will provision your database and Web Service.

### Option B: Manual Web Service Setup
1. On Render, click **New +** and select **Web Service**.
2. Connect your Git repository.
3. Configure the service settings:
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build && npx prisma generate`
    *   **Start Command**: `node dist/main.js`
4. Add the required Environment Variables in the **Env** tab:
    *   `DATABASE_URL`: *(Your production PostgreSQL URL)*
    *   `JWT_SECRET`: *(A secure random string)*
    *   `CORS_ORIGINS`: `*` *(or your frontend URL once deployed)*
    *   `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` *(From your ImageKit dashboard)*
5. Trigger a deploy.

### database Migrations on Render
After your web service is deployed successfully, you can run migrations/push on the production database from your local terminal:
```bash
# Set your DATABASE_URL env variable to the production connection string, then run:
npx prisma db push
```

---

## API Endpoints Reference

### Public API (`/api/public`)
*   `GET /api/public/:resource` - Get all published items (`news`, `announcements`, `departments`, `leaders`, `projects`, `gallery`, `downloads`, `investment`, `tourism`).
*   `GET /api/public/:resource/:idOrSlug` - Get details of an item by ID or slug.

### Admin CMS API (`/api/admin`)
*   `POST /api/auth/login` - Admin authentication. Returns JWT token. (Seed login: `admin@limukosa.gov.et` / `Admin@12345`).
*   `GET /api/admin/:resource` - List registry items (requires Auth).
*   `POST /api/admin/:resource` - Create registry item (requires Auth).
*   `PATCH /api/admin/:resource/:id` - Edit registry item (requires Auth).
*   `DELETE /api/admin/:resource/:id` - Delete registry item (requires Auth).
*   `POST /api/admin/uploads/file` - Upload file directly to ImageKit.io CDN (requires Auth). Returns the public CDN URL.
