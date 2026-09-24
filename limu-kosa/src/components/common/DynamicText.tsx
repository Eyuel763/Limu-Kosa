"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface DynamicTextProps {
  item: any;
  field: string;
  fallback?: string;
  className?: string;
  as?: React.ElementType;
}

export default function DynamicText({
  item,
  field,
  fallback = "",
  className,
  as: Component = "span",
}: DynamicTextProps) {
  const { tDynamic } = useLanguage();
  const text = tDynamic(item, field) || fallback || (item ? item[field] : "");
  return <Component className={className}>{text}</Component>;
}
