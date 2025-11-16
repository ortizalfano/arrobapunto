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

export function buildCanonicalUrl(path?: string, siteUrl: string = SITE_URL) {
  const normalizedPath = normalizePath(path);
  return `${siteUrl}${normalizedPath}`;
}

export function buildAlternateLanguages(path?: string, siteUrl: string = SITE_URL) {
  const normalizedPath = normalizePath(path);
  return {
    es: `${siteUrl}${normalizedPath}`,
  };
}

export function getLocalizedTitle(es: string) {
  return es;
}


