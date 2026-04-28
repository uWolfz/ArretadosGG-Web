import type { CaseAccent } from "@/app/(marketing)/_data/cases";

type AccentClasses = {
  text: string;
  bg: string;
  bgSoft: string;
  border: string;
  ring: string;
  fill: string;
  onDarkText: string;
  groupHoverText: string;
  groupHoverBg: string;
  groupHoverBorder: string;
  groupHoverTextOnDark: string;
};

export const ACCENT: Record<CaseAccent, AccentClasses> = {
  green: {
    text: "text-brand-green",
    bg: "bg-brand-green",
    bgSoft: "bg-brand-green/10",
    border: "border-brand-green",
    ring: "ring-brand-green/25",
    fill: "fill-brand-green",
    onDarkText: "text-brand-green",
    groupHoverText: "group-hover:text-brand-green",
    groupHoverBg: "group-hover:bg-brand-green",
    groupHoverBorder: "group-hover:border-brand-green",
    groupHoverTextOnDark: "group-hover:text-brand-green",
  },
  yellow: {
    text: "text-brand-yellow",
    bg: "bg-brand-yellow",
    bgSoft: "bg-brand-yellow/10",
    border: "border-brand-yellow",
    ring: "ring-brand-yellow/25",
    fill: "fill-brand-yellow",
    onDarkText: "text-brand-yellow",
    groupHoverText: "group-hover:text-brand-yellow",
    groupHoverBg: "group-hover:bg-brand-yellow",
    groupHoverBorder: "group-hover:border-brand-yellow",
    groupHoverTextOnDark: "group-hover:text-brand-yellow",
  },
  red: {
    text: "text-brand-red",
    bg: "bg-brand-red",
    bgSoft: "bg-brand-red/10",
    border: "border-brand-red",
    ring: "ring-brand-red/25",
    fill: "fill-brand-red",
    onDarkText: "text-brand-red",
    groupHoverText: "group-hover:text-brand-red",
    groupHoverBg: "group-hover:bg-brand-red",
    groupHoverBorder: "group-hover:border-brand-red",
    groupHoverTextOnDark: "group-hover:text-brand-red",
  },
};
