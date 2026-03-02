import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/private-dialogue", permanent: true },
      { source: "/media", destination: "/insights", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/philosophy", destination: "/founder-letter", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/login", destination: "/private-dialogue", permanent: true },
      {
        source: "/resources/downside-checklist",
        destination: "/private-dialogue",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
