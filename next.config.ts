import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // a tendere va eliminato
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/images/5jqfesyl/production/**')],
  },
};

export default nextConfig;
