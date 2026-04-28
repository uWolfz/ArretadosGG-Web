import type { Caster } from "@/app/(app)/_data/casters";
import { EmptyState } from "@/app/(app)/_components";
import { CasterReviewItem } from "./components/caster-review-item";

type CasterReviewsSectionProps = {
  casterReviews: Caster;
};

export function CasterReviewsSection({
  casterReviews,
}: CasterReviewsSectionProps) {
  if (casterReviews.reviews.length === 0) {
    return (
      <EmptyState
        title="Ainda sem comentários"
        hint="Players e casters podem deixar feedback público."
      />
    );
  }

  return (
    <ul className="space-y-3">
      {casterReviews.reviews.map((review) => (
        <CasterReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
