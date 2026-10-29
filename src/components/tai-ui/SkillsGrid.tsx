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

/* ─────────────────────────────────────────────────────────────
   Deck choreography constants (single scrubbed timeline, 30 units)
   ───────────────────────────────────────────────────────────── */
const CHAPTER_UNITS = 10;

// Entrance: the card fades in while parked fully below the deck box,
// then rises over the stack while completely opaque.
const ENTRANCE_FROM_Y_PERCENT = 115;
const ENTRANCE_FROM_SCALE = 0.97;
const ENTRANCE_FADE_DURATION = 0.15;
const ENTRANCE_RISE_DURATION = 1.05;
const FIRST_ARRIVAL_AT = 1.35;
const ARRIVAL_STEP = 1.35;

// Recessed cards fan upward behind the active front card. Y spacing is tuned
// so each sheet still peeks ~26px over the card below it after the 3% scale
// shrink (peek ≈ |STEP_Y| − STEP_SCALE × height / 2).
const BEHIND_STEP_Y = -34;
const BEHIND_STEP_SCALE = 0.03;
// Ladders stay high-end because a dimmed near-black surface over the
// near-black page reads as nothing — sheets must survive dimming.
const BEHIND_OPACITIES = [0.95, 0.82, 0.7, 0.58, 0.46];

// One fixed desktop card size for every chapter (the deck box adds a fan
// reserve above the card area so recessed sheets stay inside the clip).
const CARD_HEIGHT = "clamp(420px,52vh,500px)";
// Max fan extent = 5 depths × (|STEP_Y| − scale lift ≈ 27px) + margin.
const DECK_FAN_RESERVE = 160;

const COLLAPSE_AT = 8.55;

interface StackDepthState {
  y: number;
  scale: number;
  opacity: number;
  /** Opacity of the sheet surface overlay (1 once the card sits behind depth 0). */
  face: number;
  /** Opacity of the card's inner content (0 for every recessed card). */
  contentVeil: number;
}

