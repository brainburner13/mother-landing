import type { NextConfig } from "next";

/**
 * Статический экспорт для GitHub Pages (без Node-сервера).
 * Для репозитория не из корня user.github.io задайте basePath, например:
 *   basePath: "/имя-репозитория",
 *   assetPrefix: "/имя-репозитория",
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
