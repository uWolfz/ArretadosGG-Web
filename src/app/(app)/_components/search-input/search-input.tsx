"use client";

import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel?: string;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
}: SearchInputProps) {
  return (
    <label className={cn("relative block", className)}>
      <SearchIcon
        className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-foreground/60"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="w-full rounded-md border border-border bg-card pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
