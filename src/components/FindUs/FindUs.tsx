import type { SiteConfig } from "@/types/site";
import styles from "./FindUs.module.css";

type Props = {
  title: string;
  items: SiteConfig["locations"]["items"];
};

export function FindUs({ title, items }: Props) {
  return (
    <section id="locations" className={styles.section} aria-labelledby="find-us-title">
      <div className={styles.inner}>
        <h2 id="find-us-title" className={styles.heading}>
          {title}
        </h2>
        <ul className={styles.grid}>
          {items.map((loc) => (
            <li key={loc.id} className={styles.card}>
              {loc.metro ? (
                <p className={styles.metro}>
                  <span className={styles.metroIcon} aria-hidden>
                    М
                  </span>
                  {loc.metro}
                </p>
              ) : null}
              <h3 className={styles.name}>{loc.name}</h3>
              <p className={styles.address}>{loc.address}</p>
              {loc.mapUrl ? (
                <a
                  href={loc.mapUrl}
                  className={styles.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть на карте
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
