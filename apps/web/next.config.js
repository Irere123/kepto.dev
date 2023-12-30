/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kepto/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
