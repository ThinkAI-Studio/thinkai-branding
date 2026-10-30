"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import "./skills-stack.css";

gsap.registerPlugin(ScrollTrigger);

interface LenisEmitter {
  on: (event: string, cb: () => void) => void;
  off: (event: string, cb: () => void) => void;
  scrollTo: (target: number, opts?: { duration?: number }) => void;
}

function getLenis(): LenisEmitter | undefined {
  if (typeof window === "undefined") return undefined;
  const win = window as unknown as Record<string, unknown>;
  const c = win.__lenis;
  if (c && typeof c === "object" && "on" in c && "scrollTo" in c) {
    return c as LenisEmitter;
  }
  return undefined;
}

/* 3D Flip letter component for "MODERN TECH STACK" */
function FlipWord({ word, delayOffset = 0 }: { word: string; delayOffset?: number }) {
  const letters = Array.from(word);
  return (
    <span className="inline-block whitespace-nowrap overflow-visible">
      {letters.map((char, i) => (
        <span
          key={i}
          className="flip-char inline-block will-change-transform"
          data-delay={delayOffset + i * 0.03}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function SkillsGrid() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [currentStackIdx, setCurrentStackIdx] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stackContainersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !stageRef.current) return;

    const lenis = getLenis();
    const handleLenisScroll = () => ScrollTrigger.update();
    if (lenis?.on) lenis.on("scroll", handleLenisScroll);

    const ctx = gsap.context(() => {
      // 1. Flip letters effect on "MODERN TECH STACK" when scrolled into view
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll<HTMLSpanElement>(".flip-char");
        gsap.set(chars, {
          transformPerspective: 800,
          rotateX: -90,
          y: 36,
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            chars.forEach((char) => {
              const delay = parseFloat(char.dataset.delay || "0");
              gsap.to(char, {
                rotateX: 0,
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay,
                ease: "back.out(1.7)",
              });
            });
          },
        });
      }

      // 2. Discrete Notch Progression: Staggered entry from right + steady hold + snap to prevent half-scroll
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const stacks = stackContainersRef.current.filter(Boolean) as HTMLDivElement[];
        if (stacks.length < 3) return;

        const s1Blocks = stacks[0].querySelectorAll(".bento-block");
        const s2Blocks = stacks[1].querySelectorAll(".bento-block");
        const s3Blocks = stacks[2].querySelectorAll(".bento-block");

        // Initial setup:
        // Stack 1 blocks are at x: 80, opacity: 0 ready to stagger in
        gsap.set(stacks[0], { opacity: 1, pointerEvents: "auto" });
        gsap.set(s1Blocks, { x: 80, opacity: 0 });

        // Stacks 2 & 3 initially hidden
        gsap.set(stacks[1], { opacity: 0, pointerEvents: "none" });
        gsap.set(s2Blocks, { x: 80, opacity: 0 });

        gsap.set(stacks[2], { opacity: 0, pointerEvents: "none" });
        gsap.set(s3Blocks, { x: 80, opacity: 0 });

        // Discrete Timeline with generous HOLD zones so cards are always 100% steady & clear
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stageRef.current,
            scrub: 0.3,
            anticipatePin: 1,
            snap: {
              snapTo: [0.15, 0.55, 0.95],
              duration: { min: 0.2, max: 0.35 },
              ease: "power2.out",
            },
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.35) {
                setCurrentStackIdx(0);
              } else if (p < 0.75) {
                setCurrentStackIdx(1);
              } else {
                setCurrentStackIdx(2);
              }
            },
            invalidateOnRefresh: true,
          },
        });

        // ─── NOTCH 1 (Stack 1: Web Architecture) ───
        // Entry: Blocks run in sequentially from right
        tl.to(
          s1Blocks,
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.05
        );
        // Generous HOLD ZONE (0.55 to 1.8) -> All blocks remain 100% visible and crystal clear!

        // ─── TRANSITION 1 -> 2 (Quick transition, no floating halfway) ───
        tl.to(
          s1Blocks,
          {
            x: -70,
            opacity: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.in",
          },
          1.8
        );
        tl.set(stacks[0], { pointerEvents: "none", opacity: 0 }, 2.2);
        tl.set(stacks[1], { pointerEvents: "auto", opacity: 1 }, 2.2);

        // ─── NOTCH 2 (Stack 2: DevOps & Infrastructure) ───
        // Entry: Blocks run in sequentially from right
        tl.to(
          s2Blocks,
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          2.2
        );
        // Generous HOLD ZONE (2.7 to 4.0) -> All blocks remain 100% visible and crystal clear!

        // ─── TRANSITION 2 -> 3 (Quick transition) ───
        tl.to(
          s2Blocks,
          {
            x: -70,
            opacity: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.in",
          },
          4.0
        );
        tl.set(stacks[1], { pointerEvents: "none", opacity: 0 }, 4.4);
        tl.set(stacks[2], { pointerEvents: "auto", opacity: 1 }, 4.4);

        // ─── NOTCH 3 (Stack 3: Designer & Systems) ───
        // Entry: Blocks run in sequentially from right
        tl.to(
          s3Blocks,
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          4.4
        );
        // Generous HOLD ZONE (4.9 to 6.2) -> All blocks remain 100% visible and crystal clear!
      });
    }, sectionRef);

    return () => {
      if (lenis?.off) lenis.off("scroll", handleLenisScroll);
      ctx.revert();
    };
  }, [prefersReduced]);

  const handleNotchClick = (notchIdx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const snapRatios = [0.15, 0.55, 0.95];
    const targetY = sectionStart + snapRatios[notchIdx] * scrollableDistance;

    const lenis = getLenis();
    if (lenis?.scrollTo) {
      lenis.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const stackLabels = [
    { id: 0, code: "01", category: "WEB", name: "WEB ARCHITECTURE" },
    { id: 1, code: "02", category: "DEVOPS", name: "DEVOPS & INFRASTRUCTURE" },
    { id: 2, code: "03", category: "DESIGNER", name: "DESIGNER & CRAFT" },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className={
        prefersReduced
          ? "relative z-20 bg-[#040406] py-24 sm:py-32 border-t border-white/[0.08] overflow-x-clip"
          : "relative z-20 bg-[#040406] text-white border-t border-white/[0.08] overflow-x-clip md:h-[260vh]"
      }
    >
      {prefersReduced ? (
        /* Reduced Motion: Static Accessible View containing all 17 skills across WEB, DEVOPS, DESIGNER */
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 space-y-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 id="skills-heading" className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans">
              MODERN TECH STACK
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400">
              {language === "vi" ? "Kiến trúc tinh gọn, kiểm chứng thực tế." : "Zero unnecessary abstraction, verified in production."}
            </p>
          </div>

          {/* Web Chapter */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2">
              01 / WEB
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">React 19</h3>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Next.js 16</h3>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">TypeScript</h3>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Tailwind CSS v4</h4>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">GSAP + Motion</h4>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Three.js / GLSL</h4>
              </div>
            </div>
          </div>

          {/* DevOps Chapter */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2">
              02 / DEVOPS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Kubernetes & K3s</h3>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Docker & Podman</h3>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Linux</h4>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Go</h4>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Tailscale + SAST</h4>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">GitHub Actions + Argo CD</h4>
              </div>
            </div>
          </div>

          {/* Designer Chapter */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2">
              03 / DESIGNER
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Design Systems & Tokens</h3>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Figma</h4>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h5 className="text-base font-bold text-white">Typography & Art Direction</h5>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h5 className="text-base font-bold text-white">Motion Design</h5>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5">
                <h5 className="text-base font-bold text-white">Prototyping</h5>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ========================================================
              DESKTOP PINNED STAGE (>=768px): Pinned Discrete Notch Stacks
             ======================================================== */}
          <div
            ref={stageRef}
            className="hidden md:flex relative w-full h-screen flex-col justify-between px-6 lg:px-12 py-8 max-w-[1720px] mx-auto overflow-hidden pointer-events-auto"
          >
            {/* Flipping Headline & Notch Tracker */}
            <div className="w-full flex flex-col items-center text-center select-none pt-1">
              <h2
                id="skills-heading"
                ref={titleRef}
                className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase font-sans leading-[0.92] flex flex-col items-center"
              >
                <div className="flex gap-3 overflow-visible">
                  <FlipWord word="MODERN" delayOffset={0} />
                </div>
                <div className="flex gap-3 overflow-visible">
                  <FlipWord word="TECH" delayOffset={0.2} />
                  <span className="w-3" />
                  <FlipWord word="STACK" delayOffset={0.34} />
                </div>
              </h2>

              {/* Discrete Notch Indicator Tabs */}
              <div className="flex items-center gap-3 pt-4">
                {stackLabels.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleNotchClick(st.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border",
                      currentStackIdx === st.id
                        ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.4)] font-bold scale-105"
                        : "bg-white/[0.04] text-neutral-400 border-white/[0.1] hover:text-white hover:border-white/20"
                    )}
                  >
                    <span>{st.code}</span>
                    <span className="mx-1 opacity-50">/</span>
                    <span>{st.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliding Bento Stacks Area */}
            <div className="relative w-full flex-1 my-3 flex items-center justify-center min-h-[430px]">
              {/* STACK 1: WEB (Frontend & Architecture) */}
              <div
                ref={(el) => {
                  stackContainersRef.current[0] = el;
                }}
                className="w-full max-w-[1380px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>01 / WEB ARCHITECTURE</span>
                  </span>
                  <span className="text-white">REACT · NEXT.JS · TS</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5">
                  {/* Hero React 19 Box: Crisp Solid Dark Surface */}
                  <div className="bento-block col-span-5 rounded-2xl bg-[#0e0e14] border border-white/[0.14] p-7 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-white">
                        CORE UI
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">v19.2</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-16 h-16 flex items-center justify-center text-white [filter:brightness(0)_invert(1)] group-hover:rotate-180 transition-transform duration-700">
                        <TechLogo name="React" className="w-16 h-16" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/[0.08]">
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">React 19</h3>
                        <p className="text-xs text-neutral-300 font-sans mt-0.5">Server Components & Actions</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-white uppercase">Production</span>
                    </div>
                  </div>

                  {/* Center Dark Box: Next.js 16 */}
                  <div className="bento-block col-span-4 rounded-2xl bg-[#0e0e14] border border-white/[0.14] p-7 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        FRAMEWORK
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">App Router</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="text-4xl font-black tracking-tighter text-white flex items-center gap-1 [filter:brightness(0)_invert(1)]">
                        <span>NEXT</span>
                        <span className="text-neutral-400 text-3xl">.js</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/[0.08]">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">Next.js 16</h3>
                        <p className="text-xs text-neutral-300 font-sans mt-0.5">Turbopack & Static Generation</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-400">SSR / SSG</span>
                    </div>
                  </div>

                  {/* Right Dark Box: TypeScript */}
                  <div className="bento-block col-span-3 rounded-2xl bg-[#0e0e14] border border-white/[0.14] p-7 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        TYPING
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">v5.9</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-14 h-14 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-white font-mono text-2xl font-black shadow-md">
                        TS
                      </div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/[0.08]">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">TypeScript</h3>
                        <p className="text-xs text-neutral-300 font-sans mt-0.5">Strict Type Inference</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-400">Strict</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: 3 Wide Heading Cells for Web Skills */}
                <div className="grid grid-cols-3 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex items-center justify-between hover:border-white/20 transition-all">
                    <div>
                      <span className="text-[9.5px] font-mono font-bold text-neutral-400 uppercase">CSS ENGINE</span>
                      <h4 className="text-base font-bold text-white tracking-tight">Tailwind CSS v4</h4>
                      <p className="text-[11.5px] text-neutral-300 font-sans">@theme Tokens</p>
                    </div>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)]">
                      <TechLogo name="Tailwind CSS v4" className="w-5 h-5 object-contain" />
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex items-center justify-between hover:border-white/20 transition-all">
                    <div>
                      <span className="text-[9.5px] font-mono font-bold text-neutral-400 uppercase">MOTION PHYSICS</span>
                      <h4 className="text-base font-bold text-white tracking-tight">GSAP + Motion</h4>
                      <p className="text-[11.5px] text-neutral-300 font-sans">ScrollTrigger & Springs</p>
                    </div>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)]">
                      <TechLogo name="GSAP" className="w-5 h-5 object-contain" />
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex items-center justify-between hover:border-white/20 transition-all">
                    <div>
                      <span className="text-[9.5px] font-mono font-bold text-neutral-400 uppercase">3D RENDERING</span>
                      <h4 className="text-base font-bold text-white tracking-tight">Three.js / GLSL</h4>
                      <p className="text-[11.5px] text-neutral-300 font-sans">Procedural Shaders</p>
                    </div>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)]">
                      <TechLogo name="Three.js WebGL" className="w-5 h-5 object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* STACK 2: DEVOPS & INFRASTRUCTURE */}
              <div
                ref={(el) => {
                  stackContainersRef.current[1] = el;
                }}
                className="w-full max-w-[1380px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>02 / DEVOPS & INFRASTRUCTURE</span>
                  </span>
                  <span className="text-white">K3S · PODMAN · GOLANG</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5">
                  <div className="bento-block col-span-7 rounded-2xl bg-[#0e0e14] border border-white/[0.14] p-7 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        ORCHESTRATION
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">Two-Pod K3s</span>
                    </div>
                    <div className="flex items-center gap-5 py-3">
                      <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 text-white [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Kubernetes & K3s" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">Kubernetes & K3s</h3>
                        <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-0.5">
                          Production topology, Traefik ingress & declarative self-healing.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                      {["Traefik Ingress", "Declarative YAML", "Self-Healing"].map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bento-block col-span-5 rounded-2xl bg-[#0e0e14] border border-white/[0.14] p-7 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        CONTAINER
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">Daemonless</span>
                    </div>
                    <div className="flex items-center gap-4 py-3">
                      <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 text-white [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Docker & Podman" className="w-9 h-9 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">Docker & Podman</h3>
                        <p className="text-xs text-neutral-300 font-sans mt-0.5">Rootless namespaces & multi-stage OCI builds</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                      {["Rootless", "Quadlets", "OCI Standard"].map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: 4 Cells */}
                <div className="grid grid-cols-4 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[9.5px] font-mono font-bold text-neutral-400 uppercase">SYS BASELINE</span>
                      <div className="w-5 h-5 [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Linux" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Linux</h4>
                      <p className="text-xs text-neutral-300 font-sans mt-0.5">systemd unit isolation</p>
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[9.5px] font-mono font-bold text-neutral-400 uppercase">HIGH CONCURRENCY</span>
                      <div className="w-5 h-5 [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Go" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Go</h4>
                      <p className="text-xs text-neutral-300 font-sans mt-0.5">High-throughput goroutines</p>
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[9.5px] font-mono font-bold text-neutral-400 uppercase">SECURITY & MESH</span>
                      <div className="w-5 h-5 [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Tailscale" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Tailscale + SAST</h4>
                      <p className="text-xs text-neutral-300 font-sans mt-0.5">Zero-Trust WireGuard</p>
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[9.5px] font-mono font-bold text-neutral-400 uppercase">GITOPS CI/CD</span>
                      <div className="w-5 h-5 [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Argo CD" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">GitHub Actions + Argo CD</h4>
                      <p className="text-xs text-neutral-300 font-sans mt-0.5">Automated rollback</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STACK 3: DESIGNER */}
              <div
                ref={(el) => {
                  stackContainersRef.current[2] = el;
                }}
                className="w-full max-w-[1380px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>03 / DESIGNER & PRODUCT CRAFT</span>
                  </span>
                  <span className="text-white">TOKENS · FIGMA · EDITORIAL</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5">
                  <div className="bento-block col-span-6 rounded-2xl bg-[#0e0e14] border border-white/[0.14] p-7 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[280px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        DESIGN SYSTEM
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">tai-ui Specification</span>
                    </div>
                    <div className="space-y-3 py-4">
                      <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-3 text-white [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Design Systems" className="w-9 h-9 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">Design Systems & Tokens</h3>
                        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1">
                          10px precision token architecture, Obsidian dark palette, semantic variables, and CLI component distribution.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
                      {["10px Tokens", "Obsidian Depth", "Atomic Primitives", "Registry Standards"].map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 flex flex-col gap-3.5">
                    <div className="bento-block rounded-2xl bg-[#0e0e14] border border-white/[0.14] p-6 flex items-center justify-between shadow-lg hover:border-white/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2 text-white [filter:brightness(0)_invert(1)]">
                          <TechLogo name="Figma" className="w-7 h-7 object-contain" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white tracking-tight">Figma</h4>
                          <p className="text-xs text-neutral-300 font-sans">Component variants & auto-layout tokens</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded-md bg-white/10">
                        Mastery
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5 flex-1">
                      <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex flex-col justify-between hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[9.5px] font-mono text-neutral-400 uppercase">EDITORIAL</span>
                          <div className="w-4 h-4 [filter:brightness(0)_invert(1)]">
                            <TechLogo name="Typography" className="w-4 h-4 object-contain" />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">Typography & Art Direction</h5>
                          <p className="text-[11.5px] text-neutral-300 font-sans mt-0.5">Optical rhythm</p>
                        </div>
                      </div>

                      <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex flex-col justify-between hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[9.5px] font-mono text-neutral-400 uppercase">PHYSICS</span>
                          <div className="w-4 h-4 [filter:brightness(0)_invert(1)]">
                            <TechLogo name="Motion Design" className="w-4 h-4 object-contain" />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">Motion Design</h5>
                          <p className="text-[11.5px] text-neutral-300 font-sans mt-0.5">Spring curves</p>
                        </div>
                      </div>

                      <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-4 flex flex-col justify-between hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[9.5px] font-mono text-neutral-400 uppercase">HAPTIC</span>
                          <div className="w-4 h-4 [filter:brightness(0)_invert(1)]">
                            <TechLogo name="Prototyping" className="w-4 h-4 object-contain" />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">Prototyping</h5>
                          <p className="text-[11.5px] text-neutral-300 font-sans mt-0.5">Tactile latency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Footer Status */}
            <div className="w-full flex items-center justify-between gap-6 border-t border-white/[0.08] pt-3 text-[11px] font-mono text-neutral-400 select-none">
              <span className="flex items-center gap-6">
                <span>{language === "vi" ? "Cuộn để lướt qua các khối kỹ năng" : "Scroll to sweep through skill stacks"}</span>
                <span className="text-white flex items-center gap-2">
                  DISCRETE SNAP · 60FPS
                  <span aria-hidden="true" className="animate-bounce">↓</span>
                </span>
              </span>
              <span className="text-neutral-500">THINKAI STUDIO · BENTO MATRIX</span>
            </div>
          </div>

          {/* ========================================================
              MOBILE VIEW (<768px): Vertical Flow with All 17 Skills
             ======================================================== */}
          <div className="block md:hidden py-16 px-4 space-y-12">
            <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-white/[0.08]">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans leading-none">
                MODERN<br />TECH STACK
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                {language === "vi" ? "Kiến trúc tinh gọn, kiểm chứng thực tế." : "Zero unnecessary abstraction, verified in production."}
              </p>
            </div>

            {/* Stack 1 Mobile */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2 flex items-center justify-between">
                <span>01 / WEB</span>
                <span className="text-white">FRONTEND</span>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">React 19</h3>
                  <p className="text-xs text-neutral-300">Server Components</p>
                </div>
                <div className="w-10 h-10 [filter:brightness(0)_invert(1)]">
                  <TechLogo name="React" className="w-10 h-10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h3 className="text-base font-bold text-white">Next.js 16</h3>
                  <p className="text-xs text-neutral-300">App Router</p>
                </div>
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h3 className="text-base font-bold text-white">TypeScript</h3>
                  <p className="text-xs text-neutral-300">Strict Typing</p>
                </div>
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h4 className="text-base font-bold text-white">Tailwind CSS v4</h4>
                  <p className="text-xs text-neutral-300">@theme Tokens</p>
                </div>
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h4 className="text-base font-bold text-white">GSAP + Motion</h4>
                  <p className="text-xs text-neutral-300">Scroll & Springs</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                <h4 className="text-base font-bold text-white">Three.js / GLSL</h4>
                <p className="text-xs text-neutral-300">Procedural Shaders</p>
              </div>
            </div>

            {/* Stack 2 Mobile */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2 flex items-center justify-between">
                <span>02 / DEVOPS</span>
                <span className="text-white">INFRASTRUCTURE</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h3 className="text-base font-bold text-white">Kubernetes & K3s</h3>
                  <p className="text-xs text-neutral-300">Two-pod self-healing</p>
                </div>
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h3 className="text-base font-bold text-white">Docker & Podman</h3>
                  <p className="text-xs text-neutral-300">Rootless container</p>
                </div>
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h4 className="text-base font-bold text-white">Linux</h4>
                  <p className="text-xs text-neutral-300">systemd isolation</p>
                </div>
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h4 className="text-base font-bold text-white">Go</h4>
                  <p className="text-xs text-neutral-300">High throughput</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h4 className="text-base font-bold text-white">Tailscale + SAST</h4>
                  <p className="text-xs text-neutral-300">Zero-Trust mesh</p>
                </div>
                <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                  <h4 className="text-base font-bold text-white">GitHub Actions + Argo CD</h4>
                  <p className="text-xs text-neutral-300">GitOps sync</p>
                </div>
              </div>
            </div>

            {/* Stack 3 Mobile */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2 flex items-center justify-between">
                <span>03 / DESIGNER</span>
                <span className="text-white">SYSTEMS</span>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                <h3 className="text-base font-bold text-white">Design Systems & Tokens</h3>
                <p className="text-xs text-neutral-300">10px precision architecture</p>
              </div>
              <div className="rounded-xl bg-[#0e0e14] border border-white/10 p-4">
                <h4 className="text-base font-bold text-white">Figma</h4>
                <p className="text-xs text-neutral-300">Component variants</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-[#0e0e14] border border-white/10 p-3 text-center">
                  <h5 className="text-xs font-bold text-white">Typography & Art Direction</h5>
                </div>
                <div className="rounded-lg bg-[#0e0e14] border border-white/10 p-3 text-center">
                  <h5 className="text-xs font-bold text-white">Motion Design</h5>
                </div>
                <div className="rounded-lg bg-[#0e0e14] border border-white/10 p-3 text-center">
                  <h5 className="text-xs font-bold text-white">Prototyping</h5>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SkillsGrid;
