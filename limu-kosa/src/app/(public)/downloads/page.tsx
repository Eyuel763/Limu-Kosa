import { Download, FileText, BookOpen, Coins, MapPin, Scale } from "lucide-react";
import PublicHero from "@/components/common/PublicHero";
import { getPublicResource } from "@/lib/api";
import { downloads as fallbackDownloads } from "@/lib/publicContent";

// Define the interface to satisfy TypeScript
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

export default async function DownloadsPage() {
  // Explicitly type the array as DownloadItem[]
  const downloads: DownloadItem[] = await getPublicResource("downloads", fallbackDownloads);
  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PublicHero
        eyebrow="Official documents"
        title="Downloads"
        description="Access annual reports, strategic plans, budget reports, policies, brochures, and public forms once files are published."
        icon={Download}
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-gray-100 bg-[#F8F6F1] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#6B7280]">
            <span>Document category</span>
            <span>Status</span>
          </div>
          
          {downloads.map((item: DownloadItem) => {
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
                    <h2 className="text-sm font-black text-[#2C2C2C]">{item.title}</h2>
                    <p className="text-xs text-[#6B7280]">{categoryDisplay}</p>
                    {item.description && <p className="mt-1 text-xs text-[#50627A]">{item.description}</p>}
                  </div>
                </div>
                {fileUrl ? (
                  <a
                    href={fileUrl.startsWith("http") ? fileUrl : `${apiBase}${fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-[#1E5631] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#6F4E37]"
                  >
                    Download
                  </a>
                ) : (
                  <span className="rounded-full bg-[#F8F6F1] px-3 py-1 text-xs font-bold text-[#6F4E37]">Prepared</span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}