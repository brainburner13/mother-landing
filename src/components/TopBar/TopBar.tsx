import type { SiteConfig } from "@/types/site";
import { ContactBookTrigger } from "@/components/ContactBook/ContactBookTrigger";
import styles from "./TopBar.module.css";

type Props = {
  contact: SiteConfig["contact"];
};

export function TopBar({ contact }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <p className={styles.schedule}>{contact.schedule}</p>
        <div className={styles.actions}>
          <a className={styles.phone} href={contact.phoneHref}>
            {contact.phone}
          </a>
          <ContactBookTrigger variant="topBar">{contact.bookingLabel}</ContactBookTrigger>
        </div>
      </div>
    </div>
  );
}
