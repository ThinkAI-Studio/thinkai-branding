"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import "./skills-stack.css";

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
  const stackContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileStackContainersRef = useRef<(HTMLDivElement | null)[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef<boolean>(false);

  const HOLD_DURATION = 2000; // exactly 2.0s hold

  const showStack = useCallback((idx: number) => {
    currentStackIdxRef.current = idx;
    setCurrentStackIdx(idx);

    // Desktop
    const desktopStacks = stackContainersRef.current.filter(Boolean) as HTMLDivElement[];
    desktopStacks.forEach((stack, sIdx) => {
      const isTarget = sIdx === idx;
      gsap.to(stack, {
        opacity: isTarget ? 1 : 0,
        y: isTarget ? 0 : sIdx < idx ? -16 : 16,
        duration: 0.35,
        ease: "power2.out",
        pointerEvents: isTarget ? "auto" : "none",
        overwrite: "auto",
      });
    });

    // Mobile
    const mobileStacks = mobileStackContainersRef.current.filter(Boolean) as HTMLDivElement[];
    mobileStacks.forEach((stack, sIdx) => {
      const isTarget = sIdx === idx;
      gsap.to(stack, {
        opacity: isTarget ? 1 : 0,
        y: isTarget ? 0 : sIdx < idx ? -16 : 16,
        duration: 0.35,
        ease: "power2.out",
        pointerEvents: isTarget ? "auto" : "none",
        overwrite: "auto",
      });
    });
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        const nextIdx = (currentStackIdxRef.current + 1) % 3;
        showStack(nextIdx);
      }
    }, HOLD_DURATION + 350);
  }, [showStack]);

  const handleNotchClick = (idx: number) => {
    showStack(idx);
    startTimer();
  };

  useEffect(() => {
    if (prefersReduced) return;

    startTimer();

    const handleVisibility = () => {
      isPausedRef.current = document.hidden;
      if (!document.hidden) {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isPausedRef.current = !entry.isIntersecting;
        if (entry.isIntersecting) {
          startTimer();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, [prefersReduced, showStack, startTimer]);

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
      className="relative z-20 bg-[#141414] py-16 sm:py-20 text-white border-t border-white/[0.10] overflow-x-clip"
    >
      {prefersReduced ? (
        /* Reduced Motion: Static Accessible View containing all 17 skills across WEB, DEVOPS, DESIGNER */
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 space-y-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 id="skills-heading" className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans">
              MODERN TECH STACK
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400">
              {language === "vi" ? "Kiến trúc tinh gọn, kiểm chứng thực tế." : "Zero unnecessary abstraction, verified in production."}
            </p>
          </div>

          {/* Web Chapter */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.10] pb-2">
              WEB
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">React 19</h3>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Next.js 16</h3>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">TypeScript</h3>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Tailwind CSS v4</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">GSAP + Motion</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Three.js / GLSL</h4>
              </div>
            </div>
          </div>

          {/* DevOps Chapter */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.10] pb-2">
              DEVOPS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Kubernetes & K3s</h3>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Docker & Podman</h3>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Linux</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Go</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Tailscale + Trivy</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">GitHub Actions + Argo CD</h4>
              </div>
            </div>
          </div>

          {/* Designer Chapter */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.10] pb-2">
              DESIGNER
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h3 className="text-xl font-bold text-white">Design Systems & Tokens</h3>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Figma</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Typography & Art Direction</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Motion Design</h4>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5">
                <h4 className="text-base font-bold text-white">Prototyping</h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ========================================================
              DESKTOP AUTONOMOUS STAGE (>=768px): SoraLabs Minimalist Bento
             ======================================================== */}
          <div
            className="hidden md:flex relative w-full flex-col justify-between px-6 lg:px-12 py-4 max-w-[1720px] mx-auto overflow-hidden pointer-events-auto"
          >
            {/* Headline & Notch Tracker */}
            <div className="w-full flex flex-col items-center text-center select-none pt-1">
              <h2
                id="skills-heading"
                className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white font-sans leading-[0.92] flex flex-col items-center"
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

              {/* Discrete Notch Indicator Tabs / Manual Controls */}
              <div className="flex items-center gap-3 pt-4" role="tablist" aria-label="Skill Stacks">
                {stackLabels.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    role="tab"
                    id={`skill-tab-${st.id}`}
                    aria-selected={currentStackIdx === st.id}
                    onClick={() => handleNotchClick(st.id)}
                    className={cn(
                      "px-3.5 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer border",
                      currentStackIdx === st.id
                        ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.4)] font-bold scale-105"
                        : "bg-white/[0.04] text-neutral-400 border-white/[0.1] hover:text-white hover:border-white/20"
                    )}
                  >
                    <span>{st.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliding Bento Stacks Area (Reserved Height: 460px to prevent layout shift) */}
            <div className="relative w-full max-w-[1380px] mx-auto min-h-[460px] h-[460px] flex items-center justify-center my-6">
              {/* STACK 1: WEB (Frontend Architecture) */}
              <div
                ref={(el) => {
                  stackContainersRef.current[0] = el;
                }}
                className="w-full flex flex-col gap-3.5 absolute inset-x-0 my-auto"
              >
                <div className="pb-1 px-1">
                  <span className="text-sm font-medium text-white">Web Architecture</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5">
                  <div className="bento-block col-span-5 rounded-xl bg-[#f4f4f6] p-8 flex items-center justify-center shadow-[0_24px_48px_rgba(0,0,0,0.6)] min-h-[230px]">
                    <h3 className="sr-only">React 19</h3>
                    <div className="w-20 h-20 rounded-xl bg-black/[0.06] border border-black/10 flex items-center justify-center p-4 text-black [filter:brightness(0)] bento-inner-mark">
                      <TechLogo name="React" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="flex flex-col ml-4">
                      <span className="text-3xl font-black tracking-tight text-black">REACT 19</span>
                    </div>
                  </div>

                  <div className="bento-block col-span-4 rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-8 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">Next.js 16</h3>
                    <div className="text-5xl sm:text-6xl font-black tracking-tighter text-white flex items-center gap-1.5 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <span>NEXT</span>
                      <span className="text-[#A3A3A3] text-4xl">.js</span>
                    </div>
                  </div>

                  <div className="bento-block col-span-3 rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-8 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">TypeScript</h3>
                    <div className="w-20 h-20 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-white font-mono text-4xl font-black shadow-lg bento-inner-mark">
                      TS
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center min-h-[90px]">
                    <h4 className="sr-only">Tailwind CSS v4</h4>
                    <div className="flex items-center gap-3 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Tailwind CSS v4" className="w-7 h-7 object-contain" />
                      <span className="font-mono text-sm font-bold tracking-wider text-white">TAILWIND</span>
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center min-h-[90px]">
                    <h4 className="sr-only">GSAP + Motion</h4>
                    <div className="flex items-center gap-2.5 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="GSAP" className="w-6 h-6 object-contain" />
                      <TechLogo name="Motion" className="w-5 h-5 object-contain" />
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white">GSAP + MOTION</span>
                    </div>
                  </div>

                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center min-h-[90px]">
                    <h4 className="sr-only">Three.js / GLSL</h4>
                    <div className="flex items-center gap-3 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Three.js WebGL" className="w-7 h-7 object-contain" />
                      <span className="font-mono text-sm font-bold tracking-wider text-white">THREE.JS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STACK 2: DEVOPS & INFRASTRUCTURE */}
              <div
                ref={(el) => {
                  stackContainersRef.current[1] = el;
                }}
                className="w-full flex flex-col gap-3.5 absolute inset-x-0 my-auto opacity-0 pointer-events-none"
              >
                <div className="pb-1 px-1">
                  <span className="text-sm font-medium text-white">DevOps &amp; Systems</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5">
                  <div className="bento-block col-span-7 rounded-xl bg-[#f4f4f6] p-8 flex items-center justify-center gap-6 shadow-[0_24px_48px_rgba(0,0,0,0.6)] min-h-[230px]">
                    <h3 className="sr-only">Kubernetes & K3s</h3>
                    <div className="w-20 h-20 rounded-xl bg-black/[0.06] border border-black/10 flex items-center justify-center p-4 text-black [filter:brightness(0)] bento-inner-mark">
                      <TechLogo name="Kubernetes & K3s" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black tracking-tight text-black">KUBERNETES</span>
                    </div>
                  </div>

                  <div className="bento-block col-span-5 rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-8 flex items-center justify-center gap-5 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">Docker & Podman</h3>
                    <div className="h-16 px-4 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center gap-2.5 text-white [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Docker" className="w-8 h-8 object-contain" />
                      <TechLogo name="Podman" className="w-7 h-7 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold tracking-tight text-white">DOCKER &amp; PODMAN</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h4 className="sr-only">Linux</h4>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Linux" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">LINUX</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h4 className="sr-only">Go</h4>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Go" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">GOLANG</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center gap-2.5 min-h-[90px]">
                    <h4 className="sr-only">Tailscale + Trivy</h4>
                    <div className="flex items-center gap-2 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Tailscale" className="w-5 h-5 object-contain" />
                      <TechLogo name="Trivy" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white tracking-wide">TAILSCALE + TRIVY</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center gap-2.5 min-h-[90px]">
                    <h4 className="sr-only">GitHub Actions + Argo CD</h4>
                    <div className="flex items-center gap-2 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="GitHub Actions" className="w-5 h-5 object-contain" />
                      <TechLogo name="Argo CD" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white tracking-wide">ACTIONS + ARGO</span>
                  </div>
                </div>
              </div>

              {/* STACK 3: DESIGNER */}
              <div
                ref={(el) => {
                  stackContainersRef.current[2] = el;
                }}
                className="w-full flex flex-col gap-3.5 absolute inset-x-0 my-auto opacity-0 pointer-events-none"
              >
                <div className="pb-1 px-1">
                  <span className="text-sm font-medium text-white">Design Systems &amp; Spatial Craft</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5">
                  <div className="bento-block col-span-6 rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-8 flex items-center justify-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] min-h-[230px]">
                    <h3 className="sr-only">Design Systems & Tokens</h3>
                    <div className="w-18 h-18 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-4 text-white [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Design Systems" className="w-12 h-12 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black tracking-tight text-white">DESIGN SYSTEMS</span>
                    </div>
                  </div>

                  <div className="bento-block col-span-6 rounded-xl bg-[#f4f4f6] p-8 flex items-center justify-center gap-6 shadow-[0_24px_48px_rgba(0,0,0,0.6)] min-h-[230px]">
                    <h4 className="sr-only">Figma</h4>
                    <div className="w-18 h-18 rounded-xl bg-black/[0.06] border border-black/10 flex items-center justify-center p-4 text-black [filter:brightness(0)] bento-inner-mark">
                      <TechLogo name="Figma" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black tracking-tight text-black">FIGMA</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3.5">
                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h4 className="sr-only">Typography & Art Direction</h4>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Typography" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">TYPOGRAPHY</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h4 className="sr-only">Motion Design</h4>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Motion Design" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">MOTION</span>
                  </div>

                  <div className="bento-block rounded-xl bg-[#1E1E1E] border border-white/[0.10] p-6 flex items-center justify-center gap-3 min-h-[90px]">
                    <h4 className="sr-only">Prototyping</h4>
                    <div className="w-6 h-6 [filter:brightness(0)_invert(1)] bento-inner-mark">
                      <TechLogo name="Prototyping" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tracking-wide">PROTOTYPING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              MOBILE VIEW (<768px): Autonomous 2.0s Cycle
             ======================================================== */}
          <div className="block md:hidden py-8 px-4 space-y-6">
            <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-white/[0.10]">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-sans leading-none">
                MODERN<br />TECH STACK
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                {language === "vi" ? "Kiến trúc tinh gọn, kiểm chứng thực tế." : "Zero unnecessary abstraction, verified in production."}
              </p>
              <div className="flex items-center gap-2 pt-2" role="tablist" aria-label="Mobile Skill Stacks">
                {stackLabels.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    role="tab"
                    id={`mobile-tab-${st.id}`}
                    aria-selected={currentStackIdx === st.id}
                    onClick={() => handleNotchClick(st.id)}
                    className={cn(
                      "px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer border",
                      currentStackIdx === st.id
                        ? "bg-white text-black border-white font-bold"
                        : "bg-white/[0.04] text-neutral-400 border-white/[0.1]"
                    )}
                  >
                    <span>{st.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Autonomous Cycling Container (Reserved height 580px to prevent layout shift) */}
            <div className="relative w-full min-h-[580px] h-[580px] overflow-hidden">
              {/* Stack 1 Mobile */}
              <div
                ref={(el) => {
                  mobileStackContainersRef.current[0] = el;
                }}
                className="w-full space-y-4 absolute inset-x-0 top-0"
              >
                <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.10] pb-2 flex items-center justify-between">
                  <span>WEB</span>
                  <span className="text-white">FRONTEND</span>
                </div>
                <div className="rounded-xl bg-[#f4f4f6] text-black p-6 flex items-center justify-center min-h-[140px]">
                  <h3 className="sr-only">React 19</h3>
                  <div className="w-16 h-16 [filter:brightness(0)]">
                    <TechLogo name="React" className="w-16 h-16 object-contain" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center">
                    <h3 className="sr-only">Next.js 16</h3>
                    <span className="font-mono text-lg font-black text-white">NEXT.JS</span>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center">
                    <h3 className="sr-only">TypeScript</h3>
                    <span className="font-mono text-lg font-black text-white">TS</span>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center">
                    <h4 className="sr-only">Tailwind CSS v4</h4>
                    <span className="font-mono text-xs font-bold text-white">TAILWIND</span>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center gap-2">
                    <h4 className="sr-only">GSAP + Motion</h4>
                    <TechLogo name="GSAP" className="w-4 h-4 object-contain" />
                    <TechLogo name="Motion" className="w-3.5 h-3.5 object-contain" />
                    <span className="font-mono text-xs font-bold text-white">GSAP + MOTION</span>
                  </div>
                </div>
                <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center">
                  <h4 className="sr-only">Three.js / GLSL</h4>
                  <span className="font-mono text-sm font-bold text-white">THREE.JS / GLSL</span>
                </div>
              </div>

              {/* Stack 2 Mobile */}
              <div
                ref={(el) => {
                  mobileStackContainersRef.current[1] = el;
                }}
                className="w-full space-y-4 absolute inset-x-0 top-0 opacity-0 pointer-events-none"
              >
                <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.10] pb-2 flex items-center justify-between">
                  <span>DEVOPS</span>
                  <span className="text-white">INFRASTRUCTURE</span>
                </div>
                <div className="rounded-xl bg-[#f4f4f6] text-black p-6 flex items-center justify-center gap-4 min-h-[140px]">
                  <h3 className="sr-only">Kubernetes & K3s</h3>
                  <div className="w-14 h-14 [filter:brightness(0)]">
                    <TechLogo name="Kubernetes & K3s" className="w-14 h-14 object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tight text-black">KUBERNETES</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center gap-2">
                    <h3 className="sr-only">Docker & Podman</h3>
                    <TechLogo name="Docker" className="w-4 h-4 object-contain" />
                    <TechLogo name="Podman" className="w-4 h-4 object-contain" />
                    <span className="font-mono text-xs font-bold text-white">DOCKER &amp; PODMAN</span>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center">
                    <h4 className="sr-only">Linux</h4>
                    <span className="font-mono text-sm font-bold text-white">LINUX</span>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center">
                    <h4 className="sr-only">Go</h4>
                    <span className="font-mono text-sm font-bold text-white">GOLANG</span>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center gap-1.5">
                    <h4 className="sr-only">Tailscale + Trivy</h4>
                    <TechLogo name="Tailscale" className="w-3.5 h-3.5 object-contain" />
                    <TechLogo name="Trivy" className="w-3.5 h-3.5 object-contain" />
                    <span className="font-mono text-[11px] font-bold text-white">TAILSCALE + TRIVY</span>
                  </div>
                </div>
                <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center gap-2">
                  <h4 className="sr-only">GitHub Actions + Argo CD</h4>
                  <TechLogo name="GitHub Actions" className="w-4 h-4 object-contain" />
                  <TechLogo name="Argo CD" className="w-4 h-4 object-contain" />
                  <span className="font-mono text-xs font-bold text-white">ACTIONS + ARGO</span>
                </div>
              </div>

              {/* Stack 3 Mobile */}
              <div
                ref={(el) => {
                  mobileStackContainersRef.current[2] = el;
                }}
                className="w-full space-y-4 absolute inset-x-0 top-0 opacity-0 pointer-events-none"
              >
                <div className="text-xs font-mono font-bold text-neutral-400 border-b border-white/[0.10] pb-2 flex items-center justify-between">
                  <span>DESIGNER</span>
                  <span className="text-white">SYSTEMS</span>
                </div>
                <div className="rounded-xl bg-[#f4f4f6] text-black p-6 flex items-center justify-center gap-4 min-h-[140px]">
                  <h4 className="sr-only">Figma</h4>
                  <div className="w-12 h-12 [filter:brightness(0)]">
                    <TechLogo name="Figma" className="w-12 h-12 object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tight text-black">FIGMA</span>
                  </div>
                </div>
                <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-5 flex items-center justify-center">
                  <h3 className="sr-only">Design Systems & Tokens</h3>
                  <span className="font-mono text-sm font-bold text-white">DESIGN SYSTEMS</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-3 text-center">
                    <h4 className="text-xs font-bold text-white">Typography &amp; Art Direction</h4>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-3 text-center">
                    <h4 className="text-xs font-bold text-white">Motion Design</h4>
                  </div>
                  <div className="rounded-xl bg-[#1E1E1E] border border-white/10 p-3 text-center">
                    <h4 className="text-xs font-bold text-white">Prototyping</h4>
                  </div>
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
