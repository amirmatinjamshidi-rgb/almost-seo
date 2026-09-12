import { DynamicLink } from "fumadocs-core/dynamic-link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  buildPageMetadata,
  homePath,
  isDocsLang,
  localeBcp47,
  siteDescription,
  siteName,
} from "@/lib/seo-meta";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isDocsLang(lang)) notFound();

  return {
    ...buildPageMetadata({
      title: siteName[lang],
      description: siteDescription[lang],
      lang,
      path: homePath(lang),
    }),
    title: { absolute: siteName[lang] },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isDocsLang(lang)) notFound();
  const isFa = lang === "fa";

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName[lang],
          url: absoluteUrl(homePath(lang)),
          description: siteDescription[lang],
          inLanguage: localeBcp47(lang),
          publisher: {
            "@type": "Organization",
            name: siteName.en,
          },
        }}
      />
      <h1 className="mb-4 text-3xl font-semibold">{siteName[lang]}</h1>
      <p className="mb-6 max-w-xl text-fd-muted-foreground">
        {isFa
          ? "مرجع سئوی دوزبانه. فعلاً پوسته خالی است؛ محتوا از ماژول ۰۰ شروع می‌شود."
          : "Bilingual senior-level SEO reference. Shell only. Curriculum starts at Module 00."}
      </p>
      <DynamicLink href="/[lang]/docs">
        {isFa ? "رفتن به مستندات" : "Open docs"}
      </DynamicLink>
    </div>
  );
}
