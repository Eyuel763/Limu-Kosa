"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
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
  isNavCollapsed: boolean;
  setIsNavCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserRole?: string;
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
  isNavCollapsed,
  setIsNavCollapsed,
  currentUserRole = "",
}: AdminSidebarProps) {
  const { t } = useLanguage();

  const visibleResources = resources.filter((item) => {
    if (item.key === "users" && currentUserRole !== "ADMIN") {
      return false;
    }
    return true;
  });

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#12351E] py-6 text-white shadow-lg transition-all duration-300 ease-in-out ${
          isNavCollapsed ? "w-[76px] px-2.5" : "w-[280px] px-5"
        } ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className={`flex items-center mb-8 ${isNavCollapsed ? "justify-center flex-col gap-3" : "justify-between"}`}>
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
            <Image
              src="/limu-kosa-logo.png"
              alt="Limu Kosa Woreda logo"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full bg-white p-0.5 shrink-0"
            />
            {!isNavCollapsed && (
              <div className="min-w-0">
                <div className="text-base font-black tracking-tight leading-tight truncate">{t("brand.name")}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#D4A017] truncate">{t("admin.title")}</div>
              </div>
            )}
          </Link>

          <div className="flex items-center gap-1">
            {/* COLLAPSE / EXPAND ICON TOGGLE BUTTON ON DESKTOP */}
            <button
              type="button"
              onClick={() => setIsNavCollapsed((prev) => !prev)}
              className="hidden lg:flex p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition shrink-0 cursor-pointer"
              title={isNavCollapsed ? "Expand Navigation Panel" : "Collapse to Icons Only"}
            >
              {isNavCollapsed ? <ChevronRight className="h-5 w-5 text-[#D4A017]" /> : <ChevronLeft className="h-5 w-5" />}
            </button>

            {/* MOBILE CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* NAVIGATION LIST */}
        <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-130px)] scrollbar-none">
          {visibleResources.map((item) => {
            const Icon = item.icon;
            const translationKey = `admin.tab.${item.key}` as TranslationKey;
            const translatedLabel = t(translationKey) !== translationKey ? t(translationKey) : item.label;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setActive(item.key);
                  setSelectedId(null);
                  setFormState({ ...templates[item.key] });
                  setIsSidebarOpen(false);
                }}
                className={`group relative flex w-full items-center rounded-xl transition ${
                  isNavCollapsed
                    ? "justify-center p-3"
                    : "gap-3 px-3.5 py-3 text-left text-xs font-bold tracking-wide"
                } ${
                  active === item.key
                    ? "bg-white text-[#12351E] shadow-sm font-black"
                    : "text-white/80 hover:bg-white/10"
                }`}
                title={isNavCollapsed ? translatedLabel : undefined}
              >
                <Icon className={`shrink-0 ${isNavCollapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                {!isNavCollapsed && <span className="truncate">{translatedLabel}</span>}

                {/* HOVER TOOLTIP POPUP IN COLLAPSED ICON MODE */}
                {isNavCollapsed && (
                  <div className="absolute left-full ml-3.5 px-3 py-1.5 bg-[#2C2C2C] text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-gray-700">
                    {translatedLabel}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
