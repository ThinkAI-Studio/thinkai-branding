"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Code,
  Cpu,
  GitBranch,
  Layers,
  Copy,
  Check,
  FileCode,
  Terminal,
  Activity,
} from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

const ICON_MAP = {
  shield: ShieldCheck,
  lock: Lock,
  check: CheckCircle2,
  code: Code,
  cpu: Cpu,
  git: GitBranch,
};

const WIND_GALLERY = [
  {
    src: "/images/products/wind/desktop-02.webp",
    alt: "3D Book Reader with dual-page folio and page curling",
    caption: {
      en: "3D Paginated Folio Reader — Realistic paper curl, spine shading, and vermilion seal",
      vi: "Bộ đọc sách 3D hai trang mở — Uốn cong mép trang, bóng gáy sách và triện son",
    },
  },
  {
    src: "/images/products/wind/desktop-03.webp",
    alt: "Multi-tier bookshelf collections",
    caption: {
      en: "Multi-Tier Bookshelf — Leather spines, gold debossing, and curated poetry folios",
      vi: "Giá sách đa tầng — Gáy da dập chìm ánh kim và các tập thơ tuyển chọn",
    },
  },
  {
    src: "/images/products/wind/desktop-06.webp",
    alt: "Dark mode atmospheric view",
    caption: {
      en: "Dark Mode Atmosphere — Low-light charcoal canvas with gold and cinnabar accents",
      vi: "Không gian đêm trầm lắng — Nền hắc thạch than chì với điểm nhấn hoàng kim và chu sa",
    },
  },
  {
    src: "/images/products/wind/desktop-04.webp",
    alt: "Single poem reading layout",
    caption: {
      en: "Single Poem Reading View — Distraction-free typography, stanzas, and audio controls",
      vi: "Giao diện đọc thơ đơn phẩm — Định dạng trang nhã, phân khổ nhịp nhàng và audio",
    },
  },
];

interface ProductCaseStudyProps {
  project: Project;
}

