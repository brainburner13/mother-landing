import type { SiteConfig } from "@/types/site";
import styles from "./PriceList.module.css";

type Props = {
  data: SiteConfig["priceList"];
};

export function PriceList({ data }: Props) {
  return (
    <section id="price" className={styles.section} aria-labelledby="price-title">
      <div className={styles.inner}>
        <h2 id="price-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <div className={styles.groups}>
          {data.groups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <table className={styles.table}>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={`${group.title}-${row.name}`}>
                      <th scope="row" className={styles.name}>
                        {row.name}
                      </th>
                      <td className={styles.price}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
