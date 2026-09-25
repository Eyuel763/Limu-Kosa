"use client";

import Image from "next/image";
import Link from "next/link";
import { X, LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TranslationKey } from "@/lib/i18n/translations";

interface ResourceItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  resources: ResourceItem[];
  active: string;
  setActive: (key: string) => void;
  setSelectedId: (id: string | null) => void;
  setFormState: (state: any) => void;
  templates: Record<string, any>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}

export default function AdminSidebar({
  resources,
  active,
  setActive,
  setSelectedId,
  setFormState,
  templates,
  isSidebarOpen,
  setIsSidebarOpen,
}: AdminSidebarProps) {
  const { t } = useLanguage();

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#12351E] px-5 py-6 text-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
            <Image
              src="/limu-kosa-logo.png"
              alt="Limu Kosa Woreda logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white p-0.5 shrink-0"
            />
            <div>
              <div className="text-lg font-black tracking-tight leading-tight">Limu Kosa</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#D4A017]">{t("admin.title")}</div>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-1">
          {resources.map((item) => {
            const Icon = item.icon;
            const translationKey = `admin.tab.${item.key}` as TranslationKey;
            const translatedLabel = t(translationKey) !== translationKey ? t(translationKey) : item.label;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setSelectedId(null);
                  setFormState({ ...templates[item.key] });
                  setIsSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-xs font-bold tracking-wide transition ${
                  active === item.key ? "bg-white text-[#12351E] shadow-sm" : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{translatedLabel}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
