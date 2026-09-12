import { loader } from "fumadocs-core/source";
import { pageSchema } from "fumadocs-core/source/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import { z } from "zod";
import { i18n } from "@/lib/i18n";

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      module: z.string(),
      topic_order: z.number(),
      lang: z.enum(["en", "fa"]),
      last_reviewed: z.string(),
    }),
  },
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  i18n,
});
