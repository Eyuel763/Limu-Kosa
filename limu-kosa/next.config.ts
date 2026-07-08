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
    ],
  },
};

export default nextConfig;
