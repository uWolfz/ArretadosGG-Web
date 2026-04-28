import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta, SiteFooter } from "@/app/(marketing)/_components";
import {
  CASES,
  getCaseBySlug,
  getNextCase,
} from "@/app/(marketing)/_data/cases";
import {
  CaseDetailHero,
  CaseGallery,
  CaseNarrative,
  CaseNextLink,
  CaseScopeDetail,
} from "../_components";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/cases/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const data = getCaseBySlug(slug);
  if (!data) return {};
  return {
    title: `${data.client} — ${data.title} · Arretados`,
    description: data.summary,
  };
}

export default async function CaseDetailPage(
  props: PageProps<"/cases/[slug]">,
) {
  const { slug } = await props.params;
  const data = getCaseBySlug(slug);
  if (!data) notFound();

  const next = getNextCase(slug);

  return (
    <>
      <CaseDetailHero data={data} totalCases={CASES.length} />
      <CaseNarrative narrative={data.narrative} accent={data.accent} />
      <CaseScopeDetail scopeDetail={data.scopeDetail} accent={data.accent} />
      <CaseGallery gallery={data.gallery} accent={data.accent} />
      {next ? <CaseNextLink next={next} /> : null}
      <FinalCta />
      <SiteFooter />
    </>
  );
}
