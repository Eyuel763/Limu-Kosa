'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Departments', href: '/departments' },
  { name: 'News', href: '/news' },
  { name: 'Projects', href: '/projects' },
  { name: 'Tourism', href: '/tourism' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#1E5631] text-white z-50 border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight z-50">
          <Building2 className="h-5 w-5 text-[#D4A017]" />
          <span>Limu Kosa Woreda</span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors relative py-1 ${
                  isActive ? 'text-[#E9C46A] font-bold' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A017] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* MOBILE HAMBURGER BUTTON (Visible only on small screens) */}
        <button 
          onClick={toggleMenu}
          className="p-2 md:hidden hover:bg-white/10 rounded-md transition-colors z-50 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#1E5631] pt-24 px-6 z-40 md:hidden flex flex-col gap-y-4 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close drawer on navigation
                className={`text-lg font-semibold py-3 border-b border-white/5 transition-colors ${
                  isActive ? 'text-[#E9C46A]' : 'text-white/90'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}