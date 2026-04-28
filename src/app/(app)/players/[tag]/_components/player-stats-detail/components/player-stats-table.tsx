type Row = {
  key: string;
  cells: string[];
};

type PlayerStatsTableProps = {
  title: string;
  headers: string[];
  rows: Row[];
};

export function PlayerStatsTable({
  title,
  headers,
  rows,
}: PlayerStatsTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <p className="border-b border-border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
        {title}
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-background/40">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-foreground/65"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-border/60 last:border-b-0">
              {row.cells.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2 tabular-nums text-foreground/85"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
