"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const lineA = "We don't just build websites.".split(" ");
const lineB = "We engineer products.".split(" ");
const total = lineA.length + lineB.length;

function Word({ word, index, progress, accent }: { word: string; index: number; progress: MotionValue<number>; accent?: boolean }) {
  const start = index / total;
  const opacity = useTransform(progress, [start * 0.8, (start + 1 / total) * 0.8], [0.14, 1]);
  const reduce = useReducedMotion();
  return (
    <m.span style={reduce ? undefined : { opacity }} className={accent ? "text-brand" : "text-fg"}>
      {word}{" "}
    </m.span>
  );
}

export function StatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });

  return (
    <section aria-label="Our approach" className="section overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-[60%] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgb(118_80_255/0.08),transparent)]" />
      <div ref={ref} className="container-x relative">
        <p className="eyebrow">
          <span className="slash" aria-hidden />
          <span className="text-subtle">03</span> Our approach
        </p>

        <h2 className="mt-8 text-[clamp(2.5rem,1rem+6.4vw,7.5rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
          <span className="block">
            {lineA.map((w, i) => (
              <Word key={`a-${i}`} word={w} index={i} progress={scrollYProgress} />
            ))}
          </span>
          <span className="block">
            {lineB.map((w, i) => (
              <Word key={`b-${i}`} word={w} index={lineA.length + i} progress={scrollYProgress} accent />
            ))}
          </span>
        </h2>

        <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-[1fr_1.4fr] lg:mt-20">
          <p className="text-title font-medium text-fg">A website can launch.</p>
          <p className="max-w-2xl text-lede text-muted">
            A product needs architecture, reliability, security, performance — and a team that understands what happens
            after launch: the support tickets, the new integrations, the ten-thousandth user. That&apos;s the work we do.
          </p>
        </div>
      </div>
    </section>
  );
}
