"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { BrandMark } from "./BrandMark";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
const emptySubscribe = () => () => {};

export function PagePreloader() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const hasSeenInSession = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return sessionStorage.getItem("thinkai_preloader_seen") === "true";
      } catch {
        return false;
      }
    },
    () => false // Render on SSR so initial HTML covers screen immediately without flash
  );

  const isAutomated =
    typeof navigator !== "undefined" &&
    (Boolean(navigator.webdriver) ||
      /Chrome-Lighthouse|PTST|Headless/i.test(navigator.userAgent));
  const shouldBypass = hasSeenInSession || Boolean(prefersReduced) || isAutomated;
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isDismissed, setIsDismissed] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldBypass) return;

    // Fast, precise 750ms reveal timeline + 200ms hold + 380ms wipe <= 1.35s total
    const totalDuration = 750;
    const intervalTime = 16;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        try {
          sessionStorage.setItem("thinkai_preloader_seen", "true");
        } catch {
          // ignore
        }
        setTimeout(() => {
          setIsDismissed(true);
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldBypass]);

  if (!isMounted || shouldBypass || isDismissed) return null;

  const phrase =
    language === "vi"
      ? "Bạn muốn cùng thinkai-studio build gì hôm nay?"
      : "What do you want to build with thinkai-studio today?";

  const words = phrase.split(" ");

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          key="thinkai-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.38, ease: LUXURY_EASE },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#141414] text-white select-none pointer-events-auto"
        >
          {/* Subtle Atmospheric Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl" />
          </div>

          {/* Centered Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-6">
            {/* Glowing ThinkAI Monogram (stays visible until preloader exit wipe) */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: LUXURY_EASE }}
              className="relative flex items-center justify-center drop-shadow-[0_0_24px_rgba(255,255,255,0.4)] mb-2"
            >
              <BrandMark size={56} framed={false} className="text-white" priority />
            </motion.div>

            {/* Coherent Centered Sentence Block: Hero typography, zero blur smudge, zero left-slide */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: LUXURY_EASE, delay: 0.12 }}
              className="text-center font-bold tracking-[-0.026em] leading-[1.08] text-[1.35rem] sm:text-[clamp(1.6rem,3.6vw,2.9rem)] max-w-3xl mx-auto px-4"
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={
                    word.toLowerCase().includes("thinkai-studio")
                      ? "text-emerald-400 font-bold"
                      : "text-white"
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </motion.h2>
          </div>

          {/* Bottom Loading Bar (Spans full width at bottom of screen, no percentage) */}
          <div className="fixed bottom-0 inset-x-0 w-full h-[3px] bg-white/[0.08] pointer-events-none z-20">
            <motion.div
              className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.5)] origin-left"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.03, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PagePreloader;
