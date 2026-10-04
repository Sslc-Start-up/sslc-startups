import { company } from "@/content/site";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { WhatsApp } from "@/components/ui/icons";
import { ParticleSphere } from "./particle-sphere";

/** Black CTA with a rotating particle sphere (Squarespace's closing section). */
export function CtaSection() {
  return (
    <section aria-labelledby="cta-title" className="force-dark relative overflow-hidden bg-bg py-28 lg:py-36">
      <div className="relative mx-auto grid aspect-square w-[min(92vw,640px)] place-items-center">
        <ParticleSphere className="absolute inset-0 size-full" />
        <div className="relative px-6 text-center">
          <h2 id="cta-title" className="text-[clamp(2rem,1.2rem+3vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.035em] text-fg">
            Have a product
            <br />
            in mind?
          </h2>
          <p className="mx-auto mt-5 max-w-xs text-[15px] text-white/80">You bring the idea. We bring the product engineering.</p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <InquiryLink variant="primary" size="lg">
              Start your project
            </InquiryLink>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              <WhatsApp size={15} className="text-[#25d366]" /> or talk to our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
