"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PaginationControlsProps {
  meta: PaginationMeta;
  onPageChange: (newPage: number) => void;
  className?: string;
}

export default function PaginationControls({ meta, onPageChange, className = "" }: PaginationControlsProps) {
  if (!meta || meta.totalPages <= 1) {
    return null;
  }

  const { page, totalPages, hasPrevPage, hasNextPage, total, limit } = meta;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Generate page numbers array with intelligent ellipsis window
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-sm ${className}`}>
      {/* Item Range Info */}
      <div className="text-xs font-semibold text-[#50627A]">
        Showing <span className="font-bold text-[#1E5631]">{startItem}</span> -{" "}
        <span className="font-bold text-[#1E5631]">{endItem}</span> of{" "}
        <span className="font-bold text-[#1E5631]">{total}</span> items
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => hasPrevPage && onPageChange(page - 1)}
          disabled={!hasPrevPage}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#D7DED5] bg-white text-xs font-bold text-[#1E5631] hover:bg-[#EEF2ED] transition disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs text-[#50627A] font-medium">
                ...
              </span>
            ) : (
              <button
                key={`page-${p}`}
                onClick={() => onPageChange(Number(p))}
                className={`h-8 w-8 rounded-lg text-xs font-black transition ${
                  page === p
                    ? "bg-[#1E5631] text-white shadow-sm"
                    : "bg-white text-[#50627A] border border-[#D7DED5] hover:bg-[#EEF2ED] hover:text-[#1E5631]"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => hasNextPage && onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#D7DED5] bg-white text-xs font-bold text-[#1E5631] hover:bg-[#EEF2ED] transition disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
