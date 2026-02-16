import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/philosophy", destination: "/media", permanent: true },
      {
        source: "/resources/downside-checklist",
        destination: "/contact?focus=downside-checklist",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
