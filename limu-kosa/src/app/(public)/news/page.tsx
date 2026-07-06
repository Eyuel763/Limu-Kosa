"use client";

import { useEffect, useState } from "react";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import PublicHero from "@/components/common/PublicHero";

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
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`${apiBase}/api/public/news`);
        if (response.ok) {
          const data = await response.json();
          setNewsItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [apiBase]);

  const categories = ["All", ...Array.from(new Set(newsItems.map((item) => item.category).filter(Boolean)))];

  const filteredNews = selectedCategory === "All"
    ? newsItems
    : newsItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20 text-[#2C2C2C]">
      <PublicHero
        eyebrow="Official updates"
        title="News"
        description="Public updates from the woreda administration, sector offices, development programs, and community initiatives."
        icon={Newspaper}
      />
      
      {/* Expanded max-w-7xl layout container to fix whitespace margins */}
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat!)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-all ${
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
          <div className="text-center py-12 text-sm font-bold text-[#50627A]">Loading news updates...</div>
        ) : (
          <div className="space-y-6">
            {filteredNews.map((item) => {
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
                  <article 
                    className="grid gap-0 bg-white rounded-2xl border border-[#E8E1D4] overflow-hidden shadow-sm md:grid-cols-[38%_62%] items-stretch min-h-[260px] transition-all duration-300 hover:shadow-md hover:border-[#1E5631]/30 relative before:absolute before:inset-0 before:bg-[radial-gradient(#e1ded7_1px,transparent_1px)] before:[background-size:16px_16px] before:opacity-30 pointer-events-none [&>*]:pointer-events-auto"
                  >
                    {/* Left Side: Media Placement with fine scaling transitions */}
                    <div className="p-4 md:p-6 flex items-stretch">
                      {imageUrl ? (
                        <div className="relative w-full min-h-[180px] md:min-h-full overflow-hidden rounded-xl border border-[#E8E1D4] shadow-sm">
                          <img 
                            src={imageUrl} 
                            alt={item.title} 
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" 
                          />
                        </div>
                      ) : (
                        <div className="w-full min-h-[180px] md:min-h-full flex items-center justify-center rounded-xl bg-[#F8F9FA] border border-dashed border-[#DDE2E5] transition-colors group-hover:bg-[#EEF2ED]">
                          <Newspaper className="h-10 w-10 text-[#C1C9D2] transition-colors group-hover:text-[#1E5631]" />
                        </div>
                      )}
                    </div>

                    {/* Right Side: Card Text Info Details */}
                    <div className="flex flex-col justify-between p-6 pl-2 md:pl-0 lg:p-8 lg:pl-0 z-10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-[#6F4E37]">
                            {item.category ?? "General"}
                          </span>
                          <span className="text-xs text-[#A0AEC0]">•</span>
                          <span className="text-xs font-medium text-[#7A8B9E] flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {dateDisplay}
                          </span>
                        </div>
                        
                        <h2 className="mt-2.5 text-xl lg:text-2xl font-black text-[#2C2C2C] leading-snug tracking-tight group-hover:text-[#1E5631] transition-colors break-words">
                          {item.title}
                        </h2>
                        
                        <p className="mt-3 text-sm leading-relaxed text-[#50627A] line-clamp-3 break-words">
                          {item.excerpt}
                        </p>
                      </div>

                      {/* Unified Read More styling matching projects page layout action */}
                      <div className="mt-6 flex items-center gap-1 text-sm font-black text-[#D4A017] group-hover:text-[#B88714] transition-colors">
                        <span>Read full article</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}

            {filteredNews.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-[#E8E1D4] text-[#50627A] font-medium">
                No news articles found under this section.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}