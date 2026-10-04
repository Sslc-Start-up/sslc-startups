import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/hero/hero";
import { ValueBand } from "@/components/band/value-band";
import { ServicesTabs } from "@/components/services/services-tabs";
import { TeamCards } from "@/components/process/team-cards";
import { AiSection } from "@/components/ai/ai-section";
import { WorkSection } from "@/components/case-studies/work-section";
import { FaqSection } from "@/components/faq/faq-section";
import { CtaSection } from "@/components/cta/cta-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { WhatsAppButton } from "@/components/assistant/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ValueBand />
        <ServicesTabs />
        <TeamCards />
        <AiSection />
        <WorkSection />
        <FaqSection />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
