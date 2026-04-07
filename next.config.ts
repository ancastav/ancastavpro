import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/inicio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/agents",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/",
        permanent: true,
      },
      {
        source: "/property-type/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
