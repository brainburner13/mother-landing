"use client";

import { useId, useState } from "react";
import type { NavItem } from "@/types/site";
import styles from "./SiteHeader.module.css";

type Props = {
  nav: NavItem[];
};

export function MobileNav({ nav }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

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
      <nav
        id={panelId}
        className={styles.mobileNav}
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
      >
        <ul className={styles.mobileList}>
          {nav.map((item) => (
            <li key={item.href + item.label}>
              <a
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
