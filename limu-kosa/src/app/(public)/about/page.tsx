import { Compass, Leaf, Sprout, Users2 } from "lucide-react";
import { economyHighlights, values } from "@/lib/publicContent";

const landscapeImage =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80";

const profile = [
  ["Region", "Jimma Zone, Oromia"],
  ["Administrative center", "Limmu Genet"],
  ["Area", "1,316 km2"],
  ["Elevation", "1,377m - 2,721m"],
  ["Kebeles", "40 rural and 4 urban"],
  ["Projected population", "235,584"],
];

const timeline = [
  ["Early 1800s", "Limmu-Ennarea emerged as an important Gibe Oromo kingdom and trade center."],
  ["Late 1800s", "The area was integrated into the Ethiopian imperial administration, with Kossa becoming a key reference point."],
  ["1974 onward", "Land reforms and later federal restructuring shaped modern kebele administration and woreda boundaries."],
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <section className="bg-gradient-to-r from-[#159447] to-[#0E6E36] px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F4D06F]">
              <Compass className="h-4 w-4" />
              Regional profile and heritage
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">About Limu Kosa</h1>
            <p className="mt-5 text-base leading-8 text-white/90">
              History, geography, people, economy, and vision of Limu Kosa Woreda Administration.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div>
              <p className="text-xl leading-9 text-[#50627A]">
                Limu Kosa is one of the woredas in Jimma Zone of Oromia Region, Ethiopia. Its identity is tied to the historic Limmu-Ennarea kingdom, highland and midland farming systems, protected montane forests, and coffee-centered livelihoods.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#50627A]">
                The woreda includes river basins, valleys, hills, forest areas, rural kebeles, and urban centers. Coffee, mixed farming, livestock, forest resources, and community institutions remain central to local development.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-y border-[#E8E1D4] py-6 sm:grid-cols-3">
              {profile.map(([label, value]) => (
                <div key={label}>
                  <div className="text-xs font-bold uppercase tracking-wide text-[#6F4E37]">{label}</div>
                  <div className="mt-1 font-black text-[#2C2C2C]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <img src={landscapeImage} alt="Forest landscape representing Limu Kosa natural environment" className="h-full min-h-[360px] w-full object-cover" />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black text-[#1E5631]">History and identity</h2>
            <p className="mt-3 text-sm leading-7 text-[#50627A]">
              The name and administration reflect both historical kingdom roots and local geographic identity.
            </p>
          </div>
          <div className="space-y-6 border-l-2 border-[#D4A017] pl-6">
            {timeline.map(([period, body]) => (
              <div key={period}>
                <div className="text-sm font-black text-[#6F4E37]">{period}</div>
                <p className="mt-1 text-base leading-7 text-[#50627A]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-10 border-t border-[#E8E1D4] py-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="flex items-center gap-2 text-3xl font-black text-[#1E5631]">
              <Leaf className="h-7 w-7 text-[#6F4E37]" />
              Climate and landscape
            </h2>
            <p className="mt-4 text-base leading-8 text-[#50627A]">
              Limu Kosa includes dega, woina dega, and kola agro-ecological zones. Seasonal rainfall, varied elevation, and forest systems support coffee, cereals, livestock, fruits, sugar cane, honey, and natural resource livelihoods.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              ["10%", "Dega"],
              ["65%", "Woina Dega"],
              ["25%", "Kola"],
            ].map(([value, label]) => (
              <div key={label} className="border-l-2 border-[#D4A017] pl-4">
                <div className="text-3xl font-black text-[#1E5631]">{value}</div>
                <div className="mt-1 text-sm font-bold text-[#50627A]">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-10 border-t border-[#E8E1D4] py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="flex items-center gap-2 text-3xl font-black text-[#1E5631]">
              <Sprout className="h-7 w-7 text-[#6F4E37]" />
              Economy
            </h2>
          </div>
          <div className="space-y-6">
            {economyHighlights.map((item) => (
              <div key={item.title} className="border-b border-[#E8E1D4] pb-5 last:border-b-0">
                <h3 className="text-xl font-black text-[#2C2C2C]">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#50627A]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-10 border-t border-[#E8E1D4] py-14 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 text-3xl font-black text-[#1E5631]">
              <Users2 className="h-7 w-7 text-[#6F4E37]" />
              People and society
            </h2>
            <p className="mt-4 text-base leading-8 text-[#50627A]">
              Oromo is the largest community and Afaan Oromoo is the leading local language. The woreda is also home to Amhara, Kullo, Kafficho, Tigrayan, and other communities, with Muslim and Christian residents contributing to local society.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#1E5631]">Vision and values</h2>
            <p className="mt-4 text-base leading-8 text-[#50627A]">
              The public portal supports transparent, inclusive, and development-focused administration.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {values.map((value) => (
                <span key={value} className="rounded-full border border-[#D4A017]/50 px-3 py-1 text-xs font-bold text-[#6F4E37]">
                  {value}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
