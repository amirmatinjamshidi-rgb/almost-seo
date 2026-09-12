import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import { i18n } from "@/lib/i18n";
import { getI18nProvider } from "@/lib/layout.shared";
import { getSiteUrl, isDocsLang, siteDescription, siteName } from "@/lib/seo-meta";
import { notFound } from "next/navigation";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isDocsLang(lang)) notFound();

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteName[lang],
      template: `%s | ${siteName[lang]}`,
    },
    description: siteDescription[lang],
  };
}

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isDocsLang(lang)) notFound();
  const isFa = lang === "fa";

  return (
    <html
      lang={lang}
      dir={isFa ? "rtl" : "ltr"}
      className={`${inter.variable} ${vazirmatn.variable} ${isFa ? vazirmatn.className : inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={getI18nProvider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
