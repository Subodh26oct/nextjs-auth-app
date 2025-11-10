/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MAILTRAP_USER: process.env.MAILTRAP_USER,
    MAILTRAP_PASS: process.env.MAILTRAP_PASS,
  },
};

module.exports = nextConfig;
