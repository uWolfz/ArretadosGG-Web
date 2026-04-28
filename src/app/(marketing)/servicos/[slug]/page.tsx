import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta, SiteFooter } from "@/app/(marketing)/_components";
import { CASES } from "@/app/(marketing)/_data/cases";
import {
  SERVICES,
  getServiceBySlug,
} from "@/app/(marketing)/_data/services";
import {
  ServiceDeliverables,
  ServiceHero,
  ServiceMethodology,
  ServiceRelatedCases,
} from "../_components";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/servicos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const data = getServiceBySlug(slug);
  if (!data) return {};
  return {
    title: `${data.label} · Arretados`,
    description: data.shortDescription,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/servicos/[slug]">,
) {
  const { slug } = await props.params;
  const data = getServiceBySlug(slug);
  if (!data) notFound();

  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);
  const relatedCases = data.relatedCaseSlugs
    .map((caseSlug) => CASES.find((c) => c.slug === caseSlug))
    .filter((c): c is (typeof CASES)[number] => Boolean(c));

  return (
    <>
      <ServiceHero
        data={data}
        totalServices={SERVICES.length}
        serviceIndex={serviceIndex}
      />
      <ServiceDeliverables
        deliverables={data.deliverables}
        accent={data.accent}
      />
      <ServiceMethodology
        methodology={data.methodology}
        accent={data.accent}
      />
      <ServiceRelatedCases cases={relatedCases} accent={data.accent} />
      <FinalCta />
      <SiteFooter />
    </>
  );
}
