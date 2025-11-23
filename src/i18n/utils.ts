import sv from './sv.json';
import en from './en.json';

export type Language = 'sv' | 'en';
export const defaultLanguage: Language = 'sv';
export const supportedLanguages: Language[] = ['sv', 'en'];

const translations = {
  sv,
  en,
} as const;

export function getLanguageFromUrl(url: URL): Language {
  // Check pathname first (e.g., /en/ or /sv/)
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  if (firstSegment && supportedLanguages.includes(firstSegment as Language)) {
    return firstSegment as Language;
  }
  
  // Fallback to query parameter (for backwards compatibility)
  const langParam = url.searchParams.get('lang');
  const lang = langParam as Language | null;
  
  if (lang && supportedLanguages.includes(lang)) {
    return lang;
  }
  
  return defaultLanguage;
}

export function getTranslations(lang: Language) {
  return translations[lang];
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Remove leading slash and split path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const [basePath, hash] = cleanPath.split('#');
  
  // Build path with language prefix
  const langPrefix = lang === defaultLanguage ? '' : `/${lang}`;
  const pathWithLang = `${langPrefix}/${basePath}`.replace(/\/+/g, '/');
  
  return hash ? `${pathWithLang}#${hash}` : pathWithLang;
}

export function switchLanguage(currentUrl: URL, newLang: Language): string {
  // Extract current path without language prefix
  const pathSegments = currentUrl.pathname.split('/').filter(Boolean);
  const currentLangInPath = pathSegments[0];
  
  // Remove language prefix if present
  let basePath = pathSegments.filter(seg => !supportedLanguages.includes(seg as Language)).join('/');
  if (!basePath) basePath = '';
  
  // Build new path with language prefix
  const langPrefix = newLang === defaultLanguage ? '' : `/${newLang}`;
  const newPath = `${langPrefix}/${basePath}`.replace(/\/+/g, '/');
  
  const newUrl = new URL(newPath, currentUrl.origin);
  newUrl.hash = currentUrl.hash;
  
  return newUrl.toString();
}

