"use client";

import { useEffect, useRef, useState } from "react";
import { architectureLayers, technologies } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const ramp = ["#19c4ff", "#2f8bff", "#3d6bff", "#5a4dff", "#7a3dff", "#a83dff", "#e03bff"];

const principles = [
  { title: "Security by default", detail: "Authentication, permissions and data protection designed in — not patched on." },
  { title: "Observable", detail: "Logs, metrics and alerts so problems are found before customers report them." },
  { title: "Documented & maintainable", detail: "Clean code and clear documentation, so your product never lives in one developer's head." },
];

export function ArchitectureSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const n = architectureLayers.length;

  // Auto-cycle through layers while the stack is on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting && !paused) {
        timer = setInterval(() => setActive((a) => (a + 1) % n), 2200);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [paused, n]);

  return (
    <section id="technology" aria-labelledby="architecture-title" className="section overflow-hidden border-t border-line bg-bg-1">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="slash" aria-hidden />
            <span className="text-subtle">04</span> Engineering
          </p>
          <h2 id="architecture-title" className="mt-6 text-headline font-semibold text-sheen">
            Built to scale. <span className="text-brand">Designed to last.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lede text-muted">
            Every SSLC product is built on a layered architecture: each part has one job, can be changed without breaking
            the rest, and scales independently as your business grows.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Isometric stack (bottom = cloud, top = frontend) */}
          <div ref={stageRef} aria-hidden className="relative mx-auto aspect-[1/0.86] w-full max-w-[540px] [perspective:1800px]">
            <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgb(138_61_255/0.22),transparent)]" />
            <div className="absolute inset-[18%] [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-42deg)]">
              {architectureLayers.map((layer, i) => {
                const isActive = i === active;
                const stackIndex = n - 1 - i;
                const z = stackIndex * 30 + (isActive ? 26 : 0);
                const color = ramp[stackIndex];
                return (
                  <div
                    key={layer.name}
                    className="absolute inset-0 rounded-2xl border transition-[transform,background,border-color,box-shadow] duration-700 ease-[var(--ease-out-expo)]"
                    style={{
                      transform: `translateZ(${z}px)`,
                      borderColor: isActive ? color : "var(--layer-idle-border)",
                      background: isActive
                        ? `linear-gradient(135deg, ${color}55, ${color}18)`
                        : "var(--layer-idle)",
                      boxShadow: isActive ? `0 0 60px -6px ${color}aa, inset 0 0 30px -10px ${color}` : "none",
                    }}
                  >
                    <span className="absolute inset-4 rounded-xl border border-dashed border-white/[0.06]" />
                    <span
                      className={cn(
                        "absolute bottom-3 left-4 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-500",
                        isActive ? "text-fg" : "text-fg/40",
                      )}
                    >
                      L{i + 1} · {layer.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Layer list */}
          <div onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
            <ol className="space-y-1.5" aria-label="Architecture layers">
              {architectureLayers.map((layer, i) => {
                const isActive = i === active;
                const color = ramp[n - 1 - i];
                return (
                  <li key={layer.name}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex w-full items-start gap-4 rounded-xl border px-4 py-3 text-left transition-[background-color,border-color] duration-500",
                        isActive ? "border-line-strong bg-surface-2" : "border-transparent hover:bg-white/[0.02]",
                      )}
                    >
                      <span
                        className="mt-1.5 size-2.5 shrink-0 rounded-full transition-shadow duration-500"
                        style={{ background: color, boxShadow: isActive ? `0 0 14px 2px ${color}` : "none" }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[15.5px] font-medium text-fg">{layer.name}</span>
                          <span className="flex gap-1.5">
                            {layer.tech.map((t) => (
                              <span key={t} className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10.5px] text-muted">
                                {t}
                              </span>
                            ))}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "grid text-[13.5px] leading-snug text-muted transition-[grid-template-rows,opacity,margin] duration-500",
                            isActive ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">{layer.detail}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ul className="grid gap-6 sm:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title}>
                <span aria-hidden className="block h-px w-8 bg-gradient-to-r from-cyan to-magenta" />
                <h3 className="mt-4 text-[15px] font-medium text-fg">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.detail}</p>
              </li>
            ))}
          </ul>
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Our core stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {technologies.map((t) => (
                <li key={t} className="pill font-mono text-[12px]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
