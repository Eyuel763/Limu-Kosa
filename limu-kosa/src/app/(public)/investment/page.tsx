"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Briefcase } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import DynamicText from "@/components/common/DynamicText";
import { getPublicResource } from "@/lib/api";
import { investmentSectors as fallbackInvestment } from "@/lib/publicContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const investmentImage =
  "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80";

export default function InvestmentPage() {
  const { t, tDynamic } = useLanguage();
  const [investmentSectors, setInvestmentSectors] = useState<any[]>(fallbackInvestment);

  useEffect(() => {
    async function loadInvestment() {
      const res = await getPublicResource("investment", fallbackInvestment);
      if (res) setInvestmentSectors(res);
    }
    loadInvestment();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="investment.eyebrow"
        titleKey="investment.title"
        descriptionKey="investment.description"
        iconName="Sprout"
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img src={investmentImage} alt="Agricultural field representing investment opportunities" className="h-80 w-full object-cover lg:h-full" />
          </div>
          <div className="divide-y divide-[#E8E1D4] border-y border-[#E8E1D4]">
            {investmentSectors.map((sector) => (
              <div key={sector.title} className="py-6">
                <DynamicText item={sector} field="title" fallback={sector.title} className="text-2xl font-black text-[#2C2C2C]" as="h2" />
                <DynamicText item={sector} field="body" fallback={sector.body} className="mt-3 text-base leading-8 text-[#50627A]" as="p" />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12 border-l-2 border-[#D4A017] pl-5">
          <h2 className="text-2xl font-black text-[#1E5631]">{tDynamic("Investment procedure support", "")}</h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-[#50627A]">
            {tDynamic("This site currently provides information only. Investor submissions, licensing workflows, and authenticated services can be added later through the NestJS backend.", "")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#6F4E37]">
            {tDynamic("Contact Trade and Industry Office", "")} <ArrowRight className="h-4 w-4" />
          </div>
        </section>
      </main>
    </div>
  );
}

