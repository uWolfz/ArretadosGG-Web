"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayersIcon,
  FilmIcon,
  MegaphoneIcon,
  TrophyIcon,
  MessageSquareIcon,
} from "lucide-react";
import {
  NEWS_CATEGORY_LABEL,
  type NewsArticle,
  type NewsCategory,
} from "@/app/(app)/_data/news";
import {
  EmptyState,
  ListingTabsNav,
  Pagination,
  sliceForPage,
  totalPagesFor,
  type ListingTabConfig,
} from "@/app/(app)/_components";
import { NewsCard } from "../news-card";

const NEWS_PER_PAGE = 9;

type NewsCategoryFilter = NewsCategory | "all";

type NewsListingProps = {
  items: NewsArticle[];
};

const FILTER_ORDER: ReadonlyArray<ListingTabConfig<NewsCategoryFilter>> = [
  { key: "all", label: "Todos", icon: LayersIcon },
  { key: "recap", label: NEWS_CATEGORY_LABEL.recap, icon: FilmIcon },
  {
    key: "announcement",
    label: NEWS_CATEGORY_LABEL.announcement,
    icon: MegaphoneIcon,
  },
  { key: "league", label: NEWS_CATEGORY_LABEL.league, icon: TrophyIcon },
  {
    key: "opinion",
    label: NEWS_CATEGORY_LABEL.opinion,
    icon: MessageSquareIcon,
  },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

export function NewsListing({ items }: NewsListingProps) {
  const [filter, setFilter] = useState<NewsCategoryFilter>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const counts = useMemo(
    () =>
      FILTER_ORDER.reduce<Record<NewsCategoryFilter, number>>(
        (acc, f) => {
          acc[f.key] =
            f.key === "all"
              ? items.length
              : items.filter((a) => a.category === f.key).length;
          return acc;
        },
        { all: 0, recap: 0, announcement: 0, league: 0, opinion: 0 },
      ),
    [items],
  );

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((a) => a.category === filter)),
    [items, filter],
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <ListingTabsNav
        tabs={FILTER_ORDER}
        active={filter}
        onChange={setFilter}
        counts={counts}
        ariaLabel="Filtrar notícias por categoria"
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${filter}-${page}`}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
        >
          {filtered.length === 0 ? (
            <EmptyState title="Nenhuma notícia nessa categoria." size="lg" />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sliceForPage(filtered, page, NEWS_PER_PAGE).map((article) => (
                  <motion.div key={article.slug} variants={staggerItem}>
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={totalPagesFor(filtered, NEWS_PER_PAGE)}
                onPageChange={setPage}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
