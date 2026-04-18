"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import type { NavItem, SiteConfig } from "@/types/site";
import { SocialIcon } from "@/components/SiteFooter/SocialIcon";
import styles from "./SiteHeader.module.css";

type Props = {
  nav: NavItem[];
  social: SiteConfig["social"];
};

export function MobileNav({ nav, social }: Props) {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(() =>
    typeof window === "undefined" ? "#" : window.location.hash || "#",
  );
  const panelId = useId();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  useEffect(() => {
    const sectionLinks = nav.filter(
      (item) => item.href.startsWith("#") && item.href !== "#",
    );
    if (!sectionLinks.length) return;

    const elements = sectionLinks
      .map((item) => ({ href: item.href, el: document.querySelector(item.href) }))
      .filter(
        (entry): entry is { href: string; el: HTMLElement } =>
          entry.el instanceof HTMLElement,
      );

    if (!elements.length) return;

    const resolveActiveHref = () => {
      if (window.scrollY < 100) {
        setActiveHref("#");
        return;
      }

      const viewportBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - viewportBottom < 120) {
        setActiveHref(elements[elements.length - 1].href);
        return;
      }

      const marker = window.scrollY + 150;
      let nextHref = elements[0].href;
      for (const item of elements) {
        if (item.el.offsetTop <= marker) {
          nextHref = item.href;
          continue;
        }
        break;
      }
      setActiveHref(nextHref);
    };

    const onHashChange = () => setActiveHref(window.location.hash || "#");
    const onScroll = () => resolveActiveHref();
    const onResize = () => resolveActiveHref();
    const rafId = window.requestAnimationFrame(resolveActiveHref);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [nav]);

  return (
    <div className={styles.mobileWrap}>
      <button
        type="button"
        className={styles.burger}
        aria-expanded={open}
        aria-controls={panelId}
        data-open={open ? "true" : "false"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.burgerLines} aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="sr-only">Меню</span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id={panelId}
            className={styles.mobileNav}
            aria-hidden={!open}
            initial={
              prefersReducedMotion
                ? { opacity: 1, height: "calc(100dvh - 200%)" }
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "calc(100dvh - 200%)" }}
            exit={
              prefersReducedMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ul className={styles.mobileList}>
              {nav.map((item) => (
                <li key={item.href + item.label}>
                  <a
                    href={item.href}
                    className={`${styles.mobileLink} ${activeHref === item.href ? styles.mobileLinkActive : ""}`}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    onClick={() => {
                      setActiveHref(item.href);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.mobileContacts}>
              <ul className={styles.mobileSocials}>
                {social.map((item) => (
                  <li key={item.href + item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mobileSocialLink}
                      aria-label={item.label}
                    >
                      <SocialIcon icon={item.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
