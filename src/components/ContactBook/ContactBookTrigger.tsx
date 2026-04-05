"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useContactBook } from "./ContactBookProvider";
import modalStyles from "./ContactBookModal.module.css";

type Variant = "topBar" | "heroPrimary" | "heroGhost" | "service" | "footer";

const variantClass: Record<Variant, string> = {
  topBar: modalStyles.triggerTopBar,
  heroPrimary: modalStyles.triggerHeroPrimary,
  heroGhost: modalStyles.triggerHeroGhost,
  service: modalStyles.triggerService,
  footer: modalStyles.triggerFooter,
};

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
  variant: Variant;
  children: ReactNode;
};

export function ContactBookTrigger({ variant, children, className, ...rest }: Props) {
  const { open } = useContactBook();
  const v = variantClass[variant];
  return (
    <button
      type="button"
      className={className ? `${v} ${className}` : v}
      onClick={open}
      {...rest}
    >
      {children}
    </button>
  );
}
