'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { LangCode, TranslationKey, translations, dynamicFallbackMap } from './translations';

interface LanguageContextValue {
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
  t: (key: TranslationKey) => string;
  tDynamic: (item: any, field: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => translations[key]?.en ?? key,
  tDynamic: (item, field) => item?.[field] ?? '',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LangCode>('en');
  const [clientCache, setClientCache] = useState<Record<string, string>>({});

  // Restore language & client translation cache from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('limu-kosa-lang') as LangCode | null;
      if (saved && ['en', 'am', 'om'].includes(saved)) {
        setLanguageState(saved);
        document.documentElement.setAttribute('lang', saved === 'am' ? 'am' : saved === 'om' ? 'om' : 'en');
      }
      const savedCache = localStorage.getItem('limu-kosa-trans-cache');
      if (savedCache) {
        setClientCache(JSON.parse(savedCache));
      }
    } catch {}
  }, []);

  const setLanguage = useCallback((lang: LangCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('limu-kosa-lang', lang);
      document.documentElement.setAttribute('lang', lang === 'am' ? 'am' : lang === 'om' ? 'om' : 'en');
    } catch {}
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[key]?.[language] ?? translations[key]?.en ?? key;
  }, [language]);

  const tDynamic = useCallback((item: any, field: string): string => {
    if (!item) return '';
    const rawVal = typeof item === 'string' ? item : item[field];
    if (!rawVal || typeof rawVal !== 'string') return rawVal ?? '';
    if (language === 'en') return rawVal;

    // 1. Check if item has explicit translations object from DB
    if (item?.translations?.[language]?.[field]) {
      return item.translations[language][field];
    }

    // 2. Check dynamic fallback dictionary map
    if (dynamicFallbackMap[rawVal]?.[language]) {
      return dynamicFallbackMap[rawVal][language];
    }

    // 3. Check client translation cache
    const cacheKey = `${language}:${rawVal}`;
    if (clientCache[cacheKey]) {
      return clientCache[cacheKey];
    }

    // 4. Trigger background client fetch translation if not cached
    if (typeof window !== 'undefined' && rawVal.length > 1 && !rawVal.startsWith('http')) {
      const langPair = language === 'am' ? 'en|am' : 'en|or';
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawVal.slice(0, 500))}&langpair=${langPair}`)
        .then((res) => res.json())
        .then((data) => {
          const translated = data?.responseData?.translatedText;
          if (translated && typeof translated === 'string' && !translated.startsWith('MYMEMORY WARNING')) {
            setClientCache((prev) => {
              const updated = { ...prev, [cacheKey]: translated };
              try { localStorage.setItem('limu-kosa-trans-cache', JSON.stringify(updated)); } catch {}
              return updated;
            });
          }
        })
        .catch(() => {});
    }

    return rawVal;
  }, [language, clientCache]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tDynamic }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
