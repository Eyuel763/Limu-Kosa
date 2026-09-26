"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/common/PageHero";
import DynamicText from "@/components/common/DynamicText";
import PaginationControls, { PaginationMeta } from "@/components/common/PaginationControls";
import { getPublicResource } from "@/lib/api";
import { tourismSites as fallbackTourism } from "@/lib/publicContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const tourismImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

export default function TourismPage() {
  const { tDynamic } = useLanguage();
  const [tourismSites, setTourismSites] = useState<any[]>(fallbackTourism);
  const [page, setPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

  useEffect(() => {
    async function loadTourism() {
      const res: any = await getPublicResource("tourism", fallbackTourism, { page, limit: 5 });
      if (res && typeof res === "object" && "data" in res) {
        setTourismSites(res.data);
        setPaginationMeta(res.meta);
      } else if (Array.isArray(res)) {
        setTourismSites(res);
        setPaginationMeta(null);
      }
    }
    loadTourism();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="tourism.eyebrow"
        titleKey="tourism.title"
        descriptionKey="tourism.description"
        iconName="Globe"
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="divide-y divide-[#E8E1D4] border-y border-[#E8E1D4]">
            {tourismSites.map((site) => (
              <div key={site.title} className="py-6">
                <DynamicText item={site} field="title" fallback={site.title} className="text-2xl font-black text-[#2C2C2C]" as="h2" />
                <DynamicText item={site} field="body" fallback={site.body} className="mt-3 text-base leading-8 text-[#50627A]" as="p" />
              </div>
            ))}

            {paginationMeta && (
              <PaginationControls
                meta={paginationMeta}
                onPageChange={(newPage) => {
                  setPage(newPage);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
              />
            )}
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img src={tourismImage} alt="Green mountain landscape representing tourism" className="h-80 w-full object-cover lg:h-full" />
          </div>
        </section>
      </main>
    </div>
  );
}
