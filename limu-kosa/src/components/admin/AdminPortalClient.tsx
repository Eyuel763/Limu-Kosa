"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import {
  Bell,
  Building2,
  Camera,
  FileText,
  Globe2,
  LayoutDashboard,
  Newspaper,
  Settings,
  UserRound,
  LogOut,
  Plus,
  Menu,
  Sun,
  Moon,
  Save,
  Mail,
  Lock,
  Key,
} from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AdminLogin from "./AdminLogin";
import AdminSidebar from "./AdminSidebar";
import ResourceList from "./ResourceList";
import ResourcePreview from "./ResourcePreview";
import ResourceForm from "./ResourceForm";
import MessagesInbox from "./MessagesInbox";

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
  { key: "messages", label: "Messages", icon: Mail },
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
  messages: { name: "", email: "", subject: "", body: "" },
  settings: { title: "", slug: "", body: "", category: "Setting", status: "PUBLISHED", metadata: {} },
};

type AnyRecord = Record<string, any> & { id?: string; title?: string; name?: string; slug?: string };

export default function AdminPortalClient() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("news");
  const [items, setItems] = useState<AnyRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<Record<string, any>>({ ...templates.news });
  const [message, setMessage] = useState("Please sign in to access content administration.");
  const [isBusy, setIsBusy] = useState(false);

  const [settingsTab, setSettingsTab] = useState("homepage-hero");
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  async function refreshSession(): Promise<string | null> {
    try {
      const response = await fetch(`${apiBase}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (data?.accessToken) {
        setToken(data.accessToken);
        return data.accessToken;
      }
      setToken("");
      return null;
    } catch {
      return null;
    }
  }

  async function authenticatedFetch(url: string, options: RequestInit = {}, currentToken = token): Promise<Response> {
    const headers = new Headers(options.headers || {});
    if (currentToken) {
      headers.set("Authorization", `Bearer ${currentToken}`);
    }

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    if (response.status === 401) {
      const newToken = await refreshSession();
      if (newToken) {
        const retryHeaders = new Headers(options.headers || {});
        retryHeaders.set("Authorization", `Bearer ${newToken}`);
        response = await fetch(url, {
          ...options,
          headers: retryHeaders,
          credentials: "include",
        });
      } else {
        setToken("");
      }
    }

    return response;
  }

  async function changeAdminPassword(e: FormEvent) {
    e.preventDefault();
    if (newPasswordInput !== confirmPasswordInput) {
      setMessage("New password and confirmation do not match.");
      return;
    }
    if (newPasswordInput.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }
    setIsBusy(true);
    try {
      const response = await authenticatedFetch(`${apiBase}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update password");
      setMessage("Administrator password updated successfully!");
      setCurrentPasswordInput("");
      setNewPasswordInput("");
      setConfirmPasswordInput("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update password");
    } finally {
      setIsBusy(false);
    }
  }

  const activeResource = useMemo(() => resources.find((item) => item.key === active) ?? resources[0], [active]);
  const selected = items.find((item) => item.id === selectedId);

  useEffect(() => {
    setIsMounted(true);
    // Clean up legacy localStorage token if present
    window.localStorage.removeItem("limu-kosa-admin-token");

    const currentTheme = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
    setTheme(currentTheme);

    // Attempt silent session recovery using HttpOnly cookie
    void refreshSession();
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

  // Load settings based on active tab
  useEffect(() => {
    if (active === "settings") {
      const match = items.find((item) => item.slug === settingsTab);
      if (match) {
        setSelectedId(match.id ?? null);
        setFormState({ ...match });
      } else {
        setSelectedId(null);
        setFormState({ title: "", slug: settingsTab, metadata: {}, category: "Setting", status: "PUBLISHED" });
      }
    }
  }, [active, settingsTab, items]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setIsBusy(true);
    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Login failed. Check your credentials.");
      }
      const data = await response.json();
      setToken(data.accessToken);
      setMessage(`Logged in as ${data.user.email}`);
      await loadItems(active, data.accessToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsBusy(false);
    }
  }

  async function logout() {
    try {
      await fetch(`${apiBase}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    setToken("");
    setItems([]);
    setSelectedId(null);
    setFormState({ ...templates[active] });
    setMessage("Logged out successfully.");
  }

  async function loadItems(resource = active, authToken = token) {
    setIsBusy(true);
    try {
      const response = await authenticatedFetch(`${apiBase}/admin/${resource}`, {}, authToken);
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

      // Auto-generate slug from title or name if the resource has a slug field
      const baseVal = (payloadData.title || payloadData.name || "") as string;
      if (baseVal && active !== "leaders" && active !== "gallery" && active !== "downloads" && active !== "messages") {
        payloadData.slug = baseVal
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      const response = await authenticatedFetch(url, {
        method: selectedId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadData),
      });
      if (!response.ok) throw new Error("Save operation failed. Please check form data.");

      setMessage(selectedId ? "Record updated successfully." : "Record created successfully.");
      // Refresh items to pull updated values
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
      const response = await authenticatedFetch(`${apiBase}/admin/${active}/${id}`, {
        method: "DELETE",
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

  // Generalized uploadFile handler to be passed down into the dynamic form fields
  async function uploadFile(file: File): Promise<string | null> {
    const form = new FormData();
    form.append("file", file);
    setIsBusy(true);
    try {
      const response = await authenticatedFetch(`${apiBase}/admin/uploads/file`, {
        method: "POST",
        body: form,
      });
      if (!response.ok) throw new Error("Upload failed");
      const uploaded = await response.json();
      setMessage(`Uploaded successfully.`);
      return uploaded.url;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
      return null;
    } finally {
      setIsBusy(false);
    }
  }

  if (!isMounted) {
    return <div className="min-h-screen bg-[#EEF2ED]" />;
  }

  if (!token) {
    return (
      <AdminLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
        isBusy={isBusy}
        message={message}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#2C2C2C] flex relative w-full overflow-x-hidden">
      <AdminSidebar
        resources={resources}
        active={active}
        setActive={setActive}
        setSelectedId={setSelectedId}
        setFormState={setFormState}
        templates={templates}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

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
                <h1 className="text-xl font-black text-[#1E5631] truncate">{t("admin.title")}</h1>
                <p className="mt-0.5 text-xs text-[#50627A] font-medium truncate max-w-xs sm:max-w-md">{message}</p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <LanguageSwitcher variant="dark" />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#1E5631] cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-500" />}
              </button>

              <div className="flex items-center gap-3 bg-[#EEF2ED] rounded-lg px-3 py-1.5 border border-[#D7DED5]">
                <span className="text-[10px] font-black text-[#1E5631] uppercase tracking-wider hidden sm:inline">{t("admin.session")}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {t("admin.logout")}
                </button>
              </div>
            </div>
          </div>
        </header>

        {active === "settings" ? (
          <div className="px-4 py-6 lg:px-8 space-y-6 flex-1 w-full min-w-0">
            {/* TABS SELECTOR */}
            <div className="flex flex-wrap gap-2 border-b border-[#D7DED5] pb-4">
              {[
                { slug: "homepage-hero", label: t("admin.tab.hero") },
                { slug: "site-stats", label: t("admin.tab.stats") },
                { slug: "contact-info", label: t("admin.tab.contactInfo") },
                { slug: "security", label: t("admin.tab.security") },
              ].map(tab => (
                <button
                  key={tab.slug}
                  onClick={() => setSettingsTab(tab.slug)}
                  className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg border transition duration-150 ${
                    settingsTab === tab.slug
                      ? "bg-[#1E5631] text-white border-[#1E5631] shadow-sm"
                      : "bg-white text-[#50627A] border-[#D7DED5] hover:bg-[#FAF9F5] hover:text-[#1E5631]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {settingsTab === "security" ? (
              <div className="max-w-xl bg-white rounded-2xl shadow-sm border border-[#D7DED5] overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5]">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#1E5631]" />
                    <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C]">
                      {t("admin.changePassword")}
                    </h2>
                  </div>
                </div>

                <form onSubmit={changeAdminPassword} className="p-6 space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                      {t("admin.currentPassword")}
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPasswordInput}
                      onChange={(e) => setCurrentPasswordInput(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-xs outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                      {t("admin.newPassword")}
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="Enter new password (min. 8 characters)"
                      className="w-full rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-xs outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                      {t("admin.confirmPassword")}
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      placeholder="Re-enter new password to confirm"
                      className="w-full rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-xs outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
                    />
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={isBusy}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#1E5631] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#12351E] transition disabled:opacity-40 shadow-sm"
                    >
                      <Key className="h-4 w-4" />
                      {t("admin.updatePassword")}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* SIDE-BY-SIDE EDITOR & PREVIEW */
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start w-full min-w-0">
                <section className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] flex flex-col w-full min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5] rounded-t-2xl shrink-0 gap-4">
                    <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] truncate">
                      {t("admin.settingsManager")}
                    </h2>
                  </div>
                  
                  <div className="p-5 space-y-4 max-h-[580px] overflow-y-auto w-full min-w-0">
                    <ResourceForm
                      active={active}
                      formState={formState}
                      setFormState={setFormState}
                      apiBase={apiBase}
                      uploadFile={uploadFile}
                    />
                  </div>

                  <div className="border-t border-[#E8E1D4] px-5 py-4 bg-gray-50 rounded-b-2xl flex items-center justify-between shrink-0 gap-4">
                    <button
                      onClick={saveItem}
                      disabled={isBusy}
                      className="inline-flex items-center gap-2 rounded-md bg-[#1E5631] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#12351E] transition active:scale-95 shadow-sm disabled:opacity-40"
                    >
                      <Save className="h-4 w-4" />
                      {t("admin.saveSettings")}
                    </button>
                  </div>
                </section>

                <section className="space-y-6">
                  <ResourcePreview
                    active={active}
                    selectedId="settings-active"
                    formState={formState}
                    apiBase={apiBase}
                  />
                </section>
              </div>
            )}
          </div>
        ) : active === "messages" ? (
          <MessagesInbox
            items={items}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setFormState={setFormState}
            deleteItem={deleteItem}
            loadItems={loadItems}
            isBusy={isBusy}
          />
        ) : (
          /* STANDARD REGISTRY GRID LAYOUT */
          <div className="grid gap-6 px-4 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 flex-1 items-start w-full min-w-0">
            <ResourceList
              activeResource={activeResource}
              active={active}
              items={items}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setFormState={setFormState}
              deleteItem={deleteItem}
              loadItems={loadItems}
              isBusy={isBusy}
            />

            <section className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] flex flex-col min-h-[550px] lg:sticky lg:top-24 w-full min-w-0 overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5] rounded-t-2xl shrink-0 gap-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] truncate">
                  {active === "messages" 
                    ? "Message Details" 
                    : (selected 
                        ? `${t("admin.editRecord")} ${t(`admin.tab.${activeResource.key}` as any)}` 
                        : `${t("admin.newRecord")} ${t(`admin.tab.${activeResource.key}` as any)}`)}
                </h2>
                {active !== "messages" && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(null);
                      setFormState({ ...templates[active] });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#6F4E37] hover:text-[#1E5631] transition shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {t("admin.clearForm")}
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[500px] w-full min-w-0">
                <ResourcePreview
                  active={active}
                  selectedId={selectedId}
                  formState={formState}
                  apiBase={apiBase}
                />
                <ResourceForm
                  active={active}
                  formState={formState}
                  setFormState={setFormState}
                  apiBase={apiBase}
                  uploadFile={uploadFile}
                />
              </div>

              <div className="border-t border-[#E8E1D4] px-5 py-4 bg-gray-50 rounded-b-2xl flex items-center justify-between shrink-0 gap-4">
                {active === "messages" ? (
                  <span className="text-xs font-bold text-[#50627A]">
                    Inbound message review panel
                  </span>
                ) : (
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={saveItem}
                      disabled={isBusy}
                      className="inline-flex items-center gap-2 rounded-md bg-[#1E5631] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#12351E] transition active:scale-95 shadow-sm disabled:opacity-40"
                    >
                      <Save className="h-4 w-4" />
                      {t("admin.saveRecord")}
                    </button>
                    {selectedId && (
                      <button
                        onClick={() => {
                          setSelectedId(null);
                          setFormState({ ...templates[active] });
                        }}
                        className="text-xs font-bold text-[#50627A] hover:text-red-600 transition"
                      >
                        {t("admin.cancel")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}