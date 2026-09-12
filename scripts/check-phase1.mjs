import { writeFileSync } from "node:fs";

const base = "http://localhost:3000";

async function text(path: string) {
  const res = await fetch(`${base}${path}`, { redirect: "manual" });
  return {
    path,
    status: res.status,
    location: res.headers.get("location"),
    type: res.headers.get("content-type"),
    body: res.status < 400 ? await res.text() : "",
  };
}

const sitemap = await text("/sitemap.xml");
const robots = await text("/robots.txt");
const en = await text("/en");
const fa = await text("/fa");
const enDocs = await text("/en/docs");
const faDocs = await text("/fa/docs");
const og = await fetch(`${base}/en/og`);
const searchEn = await fetch(`${base}/api/search?query=H1&locale=en`);
const searchFa = await fetch(`${base}/api/search?query=H1&locale=fa`);

const out = {
  sitemapStatus: sitemap.status,
  sitemapHasEn: sitemap.body.includes("/en</loc>") || sitemap.body.includes("/en<"),
  sitemapHasFa: sitemap.body.includes("/fa"),
  sitemapHasDocs: sitemap.body.includes("/docs"),
  sitemapHreflang: sitemap.body.includes("hreflang") || sitemap.body.includes("xhtml:link"),
  robotsStatus: robots.status,
  robotsSitemap: robots.body.includes("sitemap.xml"),
  enLang: (en.body.match(/lang="([^"]+)"/) || [])[1] || null,
  faDir: (fa.body.match(/dir="([^"]+)"/) || [])[1] || null,
  enCanonical: en.body.includes('rel="canonical"'),
  enHreflangFa: en.body.includes('hreflang="fa"'),
  faHreflangEn: fa.body.includes('hreflang="en"'),
  enJsonLd: en.body.includes("application/ld+json") && en.body.includes("WebSite"),
  docsJsonLd: enDocs.body.includes("TechArticle"),
  docsCorrect: enDocs.body.includes("Correct") || enDocs.body.includes("Keep one H1"),
  faDocsIncorrect: faDocs.body.includes("غلط") || faDocs.body.includes("چند تا H1"),
  ogType: og.headers.get("content-type"),
  ogStatus: og.status,
  searchEn: searchEn.status,
  searchFa: searchFa.status,
};

writeFileSync("tmp-phase1.json", JSON.stringify(out, null, 2));
