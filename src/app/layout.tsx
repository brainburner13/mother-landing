import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import logo from "@/assets/image/logo.webp";
import { ContactBookProvider } from "@/components/ContactBook/ContactBookProvider";
import { getSite } from "@/lib/site";

const display = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-fallback",
  display: "swap",
});

const body = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-fallback",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = getSite();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: site.meta.title,
    description: site.meta.description,
    openGraph: {
      title: site.meta.title,
      description: site.meta.description,
      type: "website",
      locale: "ru_RU",
      siteName: site.brand.name,
      images: [
        {
          url: logo.src,
          width: logo.width,
          height: logo.height,
          alt: site.brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.meta.title,
      description: site.meta.description,
      images: [logo.src],
    },
    icons: {
      icon: "/logo.ico",
      shortcut: "/logo.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body>
        <ContactBookProvider contact={site.contact} social={site.social}>
          {children}
        </ContactBookProvider>
      </body>
    </html>
  );
}
