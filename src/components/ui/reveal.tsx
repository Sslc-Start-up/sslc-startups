"use client";

import { m, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Fade-and-rise on first scroll into view. Reduced motion is handled by MotionConfig. */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </m.div>
  );
}

type RevealItemProps = HTMLMotionProps<"li"> & {
  delay?: number;
  y?: number;
};

/** List-item variant of Reveal, for staggered <ul>/<ol> children. */
export function RevealItem({ delay = 0, y = 24, children, ...props }: RevealItemProps) {
  return (
    <m.li
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </m.li>
  );
}
