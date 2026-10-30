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
   const currentStackIdxRef = useRef<number>(0);
 
   const sectionRef = useRef<HTMLElement>(null);
   const stageRef = useRef<HTMLDivElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const stackContainersRef = useRef<(HTMLDivElement | null)[]>([]);
 
   useEffect(() => {
     if (prefersReduced || !sectionRef.current || !stageRef.current) return;

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
        gsap.set(stacks[0], { opacity: 1, pointerEvents: "auto" });
        gsap.set(s1Blocks, { x: 90, opacity: 0 });

        gsap.set(stacks[1], { opacity: 0, pointerEvents: "none" });
        gsap.set(s2Blocks, { x: 90, opacity: 0 });

        gsap.set(stacks[2], { opacity: 0, pointerEvents: "none" });
        gsap.set(s3Blocks, { x: 90, opacity: 0 });

        // Discrete Timeline with generous HOLD zones so cards are always 100% steady & clear
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stageRef.current,
             scrub: 0.15,
             onUpdate: (self) => {
               const p = self.progress;
               const nextIdx = p < 0.25 ? 0 : p < 0.55 ? 1 : 2;
               if (currentStackIdxRef.current !== nextIdx) {
                 currentStackIdxRef.current = nextIdx;
                 setCurrentStackIdx(nextIdx);
               }
             },
             invalidateOnRefresh: true,
          },
        });

        // ─── NOTCH 1 (Stack 1: Frontend - SoraLabs Layout) ───
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
        // HOLD ZONE (0.55 to 1.8) -> All blocks 100% steady & crisp

        // ─── TRANSITION 1 -> 2 (Quick clean transition) ───
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

        // ─── NOTCH 2 (Stack 2: Infrastructure & DevOps) ───
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
        // HOLD ZONE (2.7 to 4.0)

        // ─── TRANSITION 2 -> 3 ───
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

        // ─── NOTCH 3 (Stack 3: Designer & Spatial Craft) ───
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
        // Generous HOLD ZONE for Stack 3 (4.9 to 6.8)

        // ─── BUFFER ZONE (Khoảng đệm thoải mái trước khi xuống phần SHIP) ───
        tl.to(
          stacks[2],
          {
            opacity: 0.2,
            y: -24,
            duration: 0.6,
            ease: "power1.in",
          },
          6.8
        );
      });
    }, sectionRef);

     return () => {
       ctx.revert();
     };
  }, [prefersReduced]);

  const handleNotchClick = (notchIdx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const snapRatios = [0.10, 0.40, 0.70];
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
          : "relative z-20 bg-[#040406] text-white border-t border-white/[0.08] overflow-x-clip md:h-[300vh]"
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
              DESKTOP PINNED STAGE (>=768px): SoraLabs Minimalist Bento
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
                      "px-3.5 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border",
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

            {/* Sliding Bento Stacks Area (SoraLabs Pure Minimalist Grid) */}
            <div className="relative w-full flex-1 my-3 flex items-center justify-center min-h-[440px]">
              {/* STACK 1: WEB (Frontend Architecture - SoraLabs Reference) */}
              <div
                ref={(el) => {
                  stackContainersRef.current[0] = el;
                }}
                className="w-full max-w-[1380px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
                  <span>PROFESSIONAL AT</span>
                  <span className="text-white">01 / WEB ARCHITECTURE</span>
                </div>

                {/* Top Row: Hero White React Box + Centered Next.js Typography + Centered TS Square */}
                <div className="grid grid-cols-12 gap-3.5">
                  {/* Hero White React Box (Pure Logo Centered, SoraLabs style) */}
                  <div className="bento-block col-span-5 rounded-2xl bg-[#f4f4f6] p-8 flex items-center justify-center shadow-[0_24px_48px_rgba(0,0,0,0.6)] min-h-[230px]">
                    <h3 className="sr-only">React 19</h3>
                    <div className="w-24 h-24 flex items-center justify-center text-black [filter:brightness(0)] bento-inner-mark">
                      <TechLogo name="React" className="w-24 h-24 object-contain" />
                    </div>
                  </div>

                  {/* Center Dark Box: Bold Centered NEXT.js Typography */}
                  <div className="bento-block col-span-4 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-8 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">Next.js 16</h3>
                    <div className="text-5xl sm:text-6xl font-black tracking-tighter text-white flex items-center gap-1.5 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <span>NEXT</span>
                      <span className="text-neutral-500 text-4xl">.js</span>
                    </div>
                  </div>

                  {/* Right Dark Box: Centered TS Square Tile */}
                  <div className="bento-block col-span-3 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-8 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">TypeScript</h3>
                    <div className="w-20 h-20 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center text-white font-mono text-4xl font-black shadow-lg bento-inner-mark">
                      TS
                    </div>
                  </div>
                </div>

                {/* Bottom Row Ribbon: Pure Minimalist Logo Strip (SoraLabs Style) */}
                <div className="grid grid-cols-3 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center min-h-[90px]">
                    <h4 className="sr-only">Tailwind CSS v4</h4>
                    <div className="flex items-center gap-3 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Tailwind CSS v4" className="w-7 h-7 object-contain" />
                      <span className="font-mono text-sm font-bold tracking-wider text-white">TAILWIND</span>
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center min-h-[90px]">
                    <h4 className="sr-only">GSAP + Motion</h4>
                    <div className="flex items-center gap-2.5 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="GSAP" className="w-6 h-6 object-contain" />
                      <TechLogo name="Motion" className="w-5 h-5 object-contain" />
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white">GSAP + MOTION</span>
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center min-h-[90px]">
                    <h4 className="sr-only">Three.js / GLSL</h4>
                    <div className="flex items-center gap-3 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Three.js WebGL" className="w-7 h-7 object-contain" />
                      <span className="font-mono text-sm font-bold tracking-wider text-white">THREE.JS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STACK 2: DEVOPS & INFRASTRUCTURE (Different To-Nhỏ Structure) */}
              <div
                ref={(el) => {
                  stackContainersRef.current[1] = el;
                }}
                className="w-full max-w-[1380px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
                  <span>INFRASTRUCTURE AT</span>
                  <span className="text-white">02 / DEVOPS & SYSTEMS</span>
                </div>

                {/* Top Row: Wide 60% Kubernetes + 40% Docker/Podman */}
                <div className="grid grid-cols-12 gap-3.5">
                  {/* Pearl Anchor Card for DevOps: Kubernetes & K3s (Col-span 7) */}
                  <div className="bento-block col-span-7 rounded-2xl bg-[#f4f4f6] p-8 flex items-center justify-center gap-6 shadow-[0_24px_48px_rgba(0,0,0,0.6)] min-h-[230px]">
                    <h3 className="sr-only">Kubernetes & K3s</h3>
                    <div className="w-20 h-20 rounded-2xl bg-black/[0.06] border border-black/10 flex items-center justify-center p-4 text-black [filter:brightness(0)] bento-inner-mark">
                      <TechLogo name="Kubernetes & K3s" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black tracking-tight text-black">KUBERNETES</span>
                      <span className="text-xs font-mono font-bold text-neutral-600 tracking-wider">K3S LIGHTWEIGHT</span>
                    </div>
                  </div>

                  {/* Dark Card for Docker & Podman (Col-span 5) */}
                  <div className="bento-block col-span-5 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-8 flex items-center justify-center gap-5 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">Docker & Podman</h3>
                    <div className="h-16 px-4 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center gap-2.5 text-white [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Docker" className="w-8 h-8 object-contain" />
                      <TechLogo name="Podman" className="w-7 h-7 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold tracking-tight text-white">DOCKER &amp; PODMAN</span>
                      <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">ROOTLESS OCI CONTAINERS</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: 4 Clean Logo Cells */}
                <div className="grid grid-cols-4 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h4 className="sr-only">Linux</h4>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Linux" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">LINUX</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h4 className="sr-only">Go</h4>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Go" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">GOLANG</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center gap-2.5 min-h-[90px]">
                    <h4 className="sr-only">Tailscale + SAST</h4>
                    <div className="flex items-center gap-2 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Tailscale" className="w-5 h-5 object-contain" />
                      <TechLogo name="DevSecOps" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white tracking-wide">TAILSCALE + SAST</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center gap-2.5 min-h-[90px]">
                    <h4 className="sr-only">GitHub Actions + Argo CD</h4>
                    <div className="flex items-center gap-2 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="GitHub Actions" className="w-5 h-5 object-contain" />
                      <TechLogo name="Argo CD" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white tracking-wide">ACTIONS + ARGO</span>
                  </div>
                </div>
              </div>

              {/* STACK 3: DESIGNER (Different To-Nhỏ Structure) */}
              <div
                ref={(el) => {
                  stackContainersRef.current[2] = el;
                }}
                className="w-full max-w-[1380px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
                  <span>SPATIAL SYSTEMS AT</span>
                  <span className="text-white">03 / DESIGNER & SYSTEMS</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5">
                  {/* Left 50% Box: Design Systems Mark (Dark) */}
                  <div className="bento-block col-span-6 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-8 flex items-center justify-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">Design Systems & Tokens</h3>
                    <div className="w-18 h-18 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-4 text-white [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Design Systems" className="w-12 h-12 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black tracking-tight text-white">DESIGN SYSTEMS</span>
                      <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">10PX PRECISION TOKENS</span>
                    </div>
                  </div>

                  {/* Right 50% Box: Pearl Anchor Card for Designer: Figma */}
                  <div className="bento-block col-span-6 rounded-2xl bg-[#f4f4f6] p-8 flex items-center justify-center gap-6 shadow-[0_24px_48px_rgba(0,0,0,0.6)] min-h-[230px]">
                    <h4 className="sr-only">Figma</h4>
                    <div className="w-18 h-18 rounded-2xl bg-black/[0.06] border border-black/10 flex items-center justify-center p-4 text-black [filter:brightness(0)] bento-inner-mark">
                      <TechLogo name="Figma" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black tracking-tight text-black">FIGMA</span>
                      <span className="text-xs font-mono font-bold text-neutral-600 tracking-wider">COMPONENT VARIANTS</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: 3 Clean Cells */}
                <div className="grid grid-cols-3 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h5 className="sr-only">Typography & Art Direction</h5>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Typography" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">TYPOGRAPHY</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h5 className="sr-only">Motion Design</h5>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Motion Design" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">MOTION</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#0b0b10] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h5 className="sr-only">Prototyping</h5>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Prototyping" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">PROTOTYPING</span>
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
              <span className="text-neutral-500">THINKAI STUDIO · SORA BENTO</span>
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
              <div className="rounded-xl bg-[#f4f4f6] text-black p-6 flex items-center justify-center min-h-[140px]">
                <h3 className="sr-only">React 19</h3>
                <div className="w-16 h-16 [filter:brightness(0)]">
                  <TechLogo name="React" className="w-16 h-16 object-contain" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center">
                  <h3 className="sr-only">Next.js 16</h3>
                  <span className="font-mono text-lg font-black text-white">NEXT.JS</span>
                </div>
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center">
                  <h3 className="sr-only">TypeScript</h3>
                  <span className="font-mono text-lg font-black text-white">TS</span>
                </div>
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center">
                  <h4 className="sr-only">Tailwind CSS v4</h4>
                  <span className="font-mono text-xs font-bold text-white">TAILWIND</span>
                </div>
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center gap-2">
                  <h4 className="sr-only">GSAP + Motion</h4>
                  <TechLogo name="GSAP" className="w-4 h-4 object-contain" />
                  <TechLogo name="Motion" className="w-3.5 h-3.5 object-contain" />
                  <span className="font-mono text-xs font-bold text-white">GSAP + MOTION</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center">
                <h4 className="sr-only">Three.js / GLSL</h4>
                <span className="font-mono text-sm font-bold text-white">THREE.JS / GLSL</span>
              </div>
            </div>
            {/* Stack 2 Mobile */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2 flex items-center justify-between">
                <span>02 / DEVOPS</span>
                <span className="text-white">INFRASTRUCTURE</span>
              </div>
              {/* Stack 2 Pearl Anchor: Kubernetes & K3s */}
              <div className="rounded-xl bg-[#f4f4f6] text-black p-6 flex items-center justify-center gap-4 min-h-[140px]">
                <h3 className="sr-only">Kubernetes & K3s</h3>
                <div className="w-14 h-14 [filter:brightness(0)]">
                  <TechLogo name="Kubernetes & K3s" className="w-14 h-14 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-black">KUBERNETES</span>
                  <span className="text-xs font-mono font-bold text-neutral-600 tracking-wider">K3S LIGHTWEIGHT</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center gap-2">
                  <h3 className="sr-only">Docker & Podman</h3>
                  <TechLogo name="Docker" className="w-4 h-4 object-contain" />
                  <TechLogo name="Podman" className="w-4 h-4 object-contain" />
                  <span className="font-mono text-xs font-bold text-white">DOCKER &amp; PODMAN</span>
                </div>
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center">
                  <h4 className="sr-only">Linux</h4>
                  <span className="font-mono text-sm font-bold text-white">LINUX</span>
                </div>
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center">
                  <h4 className="sr-only">Go</h4>
                  <span className="font-mono text-sm font-bold text-white">GOLANG</span>
                </div>
                <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center gap-1.5">
                  <h4 className="sr-only">Tailscale + SAST</h4>
                  <TechLogo name="Tailscale" className="w-3.5 h-3.5 object-contain" />
                  <TechLogo name="DevSecOps" className="w-3.5 h-3.5 object-contain" />
                  <span className="font-mono text-[11px] font-bold text-white">TAILSCALE+SAST</span>
                </div>
              </div>
              <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center gap-2">
                <h4 className="sr-only">GitHub Actions + Argo CD</h4>
                <TechLogo name="GitHub Actions" className="w-4 h-4 object-contain" />
                <TechLogo name="Argo CD" className="w-4 h-4 object-contain" />
                <span className="font-mono text-xs font-bold text-white">ACTIONS + ARGO</span>
              </div>
            </div>

            {/* Stack 3 Mobile */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.08] pb-2 flex items-center justify-between">
                <span>03 / DESIGNER</span>
                <span className="text-white">SYSTEMS</span>
              </div>
              {/* Stack 3 Pearl Anchor: Figma */}
              <div className="rounded-xl bg-[#f4f4f6] text-black p-6 flex items-center justify-center gap-4 min-h-[140px]">
                <h4 className="sr-only">Figma</h4>
                <div className="w-12 h-12 [filter:brightness(0)]">
                  <TechLogo name="Figma" className="w-12 h-12 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-black">FIGMA</span>
                  <span className="text-xs font-mono font-bold text-neutral-600 tracking-wider">COMPONENT VARIANTS</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#0c0c10] border border-white/10 p-5 flex items-center justify-center">
                <h3 className="sr-only">Design Systems & Tokens</h3>
                <span className="font-mono text-sm font-bold text-white">DESIGN SYSTEMS</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-[#0c0c10] border border-white/10 p-3 text-center">
                  <h5 className="text-xs font-bold text-white">Typography & Art Direction</h5>
                </div>
                <div className="rounded-lg bg-[#0c0c10] border border-white/10 p-3 text-center">
                  <h5 className="text-xs font-bold text-white">Motion Design</h5>
                </div>
                <div className="rounded-lg bg-[#0c0c10] border border-white/10 p-3 text-center">
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
