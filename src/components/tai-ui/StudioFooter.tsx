"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
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
      {/* Content Block: max-width 1280, compact padding & vertical rhythm */}
      {/* Content Block: max-width 1280, compact padding & vertical rhythm */}
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 pt-8 pb-6 space-y-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Span 6): Brand, 1-line Manifesto, Unified Icons Row */}
          <div className="lg:col-span-6 space-y-4">
            {/* Wordmark */}
            <div className="flex items-center gap-3">
              <div
                className="relative w-7 h-7 p-1 flex items-center justify-center border shadow-sm"
                style={{
                  backgroundColor: "rgba(247, 239, 220, 0.12)",
                  borderColor: "rgba(247, 239, 220, 0.28)",
                }}
              >
                <Image
                  src="/images/thinkai_studio_logo.png"
                  alt="ThinkAI Studio"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>
              <span className="font-mono font-extrabold text-lg sm:text-xl tracking-tight text-[#F7EFDC] uppercase">
                THINKAI STUDIO
              </span>
            </div>

            {/* Manifesto: 1 concise sentence */}
            <p className="text-xs sm:text-sm text-[#F7EFDC] leading-relaxed max-w-md font-sans opacity-90">
              {language === "vi"
                ? "Studio hệ thống & giao diện kỹ thuật số chuyên nghiệp."
                : "A Systems & Craft Web Studio engineering high-performance modern web."}
            </p>

            {/* Social & AI Icons in one clean row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5">
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
                  ariaLabel="GitHub"
                  className="w-8 h-8 flex items-center justify-center bg-white/[0.06]"
                >
                  <Github className="w-3.5 h-3.5" />
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
                  ariaLabel="LinkedIn"
                  className="w-8 h-8 flex items-center justify-center bg-white/[0.06]"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </WipeButton>

                <WipeButton
                  as="a"
                  href={`mailto:${profile.email}`}
                  wipeColor="#F7EFDC"
                  textColor="#F7EFDC"
                  hoverTextColor="#1455B4"
                  borderColor="rgba(247, 239, 220, 0.28)"
                  hoverBorderColor="#F7EFDC"
                  ariaLabel="Email"
                  className="w-8 h-8 flex items-center justify-center bg-white/[0.06]"
                >
                  <Mail className="w-3.5 h-3.5" />
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
                  ariaLabel="X"
                  className="w-8 h-8 flex items-center justify-center bg-white/[0.06]"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </WipeButton>
              </div>

              <span className="w-px h-4 bg-[#F7EFDC]/20 mx-1 hidden sm:block" />

              <div className="flex items-center gap-1.5">
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
                      className="w-8 h-8 flex items-center justify-center cursor-pointer select-none bg-white/[0.06]"
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </WipeButton>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (Span 6): Two Nav Columns (01 / Products, 02 / Studio) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6 sm:gap-8 pt-2 lg:pt-0">
            {/* Nav Column 1: Products */}
            <div className="space-y-3">
              <div
                className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b"
                style={{
                  color: "rgba(247, 239, 220, 0.66)",
                  borderColor: "rgba(247, 239, 220, 0.28)",
                }}
              >
                {language === "vi" ? "01 / SẢN PHẨM" : "01 / PRODUCTS"}
              </div>
              <ul className="space-y-2 font-mono text-xs">
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
            <div className="space-y-3">
              <div
                className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b"
                style={{
                  color: "rgba(247, 239, 220, 0.66)",
                  borderColor: "rgba(247, 239, 220, 0.28)",
                }}
              >
                {language === "vi" ? "02 / STUDIO" : "02 / STUDIO"}
              </div>
              <ul className="space-y-2 font-mono text-xs">
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
                    <span>{language === "vi" ? "Hồ sơ (/about)" : "Full Dossier (/about)"}</span>
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
          </div>
        </div>

        {/* Meta Row: Copyright, Live Time & Back to Top */}
        <div
          className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs"
          style={{ borderColor: "rgba(247, 239, 220, 0.28)" }}
        >
          <div className="font-medium" style={{ color: "rgba(247, 239, 220, 0.66)" }}>
            ThinkAI Studio © 2026. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span style={{ color: "rgba(247, 239, 220, 0.66)" }}>
              {language === "vi" ? "VIỆT NAM" : "VIETNAM"} {liveTime || "02:35:57 PM"}{liveDate ? ` · ${liveDate}` : ""}
            </span>
            <WipeButton
              as="a"
              href="#top"
              wipeColor="#F7EFDC"
              textColor="#F7EFDC"
              hoverTextColor="#1455B4"
              borderColor="rgba(247, 239, 220, 0.28)"
              hoverBorderColor="#F7EFDC"
              className="px-2.5 py-1 bg-white/[0.06] inline-flex items-center gap-1 text-xs font-mono font-bold"
            >
              <span>{t.footer.backToTop}</span>
              <span>↑</span>
            </WipeButton>
          </div>
        </div>
      </div>

      {/* Artwork: plain block, pulled up into empty sky field so whole composition fits comfortably without text overlap */}
      <picture className="block w-full pointer-events-none -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40 relative z-0">
        <source media="(max-width: 639px)" srcSet="/images/footer-lighthouse-sky-mobile.avif" type="image/avif" />
        <source media="(max-width: 639px)" srcSet="/images/footer-lighthouse-sky-mobile.webp" type="image/webp" />
        <source srcSet="/images/footer-lighthouse-sky.avif" type="image/avif" />
        <source srcSet="/images/footer-lighthouse-sky.webp" type="image/webp" />
        <img
          src="/images/footer-lighthouse-sky.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto block pointer-events-none footer-artwork-img"
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
