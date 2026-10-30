"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";
import { SKILL_CHAPTERS, type SkillCardItem, type SkillChapterData } from "@/data/skills";
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

/* Deck choreography constants (single scrubbed timeline, 30 units) */
const CHAPTER_UNITS = 10;
const CARD_HEIGHT = "clamp(420px, 52vh, 500px)";
const DECK_FAN_RESERVE = 140;
const BEHIND_STEP_Y = -22;
const BEHIND_STEP_SCALE = 0.02;

function SkillCard({
  card,
  chapter,
  language,
  isDesktopDeck = false,
}: {
  card: SkillCardItem;
  chapter: SkillChapterData;
  language: "en" | "vi";
  isDesktopDeck?: boolean;
}) {
  return (
    <article
      className={`w-full rounded-[10px] border border-white/10 p-5 sm:p-6 xl:p-7 flex flex-col justify-between shadow-[0_16px_36px_rgba(0,0,0,0.7)] hover:border-white/20 transition-colors duration-200 select-none relative ${
        isDesktopDeck ? "h-full" : ""
      }`}
      style={{ backgroundColor: "#101014" }}
    >
      <div className="skills-card-highlight" />
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[8px] bg-white/[0.04] border border-white/10 flex items-center justify-center p-2.5 text-white">
            <TechLogo name={card.logo} className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
          </div>
          <span className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-wider border ${chapter.accentBorder} ${chapter.accentBg} ${chapter.accentClass}`}>
            {chapter.category}
          </span>
        </div>
        <h4 className="text-xl xl:text-2xl font-bold tracking-tight text-white">{card.name}</h4>
        <p className="text-[13px] xl:text-sm text-neutral-300 leading-relaxed font-sans">{card.proof[language]}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {card.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-[6px] bg-white/[0.04] border border-white/[0.08] text-neutral-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400 relative z-10">
        <span>{card.proofReference ? `PROOF: ${card.proofReference}` : "VERIFIED"}</span>
        <span className={`font-semibold tracking-wider flex items-center gap-1.5 ${chapter.accentClass}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {language === "vi" ? "THỰC CHỨNG" : "VERIFIED IN PROD"}
        </span>
      </div>
    </article>
  );
}

