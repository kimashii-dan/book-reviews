import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   nodeMiddleware: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jackiemantey.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
