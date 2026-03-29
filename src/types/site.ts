export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  priceFrom: string;
  description: string;
  href: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
};

export type LocationItem = {
  id: string;
  name: string;
  address: string;
  metro?: string;
  mapUrl?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "vk" | "telegram" | "youtube" | "generic";
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
    subtitle: string;
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
    allNewsLabel: string;
    allNewsHref: string;
    items: NewsItem[];
  };
  locations: {
    sectionTitle: string;
    items: LocationItem[];
  };
  partners: {
    title: string;
    items: { name: string; href?: string }[];
  };
  footer: {
    nav: NavItem[];
    serviceLinksTitle: string;
    serviceLinks: NavItem[];
    copyright: string;
    credits?: string;
  };
  social: SocialLink[];
};