export function ProductCaseStudy({ project }: ProductCaseStudyProps) {
  const { language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<"narrative" | "diagram" | "security" | "provenance">("narrative");
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const arch = project.architecture;
  const content = project.content[language];

  const handleCopyCli = () => {
    if (project.cliCommand) {
      navigator.clipboard.writeText(project.cliCommand);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-white selection:text-black">
      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "vi" ? "Tất cả sản phẩm" : "All Products"}</span>
            </Link>
            <span className="text-white/20 hidden sm:inline">/</span>
            <span className="font-mono text-xs font-bold text-white  hidden sm:inline">
              {content.title}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              {language === "en" ? "VI" : "EN"}
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black font-mono text-xs font-bold  tracking-wider hover:bg-neutral-200 transition-colors shadow-sm"
              >
                <span>{language === "vi" ? "Truy cập hệ thống" : "Visit System"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ─── MAIN HERO ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16">
        <div className="space-y-6">
          {/* Eyebrow & Metadata Tags */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-xl bg-white/10 text-white border border-white/20 font-bold tracking-wider">
              {project.mark}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.metric.value}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white/[0.04] text-neutral-400 border border-white/[0.08]">
              {project.period}
            </span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-400 font-semibold  tracking-wider text-[11px]">
              {content.category}
            </span>
          </div>

          {/* Title & One-Liner */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white  leading-[0.95]">
              {content.title}
            </h1>
            <p className="text-lg sm:text-2xl text-neutral-300 font-light max-w-4xl leading-relaxed">
              {content.summary}
            </p>
          </div>

          {/* Action Row & Tech Stack */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
            {/* Tech Chips */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-xl bg-[#121216] border border-white/[0.1] text-xs font-mono text-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CLI Command or Live Button */}
            {project.cliCommand && (
              <div className="flex items-center gap-2 bg-[#121216] border border-white/[0.12] p-1.5 pl-3 rounded-xl max-w-md w-full sm:w-auto">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                <code className="text-xs font-mono text-neutral-200 truncate flex-1">
                  {project.cliCommand}
                </code>
                <button
                  type="button"
                  onClick={handleCopyCli}
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors cursor-pointer shrink-0"
                >
                  {copiedCli ? (language === "vi" ? "Đã chép" : "Copied") : (language === "vi" ? "Chép" : "Copy")}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── VISUAL SHOWCASE / GALLERY ─── */}
        <section className="space-y-4">
          {project.id === "wind" ? (
            <div className="space-y-4">
              {/* Active Image Spotlight */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.12] bg-[#0c0c0e] shadow-2xl">
                <Image
                  src={WIND_GALLERY[activeImageIndex].src}
                  alt={WIND_GALLERY[activeImageIndex].alt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-top transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-mono text-white/90 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span>{WIND_GALLERY[activeImageIndex].caption[language]}</span>
                  <span className="text-neutral-400 font-bold shrink-0 ml-2">
                    0{activeImageIndex + 1} / 0{WIND_GALLERY.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WIND_GALLERY.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-emerald-400 ring-2 ring-emerald-400/20 scale-[1.02]"
                        : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.12] bg-[#0c0c0e] shadow-2xl group">
              <Image
                src={project.preview.image}
                alt={content.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <span>{project.preview.capture[language]}</span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-white hover:text-emerald-400 font-bold  transition-colors shrink-0 ml-3"
                  >
                    <span>VISIT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ─── TECHNICAL TELEMETRY HUD ─── */}
        {arch && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 sm:p-5 rounded-xl bg-[#121216] border border-white/[0.08] text-xs font-mono">
            <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/[0.08] pb-3 md:pb-0 md:pr-4">
              <span className="text-neutral-400 block font-bold  tracking-wider text-[11px]">
                {language === "vi" ? "Ràng buộc hệ thống" : "System Constraint"}
              </span>
              <p className="text-neutral-200">{arch.constraint[language]}</p>
            </div>
            <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/[0.08] pb-3 md:pb-0 md:px-4">
              <span className="text-neutral-400 block font-bold  tracking-wider text-[11px]">
                {language === "vi" ? "Cơ chế kiến trúc" : "Core Mechanism"}
              </span>
              <p className="text-neutral-200">{arch.mechanism[language]}</p>
            </div>
            <div className="space-y-1 md:pl-4">
              <span className="text-neutral-400 block font-bold  tracking-wider text-[11px]">
                {language === "vi" ? "Tiêu chuẩn nghiệm thu" : "Quality Standard"}
              </span>
              <p className="text-emerald-400 font-semibold">{arch.standard[language]}</p>
            </div>
          </section>
        )}

        {/* ─── INLINE CASE STUDY & ARCHITECTURE TABS ─── */}
        <section className="space-y-8">
          {/* Navigation Tab Bar */}
          <div className="flex items-center gap-2 p-1.5 bg-[#121216] rounded-xl border border-white/[0.1] overflow-x-auto scrollbar-none text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("narrative")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap ${
                activeTab === "narrative"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {language === "vi" ? "01. Báo cáo kỹ thuật" : "01. Case Study"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("diagram")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap ${
                activeTab === "diagram"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {language === "vi" ? "02. Luồng kiến trúc" : "02. Delivery Flow"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap ${
                activeTab === "security"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {language === "vi" ? "03. Bảo mật & QA" : "03. Security & QA"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("provenance")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap ${
                activeTab === "provenance"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {language === "vi" ? "04. Bằng chứng Git" : "04. Git Ledger"}
            </button>
          </div>

          {/* TAB 1: NARRATIVE */}
          {activeTab === "narrative" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 01. Challenge */}
                <div className="p-6 rounded-xl bg-[#101014] border border-white/[0.08] space-y-3 transition-colors hover:border-white/[0.18]">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="font-mono text-xs font-bold  tracking-wider text-white">
                        {language === "vi" ? "01. Thách thức" : "01. Challenge"}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {language === "vi" ? "Bài toán kỹ thuật cốt lõi" : "Core Engineering Constraint"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {content.story.problem}
                  </p>
                </div>

                {/* 02. Approach */}
                <div className="p-6 rounded-xl bg-[#101014] border border-white/[0.08] space-y-3 transition-colors hover:border-white/[0.18]">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="font-mono text-xs font-bold  tracking-wider text-white">
                        {language === "vi" ? "02. Giải pháp" : "02. Approach"}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {language === "vi" ? "Quyết định & Cơ chế triển khai" : "Architectural Decision"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {content.story.approach}
                  </p>
                </div>

                {/* 03. Outcome */}
                <div className="p-6 rounded-xl bg-[#101014] border border-white/[0.08] space-y-3 transition-colors hover:border-white/[0.18]">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-xs font-bold  tracking-wider text-white">
                        {language === "vi" ? "03. Nghiệm thu" : "03. Outcome"}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {language === "vi" ? "Kết quả đo lường thực tế" : "Verified Outcome"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {content.story.outcome}
                  </p>
                </div>
              </div>

              {/* Telemetry Strip */}
              <div className="p-4 rounded-xl bg-[#0d0d10] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold">{project.metric.value}</span>
                  <span className="text-neutral-400">· {project.metric.label[language]}</span>
                </div>
                <div className="text-neutral-500 text-[11px]">
                  {language === "vi" ? "Xác thực trên môi trường Production" : "Production Verified"}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIAGRAM / FLOW */}
          {activeTab === "diagram" && (
            <div className="space-y-6">
              <div className="font-mono text-xs text-neutral-400  tracking-widest flex items-center gap-2">
                <Layers className="w-4 h-4 text-neutral-300" />
                <span>
                  {language === "vi" ? "Sơ đồ luồng phân phối & Kiến trúc" : "Connected Pipeline Flow"}
                </span>
              </div>

              {arch?.flowSteps && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {arch.flowSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-xl bg-[#101014] border border-white/[0.08] space-y-3 flex flex-col justify-between hover:border-white/[0.2] transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                          <span className="font-mono text-xs font-bold text-white">
                            {language === "vi" ? `Bước ${step.step}` : `Step ${step.step}`}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-neutral-300 ">
                            {step.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-white font-mono text-sm pt-1">
                          {step.title}
                        </h4>
                        <p className="font-mono text-[11px] text-neutral-400 leading-relaxed">
                          {step.subtitle[language]}
                        </p>
                      </div>
                      <div className="pt-2 text-[10px] font-mono text-emerald-400 border-t border-white/[0.04]">
                        ↳ {step.protocol}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Code Spec Viewer */}
              {arch?.specSnippet && (
                <div className="p-5 rounded-xl bg-[#0c0c0f] border border-white/[0.08] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-neutral-300 min-w-0">
                      <FileCode className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span className="font-bold text-white truncate">{arch.specSnippet.filename}</span>
                      <span className="text-neutral-500 text-[10px] ">
                        ({arch.specSnippet.language})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(arch.specSnippet.code)}
                      className="px-3 py-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/[0.08] shrink-0 self-start sm:self-auto"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? (language === "vi" ? "Đã chép" : "Copied") : (language === "vi" ? "Sao chép mã" : "Copy Spec")}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.04] text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed max-h-72">
                    <code>{arch.specSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SECURITY & QA */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="font-mono text-xs text-neutral-400  tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === "vi" ? "Tiêu chuẩn bảo mật & Chất lượng" : "Security & Quality Assurance"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {arch?.securityCards.map((card, idx) => {
                  const Icon = ICON_MAP[card.icon] || ShieldCheck;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#101014] border border-white/[0.08] space-y-3 transition-colors hover:border-white/[0.18]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-white/[0.06] pb-2">
                        <div className="flex items-center gap-2 text-white font-bold font-mono">
                          <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-xs">{card.title[language]}</span>
                        </div>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 ">
                          {card.tag}
                        </span>
                      </div>
                      <p className="text-neutral-300 font-light leading-relaxed text-xs">
                        {card.description[language]}
                      </p>
                      <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 pt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>
                          {language === "vi" ? "Trạng thái: Hoạt động & Đã kiểm tra" : "Status: Active & Verified"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: GIT PROVENANCE */}
          {activeTab === "provenance" && (
            <div className="space-y-6">
              <div className="font-mono text-xs text-neutral-400  tracking-widest flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-neutral-300" />
                <span>
                  {language === "vi" ? "Bằng chứng Git & Nhật ký xác thực commit" : "Verifiable Git Provenance"}
                </span>
              </div>

              <div className="space-y-3">
                {arch?.provenance.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[12px] bg-[#101014] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/[0.18] transition-colors"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
                        <button
                          type="button"
                          onClick={() => handleCopyHash(item.hash)}
                          className="px-2 py-0.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-white font-bold flex items-center gap-1 transition-colors cursor-pointer border border-white/[0.1]"
                        >
                          <span>{item.hash}</span>
                          {copiedHash === item.hash ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-neutral-400" />
                          )}
                        </button>
                        <span className="px-2 py-0.5 rounded-xl bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                          branch: {item.branch}
                        </span>
                        {item.verified && (
                          <span className="px-2 py-0.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                            {language === "vi" ? "Đã xác thực" : "Verified"}
                          </span>
                        )}
                      </div>
                      <p className="text-white text-xs font-light leading-relaxed">
                        {item.message[language]}
                      </p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto justify-center px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] text-xs font-mono text-white flex items-center gap-1.5 transition-colors whitespace-nowrap border border-white/[0.1] shrink-0"
                    >
                      <span>{language === "vi" ? "Kiểm tra commit" : "Inspect Diff"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ─── PREV / NEXT NAVIGATION FOOTER ─── */}
        <section className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/products/${prevProject.id}`}
            className="w-full sm:w-auto flex items-center gap-3 p-4 rounded-[12px] bg-[#121216] border border-white/10 hover:border-white/25 transition-all text-left"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-400" />
            <div>
              <div className="text-[10px] font-mono text-neutral-500 ">
                {language === "vi" ? "Dự án trước" : "Previous Product"}
              </div>
              <div className="font-bold text-white text-sm">
                {prevProject.content[language].title}
              </div>
            </div>
          </Link>

          <Link
            href={`/products/${nextProject.id}`}
            className="w-full sm:w-auto flex items-center justify-end gap-3 p-4 rounded-[12px] bg-[#121216] border border-white/10 hover:border-white/25 transition-all text-right ml-auto"
          >
            <div>
              <div className="text-[10px] font-mono text-neutral-500 ">
                {language === "vi" ? "Dự án kế tiếp" : "Next Product"}
              </div>
              <div className="font-bold text-white text-sm">
                {nextProject.content[language].title}
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </Link>
        </section>
      </main>
    </div>
  );
}
