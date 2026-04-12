export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  priceFrom?: string;
  description: string;
  href: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image: { alt: string };
  /** Полный текст статьи по абзацам; при отсутствии в модалке показывается excerpt */
  bodyParagraphs?: string[];
};

export type LocationItem = {
  id: string;
  name: string;
  address: string;
  metro?: string;
  mapUrl?: string;
};

export type OfficePhotoCaption = {
  alt: string;
};

export type PriceRow = {
  name: string;
  price: string;
};

export type PriceGroup = {
  title: string;
  rows: PriceRow[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "vk" | "telegram" | "max" | "whatsapp" | "generic";
};

export type SiteConfig = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    shortName: string;
    tagline: string;
  };
  contact: {
    phone: string;
    phoneHref: string;
    schedule: string;
    bookingLabel: string;
    bookingUrl: string;
  };
  header: {
    nav: NavItem[];
  };
  hero: {
    title: string;
    /** Текст над адресами (станциями метро) */
    intro: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image?: { src: string; alt: string };
  };
  services: {
    sectionTitle: string;
    items: ServiceItem[];
  };
  news: {
    sectionTitle: string;
    items: NewsItem[];
  };
  locations: {
    /** Подписи к фото кабинетов в карусели первого экрана */
    photos: OfficePhotoCaption[];
    items: LocationItem[];
  };
  findUs: {
    sectionTitle: string;
  };
  priceList: {
    sectionTitle: string;
    groups: PriceGroup[];
  };
  footer: {
    serviceLinksTitle: string;
    serviceLinks: NavItem[];
    copyrightSince: number;
    copyrightRest: string;
  };
  social: SocialLink[];
};
