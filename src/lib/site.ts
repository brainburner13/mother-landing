import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { SiteConfig } from "@/types/site";

const siteJsonPath = join(process.cwd(), "src", "data", "site.json");

/**
 * Читает site.json с диска, чтобы правки в файле сразу были видны в dev
 * (статический import JSON кэшируется бандлером и часто не обновляется на Windows).
 */
export function getSite(): SiteConfig {
  const raw = readFileSync(siteJsonPath, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}
