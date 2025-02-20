import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.reflowhq.com",
        port: "",
        pathname: "/media/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/images/stock/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "api.reflowhq.com",
        port: "",
        pathname: "/img/gravatar/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "test-api.reflowhq.com",
        port: "",
        pathname: "/img/gravatar/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
