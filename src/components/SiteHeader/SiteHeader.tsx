import type { NavItem, SiteConfig } from "@/types/site";
import { ContactBookTrigger } from "@/components/ContactBook/ContactBookTrigger";
import { MobileNav } from "./MobileNav";
import styles from "./SiteHeader.module.css";

type Props = {
  brand: SiteConfig["brand"];
  nav: NavItem[];
  bookingLabel: string;
};

export function SiteHeader({ brand, nav, bookingLabel }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoFrame}>
            <span className={styles.logoText}>{brand.name}</span>
            <span className={styles.logoSubtitle}>ВОСК ШУГАРИНГ</span>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Основное меню">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.href + item.label}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.headerActions}>
          <MobileNav nav={nav} />
        </div>
        <div className={styles.mobileBooking}>
          <ContactBookTrigger variant="header">{bookingLabel}</ContactBookTrigger>
        </div>
      </div>
    </header>
  );
}
