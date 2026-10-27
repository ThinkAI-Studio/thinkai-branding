"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
} from "lucide-react";
import { TAI_EASE } from "@/lib/motion";

// ─── DATA CHO 3 SẢN PHẨM CHỦ LỰC ───
const PRODUCTS = [
  {
    id: "hostdeck",
    index: "01",
    total: "03",
    mark: "SYS",
    title: "HostDeck",
    category: "Bare-Metal Homelab Operations Console",
    headline: "Real-Time Telemetry & Container Orchestration",
    desc: "Autonomous homelab management console monitoring bare-metal nodes, thermal throttling matrix, rootless Podman containers, and automated SQLite backup schedules.",
    domain: "hostdeck.thinkai.id.vn",
    image: "/images/products/hostdeck-screen.png",
    metricValue: "2.4 ms",
    metricLabel: "Telemetry Latency • 99.9% Uptime",
    cliCommand: "curl -fsSL https://hostdeck.thinkai.id.vn/install.sh | bash",
    stack: ["Go", "Podman", "Tailscale", "SQLite", "systemd", "WebSocket"],
    status: "LIVE",
    tag: "OPS",
  },
  {
    id: "thinkai-backend",
    index: "02",
    total: "03",
    mark: "K3S",
    title: "ThinkAI Delivery Pipeline",
    category: "Zero-Trust GitOps Delivery Flow",
    headline: "Automated K3s DevSecOps & Rootless Sandboxing",
    desc: "Enterprise-grade continuous delivery pipeline powering education services. Built with lightweight K3s, SAST CodeQL/SonarQube security gates, and self-healing ingress.",
    domain: "learning.thinkai.id.vn",
    image: "/images/products/thinkai-screen.png",
    metricValue: "0-Trust",
    metricLabel: "100% Automated Deployment Flow • SAST Verified",
    cliCommand: "git push origin main && argo app sync thinkai-prod",
    stack: ["K3s", "Argo CD", "SonarQube", "CodeQL", "Docker", "Tailscale"],
    status: "ACTIVE",
    tag: "SEC",
  },
  {
    id: "thinkai-ui",
    index: "03",
    total: "03",
    mark: "UI",
    title: "ThinkAI UI",
    category: "Decentralized Architectural UI Registry",
    headline: "0px Sharp Geometry & Obsidian Monochromatic Depth",
    desc: "Decentralized, CLI-driven UI component registry with 47 infrastructure-grade primitives. Crafted with 0px sharp geometry, obsidian depth, and mechanical spring physics.",
    domain: "ui.thinkai.id.vn",
    image: "/images/products/thinkai-ui-screen.png",
    metricValue: "CLI",
    metricLabel: "npx thinkai-ui init • 47 Components Ready",
    cliCommand: "npx thinkai-ui init",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Motion", "Radix UI"],
    status: "READY",
    tag: "CLI",
  },
];

