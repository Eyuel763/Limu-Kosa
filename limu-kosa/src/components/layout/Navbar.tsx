'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2 } from 'lucide-react'; 

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

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#1E5631] text-white z-50 border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
          <Building2 className="h-5 w-5 text-[#D4A017]" />
          <span>Limu Kosa Woreda</span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            // Check if the current route matches the link href exactly, 
            // or if it matches sub-routes (except for home route)
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors relative py-1 ${
                  isActive 
                    ? 'text-[#E9C46A] font-bold' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                
                {/* Optional: Add a crisp underline bar under the active route */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A017] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}