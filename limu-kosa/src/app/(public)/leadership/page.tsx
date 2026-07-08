import { Landmark, Mail, UserRound } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import { getPublicResource } from "@/lib/api";
import { leaders as fallbackLeaders } from "@/lib/publicContent";

// Define the interface to ensure type safety
interface Leader {
  name: string;
  position?: string;
  role?: string;
  biography?: string;
  bio?: string;
  responsibilities?: string[];
  photoUrl?: string;
  contact?: string;
}

export default async function LeadershipPage() {
  // Explicitly type the leaders array as Leader[][cite: 5]
  const leaders: Leader[] = await getPublicResource("leaders", fallbackLeaders);
  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="leadership.eyebrow"
        titleKey="leadership.title"
        descriptionKey="leadership.description"
        iconName="Landmark"
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {leaders.map((leader: Leader) => {
            // Using interface properties instead of (leader as any)[cite: 5]
            const roleDisplay = leader.position ?? leader.role ?? "Official";
            const bioDisplay = leader.biography ?? leader.bio ?? "";
            const responsibilities = leader.responsibilities ?? [];
            const photoUrl = leader.photoUrl 
              ? (leader.photoUrl.startsWith("http") ? leader.photoUrl : `${apiBase}${leader.photoUrl}`) 
              : "";

            return (
              <article key={leader.name} className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                {photoUrl ? (
                  <div className="mb-5 relative h-16 w-16 overflow-hidden rounded-full border border-gray-150 shrink-0 shadow-sm">
                    <img src={photoUrl} alt={leader.name} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-md bg-[#E8F0EA] text-[#1E5631]">
                    <UserRound className="h-8 w-8" />
                  </div>
                )}
                <h2 className="text-xl font-black text-[#2C2C2C]">{leader.name}</h2>
                <p className="mt-1 text-sm font-bold text-[#6F4E37]">{roleDisplay}</p>
                <p className="mt-4 text-sm leading-7 text-[#6B7280]">{bioDisplay}</p>
                <div className="mt-5 space-y-2">
                  {responsibilities.map((item) => (
                    <div key={item} className="rounded-md bg-[#F8F6F1] px-3 py-2 text-xs font-bold text-[#2C2C2C]">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-bold text-[#1E5631]">
                  <Mail className="h-4 w-4" />
                  {leader.contact || "Contact through the administration office"}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}