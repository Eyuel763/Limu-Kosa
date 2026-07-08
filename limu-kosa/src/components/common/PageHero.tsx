'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { TranslationKey } from '@/lib/i18n/translations';
import {
  Compass, Landmark, Building2, Users2, Newspaper, Layers,
  Camera, Bell, Phone, Map, Sprout, Download, Globe
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass, Landmark, Building2, Users2, Newspaper, Layers,
  Camera, Bell, Phone, Map, Sprout, Download, Globe,
};

interface Props {
  eyebrowKey: TranslationKey;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  iconName: string;
  gradient?: string;
}

export default function PageHero({ eyebrowKey, titleKey, descriptionKey, iconName, gradient }: Props) {
  const { t } = useLanguage();
  const Icon = iconMap[iconName] ?? Compass;
  const bg = gradient ?? 'from-[#159447] to-[#0E6E36]';

  return (
    <section className={`bg-gradient-to-r ${bg} px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F4D06F] mb-4">
            <Icon className="h-4 w-4" />
            {t(eyebrowKey)}
          </div>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl mb-4">{t(titleKey)}</h1>
          <p className="text-base text-green-100 leading-relaxed sm:text-lg">{t(descriptionKey)}</p>
        </div>
      </div>
    </section>
  );
}
