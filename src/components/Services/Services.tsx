import type { SiteConfig } from "@/types/site";
import { ContactBookTrigger } from "@/components/ContactBook/ContactBookTrigger";
import styles from "./Services.module.css";

type Props = {
  data: SiteConfig["services"];
};

export function Services({ data }: Props) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <ul className={styles.grid}>
          {data.items.map((item) => (
            <li key={item.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.price}>{item.priceFrom}</p>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.cardActions}>
                <a href={item.href} className={styles.link}>
                  Подробнее
                </a>
                <ContactBookTrigger variant="service">
                  Узнать стоимость
                </ContactBookTrigger>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
