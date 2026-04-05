import type { ReactNode } from "react";
import styles from "./StickyHeader.module.css";

type Props = {
  children: ReactNode;
};

export function StickyHeader({ children }: Props) {
  return <div className={styles.shell}>{children}</div>;
}
