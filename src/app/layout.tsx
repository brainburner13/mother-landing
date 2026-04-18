import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
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
  const siteOrigin =
    process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://brainburner13.github.io";
  const sitePath = process.env.NEXT_PUBLIC_SITE_PATH ?? "/mother-landing";
  const normalizedPath = sitePath === "/" ? "" : sitePath.replace(/\/$/, "");
  const baseUrl = `${siteOrigin}${normalizedPath}`;
  const shareImage = `${normalizedPath}/og-image.webp`;

  return {
    metadataBase: new URL(baseUrl),
    title: site.meta.title,
    description: site.meta.description,
    alternates: {
      canonical: `${normalizedPath}/`,
    },
    openGraph: {
      title: site.meta.title,
      description: site.meta.description,
      type: "website",
      locale: "ru_RU",
      siteName: site.brand.name,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: site.brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.meta.title,
      description: site.meta.description,
      images: [shareImage],
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
