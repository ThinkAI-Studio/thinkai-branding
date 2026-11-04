"use client";

import React, { useState } from "react";
import { reviews } from "@/data/reviews";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const LOOPS = 2; // duplicate list for seamless -50% loop

function ReviewCard({ review, language }: { review: (typeof reviews)[number]; language: "en" | "vi" }) {
  return (
    <figure className="w-[85vw] max-w-[420px] shrink-0 sm:w-[400px] rounded-xl border border-white/10 bg-[#1E1E1E] p-6 sm:p-7">
      <blockquote className="text-sm sm:text-[15px] leading-[1.7] text-neutral-100 font-light">
        “{review.quote[language]}”
      </blockquote>
      <figcaption className="mt-5 flex flex-col gap-0.5">
        <span className="text-xs font-bold text-white">{review.author[language]}</span>
        <span className="text-[11px] font-mono text-neutral-400">
          {review.role[language]} · {review.product}
        </span>
      </figcaption>
    </figure>
  );
}

export function ReviewMarquee() {
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const duplicated = Array.from({ length: LOOPS }, () => reviews).flat();

  return (
    <section
      aria-label={language === "vi" ? "Đánh giá" : "Reviews"}
      className="relative z-20 bg-[#141414]/55 py-14 sm:py-20 border-t border-white/[0.10] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {language === "vi" ? "Khách hàng nói gì" : "What users say"}
          </h2>
          <button
            type="button"
            onClick={() => setIsPaused((v) => !v)}
            aria-pressed={isPaused}
            aria-label={isPaused ? (language === "vi" ? "Tiếp tục chuyển động" : "Resume motion") : (language === "vi" ? "Dừng chuyển động" : "Pause motion")}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
          >
            {isPaused ? (
              <span aria-hidden="true" className="text-[10px]">▶</span>
            ) : (
              <span aria-hidden="true" className="flex gap-0.5">
                <span className="block w-1 h-3 bg-current rounded-sm" />
                <span className="block w-1 h-3 bg-current rounded-sm" />
              </span>
            )}
            <span>{isPaused ? (language === "vi" ? "Tiếp tục" : "Resume") : (language === "vi" ? "Dừng" : "Pause")}</span>
          </button>
        </div>
      </div>

      {/* Fixed-height band for CLS 0 */}
      <div className="relative h-[260px] sm:h-[280px]">
        {/* Marquee track (motion) */}
        <div
          className="absolute inset-0 flex items-stretch gap-4 px-6 sm:px-12 lg:px-16 overflow-hidden"
          aria-hidden={false}
        >
          <div
            className={cn(
              "flex gap-4 will-change-transform",
              "review-marquee-track",
              isPaused && "review-marquee-paused"
            )}
          >
            {duplicated.map((review, idx) => (
              <ReviewCard key={`${review.id}-${idx}`} review={review} language={language} />
            ))}
          </div>
        </div>

        {/* Static vertical stack (reduced-motion) */}
        <div className="review-marquee-static absolute inset-0 overflow-y-auto px-6 sm:px-12 lg:px-16 hidden">
          <div className="flex flex-col gap-4 pb-2">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} language={language} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .review-marquee-track {
          animation: review-marquee 60s linear infinite;
        }
        .review-marquee-paused {
          animation-play-state: paused !important;
        }
        .review-marquee-track:hover,
        .review-marquee-track:focus-within {
          animation-play-state: paused;
        }
        @keyframes review-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .review-marquee-track { animation: none; }
          .review-marquee-static { display: block !important; }
        }
      `}</style>
    </section>
  );
}
