import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/images/5jqfesyl/production/**')],
  },
};

export default nextConfig;