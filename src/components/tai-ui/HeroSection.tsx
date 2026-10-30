"use client";

import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { LanguageTransition } from "@/components/tai-ui/LanguageTransition";
import { useLanguage } from "@/context/LanguageContext";
import { copy } from "@/data/portfolio";

export function HeroSection() {
  const { language } = useLanguage();
  const t = copy[language];


  return (
    <section
      id="top"
      className="hero-three relative z-10 h-[100svh] min-h-[100svh] lg:h-[100lvh] lg:min-h-[100lvh] flex items-center justify-center bg-transparent pointer-events-none px-6 pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-7 pointer-events-auto text-center relative z-10">
        {/* 1. ThinkAI Authentic Floating Eyebrow */}
        <LanguageTransition
          langKey={language}
          className="text-xs sm:text-[13.5px] font-mono font-bold tracking-[0.24em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase select-none"
        >
          {t.hero.eyebrow}
        </LanguageTransition>

        {/* 2. ThinkAI Grotesque Masked Headline with High-Contrast Optical Shadow */}
        <LanguageTransition langKey={language} className="py-1 sm:py-2">
          <MaskedTextReveal
            as="h1"
            text={t.hero.headline}
            className="tai-heading-hero text-white tracking-[-0.026em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_36px_rgba(0,0,0,0.90)] drop-shadow-[0_24px_64px_rgba(0,0,0,0.80)]"
          />
        </LanguageTransition>

        {/* 3. ThinkAI Floating Subline */}
        <LanguageTransition
          langKey={language}
          className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.22em] text-neutral-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase max-w-2xl mx-auto leading-relaxed select-none px-4"
        >
          {t.hero.subline}
        </LanguageTransition>
      </div>
    </section>
  );
}
