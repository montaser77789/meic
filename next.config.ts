/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // أو الحجم اللي يناسبك، مثلاً 10 ميجا
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // يسمح بكل المضيفات عبر http
      },
      {
        protocol: "https",
        hostname: "**", // يسمح بكل المضيفات عبر https
      },
    ],
  },
};

module.exports = nextConfig;
