"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import { useTournamentsFilter } from "@/app/(app)/tournaments/_hooks/use-tournaments-filter";
import { ListingTabs } from "./listing-tabs";
import { ListingModalityFilters } from "./listing-modality-filters";
import { ListingSearchAndGame } from "./listing-search-and-game";
import { ListingEmptyState } from "./listing-empty-state";
import { ListingMinePlaceholder } from "./listing-mine-placeholder";
import { ListingGrid } from "./listing-grid";

type TournamentsListingProps = {
  items: TournamentCore[];
};

export function TournamentsListing({ items }: TournamentsListingProps) {
  const {
    tab,
    setTab,
    game,
    setGame,
    query,
    setQuery,
    modalityFilters,
    toggleModalityFilterTournaments,
    page,
    setPage,
    filtered,
    counts,
    filterKey,
  } = useTournamentsFilter({ items });

  const isMineTab = tab === "mine";

  return (
    <section
      id="listing"
      className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
    >
      <ListingTabs active={tab} onChange={setTab} counts={counts} />

      {!isMineTab && (
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <ListingModalityFilters
            filters={modalityFilters}
            onToggle={toggleModalityFilterTournaments}
          />
          <ListingSearchAndGame
            query={query}
            onQueryChange={setQuery}
            game={game}
            onGameChange={setGame}
          />
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filterKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {isMineTab ? (
            <ListingMinePlaceholder />
          ) : filtered.length === 0 ? (
            <ListingEmptyState />
          ) : (
            <ListingGrid
              items={filtered}
              page={page}
              onPageChange={setPage}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
