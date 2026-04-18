import Link from "next/link";
import type { CSSProperties } from "react";
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

function renderAnimatedText(text: string, startDelayMs: number, stepMs: number) {
  return text.split("").map((char, index) => {
    const style = {
      animationDelay: `${startDelayMs + index * stepMs}ms`,
    } satisfies CSSProperties;

    if (char === " ") {
      return (
        <span
          key={`space-${index}`}
          className={`${styles.char} ${styles.charSpace}`}
          style={style}
          aria-hidden
        >
          {" "}
        </span>
      );
    }

    return (
      <span key={`${char}-${index}`} className={styles.char} style={style} aria-hidden>
        {char}
      </span>
    );
  });
}

export function Hero({ hero, metroLinks, officeSlides }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.letterWrap} aria-label={hero.title}>
              {renderAnimatedText(hero.title, 30, 14)}
            </span>
          </h1>
          <p className={styles.intro}>
            <span className={styles.letterWrap} aria-label={hero.intro}>
              {renderAnimatedText(hero.intro, 120, 7)}
            </span>
          </p>
          <div className={`${styles.subtitle} ${styles.fadeUpDelayed}`}>
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
          <div className={`${styles.ctas} ${styles.fadeUpMoreDelayed}`}>
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
