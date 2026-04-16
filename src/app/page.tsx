import logo from "@/assets/image/logo.webp";
import office1 from "@/assets/image/our_offices/Our_offices_1.webp";
import office2 from "@/assets/image/our_offices/Our_offices_2.webp";
import office3 from "@/assets/image/our_offices/Our_offices_3.webp";
import { StickyHeader } from "@/components/StickyHeader/StickyHeader";
import { TopBar } from "@/components/TopBar/TopBar";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";
import { NewsTeaser } from "@/components/NewsTeaser/NewsTeaser";
import { FindUs } from "@/components/FindUs/FindUs";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { PriceList } from "@/components/PriceList/PriceList";
import { getSite } from "@/lib/site";

const OFFICE_IMAGES = [logo, office1, office2, office3] as const;

export default function Home() {
  const site = getSite();
  const metroLinks = site.locations.items.map((loc) => ({
    label: loc.name,
    href: loc.mapUrl ?? "#",
  }));

  const officeSlides = OFFICE_IMAGES.map((src, i) => ({
    src,
    alt: site.locations.photos[i]?.alt ?? `Фото кабинета ${i + 1}`,
  }));

  return (
    <>
      <StickyHeader>
        <TopBar contact={site.contact} locations={site.locations.items} />
        <SiteHeader brand={site.brand} nav={site.header.nav} />
      </StickyHeader>
      <main>
        <Hero hero={site.hero} metroLinks={metroLinks} officeSlides={officeSlides} />
        <Services data={site.services} />
        <NewsTeaser data={site.news} contact={site.contact} social={site.social} />
        <PriceList data={site.priceList} />
        <FindUs title={site.findUs.sectionTitle} items={site.locations.items} />
      </main>
      <SiteFooter
        brand={site.brand}
        footer={site.footer}
        contact={site.contact}
        social={site.social}
      />
    </>
  );
}
