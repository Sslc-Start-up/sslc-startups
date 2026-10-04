import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/hero/hero";
import { TrustStrip } from "@/components/hero/trust-strip";
import { ServicesGrid } from "@/components/services/services-grid";
import { WorkSection } from "@/components/case-studies/work-section";
import { AiSection } from "@/components/ai/ai-section";
import { ArchitectureSection } from "@/components/architecture/architecture-section";
import { ProcessSection } from "@/components/process/process-section";
import { WhySection } from "@/components/why/why-section";
import { EngagementSection } from "@/components/engagement/engagement-section";
import { CtaSection } from "@/components/cta/cta-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { ProjectAssistant } from "@/components/assistant/project-assistant";
import { WhatsAppButton } from "@/components/assistant/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <ServicesGrid />
        <WorkSection />
        <AiSection />
        <ArchitectureSection />
        <ProcessSection />
        <WhySection />
        <EngagementSection />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ProjectAssistant />
      <WhatsAppButton />
    </>
  );
}
