"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profile, copy } from "@/data/portfolio";
import {
  OpenAiIcon,
  GeminiIcon,
  ClaudeIcon,
  PerplexityIcon,
  ManusIcon,
} from "./AiBrandIcons";
import { BrandMark } from "./BrandMark";

interface StudioFooterProps {
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
}

export function StudioFooter({ onOpenAbout, onOpenContact }: StudioFooterProps) {
  const { language } = useLanguage();
  const t = copy[language];

  const aiPlatforms = [
    { name: "ChatGPT", icon: OpenAiIcon, url: "https://chatgpt.com" },
    { name: "Claude", icon: ClaudeIcon, url: "https://claude.ai" },
    { name: "Gemini", icon: GeminiIcon, url: "https://gemini.google.com" },
    { name: "Perplexity", icon: PerplexityIcon, url: "https://perplexity.ai" },
    { name: "Manus", icon: ManusIcon, url: "https://manus.im" },
  ];

  return (
    <footer
      className="relative z-20 w-full select-none min-h-[100svh] flex flex-col justify-between"
      style={{ backgroundColor: "#1455B4", color: "#F7EFDC" }}
    >
      {/* Content Block: Enhanced type scale and breathing room */}
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 pt-10 sm:pt-12 pb-8 space-y-8 relative z-10 lg:flex-shrink-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (Span 6): Brand, Manifesto, Social Icons */}
          <div className="lg:col-span-6 space-y-5">
            {/* Wordmark (20px - 24px) */}
            <div className="flex items-center gap-3 text-[#F7EFDC]">
              <BrandMark size={28} framed />
              <span className="font-mono font-extrabold text-xl sm:text-2xl tracking-tight uppercase">
                THINKAI STUDIO
              </span>
            </div>

            {/* Manifesto: 14-15px readable measure */}
            <p className="text-sm sm:text-base text-[#F7EFDC] leading-relaxed max-w-[34ch] font-sans opacity-90">
              {language === "vi"
                ? "Studio hệ thống & giao diện kỹ thuật số chuyên nghiệp."
                : "A Systems & Craft Web Studio engineering high-performance modern web."}
            </p>

            {/* Social & AI Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] r-btn text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/60"
                  style={{ "--btn-h": "32px" } as React.CSSProperties}
                >
                  <Github className="w-3.5 h-3.5" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] r-btn text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/60"
                  style={{ "--btn-h": "32px" } as React.CSSProperties}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] r-btn text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/60"
                  style={{ "--btn-h": "32px" } as React.CSSProperties}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://x.com/bnhminh1010"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] r-btn text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/60"
                  style={{ "--btn-h": "32px" } as React.CSSProperties}
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>

              <span className="w-px h-4 bg-[#F7EFDC]/30 mx-1 hidden sm:block" />

              <div className="flex items-center gap-1.5">
                {aiPlatforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <button
                      key={platform.name}
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== "undefined" && navigator.clipboard) {
                          navigator.clipboard.writeText(t.footer.askAiPrompt);
                        }
                        window.open(platform.url, "_blank", "noopener,noreferrer");
                      }}
                      aria-label={`Ask ${platform.name} about ThinkAI`}
                      className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] r-btn text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/60"
                      style={{ "--btn-h": "32px" } as React.CSSProperties}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (Span 6): Two Nav Columns (Products, Studio) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6 sm:gap-10 pt-2 lg:pt-0">
            {/* Nav Column 1: Products */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#F7EFDC]/80 pb-2 border-b border-[#F7EFDC]/20">
                {language === "vi" ? "Sản phẩm" : "Products"}
              </div>
              <ul className="flex flex-col font-mono text-sm space-y-1">
                <li>
                  <Link
                    href="/products/thinkai-ui"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      ThinkAI UI
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/wind"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      Wind Digital Folio
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/homelab"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      HostDeck Console
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/thinkai"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      ThinkAI Learning
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2: Studio */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#F7EFDC]/80 pb-2 border-b border-[#F7EFDC]/20">
                Studio
              </div>
              <ul className="flex flex-col font-mono text-sm space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={onOpenAbout}
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      {language === "vi" ? "Về Studio (Drawer)" : "About Studio (Drawer)"}
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↳</span>
                    </span>
                  </button>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      {language === "vi" ? "Hồ sơ (/about)" : "Full Dossier (/about)"}
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      {language === "vi" ? "Bắt đầu dự án" : "Start a Project"}
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↳</span>
                    </span>
                  </button>
                </li>
                <li>
                  <a
                    href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[40px] py-1 px-1.5 text-[#F7EFDC] hover:text-white active:opacity-70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn"
                    style={{ "--btn-h": "40px" } as React.CSSProperties}
                  >
                    <span className="leading-snug">
                      DevOps CV (PDF)
                      <span className="text-xs opacity-75 inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Meta Row: Copyright, Privacy Policy, Back to Top */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[13px]"
          style={{ borderColor: "rgba(247, 239, 220, 0.28)" }}
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-center sm:text-left justify-center sm:justify-start">
            <span className="font-medium whitespace-nowrap" style={{ color: "rgba(247, 239, 220, 0.90)" }}>
              ThinkAI Studio © 2026. All Rights Reserved.
            </span>
            <span className="opacity-40 select-none">•</span>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors underline-offset-4 hover:underline py-1 inline-flex items-center min-h-[24px]"
              style={{ color: "rgba(247, 239, 220, 0.75)" }}
            >
              {language === "vi" ? "Chính sách bảo mật" : "Privacy Policy"}
            </Link>
          </div>

          <a
            href="#top"
            className="hover:text-white active:opacity-70 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFDC]/50 r-btn py-1.5 px-2.5 inline-flex items-center min-h-[28px]"
            style={{ color: "rgba(247, 239, 220, 0.90)", "--btn-h": "28px" } as React.CSSProperties}
          >
            {t.footer.backToTop}
          </a>
        </div>
      </div>

      {/* Artwork: flex remainder on desktop (>=1024px) */}
      <picture className="block w-full pointer-events-none -mt-16 sm:-mt-24 md:-mt-32 lg:mt-0 lg:flex-1 lg:min-h-0 relative z-0 overflow-hidden">
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
