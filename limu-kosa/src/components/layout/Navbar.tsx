'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { TranslationKey } from '@/lib/i18n/translations';

const navLinks: { key: TranslationKey; href: string }[] = [
  { key: 'nav.home',        href: '/' },
  { key: 'nav.about',       href: '/about' },
  { key: 'nav.departments', href: '/departments' },
  { key: 'nav.leadership',  href: '/leadership' },
  { key: 'nav.news',        href: '/news' },
  { key: 'nav.projects',    href: '/projects' },
  { key: 'nav.tourism',     href: '/tourism' },
  { key: 'nav.gallery',     href: '/gallery' },
  { key: 'nav.contact',     href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { t } = useLanguage();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('limu-kosa-theme', nextTheme);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  if (isAdmin) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/95 text-[#1E5631] z-50 border-b border-[#E8E1D4] px-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 font-black text-lg tracking-tight z-50">
          <Image src="/limu-kosa-logo.png" alt="Limu Kosa Woreda logo" width={44} height={44} className="h-11 w-11 rounded-full" />
          <span>Limu Kosa Woreda</span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs lg:text-sm transition-colors relative py-1 ${
                  isActive ? 'text-[#1E5631] font-bold' : 'text-[#50627A] hover:text-[#1E5631]'
                }`}
              >
                {t(link.key)}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A017] rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Language Switcher */}
          <LanguageSwitcher variant="light" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[#E8F0EA] transition-colors text-[#1E5631] cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={toggleMenu}
          className="p-2 md:hidden hover:bg-[#E8F0EA] rounded-md transition-colors z-50 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-white pt-24 px-6 z-40 md:hidden flex flex-col gap-y-4 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-semibold py-3 border-b border-gray-100 transition-colors ${
                  isActive ? 'text-[#1E5631]' : 'text-[#50627A]'
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}

          {/* Mobile Language + Theme row */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <LanguageSwitcher variant="light" />
            <button
              onClick={() => { toggleTheme(); setIsOpen(false); }}
              className="flex items-center gap-2 font-semibold py-2 text-[#50627A]"
            >
              {theme === 'light' ? (
                <><Moon className="h-5 w-5 text-[#1E5631]" /><span>{t('common.darkMode')}</span></>
              ) : (
                <><Sun className="h-5 w-5 text-amber-500" /><span>{t('common.lightMode')}</span></>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
