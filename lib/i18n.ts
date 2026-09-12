import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: ["en", "fa"],
  parser: "dir",
  hideLocale: "never",
  fallbackLanguage: null,
});
