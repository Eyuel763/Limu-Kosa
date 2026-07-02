import React from 'react';
import { 
  Coffee, 
  Building2, 
  Newspaper, 
  Briefcase, 
  Compass, 
  ArrowRight, 
  Users, 
  CheckCircle, 
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

// Accurate Historical & Demographical Stats
const stats = [
  { label: "Projected Population", value: "235,584", icon: Users },
  { label: "National Forest Coffee Exports", value: "~20%", icon: Coffee },
  { label: "Total Surface Area", value: "1,316 km²", icon: Layers },
];

// Quick Access Portals
const quickLinks = [
  { title: "Government & Kebeles", desc: "Access the 4 urban and 40 rural kebele administrative bureaus.", href: "/departments", icon: Building2 },
  { title: "Coffee & Agro-Investment", desc: "Explore smallholder partnerships and rich forest canopy crop incentives.", href: "/investment", icon: Briefcase },
  { title: "Eco-Tourism & Landscapes", desc: "Discover the historic Saqa kingdom roots, Bolo Caves, and Lake Cheleleki.", href: "/tourism", icon: Compass },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO BANNER WITH GRADIENT */}
      <section className="relative bg-gradient-to-r from-[#1E5631] to-[#2E7D32] text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <span className="bg-[#D4A017] text-[#2C2C2C] px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              Official Administration Portal
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Welcome to Limu Kosa Woreda
            </h1>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Administered from <span className="font-semibold text-white underline decoration-[#D4A017] decoration-2">Limu Genet</span>, our historic district spans elevations from 1,377 to 2,721 meters, serving as the biodiversity cradle of wild Arabica forest coffee.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/about" className="bg-[#D4A017] hover:bg-[#E9C46A] text-[#2C2C2C] px-6 py-3 rounded-md font-bold shadow-md transition-colors flex items-center gap-2">
                Explore History & Geography <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="border border-white/40 hover:bg-white/10 px-6 py-3 rounded-md font-semibold transition-colors">
                Contact Office
              </Link>
            </div>
          </div>
          
          {/* Historical Kingdom Callout Sidebar */}
          <div className="hidden md:flex bg-white/5 border border-white/10 p-8 rounded-2xl flex-col gap-4 backdrop-blur-sm max-w-sm">
            <div className="flex items-center gap-2 text-[#D4A017]">
              <MapPin className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Limmu-Ennarea Heritage</span>
            </div>
            <h3 className="font-bold text-xl text-white">The Gibe Monarchy Legacy</h3>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              Traced back to the 19th-century kingdom of Abba Bagibo, our lands encompass ancient montane rainforest networks including Tiro Boter Becho and Babia Folla.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORE STATISTICS MODULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="bg-white border-l-4 border-[#6F4E37] p-6 rounded-r-lg shadow-sm flex items-center gap-5">
                <div className="bg-[#F8F6F1] p-3 rounded-md">
                  <IconComponent className="h-6 w-6 text-[#6F4E37]" />
                </div>
                <div>
                  <div className="text-2xl font-black text-[#2C2C2C]">{stat.value}</div>
                  <div className="text-xs text-[#6B7280] font-medium tracking-wide uppercase mt-0.5">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. QUICK NAVIGATION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E5631]">Key Portals & Public Resources</h2>
          <p className="text-sm text-[#6B7280] mt-1">Quick-access utilities customized for citizens, agricultural unions, and international investors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((card, idx) => {
            const LinkIcon = card.icon;
            return (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-[#F8F6F1] inline-block p-3 rounded-md">
                    <LinkIcon className="h-6 w-6 text-[#1E5631]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2C2C2C]">{card.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{card.desc}</p>
                </div>
                <Link href={card.href} className="text-[#6F4E37] hover:text-[#1E5631] font-bold text-sm mt-6 flex items-center gap-1.5 transition-colors">
                  Open Portal <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. RECENT PREVIEW FEEDS (NEWS & ANNOUNCEMENTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Latest News Feed Block */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-black text-[#1E5631] flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-[#6F4E37]" /> Latest Woreda Updates
            </h2>
            <Link href="/news" className="text-xs font-bold text-[#6F4E37] hover:underline">View All News</Link>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="bg-gray-100 w-full sm:w-48 h-32 rounded-md flex flex-col items-center justify-center text-gray-400 text-xs italic p-4 shrink-0 border border-dashed border-gray-200">
              <Coffee className="h-6 w-6 mb-1 text-gray-300" />
              <span>Agroforestry Feed</span>
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block">Cooperative Union &bull; Recent</span>
              <h3 className="font-bold text-lg text-[#2C2C2C] hover:text-[#1E5631] transition-colors cursor-pointer">
                Limu Inara Union Coordinates Eco-Friendly Cultivar Deployments
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Expanding across primary cooperatives, new sustainable distribution parameters seek to protect watershed layers near the Awetu and Dembi rivers while boosting organic value...
              </p>
              <Link href="/news" className="text-xs font-bold text-[#1E5631] inline-block pt-1 hover:underline">Read full report</Link>
            </div>
          </div>
        </div>

        {/* Public Notices Block */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-black text-[#1E5631] flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#D4A017]" /> Administrative Notices
            </h2>
          </div>

          <div className="bg-white border-t-4 border-[#D4A017] p-5 rounded-b-lg shadow-sm space-y-3">
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded uppercase tracking-wide">
              Land Use & Resource Management
            </span>
            <h4 className="font-bold text-sm text-[#2C2C2C]">
              Participatory Forest Management (PFM) Assembly
            </h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              All 40 rural kebele representatives are called to convene regarding selective tree preservation parameters under the Ethiopian Green Legacy initiative.
            </p>
            <div className="text-[11px] text-gray-400 font-medium">Location: Central Council Hall, Limmu Genet</div>
          </div>
        </div>

      </section>

      {/* 5. CALL TO ACTION CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16361F] border-b-4 border-[#D4A017] rounded-xl text-white p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black max-w-2xl mx-auto leading-snug">
            Empowering Sustainable Agriculture & Civil Transparency
          </h2>
          <p className="text-sm text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            Connect securely with our local sectoral planning offices to download official documents, request investment maps, or track regional infrastructure metrics.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="bg-[#D4A017] hover:bg-[#E9C46A] text-[#2C2C2C] px-8 py-3.5 rounded-md font-bold shadow-md transition-colors inline-block text-sm">
              Contact Woreda Bureau
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}