import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  buildPageMetadata,
  docsOgPath,
  docsPath,
  isDocsLang,
  lastReviewedToIsoDate,
  localeBcp47,
} from "@/lib/seo-meta";
import { source } from "@/lib/source";

export default async function Page(
  props: PageProps<"/[lang]/docs/[[...slug]]">,
) {
  const params = await props.params;
  if (!isDocsLang(params.lang)) notFound();

  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const canonical = absoluteUrl(docsPath(params.lang, page.slugs));

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: page.data.title,
          description: page.data.description,
          inLanguage: localeBcp47(params.lang),
          dateModified: lastReviewedToIsoDate(page.data.last_reviewed),
          mainEntityOfPage: canonical,
          author: {
            "@type": "Organization",
            name: "SEO Encyclopedia",
          },
        }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/[lang]/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  if (!isDocsLang(params.lang)) notFound();

  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  return buildPageMetadata({
    title: page.data.title,
    description: page.data.description,
    lang: params.lang,
    path: docsPath(params.lang, page.slugs),
    imagePath: docsOgPath(params.lang, page.slugs),
  });
}
