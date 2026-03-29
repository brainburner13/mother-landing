import type { SiteConfig } from "@/types/site";
import styles from "./NewsTeaser.module.css";

type Props = {
  data: SiteConfig["news"];
};

export function NewsTeaser({ data }: Props) {
  return (
    <section
      id="news"
      className={styles.section}
      aria-labelledby="news-title"
    >
      <div className={styles.inner}>
        <h2 id="news-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <ul className={styles.list}>
          {data.items.map((item) => (
            <li key={item.id} className={styles.card}>
              <time className={styles.date} dateTime={item.date}>
                {item.date}
              </time>
              <h3 className={styles.title}>
                <a href={item.href}>{item.title}</a>
              </h3>
              <p className={styles.excerpt}>{item.excerpt}</p>
              <a href={item.href} className={styles.more}>
                Подробнее…
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.footer}>
          <a href={data.allNewsHref} className={styles.allLink}>
            {data.allNewsLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
