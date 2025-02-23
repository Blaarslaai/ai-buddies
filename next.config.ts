import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ["iqppghcmtnenpcmsespb.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/images/stock/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "iqppghcmtnenpcmsespb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/profile-pictures/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
