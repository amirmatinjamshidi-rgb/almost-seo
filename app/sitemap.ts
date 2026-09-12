import type { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";
import { absoluteUrl, docsPath, homePath, languageAlternates } from "@/lib/seo-meta";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of i18n.languages) {
    entries.push({
      url: absoluteUrl(homePath(lang)),
      changeFrequency: "weekly",
      priority: lang === i18n.defaultLanguage ? 1 : 0.9,
      alternates: {
        languages: languageAlternates(homePath),
      },
    });
  }

  const slugKeys = new Set<string>();
  for (const lang of i18n.languages) {
    for (const page of source.getPages(lang)) {
      slugKeys.add(page.slugs.join("/"));
    }
  }

  for (const key of slugKeys) {
    const slugs = key.length === 0 ? [] : key.split("/");
    const pathForLang = (lang: "en" | "fa") => docsPath(lang, slugs);

    for (const lang of i18n.languages) {
      if (!source.getPage(slugs, lang)) continue;

      entries.push({
        url: absoluteUrl(pathForLang(lang)),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: languageAlternates(pathForLang),
        },
      });
    }
  }

  return entries;
}
