"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Bell,
  Building2,
  Camera,
  FileText,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Newspaper,
  Save,
  Settings,
  Trash2,
  Upload,
  UserRound,
  LogOut,
  Plus,
  Menu,
  X,
  Calendar,
  Layers,
  ArrowUpRight,
  Sun,   // <-- Added missing import
  Moon   // <-- Added missing import
} from "lucide-react";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";

const resources = [
  { key: "news", label: "News", icon: Newspaper },
  { key: "announcements", label: "Announcements", icon: Bell },
  { key: "departments", label: "Departments", icon: Building2 },
  { key: "leaders", label: "Leadership", icon: UserRound },
  { key: "projects", label: "Projects", icon: LayoutDashboard },
  { key: "gallery", label: "Gallery", icon: Camera },
  { key: "downloads", label: "Documents", icon: FileText },
  { key: "investment", label: "Investment", icon: Globe2 },
  { key: "tourism", label: "Tourism", icon: Globe2 },
  { key: "settings", label: "Settings", icon: Settings },
];

const templates: Record<string, Record<string, any>> = {
  news: { title: "", slug: "", excerpt: "", body: "", category: "Administration", status: "PUBLISHED", imageUrl: "" },
  announcements: { title: "", slug: "", body: "", category: "Public notice", status: "PUBLISHED" },
  departments: { name: "", slug: "", shortName: "", description: "", responsibilities: [], programs: [], contact: "", published: true, imageUrl: "" },
  leaders: { name: "", position: "", biography: "", responsibilities: [], contact: "", photoUrl: "", published: true },
  projects: { title: "", slug: "", body: "", location: "", status: "PUBLISHED", imageUrl: "" },
  gallery: { title: "", category: "General", imageUrl: "", altText: "", published: true },
  downloads: { title: "", category: "Reports", fileUrl: "", description: "", published: true },
  investment: { title: "", slug: "", body: "", category: "Investment", status: "PUBLISHED" },
  tourism: { title: "", slug: "", body: "", category: "Tourism", status: "PUBLISHED" },
  settings: { title: "", slug: "", body: "", category: "Setting", status: "PUBLISHED", metadata: {} },
};

type AnyRecord = Record<string, any> & { id?: string; title?: string; name?: string; slug?: string };

