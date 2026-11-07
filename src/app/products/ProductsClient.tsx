"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/tai-ui/Breadcrumbs";
import { StudioFooter } from "@/components/tai-ui/StudioFooter";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { ParallaxProductCover } from "@/components/tai-ui/ParallaxProductCover";

export default function ProductsClient() {
  const { language, toggleLanguage } = useLanguage();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isVi = language === "vi";

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-white selection:text-black flex flex-col justify-between">
      <div>
        {/* ─── STICKY HEADER ─── */}
        <header className="sticky top-0 z-50 bg-[#141414]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 r-btn bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors shrink-0"
                style={{ "--btn-h": "32px" } as React.CSSProperties}
                aria-label={isVi ? "Về trang chủ" : "Return to Studio Home"}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isVi ? "Trang chủ" : "Studio Home"}</span>
              </Link>
              <Breadcrumbs
                items={[
                  { label: "Studio", href: "/" },
                  { label: isVi ? "Sản phẩm" : "Products" },
                ]}
              />
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2.5 py-1 r-btn bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                style={{ "--btn-h": "28px" } as React.CSSProperties}
                aria-label="Toggle language"
              >
                {language === "en" ? "VI" : "EN"}
              </button>

              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 r-btn bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer"
                style={{ "--btn-h": "32px" } as React.CSSProperties}
              >
                <span>{isVi ? "Liên hệ" : "Contact"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ─── MAIN CONTENT ─── */}
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16">
          {/* Hero Section */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 r-chip bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs font-bold tracking-widest uppercase" style={{ "--chip-h": "26px" } as React.CSSProperties}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{isVi ? "HỆ THỐNG & SẢN PHẨM" : "ENGINEERING SYSTEMS"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {isVi ? "Sản phẩm & Case Study Kỹ thuật" : "Products & Engineering Case Studies"}
            </h1>
            <p className="max-w-2xl text-neutral-400 text-sm sm:text-base leading-relaxed">
              {isVi
                ? "Tuyển tập các hệ thống sản phẩm, framework giao diện và hạ tầng phân phối thực tế được thiết kế và triển khai bởi ThinkAI Studio."
                : "Production web applications, component registries, and cloud infrastructure pipelines built with precision design and verifiable code."}
            </p>
          </section>

          {/* Products List (Reusing Homepage Card Architecture) */}
          <section className="space-y-16 sm:space-y-24 divide-y divide-dotted divide-white/20">
            {projects.map((project, index) => {
              const content = project.content[language];
              const indexStr = String(index + 1).padStart(2, "0");
              const totalStr = String(projects.length).padStart(2, "0");

              return (
                <div key={project.id} className="pt-14 sm:pt-16 first:pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Media Preview Column */}
                    <div className="lg:col-span-7">
                      <ParallaxProductCover
                        image={project.preview.image}
                        title={content.title}
                        liveUrl={project.liveUrl}
                        mark={project.mark}
                        status={project.isArchived ? (isVi ? "Lưu trữ" : "ARCHIVED") : (isVi ? "Hoạt động" : "LIVE")}
                        isArchived={project.isArchived}
                        priority={index === 0}
                      />
                    </div>

                    {/* Editorial Description Column */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 r-chip bg-white/10 text-white border border-white/20 text-xs font-medium" style={{ "--chip-h": "24px" } as React.CSSProperties}>
                          {indexStr} / {totalStr} · {project.mark}
                        </span>
                        {project.isArchived && (
                          <span className="inline-flex items-center px-2.5 py-1 r-chip bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-medium font-mono" style={{ "--chip-h": "24px" } as React.CSSProperties}>
                            {project.statusLabel ? project.statusLabel[language] : (isVi ? "Đã lưu trữ" : "Archived")}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {content.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                          {content.category}
                        </p>
                      </div>

                      <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                        {content.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 r-chip text-xs bg-[#141418] text-neutral-200 border border-white/15 hover:border-white/30 transition-colors"
                            style={{ "--chip-h": "26px" } as React.CSSProperties}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                          href={`/products/${project.id}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 r-btn bg-white text-black text-xs font-semibold shadow-md hover:bg-neutral-200 transition-colors min-h-[36px]"
                          style={{ "--btn-h": "34px" } as React.CSSProperties}
                        >
                          <span>{isVi ? "Xem Case Study" : "Explore Case Study"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white active:opacity-70 transition-colors px-3 py-2 r-btn border border-white/15 hover:border-white/30 bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-h-[36px]"
                            style={{ "--btn-h": "34px" } as React.CSSProperties}
                          >
                            <span>{project.isArchived ? (isVi ? "Xem lưu trữ" : "View Archive") : (isVi ? "Truy cập hệ thống" : "Visit Live")}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </div>

      {/* ─── FOOTER & DRAWERS ─── */}
      <StudioFooter
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        lang={language}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={language}
      />
    </div>
  );
}
