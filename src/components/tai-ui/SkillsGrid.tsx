"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";
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
          data-delay={delayOffset + i * 0.035}
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
          y: 40,
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
                duration: 0.85,
                delay,
                ease: "back.out(1.7)",
              });
            });
          },
        });
      }

      // 2. Horizontal sliding bento stacks on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const stacks = stackContainersRef.current.filter(Boolean) as HTMLDivElement[];
        if (stacks.length < 3) return;

        // All stacks start offscreen to the right
        stacks.forEach((stackEl, idx) => {
          gsap.set(stackEl, {
            x: "100vw",
            opacity: 0,
            pointerEvents: idx === 0 ? "auto" : "none",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stageRef.current,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Stack 1 slides IN from the RIGHT
        tl.to(
          stacks[0],
          {
            x: "0vw",
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.2
        );

        // Phase 2: Stack 1 slides OUT to the LEFT, Stack 2 slides IN from the RIGHT
        tl.to(
          stacks[0],
          {
            x: "-100vw",
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          2.0
        );
        tl.set(stacks[0], { pointerEvents: "none" }, 2.6);

        tl.fromTo(
          stacks[1],
          { x: "100vw", opacity: 0 },
          {
            x: "0vw",
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.inOut",
          },
          2.0
        );

        // Phase 3: Stack 2 slides OUT to the LEFT, Stack 3 slides IN from the RIGHT
        tl.to(
          stacks[1],
          {
            x: "-100vw",
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          4.0
        );
        tl.set(stacks[1], { pointerEvents: "none" }, 4.6);

        tl.fromTo(
          stacks[2],
          { x: "100vw", opacity: 0 },
          {
            x: "0vw",
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.inOut",
          },
          4.0
        );
      });
    }, sectionRef);

    return () => {
      if (lenis?.off) lenis.off("scroll", handleLenisScroll);
      ctx.revert();
    };
  }, [prefersReduced]);

  return (
    <section
      id="skills"
      ref={prefersReduced ? undefined : sectionRef}
      aria-labelledby="skills-heading"
      className={
        prefersReduced
          ? "relative z-20 bg-[#040406] py-24 sm:py-32 border-t border-white/[0.08] overflow-x-clip"
          : "relative z-20 bg-[#040406] text-white border-t border-white/[0.08] overflow-x-clip md:h-[350vh]"
      }
    >
      {/* ========================================================
          DESKTOP PINNED STAGE (>=768px): Soralabs Studio Bento
         ======================================================== */}
      <div
        ref={stageRef}
        className="hidden md:flex relative w-full h-screen flex-col justify-between px-6 lg:px-12 py-10 max-w-[1720px] mx-auto overflow-hidden pointer-events-auto"
      >
        {/* Flipping Headline */}
        <div className="w-full flex flex-col items-center text-center select-none pt-4">
          <h2
            id="skills-heading"
            ref={titleRef}
            className="text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase font-sans leading-[0.92] flex flex-col items-center"
          >
            <div className="flex gap-3 overflow-visible">
              <FlipWord word="MODERN" delayOffset={0} />
            </div>
            <div className="flex gap-3 overflow-visible">
              <FlipWord word="TECH" delayOffset={0.22} />
              <span className="w-3" />
              <FlipWord word="STACK" delayOffset={0.38} />
            </div>
          </h2>
        </div>

        {/* Sliding Bento Stacks Area */}
        <div className="relative w-full flex-1 my-6 flex items-center justify-center min-h-[460px]">
          {/* STACK 1: FRONTEND & WEB */}
          <div
            ref={(el) => {
              stackContainersRef.current[0] = el;
            }}
            className="w-full max-w-[1400px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>01 / {language === "vi" ? "KIẾN TRÚC GIAO DIỆN" : "FRONTEND ARCHITECTURE"}</span>
              </span>
              <span className="text-emerald-400">REACT · NEXT.JS · TS</span>
            </div>

            <div className="grid grid-cols-12 gap-3.5">
              {/* White Highlight Hero Box (React 19) */}
              <div className="col-span-5 rounded-2xl bg-[#f4f4f6] text-[#050508] p-8 flex flex-col justify-between shadow-[0_24px_48px_rgba(0,0,0,0.6)] group hover:scale-[1.01] transition-transform duration-300 min-h-[220px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-black/5 border border-black/10 uppercase tracking-wider text-neutral-800">
                    CORE UI
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-600">v19.2</span>
                </div>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-16 h-16 flex items-center justify-center text-black group-hover:rotate-180 transition-transform duration-700">
                    <TechLogo name="React" className="w-16 h-16" />
                  </div>
                </div>
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-black">React 19</h3>
                    <p className="text-xs text-neutral-600 font-sans">Server Components & Actions</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Production</span>
                </div>
              </div>

              {/* Center Dark Box (Next.js 16) */}
              <div className="col-span-4 rounded-2xl bg-[#0c0c12] border border-white/[0.12] p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] group hover:border-white/[0.3] transition-all duration-300 min-h-[220px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.10] uppercase tracking-wider text-neutral-300">
                    FRAMEWORK
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-500">App Router</span>
                </div>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="text-4xl font-black tracking-tighter text-white flex items-center gap-1">
                    <span>NEXT</span>
                    <span className="text-neutral-500 text-3xl">.js</span>
                  </div>
                </div>
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">Next.js 16</h3>
                    <p className="text-xs text-neutral-400 font-sans">Turbopack & Static Generation</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">SSR / SSG</span>
                </div>
              </div>

              {/* Right Dark Box (TypeScript) */}
              <div className="col-span-3 rounded-2xl bg-[#0c0c12] border border-white/[0.12] p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] group hover:border-white/[0.3] transition-all duration-300 min-h-[220px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 uppercase tracking-wider text-blue-400">
                    STRICT
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-500">v5.9</span>
                </div>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-16 h-16 rounded-xl bg-[#3178C6] flex items-center justify-center text-white font-mono text-3xl font-black shadow-lg">
                    TS
                  </div>
                </div>
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">TypeScript</h3>
                    <p className="text-xs text-neutral-400 font-sans">Strict Type Inference</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400">100% Safe</span>
                </div>
              </div>
            </div>

            {/* Bottom Tech Ribbon */}
            <div className="grid grid-cols-6 gap-3.5">
              {[
                { name: "Tailwind CSS v4", logo: "Tailwind CSS v4", tag: "STYLING", desc: "@theme Tokens" },
                { name: "GSAP 3.15", logo: "GSAP 3.15", tag: "TIMELINES", desc: "ScrollTrigger" },
                { name: "Motion 13", logo: "Motion", tag: "PHYSICS", desc: "Spring Curves" },
                { name: "Three.js", logo: "Three.js WebGL", tag: "3D WEBGL", desc: "Custom Shaders" },
                { name: "GLSL Shaders", logo: "Three.js / GLSL", tag: "PROCEDURAL", desc: "GPU Noise" },
                { name: "Lenis 1.3", logo: "GSAP", tag: "SCROLL", desc: "120Hz Inertia" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl bg-[#09090e] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/[0.22] hover:bg-[#0f0f16] transition-all duration-200 shadow-md group"
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-[9.5px] font-mono font-bold text-neutral-500 group-hover:text-emerald-400 transition-colors uppercase">
                      {item.tag}
                    </span>
                    <div className="w-5 h-5 flex items-center justify-center text-white">
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
          </div>

          {/* STACK 2: INFRASTRUCTURE & CLOUD NATIVE */}
          <div
            ref={(el) => {
              stackContainersRef.current[1] = el;
            }}
            className="w-full max-w-[1400px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>02 / {language === "vi" ? "HỆ THỐNG & HẠ TẦNG CLOUD" : "INFRASTRUCTURE & DEVOPS"}</span>
              </span>
              <span className="text-cyan-400">KUBERNETES · PODMAN · GOLANG</span>
            </div>

            <div className="grid grid-cols-12 gap-3.5">
              <div className="col-span-7 rounded-2xl bg-[#0c0c12] border border-cyan-500/20 p-8 flex flex-col justify-between shadow-[0_24px_48px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] group hover:border-cyan-400/40 transition-all duration-300 min-h-[220px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 uppercase tracking-wider text-cyan-400">
                    ORCHESTRATION
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">K3s Lightweight</span>
                </div>
                <div className="flex items-center gap-6 py-4">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center p-3 text-cyan-400">
                    <TechLogo name="Kubernetes & K3s" className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white">Kubernetes & K3s</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                      Two-pod cluster topology, Traefik ingress & declarative self-healing.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  {["Traefik Ingress", "Declarative YAML", "Self-Healing"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-5 rounded-2xl bg-[#0c0c12] border border-white/[0.12] p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] group hover:border-white/[0.3] transition-all duration-300 min-h-[220px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 uppercase tracking-wider text-blue-400">
                    CONTAINER
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-400">Rootless Podman</span>
                </div>
                <div className="flex items-center gap-4 py-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center p-2.5 text-blue-400">
                    <TechLogo name="Docker & Podman" className="w-9 h-9 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">Docker & Podman</h3>
                    <p className="text-xs text-neutral-400 font-sans">Daemonless rootless isolation & multi-stage builds</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  {["Rootless", "Quadlets", "OCI Standard"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3.5">
              <div className="rounded-xl bg-[#09090e] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-amber-400/40 transition-all duration-200">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">SYS BASELINE</span>
                  <TechLogo name="Linux" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Linux & systemd</h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Kernel tuning, unit isolation & POSIX reliability</p>
                </div>
              </div>

              <div className="rounded-xl bg-[#09090e] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-200">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">HIGH THROUGHPUT</span>
                  <TechLogo name="Go" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Go (Golang 1.24)</h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Concurrent goroutines, CLI tooling & RPC pipelines</p>
                </div>
              </div>

              <div className="rounded-xl bg-[#09090e] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-emerald-400/40 transition-all duration-200">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">ZERO-TRUST</span>
                  <TechLogo name="Tailscale" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Tailscale WireGuard</h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Peer-to-peer encrypted mesh routing & ACL control</p>
                </div>
              </div>
            </div>
          </div>

          {/* STACK 3: DESIGN SYSTEMS & SPATIAL CRAFT */}
          <div
            ref={(el) => {
              stackContainersRef.current[2] = el;
            }}
            className="w-full max-w-[1400px] flex flex-col gap-3.5 absolute inset-x-0 my-auto"
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase pb-1 px-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>03 / {language === "vi" ? "THIẾT KẾ HỆ THỐNG & TAY NGHỀ" : "SPATIAL SYSTEMS & PRODUCT CRAFT"}</span>
              </span>
              <span className="text-amber-400">DESIGN TOKENS · FIGMA · EDITORIAL</span>
            </div>

            <div className="grid grid-cols-12 gap-3.5">
              <div className="col-span-6 rounded-2xl bg-[#0c0c12] border border-amber-500/20 p-8 flex flex-col justify-between shadow-[0_24px_48px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] group hover:border-amber-400/40 transition-all duration-300 min-h-[300px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 uppercase tracking-wider text-amber-400">
                    10PX PRECISION
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-400">tai-ui Specification</span>
                </div>
                <div className="space-y-4 py-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center p-3 text-amber-400">
                    <TechLogo name="Design Systems" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white">Design Systems & Tokens</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1">
                      10px precision token architecture, Obsidian dark palette, semantic variables, and CLI component distribution.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
                  {["10px Tokens", "Obsidian Depth", "Atomic Primitives", "Registry Standards"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-6 flex flex-col gap-3.5">
                <div className="rounded-2xl bg-[#0c0c12] border border-white/[0.12] p-6 flex items-center justify-between shadow-lg hover:border-white/[0.28] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-2 text-white">
                      <TechLogo name="Figma" className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">Figma Component Variants</h4>
                      <p className="text-xs text-neutral-400 font-sans">Auto-layout wireframing & token handoff</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-1 rounded bg-white/[0.04]">
                    Mastery
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3.5 flex-1">
                  <div className="rounded-xl bg-[#09090e] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/[0.22] transition-colors">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[9.5px] font-mono text-neutral-500 uppercase">EDITORIAL</span>
                      <TechLogo name="Typography" className="w-4 h-4 object-contain" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Typography</h5>
                      <p className="text-[11px] text-neutral-400">Optical rhythm</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#09090e] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/[0.22] transition-colors">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[9.5px] font-mono text-neutral-500 uppercase">PHYSICS</span>
                      <TechLogo name="Motion Design" className="w-4 h-4 object-contain" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Motion Design</h5>
                      <p className="text-[11px] text-neutral-400">Spring curves</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#09090e] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-white/[0.22] transition-colors">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[9.5px] font-mono text-neutral-500 uppercase">HAPTIC</span>
                      <TechLogo name="Prototyping" className="w-4 h-4 object-contain" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Prototyping</h5>
                      <p className="text-[11px] text-neutral-400">Tactile latency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Footer Status */}
        <div className="w-full flex items-center justify-between gap-6 border-t border-white/[0.08] pt-4 text-[11px] font-mono text-neutral-400 select-none">
          <span className="flex items-center gap-6">
            <span>{language === "vi" ? "Cuộn để lướt qua các stack kỹ năng" : "Scroll to sweep through tech stacks"}</span>
            <span className="text-emerald-400 flex items-center gap-2">
              GSAP SCRUBBED · 60FPS
              <span aria-hidden="true" className="animate-bounce">↓</span>
            </span>
          </span>
          <span className="text-neutral-500">THINKAI STUDIO · BENTO MATRIX</span>
        </div>
      </div>

      {/* ========================================================
          MOBILE SWIPEABLE TRACK (<768px): Touch-Friendly Bento Cards
         ======================================================== */}
      <div className="block md:hidden py-16 px-4 space-y-12">
        <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-white/[0.08]">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans leading-none">
            MODERN<br />TECH STACK
          </h2>
          <p className="text-xs font-mono text-neutral-400">
            {language === "vi" ? "Vuốt ngang để khám phá từng stack" : "Swipe horizontally to explore stacks"}
          </p>
        </div>

        {/* Mobile Horizontal Snap Track */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-1 scrollbar-none">
          {/* Mobile Stack 1 */}
          <div className="w-[88vw] max-w-[360px] shrink-0 snap-center rounded-2xl bg-[#09090f] border border-white/[0.1] p-6 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              01 / {language === "vi" ? "KIẾN TRÚC GIAO DIỆN" : "FRONTEND"}
            </span>
            <div className="rounded-xl bg-[#f4f4f6] text-black p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black">React 19</h4>
                <p className="text-xs text-neutral-600">Server Components</p>
              </div>
              <TechLogo name="React" className="w-10 h-10" />
            </div>
            <div className="rounded-xl bg-[#0e0e16] border border-white/[0.08] p-5 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Next.js 16</h4>
                <p className="text-xs text-neutral-400">App Router & Turbopack</p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">SSR</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
              {["TypeScript", "Tailwind CSS v4", "GSAP 3.15", "Three.js"].map((tech) => (
                <div key={tech} className="p-2.5 rounded-lg bg-white/[0.04] text-xs font-mono text-neutral-300">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Stack 2 */}
          <div className="w-[88vw] max-w-[360px] shrink-0 snap-center rounded-2xl bg-[#09090f] border border-white/[0.1] p-6 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              02 / {language === "vi" ? "HỆ THỐNG & DEVOPS" : "INFRASTRUCTURE"}
            </span>
            <div className="rounded-xl bg-[#0e0e16] border border-cyan-500/20 p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-white">Kubernetes & K3s</h4>
                <p className="text-xs text-neutral-400">Two-pod self-healing</p>
              </div>
              <TechLogo name="Kubernetes & K3s" className="w-8 h-8 object-contain" />
            </div>
            <div className="rounded-xl bg-[#0e0e16] border border-white/[0.08] p-5 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Docker & Podman</h4>
                <p className="text-xs text-neutral-400">Rootless namespaces</p>
              </div>
              <TechLogo name="Docker & Podman" className="w-8 h-8 object-contain" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
              {["Linux & systemd", "Go (Golang)", "Tailscale Mesh", "SAST Gates"].map((tech) => (
                <div key={tech} className="p-2.5 rounded-lg bg-white/[0.04] text-xs font-mono text-neutral-300">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Stack 3 */}
          <div className="w-[88vw] max-w-[360px] shrink-0 snap-center rounded-2xl bg-[#09090f] border border-white/[0.1] p-6 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              03 / {language === "vi" ? "THIẾT KẾ & TAY NGHỀ" : "DESIGN SYSTEMS"}
            </span>
            <div className="rounded-xl bg-[#0e0e16] border border-amber-500/20 p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-white">10px Precision Tokens</h4>
                <p className="text-xs text-neutral-400">Obsidian palette & registry</p>
              </div>
              <TechLogo name="Design Systems" className="w-8 h-8 object-contain" />
            </div>
            <div className="rounded-xl bg-[#0e0e16] border border-white/[0.08] p-5 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Figma Variants</h4>
                <p className="text-xs text-neutral-400">Token handoff & layout</p>
              </div>
              <TechLogo name="Figma" className="w-7 h-7 object-contain" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08]">
              {["Typography", "Motion", "Prototypes"].map((tech) => (
                <div key={tech} className="p-2.5 rounded-lg bg-white/[0.04] text-center text-xs font-mono text-neutral-300">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsGrid;
