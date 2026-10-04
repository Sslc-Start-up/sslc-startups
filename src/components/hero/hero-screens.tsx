"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChatMock, DashboardMock, PhoneMock } from "@/components/mockups/mockups";

/** Three product screens fanned across the bottom of the hero, with gentle scroll parallax. */
export function HeroScreens() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yCenter = useTransform(scrollYProgress, [0, 1], [20, -90]);
  const ySide = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} aria-hidden className="relative mx-auto mt-12 h-[300px] max-w-[1200px] sm:mt-14 sm:h-[420px] lg:h-[460px]">
      <m.div
        style={reduce ? undefined : { y: ySide }}
        className="absolute top-16 left-[2%] hidden w-[26%] max-w-[300px] -rotate-6 md:block"
      >
        <ChatMock className="animate-rise [animation-delay:500ms]" />
      </m.div>

      <m.div
        style={reduce ? undefined : { y: yCenter }}
        className="absolute top-0 left-1/2 w-[92%] max-w-[720px] -translate-x-1/2 sm:w-[64%]"
      >
        <DashboardMock className="animate-rise [animation-delay:420ms]" />
      </m.div>

      <m.div
        style={reduce ? undefined : { y: ySide }}
        className="absolute top-10 right-[3%] hidden w-[17%] max-w-[210px] rotate-6 md:block"
      >
        <PhoneMock className="animate-rise [animation-delay:560ms]" />
      </m.div>

      {/* fade into the next (black) band */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
