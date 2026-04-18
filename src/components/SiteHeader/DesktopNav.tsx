"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/types/site";
import styles from "./SiteHeader.module.css";

type Props = {
  nav: NavItem[];
};

export function DesktopNav({ nav }: Props) {
  const [activeHref, setActiveHref] = useState<string>(() =>
    typeof window === "undefined" ? "#" : window.location.hash || "#",
  );

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
    <ul className={styles.navList}>
      {nav.map((item) => (
        <li key={item.href + item.label}>
          <a
            href={item.href}
            className={`${styles.navLink} ${activeHref === item.href ? styles.navLinkActive : ""}`}
            aria-current={activeHref === item.href ? "page" : undefined}
            onClick={() => setActiveHref(item.href)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
