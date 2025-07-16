/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: "3008",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
