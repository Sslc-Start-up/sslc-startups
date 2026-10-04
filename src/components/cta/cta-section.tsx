import Image from "next/image";
import { company } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { Magnetic } from "@/components/ui/magnetic";
import { CtaArrow, buttonClass } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line pt-56 pb-36 sm:pt-64 lg:pt-72 lg:pb-52">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora" />
        <div className="grid-floor" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent" />
        <div className="absolute top-[14%] left-1/2 -translate-x-1/2 [perspective:900px]">
          <div className="absolute inset-[-60%] rounded-full bg-[radial-gradient(closest-side,rgb(138_61_255/0.35),transparent)]" />
          <Image
            src="/brand/sslc-mark.png"
            alt=""
            width={256}
            height={256}
            className="relative size-28 animate-[spin-y_9s_linear_infinite] opacity-90 [transform-style:preserve-3d] sm:size-36"
          />
        </div>
      </div>

      <Reveal className="container-x relative text-center">
        <p className="eyebrow justify-center">
          <span className="slash" aria-hidden />
          Let&apos;s talk
        </p>
        <h2 id="cta-title" className="mt-8 text-[clamp(2.75rem,1rem+7vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-sheen">
          Have a product <br className="hidden sm:block" />
          in mind?
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lede text-muted">
          You bring the idea. <span className="text-fg">We bring the product engineering.</span>
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <InquiryLink variant="primary" size="lg">
              Start Your Project
              <CtaArrow>
                <ArrowRight size={16} />
              </CtaArrow>
            </InquiryLink>
          </Magnetic>
          <a href={`mailto:${company.email}`} className={buttonClass("secondary", "lg")}>
            Talk To Our Team
          </a>
        </div>
      </Reveal>
    </section>
  );
}
