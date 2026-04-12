import type { NextConfig } from "next";

/**
 * Базовый путь для GitHub Pages, если сайт открывается как …github.io/<репозиторий>/.
 * В GitHub Actions переменная GITHUB_REPOSITORY задаётся автоматически (owner/repo).
 * Локально: `cross-env GITHUB_REPOSITORY=owner/another-landing npm run build`
 * или задайте NEXT_BASE_PATH=another-landing (имя репозитория без слэшей).
 */
function resolveBasePath(): string {
  const raw = process.env.NEXT_BASE_PATH?.trim();
  if (raw) {
    const normalized = raw.replace(/^\/+|\/+$/g, "");
    return normalized ? `/${normalized}` : "";
  }
  const gh = process.env.GITHUB_REPOSITORY;
  if (gh) {
    const segment = gh.split("/")[1]?.trim();
    return segment ? `/${segment}` : "";
  }
  return "";
}

const basePath = resolveBasePath();

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
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
