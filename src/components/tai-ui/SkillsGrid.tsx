"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";
import { SKILL_CHAPTERS } from "@/data/skills";
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
  const candidate = win.__lenis;
  if (
    candidate &&
    typeof candidate === "object" &&
    "on" in candidate &&
    typeof candidate.on === "function" &&
    "scrollTo" in candidate &&
    typeof candidate.scrollTo === "function"
  ) {
    return candidate as LenisEmitter;
  }
  return undefined;
}

export function SkillsGrid() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // References for desktop GSAP scrubbing
  const deckContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardElementsRef = useRef<(HTMLDivElement | null)[][]>([[], [], []]);
  const chapterHeadingsRef = useRef<(HTMLDivElement | null)[]>([]);
  const railFillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const railItemsRef = useRef<(HTMLButtonElement | null)[]>([]);


  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !stageRef.current) return;

    // Connect Lenis with GSAP ScrollTrigger if Lenis exists on window
    const lenis = getLenis();

    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    if (lenis?.on) {
      lenis.on("scroll", handleLenisScroll);
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Initial state setups
        SKILL_CHAPTERS.forEach((chapter, chIdx) => {
          const deck = deckContainersRef.current[chIdx];
          const heading = chapterHeadingsRef.current[chIdx];
          const cards = cardElementsRef.current[chIdx];

          if (deck) {
            gsap.set(deck, {
              opacity: chIdx === 0 ? 1 : 0,
              pointerEvents: chIdx === 0 ? "auto" : "none",
              y: 0,
            });
          }

          if (heading) {
            gsap.set(heading, {
              opacity: chIdx === 0 ? 1 : 0,
              y: chIdx === 0 ? 0 : 24,
            });
          }

          // Initial card positions
          cards.forEach((cardEl, cardIdx) => {
            if (!cardEl) return;
            if (chIdx === 0 && cardIdx === 0) {
              gsap.set(cardEl, { y: 0, scale: 1, opacity: 1 });
            } else {
              gsap.set(cardEl, { y: 160, scale: 1.04, opacity: 0 });
            }
          });
        });

        // Initialize rail fills
        railFillsRef.current.forEach((fillEl) => {
          if (fillEl) gsap.set(fillEl, { scaleX: 0, transformOrigin: "left center" });
        });

        // Create main scrub timeline pinned to stageRef
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

        // 3 chapters, 10 timeline units each = total duration 30

        // ─── CHAPTER 01 (WEB: 6 cards, t: 0 -> 10) ───
        const webCards = cardElementsRef.current[0];
        // Rail 1 fill from 0 to 1 over t: 0..9.5
        if (railFillsRef.current[0]) {
          tl.to(
            railFillsRef.current[0],
            { scaleX: 1, ease: "none", duration: 9.5, transformOrigin: "left center" },
            0
          );
        }

        // Web cards rise and stack progressively
        // Card 0 resting at start
        // Card 1 arrives at t=1.2..2.3
        if (webCards[1] && webCards[0]) {
          tl.to(
            webCards[1],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            1.2
          ).to(
            webCards[0],
            { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 },
            1.2
          );
        }

        // Card 2 arrives at t=2.5..3.6
        if (webCards[2] && webCards[1] && webCards[0]) {
          tl.to(
            webCards[2],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            2.5
          )
            .to(
              webCards[1],
              { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 },
              2.5
            )
            .to(
              webCards[0],
              { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 },
              2.5
            );
        }
        // Card 3 arrives at t=3.8..4.9
        if (webCards[3]) {
          tl.to(
            webCards[3],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            3.8
          );
          if (webCards[2]) tl.to(webCards[2], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 3.8);
          if (webCards[1]) tl.to(webCards[1], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 3.8);
          if (webCards[0]) tl.to(webCards[0], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 3.8);
        }

        // Card 4 arrives at t=5.1..6.2
        if (webCards[4]) {
          tl.to(
            webCards[4],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            5.1
          );
          if (webCards[3]) tl.to(webCards[3], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 5.1);
          if (webCards[2]) tl.to(webCards[2], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 5.1);
          if (webCards[1]) tl.to(webCards[1], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 5.1);
          if (webCards[0]) tl.to(webCards[0], { y: -56, scale: 0.84, opacity: 0.35, ease: "power2.out", duration: 1.1 }, 5.1);
        }

        // Card 5 arrives at t=6.4..7.5
        if (webCards[5]) {
          tl.to(
            webCards[5],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            6.4
          );
          if (webCards[4]) tl.to(webCards[4], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 6.4);
          if (webCards[3]) tl.to(webCards[3], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 6.4);
          if (webCards[2]) tl.to(webCards[2], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 6.4);
          if (webCards[1]) tl.to(webCards[1], { y: -56, scale: 0.84, opacity: 0.35, ease: "power2.out", duration: 1.1 }, 6.4);
          if (webCards[0]) tl.to(webCards[0], { y: -70, scale: 0.80, opacity: 0.25, ease: "power2.out", duration: 1.1 }, 6.4);
        }

        // Collapse Chapter 01 deck & transition to Chapter 02 (t=8.8..10.0)
        const webDeck = deckContainersRef.current[0];
        const webHeading = chapterHeadingsRef.current[0];
        const devopsDeck = deckContainersRef.current[1];
        const devopsHeading = chapterHeadingsRef.current[1];
        const devopsCards = cardElementsRef.current[1];

        if (webDeck) {
          tl.to(
            webCards.filter(Boolean),
            { y: -100, scale: 0.86, opacity: 0, ease: "power2.in", duration: 1.0, stagger: 0.04 },
            8.8
          ).to(webDeck, { opacity: 0, pointerEvents: "none", duration: 0.3 }, 9.7);
        }

        if (webHeading) {
          tl.to(webHeading, { opacity: 0, y: -20, ease: "power2.in", duration: 0.8 }, 8.8);
        }

        if (devopsHeading) {
          tl.to(devopsHeading, { opacity: 1, y: 0, ease: "power2.out", duration: 0.9 }, 9.5);
        }

        if (devopsDeck && devopsCards[0]) {
          tl.to(devopsDeck, { opacity: 1, pointerEvents: "auto", duration: 0.1 }, 9.8).to(
            devopsCards[0],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.6 },
            9.9
          );
        }

        // ─── CHAPTER 02 (DEVOPS: 6 cards, t: 10 -> 20) ───
        if (railFillsRef.current[1]) {
          tl.to(
            railFillsRef.current[1],
            { scaleX: 1, ease: "none", duration: 9.5, transformOrigin: "left center" },
            10.0
          );
        }

        // DevOps Card 1 arrives at t=11.2..12.3
        if (devopsCards[1] && devopsCards[0]) {
          tl.to(
            devopsCards[1],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            11.2
          ).to(
            devopsCards[0],
            { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 },
            11.2
          );
        }

        // DevOps Card 2 arrives at t=12.5..13.6
        if (devopsCards[2] && devopsCards[1] && devopsCards[0]) {
          tl.to(
            devopsCards[2],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            12.5
          )
            .to(
              devopsCards[1],
              { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 },
              12.5
            )
            .to(
              devopsCards[0],
              { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 },
              12.5
            );
        }
        // DevOps Card 3 arrives at t=13.8..14.9
        if (devopsCards[3]) {
          tl.to(
            devopsCards[3],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            13.8
          );
          if (devopsCards[2]) tl.to(devopsCards[2], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 13.8);
          if (devopsCards[1]) tl.to(devopsCards[1], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 13.8);
          if (devopsCards[0]) tl.to(devopsCards[0], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 13.8);
        }

        // DevOps Card 4 arrives at t=15.1..16.2
        if (devopsCards[4]) {
          tl.to(
            devopsCards[4],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            15.1
          );
          if (devopsCards[3]) tl.to(devopsCards[3], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 15.1);
          if (devopsCards[2]) tl.to(devopsCards[2], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 15.1);
          if (devopsCards[1]) tl.to(devopsCards[1], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 15.1);
          if (devopsCards[0]) tl.to(devopsCards[0], { y: -56, scale: 0.84, opacity: 0.35, ease: "power2.out", duration: 1.1 }, 15.1);
        }

        // DevOps Card 5 arrives at t=16.4..17.5
        if (devopsCards[5]) {
          tl.to(
            devopsCards[5],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            16.4
          );
          if (devopsCards[4]) tl.to(devopsCards[4], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 16.4);
          if (devopsCards[3]) tl.to(devopsCards[3], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 16.4);
          if (devopsCards[2]) tl.to(devopsCards[2], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 16.4);
          if (devopsCards[1]) tl.to(devopsCards[1], { y: -56, scale: 0.84, opacity: 0.35, ease: "power2.out", duration: 1.1 }, 16.4);
          if (devopsCards[0]) tl.to(devopsCards[0], { y: -70, scale: 0.80, opacity: 0.25, ease: "power2.out", duration: 1.1 }, 16.4);
        }

        // Collapse Chapter 02 deck & transition to Chapter 03 (t=18.8..20.0)
        const designerDeck = deckContainersRef.current[2];
        const designerHeading = chapterHeadingsRef.current[2];
        const designerCards = cardElementsRef.current[2];

        if (devopsDeck) {
          tl.to(
            devopsCards.filter(Boolean),
            { y: -100, scale: 0.86, opacity: 0, ease: "power2.in", duration: 1.0, stagger: 0.04 },
            18.8
          ).to(devopsDeck, { opacity: 0, pointerEvents: "none", duration: 0.3 }, 19.7);
        }

        if (devopsHeading) {
          tl.to(devopsHeading, { opacity: 0, y: -20, ease: "power2.in", duration: 0.8 }, 18.8);
        }

        if (designerHeading) {
          tl.to(designerHeading, { opacity: 1, y: 0, ease: "power2.out", duration: 0.9 }, 19.5);
        }

        if (designerDeck && designerCards[0]) {
          tl.to(designerDeck, { opacity: 1, pointerEvents: "auto", duration: 0.1 }, 19.8).to(
            designerCards[0],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.6 },
            19.9
          );
        }

        // ─── CHAPTER 03 (DESIGNER: 5 cards, t: 20 -> 30) ───
        if (railFillsRef.current[2]) {
          tl.to(
            railFillsRef.current[2],
            { scaleX: 1, ease: "none", duration: 9.5, transformOrigin: "left center" },
            20.0
          );
        }

        // Designer Card 1 arrives at t=21.4..22.6
        if (designerCards[1] && designerCards[0]) {
          tl.to(
            designerCards[1],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            21.4
          ).to(
            designerCards[0],
            { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 },
            21.4
          );
        }

        // Designer Card 2 arrives at t=22.8..24.0
        if (designerCards[2] && designerCards[1] && designerCards[0]) {
          tl.to(
            designerCards[2],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            22.8
          )
            .to(
              designerCards[1],
              { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 },
              22.8
            )
            .to(
              designerCards[0],
              { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 },
              22.8
            );
        }
        // Designer Card 3 arrives at t=24.2..25.4
        if (designerCards[3]) {
          tl.to(
            designerCards[3],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            24.2
          );
          if (designerCards[2]) tl.to(designerCards[2], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 24.2);
          if (designerCards[1]) tl.to(designerCards[1], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 24.2);
          if (designerCards[0]) tl.to(designerCards[0], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 24.2);
        }

        // Designer Card 4 arrives at t=25.6..26.8
        if (designerCards[4]) {
          tl.to(
            designerCards[4],
            { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1.1 },
            25.6
          );
          if (designerCards[3]) tl.to(designerCards[3], { y: -14, scale: 0.96, opacity: 0.8, ease: "power2.out", duration: 1.1 }, 25.6);
          if (designerCards[2]) tl.to(designerCards[2], { y: -28, scale: 0.92, opacity: 0.6, ease: "power2.out", duration: 1.1 }, 25.6);
          if (designerCards[1]) tl.to(designerCards[1], { y: -42, scale: 0.88, opacity: 0.45, ease: "power2.out", duration: 1.1 }, 25.6);
          if (designerCards[0]) tl.to(designerCards[0], { y: -56, scale: 0.84, opacity: 0.35, ease: "power2.out", duration: 1.1 }, 25.6);
        }

        // Hold completed designer stack till end of pinned scroll (t=27..30)
        const lastDesignerCard = designerCards[designerCards.length - 1];
        if (lastDesignerCard) {
          tl.to(lastDesignerCard, { duration: 3.2, ease: "none" }, 26.8);
        }
      });
    }, sectionRef);

    return () => {
      if (lenis?.off) {
        lenis.off("scroll", handleLenisScroll);
      }
      ctx.revert();
    };
  }, [prefersReduced]);

  // Click on chapter rail pill to jump smoothly to that chapter's scroll position
  const handleRailClick = (chapterIndex: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetY = sectionStart + (chapterIndex / 3) * sectionHeight;

    const lenis = getLenis();

    if (lenis?.scrollTo) {
      lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER: REDUCED MOTION (Static Grouped Grid)
  // ─────────────────────────────────────────────────────────────
  if (prefersReduced) {
    return (
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="relative z-20 bg-[#08080a] py-24 sm:py-32 border-t border-white/[0.08]"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 space-y-20">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{language === "vi" ? "CÔNG NGHỆ & TAY NGHỀ" : "STACK & CRAFT"}</span>
              </div>
              <h2
                id="skills-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase"
              >
                {language === "vi"
                  ? "NĂNG LỰC KỸ THUẬT · 3 TRỤ CỘT CỐT LÕI"
                  : "TECHNICAL MASTERY · 3 CORE DISCIPLINES"}
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md">
              {language === "vi"
                ? "Tập trung vào hiệu năng thực tế, tính ổn định trong vận hành và kiến trúc tinh gọn."
                : "Zero unnecessary abstraction, verified in production pipelines and micro-interaction benchmarks."}
            </p>
          </div>

          {/* 3 Grouped Chapters */}
          {SKILL_CHAPTERS.map((chapter) => (
            <div key={chapter.id} className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${chapter.accentClass}`}>
                    {chapter.index} / {chapter.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {chapter.title[language]}
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  {chapter.cards.length} {language === "vi" ? "công cụ" : "disciplines"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {chapter.cards.map((card) => (
                  <article
                    key={card.id}
                    className="p-5 sm:p-6 rounded-[10px] bg-[#101014] border border-white/[0.08] flex flex-col justify-between select-none relative"
                  >
                    <div className="skills-card-highlight" />
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <div className="w-10 h-10 rounded-[8px] bg-white/[0.04] border border-white/10 flex items-center justify-center p-2 text-white">
                          <TechLogo name={card.logo} className="w-6 h-6 object-contain" />
                        </div>
                        <span
                          className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-wider border ${chapter.accentBorder} ${chapter.accentBg} ${chapter.accentClass}`}
                        >
                          {chapter.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {card.name}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                        {card.proof[language]}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-[6px] bg-white/[0.04] border border-white/[0.08] text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-500 relative z-10">
                      <span>{card.proofReference ? `PROOF: ${card.proofReference}` : "VERIFIED"}</span>
                      <span className={`font-semibold tracking-wider ${chapter.accentClass}`}>
                        PRODUCTION TESTED
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: STANDARD PROGRESSIVE STACK (Desktop Pinned + Mobile Sticky)
  // ─────────────────────────────────────────────────────────────
  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="relative z-20 bg-[#08080a] text-white border-t border-white/[0.08] md:h-[280vh]"
    >
      {/* ─── DESKTOP PINNED STAGE (>=768px) ─── */}
      <div
        ref={stageRef}
        className="hidden md:flex relative w-full h-screen overflow-hidden flex-col justify-center px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto pointer-events-auto"
      >
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* LEFT COLUMN: Section Header, Progress Rail & Active Chapter Heading */}
          <div className="col-span-12 md:col-span-5 xl:col-span-5 flex flex-col justify-between space-y-8 select-none">
            {/* Header Tag */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{language === "vi" ? "CÔNG NGHỆ & TAY NGHỀ" : "STACK & CRAFT"}</span>
              </div>
              <h2
                id="skills-heading"
                className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight font-sans"
              >
                {language === "vi"
                  ? "NĂNG LỰC KỸ THUẬT · 3 TRỤ CỘT CỐT LÕI"
                  : "TECHNICAL MASTERY · 3 CORE DISCIPLINES"}
              </h2>
            </div>

            {/* Chapter Progress Rail (01 WEB / 02 DEVOPS / 03 DESIGNER) */}
            <nav aria-label="Skill chapters navigation" className="flex items-center gap-3">
              {SKILL_CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  ref={(el) => {
                    railItemsRef.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => handleRailClick(idx)}
                  className="flex-1 flex flex-col gap-1.5 p-2 rounded-[8px] bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label={`Jump to chapter ${ch.index}: ${ch.category}`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                    <span className="text-neutral-400">{ch.index}</span>
                    <span className={ch.accentClass}>{ch.category}</span>
                  </div>
                  {/* Inner Progress Track */}
                  <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      ref={(el) => {
                        railFillsRef.current[idx] = el;
                      }}
                      className="w-full h-full origin-left"
                      style={{ backgroundColor: ch.accentColor }}
                    />
                  </div>
                </button>
              ))}
            </nav>

            {/* Stacked Chapter Headings & Subtitles (Cross-fade via GSAP) */}
            <div className="relative min-h-[140px] pt-2">
              {SKILL_CHAPTERS.map((ch, chIdx) => (
                <div
                  key={ch.id}
                  ref={(el) => {
                    chapterHeadingsRef.current[chIdx] = el;
                  }}
                  className="absolute inset-0 flex flex-col justify-start space-y-2.5 pointer-events-none"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-[6px] border ${ch.accentBorder} ${ch.accentBg} ${ch.accentClass}`}
                    >
                      {ch.index} / {ch.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {ch.label[language]}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    {ch.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-md">
                    {ch.subtitle[language]}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Micro Evidence */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{language === "vi" ? "Cuộn để xem xếp tầng" : "Scroll to inspect stack"}</span>
              <span className="text-emerald-400">GSAP SCRUBBED · 60FPS</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Pinned Deck Stage with Overlapping Cards */}
          <div className="col-span-12 md:col-span-7 xl:col-span-7 flex items-center justify-center relative">
            <div className="relative w-full max-w-[560px] h-[320px] sm:h-[340px] xl:h-[360px]">
              {SKILL_CHAPTERS.map((chapter, chIdx) => (
                <div
                  key={chapter.id}
                  ref={(el) => {
                    deckContainersRef.current[chIdx] = el;
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {chapter.cards.map((card, cardIdx) => (
                    <div
                      key={card.id}
                      ref={(el) => {
                        if (!cardElementsRef.current[chIdx]) {
                          cardElementsRef.current[chIdx] = [];
                        }
                        cardElementsRef.current[chIdx][cardIdx] = el;
                      }}
                      className="absolute inset-0 w-full h-full skills-gpu-accelerated"
                      style={{ zIndex: 10 + cardIdx }}
                    >
                      {/* Inner Card Container with Desktop Hover Lift */}
                      <article className="w-full h-full rounded-[10px] bg-[#101014] border border-white/[0.08] p-6 flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.7)] hover:border-white/20 transition-all duration-200 select-none relative">
                        <div className="skills-card-highlight" />

                        {/* Card Top: Logo + Name + Category Pill */}
                        <div className="space-y-3 relative z-10">
                          <div className="flex items-center justify-between gap-3">
                            <div className="w-10 h-10 rounded-[8px] bg-white/[0.04] border border-white/10 flex items-center justify-center p-2 text-white">
                              <TechLogo name={card.logo} className="w-6 h-6 object-contain" />
                            </div>
                            <span
                              className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-wider border ${chapter.accentBorder} ${chapter.accentBg} ${chapter.accentClass}`}
                            >
                              {chapter.category}
                            </span>
                          </div>

                          <h4 className="text-xl font-bold tracking-tight text-white">
                            {card.name}
                          </h4>

                          <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                            {card.proof[language]}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {card.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-[6px] bg-white/[0.04] border border-white/[0.08] text-neutral-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Bottom Hairline */}
                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400 relative z-10">
                          <span>
                            {card.proofReference ? `PROOF: ${card.proofReference}` : "VERIFIED"}
                          </span>
                          <span className={`font-semibold tracking-wider flex items-center gap-1.5 ${chapter.accentClass}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {language === "vi" ? "THỰC CHỨNG" : "VERIFIED IN PROD"}
                          </span>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE STICKY STACK (<768px) ─── */}
      <div className="block md:hidden py-16 px-4 sm:px-6 space-y-16">
        {/* Mobile Section Header */}
        <div className="space-y-3 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === "vi" ? "CÔNG NGHỆ & TAY NGHỀ" : "STACK & CRAFT"}</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            {language === "vi"
              ? "NĂNG LỰC KỸ THUẬT · 3 TRỤ CỘT CỐT LÕI"
              : "TECHNICAL MASTERY · 3 CORE DISCIPLINES"}
          </h2>
          <p className="text-xs font-mono text-neutral-400">
            {language === "vi"
              ? "Xếp tầng sticky tự nhiên trên thiết bị di động. Chạm hoặc cuộn để khám phá."
              : "Progressive sticky stacking. Scroll or tap to explore each card."}
          </p>
        </div>

        {/* 3 Mobile Chapters with Sticky Cards */}
        {SKILL_CHAPTERS.map((chapter) => (
          <div key={chapter.id} className="space-y-4">
            {/* Chapter Header Sticky Banner */}
            <div className="sticky top-16 z-30 py-3 bg-[#08080a] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] border ${chapter.accentBorder} ${chapter.accentBg} ${chapter.accentClass}`}
                >
                  {chapter.index} / {chapter.category}
                </span>
                <span className="text-xs font-bold text-white tracking-tight">
                  {chapter.title[language]}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                {chapter.cards.length} {language === "vi" ? "thẻ" : "cards"}
              </span>
            </div>

            {/* Sticky Cards Stack Container */}
            <div className="relative flex flex-col pb-12">
              {chapter.cards.map((card, idx) => (
                <article
                  key={card.id}
                  className={`sticky rounded-[10px] bg-[#101014] border border-white/[0.08] p-5 skills-mobile-card flex flex-col justify-between select-none relative min-h-[44px] ${idx > 0 ? "-mt-12" : ""}`}
                  style={{
                    top: `calc(104px + ${idx * 14}px)`,
                    zIndex: 10 + idx,
                  }}
                >
                  <div className="skills-card-highlight" />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-10 h-10 rounded-[8px] bg-white/[0.04] border border-white/10 flex items-center justify-center p-2 text-white">
                        <TechLogo name={card.logo} className="w-6 h-6 object-contain" />
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-wider border ${chapter.accentBorder} ${chapter.accentBg} ${chapter.accentClass}`}
                      >
                        {chapter.category}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {card.name}
                    </h4>

                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {card.proof[language]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-[6px] bg-white/[0.04] border border-white/[0.08] text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400 relative z-10">
                    <span>
                      {card.proofReference ? `PROOF: ${card.proofReference}` : "VERIFIED"}
                    </span>
                    <span className={`font-semibold tracking-wider flex items-center gap-1.5 ${chapter.accentClass}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {language === "vi" ? "THỰC CHỨNG" : "PROD TESTED"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsGrid;