export function SkillsGrid() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();

  const tagText = language === "vi" ? "CÔNG NGHỆ & TAY NGHỀ" : "STACK & CRAFT";
  const headingText = language === "vi" ? "NĂNG LỰC KỸ THUẬT · 3 TRỤ CỘT CỐT LÕI" : "TECHNICAL MASTERY · 3 CORE DISCIPLINES";
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const deckContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardElementsRef = useRef<(HTMLDivElement | null)[][]>([[], [], []]);
  const chapterHeadingsRef = useRef<(HTMLDivElement | null)[]>([]);
  const railFillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const railItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !stageRef.current) return;

    const lenis = getLenis();
    const handleLenisScroll = () => ScrollTrigger.update();
    if (lenis?.on) lenis.on("scroll", handleLenisScroll);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        SKILL_CHAPTERS.forEach((_, chIdx) => {
          const deck = deckContainersRef.current[chIdx];
          const heading = chapterHeadingsRef.current[chIdx];
          const cards = (cardElementsRef.current[chIdx] ?? []).filter(Boolean) as HTMLDivElement[];

          if (deck) {
            gsap.set(deck, {
              opacity: chIdx === 0 ? 1 : 0,
              y: chIdx === 0 ? 0 : 20,
              pointerEvents: chIdx === 0 ? "auto" : "none",
            });
          }
          if (heading) {
            gsap.set(heading, { opacity: chIdx === 0 ? 1 : 0, y: chIdx === 0 ? 0 : 20 });
          }
          cards.forEach((cardEl, cardIdx) => {
            gsap.set(cardEl, {
              y: cardIdx === 0 ? 0 : 40,
              scale: 1,
              clipPath: cardIdx === 0 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
            });
          });
        });

        railFillsRef.current.forEach((fillEl) => {
          if (fillEl) gsap.set(fillEl, { scaleX: 0, transformOrigin: "left center" });
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

        const lastChapterIdx = SKILL_CHAPTERS.length - 1;

        SKILL_CHAPTERS.forEach((_, chIdx) => {
          const base = chIdx * CHAPTER_UNITS;
          const deck = deckContainersRef.current[chIdx];
          const heading = chapterHeadingsRef.current[chIdx];
          const cards = (cardElementsRef.current[chIdx] ?? []).filter(Boolean) as HTMLDivElement[];

          const railFill = railFillsRef.current[chIdx];
          if (railFill) {
            tl.to(railFill, { scaleX: 1, ease: "none", duration: 9.6 }, base);
          }

          const numSubsequentCards = cards.length - 1;
          if (numSubsequentCards > 0) {
            const arrivalStep = 7.0 / numSubsequentCards;
            for (let cardIdx = 1; cardIdx < cards.length; cardIdx++) {
              const card = cards[cardIdx];
              if (!card) continue;
              const at = base + 1.2 + (cardIdx - 1) * arrivalStep;
              tl.set(card, { clipPath: "inset(0 0 0 0)" }, at);
              tl.fromTo(
                card,
                { y: 40, scale: 1 },
                { y: 0, scale: 1, duration: 0.85, ease: "power2.out" },
                at
              );

              for (let depth = 1; depth <= cardIdx; depth++) {
                const behindCard = cards[cardIdx - depth];
                if (!behindCard) continue;
                const targetY = BEHIND_STEP_Y * depth;
                const targetScale = 1 - BEHIND_STEP_SCALE * depth;

                tl.to(
                  behindCard,
                  { y: targetY, scale: targetScale, duration: 0.85, ease: "power2.out" },
                  at
                );
              }
            }
          }

          if (chIdx < lastChapterIdx) {
            const nextDeck = deckContainersRef.current[chIdx + 1];
            const nextHeading = chapterHeadingsRef.current[chIdx + 1];

            if (deck) {
              tl.to(deck, { opacity: 0, y: -24, duration: 0.7, ease: "power2.in" }, base + 9.2);
              tl.set(deck, { pointerEvents: "none" }, base + 10);
            }
            if (heading) {
              tl.to(heading, { opacity: 0, y: -16, duration: 0.7, ease: "power2.in" }, base + 9.2);
            }
            if (nextDeck) {
              tl.fromTo(nextDeck, { opacity: 0, y: 24 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.7, ease: "power2.out" }, base + 9.9);
            }
            if (nextHeading) {
              tl.fromTo(nextHeading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, base + 9.9);
            }
          }
        });
      });
    }, sectionRef);

    return () => {
      if (lenis?.off) lenis.off("scroll", handleLenisScroll);
      ctx.revert();
    };
  }, [prefersReduced]);

  const handleRailClick = (chapterIndex: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const targetY = sectionStart + (chapterIndex / SKILL_CHAPTERS.length) * scrollableDistance;

    const lenis = getLenis();
    if (lenis?.scrollTo) {
      lenis.scrollTo(targetY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="skills"
      ref={prefersReduced ? undefined : sectionRef}
      aria-labelledby="skills-heading"
      className={
        prefersReduced
          ? "relative z-20 bg-[#08080a] py-24 sm:py-32 border-t border-white/[0.08] overflow-x-clip"
          : "relative z-20 bg-[#08080a] text-white border-t border-white/[0.08] overflow-x-clip md:h-[280vh]"
      }
    >
      {prefersReduced ? (
        /* Reduced Motion: Static Grouped Grid */
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 space-y-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{tagText}</span>
              </div>
              <h2 id="skills-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
                {headingText}
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md">
              {language === "vi"
                ? "Tập trung vào hiệu năng thực tế, tính ổn định trong vận hành và kiến trúc tinh gọn."
                : "Zero unnecessary abstraction, verified in production pipelines and micro-interaction benchmarks."}
            </p>
          </div>

          {SKILL_CHAPTERS.map((chapter) => (
            <div key={chapter.id} className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${chapter.accentClass}`}>
                    {chapter.index} / {chapter.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">{chapter.title[language]}</h3>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {chapter.cards.length} {language === "vi" ? "thẻ" : "cards"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {chapter.cards.map((card) => (
                  <SkillCard key={card.id} card={card} chapter={chapter} language={language} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Desktop Pinned Stage (>=768px) */}
          <div
            ref={stageRef}
            className="hidden md:flex relative w-full h-screen overflow-hidden flex-col px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto pointer-events-auto"
          >
            <div className="grid flex-1 min-h-0 grid-cols-12 gap-8 lg:gap-12 items-center w-full py-10">
              <div className="col-span-12 md:col-span-5 xl:col-span-5 flex flex-col justify-center gap-9 select-none">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{tagText}</span>
                  </div>
                  <h2 id="skills-heading" className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white uppercase font-sans leading-tight">
                    {headingText}
                  </h2>
                </div>

                <nav aria-label="Skill chapters navigation" className="flex items-center gap-3">
                  {SKILL_CHAPTERS.map((ch, idx) => (
                    <button
                      key={ch.id}
                      ref={(el) => {
                        railItemsRef.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => handleRailClick(idx)}
                      className="flex-1 flex flex-col gap-1.5 p-2.5 rounded-[8px] bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      aria-label={`Jump to chapter ${ch.index}: ${ch.category}`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                        <span className="text-neutral-400">{ch.index}</span>
                        <span className={ch.accentClass}>{ch.category}</span>
                      </div>
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

                <div className="relative min-h-[150px] pt-2">
                  {SKILL_CHAPTERS.map((ch, chIdx) => (
                    <div
                      key={ch.id}
                      ref={(el) => {
                        chapterHeadingsRef.current[chIdx] = el;
                      }}
                      className="absolute inset-0 flex flex-col justify-start space-y-2.5 pointer-events-none"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-[6px] border ${ch.accentBorder} ${ch.accentBg} ${ch.accentClass}`}>
                          {ch.index} / {ch.category}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">{ch.label[language]}</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{ch.title[language]}</h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-md">{ch.subtitle[language]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12 md:col-span-7 xl:col-span-7 flex items-center justify-center relative">
                <div
                  className="relative w-full max-w-[420px] xl:max-w-[460px] overflow-hidden rounded-[10px]"
                  style={{ height: `calc(${CARD_HEIGHT} + ${DECK_FAN_RESERVE}px)` }}
                >
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
                            if (!cardElementsRef.current[chIdx]) cardElementsRef.current[chIdx] = [];
                            cardElementsRef.current[chIdx][cardIdx] = el;
                          }}
                          className="absolute inset-x-0 bottom-0 skills-gpu-accelerated"
                          style={{ zIndex: 10 + cardIdx, height: CARD_HEIGHT }}
                        >
                          <SkillCard card={card} chapter={chapter} language={language} isDesktopDeck />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-6 border-t border-white/[0.08] pt-4 pb-6 text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-6">
                <span>{language === "vi" ? "Cuộn để xem xếp tầng" : "Scroll to inspect stack"}</span>
                <span className="text-emerald-400 flex items-center gap-2">
                  GSAP SCRUBBED · 60FPS
                  <span aria-hidden="true" className="animate-bounce">↓</span>
                </span>
              </span>
            </div>
          </div>

          {/* Mobile Vertical List (<768px) */}
          <div className="block md:hidden py-16 px-4 sm:px-6 space-y-16">
            <div className="space-y-3 pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{tagText}</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
                {headingText}
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                {language === "vi"
                  ? "Kiến trúc tinh gọn, hiệu năng thực tế. Cuộn để khám phá từng thẻ năng lực."
                  : "Zero unnecessary abstraction, verified in production. Scroll to explore each capability."}
              </p>
            </div>

            {SKILL_CHAPTERS.map((chapter) => (
              <div key={chapter.id} className="space-y-4">
                <div className="sticky top-16 z-20 py-3 bg-[#08080a]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] border ${chapter.accentBorder} ${chapter.accentBg} ${chapter.accentClass}`}>
                      {chapter.index} / {chapter.category}
                    </span>
                    <span className="text-xs font-bold text-white tracking-tight">{chapter.title[language]}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {chapter.cards.length} {language === "vi" ? "thẻ" : "cards"}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {chapter.cards.map((card) => (
                    <SkillCard key={card.id} card={card} chapter={chapter} language={language} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default SkillsGrid;
