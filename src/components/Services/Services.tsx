"use client";

import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
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
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-card-index"));
          if (Number.isNaN(idx)) return;

          setVisibleCards((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [items.length]);

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <ul className={styles.grid}>
          {items.map((item, index) => {
            const img = imageForItem(item, index);
            const revealStyle = {
              "--card-delay": `${index * 55}ms`,
            } as CSSProperties;
            return (
              <li
                key={item.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-card-index={index}
                className={`${styles.card} ${visibleCards.has(index) ? styles.cardVisible : ""}`}
                style={revealStyle}
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
              </li>
            );
          })}
        </ul>
        <div className={styles.sectionCta}>
          <ContactBookTrigger variant="servicesFooter">Записаться</ContactBookTrigger>
        </div>
      </div>
    </section>
  );
}
