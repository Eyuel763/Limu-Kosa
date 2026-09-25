"use client";

import { useState, useMemo } from "react";
import { Calendar, Layers, ArrowUpRight, Trash2, LucideIcon, Search, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ResourceItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface AnyRecord {
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  category?: string;
  status?: string;
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  excerpt?: string;
  description?: string;
  subject?: string;
  email?: string;
  translations?: any;
}

interface ResourceListProps {
  activeResource: ResourceItem;
  active: string;
  items: AnyRecord[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  setFormState: (state: any) => void;
  deleteItem: (id: string) => void;
  loadItems: () => void;
  isBusy: boolean;
}

export default function ResourceList({
  activeResource,
  active,
  items,
  selectedId,
  setSelectedId,
  setFormState,
  deleteItem,
  loadItems,
  isBusy,
}: ResourceListProps) {
  const { t, tDynamic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const translatedResourceLabel = t(`admin.tab.${activeResource.key}` as any);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => {
      const text = [
        item.title,
        item.name,
        item.slug,
        item.category,
        item.description,
        item.excerpt,
        item.subject,
        item.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(q);
    });
  }, [items, searchQuery]);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] flex flex-col min-h-[550px] w-full min-w-0 overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5] rounded-t-2xl shrink-0 gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          {(() => {
            const TargetIcon = activeResource.icon;
            return <TargetIcon className="h-4 w-4 text-[#1E5631] shrink-0" />;
          })()}
          <div className="min-w-0">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] truncate">
              {translatedResourceLabel} {t("admin.registry")}
            </h2>
          </div>
          <span className="ml-1 px-2 py-0.5 text-[10px] font-black bg-[#EEF2ED] text-[#1E5631] rounded-full border border-[#D7DED5]">
            {filteredItems.length}
          </span>
        </div>
        <button
          onClick={() => loadItems()}
          disabled={isBusy}
          className="rounded-md border border-[#D7DED5] bg-white px-3 py-1.5 text-xs font-bold text-[#6F4E37] shadow-2xs hover:bg-[#FAF9F5] transition disabled:opacity-40 shrink-0"
        >
          {t("admin.refresh")}
        </button>
      </div>

      {/* SEARCH INPUT BAR */}
      <div className="px-4 py-2.5 bg-white border-b border-[#E8E1D4] flex items-center gap-2">
        <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`${t("admin.search")} ${translatedResourceLabel.toLowerCase()}...`}
          className="w-full text-xs outline-none bg-transparent placeholder:text-gray-400 font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition"
            title="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex-1 divide-y divide-[#E8E1D4]/60 overflow-y-auto max-h-[640px] bg-[radial-gradient(#faf9f5_1px,transparent_1px)] [background-size:16px_16px] w-full min-w-0">
        {filteredItems.map((item) => {
          const rawTitle = item.title ?? item.name;
          const labelText = rawTitle ? tDynamic(item, item.title ? "title" : "name") : (item.slug ?? item.id ?? "Untitled Entry");
          const isCurrentSelected = selectedId === item.id;
          const itemTimeDisplay = item.publishedAt || item.createdAt || null;

          const rawCategory = item.category;
          const categoryText = rawCategory ? tDynamic(item, "category") : null;

          const isPublished = item.status === "PUBLISHED" || item.published === true;
          const statusText = isPublished ? t("common.published") : t("common.draft");

          const rawDesc = item.excerpt || item.description;
          const descText = rawDesc ? tDynamic(item, item.excerpt ? "excerpt" : "description") : item.slug;

          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedId(item.id ?? null);
                setFormState({ ...item });
              }}
              className={`p-4 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group w-full min-w-0 overflow-hidden ${
                isCurrentSelected ? "bg-[#EEF2ED] border-l-4 border-l-[#1E5631]" : "hover:bg-[#FAF9F5]"
              }`}
            >
              <div className="min-w-0 flex-1 space-y-1.5 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  {categoryText && (
                    <span className="bg-white px-2 py-0.5 border border-[#E8E1D4] text-[10px] font-black uppercase tracking-wider rounded text-[#6F4E37] shadow-3xs break-all max-w-[150px] truncate">
                      {categoryText}
                    </span>
                  )}
                  {(item.status || item.published !== undefined) && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded shrink-0 ${
                        isPublished
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {statusText}
                    </span>
                  )}
                  {itemTimeDisplay && (
                    <span className="text-[10px] font-medium text-[#7A8B9E] flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      {new Date(itemTimeDisplay).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#2C2C2C] pr-2 group-hover:text-[#1E5631] transition-colors break-words break-all tracking-tight leading-snug">
                  {labelText}
                </h3>

                {(descText || item.subject || item.email) && (
                  <p className="text-xs text-[#50627A] pr-4 font-mono opacity-80 break-words break-all line-clamp-2">
                    {item.subject 
                      ? `${item.subject} (${item.email ?? ""})` 
                      : descText}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 sm:self-center self-end bg-white sm:bg-transparent p-1 sm:p-0 rounded-lg border sm:border-0 border-gray-100 shadow-3xs sm:shadow-none">
                {active !== "messages" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(item.id ?? null);
                      setFormState({ ...item });
                    }}
                    className="p-2 text-xs font-bold rounded-lg border border-[#E8E1D4] bg-white hover:bg-[#FAF9F5] hover:border-[#1E5631]/30 text-[#50627A] hover:text-[#1E5631] transition flex items-center gap-1 shadow-3xs shrink-0"
                  >
                    <span>{t("admin.edit")}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </button>
                )}
                {item.id ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.id as string);
                    }}
                    className="p-2 text-xs font-bold rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-600 hover:border-red-200 transition shadow-3xs shrink-0"
                    title="Remove item data row permanently"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}

        {!items.length ? (
          <div className="py-20 px-4 text-center text-[#50627A] w-full">
            <Layers className="h-10 w-10 mx-auto text-gray-300 stroke-[1.5] mb-3" />
            <p className="text-xs font-bold">{t("common.noItems")}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
