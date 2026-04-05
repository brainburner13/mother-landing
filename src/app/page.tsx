import { StickyHeader } from "@/components/StickyHeader/StickyHeader";
import { TopBar } from "@/components/TopBar/TopBar";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";
import { NewsTeaser } from "@/components/NewsTeaser/NewsTeaser";
import { Locations } from "@/components/Locations/Locations";
import { Partners } from "@/components/Partners/Partners";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { getSite } from "@/lib/site";

export default function Home() {
  const site = getSite();
  return (
    <>
      <StickyHeader>
        <TopBar contact={site.contact} />
        <SiteHeader brand={site.brand} nav={site.header.nav} />
      </StickyHeader>
      <main>
        <Hero brand={site.brand} hero={site.hero} />
        <Services data={site.services} />
        <NewsTeaser data={site.news} />
        <Locations data={site.locations} />
        <Partners data={site.partners} />
      </main>
      <SiteFooter
        brand={site.brand}
        nav={site.header.nav}
        footer={site.footer}
        contact={site.contact}
        social={site.social}
      />
    </>
  );
}
