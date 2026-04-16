import type { Metadata } from "next";
import { Mulish, Poiret_One } from "next/font/google";
import "./globals.css";
import { ContactBookProvider } from "@/components/ContactBook/ContactBookProvider";
import { getSite } from "@/lib/site";

const display = Poiret_One({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-display-fallback",
  display: "swap",
});

const body = Mulish({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-fallback",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = getSite();
  return {
    title: site.meta.title,
    description: site.meta.description,
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
