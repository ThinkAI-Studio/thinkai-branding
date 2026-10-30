"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const footerRef = useRef<HTMLElement>(null);
  const [isSweepActive, setIsSweepActive] = useState<boolean>(true);

  // Performance: Pause light sweep animation when footer is offscreen or tab is hidden
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    let isVisible = false;

    const updateState = () => {
      const active = isVisible && !document.hidden;
      setIsSweepActive(active);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        updateState();
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    const handleVisibility = () => {
      updateState();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

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
    <footer
      ref={footerRef}
      className="relative z-20 bg-[#0a0a0b] text-white overflow-hidden select-none"
    >
      {/* ═══════════════════════════════════════════════════════════
          ZONE A — CONTENT (TOP):
          - Solid dark background (#111113). NO image, NO sweep behind it.
          - Wordmark + description, socials, Ask-AI row, 01/02/03 link columns,
            and the meta row (Vietnam time, Back to top, copyright).
          - Ends with a hairline: border-top on the next zone, 1px rgba(255,255,255,0.10).
         ═══════════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#111113] pt-16 sm:pt-24 pb-12 sm:pb-16 border-t border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
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
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-md font-sans">
                {language === "vi"
                  ? "Studio hệ thống & giao diện chuyên nghiệp. Chúng tôi xây dựng các ứng dụng web hiệu năng cao, hệ thống thiết kế giao diện chuẩn xác và hạ tầng phân phối đám mây bền bỉ."
                  : "A Systems & Craft Web Studio engineering high-performance modern frontend, precision UI design systems, and resilient cloud delivery platforms."}
              </p>

              {/* Social Links Strip */}
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
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
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
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
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
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
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
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
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </WipeButton>
                </div>
              </div>

              {/* Ask-AI Prompt Row */}
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
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
                <p className="text-[11px] font-mono text-neutral-400">
                  {t.footer.askAiHint}
                </p>
              </div>
            </div>

            {/* ─── RIGHT COLUMN (SPAN 7): 3-COLUMN LINK GROUPS ─── */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-4 lg:pt-0">
              {/* Nav Column 1: Products */}
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase border-b border-white/[0.12] pb-2">
                  {language === "vi" ? "01 / SẢN PHẨM" : "01 / PRODUCTS"}
                </div>
                <ul className="space-y-2.5 font-mono text-xs">
                  <li>
                    <Link
                      href="/products/thinkai-ui"
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                    >
                      <span>ThinkAI UI</span>
                      <span className="text-[10px] text-neutral-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/wind"
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                    >
                      <span>Wind Digital Folio</span>
                      <span className="text-[10px] text-neutral-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/homelab"
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                    >
                      <span>HostDeck Console</span>
                      <span className="text-[10px] text-neutral-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/thinkai"
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                    >
                      <span>ThinkAI Learning</span>
                      <span className="text-[10px] text-neutral-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Nav Column 2: Studio */}
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase border-b border-white/[0.12] pb-2">
                  {language === "vi" ? "02 / STUDIO" : "02 / STUDIO"}
                </div>
                <ul className="space-y-2.5 font-mono text-xs">
                  <li>
                    <button
                      type="button"
                      onClick={onOpenAbout}
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{language === "vi" ? "Về Studio (Drawer)" : "About Studio (Drawer)"}</span>
                      <span className="text-[10px] text-neutral-400">↳</span>
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                    >
                      <span>{language === "vi" ? "Hồ sơ đầy đủ (/about)" : "Full Dossier (/about)"}</span>
                      <span className="text-[10px] text-neutral-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{language === "vi" ? "Bắt đầu dự án" : "Start a Project"}</span>
                      <span className="text-[10px] text-neutral-400">↳</span>
                    </button>
                  </li>
                  <li>
                    <a
                      href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                    >
                      <span>DevOps CV (PDF)</span>
                      <span className="text-[10px] text-neutral-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Nav Column 3: Engineering */}
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase border-b border-white/[0.12] pb-2">
                  {language === "vi" ? "03 / KỸ THUẬT" : "03 / ENGINEERING"}
                </div>
                <ul className="space-y-2.5 font-mono text-xs text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>Next.js 16 & React 19</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>GSAP & Framer Motion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>Rootless Podman & K3s</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>Zero-Trust Mesh & SAST</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hairline Divider & Bottom Metadata */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.10] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
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
      </div>

      {/* ═══════════════════════════════════════════════════════════
          ZONE B — IMAGE BAND (BOTTOM, LAST THING IN THE FOOTER):
          - The lighthouse ENTIRELY inside this zone: <picture> as a normal block element,
            width 100%, height auto -> 3.09:1.
          - Filter saturate(.9) brightness(.94) contrast(1.03), and short 4% fade at top edge into #111113.
          - Bottom runs to page end, no gap, no margin.
          - NO TEXT AT ALL inside this zone.
          - Conic sweep scoped to this zone only, pivoting at lantern glass.
          - Mobile (<640px): zone height 240px, object-cover object-position 50% 45%. Zero text.
         ═══════════════════════════════════════════════════════════ */}
      <div className="footer-lighthouse-zone-b relative w-full overflow-hidden bg-[#0a0a0b] border-t border-white/10 select-none pointer-events-none">
        <div className="relative w-full h-[240px] sm:h-auto sm:aspect-[3086/998] overflow-hidden">
          <picture className="block w-full h-full">
            <source srcSet="/images/footer-lighthouse-band.avif" type="image/avif" />
            <source srcSet="/images/footer-lighthouse-band.webp" type="image/webp" />
            <img
              src="/images/footer-lighthouse-band.png"
              alt=""
              loading="lazy"
              decoding="async"
              width={3086}
              height={998}
              className="w-full h-full object-cover sm:object-contain object-[50%_45%] block pointer-events-none"
              style={{
                filter: "saturate(0.9) brightness(0.94) contrast(1.03)",
              }}
            />
          </picture>

          {/* Light source pivot locked directly to lantern glass (x: 50%, y: 23.2% in 3.09:1 frame) */}
          <div
            className="absolute pointer-events-none z-[2]"
            style={{
              left: "50%",
              top: "23.2%",
              width: 0,
              height: 0,
            }}
          >
            <div
              className="footer-beam-sweep"
              style={{
                animationPlayState: isSweepActive ? "running" : "paused",
              }}
            />
          </div>

          {/* Clean 4% fade at the very top edge into the content-zone colour (#111113) */}
          <div
            className="absolute inset-x-0 top-0 h-[5%] pointer-events-none z-[3]"
            style={{
              background: "linear-gradient(180deg, #111113 0%, rgba(17,17,19,0.7) 40%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </footer>
  );
}

export default StudioFooter;
