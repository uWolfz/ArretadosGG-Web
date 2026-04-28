import type { ReactNode } from "react";

type SettingsMeSectionProps = {
  titleSettingsMe: string;
  children: ReactNode;
};

export function SettingsMeSection({
  titleSettingsMe,
  children,
}: SettingsMeSectionProps) {
  return (
    <section className="rounded-md border border-border bg-card p-4 md:p-5">
      <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
        {titleSettingsMe}
      </h2>
      {children}
    </section>
  );
}
