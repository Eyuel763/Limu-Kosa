"use client";

import { useMemo } from "react";
import { 
  Users, MapPin, Building2, Trees, Phone, Megaphone, CalendarDays,
  Coffee, HeartPulse, GraduationCap, Coins, Droplets, Briefcase, 
  ShieldCheck, Scale, Landmark, Camera, FileText
} from "lucide-react";

interface ResourcePreviewProps {
  active: string;
  selectedId: string | null;
  formState: Record<string, any>;
  apiBase: string;
}

const iconMap: Record<string, any> = {
  Users, MapPin, Building2, Trees, Phone, Megaphone, CalendarDays,
  Coffee, HeartPulse, GraduationCap, Coins, Droplets, Briefcase, 
  ShieldCheck, Scale, Landmark, Camera, FileText
};

export default function ResourcePreview({
  active,
  selectedId,
  formState,
  apiBase,
}: ResourcePreviewProps) {
  if (!selectedId) return null;

  const apiBaseRoot = apiBase.replace("/api", "");
  const getFullUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${apiBaseRoot}${url}`;
  };

  const statusDisplay = formState.status || (formState.published ? "Published" : "Draft");

  // RENDER DYNAMIC PREVIEWS FOR SPECIFIC SETTINGS DOCUMENT TYPES
  if (active === "settings") {
    const slug = formState.slug;
    
    if (slug === "homepage-hero") {
      const slides = formState.metadata?.slides || [];
      return (
        <div className="mb-6 rounded-xl border border-[#D4A017] bg-[#F8F6F1] p-5 shadow-xs w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8DCC4] pb-2 gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6F4E37]">Homepage Hero Preview</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800">
              Settings Document
            </span>
          </div>
          <div className="space-y-4 w-full">
            {slides.map((slide: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-white space-y-2">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Slide {idx + 1}</div>
                {slide.image && (
                  <div className="relative h-20 w-full overflow-hidden rounded bg-gray-50">
                    <img src={getFullUrl(slide.image)} alt="Slide Preview" className="h-full w-full object-cover" />
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-bold text-[#6F4E37]">{slide.tagline || "No tagline"}</div>
                  <h4 className="text-sm font-bold text-[#2C2C2C]">{slide.title || "Untitled Slide"}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{slide.description}</p>
                  {slide.primaryLabel && (
                    <span className="inline-block mt-1 text-[10px] bg-[#1E5631] text-white px-2 py-0.5 rounded font-bold">
                      {slide.primaryLabel} →
                    </span>
                  )}
                </div>
              </div>
            ))}
            {slides.length === 0 && <p className="text-xs text-gray-400 italic">No slides added yet.</p>}
          </div>
        </div>
      );
    }

    if (slug === "site-stats") {
      const stats = formState.metadata?.stats || [];
      return (
        <div className="mb-6 rounded-xl border border-[#D4A017] bg-[#F8F6F1] p-5 shadow-xs w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8DCC4] pb-2 gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6F4E37]">Site Statistics Preview</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800">
              Settings Document
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            {stats.map((stat: any, idx: number) => {
              const IconComp = iconMap[stat.icon] || Landmark;
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center">
                  <IconComp className="h-5 w-5 text-[#1E5631] mb-1 shrink-0" />
                  <span className="text-sm font-black text-[#2C2C2C]">{stat.value || "0"}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{stat.label || "Stat Label"}</span>
                  {stat.detail && <span className="text-[9px] text-gray-500 italic mt-0.5">{stat.detail}</span>}
                </div>
              );
            })}
            {stats.length === 0 && <p className="text-xs text-gray-400 italic col-span-2">No stats added yet.</p>}
          </div>
        </div>
      );
    }

    if (slug === "contact-info") {
      const channels = formState.metadata?.channels || [];
      return (
        <div className="mb-6 rounded-xl border border-[#D4A017] bg-[#F8F6F1] p-5 shadow-xs w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8DCC4] pb-2 gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6F4E37]">Contact Channels Preview</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800">
              Settings Document
            </span>
          </div>
          <div className="space-y-2.5 w-full bg-white border border-gray-200 rounded-lg p-3">
            {channels.map((channel: any, idx: number) => {
              const IconComp = iconMap[channel.icon] || Megaphone;
              return (
                <div key={idx} className="flex gap-3 items-start text-left">
                  <div className="p-1.5 bg-[#EEF2ED] rounded border border-gray-100 text-[#1E5631] shrink-0">
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase">{channel.label}</div>
                    <div className="text-xs text-[#2C2C2C] font-semibold break-all">{channel.value}</div>
                  </div>
                </div>
              );
            })}
            {channels.length === 0 && <p className="text-xs text-gray-400 italic">No contact channels added yet.</p>}
          </div>
        </div>
      );
    }

    if (slug === "general") {
      const meta = formState.metadata || {};
      return (
        <div className="mb-6 rounded-xl border border-[#D4A017] bg-[#F8F6F1] p-5 shadow-xs w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8DCC4] pb-2 gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6F4E37]">General Footer Settings Preview</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800">
              Settings Document
            </span>
          </div>
          <div className="bg-[#16361F] text-gray-200 p-4 rounded-lg space-y-2 text-xs text-left">
            <div>
              <span className="text-[9px] uppercase text-[#D4A017] font-bold block">Footer Tagline</span>
              <p className="text-gray-300 italic">{meta.footerTagline || "No tagline configured."}</p>
            </div>
            <div className="border-t border-emerald-950 pt-2 mt-2">
              <span className="text-[9px] uppercase text-[#D4A017] font-bold block">Footer Copyright & Rights</span>
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Limu Kosa Woreda. {meta.copyrightText || "All rights reserved."}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  // STANDARD PREVIEW FOR OTHER CONTENT RESOURCES
  return (
    <div className="mb-6 rounded-xl border border-[#D4A017] bg-[#F8F6F1] p-5 shadow-xs w-full min-w-0 overflow-hidden">
      <div className="flex items-center justify-between mb-3 border-b border-[#E8DCC4] pb-2 gap-2 shrink-0">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#6F4E37] truncate">Posted Content View</span>
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 shrink-0">
          {statusDisplay}
        </span>
      </div>

      {(active === "news" || active === "announcements" || active === "investment" || active === "tourism" || active === "settings") && (
        <div className="space-y-3 min-w-0 w-full overflow-hidden">
          {formState.imageUrl && (
            <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200">
              <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="min-w-0 w-full">
            <div className="text-xs font-bold uppercase text-[#6F4E37] break-all">{formState.category || "General"}</div>
            <h3 className="text-lg font-black text-[#2C2C2C] mt-1 break-words break-all">{formState.title || "Untitled"}</h3>
            {formState.publishedAt && (
              <div className="text-[10px] text-[#6B7280]">Published: {new Date(formState.publishedAt).toLocaleDateString()}</div>
            )}
          </div>
          {formState.excerpt && (
            <p className="text-sm text-[#50627A] italic bg-white p-2.5 rounded border border-gray-150 break-words break-all">{formState.excerpt}</p>
          )}
          {formState.body && (
            <p className="text-sm leading-6 text-[#2C2C2C] whitespace-pre-wrap break-words break-all">{formState.body}</p>
          )}
        </div>
      )}

      {active === "projects" && (
        <div className="space-y-3 min-w-0 w-full overflow-hidden">
          {formState.imageUrl && (
            <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200">
              <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="min-w-0 w-full">
            <h3 className="text-lg font-black text-[#2C2C2C] break-words break-all">{formState.title || "Untitled Project"}</h3>
            <div className="text-xs font-bold text-[#6F4E37] mt-1 break-all">📍 {formState.location || "Woreda-wide"}</div>
          </div>
          <p className="text-sm leading-6 text-[#2C2C2C] whitespace-pre-wrap break-words break-all">{formState.body || formState.excerpt}</p>
        </div>
      )}

      {active === "departments" && (
        <div className="space-y-3 min-w-0 w-full overflow-hidden">
          {formState.imageUrl && (
            <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200">
              <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="min-w-0 w-full">
            <h3 className="text-lg font-black text-[#2C2C2C] break-words break-all">{formState.name || "Unnamed Department"}</h3>
            <div className="text-xs font-bold text-[#6F4E37] mt-1 break-all">{formState.shortName || "Short Name"} · {formState.contact}</div>
          </div>
          <p className="text-sm leading-6 text-[#50627A] break-words break-all">{formState.description}</p>
          {Array.isArray(formState.responsibilities) && formState.responsibilities.length > 0 && (
            <div className="min-w-0 w-full">
              <h4 className="text-xs font-black text-[#2C2C2C] uppercase tracking-wider mb-1">Responsibilities:</h4>
              <ul className="list-disc pl-5 text-xs text-[#50627A] space-y-0.5 break-words break-all">
                {formState.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}
          {Array.isArray(formState.programs) && formState.programs.length > 0 && (
            <div className="pt-2 min-w-0 w-full">
              <h4 className="text-xs font-black text-[#2C2C2C] uppercase tracking-wider mb-1">Active Programs:</h4>
              <div className="flex flex-wrap gap-1.5 w-full">
                {formState.programs.map((p: string, i: number) => (
                  <span key={i} className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-[#1E5631] break-all">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {active === "leaders" && (
        <div className="flex gap-4 items-start min-w-0 w-full overflow-hidden">
          {formState.photoUrl && (
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#1E5631] shrink-0">
              <img src={getFullUrl(formState.photoUrl)} alt="Leader" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="space-y-1 min-w-0 flex-1 w-full">
            <h3 className="text-base font-black text-[#2C2C2C] break-words break-all">{formState.name || "Unnamed Leader"}</h3>
            <div className="text-xs font-bold text-[#6F4E37] break-all">{formState.position || "Position"}</div>
            <p className="text-xs leading-5 text-[#50627A] break-words break-all">{formState.biography}</p>
            {Array.isArray(formState.responsibilities) && formState.responsibilities.length > 0 && (
              <div className="pt-1.5 space-y-0.5 min-w-0 w-full">
                <div className="text-[10px] font-black text-[#2C2C2C] uppercase tracking-wider">Responsibilities:</div>
                <div className="flex flex-wrap gap-1 w-full">
                  {formState.responsibilities.map((r: string, i: number) => (
                    <span key={i} className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[9px] font-medium text-[#2C2C2C] break-all">{r}</span>
                  ))}
                </div>
              </div>
            )}
            {formState.contact && <div className="text-[10px] text-[#6B7280] pt-1 break-all">Contact: {formState.contact}</div>}
          </div>
        </div>
      )}

      {active === "gallery" && (
        <div className="space-y-3 min-w-0 w-full overflow-hidden">
          {formState.imageUrl && (
            <div className="relative h-44 w-full overflow-hidden rounded-md border border-gray-200">
              <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
          <h3 className="text-sm font-black text-[#2C2C2C] break-words break-all">{formState.title || "Untitled Image"}</h3>
          <div className="text-xs text-[#6B7280] break-all">Category: {formState.category || "General"} | Alt: {formState.altText || "None"}</div>
        </div>
      )}

      {active === "downloads" && (
        <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-150 gap-4 min-w-0 w-full">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-black text-[#2C2C2C] break-words break-all">{formState.title || "Untitled Document"}</h3>
            <p className="text-xs text-[#6B7280] break-words break-all">{formState.category || "Reports"} · {formState.description}</p>
          </div>
          {formState.fileUrl && (
            <span className="text-xs font-bold text-[#1E5631] underline truncate max-w-[120px] shrink-0 break-all">
              {formState.fileUrl.split("/").pop()}
            </span>
          )}
        </div>
      )}

      {active === "messages" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3 w-full text-left">
          <div className="border-b border-gray-100 pb-2 flex justify-between items-center text-xs text-gray-400">
            <span>Direct Message View</span>
            {formState.createdAt && (
              <span>Received: {new Date(formState.createdAt).toLocaleString()}</span>
            )}
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-[#6F4E37] tracking-wider">Subject</div>
            <h3 className="text-sm font-black text-[#2C2C2C] mt-0.5">{formState.subject || "No Subject"}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-50 py-2">
            <div>
              <div className="text-[9px] font-black uppercase text-gray-400">From</div>
              <div className="text-xs font-bold text-[#2C2C2C]">{formState.name || "Anonymous"}</div>
            </div>
            <div>
              <div className="text-[9px] font-black uppercase text-gray-400">Email</div>
              <div className="text-xs font-mono text-[#50627A] break-all">{formState.email || "N/A"}</div>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-[#1E5631] tracking-wider mb-1">Message Content</div>
            <p className="text-xs text-[#50627A] leading-relaxed whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-100 min-h-[100px]">
              {formState.body || "No message content."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
