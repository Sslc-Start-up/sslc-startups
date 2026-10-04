import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/hero/hero";
import { TrustStrip } from "@/components/hero/trust-strip";
import { ProblemSection } from "@/components/problem/problem-section";
import { ServicesSection } from "@/components/services/services-section";
import { StatementSection } from "@/components/statement/statement-section";
import { ArchitectureSection } from "@/components/architecture/architecture-section";
import { WorkSection } from "@/components/case-studies/work-section";
import { AiSection } from "@/components/ai/ai-section";
import { EcosystemSection } from "@/components/ecosystem/ecosystem-section";
import { ProcessSection } from "@/components/process/process-section";
import { WhySection } from "@/components/why/why-section";
import { CtaSection } from "@/components/cta/cta-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { ProjectAssistant } from "@/components/assistant/project-assistant";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <ServicesSection />
        <StatementSection />
        <ArchitectureSection />
        <WorkSection />
        <AiSection />
        <EcosystemSection />
        <ProcessSection />
        <WhySection />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ProjectAssistant />
    </>
  );
}
