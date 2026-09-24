'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Coffee } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const [generalSettings, setGeneralSettings] = useState<any>(null);
  const [channels, setChannels] = useState<any[]>([]);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";
    fetch(`${apiBase}/public/settings/general`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.metadata) {
          setGeneralSettings(data.metadata);
        }
      })
      .catch(() => {});

    fetch(`${apiBase}/public/settings/contact-info`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.metadata?.channels) {
          setChannels(data.metadata.channels);
        }
      })
      .catch(() => {});
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const customPhone = channels.find(c => c.label.toLowerCase() === 'telephone')?.value;
  const customEmail = channels.find(c => c.label.toLowerCase() === 'email')?.value;

  return (
    <footer className="bg-[#16361F] text-gray-200 pt-12 pb-6 border-t-4 border-[#D4A017]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Coffee className="h-5 w-5 text-[#D4A017]" /> Limu Kosa Woreda
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {generalSettings?.footerTagline || t('footer.tagline')}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/announcements" className="hover:text-[#D4A017] transition-colors">{t('nav.news')} &amp; {t('announcements.title')}</Link></li>
            <li><Link href="/investment" className="hover:text-[#D4A017] transition-colors">{t('investment.title')}</Link></li>
            <li><Link href="/downloads" className="hover:text-[#D4A017] transition-colors">{t('downloads.title')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#D4A017]" /> {t('footer.location')}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#D4A017]" /> {customPhone || "+251 97 111 XXXX"}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#D4A017]" /> {customEmail || "info@limukosa.gov.et"}
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-emerald-900 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Limu Kosa Woreda Administration. {generalSettings?.copyrightText || t('footer.rights')}
      </div>
    </footer>
  );
}
