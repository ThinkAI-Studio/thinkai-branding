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
const CHAPTER_UNITS = 12;
const CARD_HEIGHT = "clamp(380px, 48vh, 440px)";

function SkillCard({
  card,
  chapter,
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
      className={`w-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between select-none relative overflow-hidden transition-all duration-300 ${
        isDesktopDeck ? "h-full" : ""
      }`}
      style={{
        background: "linear-gradient(180deg, #1e1e28 0%, #13131a 55%, #0c0c10 100%)",
        boxShadow:
          "0 30px 60px -15px rgba(0,0,0,0.95), inset 0 1px 0 0 rgba(255,255,255,0.22), 0 0 0 1px rgba(255,255,255,0.14)",
      }}
    >
      {/* Specular ambient top glow for 3D curvature volume */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent pointer-events-none rounded-t-3xl" />

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.07] border border-white/[0.14] flex items-center justify-center p-2.5 text-white shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_6px_16px_rgba(0,0,0,0.5)]">
            <TechLogo name={card.logo} className="w-7 h-7 object-contain" />
          </div>
          {chapter && (
            <span className={`text-xs font-mono font-bold tracking-wider ${chapter.accentClass}`}>
              {chapter.category}
            </span>
          )}
        </div>

        <div className="space-y-1.5 pt-2">
          <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {card.name}
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
          {card.proof[language]}
        </p>
      </div>

      <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5 relative z-10">
        {card.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.10] text-neutral-200 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            {tag}
          </span>
        ))}
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
            gsap.set(cardEl, {
              y: cardIdx === 0 ? 0 : 50,
              x: 0,
              scale: cardIdx === 0 ? 1 : 0.94,
              rotate: 0,
              opacity: cardIdx === 0 ? 1 : 0,
              zIndex: 10 + cardIdx,
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
            tl.to(railFill, { scaleX: 1, ease: "none", duration: 11.5 }, base);
          }

          const numCards = cards.length;
          const numSubsequentCards = numCards - 1;

          // 1. REVEAL PHASE: hiện từng skill trong stack
          if (numSubsequentCards > 0) {
            const stepDuration = 5.8 / numSubsequentCards;
            for (let cardIdx = 1; cardIdx < numCards; cardIdx++) {
              const at = base + 0.8 + (cardIdx - 1) * stepDuration;
              const card = cards[cardIdx];
              const prevCard = cards[cardIdx - 1];
              const rot = cardIdx % 2 === 1 ? -2.5 : 2.5;

              if (prevCard) {
                tl.to(
                  prevCard,
                  {
                    scale: 0.96,
                    y: -14,
                    duration: 0.75,
                    ease: "power2.out",
                  },
                  at
                );
              }

              if (card) {
                tl.set(card, { opacity: 1 }, at);
                tl.fromTo(
                  card,
                  { y: 50, scale: 0.94, rotate: rot * 2 },
                  { y: 0, scale: 1.0, rotate: rot, duration: 0.75, ease: "power2.out" },
                  at
                );
              }
            }
          }

          // 2. MERGE PHASE: hiện hết các skills rồi mới gộp stack đó thành 1
          const mergeAt = base + 7.6;
          cards.forEach((cardEl) => {
            tl.to(
              cardEl,
              {
                y: 0,
                x: 0,
                rotate: 0,
                scale: 1.0,
                duration: 0.8,
                ease: "power3.inOut",
              },
              mergeAt
            );
          });

          // 3. TRANSITION PHASE: rồi mới chuyển sang stack tiếp theo
          if (chIdx < lastChapterIdx) {
            const nextDeck = deckContainersRef.current[chIdx + 1];
            const nextHeading = chapterHeadingsRef.current[chIdx + 1];

            tl.to(deck, { opacity: 0, y: -40, scale: 0.9, duration: 0.8, ease: "power2.in" }, base + 9.5);
            tl.set(deck, { pointerEvents: "none" }, base + 10.5);
            if (heading) {
              tl.to(heading, { opacity: 0, y: -16, duration: 0.7, ease: "power2.in" }, base + 9.5);
            }
            if (nextDeck) {
              tl.fromTo(
                nextDeck,
                { opacity: 0, y: 50, scale: 0.92 },
                { opacity: 1, y: 0, scale: 1.0, pointerEvents: "auto", duration: 0.8, ease: "power2.out" },
                base + 10.5
              );
            }
            if (nextHeading) {
              tl.fromTo(
                nextHeading,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
                base + 10.5
              );
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
              <div className="col-span-12 md:col-span-6 xl:col-span-6 flex flex-col justify-center gap-7 select-none">
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

              <div className="col-span-12 md:col-span-6 xl:col-span-6 flex items-center justify-center relative">
                <div
                  className="relative w-full max-w-[340px] xl:max-w-[370px]"
                  style={{ height: CARD_HEIGHT }}
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
                          className="absolute inset-0 skills-gpu-accelerated"
                          style={{ height: "100%" }}
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
                    <div key={card.id} className="w-[78vw] max-w-[290px] h-[400px] shrink-0 snap-center">
                      <SkillCard card={card} chapter={chapter} language={language} isDesktopDeck />
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
