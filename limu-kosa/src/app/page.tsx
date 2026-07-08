"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Landmark,
  Mountain,
  Newspaper,
  Sprout,
} from "lucide-react";
import { announcements, newsItems, projects, siteStats, tourismSites } from "@/lib/publicContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const sliderItems = [
  {
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80",
    tagline: "Jimma Zone · Oromia, Ethiopia",
    title: "Limu Kosa Coffee Heritage",
    description:
      "A public portal rooted in the woreda's shade-grown Arabica coffee, forests, agriculture, and community service.",
    primaryHref: "/tourism",
    primaryLabel: "Explore tourism",
  },
  {
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    tagline: "Official public information portal",
    title: "Limu Kosa Woreda Administration",
    description:
      "Follow government updates, public notices, development work, departments, documents, and local opportunities.",
    primaryHref: "/about",
    primaryLabel: "Learn more",
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    tagline: "Forests, valleys, and rural communities",
    title: "Nature, Culture, and Development",
    description:
      "Discover protected forests, local tourism resources, investment potential, public offices, and community-centered administration.",
    primaryHref: "/investment",
    primaryLabel: "View investment",
  },
  {
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80",
    tagline: "Eco-tourism and natural preservation",
    title: "Nature and Community Care",
    description:
      "Explore protected high-biodiversity montane forests, community beehives, and wild coffee preservation initiatives.",
    primaryHref: "/tourism",
    primaryLabel: "Explore tourism",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const { t } = useLanguage();

  const sliderItems = [
    {
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80",
      tagline: t('hero.slide1.tagline'),
      title: t('hero.slide1.title'),
      description: t('hero.slide1.description'),
      primaryHref: "/tourism",
      primaryLabel: t('hero.slide1.primary'),
    },
    {
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      tagline: t('hero.slide2.tagline'),
      title: t('hero.slide2.title'),
      description: t('hero.slide2.description'),
      primaryHref: "/about",
      primaryLabel: t('hero.slide2.primary'),
    },
    {
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      tagline: t('hero.slide3.tagline'),
      title: t('hero.slide3.title'),
      description: t('hero.slide3.description'),
      primaryHref: "/investment",
      primaryLabel: t('hero.slide3.primary'),
    },
    {
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80",
      tagline: t('hero.slide4.tagline'),
      title: t('hero.slide4.title'),
      description: t('hero.slide4.description'),
      primaryHref: "/tourism",
      primaryLabel: t('hero.slide4.primary'),
    },
  ];

  const quickLinks = [
    { title: t('home.ql.departments'), desc: t('home.ql.departments.desc'), href: "/departments", icon: Building2 },
    { title: t('home.ql.investment'),  desc: t('home.ql.investment.desc'),  href: "/investment",  icon: Sprout },
    { title: t('home.ql.tourism'),     desc: t('home.ql.tourism.desc'),     href: "/tourism",     icon: Mountain },
    { title: t('downloads.title'),     desc: t('home.ql.news.desc'),        href: "/downloads",   icon: FileText },
  ];

  // Explicitly type hooks as any[] arrays to stop compilation errors from API resource definitions
  const [news, setNews] = useState<any[]>(newsItems);
  const [announ, setAnnoun] = useState<any[]>(announcements);
  const [proj, setProj] = useState<any[]>(projects);
  const [tourism, setTourism] = useState<any[]>(tourismSites);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";
    
    fetch(`${apiBase}/public/news`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && data.length > 0 && setNews(data))
      .catch(() => {});

    fetch(`${apiBase}/public/announcements`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && data.length > 0 && setAnnoun(data))
      .catch(() => {});

    fetch(`${apiBase}/public/projects`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && data.length > 0 && setProj(data))
      .catch(() => {});

    fetch(`${apiBase}/public/tourism`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && data.length > 0 && setTourism(data))
      .catch(() => {});
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % sliderItems.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
  };

  // Safe and clean interval processing without layout lag
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchEnd = (x: number) => {
    if (touchStartX.current === null) return;
    const distance = touchStartX.current - x;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="bg-[#F8F6F1] pb-16">
      <section
        className="relative h-[640px] w-full overflow-hidden bg-zinc-950 pt-20 text-white"
        style={{ touchAction: "pan-y" }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          handleTouchEnd(event.changedTouches[0]?.clientX ?? 0);
        }}
      >
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {sliderItems.map((slide, index) => (
            <div key={slide.title} className="relative h-full w-full shrink-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#0B2D1A]/70 to-black/25" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-[#F4D06F]">
                      <Landmark className="h-4 w-4" />
                      {slide.tagline}
                    </div>
                    <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
                      {slide.description}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={slide.primaryHref}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D4A017] px-6 py-3.5 text-base font-bold text-[#2C2C2C] transition hover:bg-[#E9C46A]"
                      >
                        {slide.primaryLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3.5 text-base font-bold text-[#1E5631] transition hover:bg-[#F8F6F1]"
                      >
                        Contact office
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2">
            {sliderItems.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === current ? "w-10 bg-[#D4A017]" : "w-2.5 bg-white/45"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </section>

      <section className="border-b border-[#E8E1D4] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {siteStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex gap-3">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-[#6F4E37]" />
                <div>
                  <div className="text-2xl font-black text-[#2C2C2C]">{stat.value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wide text-[#6B7280]">{stat.label}</div>
                  <div className="mt-1 text-xs text-[#6B7280]">{stat.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-black text-[#1E5631]">{t('home.quickLinks.title')}</h2>
          <p className="mt-3 max-w-xl text-base leading-8 text-[#50627A]">
            {t('home.quickLinks.subtitle')}
          </p>
        </div>
        <div className="divide-y divide-[#E8E1D4] border-y border-[#E8E1D4]">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.title} href={link.href} className="group flex items-center gap-4 py-5">
                <Icon className="h-6 w-6 shrink-0 text-[#1E5631]" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-[#2C2C2C]">{link.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#50627A]">{link.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#6F4E37] transition group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-[#E8E1D4] pb-3">
              <h2 className="flex items-center gap-2 text-2xl font-black text-[#1E5631]">
                <Newspaper className="h-5 w-5 text-[#6F4E37]" />
                {t('home.news.title')}
              </h2>
              <Link href="/news" className="text-sm font-bold text-[#6F4E37] hover:text-[#1E5631]">
                {t('home.news.viewAll')}
              </Link>
            </div>
            <div className="space-y-6">
              {news.slice(0, 3).map((item) => (
                <article key={item.title} className="border-b border-[#E8E1D4] pb-5 last:border-b-0">
                  <div className="text-xs font-bold uppercase tracking-wide text-[#6F4E37]">{item?.category || "News"}</div>
                  <h3 className="mt-2 text-xl font-black text-[#2C2C2C]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#50627A]">{item?.excerpt || item?.description || ""}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-lg lg:min-h-full">
            <Image
              src={sliderItems[0].image}
              alt="Coffee beans representing Limu Kosa coffee heritage"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-black text-[#1E5631]">Notices and featured work</h2>
          <p className="mt-3 text-sm leading-7 text-[#50627A]">
            Public notices, development highlights, and tourism information are loaded dynamically from the woreda database.
          </p>
        </div>
        <div className="space-y-6 lg:col-span-2">
          {[
            announ[0] ? { title: announ[0].title, type: announ[0]?.type || announ[0]?.category || "Community Notice", desc: announ[0]?.body || announ[0]?.description || announ[0]?.excerpt || "" } : null,
            proj[0] ? { title: proj[0].title, type: proj[0]?.status || "Ongoing", desc: proj[0]?.description || proj[0]?.body || proj[0]?.excerpt || "" } : null,
            tourism[0] ? { title: tourism[0].title, type: "Tourism", desc: tourism[0]?.body || tourism[0]?.description || tourism[0]?.excerpt || "" } : null
          ].filter(Boolean).map((item: any) => (
            <div key={item.title} className="grid gap-2 border-b border-[#E8E1D4] pb-5 sm:grid-cols-[180px_1fr]">
              <div className="text-xs font-bold uppercase tracking-wide text-[#6F4E37]">
                {item.type}
              </div>
              <div>
                <h3 className="font-black text-[#2C2C2C]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#50627A]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}