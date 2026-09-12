import { ImageResponse } from "next/og";
import { siteName } from "@/lib/seo-meta";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOgImage({
  lang,
  title,
  description,
}: {
  lang: string;
  title: string;
  description?: string;
}) {
  const isFa = lang === "fa";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0a0a0a",
        color: "#fafafa",
        direction: isFa ? "rtl" : "ltr",
      }}
    >
      <div style={{ fontSize: 28, opacity: 0.72 }}>{siteName[isFa ? "fa" : "en"]}</div>
      <div style={{ fontSize: 56, fontWeight: 700, marginTop: 20, lineHeight: 1.15 }}>
        {title}
      </div>
      {description ? (
        <div style={{ fontSize: 24, opacity: 0.78, marginTop: 24, maxWidth: 960 }}>
          {description}
        </div>
      ) : null}
    </div>,
    ogSize,
  );
}
