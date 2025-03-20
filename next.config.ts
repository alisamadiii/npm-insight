/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/exp4-static",
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
