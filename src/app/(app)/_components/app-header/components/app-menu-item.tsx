import { cn } from "@/lib/utils";
import Link from "next/link";


type MenuItemProps = {
  label: string;
  icon: React.ReactNode;
  onSelect: () => void;
  tone?: "default" | "danger";
} & (
  | { as: "link"; href: string }
  | { as: "button"; href?: undefined }
);

export function AppMenuItem({ label, icon, onSelect, tone = "default", ...rest }: MenuItemProps) {
  const cls = cn(
    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors",
    tone === "danger"
      ? "text-brand-red hover:bg-brand-red/10"
      : "text-foreground/85 hover:bg-foreground/5 hover:text-foreground",
  );

  if (rest.as === "link") {
    return (
      <Link role="menuitem" href={rest.href} onClick={onSelect} className={cls}>
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <button role="menuitem" type="button" onClick={onSelect} className={cls}>
      {icon}
      {label}
    </button>
  );
}
