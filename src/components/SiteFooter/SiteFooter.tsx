import type { SiteConfig } from "@/types/site";
import { SocialIcon } from "./SocialIcon";
import styles from "./SiteFooter.module.css";

type Props = {
  brand: SiteConfig["brand"];
  footer: SiteConfig["footer"];
  contact: SiteConfig["contact"];
  social: SiteConfig["social"];
};

export function SiteFooter({ brand, footer, contact, social }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <p className={styles.brandName}>{brand.name}</p>
            <p className={styles.tagline}>{brand.tagline}</p>
            <div className={styles.social}>
              {social.map((s) => (
                <a
                  key={s.href + s.label}
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <nav className={styles.navCol} aria-label="Нижнее меню">
            <ul className={styles.navList}>
              {footer.nav.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.navCol}>
            <p className={styles.colTitle}>{footer.serviceLinksTitle}</p>
            <ul className={styles.navList}>
              {footer.serviceLinks.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.contactCol}>
            <a className={styles.phone} href={contact.phoneHref}>
              {contact.phone}
            </a>
            <p className={styles.schedule}>{contact.schedule}</p>
            <a
              className={styles.booking}
              href={contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.bookingLabel}
            </a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>{footer.copyright}</p>
          {footer.credits ? (
            <p className={styles.credits}>{footer.credits}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
