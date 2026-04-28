"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  NEWS_CATEGORY_LABEL,
  type NewsArticle,
} from "@/app/(app)/_data/news";
import { formatDayMonthYearPtBr } from "@/lib/format-date";

type NewsCardProps = {
  article: NewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <a
        href={`#${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/30"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-card/10 to-transparent" />
          <span className="absolute top-3 left-3 rounded-sm bg-background/80 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground">
            {NEWS_CATEGORY_LABEL[article.category]}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 font-display text-base font-bold leading-tight text-foreground">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-xs text-foreground/70">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-2 font-mono text-[11px] text-foreground/60">
            <span>{formatDayMonthYearPtBr(article.publishedAt)}</span>
            <span>{article.readTimeMin} min</span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
