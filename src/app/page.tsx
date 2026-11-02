"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, copy } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";
import { TaiHeader } from "@/components/tai-ui/TaiHeader";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { HeroSection } from "@/components/tai-ui/HeroSection";
import { SkillsGrid } from "@/components/tai-ui/SkillsGrid";
import { ScrollIndicator } from "@/components/tai-ui/ScrollIndicator";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { ParallaxProductCover } from "@/components/tai-ui/ParallaxProductCover";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";
import { SmoothScroll } from "@/components/tai-ui/SmoothScroll";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { LanguageTransition } from "@/components/tai-ui/LanguageTransition";
import { ScrollTextReveal } from "@/components/tai-ui/ScrollTextReveal";
import { PagePreloader } from "@/components/tai-ui/PagePreloader";
import { StudioFooter } from "@/components/tai-ui/StudioFooter";
import { OceanStirZone } from "@/components/tai-ui/OceanStirZone";
import "./studio.css";

export default function PortfolioPage() {
  const { language } = useLanguage();
  const t = copy[language];
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);


  // Set Browser Title to ThinkAI Studio
  useEffect(() => {
    document.title = "ThinkAI Studio";
  }, []);


  // Chapter 01 Carousel State & Progress Bar
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);




  // Auto-advancing Carousel with Progress Bar Timer
  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((curr) => (curr + 1) % t.carousel.slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeSlide, t.carousel.slides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + t.carousel.slides.length) % t.carousel.slides.length);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % t.carousel.slides.length);
    setProgress(0);
  };



  return (
    <div className="tai-studio-root selection:bg-white selection:text-black relative min-h-screen">
      {/* ─── INITIAL STUDIO PRELOADER SCREEN ─── */}
      <PagePreloader />

      {/* ─── 120HZ ULTRA-SMOOTH MOMENTUM SCROLLING ENGINE (LENIS) ─── */}
      <SmoothScroll isLocked={isAboutOpen || isContactOpen} />

      {/* ─── UNIFIED GLOBAL THREE.JS CANVAS FIXED BACKGROUND (Venice Adriatic Caustics) ─── */}
      <ThreeHalftoneCanvas />

      {/* ─── 01. AUTHENTIC TRANSPARENT HEADER ─── */}
      <TaiHeader
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* ─── 02. HERO SECTION DIRECT OVER THREE.JS CANVAS ─── */}
      <HeroSection />

      {/* ─── 03. TRANSITION SHEET & INTERACTIVE CHAPTER 01 CAROUSEL (Edge-to-Edge Wide) ─── */}
      <section className="relative z-20 bg-[#050508] py-28 sm:py-36 border-t border-white/[0.08] shadow-2xl">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Col (1-4): Carousel Controls with Directional Forward Wipe */}
            <div className="lg:col-span-4 space-y-6">
              {/* Header with Navigation Arrows & Tag */}
              <div className="flex items-center justify-between text-neutral-400 text-sm font-mono pb-3 border-b border-white/[0.08] relative">
                <div className="flex items-center gap-2">
                  <WipeButton
                    onClick={handlePrevSlide}
                    className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer text-sm font-mono"
                    wipeColor="#ffffff"
                    textColor="#ffffff"
                    hoverTextColor="#05070a"
                    ariaLabel={t.carousel.prevSlide}
                  >
                    ←
                  </WipeButton>
                  <WipeButton
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer text-sm font-mono"
                    wipeColor="#ffffff"
                    textColor="#ffffff"
                    hoverTextColor="#05070a"
                    ariaLabel={t.carousel.nextSlide}
                  >
                    →
                  </WipeButton>
                </div>
                <div className="px-2.5 py-1 rounded-xl bg-white/[0.06] text-xs font-mono font-bold text-neutral-200">
                  {t.carousel.slides[activeSlide].tag}
                </div>

                {/* Working Progress Bar */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Animated Carousel Slide Content */}
              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeSlide}-${language}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                      {t.carousel.slides[activeSlide].title}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                      {t.carousel.slides[activeSlide].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Col (5-12): Massive Editorial Headline & Narrative */}
            <div className="lg:col-span-8 space-y-8">
              <ScrollTextReveal
                text={t.carousel.narrativeHeadline}
                as="h3"
                className="text-2xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-white leading-[1.16]"
              />

              <LanguageTransition
                langKey={language}
                as="p"
                className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light max-w-4xl"
              >
                {t.carousel.narrativeBody}
              </LanguageTransition>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04. PRODUCT SHOWCASE (Progressive Disclosure Split Grid) ─── */}
      <section id="products" className="relative z-20 bg-[#040406] py-24 sm:py-32 border-t border-white/[0.08] shadow-2xl">
        <span id="work" className="sr-only" />
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left 2 Cols: Sticky Section Label */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="text-sm sm:text-base font-bold text-neutral-200">
                <LanguageTransition langKey={language} as="span">
                  {t.work.sectionLabel}
                </LanguageTransition>
              </div>
              <LanguageTransition langKey={language} as="span" className="block text-xs text-neutral-500 mt-1">
                {t.work.systemsLive}
              </LanguageTransition>
            </div>

            {/* Right 10 Cols: Asymmetric Split Grid Collection */}
            <div className="lg:col-span-10 divide-y divide-dotted divide-white/20">
              {projects.map((project, index) => {
                const indexStr = String(index + 1).padStart(2, "0");
                const totalStr = String(projects.length).padStart(2, "0");
                return (
                  <div key={project.id} className="py-14 sm:py-16 first:pt-0 last:pb-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Column 1 (Span 7): Media Preview */}
                      <div className="lg:col-span-7">
                        <ParallaxProductCover
                          image={project.preview.image}
                          title={project.content[language].title}
                          liveUrl={project.liveUrl}
                          mark={project.mark}
                          status={t.work.statusLive}
                          priority={index === 0}
                        />
                      </div>

                      {/* Column 2 (Span 5): Editorial SoraLabs Studio Style */}
                      <div className="lg:col-span-5 space-y-6">
                        {/* Micro-tag */}
                        <div>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-medium">
                            {indexStr} / {totalStr} · {project.mark}
                          </span>
                        </div>

                        {/* Title & Category Eyebrow */}
                        <LanguageTransition langKey={language} className="space-y-2">
                          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                            {project.content[language].title}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                            {project.content[language].category}
                          </p>
                        </LanguageTransition>

                        {/* Punchy 2-line Value Proposition Summary */}
                        <LanguageTransition langKey={language} as="p" className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                          {project.content[language].summary}
                        </LanguageTransition>

                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.stack.slice(0, 5).map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-xl text-xs bg-[#141418] text-neutral-200 border border-white/15 hover:border-white/30 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Action Row */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          <WipeButton
                            as="a"
                            href={`/products/${project.id}`}
                            wipeColor="#ffffff"
                            textColor="#ffffff"
                            hoverTextColor="#05070a"
                            borderColor="rgba(255, 255, 255, 0.25)"
                            hoverBorderColor="#ffffff"
                            className="px-5 py-2.5 rounded-xl bg-white/10 text-xs font-semibold shadow-md"
                          >
                            <span>{t.work.exploreCaseStudy}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </WipeButton>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors px-2 py-1"
                            >
                              <span>{t.work.visitLive}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06. SKILLS SECTION (12 Individual Skill Cards with Scroll Stagger) ─── */}
      <SkillsGrid />

      {/* ─── 07. CALL TO ACTION CLOSURE ─── */}
      <section id="contact" className="relative z-10 min-h-[92vh] flex items-center justify-center pt-36 sm:pt-48 pb-28 px-6 bg-transparent pointer-events-none">
        <div className="space-y-10 max-w-5xl text-center flex flex-col items-center justify-center pointer-events-auto">
          {/* Massive Heading */}
          <LanguageTransition langKey={language}>
            <MaskedTextReveal
              as="h2"
              text={t.cta.headline}
              className="tai-heading-xl text-white tracking-tighter drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
            />
          </LanguageTransition>

          {/* Start a project Button with Forward Directional Wipe, Arrow Roll & Bounce */}
          <div className="pt-6">
            <WipeButton
              onClick={() => setIsContactOpen(true)}
              wipeColor="#05070a"
              textColor="#05070a"
              hoverTextColor="#ffffff"
              borderColor="#ffffff"
              hoverBorderColor="rgba(255, 255, 255, 0.4)"
              className="group h-16 sm:h-20 inline-flex items-center justify-center gap-4 sm:gap-5 px-8 sm:px-12 rounded-xl text-xl sm:text-[26px] font-extrabold cursor-pointer shadow-2xl select-none bg-white border border-white active:scale-[0.94] transition-transform duration-150 leading-none"
            >
              <LanguageTransition langKey={language} as="span">
                <ButtonTextRoll
                  text={t.cta.startProject}
                  className="font-extrabold text-xl sm:text-[26px] tracking-tight leading-none"
                />
              </LanguageTransition>
              <ArrowRoll size="lg" />
            </WipeButton>
          </div>
        </div>
      </section>

      {/* ─── 07B. OCEAN STIR INTERACTIVE ZONE ─── */}
      <OceanStirZone />

      {/* ─── 08. STUDIO FOOTER ─── */}
      <StudioFooter
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* ─── 10. ABOUT THE STUDIO DRAWER ─── */}
      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        lang={language}
      />

      {/* ─── 11. CONTACT & PROJECT INQUIRY MODAL ─── */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={language}
      />
      {/* ─── 12. SCROLL INDICATOR RAIL (48px Active / 28px Neighbor / 12px Rest) ─── */}
      <ScrollIndicator />
    </div>
  );
}
