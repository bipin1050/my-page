import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Keep links from the old CRA site working.
    return [{ source: "/profile", destination: "/", permanent: true }];
  },
};

export default nextConfig;
