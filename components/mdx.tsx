import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComparisonTable } from "@/components/mdx/ComparisonTable";
import { CorrectExample } from "@/components/mdx/CorrectExample";
import { IncorrectExample } from "@/components/mdx/IncorrectExample";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    CorrectExample,
    IncorrectExample,
    ComparisonTable,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
