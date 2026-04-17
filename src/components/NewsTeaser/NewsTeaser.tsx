"use client";

import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/types/site";
import { ArticleModal } from "@/components/ArticleModal/ArticleModal";
import articleDepilation from "@/assets/image/articles/depilation.webp";
import articleEpilation from "@/assets/image/articles/epilation.jpg";
import articleEyelash from "@/assets/image/articles/eyelash_lamination.jpg";
import articleLpg from "@/assets/image/articles/LPG_massage.jpg";
import articlePermanent from "@/assets/image/articles/permanent_makeup.webp";
import articleCare from "@/assets/image/articles/care_after_cosmetic_procedures.jpg";
import styles from "./NewsTeaser.module.css";

type Props = {
  data: SiteConfig["news"];
  contact: SiteConfig["contact"];
  social: SiteConfig["social"];
};

const ARTICLE_IMAGES: Record<string, StaticImageData> = {
  n1: articleDepilation,
  n2: articleEpilation,
  n3: articleEyelash,
  n4: articlePermanent,
  n5: articleLpg,
  n6: articleCare,
};

export function NewsTeaser({ data, contact, social }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
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
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [data.items.length]);

  const openArticle = useCallback((id: string) => {
    setOpenId(id);
  }, []);

  const closeArticle = useCallback(() => {
    setOpenId(null);
  }, []);

  const activeArticle = openId ? data.items.find((x) => x.id === openId) : undefined;

  return (
    <section id="articles" className={styles.section} aria-labelledby="articles-title">
      <div className={styles.inner}>
        <h2 id="articles-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <ul className={styles.grid}>
          {data.items.map((item, index) => {
            const img = ARTICLE_IMAGES[item.id];
            if (!img) return null;
            const revealStyle = {
              "--card-delay": `${index * 60}ms`,
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
                <button
                  type="button"
                  className={styles.cardButton}
                  onClick={() => openArticle(item.id)}
                  aria-haspopup="dialog"
                  aria-expanded={openId === item.id}
                >
                  <div className={styles.thumb}>
                    <Image
                      src={img}
                      alt={item.image.alt}
                      fill
                      className={styles.thumbImg}
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <time className={styles.date} dateTime={item.date}>
                      {item.date}
                    </time>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.excerpt}>{item.excerpt}</p>
                    <span className={styles.more}>Подробнее…</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {activeArticle ? (
        <ArticleModal
          article={activeArticle}
          contact={contact}
          social={social}
          onClose={closeArticle}
        />
      ) : null}
    </section>
  );
}
