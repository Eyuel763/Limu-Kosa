'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LangCode } from '@/lib/i18n/translations';

const langs: { code: LangCode; label: string; full: string }[] = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'am', label: 'አማ', full: 'አማርኛ' },
  { code: 'om', label: 'ORO', full: 'Afaan Oromoo' },
];

interface Props {
  /** 'dark' for admin panel, 'light' for navbar default */
  variant?: 'light' | 'dark';
}

export default function LanguageSwitcher({ variant = 'light' }: Props) {
  const { language, setLanguage } = useLanguage();

  const base =
    variant === 'dark'
      ? 'flex items-center gap-1 bg-[#1a2e1a] border border-[#2e4a2e] rounded-lg p-1'
      : 'flex items-center gap-1 bg-[#F0EDE6] border border-[#D9D2C5] rounded-lg p-1';

  const active =
    variant === 'dark'
      ? 'bg-[#1E5631] text-white shadow-sm'
      : 'bg-white text-[#1E5631] shadow-sm';

  const inactive =
    variant === 'dark'
      ? 'text-gray-400 hover:text-white hover:bg-[#243824]'
      : 'text-[#7A7060] hover:text-[#1E5631] hover:bg-white/60';

  return (
    <div className={base} role="group" aria-label="Language switcher">
      {langs.map(({ code, label, full }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          title={full}
          aria-pressed={language === code}
          className={`
            px-2 py-1 rounded-md text-[11px] font-bold tracking-wide
            transition-all duration-200 cursor-pointer
            ${language === code ? active : inactive}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
