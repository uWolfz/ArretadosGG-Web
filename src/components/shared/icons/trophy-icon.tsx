import type { IconProps } from "./types";

export function TrophyIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H5a2 2 0 0 0 0 4h2" />
      <path d="M17 6h2a2 2 0 0 1 0 4h-2" />
      <path d="M12 14v3" />
      <path d="M9 17h6v3H9z" />
      <path d="M8 20h8" />
    </svg>
  );
}
