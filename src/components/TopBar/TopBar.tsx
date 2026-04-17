import type { SiteConfig } from "@/types/site";
import { ContactBookTrigger } from "@/components/ContactBook/ContactBookTrigger";
import { CopyPhoneLink } from "@/components/CopyPhoneLink/CopyPhoneLink";
import styles from "./TopBar.module.css";

type Props = {
  contact: SiteConfig["contact"];
  locations: SiteConfig["locations"]["items"];
};

export function TopBar({ contact, locations }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.schedule}>{contact.schedule}</p>
          <CopyPhoneLink
            phone={contact.phone}
            phoneHref={contact.phoneHref}
            className={styles.phone}
          />
        </div>
        <div className={styles.center}>
          <ContactBookTrigger variant="topBar">{contact.bookingLabel}</ContactBookTrigger>
        </div>
        <nav className={styles.right} aria-label="Адреса на карте">
          <ul className={styles.addressList}>
            {locations.map((loc) => (
              <li key={loc.id}>
                {loc.mapUrl ? (
                  <a
                    href={loc.mapUrl}
                    className={styles.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {loc.name}
                  </a>
                ) : (
                  <span className={styles.addressFallback}>{loc.name}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
