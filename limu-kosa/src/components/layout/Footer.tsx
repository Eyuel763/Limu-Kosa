import React from 'react';
import { Mail, Phone, MapPin, Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#16361F] text-gray-200 pt-12 pb-6 border-t-4 border-[#D4A017]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Coffee className="h-5 w-5 text-[#D4A017]" /> Limu Kosa Woreda
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Official public administration portal. Dedicated to transparency, economic development, and sharing our agricultural and coffee heritage.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/announcements" className="hover:text-[#D4A017] transition-colors">Public Notices & Announcements</a></li>
            <li><a href="/investment" className="hover:text-[#D4A017] transition-colors">Investment Sectors</a></li>
            <li><a href="/downloads" className="hover:text-[#D4A017] transition-colors">Official Documents & Reports</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact Information</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#D4A017]" /> Jimma Zone, Oromia, Ethiopia
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#D4A017]" /> +251 97 111 XXXX
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#D4A017]" /> info@limukosa.gov.et
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-emerald-900 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Limu Kosa Woreda Administration. All rights reserved.
      </div>
    </footer>
  );
}