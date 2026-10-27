"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
const emptySubscribe = () => () => {};

export function PagePreloader() {
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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldBypass) return;

    const totalDuration = 1000;
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
          // ignore quota/storage errors
        }
        setTimeout(() => {
          setIsDismissed(true);
        }, 180);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldBypass]);

  if (shouldBypass || isDismissed) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          key="thinkai-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: LUXURY_EASE },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08080a] text-white select-none pointer-events-auto"
        >
          {/* Subtle Atmospheric Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[420px] h-[420px] rounded-full bg-white/[0.03] blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            {/* Glowing ThinkAI Monogram */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]"
            >
              <Image
                src="/images/thinkai_studio_logo.png"
                alt="ThinkAI Studio"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Digital Monospace Counter */}
            <div className="font-mono text-5xl sm:text-6xl font-extrabold tracking-tight text-white tabular-nums">
              {String(count).padStart(2, "0")}
              <span className="text-2xl sm:text-3xl font-bold text-neutral-500 ml-1">%</span>
            </div>

            {/* System Status Label */}
            <div className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.24em] text-neutral-400 uppercase">
              THINKAI STUDIO · INITIALIZING SYSTEMS
            </div>

            {/* Micro Progress Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PagePreloader;
