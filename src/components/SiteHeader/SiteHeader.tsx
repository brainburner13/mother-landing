import type { NavItem, SiteConfig } from "@/types/site";
import { MobileNav } from "./MobileNav";
import styles from "./SiteHeader.module.css";

type Props = {
  brand: SiteConfig["brand"];
  nav: NavItem[];
};

export function SiteHeader({ brand, nav }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoMark}>{brand.shortName}</span>
          <span className={styles.logoText}>{brand.name}</span>
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
        <MobileNav nav={nav} />
      </div>
    </header>
  );
}
