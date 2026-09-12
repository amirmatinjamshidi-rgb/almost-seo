import { Callout } from "fumadocs-ui/components/callout";
import type { ReactNode } from "react";

export function IncorrectExample({
  children,
  why,
  title = "Incorrect",
}: {
  children: ReactNode;
  why: string;
  title?: string;
}) {
  return (
    <Callout type="error" title={title}>
      {children}
      <p className="mt-3 text-sm font-medium">{why}</p>
    </Callout>
  );
}
