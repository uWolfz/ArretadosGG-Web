import type { TournamentCaster } from "@/app/(app)/_data/tournaments";
import {
  findCasterByPlayerTag,
  formatCasterRoleLabel,
} from "@/app/(app)/_data/casters";
import { findPlayerByTag } from "@/app/(app)/_data/players";

export type ResolvedTournamentCaster = {
  name: string;
  role: string | undefined;
  handle: string | undefined;
  photo: string | undefined;
  internalPlayerTag: string | undefined;
};

export function resolveTournamentCaster(
  caster: TournamentCaster,
): ResolvedTournamentCaster {
  if (caster.casterPlayerTag) {
    const casterEntity = findCasterByPlayerTag(caster.casterPlayerTag);
    if (casterEntity) {
      const player = findPlayerByTag(caster.casterPlayerTag);
      return {
        name: player?.nick ?? caster.name,
        role: formatCasterRoleLabel(casterEntity.role),
        handle: casterEntity.handle,
        photo: casterEntity.photo ?? caster.photo,
        internalPlayerTag: caster.casterPlayerTag,
      };
    }
  }
  return {
    name: caster.name,
    role: caster.role,
    handle: caster.handle,
    photo: caster.photo,
    internalPlayerTag: undefined,
  };
}
