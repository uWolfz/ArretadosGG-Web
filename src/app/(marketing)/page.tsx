import {
  CasesSection,
  FaqSection,
  FinalCta,
  Hero,
  ProcessSection,
  ServicesSection,
  SiteFooter,
  StatsBar,
  TestimonialSection,
} from "./_components";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <ProcessSection />
      <CasesSection />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
      <SiteFooter />
    </>
  );
}
