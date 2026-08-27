"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { Sun, Moon } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

interface AdminLoginProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  login: (e: FormEvent) => void;
  isBusy: boolean;
  message: string;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function AdminLogin({
  email,
  setEmail,
  password,
  setPassword,
  login,
  isBusy,
  message,
  theme,
  toggleTheme,
}: AdminLoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF2ED] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden text-[#2C2C2C]">
      <div className="absolute top-0 left-0 w-80 h-80 lg:w-96 lg:h-96 bg-[#12351E]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 lg:w-96 lg:h-96 bg-[#D4A017]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Language Switcher + Theme Toggle in Login Screen */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <LanguageSwitcher variant="light" />
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white hover:bg-gray-100 border border-[#D7DED5] transition-colors text-[#1E5631] cursor-pointer shadow-sm"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
        </button>
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-[#D7DED5] relative z-10">
        <div className="text-center">
          <Image
            src="/limu-kosa-logo.png"
            alt="Limu Kosa Woreda logo"
            width={72}
            height={72}
            className="mx-auto h-20 w-20 rounded-full bg-white p-1 border-2 border-[#1E5631] shadow-sm"
            priority
          />
          <h2 className="mt-5 text-3xl font-black text-[#1E5631] tracking-tight">Limu Kosa</h2>
          <p className="mt-1.5 text-xs font-black text-[#6F4E37] uppercase tracking-widest">
            Government Administration CMS
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={login}>
          {message && (
            <div className="rounded-md bg-[#F8F6F1] border border-[#E8E1D4] px-4 py-3 text-xs font-bold text-[#6F4E37] text-center">
              {message}
            </div>
          )}

          <div className="rounded-md space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3.5 py-3 border border-[#D7DED5] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] text-sm"
                placeholder="admin@limukosa.gov.et"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3.5 py-3 border border-[#D7DED5] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isBusy}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#1E5631] hover:bg-[#12351E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E5631] transition active:scale-95 shadow-sm disabled:opacity-40"
            >
              {isBusy ? "Authenticating..." : "Sign In to Admin Panel"}
            </button>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs font-bold text-[#6F4E37] hover:text-[#1E5631] transition">
              ← Back to public website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
