# Base image
FROM node:20-alpine AS builder

# Install system dependencies needed for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm ci

# Set dummy DATABASE_URL for build-time Prisma client generation
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner

# Install system dependencies needed for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy built app and dependencies from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Environment variables defaults
ENV PORT=4000
ENV NODE_ENV=production
ENV UPLOAD_DIR=uploads

EXPOSE 4000

# Run migrations, seed database, and start the application
CMD npx prisma db push && npx prisma db seed ; node dist/main.js