function stackStateFor(depth: number): StackDepthState {
  if (depth <= 0) return { y: 0, scale: 1, opacity: 1, face: 0, contentVeil: 1 };
  const step = Math.min(depth, BEHIND_OPACITIES.length);
  return {
    y: BEHIND_STEP_Y * step,
    scale: 1 - BEHIND_STEP_SCALE * step,
    opacity: BEHIND_OPACITIES[step - 1],
    face: 1,
    contentVeil: 0,
  };
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
        SKILL_CHAPTERS.forEach((_, chIdx) => {
          const deck = deckContainersRef.current[chIdx];
          const heading = chapterHeadingsRef.current[chIdx];
          const cards = (cardElementsRef.current[chIdx] ?? []).filter(Boolean) as HTMLDivElement[];

          if (deck) {
            gsap.set(deck, {
              opacity: chIdx === 0 ? 1 : 0,
              pointerEvents: chIdx === 0 ? "auto" : "none",
            });
          }

          if (heading) {
            gsap.set(heading, {
              opacity: chIdx === 0 ? 1 : 0,
              y: chIdx === 0 ? 0 : 24,
            });
          }

          cards.forEach((cardEl, cardIdx) => {
            const isFront = chIdx === 0 && cardIdx === 0;
            gsap.set(cardEl, {
              yPercent: isFront ? 0 : ENTRANCE_FROM_Y_PERCENT,
              y: 0,
              scale: isFront ? 1 : ENTRANCE_FROM_SCALE,
              opacity: isFront ? 1 : 0,
            });
            const face = cardEl.querySelector(".skills-deck-sheet-face");
            if (face) gsap.set(face, { opacity: 0 });
            const contentNodes = cardEl.querySelectorAll(
              ".skills-card-content, .skills-card-highlight"
            );
            if (contentNodes.length) gsap.set(contentNodes, { opacity: 1 });
          });
        });

        railFillsRef.current.forEach((fillEl) => {
          if (fillEl) gsap.set(fillEl, { scaleX: 0, transformOrigin: "left center" });
        });

        // One scrubbed timeline pinned to the stage: 3 chapters x 10 units.
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
          const deck = deckContainersRef.current[chIdx] ?? undefined;
          const heading = chapterHeadingsRef.current[chIdx] ?? undefined;
          const cards = (cardElementsRef.current[chIdx] ?? []).filter(Boolean) as HTMLDivElement[];

          // Chapter rail fill
          const railFill = railFillsRef.current[chIdx];
          if (railFill) {
            tl.to(railFill, { scaleX: 1, ease: "none", duration: 9.5, transformOrigin: "left center" }, base);
          }

          if (chIdx > 0) {
            // Cross-fade chapter heading, then reveal the new deck
            if (heading) {
              tl.to(heading, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, base - 0.45);
            }
            if (deck) {
              tl.to(deck, { opacity: 1, pointerEvents: "auto", duration: 0.05, ease: "none" }, base - 0.05);
            }
          }

          /**
           * Arrival: the new card first fades in while parked below the deck
           * (over empty background, never over stacked content), then rises
           * over the stack fully opaque so no text ever bleeds through it.
           */
          const arrive = (card: HTMLDivElement, at: number) => {
            const face = card.querySelector(".skills-deck-sheet-face");
            if (face) {
              tl.set(face, { opacity: 0 }, at);
            }
            const contentNodes = card.querySelectorAll(
              ".skills-card-content, .skills-card-highlight"
            );
            if (contentNodes.length) {
              tl.set(contentNodes, { opacity: 1 }, at);
            }
            tl.fromTo(
              card,
              { opacity: 0 },
              { opacity: 1, duration: ENTRANCE_FADE_DURATION, ease: "none", immediateRender: false },
              at
            );
            tl.fromTo(
              card,
              { yPercent: ENTRANCE_FROM_Y_PERCENT, y: 0, scale: ENTRANCE_FROM_SCALE },
              {
                yPercent: 0,
                y: 0,
                scale: 1,
                duration: ENTRANCE_RISE_DURATION,
                ease: "power3.out",
                immediateRender: false,
              },
              at + ENTRANCE_FADE_DURATION
            );
          };

          // Chapter opening: first card rises as the chapter starts.
          if (chIdx > 0 && cards[0]) {
            arrive(cards[0], base + 0.05);
          }

          // Progressive arrivals of the remaining cards: every card takes part
          // in the deck so the overlapping stack is visible through the chapter.
          for (let cardIdx = 1; cardIdx < cards.length; cardIdx++) {
            const card = cards[cardIdx];
            if (!card) continue;
            const at = base + FIRST_ARRIVAL_AT + (cardIdx - 1) * ARRIVAL_STEP;
            arrive(card, at);

            // Recess previously stacked cards one depth step back
            for (let depth = 1; depth <= cardIdx; depth++) {
              const behind = cards[cardIdx - depth];
              if (!behind) continue;
              const from = stackStateFor(depth - 1);
              const to = stackStateFor(depth);
              const time = at + ENTRANCE_FADE_DURATION;
              tl.fromTo(
                behind,
                { y: from.y, scale: from.scale, opacity: from.opacity },
                {
                  y: to.y,
                  scale: to.scale,
                  opacity: to.opacity,
                  duration: ENTRANCE_RISE_DURATION,
                  ease: "power2.out",
                  immediateRender: false,
                },
                time
              );

              // Discrete face swap: when a card steps behind the front
              // position (depth === 1), instantly reveal the sheet face
              // and hide the content nodes via zero-duration discrete set.
              if (depth === 1) {
                const face = behind.querySelector(".skills-deck-sheet-face");
                if (face) {
                  tl.set(face, { opacity: 1 }, time);
                }
                const contentNodes = behind.querySelectorAll(
                  ".skills-card-content, .skills-card-highlight"
                );
                if (contentNodes.length) {
                  tl.set(contentNodes, { opacity: 0 }, time);
                }
              }
            }
          }

          // Chapter close: cards peel away (front first) then deck & heading fade
          if (chIdx < lastChapterIdx) {
            cards.forEach((card, cardIdx) => {
              if (!card) return;
              const depth = cards.length - 1 - cardIdx; // 0 = front card
              const state = stackStateFor(depth);
              tl.fromTo(
                card,
                { y: state.y, scale: state.scale, opacity: state.opacity },
                {
                  y: state.y - 70,
                  scale: Math.max(0.78, state.scale - 0.05),
                  opacity: 0,
                  duration: 0.95,
                  ease: "power2.in",
                  immediateRender: false,
                },
                base + COLLAPSE_AT + (cards.length - 1 - cardIdx) * 0.05
              );
            });
            if (deck) {
              tl.to(deck, { opacity: 0, pointerEvents: "none", duration: 0.4, ease: "none" }, base + 9.55);
            }
            if (heading) {
              tl.to(heading, { opacity: 0, y: -18, duration: 0.7, ease: "power2.in" }, base + 8.7);
            }
          }
          // Final chapter simply holds its completed stack until the pin ends.
        });
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

  const cardSurfaceH4 = "text-xl xl:text-2xl font-bold tracking-tight text-white";
  const cardSurfaceProof = "text-[13px] xl:text-sm text-neutral-300 leading-relaxed font-sans";
  const cardSurfaceTags = "text-[10px] font-mono px-2 py-0.5 rounded-[6px] bg-white/[0.04] border border-white/[0.08] text-neutral-400";

  // ─────────────────────────────────────────────────────────────
  // RENDER: single <section> hosts both variants so the element
  // is never replaced after hydration / matchMedia swaps.
  // ─────────────────────────────────────────────────────────────
  return (
    <section
      id="skills"
      ref={prefersReduced ? undefined : sectionRef}
      aria-labelledby="skills-heading"
      className={
        prefersReduced
          ? "relative z-20 bg-[#08080a] py-24 sm:py-32 border-t border-white/[0.08]"
          : "relative z-20 bg-[#08080a] text-white border-t border-white/[0.08] md:h-[280vh]"
      }
    >
      {prefersReduced ? (
        /* ─── REDUCED MOTION (Static Grouped Grid) ─── */
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
      ) : (
        <>
          {/* ─── DESKTOP PINNED STAGE (>=768px) ─── */}
          <div
            ref={stageRef}
            className="hidden md:flex relative w-full h-screen overflow-hidden flex-col px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto pointer-events-auto"
          >
            <div className="grid flex-1 min-h-0 grid-cols-12 gap-8 lg:gap-12 items-center w-full py-10">
              {/* LEFT COLUMN: Section Header, Progress Rail & Active Chapter Heading */}
              <div className="col-span-12 md:col-span-5 xl:col-span-5 flex flex-col justify-center gap-9 select-none">
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
                      className="flex-1 flex flex-col gap-1.5 p-2.5 rounded-[8px] bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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
              </div>

              {/* RIGHT COLUMN: Pinned Deck Stage with Overlapping Cards */}
              <div className="col-span-12 md:col-span-7 xl:col-span-7 flex items-center justify-center relative">
                {/* Deck clip zone: fixed card height + a 160px reserve above so
                    recessed sheets fan inside the clip, entrance cards are
                    hidden until they enter the bounds, and nothing spills. */}
                <div
                  className="relative w-full max-w-[420px] xl:max-w-[460px] overflow-hidden -translate-y-20"
                  style={{
                    height: `calc(${CARD_HEIGHT} + ${DECK_FAN_RESERVE}px)`,
                  }}
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
                            if (!cardElementsRef.current[chIdx]) {
                              cardElementsRef.current[chIdx] = [];
                            }
                            cardElementsRef.current[chIdx][cardIdx] = el;
                          }}
                          className="absolute inset-x-0 bottom-0 skills-gpu-accelerated"
                          style={{ zIndex: 10 + cardIdx, height: CARD_HEIGHT }}
                        >
                          {/* Inner Card Container with Desktop Hover Lift */}
                          <article className="w-full h-full rounded-[10px] bg-[#101014] border border-white/[0.08] p-6 xl:p-7 flex flex-col justify-between shadow-[0_18px_44px_rgba(0,0,0,0.75)] hover:border-white/20 transition-all duration-200 select-none relative">


                            <div className="skills-card-highlight" />

                            {/* Card Body: Logo + Chapter Pill + Name + Proof + Tags */}
                            <div className="skills-card-content space-y-4 relative z-10">
                              <div className="flex items-center justify-between gap-3">
                                <div className="w-12 h-12 rounded-[8px] bg-white/[0.04] border border-white/10 flex items-center justify-center p-2.5 text-white">
                                  <TechLogo name={card.logo} className="w-7 h-7 object-contain" />
                                </div>
                                <span
                                  className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-wider border ${chapter.accentBorder} ${chapter.accentBg} ${chapter.accentClass}`}
                                >
                                  {chapter.category}
                                </span>
                              </div>

                              <h4 className={cardSurfaceH4}>{card.name}</h4>

                              <p className={cardSurfaceProof}>{card.proof[language]}</p>

                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {card.tags.map((tag) => (
                                  <span key={tag} className={cardSurfaceTags}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {/* Card Bottom: Hairline Row */}
                            <div className="skills-card-content pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400 relative z-10">
                              <span>
                                {card.proofReference ? `PROOF: ${card.proofReference}` : "VERIFIED"}
                              </span>
                              <span className={`font-semibold tracking-wider flex items-center gap-1.5 ${chapter.accentClass}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {language === "vi" ? "THỰC CHỨNG" : "VERIFIED IN PROD"}
                              </span>
                            </div>
                          </article>

                          {/* Recessed sheet surface: fades in once the card
                              steps behind the front card, keeping the dimmed
                              slab readable against the page background. */}
                          <div className="skills-deck-sheet-face" aria-hidden="true" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll hint pinned near the bottom of the stage */}
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
        </>
      )}
    </section>
  );
}

export default SkillsGrid;
