import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/Svetra-Icon.svg",
      },
    ];
  },
};

export default nextConfig;