export default function AdminPortalClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [email, setEmail] = useState("admin@limukosa.gov.et");
  const [password, setPassword] = useState("Admin@12345");
  const [active, setActive] = useState("news");
  const [items, setItems] = useState<AnyRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<Record<string, any>>({ ...templates.news });
  const [message, setMessage] = useState("Please sign in to access content administration.");
  const [isBusy, setIsBusy] = useState(false);

  const activeResource = useMemo(() => resources.find((item) => item.key === active) ?? resources[0], [active]);
  const selected = items.find((item) => item.id === selectedId);

  useEffect(() => {
    setIsMounted(true);
    const savedToken = window.localStorage.getItem("limu-kosa-admin-token") ?? "";
    if (savedToken) {
      setToken(savedToken);
    }
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('limu-kosa-theme', nextTheme);
  };

  useEffect(() => {
    if (token) void loadItems(active, token);
  }, [active, token]);


  async function login(event: FormEvent) {
    event.preventDefault();
    setIsBusy(true);
    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed. Check your credentials.");
      const data = await response.json();
      setToken(data.accessToken);
      window.localStorage.setItem("limu-kosa-admin-token", data.accessToken);
      setMessage(`Logged in as ${data.user.email}`);
      await loadItems(active, data.accessToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsBusy(false);
    }
  }

  function logout() {
    setToken("");
    window.localStorage.removeItem("limu-kosa-admin-token");
    setItems([]);
    setSelectedId(null);
    setFormState({ ...templates[active] });
    setMessage("Logged out successfully.");
  }

  async function loadItems(resource = active, authToken = token) {
    setIsBusy(true);
    try {
      const response = await fetch(`${apiBase}/admin/${resource}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error("Could not load resource. Is the backend running?");
      const data = await response.json();
      setItems(data);
      setMessage(`${resource} loaded successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load records");
      setItems([]);
    } finally {
      setIsBusy(false);
    }
  }

  async function saveItem() {
    if (!token) return;
    setIsBusy(true);
    try {
      const url = selectedId ? `${apiBase}/admin/${active}/${selectedId}` : `${apiBase}/admin/${active}`;
      
      const payloadData = { ...formState };
      delete payloadData.id;
      delete payloadData.createdAt;
      delete payloadData.updatedAt;

      const response = await fetch(url, {
        method: selectedId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payloadData),
      });
      if (!response.ok) throw new Error("Save operation failed. Please check form data.");
      
      setMessage(selectedId ? "Record updated successfully." : "Record created successfully.");
      setSelectedId(null);
      setFormState({ ...templates[active] });
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setIsBusy(false);
    }
  }

  async function deleteItem(id: string) {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this record?")) return;
    setIsBusy(true);
    try {
      // FIX: Add the 'active' resource name to the URL path
      const response = await fetch(`${apiBase}/admin/${active}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error("Delete failed");
      
      setMessage("Record deleted successfully.");
      if (selectedId === id) {
        setSelectedId(null);
        setFormState({ ...templates[active] });
      }
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setIsBusy(false);
    }
  }

  const handleChange = (key: string, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  async function uploadFileForField(file: File, fieldKey: string) {
    const form = new FormData();
    form.append("file", file);
    setIsBusy(true);
    try {
      const response = await fetch(`${apiBase}/admin/uploads/file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!response.ok) throw new Error("Upload failed");
      const uploaded = await response.json();
      setMessage(`Uploaded successfully.`);
      handleChange(fieldKey, uploaded.url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsBusy(false);
    }
  }

  function renderLivePreview() {
    if (!selectedId) return null;
    
    const apiBaseRoot = apiBase.replace("/api", "");
    const getFullUrl = (url: string) => {
      if (!url) return "";
      return url.startsWith("http") ? url : `${apiBaseRoot}${url}`;
    };

    return (
      <div className="mb-6 rounded-xl border border-[#D4A017] bg-[#F8F6F1] p-5 shadow-xs w-full min-w-0 overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b border-[#E8DCC4] pb-2 gap-2 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6F4E37] truncate">Posted Content View</span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 shrink-0">
            {formState.status || (formState.published ? "Published" : "Draft")}
          </span>
        </div>
        
        {(active === "news" || active === "announcements" || active === "investment" || active === "tourism" || active === "settings") && (
          <div className="space-y-3 min-w-0 w-full overflow-hidden">
            {formState.imageUrl && (
              <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200">
                <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="min-w-0 w-full">
              <div className="text-xs font-bold uppercase text-[#6F4E37] break-all">{formState.category || "General"}</div>
              <h3 className="text-lg font-black text-[#2C2C2C] mt-1 break-words break-all">{formState.title || "Untitled"}</h3>
              {formState.publishedAt && (
                <div className="text-[10px] text-[#6B7280]">Published: {new Date(formState.publishedAt).toLocaleDateString()}</div>
              )}
            </div>
            {formState.excerpt && (
              <p className="text-sm text-[#50627A] italic bg-white p-2.5 rounded border border-gray-150 break-words break-all">{formState.excerpt}</p>
            )}
            {formState.body && (
              <p className="text-sm leading-6 text-[#2C2C2C] whitespace-pre-wrap break-words break-all">{formState.body}</p>
            )}
          </div>
        )}

        {active === "projects" && (
          <div className="space-y-3 min-w-0 w-full overflow-hidden">
            {formState.imageUrl && (
              <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200">
                <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="min-w-0 w-full">
              <h3 className="text-lg font-black text-[#2C2C2C] break-words break-all">{formState.title || "Untitled Project"}</h3>
              <div className="text-xs font-bold text-[#6F4E37] mt-1 break-all">📍 {formState.location || "Woreda-wide"}</div>
            </div>
            <p className="text-sm leading-6 text-[#2C2C2C] whitespace-pre-wrap break-words break-all">{formState.body || formState.excerpt}</p>
          </div>
        )}
        
        {active === "departments" && (
          <div className="space-y-3 min-w-0 w-full overflow-hidden">
            {formState.imageUrl && (
              <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200">
                <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="min-w-0 w-full">
              <h3 className="text-lg font-black text-[#2C2C2C] break-words break-all">{formState.name || "Unnamed Department"}</h3>
              <div className="text-xs font-bold text-[#6F4E37] mt-1 break-all">{formState.shortName || "Short Name"} · {formState.contact}</div>
            </div>
            <p className="text-sm leading-6 text-[#50627A] break-words break-all">{formState.description}</p>
            {Array.isArray(formState.responsibilities) && formState.responsibilities.length > 0 && (
              <div className="min-w-0 w-full">
                <h4 className="text-xs font-black text-[#2C2C2C] uppercase tracking-wider mb-1">Responsibilities:</h4>
                <ul className="list-disc pl-5 text-xs text-[#50627A] space-y-0.5 break-words break-all">
                  {formState.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
            {Array.isArray(formState.programs) && formState.programs.length > 0 && (
              <div className="pt-2 min-w-0 w-full">
                <h4 className="text-xs font-black text-[#2C2C2C] uppercase tracking-wider mb-1">Active Programs:</h4>
                <div className="flex flex-wrap gap-1.5 w-full">
                  {formState.programs.map((p: string, i: number) => (
                    <span key={i} className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-[#1E5631] break-all">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {active === "leaders" && (
          <div className="flex gap-4 items-start min-w-0 w-full overflow-hidden">
            {formState.photoUrl && (
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#1E5631] shrink-0">
                <img src={getFullUrl(formState.photoUrl)} alt="Leader" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="space-y-1 min-w-0 flex-1 w-full">
              <h3 className="text-base font-black text-[#2C2C2C] break-words break-all">{formState.name || "Unnamed Leader"}</h3>
              <div className="text-xs font-bold text-[#6F4E37] break-all">{formState.position || "Position"}</div>
              <p className="text-xs leading-5 text-[#50627A] break-words break-all">{formState.biography}</p>
              {Array.isArray(formState.responsibilities) && formState.responsibilities.length > 0 && (
                <div className="pt-1.5 space-y-0.5 min-w-0 w-full">
                  <div className="text-[10px] font-black text-[#2C2C2C] uppercase tracking-wider">Responsibilities:</div>
                  <div className="flex flex-wrap gap-1 w-full">
                    {formState.responsibilities.map((r: string, i: number) => (
                      <span key={i} className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[9px] font-medium text-[#2C2C2C] break-all">{r}</span>
                    ))}
                  </div>
                </div>
              )}
              {formState.contact && <div className="text-[10px] text-[#6B7280] pt-1 break-all">Contact: {formState.contact}</div>}
            </div>
          </div>
        )}
        
        {active === "gallery" && (
          <div className="space-y-3 min-w-0 w-full overflow-hidden">
            {formState.imageUrl && (
              <div className="relative h-44 w-full overflow-hidden rounded-md border border-gray-200">
                <img src={getFullUrl(formState.imageUrl)} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="text-sm font-black text-[#2C2C2C] break-words break-all">{formState.title || "Untitled Image"}</h3>
            <div className="text-xs text-[#6B7280] break-all">Category: {formState.category || "General"} | Alt: {formState.altText || "None"}</div>
          </div>
        )}
        
        {active === "downloads" && (
          <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-150 gap-4 min-w-0 w-full">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-black text-[#2C2C2C] break-words break-all">{formState.title || "Untitled Document"}</h3>
              <p className="text-xs text-[#6B7280] break-words break-all">{formState.category || "Reports"} · {formState.description}</p>
            </div>
            {formState.fileUrl && (
              <span className="text-xs font-bold text-[#1E5631] underline truncate max-w-[120px] shrink-0 break-all">
                {formState.fileUrl.split("/").pop()}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  function renderFormFields() {
    const fields: React.JSX.Element[] = [];
    const apiBaseRoot = apiBase.replace("/api", "");

    const textInput = (key: string, label: string, placeholder = "") => (
      <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full">
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
      <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full">
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
      <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full">
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
        <div key={key} className="flex flex-col gap-1.5 min-w-0 w-full">
          <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">{label}</label>
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={currentUrl}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={isImage ? "https://example.com/image.jpg" : "/uploads/document.pdf"}
              className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
            />
            <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#D7DED5] bg-[#F8F6F1] px-4 py-2 text-xs font-bold text-[#1E5631] hover:bg-[#EEF2ED] transition hover:text-[#D4A017] active:scale-95 shrink-0">
              <Upload className="h-4 w-4" />
              Upload
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    void uploadFileForField(file, key);
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
      <div key={key} className="flex items-center gap-3 py-2 min-w-0 w-full">
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
        <div key={key} className="flex flex-col gap-1.5 border-t border-[#EEF2ED] pt-3 mt-3 min-w-0 w-full">
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
                  className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] px-3 py-1.5 text-xs"
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
                className="flex-1 min-w-0 rounded-lg border border-[#D7DED5] px-3 py-1.5 text-xs bg-gray-50"
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

    if (active === "news") {
      fields.push(
        textInput("title", "News Title", "e.g., Coffee harvest expands"),
        slugInput(),
        textInput("category", "Category", "e.g., Agriculture"),
        textareaInput("excerpt", "Short Excerpt Summary", 2, "Summary of the article..."),
        textareaInput("body", "Article Body Content", 8, "Full article body content..."),
        fileUrlInput("imageUrl", "Featured Image"),
        (
          <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full">
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
          <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full">
            <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Status</label>
            <select
              value={formState.status ?? "PUBLISHED"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none"
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
          <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full">
            <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Status</label>
            <select
              value={formState.status ?? "PUBLISHED"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none"
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
          <div key="status" className="flex flex-col gap-1.5 min-w-0 w-full">
            <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Status</label>
            <select
              value={formState.status ?? "PUBLISHED"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-lg border border-[#D7DED5] bg-white px-3 py-2.5 text-xs outline-none"
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

  if (!isMounted) {
    return <div className="min-h-screen bg-[#EEF2ED]" />;
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEF2ED] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden text-[#2C2C2C]">
        <div className="absolute top-0 left-0 w-80 h-80 lg:w-96 lg:h-96 bg-[#12351E]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 lg:w-96 lg:h-96 bg-[#D4A017]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        {/* Theme Toggle in Login Screen */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white hover:bg-gray-100 border border-[#D7DED5] transition-colors text-[#1E5631] cursor-pointer shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
          </button>
        </div>

        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-[#D7DED5] relative z-10">
          <div className="text-center">
            <Image
              src="/limu-kosa-logo.png"
              alt="Limu Kosa Woreda logo"
              width={72}
              height={72}
              className="mx-auto h-20 w-20 rounded-full bg-white p-1 border-2 border-[#1E5631] shadow-sm"
              priority
            />
            <h2 className="mt-5 text-3xl font-black text-[#1E5631] tracking-tight">Limu Kosa</h2>
            <p className="mt-1.5 text-xs font-black text-[#6F4E37] uppercase tracking-widest">
              Government Administration CMS
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={login}>
            {message && (
              <div className="rounded-md bg-[#F8F6F1] border border-[#E8E1D4] px-4 py-3 text-xs font-bold text-[#6F4E37] text-center">
                {message}
              </div>
            )}
            
            <div className="rounded-md space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3.5 py-3 border border-[#D7DED5] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] text-sm"
                  placeholder="admin@limukosa.gov.et"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3.5 py-3 border border-[#D7DED5] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isBusy}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#1E5631] hover:bg-[#12351E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E5631] transition active:scale-95 shadow-sm disabled:opacity-40"
              >
                {isBusy ? "Authenticating..." : "Sign In to Admin Panel"}
              </button>
            </div>
            
            <div className="text-center pt-2">
              <Link href="/" className="text-xs font-bold text-[#6F4E37] hover:text-[#1E5631] transition">
                ← Back to public website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#2C2C2C] flex relative w-full overflow-x-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR LEFT PANEL BAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#12351E] px-5 py-6 text-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
            <Image src="/limu-kosa-logo.png" alt="Limu Kosa Woreda logo" width={48} height={48} className="h-12 w-12 rounded-full bg-white p-0.5 shrink-0" />
            <div>
              <div className="text-lg font-black tracking-tight leading-tight">Limu Kosa</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#D4A017]">Admin portal</div>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-1">
          {resources.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setSelectedId(null);
                  setFormState({ ...templates[item.key] });
                  setIsSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-xs font-bold tracking-wide transition ${
                  active === item.key ? "bg-white text-[#12351E] shadow-sm" : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* RIGHT CONTENT CONTAINER WITH ONLY-ONCE VIEWPORT OFFSET */}
      <main className="min-w-0 flex flex-col min-h-screen w-full lg:pl-[280px]">
        <header className="border-b border-[#D7DED5] bg-white px-4 py-5 lg:px-8 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 lg:hidden shrink-0"
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-black text-[#1E5631] truncate">Administration Panel</h1>
                <p className="mt-0.5 text-xs text-[#50627A] font-medium truncate max-w-xs sm:max-w-md">{message}</p>
              </div>
            </div>
            
            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#1E5631] cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-500" />}
              </button>

              <div className="flex items-center gap-3 bg-[#EEF2ED] rounded-lg px-3 py-1.5 border border-[#D7DED5]">
                <span className="text-[10px] font-black text-[#1E5631] uppercase tracking-wider hidden sm:inline">Admin Session</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </div>
            </div>

          </div>
        </header>

        <div className="grid gap-6 px-4 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 flex-1 items-start w-full min-w-0">
          
          {/* REGISTRY COLUMN PANEL CONTAINER */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] flex flex-col min-h-[550px] w-full min-w-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5] rounded-t-2xl shrink-0 gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                {(() => {
                  const TargetIcon = activeResource.icon;
                  return <TargetIcon className="h-4 w-4 text-[#1E5631] shrink-0" />;
                })()}
                <div className="min-w-0">
                  <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] truncate">{activeResource.label} Registry</h2>
                  <p className="text-[10px] text-[#7A8B9E] font-mono lowercase truncate">/{active}</p>
                </div>
              </div>
              <button
                onClick={() => loadItems()}
                disabled={isBusy}
                className="rounded-md border border-[#D7DED5] bg-white px-3 py-1.5 text-xs font-bold text-[#6F4E37] shadow-2xs hover:bg-[#FAF9F5] transition disabled:opacity-40 shrink-0"
              >
                Refresh Data
              </button>
            </div>
            
            <div className="flex-1 divide-y divide-[#E8E1D4]/60 overflow-y-auto max-h-[640px] bg-[radial-gradient(#faf9f5_1px,transparent_1px)] [background-size:16px_16px] w-full min-w-0">
              {items.map((item) => {
                const labelText = item.title ?? item.name ?? item.slug ?? item.id ?? "Untitled Entry";
                const isCurrentSelected = selectedId === item.id;
                const itemTimeDisplay = item.publishedAt || item.createdAt || null;

                return (
                  <div 
                    key={item.id} 
                    className={`p-4 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group w-full min-w-0 overflow-hidden ${
                      isCurrentSelected ? "bg-[#EEF2ED] border-l-4 border-l-[#1E5631]" : "hover:bg-[#FAF9F5]"
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-1.5 w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.category && (
                          <span className="bg-white px-2 py-0.5 border border-[#E8E1D4] text-[10px] font-black uppercase tracking-wider rounded text-[#6F4E37] shadow-3xs break-all max-w-[150px] truncate">
                            {item.category}
                          </span>
                        )}
                        {(item.status || item.published !== undefined) && (
                          <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded shrink-0 ${
                            item.status === "PUBLISHED" || item.published === true
                              ? "bg-green-50 text-green-700 border border-green-200" 
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            {item.status ?? (item.published ? "Published" : "Draft")}
                          </span>
                        )}
                        {itemTimeDisplay && (
                          <span className="text-[10px] font-medium text-[#7A8B9E] flex items-center gap-1 shrink-0">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {new Date(itemTimeDisplay).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-sm font-bold text-[#2C2C2C] pr-2 group-hover:text-[#1E5631] transition-colors break-words break-all tracking-tight leading-snug">
                        {labelText}
                      </h3>
                      
                      {(item.excerpt || item.description || item.slug) && (
                        <p className="text-xs text-[#50627A] pr-4 font-mono opacity-80 break-words break-all line-clamp-2">
                          {item.excerpt || item.description || item.slug}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 sm:self-center self-end bg-white sm:bg-transparent p-1 sm:p-0 rounded-lg border sm:border-0 border-gray-100 shadow-3xs sm:shadow-none">
                      <button
                        onClick={() => {
                          setSelectedId(item.id ?? null);
                          setFormState({ ...item });
                        }}
                        className="p-2 text-xs font-bold rounded-lg border border-[#E8E1D4] bg-white hover:bg-[#FAF9F5] hover:border-[#1E5631]/30 text-[#50627A] hover:text-[#1E5631] transition flex items-center gap-1 shadow-3xs shrink-0"
                      >
                        <span>Edit</span>
                        <ArrowUpRight className="h-3 w-3 opacity-60" />
                      </button>
                      {item.id ? (
                        <button
                          onClick={() => deleteItem(item.id as string)}
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
                  <p className="text-xs font-bold">No data entries mapped here inside this section yet.</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Use the workflow tools block to append structural fields.</p>
                </div>
              ) : null}
            </div>
          </section>

          {/* EDIT WORKFLOW & PREVIEW SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] flex flex-col min-h-[550px] lg:sticky lg:top-24 w-full min-w-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5] rounded-t-2xl shrink-0 gap-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] truncate">
                {selected ? `Edit ${activeResource.label}` : `New ${activeResource.label}`}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setFormState({ ...templates[active] });
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#6F4E37] hover:text-[#1E5631] transition shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                Clear Form
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[500px] w-full min-w-0">
              {renderLivePreview()}
              {renderFormFields()}
            </div>
            
            <div className="border-t border-[#E8E1D4] px-5 py-4 bg-gray-50 rounded-b-2xl flex items-center justify-between shrink-0 gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={saveItem}
                  disabled={isBusy}
                  className="inline-flex items-center gap-2 rounded-md bg-[#1E5631] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#12351E] transition active:scale-95 shadow-sm disabled:opacity-40"
                >
                  <Save className="h-4 w-4" />
                  Save Record
                </button>
                {selectedId && (
                  <button
                    onClick={() => {
                      setSelectedId(null);
                      setFormState({ ...templates[active] });
                    }}
                    className="text-xs font-bold text-[#50627A] hover:text-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <span className="text-[10px] font-mono text-[#6B7280] truncate max-w-[100px] sm:max-w-none">
                /{active}
              </span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}