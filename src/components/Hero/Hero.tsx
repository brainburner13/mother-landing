import Image from "next/image";
import type { SiteConfig } from "@/types/site";
import styles from "./Hero.module.css";

type Props = {
  brand: SiteConfig["brand"];
  hero: SiteConfig["hero"];
};

export function Hero({ brand, hero }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{brand.tagline}</p>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <div className={styles.ctas}>
            <a href={hero.primaryCta.href} className={styles.btnPrimary}>
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className={styles.btnGhost}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className={styles.visual}>
          {hero.image ? (
            <div className={styles.imageFrame}>
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                className={styles.image}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>
          ) : (
            <div className={styles.placeholder} aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}
