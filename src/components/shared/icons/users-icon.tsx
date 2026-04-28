import type { IconProps } from "./types";

export function UsersIcon(props: IconProps) {
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
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
      <path d="M16 4a3 3 0 0 1 0 6" />
      <path d="M17 15h1a4 4 0 0 1 4 4v1" />
    </svg>
  );
}
