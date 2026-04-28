"use client";

import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import {
  Pagination,
  sliceForPage,
  totalPagesFor,
} from "@/app/(app)/_components/pagination";
import { TournamentCard } from "../tournament-card";

const TOURNAMENTS_PER_PAGE = 9;

type ListingGridProps = {
  items: TournamentCore[];
  page: number;
  onPageChange: (page: number) => void;
};

export function ListingGrid({ items, page, onPageChange }: ListingGridProps) {
  const pageItems = sliceForPage(items, page, TOURNAMENTS_PER_PAGE);
  const totalPages = totalPagesFor(items, TOURNAMENTS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((tournament) => (
          <TournamentCard key={tournament.slug} tournament={tournament} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
