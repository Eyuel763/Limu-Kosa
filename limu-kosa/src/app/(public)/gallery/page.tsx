"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import DynamicText from "@/components/common/DynamicText";
import { getPublicResource } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category?: string;
  altText?: string;
}

export default function GalleryPage() {
  const { t } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  useEffect(() => {
    async function loadGallery() {
      try {
        const fetched: GalleryImage[] = await getPublicResource("gallery", []);
        setImages(fetched);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="gallery.eyebrow"
        titleKey="gallery.title"
        descriptionKey="gallery.description"
        iconName="Camera"
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-[#50627A]">{t("common.loading")}</div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-100 shadow-sm">
            <Camera className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-sm font-black text-[#2C2C2C]">{t("gallery.empty")}</h3>
            <p className="mt-2 text-xs text-[#50627A]">{t("gallery.emptyDesc")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {images.map((img: GalleryImage) => {
              const fullUrl = img.imageUrl.startsWith("http") 
                ? img.imageUrl 
                : `${apiBase}${img.imageUrl}`;
                
              return (
                <article key={img.id} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                    <img
                      src={fullUrl}
                      alt={img.altText || img.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    {img.category && (
                      <span className="inline-block rounded bg-[#E8F0EA] px-2.5 py-0.5 text-xs font-bold text-[#1E5631]">
                        <DynamicText item={img} field="category" fallback={img.category} />
                      </span>
                    )}
                    <DynamicText item={img} field="title" fallback={img.title} className="mt-2 text-base font-black text-[#2C2C2C] leading-snug" as="h2" />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}