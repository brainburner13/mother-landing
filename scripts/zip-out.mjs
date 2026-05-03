import { existsSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const zipPath = join(root, "landing-out.zip");
const outDir = join(root, "out");

if (existsSync(zipPath)) unlinkSync(zipPath);

const r = spawnSync("tar", ["-a", "-c", "-f", zipPath, "-C", outDir, "."], {
  stdio: "inherit",
  shell: false,
});

if (r.status !== 0) {
  console.error(
    "Не удалось создать landing-out.zip через tar. На Windows нужен tar (есть в Windows 10+).",
  );
  process.exit(r.status ?? 1);
}

console.log("Готово:", zipPath);
