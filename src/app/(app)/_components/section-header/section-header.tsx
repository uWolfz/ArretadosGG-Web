type SectionHeaderProps = {
  title: string;
  meta?: string;
};

export function SectionHeader({ title, meta }: SectionHeaderProps) {
  return (
    <header className="mb-4 flex items-end justify-between gap-3 border-b border-border pb-2">
      <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h2>
      {meta && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
          {meta}
        </span>
      )}
    </header>
  );
}
