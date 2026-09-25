"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/common/PageHero";
import DynamicText from "@/components/common/DynamicText";
import { getPublicResource } from "@/lib/api";
import { announcements as fallbackAnnouncements } from "@/lib/publicContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AnnouncementsPage() {
  const { t, tDynamic } = useLanguage();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const fetched = await getPublicResource("announcements", fallbackAnnouncements);
        setAnnouncements(fetched);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="announcements.eyebrow"
        titleKey="announcements.title"
        descriptionKey="announcements.description"
        iconName="Bell"
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-[#50627A]">{t("common.loading")}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {announcements.map((notice) => {
              const noticeAny = notice as any;
              const typeDisplay = noticeAny.category ?? noticeAny.type ?? "Notice";
              const dateDisplay = noticeAny.publishedAt
                ? new Date(noticeAny.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : noticeAny.date ?? "Public update";

              return (
                <article key={notice.title} className="rounded-lg border-t-4 border-[#D4A017] bg-white p-6 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-[#6F4E37]">
                    <DynamicText item={notice} field="category" fallback={typeDisplay} />
                  </div>
                  <DynamicText item={notice} field="title" fallback={notice.title} className="mt-3 text-xl font-black leading-tight text-[#2C2C2C]" as="h2" />
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#6B7280]">{tDynamic(dateDisplay, "")}</p>
                  <DynamicText item={notice} field="body" fallback={notice.body} className="mt-4 text-sm leading-7 text-[#6B7280]" as="p" />
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
