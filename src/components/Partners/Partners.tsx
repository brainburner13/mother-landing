import type { SiteConfig } from "@/types/site";
import styles from "./Partners.module.css";

type Props = {
  data: SiteConfig["partners"];
};

export function Partners({ data }: Props) {
  return (
    <section className={styles.section} aria-label={data.title}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{data.title}</h2>
        <ul className={styles.list}>
          {data.items.map((p) => (
            <li key={p.name}>
              {p.href ? (
                <a href={p.href} className={styles.chip}>
                  {p.name}
                </a>
              ) : (
                <span className={styles.chip}>{p.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
