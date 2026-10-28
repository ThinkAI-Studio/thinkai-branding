"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Lock, Terminal, ShieldCheck, Activity } from "lucide-react";
import { TAI_EASE } from "@/lib/motion";

interface ProductMockupProps {
  title: string;
  headline?: string;
  description?: string;
  domain: string;
  type?: "homelab" | "thinkai";
}

const SCREENSHOTS = {
  homelab: "/images/products/hostdeck-screen.png",
  thinkai: "/images/products/thinkai-screen.png",
};

export function ProductMockup({
  title,
  domain,
  type = "homelab",
}: ProductMockupProps) {
  const prefersReduced = useReducedMotion();
  const screenSrc = SCREENSHOTS[type];
  const [, setIsHovered] = useState(false);

  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.98, y: 24 };

  const whileInView = prefersReduced
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        ease: TAI_EASE.luxury,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-[16px] overflow-hidden border border-white/[0.08] bg-[#0a0a0c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_60px_-15px_rgba(0,0,0,0.9)] group transition-all duration-500 hover:border-white/[0.22] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_32px_80px_-15px_rgba(0,0,0,0.95)]"
    >
      {/* ─── LUXURY BROWSER WINDOW HEADER ─── */}
      <div className="px-4 sm:px-5 py-3 border-b border-white/[0.06] bg-[#0c0c0e] flex items-center justify-between gap-3 select-none">
        {/* Left: Window Traffic Dots + App Category */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-[#ff5f56] transition-colors duration-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-[#ffbd2e] transition-colors duration-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-[#27c93f] transition-colors duration-300" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 pl-2 text-[11px] font-mono font-bold text-white/50 uppercase tracking-wider">
            <Terminal className="w-3 h-3 text-white/40" />
            <span>{type === "homelab" ? "HOSTDECK · OPERATIONS CONSOLE" : "THINKAI · DELIVERY PIPELINE"}</span>
          </div>
        </div>

        {/* Center: Real Omnibar URL Capsule with SSL Lock */}
        <div className="flex-1 max-w-sm mx-auto">
          <a
            href={`https://${domain}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-3.5 py-1 rounded-[10px] bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.18] text-white/70 hover:text-white transition-all duration-300 font-mono text-[11px] truncate shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] group/url"
          >
            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="truncate font-semibold tracking-tight text-white/80 group-hover/url:text-white">
              {domain}
            </span>
            <ArrowUpRight className="w-3 h-3 text-white/40 group-hover/url:text-white shrink-0 ml-0.5 transition-colors" />
          </a>
        </div>

        {/* Right: Telemetry Latency Indicator */}
        <div className="hidden sm:flex items-center gap-2 shrink-0 text-[10.5px] font-mono text-white/50">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse tai-led-glow" />
            LIVE
          </span>
          <span className="text-white/40">24ms</span>
        </div>
      </div>

      {/* ─── MAIN PREVIEW VIEWPORT (CLICKABLE LIVE DEMO PREVIEW) ─── */}
      <a
        href={`https://${domain}`}
        target="_blank"
        rel="noreferrer"
        className="relative w-full aspect-[16/10] overflow-hidden bg-[#060608] block cursor-pointer group/viewport"
        aria-label={`Open live preview of ${domain}`}
      >
        {/* Screenshot Image with Smooth Luxury Scale */}
        <Image
          src={screenSrc}
          alt={`${title} live screenshot preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          priority
        />

        {/* Subtle Diagonal Glass Glare Sweep on Hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
        />

        {/* Dark Vignette Frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

        {/* Floating Quick Action Badge on Hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/45">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-white text-black font-mono font-bold text-xs tracking-wider shadow-2xl transform scale-95 group-hover:scale-100 transition-transform duration-300">
            <span>VISIT {domain.toUpperCase()}</span>
            <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
          </div>
        </div>
      </a>

      {/* ─── BOTTOM PRODUCTION STATUS & TELEMETRY BAR ─── */}
      <div className="px-4 sm:px-5 py-2.5 border-t border-white/[0.06] bg-[#0c0c0e] flex items-center justify-between text-[11px] font-mono text-white/50 select-none">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-white/80 font-bold uppercase tracking-wider text-[10.5px]">
            {type === "homelab" ? "HOMELAB V4 · GITOPS DEPLOYED" : "PRODUCTION ACTIVE · SAST VERIFIED"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10.5px] text-white/50 font-mono">
          <span className="hidden sm:inline-block text-white/35">
            {type === "homelab" ? "ROOTLESS PODMAN · K3S" : "DOCKER COMPOSE · NGINX"}
          </span>
          <span className="flex items-center gap-1 text-white/70 font-semibold">
            <Activity className="w-3 h-3 text-cyan-400" /> 100% SLO
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductMockup;
