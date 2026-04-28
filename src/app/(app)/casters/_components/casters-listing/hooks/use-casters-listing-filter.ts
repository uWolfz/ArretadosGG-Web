"use client";

import { useMemo, useState } from "react";
import {
  CASTERS,
  type Caster,
  type CasterRole,
} from "@/app/(app)/_data/casters";
import { matchesCastersListingSearch } from "../utils/matches-casters-listing-search";

type UseCastersListingFilterResult = {
  searchCastersListing: string;
  setSearchCastersListing: (value: string) => void;
  roleCastersListing: CasterRole | "all";
  setRoleCastersListing: (value: CasterRole | "all") => void;
  filteredCastersListing: Caster[];
  filterKeyCastersListing: string;
};

export function useCastersListingFilter(): UseCastersListingFilterResult {
  const [searchCastersListing, setSearchCastersListing] = useState("");
  const [roleCastersListing, setRoleCastersListing] = useState<
    CasterRole | "all"
  >("all");

  const filteredCastersListing = useMemo(() => {
    return CASTERS.filter(
      (c) =>
        (roleCastersListing === "all" || c.role === roleCastersListing) &&
        matchesCastersListingSearch(c, searchCastersListing),
    );
  }, [searchCastersListing, roleCastersListing]);

  const filterKeyCastersListing = `${roleCastersListing}:${searchCastersListing}`;

  return {
    searchCastersListing,
    setSearchCastersListing,
    roleCastersListing,
    setRoleCastersListing,
    filteredCastersListing,
    filterKeyCastersListing,
  };
}
