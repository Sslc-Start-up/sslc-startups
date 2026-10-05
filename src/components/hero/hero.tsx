import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { buttonClass, CtaArrow } from "@/components/ui/button";
import { ArrowRight, Bot, Cloud, Code, Cube, Gauge, InfinityLoop, Layers, Palette, Smartphone } from "@/components/ui/icons";
import { Globe } from "./globe";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

/** Service chips orbiting the globe — positions are % of the stage. */
const chips: { label: string; icon: Icon; pos: string; tint: string; delay: string }[] = [
  { label: "Web Development", icon: Code, pos: "top-[7%] left-[8%]", tint: "text-[#c084fc]", delay: "0s" },
  { label: "Mobile Apps", icon: Smartphone, pos: "top-[14%] right-[2%]", tint: "text-[#f0abfc]", delay: "1.2s" },
  { label: "Cloud & DevOps", icon: Cloud, pos: "top-[43%] left-[0%]", tint: "text-[#a5b4fc]", delay: "0.6s" },
  { label: "AI & Automation", icon: Bot, pos: "top-[43%] right-[-4%]", tint: "text-[#e9d5ff]", delay: "1.8s" },
  { label: "Custom Software", icon: Cube, pos: "bottom-[15%] left-[12%]", tint: "text-[#c4b5fd]", delay: "0.9s" },
  { label: "UI/UX & Product Design", icon: Palette, pos: "bottom-[10%] right-[0%]", tint: "text-[#f5d0fe]", delay: "1.5s" },
];

const features: { title: string; sub: string; icon: Icon }[] = [
  { title: "Fast Delivery", sub: "Milestone sprints", icon: Gauge },
  { title: "Scalable Architecture", sub: "Built for Growth", icon: Layers },
  { title: "End-to-End Support", sub: "From Idea to Scale", icon: InfinityLoop },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="force-dark relative isolate overflow-hidden bg-[#05030f]">
      {/* backdrop: stars, light streak, glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="stars absolute inset-0 opacity-70" />
        <div className="absolute top-[38%] -left-[15%] h-[2px] w-[70%] rotate-[-14deg] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent opacity-80 blur-[1px]" />
        <div className="absolute top-[30%] -left-[20%] h-[220px] w-[75%] rotate-[-14deg] bg-[radial-gradient(closest-side,rgb(147_51_234/0.35),transparent)]" />
        <div className="absolute top-[5%] right-[5%] h-[700px] w-[700px] bg-[radial-gradient(closest-side,rgb(79_70_229/0.28),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#05030f]" />
      </div>

      <div className="container-x grid items-center gap-10 pt-28 pb-16 lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-4 lg:pt-24 lg:pb-12">
        {/* copy */}
        <div>
          <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1.5 text-[13px] text-white/85">
            <span className="size-2 rounded-full bg-cyan shadow-[0_0_10px_2px_rgb(25_196_255/0.7)]" />
            AI · Software · Scalable Solutions
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.4rem,1rem+3vw,3.55rem)] leading-[1.04] font-bold tracking-[-0.035em] text-white"
          >
            <span className="block animate-slide-up">We build software</span>
            <span className="block animate-slide-up [animation-delay:90ms]">that moves business</span>
            <span className="block animate-slide-up [animation-delay:180ms]">
              <span className="text-brand">forward.</span>
              <span aria-hidden className="caret-bar text-white/80" />
            </span>
          </h1>
          <p className="mt-6 max-w-[30rem] animate-rise text-[17px] leading-relaxed text-white/75 [animation-delay:280ms]">
            From idea to impact — we design, develop and deploy modern digital solutions that help businesses grow
            faster, smarter and stronger.
          </p>

          <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <InquiryLink variant="primary" size="lg" className="bg-white text-[#14102e]">
              Start a Project
              <CtaArrow>
                <ArrowRight size={16} />
              </CtaArrow>
            </InquiryLink>
            <a href="#work" className={buttonClass("secondary", "lg")}>
              See Our Work
            </a>
          </div>

          <ul className="mt-10 flex animate-rise flex-col gap-5 [animation-delay:440ms] sm:flex-row sm:flex-wrap sm:gap-x-5">
            {features.map(({ title, sub, icon: I }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-violet/30 bg-violet/10 text-[#c4b5fd]">
                  <I size={19} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13.5px] font-medium whitespace-nowrap text-white">{title}</span>
                  <span className="block text-[12px] text-white/60">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* globe stage */}
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[720px] lg:-mr-6 animate-fade [animation-delay:200ms]">
          {/* orbit rings */}
          <svg viewBox="0 0 600 600" className="absolute inset-0 size-full overflow-visible">
            <defs>
              <linearGradient id="orbit-a" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#22d3ee" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="1" stopColor="#e879f9" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {[
              { rx: 290, ry: 96, rot: -18, dur: "9s" },
              { rx: 270, ry: 120, rot: 24, dur: "12s" },
              { rx: 250, ry: 70, rot: 62, dur: "15s" },
            ].map((o, i) => {
              const d = `M ${300 - o.rx} 300 a ${o.rx} ${o.ry} 0 1 0 ${o.rx * 2} 0 a ${o.rx} ${o.ry} 0 1 0 ${-o.rx * 2} 0`;
              return (
                <g key={i} transform={`rotate(${o.rot} 300 300)`}>
                  <path d={d} fill="none" stroke="url(#orbit-a)" strokeWidth="1.2" />
                  <circle r="3.5" fill="#f5d0fe" opacity="0">
                    <animateMotion dur={o.dur} repeatCount="indefinite" path={d} />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={o.dur} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-[13%] rounded-full shadow-[0_0_120px_20px_rgb(99_102_241/0.35)]" />
          <Globe className="absolute inset-[11%] size-[78%]" />

          {/* the SSLC mark */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative animate-[float-y_6s_ease-in-out_infinite]">
              <div className="absolute inset-[-35%] rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.5),transparent)]" />
              <Image
                src="/brand/sslc-mark.png"
                alt=""
                width={256}
                height={256}
                priority
                className="relative size-28 drop-shadow-[0_10px_40px_rgb(168_85_247/0.7)] sm:size-36"
              />
            </div>
          </div>

          {/* service chips */}
          {chips.map(({ label, icon: I, pos, tint, delay }) => (
            <div
              key={label}
              className={`absolute ${pos} hidden animate-[float-y_7s_ease-in-out_infinite] items-center gap-2.5 rounded-full border border-white/12 bg-[#0d0a24]/70 py-2.5 pr-4 pl-3.5 text-[13.5px] text-white/90 shadow-[0_8px_30px_-10px_rgb(0_0_0/0.8)] backdrop-blur-md sm:flex`}
              style={{ animationDelay: delay }}
            >
              <I size={18} className={tint} />
              {label}
            </div>
          ))}

          {/* handwritten note */}
          <div className="absolute top-[12%] -right-[16%] hidden rotate-[-12deg] text-right font-[family-name:var(--font-hand)] text-[22px] leading-[1.15] text-white/55 xl:block">
            Ideas
            <br />
            Technology
            <br />
            People
            <br />
            Growth
            <svg viewBox="0 0 60 60" className="mt-1 ml-auto size-12 rotate-[30deg] text-white/45" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M50 4C48 26 34 44 10 52" />
              <path d="M10 52l10-1M10 52l4-9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
