import { Building2, MapPin, Waves, Coffee, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import { getPublicResource } from "@/lib/api";
import { projects as fallbackProjects } from "@/lib/publicContent";

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

const projectIconMap: Record<string, any> = {
  "rural-water-access-follow-up": Waves,
  "forest-coffee-conservation-support": Coffee,
  "public-document-digitization": FileText,
};

export default async function ProjectsPage() {
  const projects: Project[] = (await getPublicResource("projects", fallbackProjects)) as any;
  const apiBase = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") : "http://127.0.0.1:4000";

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20 text-[#2C2C2C]">
      <PageHero
        eyebrowKey="projects.eyebrow"
        titleKey="projects.title"
        descriptionKey="projects.description"
        iconName="Building2"
      />
      
      {/* Expanded container for wide screen breathing room */}
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {projects.map((project) => {
            const Icon = projectIconMap[project.slug] || Building2;
            const description = project.excerpt || project.body || "";
            const statusDisplay = project.status || "Ongoing";
            const imageUrl = project.imageUrl ? (project.imageUrl.startsWith("http") ? project.imageUrl : `${apiBase}${project.imageUrl}`) : "";

            return (
              <Link 
                href={`/projects/${project.slug}`} 
                key={project.slug ?? project.title}
                className="block group"
              >
                <article className="grid gap-0 bg-white rounded-2xl border border-[#E8E1D4] overflow-hidden shadow-sm md:grid-cols-[38%_62%] items-stretch min-h-[250px] transition-all duration-300 hover:shadow-md hover:border-[#1E5631]/30 relative before:absolute before:inset-0 before:bg-[radial-gradient(#e1ded7_1px,transparent_1px)] before:[background-size:16px_16px] before:opacity-30 pointer-events-none [&>*]:pointer-events-auto">
                  
                  {/* Left Side: Larger Cinematic Media Showcase Block */}
                  <div className="p-4 md:p-6 flex items-stretch">
                    {imageUrl ? (
                      <div className="relative w-full min-h-[180px] md:min-h-full overflow-hidden rounded-xl border border-[#E8E1D4] bg-gray-50 shrink-0">
                        <img 
                          src={imageUrl} 
                          alt={project.title} 
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" 
                        />
                      </div>
                    ) : (
                      <div className="w-full min-h-[180px] md:min-h-full flex items-center justify-center rounded-xl bg-[#F8F9FA] border border-dashed border-[#DDE2E5] transition-colors group-hover:bg-[#EEF2ED] shrink-0">
                        <Icon className="h-12 w-12 text-[#C1C9D2] group-hover:text-[#1E5631] transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Right Side: Detailed Card Context Meta Info */}
                  <div className="flex flex-col justify-between p-6 pl-2 md:pl-0 lg:p-8 lg:pl-0 z-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-block bg-[#EEF2ED] text-[#1E5631] text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                          {statusDisplay}
                        </span>
                        <span className="text-xs text-[#A0AEC0] hidden sm:inline">•</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#50627A]">
                          <MapPin className="h-3.5 w-3.5 text-[#6F4E37] shrink-0" />
                          <span>{project.location || "Woreda-wide"}</span>
                        </div>
                      </div>
                      
                      <h2 className="mt-3 text-xl lg:text-2xl font-black text-[#2C2C2C] leading-snug tracking-tight group-hover:text-[#1E5631] transition-colors break-words">
                        {project.title}
                      </h2>
                      
                      <p className="mt-3 text-sm leading-relaxed text-[#50627A] line-clamp-3 break-words">
                        {description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-1 text-sm font-black text-[#D4A017] group-hover:text-[#B88714] transition-colors">
                      <span>View project track details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                </article>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}