export default function CardsPreviewPage() {
  const [activeType, setActiveType] = useState<"all" | "split" | "console" | "rail" | "bento">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Type 2 Console Active Product State
  const [consoleIndex, setConsoleIndex] = useState(0);

  // Type 3 Rail Horizontal Scroll Ref
  const railScrollRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Keyboard shortcut 1, 2, 3 cho Type 2 Console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1") setConsoleIndex(0);
      if (e.key === "2") setConsoleIndex(1);
      if (e.key === "3") setConsoleIndex(2);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollRail = (direction: "left" | "right") => {
    if (railScrollRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      railScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 selection:bg-white selection:text-black font-sans antialiased">
      {/* ─── TOP CONTROL BAR (STICKY NAV) ─── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0c0c0e]/95 backdrop-blur-md px-6 sm:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase font-bold text-white">
            THINKAI STUDIO · PRODUCT CARDS PROTOTYPE LAB
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 font-mono text-[10px] bg-white/[0.06] text-neutral-400 border border-white/[0.08]">
            4 PARADIGMS
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#141417] p-1 border border-white/[0.08]">
          {[
            { id: "all", label: "ALL 4 TYPES" },
            { id: "split", label: "01. EDITORIAL SPLIT" },
            { id: "console", label: "02. SYSTEMS CONSOLE" },
            { id: "rail", label: "03. KINETIC RAIL" },
            { id: "bento", label: "04. BENTO GRID" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id as "all" | "split" | "console" | "rail" | "bento")}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeType === tab.id
                  ? "bg-white text-black font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 sm:px-12 py-16 space-y-32">

        {/* ═════════════════════════════════════════════════════════════════════════
            TYPE 01: EDITORIAL SPLIT GRID CARDS (Asymmetric 7:5 Ratio + Dotted Hairlines)
           ═════════════════════════════════════════════════════════════════════════ */}
        {(activeType === "all" || activeType === "split") && (
          <section id="split-grid" className="space-y-12">
            {/* Header Badge */}
            <div className="border-b border-white/[0.08] pb-6 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] uppercase tracking-wider font-bold">
                  <span>TYPE 01</span>
                  <span className="text-emerald-500/40">/</span>
                  <span>EDITORIAL SPLIT GRID (7:5 ASYMMETRIC)</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                  Editorial Split Cards
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-3xl">
                  Bố cục 12 cột bất đối xứng: Cột trái (7 cột) chứa hình ảnh preview tỷ lệ 1:1 vuông vức, cột phải (5 cột) chứa micrographic header, bộ đếm phân số, mô tả cô đọng và khối telemetry kết quả. Ngăn cách nhau bằng đường 1px dotted tinh tế.
                </p>
              </div>
              <div className="font-mono text-xs text-neutral-500 bg-white/[0.03] p-3 border border-white/[0.06]">
                Height: Variable • Vertical Reduction: ~55%
              </div>
            </div>

            {/* Layout Grid: Left Sticky Products Label + Right Collection */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Sticky Label */}
              <div className="lg:col-span-2 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-200">
                  <span className="w-2.5 h-2.5 bg-emerald-400" />
                  <span className="uppercase tracking-wider">Products</span>
                </div>
                <span className="block text-xs font-mono text-neutral-500 mt-2">
                  03 Live Systems
                </span>
              </div>

              {/* Right Column: Collection List with Dotted Borders */}
              <div className="lg:col-span-10 divide-y divide-dotted divide-white/20">
                {PRODUCTS.map((prod) => (
                  <div key={prod.id} className="py-12 first:pt-0 last:pb-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Left: 1:1 Square Cover Media (Span 7) */}
                      <div className="lg:col-span-7">
                        <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full bg-[#0c0c0e] border border-white/[0.08] overflow-hidden group shadow-2xl">
                          {/* Traffic bar */}
                          <div className="px-4 py-2.5 bg-[#121215] border-b border-white/[0.06] flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 bg-white/20" />
                              <span className="w-2 h-2 bg-white/20" />
                              <span className="w-2 h-2 bg-white/20" />
                              <span className="font-mono text-[10px] text-neutral-400 pl-2 uppercase">
                                {prod.mark} {"//"} {prod.id}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
                              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                              <span>{prod.status}</span>
                            </div>
                          </div>

                          {/* Image preview with smooth scale on hover */}
                          <div className="relative w-full h-[calc(100%-37px)] overflow-hidden bg-[#060608]">
                            <Image
                              src={prod.image}
                              alt={prod.title}
                              fill
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            {/* Inner hairline overlay */}
                            <div className="absolute inset-0 pointer-events-none border border-white/[0.04]" />
                          </div>

                          {/* Domain Pill Overlay */}
                          <div className="absolute bottom-3 left-3 z-10">
                            <a
                              href={`https://${prod.domain}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 font-mono text-[11px] text-neutral-200 hover:text-white hover:border-white transition-colors"
                            >
                              <Lock className="w-2.5 h-2.5 text-emerald-400" />
                              <span>{prod.domain}</span>
                              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right: Editorial & Micrographic Telemetry (Span 5) */}
                      <div className="lg:col-span-5 space-y-6">
                        {/* Micrographic Header: [MARK] ─── ● ─── 01/03 */}
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="px-2 py-0.5 bg-white/[0.06] text-white border border-white/[0.1] font-bold">
                            {prod.mark}
                          </span>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="h-[1px] flex-1 bg-white/20" />
                            <div className="w-1.5 h-1.5 bg-emerald-400" />
                            <div className="h-[1px] flex-1 bg-white/20" />
                          </div>
                          <span className="px-2 py-0.5 border border-white/20 text-neutral-400 font-semibold">
                            {prod.index} / {prod.total}
                          </span>
                        </div>

                        {/* Title & Headline */}
                        <div className="space-y-2">
                          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
                            {prod.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-wide">
                            {prod.category}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-md">
                          {prod.desc}
                        </p>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {prod.stack.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 font-mono text-[11px] bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Telemetry Result Block */}
                        <div className="p-4 bg-[#0d0d10] border border-white/[0.08] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-white text-black font-mono text-xs font-bold">
                                {prod.tag}
                              </span>
                              <span className="font-mono text-xs font-bold text-emerald-400">
                                {prod.metricValue}
                              </span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(prod.cliCommand, `split-${prod.id}`)}
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 border border-white/10 font-mono text-xs transition-colors"
                            >
                              {copiedId === `split-${prod.id}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">COPIED</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-neutral-400" />
                                  <span>COPY CLI</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="font-mono text-[11px] text-neutral-400 truncate">
                            {prod.metricLabel}
                          </p>
                        </div>

                        {/* Action CTA */}
                        <div>
                          <a
                            href={`https://${prod.domain}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                          >
                            <span>Open System</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═════════════════════════════════════════════════════════════════════════
            TYPE 02: MASTER-DETAIL SYSTEMS CONSOLE (Unified Stage + Ledger Tabs)
           ═════════════════════════════════════════════════════════════════════════ */}
        {(activeType === "all" || activeType === "console") && (
          <section id="master-detail-console" className="space-y-12">
            {/* Header Badge */}
            <div className="border-b border-white/[0.08] pb-6 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-[11px] uppercase tracking-wider font-bold">
                  <span>TYPE 02</span>
                  <span className="text-cyan-500/40">/</span>
                  <span>MASTER-DETAIL SYSTEMS CONSOLE</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                  Unified Master Stage Console
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-3xl">
                  Gom toàn bộ 3 sản phẩm vào một khung điều khiển duy nhất (chiều cao cố định ~620px). Cột trái là menu Master Ledger cho phép chuyển đổi tức thì giữa các sản phẩm (hỗ trợ phím tắt [1], [2], [3]), cột phải là Live Stage hiển thị mockup và telemetry tương ứng.
                </p>
              </div>
              <div className="font-mono text-xs text-neutral-500 bg-white/[0.03] p-3 border border-white/[0.06]">
                Height: Fixed ~620px • Vertical Reduction: ~75%
              </div>
            </div>

            {/* The Unified Console Frame */}
            <div className="border border-white/[0.12] bg-[#0c0c0e] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]">
              {/* Console Window Header */}
              <div className="px-5 py-3 border-b border-white/[0.08] bg-[#121215] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-red-500/80" />
                    <span className="w-2.5 h-2.5 bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
                    THINKAI STUDIO // ARCHITECTURAL CONTROL DESK
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
                  <span className="hidden sm:inline-block">Shortcuts: Press [1], [2], [3]</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    SYSTEMS NOMINAL
                  </span>
                </div>
              </div>

              {/* Console Body: Split Ledger (Left 4 cols) & Live Stage (Right 8 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
                {/* Left: Master Ledger Menu (4 Cols) */}
                <div className="lg:col-span-4 border-r border-white/[0.08] bg-[#0a0a0c] flex flex-col justify-between">
                  <div className="divide-y divide-white/[0.06]">
                    {PRODUCTS.map((prod, idx) => {
                      const isActive = consoleIndex === idx;
                      return (
                        <button
                          key={prod.id}
                          onClick={() => setConsoleIndex(idx)}
                          className={`w-full text-left p-6 transition-all relative block ${
                            isActive
                              ? "bg-white/[0.06] text-white"
                              : "hover:bg-white/[0.02] text-neutral-400"
                          }`}
                        >
                          {/* Active Hairline Indicator on Left */}
                          {isActive && (
                            <motion.div
                              layoutId="console-active-bar"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 font-mono text-xs">
                              <span className="px-1.5 py-0.5 bg-white/10 text-neutral-200 border border-white/10 font-bold">
                                [{idx + 1}]
                              </span>
                              <span className="font-bold text-neutral-300">{prod.mark}</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 font-mono text-[10px] font-bold ${
                                isActive
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-white/[0.04] text-neutral-500"
                              }`}
                            >
                              {prod.status}
                            </span>
                          </div>

                          <h4 className="text-xl font-bold tracking-tight text-white mb-1">
                            {prod.title}
                          </h4>
                          <p className="text-xs font-mono text-neutral-400 line-clamp-1 mb-3">
                            {prod.category}
                          </p>

                          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/[0.04]">
                            <span className="text-neutral-500">Telemetry:</span>
                            <span className="text-emerald-400 font-bold">{prod.metricValue}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Ledger Footer Status */}
                  <div className="p-5 border-t border-white/[0.08] bg-[#0d0d10] font-mono text-[11px] text-neutral-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Cluster Sync:</span>
                      <span className="text-emerald-400 font-bold">100% OK</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Control Engine:</span>
                      <span className="text-white">Next.js 16 + React 19</span>
                    </div>
                  </div>
                </div>

                {/* Right: Dynamic Live Stage (8 Cols) */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between bg-[#0e0e11] overflow-hidden">
                  <AnimatePresence mode="wait">
                    {(() => {
                      const current = PRODUCTS[consoleIndex];
                      return (
                        <motion.div
                          key={current.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.35, ease: TAI_EASE.luxury }}
                          className="space-y-6 flex-1 flex flex-col justify-between"
                        >
                          {/* Top Meta Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                            <div>
                              <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
                                <span>{current.mark} RUNTIME</span>
                                <span className="text-white/20">•</span>
                                <span className="text-emerald-400 font-bold">{current.metricLabel}</span>
                              </div>
                              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                                {current.title}
                              </h3>
                            </div>

                            <a
                              href={`https://${current.domain}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 px-3.5 py-1.5 bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-colors"
                            >
                              <span>Visit Live</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          {/* Center: Live Mockup Viewport */}
                          <div className="relative aspect-[16/9] w-full border border-white/[0.1] bg-black overflow-hidden shadow-2xl">
                            <Image
                              src={current.image}
                              alt={current.title}
                              fill
                              className="object-cover object-top"
                            />
                            {/* Live Domain Capsule */}
                            <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 border border-white/20 font-mono text-[11px] text-white flex items-center gap-2">
                              <Lock className="w-2.5 h-2.5 text-emerald-400" />
                              <span>{current.domain}</span>
                            </div>
                          </div>

                          {/* Bottom Story & CLI Bar */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
                            <div className="sm:col-span-7">
                              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                                {current.desc}
                              </p>
                            </div>
                            <div className="sm:col-span-5">
                              <div className="p-3 bg-[#141418] border border-white/[0.08] flex items-center justify-between gap-2">
                                <code className="font-mono text-[11px] text-neutral-300 truncate">
                                  {current.cliCommand}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(current.cliCommand, `console-${current.id}`)}
                                  className="p-1 text-neutral-400 hover:text-white shrink-0"
                                  title="Copy CLI command"
                                >
                                  {copiedId === `console-${current.id}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═════════════════════════════════════════════════════════════════════════
            TYPE 03: KINETIC HORIZONTAL RAIL (Filmstrip Snap Track)
           ═════════════════════════════════════════════════════════════════════════ */}
        {(activeType === "all" || activeType === "rail") && (
          <section id="kinetic-rail" className="space-y-12">
            {/* Header Badge */}
            <div className="border-b border-white/[0.08] pb-6 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono text-[11px] uppercase tracking-wider font-bold">
                  <span>TYPE 03</span>
                  <span className="text-purple-500/40">/</span>
                  <span>KINETIC HORIZONTAL RAIL</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                  Filmstrip Horizontal Snap Track
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-3xl">
                  Dạng băng chuyền ngang (filmstrip rail) có chế độ snap tự động và nút điều hướng PREV/NEXT. Toàn bộ 3 sản phẩm dàn hàng ngang với kích thước đồng đều, không làm tăng chiều dọc website dù bổ sung bao nhiêu sản phẩm.
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollRail("left")}
                  className="p-2.5 bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollRail("right")}
                  className="p-2.5 bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* The Horizontal Rail Container */}
            <div
              ref={railScrollRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="min-w-[340px] sm:min-w-[480px] lg:min-w-[520px] snap-center bg-[#0c0c0e] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  {/* Card Header Media */}
                  <div className="relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-white/[0.08]">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] border border-white/20 font-bold">
                        {prod.mark} {"//"} {prod.index}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-emerald-500/20 backdrop-blur-md text-emerald-400 font-mono text-[10px] border border-emerald-500/30 font-bold">
                        {prod.metricValue}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] text-neutral-400 uppercase">
                        {prod.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {prod.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                        {prod.desc}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {prod.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 font-mono text-[10px] bg-white/[0.03] text-neutral-400 border border-white/[0.06]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* CLI Quick Action */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                      <button
                        onClick={() => copyToClipboard(prod.cliCommand, `rail-${prod.id}`)}
                        className="flex-1 py-2 px-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-neutral-300 flex items-center justify-center gap-2 transition-colors"
                      >
                        {copiedId === `rail-${prod.id}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-neutral-400" />
                            <span>COPY CLI</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://${prod.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-white text-black hover:bg-neutral-200 transition-colors"
                        aria-label={`Open ${prod.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═════════════════════════════════════════════════════════════════════════
            TYPE 04: ASYMMETRIC BENTO GRID (Dynamic Hierarchy)
           ═════════════════════════════════════════════════════════════════════════ */}
        {(activeType === "all" || activeType === "bento") && (
          <section id="asymmetric-bento" className="space-y-12">
            {/* Header Badge */}
            <div className="border-b border-white/[0.08] pb-6 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[11px] uppercase tracking-wider font-bold">
                  <span>TYPE 04</span>
                  <span className="text-amber-500/40">/</span>
                  <span>ASYMMETRIC BENTO GRID</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                  Dynamic Hierarchical Bento
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-3xl">
                  Bố cục Bento Grid phân tầng: Dành 1 thẻ Hero cỡ lớn toàn quyền cho Flagship Product (ThinkAI UI) với đầy đủ live workbench và CLI copy; bên dưới là 2 thẻ vệ tinh kích thước 50/50 cho HostDeck và ThinkAI Pipeline.
                </p>
              </div>
              <div className="font-mono text-xs text-neutral-500 bg-white/[0.03] p-3 border border-white/[0.06]">
                Density: High • Visual Hierarchy: Maximum
              </div>
            </div>

            {/* Bento Grid: 1 Top Hero Card (Span 12) + 2 Bottom Cards (Span 6 each) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* HERO FLAGSHIP CARD: ThinkAI UI (Span 12) */}
              <div className="lg:col-span-12 bg-[#0d0d10] border border-white/[0.12] p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left: Content & CLI (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                        FLAGSHIP PRODUCT
                      </span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-300">47 COMPONENTS READY</span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
                      ThinkAI UI
                    </h3>

                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                      Decentralized architectural component registry crafted for technical luxury. 0px sharp geometry, obsidian depth, and mechanical spring physics. Fully compatible with shadcn/ui CLI.
                    </p>

                    {/* Quick Command */}
                    <div className="p-4 bg-black/60 border border-white/10 space-y-2">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                        Quick Install Command:
                      </span>
                      <div className="flex items-center justify-between font-mono text-xs">
                        <code className="text-emerald-400">npx thinkai-ui init</code>
                        <button
                          onClick={() => copyToClipboard("npx thinkai-ui init", "bento-hero")}
                          className="flex items-center gap-1 text-neutral-300 hover:text-white px-2 py-1 bg-white/10"
                        >
                          {copiedId === "bento-hero" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="https://ui.thinkai.id.vn"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
                      >
                        <span>Explore Registry</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Large Mockup Frame (7 cols) */}
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/10] w-full border border-white/10 bg-black overflow-hidden shadow-2xl">
                      <Image
                        src="/images/products/thinkai-ui-screen.png"
                        alt="ThinkAI UI Registry"
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/20 font-mono text-xs text-white">
                        ui.thinkai.id.vn
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPANION CARD 1: HostDeck (Span 6) */}
              <div className="lg:col-span-6 bg-[#0a0a0c] border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between transition-colors group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20">
                      [SYS] BARE-METAL CONSOLE
                    </span>
                    <span className="font-mono text-xs text-neutral-400">2.4 ms latency</span>
                  </div>

                  <h4 className="text-2xl font-bold text-white tracking-tight">HostDeck</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Hệ thống quản trị và giám sát cụm máy chủ vật lý bare-metal homelab, đo đạc nhiệt năng thermal throttling và điều phối rootless Podman containers.
                  </p>

                  <div className="relative aspect-[16/9] w-full border border-white/[0.08] overflow-hidden bg-black mt-4">
                    <Image
                      src="/images/products/hostdeck-screen.png"
                      alt="HostDeck"
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-400">hostdeck.thinkai.id.vn</span>
                  <a
                    href="https://hostdeck.thinkai.id.vn"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 font-mono text-xs font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>View System</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* COMPANION CARD 2: ThinkAI Delivery Pipeline (Span 6) */}
              <div className="lg:col-span-6 bg-[#0a0a0c] border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between transition-colors group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20">
                      [K3S] ZERO-TRUST PIPELINE
                    </span>
                    <span className="font-mono text-xs text-neutral-400">SAST Verified</span>
                  </div>

                  <h4 className="text-2xl font-bold text-white tracking-tight">ThinkAI Pipeline</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Pipeline DevSecOps tự động hóa 100% với K3s lightweight cluster, cổng kiểm thử bảo mật SonarQube/CodeQL nghiêm ngặt và Tailscale mesh networking.
                  </p>

                  <div className="relative aspect-[16/9] w-full border border-white/[0.08] overflow-hidden bg-black mt-4">
                    <Image
                      src="/images/products/thinkai-screen.png"
                      alt="ThinkAI Pipeline"
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-400">learning.thinkai.id.vn</span>
                  <a
                    href="https://learning.thinkai.id.vn"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 font-mono text-xs font-bold text-white hover:text-cyan-400 transition-colors"
                  >
                    <span>View System</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </section>
        )}

      </main>
    </div>
  );
}
