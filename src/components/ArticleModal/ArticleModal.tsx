"use client";

import { useEffect, useId } from "react";
import type { NewsItem, SiteConfig } from "@/types/site";
import { SocialIcon } from "@/components/SiteFooter/SocialIcon";
import styles from "./ArticleModal.module.css";

type Props = {
  article: NewsItem;
  onClose: () => void;
  contact: SiteConfig["contact"];
  social: SiteConfig["social"];
};

function paragraphsFor(article: NewsItem): string[] {
  if (Array.isArray(article.bodyParagraphs) && article.bodyParagraphs.length > 0) {
    return article.bodyParagraphs;
  }
  if (article.excerpt?.trim()) {
    return [article.excerpt.trim()];
  }
  return [];
}

export function ArticleModal({ article, onClose, contact, social }: Props) {
  const titleId = useId();
  const paragraphs = paragraphsFor(article);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <header className={styles.header}>
          <time className={styles.meta} dateTime={article.date}>
            {article.date}
          </time>
          <h2 id={titleId} className={styles.title}>
            {article.title}
          </h2>
        </header>
        <div className={styles.body}>
          {paragraphs.map((text, i) => (
            <p key={i} className={styles.paragraph}>
              {text}
            </p>
          ))}
        </div>
        <footer className={styles.footer}>
          <p className={styles.footerTitle}>Запись и консультация</p>
          <p className={styles.footerLead}>Позвоните, напишите в мессенджер или оставьте заявку онлайн.</p>
          <p className={styles.schedule}>{contact.schedule}</p>
          <a href={contact.phoneHref} className={styles.phone}>
            {contact.phone}
          </a>
          <ul className={styles.social}>
            {social.map((s) => (
              <li key={s.href + s.label}>
                <a
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
}
