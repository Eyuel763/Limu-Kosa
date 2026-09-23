"use client";

import React from "react";
import { Upload, Plus, Trash2 } from "lucide-react";

interface ResourceFormProps {
  active: string;
  formState: Record<string, any>;
  setFormState: (state: any) => void;
  apiBase: string;
  uploadFile: (file: File) => Promise<string | null>;
}

export default function ResourceForm({
  active,
  formState,
  setFormState,
  apiBase,
  uploadFile,
}: ResourceFormProps) {
  const apiBaseRoot = apiBase.replace("/api", "");

  const handleChange = (key: string, value: any) => {
    setFormState((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleMetadataChange = (key: string, value: any) => {
    setFormState((prev: any) => ({
      ...prev,
      metadata: {
        ...(prev.metadata || {}),
        [key]: value,
      },
    }));
  };

  const handleArrayMetadataChange = (metaKey: string, index: number, field: string, value: any) => {
    setFormState((prev: any) => {
      const list = [...(prev.metadata?.[metaKey] || [])];
      // Ensure index is filled
      while (list.length <= index) {
        list.push({});
      }
      list[index] = { ...(list[index] || {}), [field]: value };
      return {
        ...prev,
        metadata: {
          ...(prev.metadata || {}),
          [metaKey]: list,
        },
      };
    });
  };

  const textInput = (key: string, label: string, placeholder = "") => (
    <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full text-left">
      <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">{label}</label>
      <input
        type="text"
        value={formState[key] ?? ""}
        onChange={(e) => handleChange(key, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none transition focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
      />
    </div>
  );

  const slugInput = (key = "slug", label = "URL Slug") => (
    <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full text-left">
      <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">{label}</label>
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={formState[key] ?? ""}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder="e.g., sample-item-slug"
          className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none transition focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
        />
        <button
          type="button"
          onClick={() => {
            const baseVal = formState.title || formState.name || "";
            const generated = baseVal
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            handleChange(key, generated);
          }}
          className="rounded-lg border border-[#D7DED5] bg-gray-50 px-4 py-2 text-xs font-bold text-[#1E5631] hover:bg-[#EEF2ED] transition active:scale-95 shrink-0"
          title="Auto-generate slug from Title/Name"
        >
          Auto
        </button>
      </div>
    </div>
  );

  const textareaInput = (key: string, label: string, rows = 3, placeholder = "") => (
    <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full text-left">
      <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">{label}</label>
      <textarea
        rows={rows}
        value={formState[key] ?? ""}
        onChange={(e) => handleChange(key, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none transition focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631] font-sans leading-relaxed"
      />
    </div>
  );

  const fileUrlInput = (key: string, label: string, isImage = true) => {
    const currentUrl = formState[key] ?? "";
    const fullPreviewUrl = currentUrl
      ? currentUrl.startsWith("http")
        ? currentUrl
        : `${apiBaseRoot}${currentUrl}`
      : "";

    return (
      <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full text-left">
        <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">{label}</label>
        <div className="flex gap-2 w-full">
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={isImage ? "https://example.com/image.jpg" : "/uploads/document.pdf"}
            className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none transition focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
          />
          <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#D7DED5] bg-[#F8F6F1] px-4 py-2 text-xs font-bold text-[#1E5631] hover:bg-[#EEF2ED] transition hover:text-[#D4A017] active:scale-95 shrink-0">
            <Upload className="h-4 w-4" />
            Upload
            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await uploadFile(file);
                  if (url) {
                    handleChange(key, url);
                  }
                }
              }}
            />
          </label>
        </div>
        {isImage && fullPreviewUrl && (
          <div className="mt-2.5 relative h-24 w-44 overflow-hidden rounded-md border border-[#D7DED5] bg-gray-50 shadow-xs">
            <img src={fullPreviewUrl} alt="Uploaded preview" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    );
  };

  const publishedToggle = (key = "published", label = "Published / Publicly visible") => (
    <div key={key} className="flex items-center gap-3 py-2 min-w-0 w-full text-left">
      <input
        type="checkbox"
        id={key}
        checked={!!formState[key]}
        onChange={(e) => handleChange(key, e.target.checked)}
        className="h-4 w-4 rounded border-[#D7DED5] text-[#1E5631] focus:ring-[#1E5631] shrink-0"
      />
      <label htmlFor={key} className="text-xs font-bold text-[#2C2C2C] select-none cursor-pointer truncate">
        {label}
      </label>
    </div>
  );

  const arrayInput = (key: string, label: string) => {
    const arr = Array.isArray(formState[key]) ? formState[key] : [];
    return (
      <div key={key} className="flex flex-col gap-1.5 border-t border-[#EEF2ED] pt-3 mt-3 min-w-0 w-full text-left">
        <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">{label}</label>
        <div className="space-y-1.5 w-full">
          {arr.map((val: string, idx: number) => (
            <div key={idx} className="flex gap-2 w-full">
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const newArr = [...arr];
                  newArr[idx] = e.target.value;
                  handleChange(key, newArr);
                }}
                className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] px-3 py-1.5 text-xs outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const newArr = arr.filter((_: any, i: number) => i !== idx);
                  handleChange(key, newArr);
                }}
                className="text-red-700 hover:text-red-900 font-bold text-xs px-2 shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              id={`add-input-${key}`}
              placeholder={`Add new ${label.toLowerCase()}...`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const target = e.currentTarget;
                  if (target.value.trim()) {
                    handleChange(key, [...arr, target.value.trim()]);
                    target.value = "";
                  }
                }
              }}
              className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] px-3 py-1.5 text-xs bg-gray-50 outline-none"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById(`add-input-${key}`) as HTMLInputElement;
                if (input && input.value.trim()) {
                  handleChange(key, [...arr, input.value.trim()]);
                  input.value = "";
                }
              }}
              className="rounded-lg bg-[#1E5631] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#12351E] transition active:scale-95 shrink-0"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 1. CUSTOM SETTINGS FORMS (HERO SLIDER, STATS, CONTACT, GENERAL)
  if (active === "settings") {
    const slug = formState.slug;

    if (slug === "homepage-hero") {
      const slides: any[] = formState.metadata?.slides || [];

      const addSlide = () => {
        setFormState((prev: any) => {
          const list = [...(prev.metadata?.slides || [])];
          list.push({
            tagline: "",
            title: "",
            description: "",
            primaryHref: "",
            primaryLabel: "",
            image: "",
          });
          return {
            ...prev,
            metadata: {
              ...(prev.metadata || {}),
              slides: list,
            },
          };
        });
      };

      const removeSlide = (index: number) => {
        setFormState((prev: any) => {
          const list = [...(prev.metadata?.slides || [])];
          list.splice(index, 1);
          return {
            ...prev,
            metadata: {
              ...(prev.metadata || {}),
              slides: list,
            },
          };
        });
      };

      return (
        <div className="space-y-6 w-full text-left">
          <div className="flex items-center justify-between bg-[#FAF9F5] p-3 rounded-lg border border-[#E8E1D4]">
            <div className="text-xs text-[#6F4E37] font-bold">
              Editing Homepage Hero Section Slider ({slides.length} {slides.length === 1 ? "Slide" : "Slides"})
            </div>
            <button
              type="button"
              onClick={addSlide}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E5631] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#12351E] transition"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Hero Slide
            </button>
          </div>

          {slides.map((slide: any, idx: number) => {
            const slideImageUrl = slide.image || "";
            const slidePreviewUrl = slideImageUrl
              ? slideImageUrl.startsWith("http")
                ? slideImageUrl
                : `${apiBaseRoot}${slideImageUrl}`
              : "";

            return (
              <div key={idx} className="border border-[#D7DED5] rounded-xl p-4 space-y-4 bg-white shadow-3xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-black text-[#1E5631]">
                    Hero Slide #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSlide(idx)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition"
                    title="Remove this slide"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Tagline (Top subtitle)</label>
                    <input
                      type="text"
                      value={slide.tagline ?? ""}
                      onChange={(e) => handleArrayMetadataChange("slides", idx, "tagline", e.target.value)}
                      placeholder="e.g. Jimma Zone · Oromia, Ethiopia"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Title (Main Heading)</label>
                    <input
                      type="text"
                      value={slide.title ?? ""}
                      onChange={(e) => handleArrayMetadataChange("slides", idx, "title", e.target.value)}
                      placeholder="e.g. Coffee Heritage"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-[#50627A]">Description Paragraph</label>
                  <textarea
                    rows={2}
                    value={slide.description ?? ""}
                    onChange={(e) => handleArrayMetadataChange("slides", idx, "description", e.target.value)}
                    placeholder="Short narrative..."
                    className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Button Link URL</label>
                    <input
                      type="text"
                      value={slide.primaryHref ?? ""}
                      onChange={(e) => handleArrayMetadataChange("slides", idx, "primaryHref", e.target.value)}
                      placeholder="e.g. /tourism"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Button Label Text</label>
                    <input
                      type="text"
                      value={slide.primaryLabel ?? ""}
                      onChange={(e) => handleArrayMetadataChange("slides", idx, "primaryLabel", e.target.value)}
                      placeholder="e.g. Explore"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-[#50627A]">Slide Image</label>
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      value={slideImageUrl}
                      onChange={(e) => handleArrayMetadataChange("slides", idx, "image", e.target.value)}
                      placeholder="Image URL or upload a file"
                      className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                    <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#D7DED5] bg-[#F8F6F1] px-4 py-2 text-xs font-bold text-[#1E5631] hover:bg-[#EEF2ED] transition active:scale-95 shrink-0">
                      <Upload className="h-4 w-4" />
                      Upload
                      <input
                        type="file"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadFile(file);
                            if (url) {
                              handleArrayMetadataChange("slides", idx, "image", url);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                  {slidePreviewUrl && (
                    <div className="mt-2.5 relative h-16 w-32 overflow-hidden rounded border border-[#D7DED5]">
                      <img src={slidePreviewUrl} alt="Slide Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={addSlide}
              className="inline-flex items-center gap-2 rounded-lg border border-[#1E5631] bg-white px-5 py-2.5 text-xs font-bold text-[#1E5631] hover:bg-[#EEF2ED] transition shadow-xs"
            >
              <Plus className="h-4 w-4" />
              Add Another Hero Slide
            </button>
          </div>
        </div>
      );
    }

    if (slug === "site-stats") {
      const stats = formState.metadata?.stats || [];
      const statIndices = [0, 1, 2, 3];
      const iconOptions = ["Users", "MapPin", "Building2", "Trees", "Coffee", "Briefcase", "Landmark"];

      return (
        <div className="space-y-6 w-full text-left">
          <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#E8E1D4] text-xs text-[#6F4E37] font-bold">
            Editing Homepage Woreda Statistics (4 Items)
          </div>
          {statIndices.map((idx) => {
            const stat = stats[idx] || {};
            return (
              <div key={idx} className="border border-[#D7DED5] rounded-xl p-4 space-y-4 bg-white shadow-3xs">
                <div className="text-xs font-black text-[#1E5631] border-b border-gray-100 pb-1.5">
                  Stat Item #{idx + 1}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Label (Title)</label>
                    <input
                      type="text"
                      value={stat.label ?? ""}
                      onChange={(e) => handleArrayMetadataChange("stats", idx, "label", e.target.value)}
                      placeholder="e.g. Surface Area"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Metric Value</label>
                    <input
                      type="text"
                      value={stat.value ?? ""}
                      onChange={(e) => handleArrayMetadataChange("stats", idx, "value", e.target.value)}
                      placeholder="e.g. 1,316 km2"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Detail Subtext</label>
                    <input
                      type="text"
                      value={stat.detail ?? ""}
                      onChange={(e) => handleArrayMetadataChange("stats", idx, "detail", e.target.value)}
                      placeholder="e.g. current boundary"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Display Icon</label>
                    <select
                      value={stat.icon ?? "Landmark"}
                      onChange={(e) => handleArrayMetadataChange("stats", idx, "icon", e.target.value)}
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs bg-white outline-none focus:border-[#1E5631]"
                    >
                      {iconOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (slug === "contact-info") {
      const channels = formState.metadata?.channels || [];
      const channelIndices = [0, 1, 2, 3];
      const iconOptions = ["MapPin", "Phone", "Megaphone", "CalendarDays", "Mail"];

      return (
        <div className="space-y-6 w-full text-left">
          <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#E8E1D4] text-xs text-[#6F4E37] font-bold">
            Editing Woreda Contact Channels (4 Channels)
          </div>
          {channelIndices.map((idx) => {
            const channel = channels[idx] || {};
            return (
              <div key={idx} className="border border-[#D7DED5] rounded-xl p-4 space-y-4 bg-white shadow-3xs">
                <div className="text-xs font-black text-[#1E5631] border-b border-gray-100 pb-1.5">
                  Contact Channel #{idx + 1}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Label (e.g. Telephone)</label>
                    <input
                      type="text"
                      value={channel.label ?? ""}
                      onChange={(e) => handleArrayMetadataChange("channels", idx, "label", e.target.value)}
                      placeholder="e.g. Telephone"
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-[#50627A]">Value (e.g. +251...)</label>
                    <input
                      type="text"
                      value={channel.value ?? ""}
                      onChange={(e) => handleArrayMetadataChange("channels", idx, "value", e.target.value)}
                      placeholder="e.g. +251 97..."
                      className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs outline-none focus:border-[#1E5631]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-[#50627A]">Display Icon</label>
                  <select
                    value={channel.icon ?? "Phone"}
                    onChange={(e) => handleArrayMetadataChange("channels", idx, "icon", e.target.value)}
                    className="rounded-lg border border-[#D7DED5] px-3 py-2 text-xs bg-white outline-none focus:border-[#1E5631]"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (slug === "general") {
      const meta = formState.metadata || {};
      return (
        <div className="space-y-4 w-full text-left">
          <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#E8E1D4] text-xs text-[#6F4E37] font-bold">
            Editing General Settings & Footer Content
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Footer Tagline Description</label>
            <textarea
              rows={3}
              value={meta.footerTagline ?? ""}
              onChange={(e) => handleMetadataChange("footerTagline", e.target.value)}
              placeholder="Footer tagline description text..."
              className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#1E5631]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Copyright/Rights Text</label>
            <input
              type="text"
              value={meta.copyrightText ?? ""}
              onChange={(e) => handleMetadataChange("copyrightText", e.target.value)}
              placeholder="e.g. All rights reserved."
              className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#1E5631]"
            />
          </div>
        </div>
      );
    }
  }

  // 2. STANDARD RESOURCES FORMS
  const fields: React.JSX.Element[] = [];

  if (active === "messages") {
    fields.push(
      <div key="msg-info" className="space-y-4 w-full text-left">
        <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#E8E1D4] text-xs text-[#6F4E37] font-bold">
          User Submission Message Details (Read-only)
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase text-[#50627A]">Sender Name</label>
          <input
            type="text"
            readOnly
            value={formState.name ?? ""}
            className="w-full rounded-lg border border-[#D7DED5] bg-gray-50 px-3 py-2 text-xs outline-none cursor-default font-semibold"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase text-[#50627A]">Sender Email</label>
          <input
            type="text"
            readOnly
            value={formState.email ?? ""}
            className="w-full rounded-lg border border-[#D7DED5] bg-gray-50 px-3 py-2 text-xs outline-none cursor-default font-mono"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase text-[#50627A]">Subject</label>
          <input
            type="text"
            readOnly
            value={formState.subject ?? ""}
            className="w-full rounded-lg border border-[#D7DED5] bg-gray-50 px-3 py-2 text-xs outline-none cursor-default font-semibold"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase text-[#50627A]">Message Body</label>
          <textarea
            rows={6}
            readOnly
            value={formState.body ?? ""}
            className="w-full rounded-lg border border-[#D7DED5] bg-gray-50 px-3 py-2 text-xs outline-none cursor-default font-sans leading-relaxed"
          />
        </div>
      </div>
    );
  } else if (active === "news") {
    fields.push(
      textInput("title", "News Title", "e.g., Coffee harvest expands"),
      slugInput(),
      textInput("category", "Category", "e.g., Agriculture"),
      textareaInput("excerpt", "Short Excerpt Summary", 2, "Summary of the article..."),
      textareaInput("body", "Article Body Content", 8, "Full article body content..."),
      fileUrlInput("imageUrl", "Featured Image"),
      (
        <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full text-left">
          <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Publication Status</label>
          <select
            value={formState.status ?? "PUBLISHED"}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#1E5631]"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      )
    );
  } else if (active === "announcements") {
    fields.push(
      textInput("title", "Announcement Title", "e.g., Town hall notice"),
      slugInput(),
      textInput("category", "Category / Type", "e.g., Community meeting, Office notice"),
      textareaInput("body", "Content Description", 5),
      (
        <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full text-left">
          <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Status</label>
          <select
            value={formState.status ?? "PUBLISHED"}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#1E5631]"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      )
    );
  } else if (active === "departments") {
    fields.push(
      textInput("name", "Department Name", "e.g., Woreda Agriculture Office"),
      slugInput(),
      textInput("shortName", "Short Display Name", "e.g., Agriculture"),
      textareaInput("description", "Office Description", 4),
      textInput("contact", "Contact Email", "e.g., agriculture@limukosa.gov.et"),
      fileUrlInput("imageUrl", "Banner Image"),
      publishedToggle(),
      arrayInput("responsibilities", "Responsibilities"),
      arrayInput("programs", "Major Programs")
    );
  } else if (active === "leaders") {
    fields.push(
      textInput("name", "Leader Full Name", "e.g., Ato Lemma Negash"),
      textInput("position", "Official Position", "e.g., Woreda Chief Administrator"),
      textareaInput("biography", "Biography Detail", 4),
      textInput("contact", "Official Contact Info", "e.g., lemma.n@limukosa.gov.et"),
      fileUrlInput("photoUrl", "Leader Photo"),
      publishedToggle(),
      arrayInput("responsibilities", "Key Portfolios / Responsibilities")
    );
  } else if (active === "projects") {
    fields.push(
      textInput("title", "Project Name"),
      slugInput(),
      textInput("location", "Project Location", "e.g., Selected rural kebeles"),
      textareaInput("body", "Project Description (Body)", 5),
      fileUrlInput("imageUrl", "Project Feature Image"),
      (
        <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full text-left">
          <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Status</label>
          <select
            value={formState.status ?? "PUBLISHED"}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#1E5631]"
          >
            <option value="DRAFT">Draft / Planned</option>
            <option value="PUBLISHED">Ongoing / Published</option>
          </select>
        </div>
      )
    );
  } else if (active === "gallery") {
    fields.push(
      textInput("title", "Image Title"),
      textInput("category", "Gallery Category", "e.g., Agriculture, Infrastructure"),
      fileUrlInput("imageUrl", "Gallery Image File"),
      textInput("altText", "Accessibility Alt Text"),
      publishedToggle()
    );
  } else if (active === "downloads") {
    fields.push(
      textInput("title", "Document Title"),
      textInput("category", "Document Category", "e.g., Reports, Forms, Policies"),
      textareaInput("description", "Document Description", 2),
      fileUrlInput("fileUrl", "Document PDF/File", false),
      publishedToggle()
    );
  } else if (active === "investment" || active === "tourism" || active === "settings") {
    fields.push(
      textInput("title", "Title"),
      slugInput(),
      textInput("category", "Category"),
      textareaInput("body", "Content Description", 6),
      (
        <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full text-left">
          <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Status</label>
          <select
            value={formState.status ?? "PUBLISHED"}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#1E5631]"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      )
    );
  }

  return <div className="space-y-4 w-full">{fields}</div>;
}
