"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import type { SiteConfig } from "@/types/site";
import { CopyPhoneLink } from "@/components/CopyPhoneLink/CopyPhoneLink";
import { SocialIcon } from "@/components/SiteFooter/SocialIcon";
import styles from "./ContactBookModal.module.css";

type ContactBookContextValue = {
  open: () => void;
};

const ContactBookContext = createContext<ContactBookContextValue | null>(null);

export function useContactBook(): ContactBookContextValue {
  const ctx = useContext(ContactBookContext);
  if (!ctx) {
    throw new Error("useContactBook должен использоваться внутри ContactBookProvider");
  }
  return ctx;
}

type ProviderProps = {
  contact: SiteConfig["contact"];
  social: SiteConfig["social"];
  children: ReactNode;
};

export function ContactBookProvider({ contact, social, children }: ProviderProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <ContactBookContext.Provider value={{ open: openModal }}>
      {children}
      {open ? (
        <div className={styles.backdrop} onClick={closeModal} role="presentation">
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.close}
              onClick={closeModal}
              aria-label="Закрыть"
            >
              ×
            </button>
            <h2 id={titleId} className={styles.title}>
              Запись и консультация
            </h2>
            <p className={styles.lead}>Выберите удобный мессенджер или позвоните нам</p>
            <ul className={styles.messengers}>
              {social.map((s) => (
                <li key={s.href + s.label}>
                  <a
                    href={s.href}
                    className={styles.messengerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.mIcon}>
                      <SocialIcon icon={s.icon} />
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.phoneBlock}>
              <span className={styles.phoneLabel}>Телефон</span>
              <CopyPhoneLink
                phone={contact.phone}
                phoneHref={contact.phoneHref}
                className={styles.phone}
              />
            </div>
          </div>
        </div>
      ) : null}
    </ContactBookContext.Provider>
  );
}
