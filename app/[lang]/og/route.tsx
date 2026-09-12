import type { NextRequest } from "next/server";
import { renderOgImage } from "@/lib/og-image";
import { isDocsLang, siteName } from "@/lib/seo-meta";
import { source } from "@/lib/source";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  if (!isDocsLang(lang)) {
    return new Response("Not found", { status: 404 });
  }

  const slugParam = request.nextUrl.searchParams.get("slug");
  const slugs = slugParam ? slugParam.split("/").filter(Boolean) : [];
  const page = source.getPage(slugs, lang);

  return renderOgImage({
    lang,
    title: page?.data.title ?? siteName[lang],
    description: page?.data.description,
  });
}
