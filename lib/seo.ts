import { locales } from "./locales";

const FALLBACK_SITE_URL = "https://arrobapunto.com";

const sanitizeUrl = (input?: string | null) => {
  if (!input) return FALLBACK_SITE_URL;
  try {
    const url = new URL(input);
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const getSiteUrl = () => sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim());

export const SITE_URL = getSiteUrl();

let metadataBaseUrl: URL;
try {
  metadataBaseUrl = new URL(SITE_URL);
} catch {
  metadataBaseUrl = new URL(FALLBACK_SITE_URL);
}

export const METADATA_BASE = metadataBaseUrl;

function normalizePath(path: string | undefined) {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildCanonicalUrl(locale: string, path?: string, siteUrl: string = SITE_URL) {
  const normalizedPath = normalizePath(path);
  const localePrefix = `/${locale}`;
  return `${siteUrl}${localePrefix}${normalizedPath}`;
}

export function buildAlternateLanguages(path?: string, siteUrl: string = SITE_URL) {
  const normalizedPath = normalizePath(path);
  return locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = `${siteUrl}/${locale}${normalizedPath}`;
    return acc;
  }, {});
}

export function getLocalizedTitle(locale: string, es: string, en: string) {
  return locale === "en" ? en : es;
}


