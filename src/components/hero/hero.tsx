import { HeroContact } from "./hero-contact";
import { HeroScene } from "./hero-scene";
import { Tagline } from "./tagline";

/**
 * Text entrance is pure CSS (transform-only on the headline) so it paints
 * immediately; the WebGL scene streams in behind it.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora" />
        <div className="absolute inset-0 grid-texture fade-mask-radial opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* 3D stage: right half on desktop, top band on mobile */}
      <div aria-hidden className="absolute inset-x-0 top-14 h-[48svh] sm:h-[54svh] lg:top-0 lg:left-[46%] lg:h-full">
        <HeroScene />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-end pt-[calc(48svh+3.5rem)] pb-16 sm:pt-[calc(54svh+3rem)] lg:justify-center lg:pt-32 lg:pb-28">
        <div className="max-w-[46rem]">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-3.5 py-1.5 text-[13px] font-medium text-fg/80 shadow-[var(--shadow-card)] backdrop-blur-sm animate-rise">
            <span className="slash !h-2 !w-2.5" aria-hidden />
            Software Product Engineering · AI · SaaS · Mobile
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.75rem,1rem+4.6vw,4.9rem)] leading-[0.98] font-semibold tracking-[-0.045em] lg:mt-8"
          >
            <span className="block animate-slide-up text-sheen">We Build Software</span>
            <span className="block animate-slide-up text-sheen [animation-delay:90ms]">That Moves</span>
            <span className="block animate-slide-up text-brand [animation-delay:180ms]">Businesses Forward.</span>
          </h1>

          <div className="animate-rise [animation-delay:320ms]">
            <Tagline className="mt-7" />

            <p className="mt-6 max-w-[32rem] text-lede text-muted">
              From AI-powered products and SaaS platforms to mobile apps, enterprise systems and scalable backend
              infrastructure — we design, engineer and launch software built for real-world growth.
            </p>

            <div className="mt-9">
              <HeroContact />
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="packet-y [animation-duration:2.2s]" />
        </div>
      </div>
    </section>
  );
}
