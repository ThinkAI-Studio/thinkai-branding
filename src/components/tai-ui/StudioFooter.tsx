"use client";

import React from "react";
import Image from "next/image";
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
      className="relative z-20 w-full select-none lg:min-h-[100svh] lg:h-[100svh] lg:flex lg:flex-col lg:justify-between"
      style={{ backgroundColor: "#1455B4", color: "#F7EFDC" }}
    >
      {/* Content Block: max-width 1280, compact padding & vertical rhythm */}
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 pt-8 pb-6 space-y-6 relative z-10 lg:flex-shrink-0">
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
              <span className="font-mono font-extrabold text-lg sm:text-xl tracking-tight text-[#F7EFDC] uppercase">THINKAI STUDIO</span>
            </div>

            {/* Manifesto: 1 concise sentence */}
            <p className="text-xs sm:text-sm text-[#F7EFDC] leading-relaxed max-w-md font-sans opacity-90">
              {language === "vi"
                ? "Studio hệ thống & giao diện kỹ thuật số chuyên nghiệp."
                : "A Systems & Craft Web Studio engineering high-performance modern web."}
            </p>

            {/* Social & AI Icons in one clean row - All 9 identical 32px square boxes */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] rounded-lg text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] rounded-lg text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] rounded-lg text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://x.com/bnhminh1010"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] rounded-lg text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] transition-colors"
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
                      className="w-8 h-8 flex items-center justify-center border border-[rgba(247,239,220,0.4)] rounded-lg text-[#F7EFDC] hover:text-white hover:border-[#F7EFDC] transition-colors cursor-pointer select-none"
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </button>
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
                className="text-[13px] font-bold text-[#F7EFDC]/70 pb-1.5 border-b border-[#F7EFDC]/20"
              >
                {language === "vi" ? "Sản phẩm" : "Products"}
              </div>
              <ul className="flex flex-col font-mono text-xs">
                <li>
                  <Link
                    href="/products/thinkai-ui"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      ThinkAI UI
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/wind"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      Wind Digital Folio
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/homelab"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      HostDeck Console
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/thinkai"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      ThinkAI Learning
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2: Studio */}
            <div className="space-y-3">
              <div
                className="text-[13px] font-bold text-[#F7EFDC]/70 pb-1.5 border-b border-[#F7EFDC]/20"
              >
                Studio
              </div>
              <ul className="flex flex-col font-mono text-xs">
                <li>
                  <button
                    type="button"
                    onClick={onOpenAbout}
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      {language === "vi" ? "Về Studio (Drawer)" : "About Studio (Drawer)"}
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↳</span>
                    </span>
                  </button>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      {language === "vi" ? "Hồ sơ (/about)" : "Full Dossier (/about)"}
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      {language === "vi" ? "Bắt đầu dự án" : "Start a Project"}
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↳</span>
                    </span>
                  </button>
                </li>
                <li>
                  <a
                    href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-start text-left min-h-[44px] sm:min-h-[32px] py-1 text-[#F7EFDC] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>
                      DevOps CV (PDF)
                      <span className="text-[10px] opacity-70 inline-block ml-1 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Meta Row: Copyright on left, Back to Top on right (exactly two items) */}
        <div
          className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 font-mono text-xs"
          style={{ borderColor: "rgba(247, 239, 220, 0.28)" }}
        >
          <div className="font-medium whitespace-nowrap" style={{ color: "rgba(247, 239, 220, 0.66)" }}>
            ThinkAI Studio © 2026. All Rights Reserved.
          </div>

          <a
            href="#top"
            className="hover:text-white transition-colors whitespace-nowrap"
            style={{ color: "rgba(247, 239, 220, 0.66)" }}
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
