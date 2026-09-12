import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18nProvider, uiTranslations } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: {
      displayName: "English",
    },
    fa: {
      displayName: "فارسی",
      "Search(search dialog)": "جستجو",
      "Search(search trigger)": "جستجو",
      "No results found(search dialog)": "نتیجه‌ای پیدا نشد",
      "On this page(table of contents)": "در این صفحه",
      "No Headings(table of contents)": "این صفحه عنوانی ندارد",
      "Last updated on(page footer)": "آخرین به‌روزرسانی",
      "Choose a language(language switcher)": "زبان",
      "Next Page(pagination)": "بعدی",
      "Previous Page(pagination)": "قبلی",
      "Toggle Theme(theme switcher)(aria-label)": "پوسته",
    },
  });

export function getI18nProvider(locale: string) {
  return i18nProvider(translations, locale);
}

export function baseOptions(locale: string): BaseLayoutProps {
  const isFa = locale === "fa";

  return {
    nav: {
      title: isFa ? "دانشنامه سئو" : "SEO Encyclopedia",
      url: `/${locale}`,
    },
    links: [
      {
        type: "main",
        text: isFa ? "مستندات" : "Docs",
        url: `/${locale}/docs`,
      },
    ],
  };
}
