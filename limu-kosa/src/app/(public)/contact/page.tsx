"use client";

import { useEffect, useState } from "react";
import { Building2, Send, Mail, User, ClipboardList, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import { contactChannels } from "@/lib/publicContent";

export default function ContactPage() {
  const [channels, setChannels] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";
    fetch(`${apiBase}/public/settings/contact-info`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.metadata?.channels && data.metadata.channels.length > 0) {
          setChannels(data.metadata.channels);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !body.trim()) {
      setStatus('error');
      setMessageText("Please fill out all fields.");
      return;
    }

    setStatus('submitting');
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";
    try {
      const response = await fetch(`${apiBase}/public/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, body }),
      });
      if (!response.ok) throw new Error("Failed to send message.");
      setStatus('success');
      setName("");
      setEmail("");
      setSubject("");
      setBody("");
      setMessageText("Your message has been sent successfully!");
    } catch (err) {
      setStatus('error');
      setMessageText(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const activeChannels = channels.length > 0 ? channels : contactChannels;

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PageHero
        eyebrowKey="contact.eyebrow"
        titleKey="contact.title"
        descriptionKey="contact.description"
        iconName="Phone"
      />
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-[0.80fr_1.20fr] lg:px-8">
        <section>
          <h2 className="text-3xl font-black text-[#1E5631]">Main office</h2>
          <div className="mt-6 divide-y divide-[#E8E1D4] border-y border-[#E8E1D4]">
            {activeChannels.map((channel) => (
              <div key={channel.label} className="py-5">
                <div className="text-xs font-bold uppercase tracking-wide text-[#6F4E37]">{channel.label}</div>
                <p className="mt-1 text-base leading-7 text-[#50627A]">{channel.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#112D19] text-white rounded-2xl p-8 shadow-md border border-emerald-950">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-white/10 rounded-lg text-[#D4A017] shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Send Us a Direct Message</h2>
              <p className="text-xs text-white/70 mt-1 font-medium">We typically respond within 24 hours</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {status === "success" && (
              <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 rounded-lg p-3 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{messageText}</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 bg-rose-900/40 border border-rose-500/30 rounded-lg p-3 text-xs font-bold text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{messageText}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    required
                    placeholder="Abebe Kebede"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="abebe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Subject</label>
              <div className="relative">
                <ClipboardList className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  required
                  placeholder="Inquiry regarding business permits"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Message Content</label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message in detail here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] font-sans leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1E5631] hover:bg-[#12351E] border border-emerald-800 text-white font-bold px-6 py-3.5 text-sm transition active:scale-95 shadow-sm disabled:opacity-40 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Submit Form
              </button>
              <span className="text-xs text-white/40">We respect your privacy</span>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
