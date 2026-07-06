import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Mail, Target, Sprout, HeartPulse, GraduationCap, Coins, MapPin, Droplets, Briefcase, Users, BadgeCheck, Mountain, ShieldCheck, Scale, Building2 } from "lucide-react";
import PublicHero from "@/components/common/PublicHero";
import { getPublicResource } from "@/lib/api";
import { departments as fallbackDepts } from "@/lib/publicContent";

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

export function generateStaticParams() {
  return fallbackDepts.map((department) => ({ id: department.id }));
}

export default async function DepartmentDetail({ params }: PageProps<"/departments/[id]">) {
  const { id } = await params;
  const departments = await getPublicResource("departments", fallbackDepts);
  const department = departments.find((item: any) => item.id === id || item.slug === id);

  if (!department) {
    notFound();
  }

  const deptAny = department as any;
  const Icon = iconMap[deptAny.id] || iconMap[deptAny.slug] || deptAny.icon || Building2;



  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PublicHero
        eyebrow="Department portal"
        title={department.name}
        description={department.description}
        icon={Icon}
      />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pt-12 sm:px-6 lg:grid-cols-[1.5fr_0.75fr] lg:px-8">
        <section className="space-y-8">
          <Link href="/departments" className="inline-flex items-center gap-2 text-sm font-bold text-[#6F4E37] hover:text-[#1E5631]">
            <ArrowLeft className="h-4 w-4" />
            Back to departments
          </Link>

          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-black text-[#2C2C2C]">
              <Target className="h-5 w-5 text-[#1E5631]" />
              Public responsibilities
            </h2>
            <div className="mt-6 grid gap-4">
              {department.responsibilities.map((responsibility) => (
                <div key={responsibility} className="flex gap-3 rounded-md bg-[#F8F6F1] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E5631]" />
                  <p className="text-sm leading-6 text-[#2C2C2C]">{responsibility}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#2C2C2C]">Major programs</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {department.programs.map((program) => (
                <span key={program} className="rounded-full bg-[#E8F0EA] px-3 py-1 text-xs font-bold text-[#1E5631]">
                  {program}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[#6B7280]">
              Detailed activities, progress updates, and downloadable documents can be connected to this page later through the NestJS content management API.
            </p>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-lg bg-[#16361F] p-6 text-white shadow-sm">
            <Icon className="mb-4 h-8 w-8 text-[#D4A017]" />
            <h2 className="text-xl font-black">{department.shortName}</h2>
            <p className="mt-3 text-sm leading-7 text-emerald-50/80">
              This office page is prepared as a public information view. Administrative editing will be handled in the future portal.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#2C2C2C]">
              <Mail className="h-4 w-4 text-[#6F4E37]" />
              Contact channel
            </h2>
            <p className="mt-3 break-words text-sm font-bold text-[#1E5631]">{department.contact}</p>
            <p className="mt-2 text-xs leading-5 text-[#6B7280]">Placeholder address for public directory planning.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
