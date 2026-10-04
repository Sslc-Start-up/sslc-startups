import { company } from "@/content/site";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { WhatsApp } from "@/components/ui/icons";
import { HeroScene } from "./hero-scene";
import { HeroScreens } from "./hero-screens";
import { Tagline } from "./tagline";

/**
 * Squarespace-style cinematic hero: always dark, centered editorial headline,
 * the 3D SSLC mark as the backdrop and product screens fanned across the base.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="force-dark relative isolate overflow-hidden bg-bg">
      {/* 3D backdrop */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[78svh] opacity-55 sm:h-[86svh]">
        <HeroScene centered forceDark />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_38%,rgb(0_0_0/0.55),transparent_75%)]" />

      <div className="container-x relative pt-32 text-center sm:pt-36 lg:pt-36">
        <p className="animate-rise font-mono text-[11.5px] tracking-[0.24em] text-muted uppercase">Software product engineering</p>
        <h1
          id="hero-title"
          className="mx-auto mt-6 max-w-[14ch] text-[clamp(2.75rem,1.2rem+5vw,5.4rem)] leading-[0.98] font-medium tracking-[-0.045em] text-fg"
        >
          <span className="block animate-slide-up">We build software</span>
          <span className="block animate-slide-up [animation-delay:90ms]">that moves business</span>
          <span className="block animate-slide-up text-brand [animation-delay:180ms]">forward.</span>
        </h1>

        <div className="animate-rise [animation-delay:320ms]">
          <Tagline className="mt-7 text-white/85" />
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <InquiryLink variant="primary" size="lg" className="w-full sm:w-auto">
              Start a project
            </InquiryLink>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-[3px] border border-white/25 px-8 text-[13.5px] font-medium tracking-[0.06em] text-white uppercase transition-colors hover:border-white hover:bg-white/5 sm:w-auto"
            >
              <WhatsApp size={17} className="text-[#25d366]" /> Chat on WhatsApp
            </a>
          </div>
          <p className="mt-5 text-[14px] text-white/70">
            Free consultation ·{" "}
            <a href={`mailto:${company.email}`} className="underline-offset-4 hover:text-white hover:underline">
              {company.email}
            </a>
          </p>
        </div>
      </div>

      <HeroScreens />
    </section>
  );
}
