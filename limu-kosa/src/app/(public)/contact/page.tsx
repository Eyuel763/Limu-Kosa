import { Building2, Send } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import { contactChannels, departments } from "@/lib/publicContent";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="contact.eyebrow"
        titleKey="contact.title"
        descriptionKey="contact.description"
        iconName="Phone"
      />
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <section>
          <h2 className="text-3xl font-black text-[#1E5631]">Main office</h2>
          <div className="mt-6 divide-y divide-[#E8E1D4] border-y border-[#E8E1D4]">
            {contactChannels.map((channel) => (
              <div key={channel.label} className="py-5">
                <div className="text-xs font-bold uppercase tracking-wide text-[#6F4E37]">{channel.label}</div>
                <p className="mt-1 text-base leading-7 text-[#50627A]">{channel.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-3xl font-black text-[#1E5631]">
            <Send className="h-7 w-7 text-[#6F4E37]" />
            Department directory
          </h2>
          <p className="mt-3 text-base leading-8 text-[#50627A]">
            Contact form submission will be connected when the NestJS backend is added. For now, this directory shows planned office channels.
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {departments.slice(0, 10).map((department) => (
              <div key={department.id} className="border-b border-[#E8E1D4] pb-4">
                <h3 className="font-black text-[#2C2C2C]">{department.shortName}</h3>
                <p className="mt-1 break-words text-sm text-[#50627A]">{department.contact}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
