"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  NEWS_CATEGORY_LABEL,
  type NewsArticle,
} from "@/app/(app)/_data/news";
import { formatDayMonthYearPtBr } from "@/lib/format-date";

type NewsFeaturedCardProps = {
  article: NewsArticle;
};

export function NewsFeaturedCard({ article }: NewsFeaturedCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={`#${article.slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
          <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[320px]">
            <Image
              src={article.thumbnail}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card" />
            <span className="absolute top-4 left-4 rounded-sm bg-background/80 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground">
              {NEWS_CATEGORY_LABEL[article.category]}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 p-5 sm:p-6">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-brand-yellow">
                Destaque
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                {article.title}
              </h2>
              <p className="text-sm text-foreground/75 line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-foreground/70">
              <span>{formatDayMonthYearPtBr(article.publishedAt)}</span>
              <span>{article.readTimeMin} min de leitura</span>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
