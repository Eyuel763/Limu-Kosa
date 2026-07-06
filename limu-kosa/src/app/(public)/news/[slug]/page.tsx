import { Newspaper, Calendar, ArrowLeft, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getPublicResource } from "@/lib/api";
import { newsItems as fallbackNews } from "@/lib/publicContent";

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

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const newsItems = (await getPublicResource("news", fallbackNews)) as NewsItem[];
  const article = newsItems.find((item) => item.slug === resolvedParams.slug);

  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-black text-[#2C2C2C]">Article Not Found</h2>
        <p className="text-[#50627A] mt-2 max-w-sm">The article you are searching for does not exist or has been modified.</p>
        <Link href="/news" className="mt-6 text-sm font-bold text-[#1E5631] underline">Return to news listing</Link>
      </div>
    );
  }

  const dateDisplay = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : article.date ?? "Public update";

  const imageUrl = article.imageUrl 
    ? (article.imageUrl.startsWith("http") ? article.imageUrl : `${apiBase}${article.imageUrl}`) 
    : "";

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-24 text-[#2C2C2C] w-full overflow-x-hidden">
      {/* Top Banner Title Header - Expanded max-w-7xl and adjusted vertical padding to fix image_81ec03.png spacing */}
      <div className="bg-[#1E5631] text-white pt-24 pb-20 mb-10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white transition uppercase tracking-wider mb-5">
            <ArrowLeft className="h-4 w-4" />
            Back to News Updates
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-5xl break-words">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Main Container - Synchronized with max-w-7xl width */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start auto-rows-max">
          
          {/* Left Side: Media Card Slider Showcase */}
          <div className="bg-white rounded-2xl border border-[#E8E1D4] shadow-sm overflow-hidden p-0">
            {imageUrl ? (
              <div className="relative aspect-[16/11] w-full bg-gray-900 group">
                <img src={imageUrl} alt={article.title} className="h-full w-full object-cover" />
                
                <button className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition active:scale-95">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition active:scale-95">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="p-4 flex items-stretch">
                <div className="w-full min-h-[220px] flex items-center justify-center rounded-xl bg-[#F8F9FA] border border-dashed border-[#DDE2E5]">
                  <Newspaper className="h-12 w-12 text-[#C1C9D2]" />
                </div>
              </div>
            )}
            
            <div className="p-4 border-t border-[#EEF2ED] text-center bg-[#FAF9F6]">
              <p className="text-xs font-bold text-[#50627A] break-words">
                {article.title} documentation showcase.
              </p>
              <div className="text-[10px] font-mono text-gray-400 mt-1">1 / 1</div>
            </div>
          </div>

          {/* Right Side: Structured Metadata & Content Blocks */}
          <div className="space-y-6 min-w-0 w-full">
            
            {/* Split Info Card Row */}
            <div className="bg-white rounded-xl border border-[#E8E1D4] shadow-sm p-4 grid grid-cols-2 gap-4 divide-x divide-[#EEF2ED]">
              <div className="flex items-center gap-3 pl-2">
                <Calendar className="h-5 w-5 text-[#1E5631] shrink-0" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">Published</div>
                  <div className="text-xs font-bold text-[#2C2C2C]">{dateDisplay}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-4">
                <Tag className="h-5 w-5 text-[#1E5631] shrink-0" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">Category</div>
                  <div className="text-xs font-bold text-[#2C2C2C]">{article.category ?? "General"}</div>
                </div>
              </div>
            </div>

            {/* Prominent Styled Excerpt Box */}
            {article.excerpt && (
              <h2 className="text-lg sm:text-xl font-black text-[#1E5631] leading-relaxed tracking-tight break-words">
                {article.excerpt}
              </h2>
            )}

            {/* Core Body Content Flow */}
            <div className="text-sm sm:text-base leading-8 text-[#50627A] whitespace-pre-wrap font-medium break-words">
              {article.body || "No additional detailed body write-up has been provided for this article."}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}