"use client";

import { useMemo } from "react";
import { Mail, Calendar, Trash2, RefreshCw, Inbox, Send, User } from "lucide-react";

interface MessageRecord {
  id?: string;
  name?: string;
  email?: string;
  subject?: string;
  body?: string;
  createdAt?: string;
}

interface MessagesInboxProps {
  items: MessageRecord[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  setFormState: (state: any) => void;
  deleteItem: (id: string) => void;
  loadItems: () => void;
  isBusy: boolean;
}

export default function MessagesInbox({
  items,
  selectedId,
  setSelectedId,
  setFormState,
  deleteItem,
  loadItems,
  isBusy,
}: MessagesInboxProps) {
  const selectedMessage = useMemo(() => {
    return items.find((msg) => msg.id === selectedId) || null;
  }, [items, selectedId]);

  const getInitials = (name?: string) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="px-4 py-6 lg:px-8 flex-1 w-full min-w-0">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start w-full min-w-0">
        
        {/* LEFT COLUMN: INBOX LIST */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] flex flex-col min-h-[580px] w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5] rounded-t-2xl shrink-0 gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <Mail className="h-4 w-4 text-[#1E5631] shrink-0" />
              <div className="min-w-0">
                <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] truncate">
                  Messages Inbox
                </h2>
                <p className="text-[10px] text-[#7A8B9E] font-mono lowercase truncate">/messages</p>
              </div>
              <span className="ml-1 px-2 py-0.5 text-[10px] font-black bg-[#EEF2ED] text-[#1E5631] rounded-full border border-[#D7DED5]">
                {items.length} {items.length === 1 ? "Message" : "Messages"}
              </span>
            </div>

            <button
              onClick={() => loadItems()}
              disabled={isBusy}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D7DED5] bg-white px-3 py-1.5 text-xs font-bold text-[#6F4E37] shadow-2xs hover:bg-[#FAF9F5] transition disabled:opacity-40 shrink-0"
            >
              <RefreshCw className={`h-3 w-3 ${isBusy ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          <div className="flex-1 divide-y divide-[#E8E1D4]/60 overflow-y-auto max-h-[640px] bg-[radial-gradient(#faf9f5_1px,transparent_1px)] [background-size:16px_16px] w-full min-w-0">
            {items.map((item) => {
              const isSelected = selectedId === item.id;
              const timeDisplay = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id ?? null);
                    setFormState({ ...item });
                  }}
                  className={`p-4 cursor-pointer transition-all flex flex-col gap-2 group w-full min-w-0 border-l-4 ${
                    isSelected
                      ? "bg-[#EEF2ED] border-l-[#1E5631] shadow-2xs"
                      : "bg-white border-l-transparent hover:bg-[#FAF9F5] hover:border-l-[#1E5631]/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-[#2C2C2C] truncate group-hover:text-[#1E5631]">
                      {item.name || "Anonymous Sender"}
                    </span>
                    {timeDisplay && (
                      <span className="text-[10px] font-medium text-[#7A8B9E] flex items-center gap-1 shrink-0">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {timeDisplay}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-[#1E5631] truncate">
                    {item.subject || "(No Subject)"}
                  </h3>

                  <p className="text-xs text-[#50627A] line-clamp-2 font-normal leading-relaxed break-words">
                    {item.body || "No content"}
                  </p>

                  <div className="flex items-center justify-between pt-1 mt-1 border-t border-gray-100/80">
                    <span className="text-[10px] text-gray-400 font-mono truncate">
                      {item.email || "No email"}
                    </span>

                    {item.id && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(item.id as string);
                        }}
                        className="p-1.5 text-xs text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition shrink-0"
                        title="Delete Message"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {items.length === 0 && (
              <div className="py-24 px-4 text-center text-[#50627A] w-full">
                <Inbox className="h-12 w-12 mx-auto text-gray-300 stroke-[1.5] mb-3" />
                <p className="text-xs font-bold">No inbound messages in your inbox.</p>
                <p className="text-[11px] text-gray-400 mt-1">User inquiries sent from the contact form will appear here.</p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: MESSAGE READER VIEW */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] flex flex-col min-h-[580px] lg:sticky lg:top-24 w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5] rounded-t-2xl shrink-0 gap-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] truncate">
              Message View
            </h2>
            {selectedMessage?.createdAt && (
              <span className="text-[11px] text-[#50627A] font-medium">
                Received: {new Date(selectedMessage.createdAt).toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[640px] w-full min-w-0">
            {selectedMessage ? (
              <div className="space-y-6 w-full text-left">
                {/* SUBJECT BANNER */}
                <div className="border-b border-gray-100 pb-4">
                  <span className="text-[10px] font-black uppercase text-[#6F4E37] tracking-wider block mb-1">
                    Subject
                  </span>
                  <h1 className="text-lg font-black text-[#1E5631] tracking-tight leading-snug">
                    {selectedMessage.subject || "No Subject"}
                  </h1>
                </div>

                {/* SENDER DETAILS CARD */}
                <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E8E1D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="h-11 w-11 rounded-full bg-[#1E5631] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                      {getInitials(selectedMessage.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#2C2C2C] truncate">
                        {selectedMessage.name || "Anonymous"}
                      </div>
                      <div className="text-xs font-mono text-[#50627A] truncate">
                        {selectedMessage.email || "No email provided"}
                      </div>
                    </div>
                  </div>

                  {selectedMessage.email && (
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Inquiry")}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#1E5631] px-4 py-2 text-xs font-bold text-white hover:bg-[#12351E] transition shadow-xs shrink-0 self-start sm:self-center"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Reply via Email
                    </a>
                  )}
                </div>

                {/* MESSAGE BODY CONTENT */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#50627A] tracking-wider block">
                    Message Body
                  </span>
                  <div className="bg-white p-5 rounded-xl border border-[#D7DED5] text-sm text-[#2C2C2C] leading-relaxed whitespace-pre-wrap min-h-[220px] shadow-2xs font-normal">
                    {selectedMessage.body || "No message body provided."}
                  </div>
                </div>

                {/* ACTION BAR */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  {selectedMessage.id && (
                    <button
                      type="button"
                      onClick={() => deleteItem(selectedMessage.id as string)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete Message
                    </button>
                  )}
                  <span className="text-[10px] font-mono text-[#7A8B9E]">
                    ID: {selectedMessage.id || "N/A"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-32 px-4 text-center text-[#50627A] w-full flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#EEF2ED] flex items-center justify-center text-[#1E5631] mb-4">
                  <Mail className="h-8 w-8 stroke-[1.5]" />
                </div>
                <p className="text-sm font-bold text-[#2C2C2C]">No Message Selected</p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Click on any message row in the inbox list on the left to read its full content here.
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
