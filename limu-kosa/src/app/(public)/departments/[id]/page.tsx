"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Target, Sprout, HeartPulse, GraduationCap, Coins, MapPin, Droplets, Briefcase, Users, BadgeCheck, Mountain, ShieldCheck, Scale, Building2 } from "lucide-react";
import PublicHero from "@/components/common/PublicHero";
import DynamicText from "@/components/common/DynamicText";
import { getPublicResource, getPublicResourceItems } from "@/lib/api";
import { departments as fallbackDepts } from "@/lib/publicContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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

export default function DepartmentDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { t, tDynamic } = useLanguage();
  const [department, setDepartment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDepartment() {
      try {
        // Try fetching single item directly from backend first
        const fetchedSingle = await getPublicResource<any | null>(`departments/${resolvedParams.id}`, null);
        if (fetchedSingle && (fetchedSingle.id || fetchedSingle.slug)) {
          setDepartment(fetchedSingle);
          return;
        }

        // Fallback search in list
        const fetchedList = await getPublicResourceItems<any>("departments", fallbackDepts as any);
        const found = fetchedList.find((item: any) => item.id === resolvedParams.id || item.slug === resolvedParams.id);
        if (found) setDepartment(found);
      } catch (err) {
        console.error("Failed to load department", err);
      } finally {
        setLoading(false);
      }
    }
    loadDepartment();
  }, [resolvedParams.id]);

  if (loading) {
    return <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center text-xs font-bold text-[#50627A]">{t("common.loading")}</div>;
  }

  if (!department) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-black text-[#2C2C2C]">{t("common.noItems")}</h2>
        <Link href="/departments" className="mt-4 text-sm font-bold text-[#1E5631] underline">{t("deptDetail.backTo")}</Link>
      </div>
    );
  }

  const Icon = iconMap[department.id] || iconMap[department.slug] || department.icon || Building2;
  const deptName = tDynamic(department, "name");
  const deptDesc = tDynamic(department, "description");
  const deptShort = tDynamic(department, "shortName") || deptName;

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PublicHero
        eyebrow={t("deptDetail.portal")}
        title={deptName}
        description={deptDesc}
        icon={Icon}
      />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pt-12 sm:px-6 lg:grid-cols-[1.5fr_0.75fr] lg:px-8">
        <section className="space-y-8">
          <Link href="/departments" className="inline-flex items-center gap-2 text-sm font-bold text-[#6F4E37] hover:text-[#1E5631]">
            <ArrowLeft className="h-4 w-4" />
            {t("deptDetail.backTo")}
          </Link>

          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-black text-[#2C2C2C]">
              <Target className="h-5 w-5 text-[#1E5631]" />
              {t("deptDetail.responsibilities")}
            </h2>
            <div className="mt-6 grid gap-4">
              {(department.responsibilities || []).map((responsibility: string) => (
                <div key={responsibility} className="flex gap-3 rounded-md bg-[#F8F6F1] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E5631]" />
                  <p className="text-sm leading-6 text-[#2C2C2C]">{tDynamic(responsibility, "")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#2C2C2C]">{t("deptDetail.programs")}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {(department.programs || []).map((program: string) => (
                <span key={program} className="rounded-full bg-[#E8F0EA] px-3 py-1 text-xs font-bold text-[#1E5631]">
                  {tDynamic(program, "")}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-lg bg-[#16361F] p-6 text-white shadow-sm">
            <Icon className="mb-4 h-8 w-8 text-[#D4A017]" />
            <h2 className="text-xl font-black">{deptShort}</h2>
            <p className="mt-3 text-sm leading-7 text-emerald-50/80">
              {deptDesc}
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#2C2C2C]">
              <Mail className="h-4 w-4 text-[#6F4E37]" />
              {t("deptDetail.contactChannel")}
            </h2>
            <p className="mt-3 break-words text-sm font-bold text-[#1E5631]">{department.contact}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
