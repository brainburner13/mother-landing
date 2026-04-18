"use client";

import type { SiteConfig } from "@/types/site";
import { motion, useReducedMotion } from "motion/react";
import styles from "./PriceList.module.css";

type Props = {
  data: SiteConfig["priceList"];
};

export function PriceList({ data }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="price" className={styles.section} aria-labelledby="price-title">
      <div className={styles.inner}>
        <h2 id="price-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <motion.div className={styles.groups} initial={false}>
          {data.groups.map((group, index) => (
            <motion.div
              key={group.title}
              className={styles.group}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0, scaleY: 1, filter: "none" }
                  : { opacity: 0, y: 22, scaleY: 0.86, filter: "blur(0.8px)" }
              }
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.44,
                ease: [0.2, 0.75, 0.25, 1],
                delay: (index % 2) * 0.08,
              }}
              style={{ overflow: "hidden", transformOrigin: "top center" }}
            >
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <table className={styles.table}>
                <motion.tbody initial={false}>
                  {group.rows.map((row, rowIndex) => (
                    <motion.tr
                      key={`${group.title}-${row.name}`}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, y: 0, filter: "none" }
                          : { opacity: 0, y: 10, filter: "blur(1px)" }
                      }
                      whileInView={
                        prefersReducedMotion
                          ? undefined
                          : { opacity: 1, y: 0, filter: "blur(0px)" }
                      }
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{
                        duration: 0.24,
                        ease: [0.2, 0.75, 0.25, 1],
                        delay: 0.12 + (rowIndex + 1) * 0.028,
                      }}
                    >
                      <th scope="row" className={styles.name}>
                        {row.name}
                      </th>
                      <td className={styles.price}>{row.price}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
