import {
  CheckCircle2Icon,
  GlobeIcon,
  StarIcon,
  TrendingUpIcon,
  XCircleIcon,
} from "lucide-react";
import {
  computeCasterAverageRating,
  formatCasterDayRateBrl,
  formatCasterLanguageLabel,
  formatCasterPeakViewers,
  formatCasterRoleLabel,
  type Caster,
} from "@/app/(app)/_data/casters";
import { formatMonthYearPtBr } from "@/lib/format-date";
import { cn } from "@/lib/utils";

type CasterIdentityCardProps = {
  casterIdentityCard: Caster;
};

export function CasterIdentityCard({
  casterIdentityCard,
}: CasterIdentityCardProps) {
  const averageRating = computeCasterAverageRating(casterIdentityCard);

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-card p-5">
        <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
          Sobre o caster
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
              Papel
            </dt>
            <dd className="font-semibold text-foreground">
              {formatCasterRoleLabel(casterIdentityCard.role)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
              Status
            </dt>
            <dd className="inline-flex items-center gap-1 text-xs font-semibold text-brand-green">
              <CheckCircle2Icon className="size-4" aria-hidden="true" />{" "}
              aprovado
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
              Disponível
            </dt>
            <dd
              className={cn(
                "inline-flex items-center gap-1 text-xs font-semibold",
                casterIdentityCard.availableForHire
                  ? "text-brand-green"
                  : "text-foreground/55",
              )}
            >
              {casterIdentityCard.availableForHire ? (
                <>
                  <CheckCircle2Icon className="size-4" aria-hidden="true" /> sim
                </>
              ) : (
                <>
                  <XCircleIcon className="size-4" aria-hidden="true" /> em
                  produção fechada
                </>
              )}
            </dd>
          </div>
          <div className="border-t border-border pt-3">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
              No booth desde
            </dt>
            <dd className="mt-0.5 font-medium capitalize text-foreground">
              {formatMonthYearPtBr(casterIdentityCard.approvedAt)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-md border border-border bg-card p-5">
        <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
          Audiência
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUpIcon
              className="size-4 shrink-0 text-brand-yellow"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                Média de viewers
              </p>
              <p className="font-display text-sm font-bold text-foreground">
                {formatCasterPeakViewers(
                  casterIdentityCard.stats.averageViewers,
                )}
              </p>
            </div>
          </div>
          {averageRating !== null && (
            <div className="flex items-center gap-2">
              <StarIcon
                className="size-4 shrink-0 fill-brand-yellow text-brand-yellow"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                  Reputação
                </p>
                <p className="font-display text-sm font-bold text-foreground">
                  {averageRating.toFixed(1)} ·{" "}
                  {casterIdentityCard.reviews.length} avaliações
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <GlobeIcon
              className="size-4 shrink-0 text-foreground/65"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                Idiomas
              </p>
              <p className="text-sm text-foreground/85">
                {casterIdentityCard.languages
                  .map(formatCasterLanguageLabel)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {casterIdentityCard.dayRateBrl && (
        <div className="rounded-md border border-brand-yellow/40 bg-brand-yellow/5 p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Diária comercial a partir de
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            {formatCasterDayRateBrl(casterIdentityCard.dayRateBrl)}
          </p>
          <p className="mt-1 text-[11px] text-foreground/65">
            Valor estimado — contrato sob consulta via WhatsApp.
          </p>
        </div>
      )}
    </div>
  );
}
