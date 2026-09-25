"use client";

import { useEffect, useState } from "react";
import { Download, FileText, BookOpen, Coins, MapPin, Scale } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import DynamicText from "@/components/common/DynamicText";
import { getPublicResource } from "@/lib/api";
import { downloads as fallbackDownloads } from "@/lib/publicContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface DownloadItem {
  title: string;
  category?: string;
  type?: string;
  fileUrl?: string;
  description?: string;
  icon?: any;
}

const dlIconMap: Record<string, any> = {
  "Reports": FileText,
  "Planning": BookOpen,
  "Finance": Coins,
  "Forms": Download,
  "Brochures": MapPin,
  "Policies": Scale,
};

export default function DownloadsPage() {
  const { t } = useLanguage();
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  useEffect(() => {
    async function loadDownloads() {
      try {
        const fetched: DownloadItem[] = await getPublicResource("downloads", fallbackDownloads);
        setDownloads(fetched);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadDownloads();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="downloads.eyebrow"
        titleKey="downloads.title"
        descriptionKey="downloads.description"
        iconName="Download"
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-gray-100 bg-[#F8F6F1] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#6B7280]">
            <span>{t("downloads.category")}</span>
            <span>{t("downloads.status")}</span>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-xs font-bold text-[#50627A]">{t("common.loading")}</div>
          ) : downloads.map((item: DownloadItem) => {
            const categoryDisplay = item.category || item.type || "General";
            const Icon = dlIconMap[categoryDisplay] || item.icon || FileText;
            const fileUrl = item.fileUrl;

            return (
              <div key={item.title} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E8F0EA] text-[#1E5631]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <DynamicText item={item} field="title" fallback={item.title} className="text-sm font-black text-[#2C2C2C]" as="h2" />
                    <DynamicText item={item} field="category" fallback={categoryDisplay} className="text-xs text-[#6B7280]" as="p" />
                    {item.description && <DynamicText item={item} field="description" fallback={item.description} className="mt-1 text-xs text-[#50627A]" as="p" />}
                  </div>
                </div>
                {fileUrl ? (
                  <a
                    href={fileUrl.startsWith("http") ? fileUrl : `${apiBase}${fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-[#1E5631] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#6F4E37]"
                  >
                    {t("common.download")}
                  </a>
                ) : (
                  <span className="rounded-full bg-[#F8F6F1] px-3 py-1 text-xs font-bold text-[#6F4E37]">{t("downloads.prepared")}</span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}