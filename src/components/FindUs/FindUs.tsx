"use client";

import type { SiteConfig } from "@/types/site";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./FindUs.module.css";

type Props = {
  title: string;
  items: SiteConfig["locations"]["items"];
};

export function FindUs({ title, items }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="locations" className={styles.section} aria-labelledby="find-us-title">
      <div className={styles.inner}>
        <h2 id="find-us-title" className={styles.heading}>
          {title}
        </h2>
        <motion.ul className={styles.grid} initial={false}>
          {items.map((loc, index) => {
            const stackLevel = Math.min(index, 3);
            const deckOffset = index - (items.length - 1) / 2;
            return (
              <motion.li
                key={loc.id}
                className={styles.card}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: "none" }
                    : {
                        opacity: 0,
                        y: isMobile ? 20 : -48 + stackLevel * 8,
                        x: isMobile ? 0 : -deckOffset * 110,
                        rotate: isMobile ? 0 : -deckOffset * 2.8,
                        scale: isMobile ? 0.985 : 0.96 + stackLevel * 0.01,
                        filter: isMobile ? "blur(0.6px)" : "blur(1.2px)",
                      }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        rotate: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }
                }
                viewport={{ once: true, amount: isMobile ? 0.15 : 0.35 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                  mass: 0.85,
                  delay: (index % 2) * 0.08,
                }}
                style={
                  prefersReducedMotion ? undefined : { transformOrigin: "50% -90px" }
                }
              >
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
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
