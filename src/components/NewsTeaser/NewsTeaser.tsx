"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";
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
          {data.items.map((item) => {
            const img = ARTICLE_IMAGES[item.id];
            if (!img) return null;
            return (
              <li key={item.id} className={styles.card}>
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
        <ArticleModal article={activeArticle} contact={contact} social={social} onClose={closeArticle} />
      ) : null}
    </section>
  );
}
