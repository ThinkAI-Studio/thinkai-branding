"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
const emptySubscribe = () => () => {};

export function PagePreloader() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const hasSeenInSession = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return sessionStorage.getItem("thinkai_preloader_seen") === "true";
      } catch {
        return false;
      }
    },
    () => true
  );

  const shouldBypass = !isClient || hasSeenInSession || Boolean(prefersReduced);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldBypass) return;

    const totalDuration = 1800;
    const intervalTime = 16;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setIsFinishing(true);
        try {
          sessionStorage.setItem("thinkai_preloader_seen", "true");
        } catch {
          // ignore quota/storage errors
        }
        setTimeout(() => {
          setIsDismissed(true);
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldBypass]);

  if (shouldBypass || isDismissed) return null;

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
            transition: { duration: 0.75, ease: LUXURY_EASE },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#040406] text-white select-none pointer-events-auto"
        >
          {/* Subtle Atmospheric Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl" />
          </div>

          {/* Centered Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-6">
            {/* Glowing ThinkAI Monogram */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={isFinishing ? { scale: 0.9, opacity: 0, y: -20 } : { scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
              className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center drop-shadow-[0_0_24px_rgba(255,255,255,0.4)] mb-2"
            >
              <Image
                src="/images/thinkai_studio_logo.png"
                alt="ThinkAI Studio"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Staggered Animated Phrase ("nhảy chạy ra từ từ và chạy biến mất cùng thời điểm load xong") */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5"
              animate={
                isFinishing
                  ? { y: -28, opacity: 0, filter: "blur(8px)" }
                  : { y: 0, opacity: 1, filter: "blur(0px)" }
              }
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
            >
              {words.map((word, idx) => (
                <span key={`${word}-${idx}`} className="inline-block overflow-hidden py-1">
                  <motion.span
                    initial={{ y: 36, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + idx * 0.07,
                      ease: LUXURY_EASE,
                    }}
                    className={cn(
                      "inline-block font-sans font-medium text-xl sm:text-3xl lg:text-4xl tracking-tight",
                      word.toLowerCase().includes("thinkai-studio")
                        ? "text-emerald-400 font-bold drop-shadow-[0_0_20px_rgba(74,222,128,0.45)]"
                        : "text-white"
                    )}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Bottom Loading Bar (Spans full width at bottom of screen, no percentage) */}
          <div className="fixed bottom-0 inset-x-0 w-full h-[3px] bg-white/[0.08] pointer-events-none z-20">
            <motion.div
              className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.5)] origin-left"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PagePreloader;
