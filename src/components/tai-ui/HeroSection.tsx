"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { LanguageTransition } from "@/components/tai-ui/LanguageTransition";
import { useLanguage } from "@/context/LanguageContext";
import { copy } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { language } = useLanguage();
  const t = copy[language];
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !frameRef.current || !sectionRef.current) return;

    // Inset frame scale-down tuck on scroll: scaleX 0.96 / scaleY 0.90, power2.in, scrubbed
    const ctx = gsap.context(() => {
      gsap.to(frameRef.current, {
        scaleX: 0.96,
        scaleY: 0.90,
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 95%",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="hero-three relative z-10 min-h-screen h-screen min-h-[100dvh] p-[clamp(8px,calc(2.5vw-8px),16px)] flex items-center justify-center bg-transparent pointer-events-none"
    >
      {/* ─── INSET FRAME WITH MEASURED TUCK ON SCROLL ─── */}
      <div
        ref={frameRef}
        className="hero-three__frame relative w-full h-full rounded-[16px] border border-white/[0.08] overflow-hidden flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 bg-[#08080a]/30 backdrop-blur-[2px] shadow-2xl pointer-events-none"
        style={{ transformOrigin: "center center" }}
      >
        {/* Subtle Atmospheric Radial Spotlight for High-Contrast Hero Separation */}
        <div className="absolute inset-0 max-w-5xl mx-auto -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(4,6,10,0.68)_0%,rgba(4,6,10,0.32)_50%,transparent_78%)] blur-2xl" />

        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-7 pointer-events-auto relative z-10">
          {/* ThinkAI Authentic Floating Eyebrow */}
          <LanguageTransition
            langKey={language}
            className="text-xs sm:text-[13.5px] font-mono font-bold tracking-[0.24em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase select-none"
          >
            {t.hero.eyebrow}
          </LanguageTransition>

          {/* ThinkAI Grotesque Masked Headline with High-Contrast Optical Shadow */}
          <LanguageTransition langKey={language} className="py-1 sm:py-2">
            <MaskedTextReveal
              as="h1"
              text={t.hero.headline}
              className="tai-heading-hero text-white tracking-[-0.026em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_36px_rgba(0,0,0,0.90)] drop-shadow-[0_24px_64px_rgba(0,0,0,0.80)]"
            />
          </LanguageTransition>

          {/* ThinkAI Floating Subline */}
          <LanguageTransition
            langKey={language}
            className="text-xs sm:text-[13.5px] font-mono font-medium tracking-[0.20em] text-neutral-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase max-w-2xl mx-auto leading-relaxed select-none px-4"
          >
            {t.hero.subline}
          </LanguageTransition>
        </div>
      </div>
    </section>
  );
}
