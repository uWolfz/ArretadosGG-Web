import type { Caster } from "@/app/(app)/_data/casters";
import { findPlayerByTag } from "@/app/(app)/_data/players";

export function matchesCastersListingSearch(
  caster: Caster,
  query: string,
): boolean {
  if (query.length === 0) return true;
  const lower = query.toLowerCase();
  const player = findPlayerByTag(caster.playerTag);
  const nick = player?.nick.toLowerCase() ?? "";
  return (
    nick.includes(lower) ||
    caster.handle.toLowerCase().includes(lower) ||
    caster.bio.toLowerCase().includes(lower)
  );
}
