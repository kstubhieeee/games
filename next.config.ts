import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Disabling type checking is not recommended
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // Disabling ESLint is not recommended
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
