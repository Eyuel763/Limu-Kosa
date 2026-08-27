import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Render backend - for locally uploaded files served via /uploads/
        protocol: "https",
        hostname: "*.onrender.com",
      },
      {
        // ImageKit.io CDN - for files uploaded via ImageKit
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        // Local Backend - for development environment
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
      },
      {
        // Local Backend - for development environment (localhost)
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
    ],
  },
};

export default nextConfig;
