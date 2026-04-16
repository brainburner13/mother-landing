import Link from "next/link";
import type { SiteConfig } from "@/types/site";
import { ContactBookTrigger } from "@/components/ContactBook/ContactBookTrigger";
import {
  OfficeCarousel,
  type OfficeSlide,
} from "@/components/OfficeCarousel/OfficeCarousel";
import modalStyles from "@/components/ContactBook/ContactBookModal.module.css";
import styles from "./Hero.module.css";

export type HeroMetroLink = {
  label: string;
  href: string;
};

type Props = {
  hero: SiteConfig["hero"];
  metroLinks: HeroMetroLink[];
  officeSlides: OfficeSlide[];
};

export function Hero({ hero, metroLinks, officeSlides }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.intro}>{hero.intro}</p>
          <div className={styles.subtitle}>
            {metroLinks.map((m, i) => (
              <span key={m.href + m.label}>
                {i > 0 ? <span className={styles.subtitleSep}>, </span> : null}
                <a
                  href={m.href}
                  className={styles.metroLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {m.label}
                </a>
              </span>
            ))}
          </div>
          <div className={styles.ctas}>
            <Link href={hero.primaryCta.href} className={modalStyles.triggerHeroPrimary}>
              {hero.primaryCta.label}
            </Link>
            <ContactBookTrigger variant="heroGhost">
              {hero.secondaryCta.label}
            </ContactBookTrigger>
          </div>
        </div>
        <div className={styles.visual}>
          <p className={styles.visualTitle}>Наши кабинеты</p>
          <OfficeCarousel slides={officeSlides} variant="hero" />
        </div>
      </div>
    </section>
  );
}
