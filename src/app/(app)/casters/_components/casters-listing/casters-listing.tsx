"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CASTERS } from "@/app/(app)/_data/casters";
import {
  EmptyState,
  FilterChip,
  SearchInput,
} from "@/app/(app)/_components";
import { CasterCard } from "../caster-card";
import { CASTER_ROLE_FILTER_OPTIONS } from "./constants/caster-role-filter-options";
import { useCastersListingFilter } from "./hooks/use-casters-listing-filter";

export function CastersListing() {
  const {
    searchCastersListing,
    setSearchCastersListing,
    roleCastersListing,
    setRoleCastersListing,
    filteredCastersListing,
    filterKeyCastersListing,
  } = useCastersListingFilter();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchCastersListing}
          onChange={setSearchCastersListing}
          placeholder="Buscar por nick, handle ou bio"
          className="sm:max-w-md"
        />
        <div className="flex flex-wrap items-center gap-2">
          {CASTER_ROLE_FILTER_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              active={roleCastersListing === opt.value}
              onClick={() => setRoleCastersListing(opt.value)}
              accent="yellow"
              ariaLabel={`Filtrar por ${opt.label}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end">
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/65">
          {filteredCastersListing.length} de {CASTERS.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filterKeyCastersListing}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {filteredCastersListing.length === 0 ? (
            <EmptyState
              title="Nenhum caster encontrado"
              hint="Ajuste os filtros ou limpe a busca."
              size="lg"
            />
          ) : (
            <ul
              aria-label={`Casters (${filteredCastersListing.length})`}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCastersListing.map((caster) => (
                <li key={caster.playerTag}>
                  <CasterCard caster={caster} />
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
