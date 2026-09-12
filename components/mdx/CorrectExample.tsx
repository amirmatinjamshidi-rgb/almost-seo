import { Callout } from "fumadocs-ui/components/callout";
import type { ReactNode } from "react";

export function CorrectExample({
  children,
  title = "Correct",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <Callout type="success" title={title}>
      {children}
    </Callout>
  );
}
