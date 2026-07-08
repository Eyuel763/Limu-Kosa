import { Megaphone } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import { getPublicResource } from "@/lib/api";
import { announcements as fallbackAnnouncements } from "@/lib/publicContent";

export default async function AnnouncementsPage() {
  const announcements = await getPublicResource("announcements", fallbackAnnouncements);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="announcements.eyebrow"
        titleKey="announcements.title"
        descriptionKey="announcements.description"
        iconName="Bell"
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
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
                <div className="text-[11px] font-bold uppercase tracking-wide text-[#6F4E37]">{typeDisplay}</div>
                <h2 className="mt-3 text-xl font-black leading-tight text-[#2C2C2C]">{notice.title}</h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#6B7280]">{dateDisplay}</p>
                <p className="mt-4 text-sm leading-7 text-[#6B7280]">{notice.body}</p>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

