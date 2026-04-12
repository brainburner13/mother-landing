import Image, { type StaticImageData } from "next/image";
import type { ServiceItem, SiteConfig } from "@/types/site";
import { ContactBookTrigger } from "@/components/ContactBook/ContactBookTrigger";
import cosmetology from "@/assets/image/our_services/cosmetology.webp";
import eyebrowLamination from "@/assets/image/our_services/eyebrow_lamination.webp";
import eyelashLamination from "@/assets/image/our_services/eyelash_lamination.webp";
import hardwareMassage from "@/assets/image/our_services/hardware_massage.webp";
import permanentMakeup from "@/assets/image/our_services/permanent_makeup.webp";
import sugaring from "@/assets/image/our_services/sugaring.webp";
import waxing from "@/assets/image/our_services/waxing.webp";
import styles from "./Services.module.css";

type Props = {
  data: SiteConfig["services"];
};

/** Порядок = порядок 7 фото в `our_services`: у каждого фото своя карточка. */
const SERVICE_IMAGES_ORDER: readonly StaticImageData[] = [
  waxing,
  sugaring,
  cosmetology,
  eyelashLamination,
  eyebrowLamination,
  permanentMakeup,
  hardwareMassage,
] as const;

const SERVICE_IDS_ORDER = [
  "epilation-wax",
  "epilation-sugar",
  "cosmetology",
  "lamination-lashes",
  "lamination-brows",
  "permanent",
  "massage",
] as const;

const SERVICE_IMAGES_BY_ID: Record<(typeof SERVICE_IDS_ORDER)[number], StaticImageData> = {
  "epilation-wax": waxing,
  "epilation-sugar": sugaring,
  cosmetology,
  "lamination-lashes": eyelashLamination,
  "lamination-brows": eyebrowLamination,
  permanent: permanentMakeup,
  massage: hardwareMassage,
};

function sortServicesLikeDeck(items: ServiceItem[]): ServiceItem[] {
  const rank = new Map<string, number>(SERVICE_IDS_ORDER.map((id, i) => [id, i]));
  return [...items].sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999));
}

function imageForItem(item: ServiceItem, index: number): StaticImageData {
  const byId = SERVICE_IMAGES_BY_ID[item.id as keyof typeof SERVICE_IMAGES_BY_ID];
  if (byId) return byId;
  return SERVICE_IMAGES_ORDER[index] ?? SERVICE_IMAGES_ORDER[0];
}

export function Services({ data }: Props) {
  const items = sortServicesLikeDeck(data.items);

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.heading}>
          {data.sectionTitle}
        </h2>
        <ul className={styles.grid}>
          {items.map((item, index) => {
            const img = imageForItem(item, index);
            return (
              <li key={item.id} className={styles.card}>
                <div className={styles.thumb}>
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className={styles.thumbImg}
                    sizes="(max-width: 440px) 100vw, (max-width: 720px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {item.priceFrom ? <p className={styles.price}>{item.priceFrom}</p> : null}
                  <p className={styles.desc}>{item.description}</p>
                  <div className={styles.cardActions}>
                    <a href={item.href} className={styles.link}>
                      Смотреть в прайсе
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.sectionCta}>
          <ContactBookTrigger variant="servicesFooter">Записаться</ContactBookTrigger>
        </div>
      </div>
    </section>
  );
}
