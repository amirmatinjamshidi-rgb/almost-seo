import type { Metadata } from "next";

export const siteName = {
  en: "SEO Encyclopedia",
  fa: "دانشنامه سئو",
} as const;

export const siteDescription = {
  en: "Bilingual senior-level SEO reference covering strategy, WordPress, and Next.js.",
  fa: "مرجع سئوی دوزبانه برای استراتژی، وردپرس و Next.js.",
} as const;

export type DocsLang = "en" | "fa";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export function isDocsLang(value: string): value is DocsLang {
  return value === "en" || value === "fa";
}

export function localeOg(lang: string): string {
  return lang === "fa" ? "fa_IR" : "en_US";
}

export function localeBcp47(lang: string): string {
  return lang === "fa" ? "fa-IR" : "en-US";
}

export function homePath(lang: string): string {
  return `/${lang}`;
}

export function docsPath(lang: string, slugs: string[] = []): string {
  if (slugs.length === 0) return `/${lang}/docs`;
  return `/${lang}/docs/${slugs.join("/")}`;
}

export function docsOgPath(lang: string, slugs: string[] = []): string {
  if (slugs.length === 0) return `/${lang}/og`;
  return `/${lang}/og?slug=${slugs.join("/")}`;
}

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path}`;
}

export function languageAlternates(pathForLang: (lang: DocsLang) => string) {
  return {
    en: absoluteUrl(pathForLang("en")),
    fa: absoluteUrl(pathForLang("fa")),
    "x-default": absoluteUrl(pathForLang("en")),
  };
}

export function lastReviewedToIsoDate(lastReviewed: string): string {
  if (/^\d{4}-\d{2}$/.test(lastReviewed)) return `${lastReviewed}-01`;
  return lastReviewed;
}

export function buildPageMetadata({
  title,
  description,
  lang,
  path,
  imagePath,
}: {
  title: string;
  description?: string;
  lang: DocsLang;
  path: string;
  imagePath?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const siblingPath = (alt: DocsLang) => path.replace(/^\/(en|fa)/, `/${alt}`);
  const resolvedDescription = description ?? siteDescription[lang];
  const images = imagePath ? [{ url: imagePath, width: 1200, height: 630 }] : undefined;

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: languageAlternates(siblingPath),
    },
    openGraph: {
      title,
      description: resolvedDescription,
      url: canonical,
      siteName: siteName[lang],
      locale: localeOg(lang),
      alternateLocale: lang === "fa" ? ["en_US"] : ["fa_IR"],
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: imagePath ? [imagePath] : undefined,
    },
  };
}
