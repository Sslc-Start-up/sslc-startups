import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/hero/hero";
import { ServicesOverview } from "@/components/services/services-overview";
import { WorkSection } from "@/components/case-studies/work-section";
import { TeamCards } from "@/components/process/team-cards";
import { AiSection } from "@/components/ai/ai-section";
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
        <ServicesOverview />
        <WorkSection />
        <TeamCards />
        <AiSection />
        <FaqSection />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
