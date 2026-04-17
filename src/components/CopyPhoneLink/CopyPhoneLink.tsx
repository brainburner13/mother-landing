"use client";

import type { MouseEvent } from "react";

type Props = {
  phone: string;
  phoneHref: string;
  className?: string;
};

export function CopyPhoneLink({ phone, phoneHref, className }: Props) {
  const copyValue = phoneHref.replace(/^tel:/, "");

  const onClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch {
      window.location.href = phoneHref;
    }
  };

  return (
    <a
      href={phoneHref}
      className={className}
      onClick={onClick}
      title="Нажмите, чтобы скопировать номер"
      aria-label={`Скопировать номер телефона ${phone}`}
    >
      {phone}
    </a>
  );
}
