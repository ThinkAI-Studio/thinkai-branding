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
const CARD_HEIGHT = "clamp(200px, 24vh, 230px)";
const DECK_RESERVE = 50;

function SkillCard({
  card,
  language,
  isDesktopDeck = false,
}: {
  card: SkillCardItem;
  chapter?: SkillChapterData;
  language: "en" | "vi";
  isDesktopDeck?: boolean;
}) {
  return (
    <article
      className={`w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden transition-all duration-300 ${
        isDesktopDeck ? "h-full" : ""
      }`}
      style={{
        background: "linear-gradient(180deg, #1d1d26 0%, #131318 60%, #0d0d12 100%)",
        boxShadow:
          "0 24px 50px -12px rgba(0,0,0,0.9), inset 0 1px 0 0 rgba(255,255,255,0.20), 0 0 0 1px rgba(255,255,255,0.12)",
      }}
    >
      {/* Specular ambient top glow for 3D curvature volume */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent pointer-events-none rounded-t-2xl" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/[0.14] flex items-center justify-center p-2 text-white shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_4px_12px_rgba(0,0,0,0.5)]">
            <TechLogo name={card.logo} className="w-6 h-6 object-contain" />
          </div>
          <h4 className="text-base sm:text-lg font-bold tracking-tight text-white truncate">
            {card.name}
          </h4>
        </div>

        <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans line-clamp-2">
          {card.proof[language]}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {card.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.10] text-neutral-200 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function SkillsGrid() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();

  const tagText = language === "vi" ? "CÔNG NGHỆ & TAY NGHỀ" : "STACK & CRAFT";
  const headingText = language === "vi" ? "NĂNG LỰC KỸ THUẬT" : "TECHNICAL MASTERY";
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
            if (cardIdx === 0) {
              gsap.set(cardEl, { y: 0, x: 0, scale: 1.0, rotate: 0, opacity: 1, zIndex: 15 });
            } else if (cardIdx === 1) {
              gsap.set(cardEl, { y: -14, x: -6, scale: 0.96, rotate: -2, opacity: 0.75, zIndex: 14 });
            } else if (cardIdx === 2) {
              gsap.set(cardEl, { y: -26, x: 8, scale: 0.92, rotate: 2.5, opacity: 0.45, zIndex: 13 });
            } else {
              gsap.set(cardEl, { y: -36, x: 0, scale: 0.88, rotate: 0, opacity: 0, zIndex: 10 });
            }
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
              const at = base + 1.2 + (cardIdx - 1) * arrivalStep;

              const prevCard = cards[cardIdx - 1];
              if (prevCard) {
                tl.to(
                  prevCard,
                  {
                    y: -80,
                    x: -12,
                    rotate: -5,
                    scale: 0.93,
                    opacity: 0,
                    duration: 0.85,
                    ease: "power2.inOut",
                  },
                  at
                );
              }

              const activeCard = cards[cardIdx];
              if (activeCard) {
                tl.to(
                  activeCard,
                  {
                    y: 0,
                    x: 0,
                    rotate: 0,
                    scale: 1.0,
                    opacity: 1,
                    zIndex: 15,
                    duration: 0.85,
                    ease: "power2.inOut",
                  },
                  at
                );
              }

              const peek1 = cards[cardIdx + 1];
              if (peek1) {
                tl.to(
                  peek1,
                  {
                    y: -14,
                    x: -6,
                    rotate: -2,
                    scale: 0.96,
                    opacity: 0.75,
                    zIndex: 14,
                    duration: 0.85,
                    ease: "power2.inOut",
                  },
                  at
                );
              }

              const peek2 = cards[cardIdx + 2];
              if (peek2) {
                tl.to(
                  peek2,
                  {
                    y: -26,
                    x: 8,
                    rotate: 2.5,
                    scale: 0.92,
                    opacity: 0.45,
                    zIndex: 13,
                    duration: 0.85,
                    ease: "power2.inOut",
                  },
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
          ? "relative z-20 bg-[#040406] py-24 sm:py-32 border-t border-white/[0.08] overflow-x-clip"
          : "relative z-20 bg-[#040406] text-white border-t border-white/[0.08] overflow-x-clip md:h-[280vh]"
      }
    >
      {prefersReduced ? (
        /* Reduced Motion: Static Grouped Grid */
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 space-y-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
                  {chapter.cards.length} {language === "vi" ? "kỹ năng" : "skills"}
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
              <div className="col-span-12 md:col-span-5 xl:col-span-5 flex flex-col justify-center gap-7 select-none">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{tagText}</span>
                  </div>
                  <h2 id="skills-heading" className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                    {headingText}
                  </h2>
                </div>

                <nav aria-label="Skill chapters navigation" className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
                  {SKILL_CHAPTERS.map((ch, idx) => (
                    <button
                      key={ch.id}
                      ref={(el) => {
                        railItemsRef.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => handleRailClick(idx)}
                      className="flex-1 group py-1.5 px-2 text-left transition-colors cursor-pointer focus-visible:outline-none"
                      aria-label={`Jump to chapter ${ch.index}: ${ch.category}`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-medium pb-2">
                        <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">{ch.index}</span>
                        <span className="text-neutral-300 group-hover:text-white transition-colors tracking-wide">{ch.category}</span>
                      </div>
                      <div className="w-full h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
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

                <div className="relative min-h-[120px] pt-1">
                  {SKILL_CHAPTERS.map((ch, chIdx) => (
                    <div
                      key={ch.id}
                      ref={(el) => {
                        chapterHeadingsRef.current[chIdx] = el;
                      }}
                      className="absolute inset-0 flex flex-col justify-start space-y-2 pointer-events-none"
                    >
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{ch.title[language]}</h3>
                      <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-md">{ch.subtitle[language]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12 md:col-span-7 xl:col-span-7 flex items-center justify-center relative">
                <div
                  className="relative w-full max-w-[480px] xl:max-w-[540px] p-2"
                  style={{ height: `calc(${CARD_HEIGHT} + ${DECK_RESERVE}px)` }}
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
                          style={{ height: CARD_HEIGHT }}
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
          <div className="block md:hidden py-16 px-4 sm:px-6 space-y-12">
            <div className="space-y-2 pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{tagText}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
                {headingText}
              </h2>
            </div>

            {SKILL_CHAPTERS.map((chapter) => (
              <div key={chapter.id} className="space-y-4">
                <div className="sticky top-16 z-20 py-3 bg-[#040406]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold ${chapter.accentClass}`}>
                      {chapter.index} / {chapter.category}
                    </span>
                    <span className="text-xs font-bold text-white tracking-tight">{chapter.title[language]}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {chapter.cards.length} {language === "vi" ? "kỹ năng" : "skills"}
                  </span>
                </div>

                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 px-1 scrollbar-none">
                  {chapter.cards.map((card) => (
                    <div key={card.id} className="w-[84vw] max-w-[340px] shrink-0 snap-center">
                      <SkillCard card={card} chapter={chapter} language={language} />
                    </div>
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
