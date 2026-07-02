"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Landmark } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Departments', href: '/departments' },
  { label: 'News', href: '/news' },
  { label: 'Projects', href: '/projects' },
  { label: 'Tourism', href: '/tourism' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1E5631] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Landmark className="h-6 w-6 text-[#D4A017]" />
            <span className="font-bold text-lg tracking-wide">Limu Kosa Woreda</span>
          </div>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="hover:text-[#D4A017] transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#D4A017] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#1E5631] border-t border-emerald-800 px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800 hover:text-[#D4A017]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}