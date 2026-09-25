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

  // Restore language preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('limu-kosa-lang') as LangCode | null;
      if (saved && ['en', 'am', 'om'].includes(saved)) {
        setLanguageState(saved);
        document.documentElement.setAttribute('lang', saved === 'am' ? 'am' : saved === 'om' ? 'om' : 'en');
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
    // 1. Check static translations dictionary for active language
    if (translations[key]?.[language]) return translations[key][language];
    // 2. Fall back to English if available
    if (translations[key]?.en) return translations[key].en;
    // 3. Fall back to key itself
    return key;
  }, [language]);

  const tDynamic = useCallback((item: any, field: string): string => {
    if (!item) return '';
    const rawVal = typeof item === 'string' ? item : item[field];
    if (!rawVal || typeof rawVal !== 'string') return rawVal ?? '';
    if (language === 'en') return rawVal;

    // 1. Check if item has explicit translations object from DB/Admin input
    if (typeof item !== 'string' && item?.translations?.[language]?.[field]) {
      return item.translations[language][field];
    }

    // 2. Check dynamic fallback dictionary map
    if (dynamicFallbackMap[rawVal]?.[language]) {
      return dynamicFallbackMap[rawVal][language];
    }

    // 3. Fall back to English string
    return rawVal;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tDynamic }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
