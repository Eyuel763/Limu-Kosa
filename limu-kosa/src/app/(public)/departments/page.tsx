import React from 'react';
import { 
  Building2, 
  Sprout, 
  HeartPulse, 
  GraduationCap, 
  Coins, 
  ShieldCheck, 
  Scale, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const sectors = [
  {
    id: 'agriculture',
    name: 'Agriculture & Natural Resources Office',
    icon: Sprout,
    description: 'Oversees rural extension programs, wild Arabica coffee protection zones, and support networks for our 40 agricultural kebeles.',
  },
  {
    id: 'health',
    name: 'Woreda Health Office',
    icon: HeartPulse,
    description: 'Manages localized public clinics, healthcare delivery frameworks, sanitation networks, and regional disease prevention initiatives.',
  },
  {
    id: 'education',
    name: 'Education Office',
    icon: GraduationCap,
    description: 'Administers public primary and secondary educational facilities, local teacher deployments, and instructional tracking metrics.',
  },
  {
    id: 'finance',
    name: 'Finance & Economic Development Office',
    icon: Coins,
    description: 'Handles annual budgetary framing allocations, local market revenue assessments, and municipal infrastructure financing plans.',
  },
  {
    id: 'peace-security',
    name: 'Peace & Security Administration',
    icon: ShieldCheck,
    description: 'Coordinates local civil enforcement networks, community protection services, and inter-kebele boundary alignment safety protocols.',
  },
  {
    id: 'justice',
    name: 'Justice Office',
    icon: Scale,
    description: 'Provides municipal legal consulting services, maintains formal civil records, and executes judicial guidelines across the district.',
  },
];

export default function Departments() {
  return (
    <div className="bg-[#F8F6F1]/40 min-h-screen pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-br from-[#227C3E] to-[#165A2B] text-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D4A017]">
  <div className="max-w-7xl mx-auto space-y-4">
    <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-[#E9C46A]">
      <Sparkles className="h-3 w-3" /> Public Governance & Sectors
    </div>
    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
      Administrative Departments
    </h1>
    <p className="text-emerald-50/90 text-sm sm:text-base max-w-3xl leading-relaxed">
      Explore the core sectors steering municipal development, economic growth, and civilian service structures across Limmu Kosa Woreda.
    </p>
  </div>
</section>

      {/* 2. DEPARTMENTS GRID CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#1E5631]" /> Core Sector Directory
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
            Select a public division below to examine its internal leadership, ongoing infrastructure blueprints, strategic development benchmarks, and citizen documentation templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => {
            const IconComponent = sector.icon;
            return (
              <div 
                key={sector.id} 
                className="bg-white border-t-4 border-[#1E5631] rounded-b-xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  <div className="p-2.5 bg-[#E8F0EA] text-[#1E5631] rounded-lg inline-block shadow-sm">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-[#2C2C2C] tracking-tight leading-tight">
                      {sector.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {sector.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 mt-6">
                  <Link 
                    href={`/departments/${sector.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E5631] hover:text-[#12351E] group transition-colors"
                  >
                    View Portal Registry 
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

    </div>
  );
}