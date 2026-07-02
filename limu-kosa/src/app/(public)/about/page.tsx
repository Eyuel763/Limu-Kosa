import React from 'react';
import { 
  Map, 
  Trees, 
  Landmark, 
  Users2, 
  CloudRain, 
  Compass, 
  Scroll, 
  Milestone,
  Layers,
  Sparkles
} from 'lucide-react';

export default function About() {
  return (
    <div className="bg-[#F8F6F1]/40 min-h-screen pb-20">
      
      {/* 1. MINIMAL HERO BANNER */}
      <section className="bg-gradient-to-b from-[#1E5631] to-[#12351E] text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D4A017]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-[#E9C46A]">
            <Sparkles className="h-3 w-3" /> Regional Profile & Heritage
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Discover Limmu Kosa
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            From the historic trading gates of the 19th-century Gibe Basin to the high-altitude, shade-grown organic coffee canopies of modern Oromia—explore the full geography, legacy, and demographic fabric of our Woreda.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* LEFT COLUMN: QUICK FACT CARD BAR */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm space-y-6 sticky top-28">
            <h3 className="font-black text-xs text-[#2C2C2C] uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#6F4E37]" /> Fast Profile Data
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Zonal Region</span>
                <span className="text-sm font-bold text-[#2C2C2C]">Jimma Zone, Oromia</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Administrative Capital</span>
                <span className="text-sm font-bold text-[#1E5631]">Limmu Genet (Suntu)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Elevation Span</span>
                <span className="text-sm font-bold text-[#2C2C2C]">1,377m – 2,721m</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Major Rivers</span>
                <span className="text-xs font-semibold text-gray-600 block mt-0.5">Awetu, Dembi, Indris, Dagdage</span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: RECONFIGURED LAYOUT MODULES */}
        <main className="lg:col-span-3 space-y-16">
          
          {/* SECTION A: HISTORY & CHRONOLOGY TIMELINE */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              <Scroll className="h-5 w-5 text-[#6F4E37]" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C]">Historical Chronology</h2>
            </div>
            
            <div className="relative border-l-2 border-gray-200 pl-6 space-y-8 ml-2">
              
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 bg-[#6F4E37] text-white p-1 rounded-full">
                  <Milestone className="h-3 w-3" />
                </div>
                <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm space-y-2">
                  <span className="text-xs font-black bg-[#F8F6F1] text-[#6F4E37] px-2.5 py-0.5 rounded-full inline-block">Early 1800s</span>
                  <h3 className="font-bold text-base text-[#2C2C2C]">Rise of the Limmu-Ennarea Kingdom</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Emerging as a premier Oromo monarchy in the Gibe basin under rulers like Bofo Boko (Abba Gomol), the kingdom flourished. Under Abba Bagibo, it became an epicenter for commercial trade, centering on ivory, gold, and fine coffee at the historic Saqa market.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 bg-[#1E5631] text-white p-1 rounded-full">
                  <Milestone className="h-3 w-3" />
                </div>
                <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm space-y-2">
                  <span className="text-xs font-black bg-[#E8F0EA] text-[#1E5631] px-2.5 py-0.5 rounded-full inline-block">Late 1880s</span>
                  <h3 className="font-bold text-base text-[#2C2C2C]">Integration & Origin of Kossa</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    The sovereign kingdom integrated into the imperial Ethiopian framework under Emperor Menelik II. An active administrative garrison was situated at Kossa—a high, crisp mountain landscape frequently blanketed in fog—giving rise to the compound name used today.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 bg-[#D4A017] text-white p-1 rounded-full">
                  <Milestone className="h-3 w-3" />
                </div>
                <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm space-y-2">
                  <span className="text-xs font-black bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full inline-block">1974 Revolution</span>
                  <h3 className="font-bold text-base text-[#2C2C2C]">Land Reforms & Decentralization</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    The 1974 revolution introduced structural land reforms that dissolved centuries-old landownership models, redistributing resources directly to farming cooperatives and shaping the boundaries of the 40 rural and 4 urban kebeles.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION B: GEOGRAPHY & BIOSPHERE GRID */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              <Map className="h-5 w-5 text-[#1E5631]" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C]">Topography & Ecological Zones</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Encompassing <span className="font-bold text-[#2C2C2C]">1,316 square kilometers</span>, our territorial landscape transitions dynamically across crucial agro-ecological elevations that fuel exceptional biodiversity:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border-t-4 border-amber-600 p-4 rounded-b shadow-sm space-y-1">
                <div className="font-black text-lg text-[#2C2C2C]">10%</div>
                <div className="font-bold text-xs text-amber-800">Dega (Highland)</div>
                <p className="text-[11px] text-gray-500 leading-normal">Cool, elevated mountain zones scaling up to 2,721 meters above sea level.</p>
              </div>
              <div className="bg-white border-t-4 border-[#1E5631] p-4 rounded-b shadow-sm space-y-1">
                <div className="font-black text-lg text-[#2C2C2C]">65%</div>
                <div className="font-bold text-xs text-emerald-800">Woina Dega (Midland)</div>
                <p className="text-[11px] text-gray-500 leading-normal">The vast temperate zone ideal for farming coffee, teff, maize, and fruits.</p>
              </div>
              <div className="bg-white border-t-4 border-yellow-600 p-4 rounded-b shadow-sm space-y-1">
                <div className="font-black text-lg text-[#2C2C2C]">25%</div>
                <div className="font-bold text-xs text-yellow-800">Kola (Lowland)</div>
                <p className="text-[11px] text-gray-500 leading-normal">Warmer, low-altitude expanses dipping down toward the primary river basins.</p>
              </div>
            </div>

            {/* Hydrology banner strip */}
            <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center">
              <div className="bg-[#F8F6F1] p-3 rounded-md shrink-0">
                <Trees className="h-6 w-6 text-emerald-700" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-sm text-[#2C2C2C]">Protected Montane Rainforest Networks</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Limmu Kosa contains extensive spans of the **Tiro Boter Becho** and **Babia Folla** state-protected forest systems. These dense high-canopy biospheres act as regional rainfall anchors and harbor rare organic coffee cultivars.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION C: DEMOGRAPHICS DATA HIGHLIGHTS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              <Users2 className="h-5 w-5 text-[#D4A017]" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C]">Demographics & Society</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Identity & Language */}
              <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-[#2C2C2C] uppercase tracking-wider border-b border-gray-50 pb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1E5631]"></span> Ethnic & Language Composition
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The primary ethnic community is Oromo (80.94%), alongside Amhara (11.33%), Kullo, Kafficho, and Tigrayan households. Concurrently, **Oromiffa (Afaan Oromoo)** is the leading native language spoken by 81.07% of residents, with Amharic spoken natively by 14.81%.
                </p>
              </div>

              {/* Card 2: Religious & Urban Patterns */}
              <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-[#2C2C2C] uppercase tracking-wider border-b border-gray-50 pb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6F4E37]"></span> Faith & Urban Proportions
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The pluralistic tapestry includes a Muslim majority (72.6%), followed by Ethiopian Orthodox Christian (24.41%) and Protestant (2.72%) denominations. About 9.5% reside within urban hubs, while the balance anchor the agricultural coffee cooperatives.
                </p>
              </div>

            </div>
          </section>

        </main>
      </div>

    </div>
  );
}