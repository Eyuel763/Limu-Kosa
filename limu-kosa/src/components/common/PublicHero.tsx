import type { LucideIcon } from "lucide-react";

type PublicHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function PublicHero({ eyebrow, title, description, icon: Icon }: PublicHeroProps) {
  return (
    <section className="bg-gradient-to-r from-[#159447] to-[#0E6E36] px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F4D06F]">
            <Icon className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
          <p className="text-base leading-8 text-emerald-50/90">{description}</p>
        </div>
      </div>
    </section>
  );
}
