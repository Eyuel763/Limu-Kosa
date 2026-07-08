import Link from "next/link";
import { ArrowRight, Building2, Landmark, Sprout, HeartPulse, GraduationCap, Coins, MapPin, Droplets, Briefcase, Users, BadgeCheck, Mountain, ShieldCheck, Scale } from "lucide-react";
import { getPublicResource } from "@/lib/api";
import { departments as fallbackDepts } from "@/lib/publicContent";

// Define the interface to satisfy TypeScript's strict type checking
interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  slug?: string;
  icon?: any;
}

const officeImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80";

const iconMap: Record<string, any> = {
  "agriculture": Sprout,
  "health": HeartPulse,
  "education": GraduationCap,
  "finance": Coins,
  "land-administration": MapPin,
  "water-energy": Droplets,
  "trade-industry": Briefcase,
  "women-social-affairs": Users,
  "youth-sports": BadgeCheck,
  "culture-tourism": Mountain,
  "peace-security": ShieldCheck,
  "justice": Scale,
};

export default async function Departments() {
  // Explicitly typing the array as Department[]
  const departments: Department[] = await getPublicResource("departments", fallbackDepts);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <section className="bg-gradient-to-r from-[#159447] to-[#0E6E36] px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F4D06F]">
              <Landmark className="h-4 w-4" />
              Public governance and sector offices
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Government Departments</h1>
            <p className="mt-5 text-base leading-8 text-white/90">
              Sector offices responsible for public service coordination, development planning, natural resources, social services, and citizen communication.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="flex items-center gap-2 text-3xl font-black text-[#1E5631]">
              <Building2 className="h-7 w-7 text-[#6F4E37]" />
              Core sector directory
            </h2>
            <p className="mt-4 text-base leading-8 text-[#50627A]">
              Each office page includes a public overview, responsibilities, major programs, and contact placeholders. Later, these pages can be managed from the NestJS administration portal.
            </p>
            <div className="mt-6 border-l-2 border-[#D4A017] pl-4">
              <div className="text-4xl font-black text-[#1E5631]">{departments.length}</div>
              <div className="text-sm font-bold uppercase tracking-wide text-[#6B7280]">Listed offices</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img src={officeImage} alt="Public office meeting representing government departments" className="h-80 w-full object-cover" />
          </div>
        </section>

        <section className="mt-14 divide-y divide-[#E8E1D4] border-y border-[#E8E1D4] bg-white">
          {departments.map((department) => {
            const deptAny = department as any;
            const Icon = iconMap[deptAny.id] || iconMap[deptAny.slug] || deptAny.icon || Building2;
            const deptId = deptAny.id || deptAny.slug;

            return (
              <Link
                key={deptId}
                href={`/departments/${deptId}`}
                className="group grid gap-4 px-4 py-6 transition hover:bg-[#F8F6F1] sm:grid-cols-[42px_1fr_auto] sm:items-center sm:px-6"
              >
                <Icon className="h-7 w-7 text-[#1E5631]" />
                <div>
                  <h3 className="text-lg font-black text-[#2C2C2C]">{department.name}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#50627A]">{department.description}</p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#6F4E37]">
                  View office
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}