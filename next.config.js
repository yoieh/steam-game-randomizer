/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["steamcdn-a.akamaihd.net", "store.steampowered.com"],
  },
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
