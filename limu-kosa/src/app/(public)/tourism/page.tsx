import { Mountain } from "lucide-react";
import PublicHero from "@/components/common/PublicHero";
import { getPublicResource } from "@/lib/api";
import { tourismSites as fallbackTourism } from "@/lib/publicContent";

const tourismImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

export default async function TourismPage() {
  const tourismSites = await getPublicResource("tourism", fallbackTourism);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PublicHero
        eyebrow="Destinations and culture"
        title="Tourism"
        description="Natural landmarks, protected forests, coffee culture, historical identity, festivals, and responsible travel information."
        icon={Mountain}
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="divide-y divide-[#E8E1D4] border-y border-[#E8E1D4]">
            {tourismSites.map((site) => (
              <div key={site.title} className="py-6">
                <h2 className="text-2xl font-black text-[#2C2C2C]">{site.title}</h2>
                <p className="mt-3 text-base leading-8 text-[#50627A]">{site.body}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img src={tourismImage} alt="Green mountain landscape representing tourism" className="h-80 w-full object-cover lg:h-full" />
          </div>
        </section>
      </main>
    </div>
  );
}

