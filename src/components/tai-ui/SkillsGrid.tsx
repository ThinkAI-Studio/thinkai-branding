"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion, motion, AnimatePresence } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import "./skills-stack.css";

gsap.registerPlugin(ScrollTrigger);

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

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
  const [activeStack, setActiveStack] = useState<0 | 1 | 2>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

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

      // 2. Bento grid slides in smoothly from the right in ONE scroll notch
      if (bentoGridRef.current) {
        gsap.fromTo(
          bentoGridRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bentoGridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const stackLabels = [
    { id: 0, code: "01", name: language === "vi" ? "KIẾN TRÚC GIAO DIỆN" : "FRONTEND ARCHITECTURE", short: "FRONTEND" },
    { id: 1, code: "02", name: language === "vi" ? "HỆ THỐNG & DEVOPS" : "INFRASTRUCTURE & CLOUD", short: "DEVOPS" },
    { id: 2, code: "03", name: language === "vi" ? "THIẾT KẾ & TAY NGHỀ" : "DESIGN SYSTEMS & CRAFT", short: "DESIGN" },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="relative z-20 bg-[#040406] text-white py-20 sm:py-28 lg:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-8 sm:gap-12">
        {/* ─── 01. MASSIVE FLIPPING HEADLINE: "MODERN TECH STACK" ─── */}
        <div className="w-full flex flex-col items-center text-center select-none">
          <h2
            id="skills-heading"
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase font-sans leading-[0.92] flex flex-col items-center"
          >
            <div className="flex gap-2 sm:gap-4 overflow-visible">
              <FlipWord word="MODERN" delayOffset={0} />
            </div>
            <div className="flex gap-2 sm:gap-4 overflow-visible">
              <FlipWord word="TECH" delayOffset={0.2} />
              <span className="w-2 sm:w-4" />
              <FlipWord word="STACK" delayOffset={0.34} />
            </div>
          </h2>
        </div>

        {/* ─── 02. CLEAN MONOCHROME SUB-HEADER & STACK SWITCHER ─── */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4 px-1 text-xs font-mono">
          <span className="font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>PROFESSIONAL AT</span>
          </span>

          {/* Interactive Stack Tabs: Click to toggle between 3 distinct bento structures */}
          <div className="flex items-center gap-2 sm:gap-3">
            {stackLabels.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStack(st.id as 0 | 1 | 2)}
                className={cn(
                  "px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer focus-visible:outline-none",
                  activeStack === st.id
                    ? "bg-white text-black border-white shadow-[0_0_16px_rgba(255,255,255,0.3)] font-bold"
                    : "bg-white/[0.03] text-neutral-400 border-white/[0.08] hover:text-white hover:border-white/20"
                )}
              >
                <span className="mr-1.5 opacity-60">{st.code}</span>
                <span>{st.short}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── 03. MONOCHROMATIC BENTO GRID CONTAINER ─── */}
        <div ref={bentoGridRef} className="w-full">
          <AnimatePresence mode="wait">
            {/* ========================================================
                STACK 1: FRONTEND & WEB ARCHITECTURE (SoraLabs Style)
                Hero White Card (React) + Dark Next & TS + Monochrome Ribbon
               ======================================================== */}
            {activeStack === 0 && (
              <motion.div
                key="stack-frontend"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: LUXURY_EASE }}
                className="w-full flex flex-col gap-3.5"
              >
                {/* Top Row: Hero White Card + Dark Next.js + Dark TypeScript */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                  {/* Hero White React Card (Monochromatic Black Icon on White) */}
                  <div className="col-span-1 md:col-span-5 rounded-2xl bg-[#f4f4f6] text-[#050508] p-7 sm:p-8 flex flex-col justify-between shadow-[0_24px_48px_rgba(0,0,0,0.6)] group hover:scale-[1.01] transition-transform duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-black/5 border border-black/10 uppercase tracking-wider text-black">
                        CORE UI
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-600">v19.2</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-black [filter:brightness(0)] group-hover:rotate-180 transition-transform duration-700">
                        <TechLogo name="React" className="w-16 h-16 sm:w-20 sm:h-20" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-black/10">
                      <div>
                        <h3 className="text-2xl font-black tracking-tight text-black">React 19</h3>
                        <p className="text-xs text-neutral-600 font-sans">Server Components & Actions</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-black uppercase">Production</span>
                    </div>
                  </div>

                  {/* Center Dark Box (Next.js 16) - Monochromatic White on Dark */}
                  <div className="col-span-1 md:col-span-4 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        FRAMEWORK
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-500">App Router</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="text-4xl sm:text-5xl font-black tracking-tighter text-white flex items-center gap-1 [filter:brightness(0)_invert(1)]">
                        <span>NEXT</span>
                        <span className="text-neutral-400 text-3xl">.js</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/[0.08]">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">Next.js 16</h3>
                        <p className="text-xs text-neutral-400 font-sans">Turbopack & Static Generation</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-400">SSR / SSG</span>
                    </div>
                  </div>

                  {/* Right Dark Box (TypeScript) - Monochromatic White on Dark */}
                  <div className="col-span-1 md:col-span-3 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        TYPING
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-500">v5.9</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-white font-mono text-2xl sm:text-3xl font-black shadow-md">
                        TS
                      </div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/[0.08]">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">TypeScript</h3>
                        <p className="text-xs text-neutral-400 font-sans">Strict Type Inference</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-400">Strict</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Monochromatic Technology Ribbon (Pure White SVGs) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
                  {[
                    { name: "Tailwind CSS v4", logo: "Tailwind CSS v4", tag: "STYLING", desc: "@theme Engine" },
                    { name: "GSAP 3.15", logo: "GSAP 3.15", tag: "TIMELINES", desc: "ScrollTrigger" },
                    { name: "Motion 13", logo: "Motion", tag: "PHYSICS", desc: "Spring Curves" },
                    { name: "Three.js", logo: "Three.js WebGL", tag: "3D WEBGL", desc: "Canvas Shaders" },
                    { name: "GLSL", logo: "Three.js / GLSL", tag: "SHADERS", desc: "GPU Noise" },
                    { name: "Lenis", logo: "GSAP", tag: "INERTIA", desc: "120Hz Scroll" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl bg-[#09090d] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/20 hover:bg-[#0e0e14] transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[9.5px] font-mono font-bold text-neutral-500 uppercase">
                          {item.tag}
                        </span>
                        <div className="w-5 h-5 flex items-center justify-center text-white [filter:brightness(0)_invert(1)]">
                          <TechLogo name={item.logo} className="w-4 h-4 object-contain" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{item.name}</h4>
                        <p className="text-[11px] text-neutral-400 font-sans">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ========================================================
                STACK 2: INFRASTRUCTURE & DEVOPS (Different Structure)
                Wide Hero K8s + Podman + 3 Pillars (Linux, Go, Tailscale)
               ======================================================== */}
            {activeStack === 1 && (
              <motion.div
                key="stack-devops"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: LUXURY_EASE }}
                className="w-full flex flex-col gap-3.5"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                  {/* Wide Kubernetes & K3s Box */}
                  <div className="col-span-1 md:col-span-7 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        ORCHESTRATION
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">K3s Lightweight</span>
                    </div>
                    <div className="flex items-center gap-5 py-4">
                      <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 text-white [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Kubernetes & K3s" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">Kubernetes & K3s</h3>
                        <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-0.5">
                          Two-pod cluster topology, Traefik ingress & declarative self-healing.
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

                  {/* Docker & Rootless Podman Box */}
                  <div className="col-span-1 md:col-span-5 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                        CONTAINER
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-400">Rootless</span>
                    </div>
                    <div className="flex items-center gap-4 py-4">
                      <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 text-white [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Docker & Podman" className="w-9 h-9 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">Docker & Podman</h3>
                        <p className="text-xs text-neutral-400 font-sans">Daemonless rootless isolation & multi-stage builds</p>
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

                {/* Row 2: 3 Monochrome Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="rounded-xl bg-[#09090d] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">SYS BASELINE</span>
                      <div className="w-5 h-5 [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Linux" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Linux & systemd</h4>
                      <p className="text-xs text-neutral-400 font-sans mt-0.5">Kernel tuning, unit isolation & POSIX reliability</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#09090d] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">CONCURRENCY</span>
                      <div className="w-5 h-5 [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Go" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Go (Golang 1.24)</h4>
                      <p className="text-xs text-neutral-400 font-sans mt-0.5">High-throughput goroutines, CLI tools & RPC</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#09090d] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">ZERO-TRUST</span>
                      <div className="w-5 h-5 [filter:brightness(0)_invert(1)]">
                        <TechLogo name="Tailscale" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Tailscale WireGuard</h4>
                      <p className="text-xs text-neutral-400 font-sans mt-0.5">Peer-to-peer encrypted mesh routing & ACLs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================
                STACK 3: DESIGN SYSTEMS & SPATIAL CRAFT (Third Structure)
                50% Left Feature (Tokens) + 50% Right (Figma + 3 Cells)
               ======================================================== */}
            {activeStack === 2 && (
              <motion.div
                key="stack-design"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: LUXURY_EASE }}
                className="w-full flex flex-col gap-3.5"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                  {/* Left Feature Box */}
                  <div className="col-span-1 md:col-span-6 rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group hover:border-white/30 transition-all duration-300 min-h-[280px]">
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
                        <h3 className="text-2xl font-bold tracking-tight text-white">10px Precision Tokens</h3>
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

                  {/* Right Half: Figma + 3 Squares */}
                  <div className="col-span-1 md:col-span-6 flex flex-col gap-3.5">
                    <div className="rounded-2xl bg-[#0c0c10] border border-white/[0.12] p-6 flex items-center justify-between shadow-lg hover:border-white/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2 text-white [filter:brightness(0)_invert(1)]">
                          <TechLogo name="Figma" className="w-7 h-7 object-contain" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white tracking-tight">Figma Component Variants</h4>
                          <p className="text-xs text-neutral-400 font-sans">Auto-layout wireframing & token handoff</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded-md bg-white/10">
                        Mastery
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5 flex-1">
                      <div className="rounded-xl bg-[#09090d] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[9.5px] font-mono text-neutral-500 uppercase">EDITORIAL</span>
                          <div className="w-4 h-4 [filter:brightness(0)_invert(1)]">
                            <TechLogo name="Typography" className="w-4 h-4 object-contain" />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">Typography</h5>
                          <p className="text-[11px] text-neutral-400">Optical rhythm</p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#09090d] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[9.5px] font-mono text-neutral-500 uppercase">PHYSICS</span>
                          <div className="w-4 h-4 [filter:brightness(0)_invert(1)]">
                            <TechLogo name="Motion Design" className="w-4 h-4 object-contain" />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">Motion Design</h5>
                          <p className="text-[11px] text-neutral-400">Spring curves</p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#09090d] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[9.5px] font-mono text-neutral-500 uppercase">HAPTIC</span>
                          <div className="w-4 h-4 [filter:brightness(0)_invert(1)]">
                            <TechLogo name="Prototyping" className="w-4 h-4 object-contain" />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">Prototyping</h5>
                          <p className="text-[11px] text-neutral-400">Tactile latency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default SkillsGrid;
