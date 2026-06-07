import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Replace 'domains' with 'remotePatterns' for better security
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Add other hostnames used by Exness/HFM logos if applicable
    ],
  },
  // In Next.js 15+, serverActions are enabled by default
  // You can likely remove the experimental flag unless you have specific sub-configs
};

export default nextConfig;
