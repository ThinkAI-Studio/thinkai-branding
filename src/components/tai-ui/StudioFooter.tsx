"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { WipeButton } from "./WipeButton";
import { useLanguage } from "@/context/LanguageContext";
import { profile, copy } from "@/data/portfolio";
import {
  OpenAiIcon,
  GeminiIcon,
  ClaudeIcon,
  PerplexityIcon,
  ManusIcon,
} from "./AiBrandIcons";

interface StudioFooterProps {
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
}

export function StudioFooter({ onOpenAbout, onOpenContact }: StudioFooterProps) {
  const { language } = useLanguage();
  const t = copy[language];

  const [liveTime, setLiveTime] = useState<string>("");
  const [liveDate, setLiveDate] = useState<string>("");

  // Vietnam Live Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString(language === "vi" ? "vi-VN" : "en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setLiveDate(
        now
          .toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
            timeZone: "Asia/Ho_Chi_Minh",
            weekday: "short",
            month: "short",
            day: "2-digit",
          })
          .toUpperCase()
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);

  const aiPlatforms = [
    { name: "ChatGPT", icon: OpenAiIcon, url: "https://chatgpt.com" },
    { name: "Claude", icon: ClaudeIcon, url: "https://claude.ai" },
    { name: "Gemini", icon: GeminiIcon, url: "https://gemini.google.com" },
    { name: "Perplexity", icon: PerplexityIcon, url: "https://perplexity.ai" },
    { name: "Manus", icon: ManusIcon, url: "https://manus.im" },
  ];

  return (
    <footer className="relative z-20 bg-gradient-to-b from-[#051138] via-[#071a52] to-[#040c28] text-white border-t border-white/[0.12] overflow-hidden select-none">
      {/* Upper Main Footer Grid */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-28 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ─── LEFT COLUMN (SPAN 5): BRAND, MANIFESTO, SOCIAL STRIP ─── */}
          <div className="lg:col-span-5 space-y-8">
            {/* ThinkAI Studio Wordmark */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-[8px] overflow-hidden bg-white/10 p-1 flex items-center justify-center border border-white/20 shadow-lg">
                <Image
                  src="/images/thinkai_studio_logo.png"
                  alt="ThinkAI Studio"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="font-mono font-extrabold text-xl sm:text-2xl tracking-tight text-white uppercase">
                THINKAI STUDIO
              </span>
            </div>

            {/* Studio Manifesto */}
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-md font-sans">
              {language === "vi"
                ? "Studio hệ thống & giao diện chuyên nghiệp. Chúng tôi xây dựng các ứng dụng web hiệu năng cao, hệ thống thiết kế giao diện chuẩn xác và hạ tầng phân phối đám mây bền bỉ."
                : "A Systems & Craft Web Studio engineering high-performance modern frontend, precision UI design systems, and resilient cloud delivery platforms."}
            </p>

            {/* Social Links Strip */}
            <div className="space-y-3 pt-2">
              <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
                {language === "vi" ? "KẾT NỐI VỚI CHÚNG TÔI" : "CONNECT WITH STUDIO"}
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <WipeButton
                  as="a"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05103a"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  hoverBorderColor="#ffffff"
                  className="px-3 py-1.5 rounded-[10px] bg-white/[0.08] text-xs font-mono font-bold flex items-center gap-2 shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-300" />
                </WipeButton>

                <WipeButton
                  as="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05103a"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  hoverBorderColor="#ffffff"
                  className="px-3 py-1.5 rounded-[10px] bg-white/[0.08] text-xs font-mono font-bold flex items-center gap-2 shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-300" />
                </WipeButton>

                <WipeButton
                  as="a"
                  href={`mailto:${profile.email}`}
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05103a"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  hoverBorderColor="#ffffff"
                  className="px-3 py-1.5 rounded-[10px] bg-white/[0.08] text-xs font-mono font-bold flex items-center gap-2 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-300" />
                </WipeButton>

                <WipeButton
                  as="a"
                  href="https://x.com/bnhminh1010"
                  target="_blank"
                  rel="noreferrer"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05103a"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  hoverBorderColor="#ffffff"
                  className="px-3 py-1.5 rounded-[10px] bg-white/[0.08] text-xs font-mono font-bold flex items-center gap-2 shadow-sm"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-300" />
                </WipeButton>
              </div>
            </div>

            {/* AI Prompts Strip */}
            <div className="space-y-3 pt-3">
              <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
                {language === "vi" ? "HỎI AI VỀ THINKAI STUDIO" : "ASK AI ABOUT THINKAI STUDIO"}
              </div>
              <div className="flex items-center gap-2">
                {aiPlatforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <WipeButton
                      key={platform.name}
                      onClick={() => {
                        if (typeof navigator !== "undefined" && navigator.clipboard) {
                          navigator.clipboard.writeText(t.footer.askAiPrompt);
                        }
                        window.open(platform.url, "_blank", "noopener,noreferrer");
                      }}
                      wipeColor="#ffffff"
                      textColor="#ffffff"
                      hoverTextColor="#05103a"
                      borderColor="rgba(255, 255, 255, 0.2)"
                      hoverBorderColor="#ffffff"
                      ariaLabel={`Ask ${platform.name} about ThinkAI`}
                      className="w-8.5 h-8.5 rounded-[8px] flex items-center justify-center cursor-pointer select-none bg-white/[0.08] shadow-sm"
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </WipeButton>
                  );
                })}
              </div>
              <p className="text-[11px] font-mono text-blue-200/70">
                {t.footer.askAiHint}
              </p>
            </div>
          </div>

          {/* ─── RIGHT COLUMN (SPAN 7): 3-COLUMN OUTRIDER NAVIGATION ─── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-4 lg:pt-0">
            {/* Nav Column 1: Products */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase border-b border-white/[0.12] pb-2">
                {language === "vi" ? "01 / SẢN PHẨM" : "01 / PRODUCTS"}
              </div>
              <ul className="space-y-2.5 font-mono text-xs">
                <li>
                  <Link
                    href="/products/thinkai-ui"
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>ThinkAI UI</span>
                    <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/wind"
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Wind Digital Folio</span>
                    <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/homelab"
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>HostDeck Console</span>
                    <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/thinkai"
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>ThinkAI Learning</span>
                    <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2: Studio */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase border-b border-white/[0.12] pb-2">
                {language === "vi" ? "02 / STUDIO" : "02 / STUDIO"}
              </div>
              <ul className="space-y-2.5 font-mono text-xs">
                <li>
                  <button
                    type="button"
                    onClick={onOpenAbout}
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{language === "vi" ? "Về Studio (Sidebar)" : "About Studio (Drawer)"}</span>
                    <span className="text-[10px] text-cyan-400">↳</span>
                  </button>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>{language === "vi" ? "Giới thiệu đầy đủ" : "Full Dossier (/about)"}</span>
                    <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{language === "vi" ? "Bắt đầu dự án" : "Start a Project"}</span>
                    <span className="text-[10px] text-cyan-400">↳</span>
                  </button>
                </li>
                <li>
                  <a
                    href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-100 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>DevOps CV (PDF)</span>
                    <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Nav Column 3: Engineering */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase border-b border-white/[0.12] pb-2">
                {language === "vi" ? "03 / KỸ THUẬT" : "03 / ENGINEERING"}
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-blue-200/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Next.js 16 & React 19</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>GSAP & Framer Motion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Rootless Podman & K3s</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Zero-Trust Mesh & SAST</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Hairline Divider & Bottom Metadata */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-blue-200/70">
          <div>
            {language === "vi" ? "VIỆT NAM" : "VIETNAM"} {liveTime || "02:35:57 PM"} · {liveDate || "MON, AUG 31"}
          </div>

          <div className="text-center">
            <WipeButton
              as="a"
              href="#top"
              wipeColor="#ffffff"
              textColor="#ffffff"
              hoverTextColor="#05103a"
              borderColor="rgba(255, 255, 255, 0.2)"
              hoverBorderColor="#ffffff"
              className="px-3 py-1 rounded-[8px] bg-white/[0.08] inline-block text-xs font-mono font-bold"
            >
              <span>{t.footer.backToTop}</span>
            </WipeButton>
          </div>

          <div className="text-right font-medium">
            ThinkAI Studio © 2026. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* ─── BOTTOM LAYOUT: PANORAMIC DUOTONE CYBERNETIC DESERT ARTWORK ─── */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-transparent to-[#040920] pt-4">
        {/* Full-width Panoramic Duotone SVG Art */}
        <svg
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-40 sm:h-52 lg:h-60 object-cover pointer-events-none opacity-85 select-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cobalt-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#071a52" stopOpacity="0" />
              <stop offset="60%" stopColor="#0a2575" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#040b26" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="dune-1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#092268" />
              <stop offset="100%" stopColor="#05123d" />
            </linearGradient>
            <linearGradient id="dune-2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b2b85" />
              <stop offset="100%" stopColor="#040d2b" />
            </linearGradient>
          </defs>

          {/* Background Sky Fill */}
          <rect width="1440" height="240" fill="url(#cobalt-sky)" />

          {/* Starlight & Constellation Grid */}
          <circle cx="240" cy="40" r="1.5" fill="#38bdf8" opacity="0.8" />
          <circle cx="380" cy="65" r="1.2" fill="#ffffff" opacity="0.6" />
          <circle cx="720" cy="30" r="2.0" fill="#38bdf8" opacity="0.9" />
          <circle cx="980" cy="50" r="1.2" fill="#ffffff" opacity="0.7" />
          <circle cx="1200" cy="35" r="1.8" fill="#38bdf8" opacity="0.8" />
          <line x1="240" y1="40" x2="380" y2="65" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="3 3" />
          <line x1="980" y1="50" x2="1200" y2="35" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="3 3" />

          {/* Telemetry Towers on Horizon */}
          <line x1="420" y1="120" x2="420" y2="70" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
          <circle cx="420" cy="68" r="2.5" fill="#38bdf8" />
          <line x1="1050" y1="130" x2="1050" y2="85" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
          <circle cx="1050" cy="83" r="2.5" fill="#38bdf8" />

          {/* Layer 1: Distant Cybernetic Ridge */}
          <path
            d="M0 160 L180 135 L340 150 L520 120 L720 145 L940 115 L1120 140 L1280 125 L1440 155 L1440 240 L0 240 Z"
            fill="url(#dune-1)"
            opacity="0.75"
          />

          {/* Layer 2: Middle Dunes */}
          <path
            d="M0 185 Q360 140 720 175 T1440 170 L1440 240 L0 240 Z"
            fill="url(#dune-2)"
            opacity="0.9"
          />

          {/* Layer 3: Perspective Grid Mesh Lines on Forefront Dunes */}
          <line x1="0" y1="210" x2="1440" y2="210" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
          <line x1="0" y1="225" x2="1440" y2="225" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" />
          <line x1="0" y1="237" x2="1440" y2="237" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.5" />

          {/* Perspective Ray Lines */}
          <line x1="720" y1="175" x2="100" y2="240" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <line x1="720" y1="175" x2="350" y2="240" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <line x1="720" y1="175" x2="580" y2="240" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <line x1="720" y1="175" x2="860" y2="240" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <line x1="720" y1="175" x2="1090" y2="240" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <line x1="720" y1="175" x2="1340" y2="240" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
        </svg>

      </div>
    </footer>
  );
}

export default StudioFooter;
