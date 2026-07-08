'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { LangCode, TranslationKey, translations } from './translations';

interface LanguageContextValue {
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => translations[key]?.en ?? key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LangCode>('en');

  // Restore from localStorage on mount (client-side only)
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
    return translations[key]?.[language] ?? translations[key]?.en ?? key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
