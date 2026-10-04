import Image from "next/image";
import { company } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { CtaArrow } from "@/components/ui/button";
import { ArrowRight, WhatsApp } from "@/components/ui/icons";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-title" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[28px] px-6 py-16 text-center text-white shadow-[var(--shadow-float)] sm:px-12 lg:py-24">
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,#1f5bff_0%,#4f46ff_45%,#9b3dff_80%,#d23dff_100%)]" />
          <div aria-hidden className="absolute inset-0 grid-texture opacity-40 [--grid-line:rgb(255_255_255/0.1)]" />
          <div aria-hidden className="aurora opacity-70 mix-blend-screen" />
          <div aria-hidden className="absolute top-8 left-1/2 -translate-x-1/2 [perspective:900px]">
            <Image
              src="/brand/sslc-mark.png"
              alt=""
              width={256}
              height={256}
              className="size-16 animate-[spin-y_9s_linear_infinite] drop-shadow-[0_10px_30px_rgb(0_0_0/0.35)] [transform-style:preserve-3d] sm:size-20"
            />
          </div>

          <div className="relative mx-auto max-w-3xl pt-16 sm:pt-20">
            <h2
              id="cta-title"
              className="text-[clamp(2.1rem,1.2rem+3.4vw,4rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
            >
              Have a product in mind?
              <br />
              We&apos;re ready to build it.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lede text-white/85">
              You bring the idea. We bring the product engineering — from first sketch to production and beyond.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <InquiryLink
                unstyled
                className="group/btn inline-flex h-12 items-center gap-2.5 rounded-xl bg-white px-6 text-[15px] font-semibold text-[#1d1a4a] shadow-[0_12px_30px_-10px_rgb(0_0_0/0.4)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get a Free Quote
                <CtaArrow>
                  <ArrowRight size={16} />
                </CtaArrow>
              </InquiryLink>
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/40 bg-white/10 px-6 text-[15px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <WhatsApp size={17} /> Talk To Our Team
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
