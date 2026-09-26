"use client";

import { useEffect, useState, use } from "react";
import { Building2, MapPin, ArrowLeft, Tag, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import { getPublicResource, getPublicResourceItems } from "@/lib/api";
import { projects as fallbackProjects } from "@/lib/publicContent";
import DynamicText from "@/components/common/DynamicText";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Project {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  status?: string;
  location?: string;
  imageUrl?: string;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { t, tDynamic } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  useEffect(() => {
    async function loadProject() {
      try {
        // Try fetching single item directly from backend first
        const fetchedSingle = await getPublicResource<Project | null>(`projects/${resolvedParams.slug}`, null);
        if (fetchedSingle && fetchedSingle.slug) {
          setProject(fetchedSingle);
          return;
        }

        // Fallback search in list
        const projectsList = await getPublicResourceItems<Project>("projects", fallbackProjects as any);
        const found = projectsList.find((p) => p.slug === resolvedParams.slug);
        if (found) setProject(found);
      } catch (err) {
        console.error("Failed to load project detail", err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center p-4 text-sm font-bold text-[#50627A]">{t("common.loading")}</div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-black text-[#2C2C2C]">{tDynamic("Project Tracker Record Not Found", "")}</h2>
        <p className="text-[#50627A] mt-2 max-w-sm">{tDynamic("The development map layout you seek does not exist or has moved.", "")}</p>
        <Link href="/projects" className="mt-6 text-sm font-bold text-[#1E5631] underline">{tDynamic("Return to developments", "")}</Link>
      </div>
    );
  }

  const imageUrl = project.imageUrl 
    ? (project.imageUrl.startsWith("http") ? project.imageUrl : `${apiBase}${project.imageUrl}`) 
    : "";

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-24 text-[#2C2C2C] w-full overflow-x-hidden">
      <div className="bg-[#1E5631] text-white pt-24 pb-20 mb-10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white transition uppercase tracking-wider mb-5">
            <ArrowLeft className="h-4 w-4" />
            {tDynamic("Back to Development Projects", "")}
          </Link>
          <DynamicText item={project} field="title" fallback={project.title} className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-5xl break-words" as="h1" />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start auto-rows-max">
          <div className="bg-white rounded-2xl border border-[#E8E1D4] shadow-sm overflow-hidden p-0">
            {imageUrl ? (
              <div className="relative aspect-[16/11] w-full bg-gray-900">
                <img src={imageUrl} alt={project.title} className="h-full w-full object-cover" />
                <button className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="p-4 flex items-stretch">
                <div className="w-full min-h-[240px] flex items-center justify-center rounded-xl bg-[#F8F9FA] border border-dashed border-[#DDE2E5]">
                  <Building2 className="h-12 w-12 text-[#C1C9D2]" />
                </div>
              </div>
            )}
            
            <div className="p-4 border-t border-[#EEF2ED] text-center bg-[#FAF9F6]">
              <p className="text-xs font-bold text-[#50627A] break-words">
                {tDynamic("Official development implementation progress overview tracking data.", "")}
              </p>
            </div>
          </div>

          <div className="space-y-6 min-w-0 w-full">
            <div className="bg-white rounded-xl border border-[#E8E1D4] shadow-sm p-4 grid grid-cols-2 gap-4 divide-x divide-[#EEF2ED]">
              <div className="flex items-center gap-3 pl-2">
                <Calendar className="h-5 w-5 text-[#1E5631] shrink-0" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">{tDynamic("Current Status", "")}</div>
                  <div className="text-xs font-bold text-[#2C2C2C]"><DynamicText item={project} field="status" fallback={project.status || "Ongoing"} /></div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-4">
                <MapPin className="h-5 w-5 text-[#1E5631] shrink-0" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">{tDynamic("Location", "")}</div>
                  <div className="text-xs font-bold text-[#2C2C2C]"><DynamicText item={project} field="location" fallback={project.location || "Woreda-wide"} /></div>
                </div>
              </div>
            </div>

            {project.excerpt && (
              <DynamicText item={project} field="excerpt" fallback={project.excerpt} className="text-lg sm:text-xl font-black text-[#1E5631] leading-relaxed tracking-tight break-words" as="h2" />
            )}

            <div className="text-sm sm:text-base leading-8 text-[#50627A] whitespace-pre-wrap font-medium break-words">
              <DynamicText item={project} field="body" fallback={project.body || "Detailed body tracking framework summaries have not been attached to this deployment log yet."} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}