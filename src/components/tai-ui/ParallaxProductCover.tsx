"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Lock, ArrowUpRight } from "lucide-react";

interface ParallaxProductCoverProps {
  image: string;
  title: string;
  liveUrl?: string;
  mark: string;
  status?: string;
  priority?: boolean;
}

export function ParallaxProductCover({
  image,
  title,
  liveUrl,
  mark,
  status = "LIVE",
  priority = false,
}: ParallaxProductCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking from container entering viewport to exiting viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Precise scroll-driven parallax physics with smooth viewport scrub:
  // - 0.0 (entering view): offset upwards (-8% / -60px)
  // - 0.5 (centered in viewport): perfectly centered (0%)
  // - 1.0 (exiting top of view): offset downwards (+8% / +60px)
  const yTransform = useTransform(scrollYProgress, [0, 0.5, 1], ["-8%", "0%", "8%"]);
  const y = shouldReduceMotion ? "0%" : yTransform;

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full bg-[#0a0a0d] border border-white/10 hover:border-white/25 transition-colors duration-500 rounded-xl overflow-hidden group shadow-2xl select-none"
    >
      {/* Parallax Image Layer with 1.15 Scale for Edge-to-Edge Scrubbing */}
      <motion.div
        style={{ y, scale: shouldReduceMotion ? 1 : 1.15 }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority={priority}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Hairline Specular Inset Border */}
      <div className="absolute inset-0 pointer-events-none rounded-xl border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

      {/* Floating Status Pill (Top Right) */}
      <div className="tai-product-pill absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-white/15 font-mono text-[10px] text-emerald-400 font-bold tracking-wider ">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>{status}</span>
      </div>

      {/* Floating Mark Pill (Top Left) */}
      <div className="tai-product-pill absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-xl border border-white/15 font-mono text-[10px] text-neutral-300 font-bold ">
        <span>{mark}</span>
      </div>
      {/* Floating Domain Pill (Bottom Left) */}
      {liveUrl && (
        <div className="absolute bottom-3.5 left-3.5 z-10">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="tai-product-pill-link flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/20 hover:border-white font-mono text-xs text-neutral-200 hover:text-white transition-all shadow-lg group/link"
          >
            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-[280px]">
              {liveUrl.replace("https://", "")}
            </span>
            <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover/link:text-white transition-colors" />
          </a>
        </div>
      )}
    </div>
  );
}
