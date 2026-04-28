export const STEPS = [
  { code: "01", label: "O problema" },
  { code: "02", label: "O que a gente fez" },
  { code: "03", label: "O resultado" },
] as const;

export const STEP_COLORS: { text: string; bg: string; chip: string }[] = [
  {
    text: "text-brand-red",
    bg: "bg-brand-red",
    chip: "bg-brand-red text-white",
  },
  {
    text: "text-brand-yellow",
    bg: "bg-brand-yellow",
    chip: "bg-brand-yellow text-neutral-950",
  },
  {
    text: "text-brand-green",
    bg: "bg-brand-green",
    chip: "bg-brand-green text-white",
  },
];
