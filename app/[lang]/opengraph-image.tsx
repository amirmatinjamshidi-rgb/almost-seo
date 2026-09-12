import { renderOgImage } from "@/lib/og-image";
import { siteDescription, siteName, type DocsLang } from "@/lib/seo-meta";

export const alt = "SEO Encyclopedia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: DocsLang = lang === "fa" ? "fa" : "en";

  return renderOgImage({
    lang: locale,
    title: siteName[locale],
    description: siteDescription[locale],
  });
}
