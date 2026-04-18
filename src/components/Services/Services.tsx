"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { ServiceItem, SiteConfig } from "@/types/site";
import { ContactBookTrigger } from "@/components/ContactBook/ContactBookTrigger";
import cosmetology from "@/assets/image/our_services/cosmetology.webp";
import eyebrowLamination from "@/assets/image/our_services/eyebrow_lamination.png";
import eyelashLamination from "@/assets/image/our_services/eyelash_lamination.png";
import hardwareMassage from "@/assets/image/our_services/hardware_massage.webp";
import permanentMakeup from "@/assets/image/our_services/permanent_makeup.webp";
import sugaring from "@/assets/image/our_services/sugaring.webp";
import waxing from "@/assets/image/our_services/waxing.webp";
import styles from "./Services.module.css";

type Props = {
  data: SiteConfig["services"];
};

/** Порядок = порядок 7 фото в `our_services`: у каждого фото своя карточка. */
const SERVICE_IMAGES_ORDER: readonly StaticImageData[] = [
  waxing,
  sugaring,
  cosmetology,
  eyelashLamination,
  eyebrowLamination,
  permanentMakeup,
  hardwareMassage,
] as const;

const SERVICE_IDS_ORDER = [
  "epilation-wax",
  "epilation-sugar",
  "cosmetology",
  "lamination-lashes",
  "lamination-brows",
  "permanent",
  "massage",
] as const;

const SERVICE_IMAGES_BY_ID: Record<(typeof SERVICE_IDS_ORDER)[number], StaticImageData> =
  {
    "epilation-wax": waxing,
    "epilation-sugar": sugaring,
    cosmetology,
    "lamination-lashes": eyelashLamination,
    "lamination-brows": eyebrowLamination,
    permanent: permanentMakeup,
    massage: hardwareMassage,
  };

function sortServicesLikeDeck(items: ServiceItem[]): ServiceItem[] {
  const rank = new Map<string, number>(SERVICE_IDS_ORDER.map((id, i) => [id, i]));
  return [...items].sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999));
}

function imageForItem(item: ServiceItem, index: number): StaticImageData {
  const byId = SERVICE_IMAGES_BY_ID[item.id as keyof typeof SERVICE_IMAGES_BY_ID];
  if (byId) return byId;
  return SERVICE_IMAGES_ORDER[index] ?? SERVICE_IMAGES_ORDER[0];
}

export function Services({ data }: Props) {
  const items = sortServicesLikeDeck(data.items);
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
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <motion.ul className={styles.grid} initial={false}>
          {items.map((item, index) => {
            const img = imageForItem(item, index);
            const stackLevel = Math.min(index, 4);
            const deckOffset = index - (items.length - 1) / 2;
            return (
              <motion.li
                key={item.id}
                className={styles.card}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: "none" }
                    : {
                        opacity: 0,
                        y: isMobile ? 22 : -56 + stackLevel * 8,
                        x: isMobile ? 0 : -deckOffset * 120,
                        rotate: isMobile ? 0 : -deckOffset * 3.2,
                        scale: isMobile ? 0.985 : 0.95 + stackLevel * 0.01,
                        filter: isMobile ? "blur(0.6px)" : "blur(1.4px)",
                      }
                }
                variants={{
                  hidden: {},
                  visible: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotate: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      type: "spring",
                      stiffness: 180,
                      damping: 22,
                      mass: 0.8,
                      delay: (index % 4) * 0.08,
                    },
                  },
                }}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={{ once: true, amount: isMobile ? 0.18 : 0.35 }}
                style={
                  prefersReducedMotion ? undefined : { transformOrigin: "50% -90px" }
                }
              >
                <div className={styles.thumb}>
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className={styles.thumbImg}
                    sizes="(max-width: 440px) 100vw, (max-width: 720px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {item.priceFrom ? (
                    <p className={styles.price}>{item.priceFrom}</p>
                  ) : null}
                  <p className={styles.desc}>{item.description}</p>
                  <div className={styles.cardActions}>
                    <a href={item.href} className={styles.link}>
                      Смотреть в прайсе
                    </a>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
        <div className={styles.sectionCta}>
          <ContactBookTrigger variant="servicesFooter">Записаться</ContactBookTrigger>
        </div>
      </div>
    </section>
  );
}
