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
  const year = new Date().getFullYear();
  const copyrightLine = `© ${footer.copyrightSince} — ${year} ${footer.copyrightRest}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={styles.brandBlock}>
            <p className={styles.brandName}>{brand.name}</p>
            <p className={styles.tagline}>{brand.tagline}</p>
          </div>
          <a className={styles.phone} href={contact.phoneHref}>
            {contact.phone}
          </a>
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
        <p className={styles.copy}>{copyrightLine}</p>
      </div>
    </footer>
  );
}
