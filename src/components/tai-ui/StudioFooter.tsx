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
    <footer
      className="relative z-20 w-full select-none"
      style={{ backgroundColor: "#1455B4", color: "#F7EFDC" }}
    >
      {/* Content Block: max-width 1280, padding 56px (mobile 22px) */}
      <div className="w-full max-w-[1280px] mx-auto p-[22px] sm:p-[56px] space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (Span 5): Brand, Manifesto, Social Strip, Ask-AI */}
          <div className="lg:col-span-5 space-y-7">
            {/* Wordmark */}
            <div className="flex items-center gap-3">
              <div
                className="relative w-8 h-8 p-1 flex items-center justify-center border shadow-sm"
                style={{
                  backgroundColor: "rgba(247, 239, 220, 0.12)",
                  borderColor: "rgba(247, 239, 220, 0.28)",
                }}
              >
                <Image
                  src="/images/thinkai_studio_logo.png"
                  alt="ThinkAI Studio"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="font-mono font-extrabold text-xl sm:text-2xl tracking-tight text-[#F7EFDC] uppercase">
                THINKAI STUDIO
              </span>
            </div>

            {/* Manifesto */}
            <p className="text-sm sm:text-base text-[#F7EFDC] leading-relaxed max-w-md font-sans">
              {language === "vi"
                ? "Studio hệ thống & giao diện chuyên nghiệp. Chúng tôi xây dựng các ứng dụng web hiệu năng cao, hệ thống thiết kế giao diện chuẩn xác và hạ tầng phân phối đám mây bền bỉ."
                : "A Systems & Craft Web Studio engineering high-performance modern frontend, precision UI design systems, and resilient cloud delivery platforms."}
            </p>

            {/* Social Links */}
            <div className="space-y-2.5 pt-1">
              <div
                className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase"
                style={{ color: "rgba(247, 239, 220, 0.66)" }}
              >
                {language === "vi" ? "KẾT NỐI VỚI CHÚNG TÔI" : "CONNECT WITH STUDIO"}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <WipeButton
                  as="a"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  wipeColor="#F7EFDC"
                  textColor="#F7EFDC"
                  hoverTextColor="#1455B4"
                  borderColor="rgba(247, 239, 220, 0.28)"
                  hoverBorderColor="#F7EFDC"
                  className="px-3 py-1.5 bg-white/[0.06] text-xs font-mono font-bold flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-80" />
                </WipeButton>

                <WipeButton
                  as="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  wipeColor="#F7EFDC"
                  textColor="#F7EFDC"
                  hoverTextColor="#1455B4"
                  borderColor="rgba(247, 239, 220, 0.28)"
                  hoverBorderColor="#F7EFDC"
                  className="px-3 py-1.5 bg-white/[0.06] text-xs font-mono font-bold flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-80" />
                </WipeButton>

                <WipeButton
                  as="a"
                  href={`mailto:${profile.email}`}
                  wipeColor="#F7EFDC"
                  textColor="#F7EFDC"
                  hoverTextColor="#1455B4"
                  borderColor="rgba(247, 239, 220, 0.28)"
                  hoverBorderColor="#F7EFDC"
                  className="px-3 py-1.5 bg-white/[0.06] text-xs font-mono font-bold flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                  <ArrowUpRight className="w-3 h-3 opacity-80" />
                </WipeButton>

                <WipeButton
                  as="a"
                  href="https://x.com/bnhminh1010"
                  target="_blank"
                  rel="noreferrer"
                  wipeColor="#F7EFDC"
                  textColor="#F7EFDC"
                  hoverTextColor="#1455B4"
                  borderColor="rgba(247, 239, 220, 0.28)"
                  hoverBorderColor="#F7EFDC"
                  className="px-3 py-1.5 bg-white/[0.06] text-xs font-mono font-bold flex items-center gap-2"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X</span>
                  <ArrowUpRight className="w-3 h-3 opacity-80" />
                </WipeButton>
              </div>
            </div>

            {/* Ask-AI */}
            <div className="space-y-2.5 pt-1">
              <div
                className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase"
                style={{ color: "rgba(247, 239, 220, 0.66)" }}
              >
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
                      wipeColor="#F7EFDC"
                      textColor="#F7EFDC"
                      hoverTextColor="#1455B4"
                      borderColor="rgba(247, 239, 220, 0.28)"
                      hoverBorderColor="#F7EFDC"
                      ariaLabel={`Ask ${platform.name} about ThinkAI`}
                      className="w-8.5 h-8.5 flex items-center justify-center cursor-pointer select-none bg-white/[0.06]"
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </WipeButton>
                  );
                })}
              </div>
              <p
                className="text-[11px] font-mono"
                style={{ color: "rgba(247, 239, 220, 0.66)" }}
              >
                {t.footer.askAiHint}
              </p>
            </div>
          </div>

          {/* Right Column (Span 7): 3 Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-4 lg:pt-0">
            {/* Nav Column 1: Products */}
            <div className="space-y-4">
              <div
                className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-2 border-b"
                style={{
                  color: "rgba(247, 239, 220, 0.66)",
                  borderColor: "rgba(247, 239, 220, 0.28)",
                }}
              >
                {language === "vi" ? "01 / SẢN PHẨM" : "01 / PRODUCTS"}
              </div>
              <ul className="space-y-2.5 font-mono text-xs">
                <li>
                  <Link
                    href="/products/thinkai-ui"
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>ThinkAI UI</span>
                    <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/wind"
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Wind Digital Folio</span>
                    <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/homelab"
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>HostDeck Console</span>
                    <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/thinkai"
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>ThinkAI Learning</span>
                    <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2: Studio */}
            <div className="space-y-4">
              <div
                className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-2 border-b"
                style={{
                  color: "rgba(247, 239, 220, 0.66)",
                  borderColor: "rgba(247, 239, 220, 0.28)",
                }}
              >
                {language === "vi" ? "02 / STUDIO" : "02 / STUDIO"}
              </div>
              <ul className="space-y-2.5 font-mono text-xs">
                <li>
                  <button
                    type="button"
                    onClick={onOpenAbout}
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{language === "vi" ? "Về Studio (Drawer)" : "About Studio (Drawer)"}</span>
                    <span className="text-[10px] opacity-70">↳</span>
                  </button>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>{language === "vi" ? "Hồ sơ đầy đủ (/about)" : "Full Dossier (/about)"}</span>
                    <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{language === "vi" ? "Bắt đầu dự án" : "Start a Project"}</span>
                    <span className="text-[10px] opacity-70">↳</span>
                  </button>
                </li>
                <li>
                  <a
                    href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F7EFDC] hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <span>DevOps CV (PDF)</span>
                    <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Nav Column 3: Engineering */}
            <div className="space-y-4">
              <div
                className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-2 border-b"
                style={{
                  color: "rgba(247, 239, 220, 0.66)",
                  borderColor: "rgba(247, 239, 220, 0.28)",
                }}
              >
                {language === "vi" ? "03 / KỸ THUẬT" : "03 / ENGINEERING"}
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-[#F7EFDC]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7EFDC]" />
                  <span>Next.js 16 & React 19</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7EFDC]" />
                  <span>GSAP & Framer Motion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7EFDC]" />
                  <span>Rootless Podman & K3s</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7EFDC]" />
                  <span>Zero-Trust Mesh & SAST</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Meta Row: Live Time, Back to top, Copyright */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs"
          style={{ borderColor: "rgba(247, 239, 220, 0.28)" }}
        >
          <div style={{ color: "rgba(247, 239, 220, 0.66)" }}>
            {language === "vi" ? "VIỆT NAM" : "VIETNAM"} {liveTime || "02:35:57 PM"} · {liveDate || "MON, AUG 31"}
          </div>

          <div className="text-center">
            <WipeButton
              as="a"
              href="#top"
              wipeColor="#F7EFDC"
              textColor="#F7EFDC"
              hoverTextColor="#1455B4"
              borderColor="rgba(247, 239, 220, 0.28)"
              hoverBorderColor="#F7EFDC"
              className="px-3 py-1 bg-white/[0.06] inline-block text-xs font-mono font-bold"
            >
              <span>{t.footer.backToTop}</span>
            </WipeButton>
          </div>

          <div className="text-right font-medium" style={{ color: "rgba(247, 239, 220, 0.66)" }}>
            ThinkAI Studio © 2026. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Artwork: plain block, width 100%, height auto, no wrapper position absolute, no overlay */}
      <picture className="block w-full pointer-events-none">
        <source srcSet="/images/footer-lighthouse-sky.avif" type="image/avif" />
        <source srcSet="/images/footer-lighthouse-sky.webp" type="image/webp" />
        <img
          src="/images/footer-lighthouse-sky.png"
          alt=""
          loading="lazy"
          decoding="async"
          width={2936}
          height={1106}
          className="w-full h-auto block pointer-events-none"
          style={{
            maskImage: "linear-gradient(180deg, transparent 0px, #000 64px)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0px, #000 64px)",
          }}
        />
      </picture>
    </footer>
  );
}

export default StudioFooter;
