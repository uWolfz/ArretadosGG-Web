import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MatchTeam } from "@/app/(app)/_data/matches";

type MatchTeamSideProps = {
  team: MatchTeam;
  align: "left" | "right";
  faded?: boolean;
};

export function MatchTeamSide({ team, align, faded }: MatchTeamSideProps) {
  const nameBlock = (
    <div
      className={cn(
        "flex min-w-0 flex-col",
        align === "left" ? "items-end text-right" : "items-start text-left",
      )}
    >
      <span
        className={cn(
          "truncate text-sm font-semibold",
          faded ? "text-foreground/50" : "text-foreground",
        )}
      >
        {team.name}
      </span>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/55">
        {team.tag}
      </span>
    </div>
  );

  const logoBlock = (
    <div
      className={cn(
        "size-10 shrink-0 rounded-md bg-background p-1 ring-1 ring-border",
        faded && "opacity-50",
      )}
    >
      <Image
        src={team.logo}
        alt=""
        width={48}
        height={48}
        className="size-full object-contain"
      />
    </div>
  );

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3",
        align === "left" ? "justify-end" : "justify-start",
      )}
    >
      {align === "left" ? (
        <>
          {nameBlock}
          {logoBlock}
        </>
      ) : (
        <>
          {logoBlock}
          {nameBlock}
        </>
      )}
    </div>
  );
}
