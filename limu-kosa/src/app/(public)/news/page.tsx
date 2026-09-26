"use client";

import { useEffect, useState } from "react";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import PaginationControls, { PaginationMeta } from "@/components/common/PaginationControls";
import { getPublicResource } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface NewsItem {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  category?: string;
  status?: string;
  imageUrl?: string;
  publishedAt?: string | Date;
  date?: string;
  translations?: any;
}

const categoriesList = ["All", "Administration", "Public notice", "Development", "Events"];

export default function NewsPage() {
  const { t, tDynamic } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const res: any = await getPublicResource("news", [], {
          page,
          limit: 6,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
        });

        if (res && typeof res === "object" && "data" in res) {
          setNewsItems(res.data);
          setPaginationMeta(res.meta);
        } else if (Array.isArray(res)) {
          setNewsItems(res);
          setPaginationMeta(null);
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [page, selectedCategory]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20 text-[#2C2C2C]">
      <PageHero
        eyebrowKey="news.eyebrow"
        titleKey="news.title"
        descriptionKey="news.description"
        iconName="Newspaper"
      />
      
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1E5631] text-white shadow-sm"
                  : "bg-[#EEEBE4] text-[#50627A] hover:bg-[#E4DFD5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-sm font-bold text-[#50627A]">Loading news updates...</div>
        ) : (
          <div className="space-y-6">
            {newsItems.map((item) => {
              const dateDisplay = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : item.date ?? "Public update";
              const imageUrl = item.imageUrl ? (item.imageUrl.startsWith("http") ? item.imageUrl : `${apiBase}${item.imageUrl}`) : "";

              return (
                <Link 
                  href={`/news/${item.slug}`} 
                  key={item.slug ?? item.title}
                  className="block group"
                >
                  <article className="grid gap-0 bg-white rounded-2xl border border-[#E8E1D4] overflow-hidden shadow-sm md:grid-cols-[38%_62%] items-stretch min-h-[250px] transition-all duration-300 hover:shadow-md hover:border-[#1E5631]/30 relative before:absolute before:inset-0 before:bg-[radial-gradient(#e1ded7_1px,transparent_1px)] before:[background-size:16px_16px] before:opacity-30 pointer-events-none [&>*]:pointer-events-auto">
                    
                    {/* Left Side: Thumbnail Preview */}
                    <div className="p-4 md:p-6 flex items-stretch">
                      {imageUrl ? (
                        <div className="relative w-full min-h-[180px] md:min-h-full overflow-hidden rounded-xl border border-[#E8E1D4] bg-gray-50 shrink-0">
                          <img 
                            src={imageUrl} 
                            alt={item.title} 
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" 
                          />
                        </div>
                      ) : (
                        <div className="w-full min-h-[180px] md:min-h-full flex items-center justify-center rounded-xl bg-[#F8F9FA] border border-dashed border-[#DDE2E5] transition-colors group-hover:bg-[#EEF2ED] shrink-0">
                          <Newspaper className="h-10 w-10 text-[#C1C9D2] transition-colors group-hover:text-[#1E5631]" />
                        </div>
                      )}
                    </div>

                    {/* Right Side: Text Details */}
                    <div className="flex flex-col justify-between p-6 pl-2 md:pl-0 lg:p-8 lg:pl-0 z-10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-[#6F4E37]">
                            {tDynamic(item, "category") || "General"}
                          </span>
                          <span className="text-xs text-[#A0AEC0]">•</span>
                          <span className="text-xs font-medium text-[#7A8B9E] flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {dateDisplay}
                          </span>
                        </div>
                        
                        <h2 className="mt-2.5 text-xl lg:text-2xl font-black text-[#2C2C2C] leading-snug tracking-tight group-hover:text-[#1E5631] transition-colors break-words">
                          {tDynamic(item, "title")}
                        </h2>
                        
                        <p className="mt-3 text-sm leading-relaxed text-[#50627A] line-clamp-3 break-words">
                          {tDynamic(item, "excerpt")}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center gap-1 text-sm font-black text-[#D4A017] group-hover:text-[#B88714] transition-colors">
                        <span>{t("news.readFull")}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}

            {newsItems.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-[#E8E1D4] text-[#50627A] font-medium">
                No news articles found under this section.
              </div>
            )}

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
        )}
      </main>
    </div>
  );
}