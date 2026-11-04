"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/tai-ui/Breadcrumbs";

export default function ProductsClient() {
  const { language, toggleLanguage } = useLanguage();

  const isVi = language === "vi";

  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-white selection:text-black">
      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors shrink-0"
              aria-label={isVi ? "Về trang chủ" : "Return to studio home"}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isVi ? "Trang chủ" : "Studio Home"}</span>
            </Link>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              {language === "en" ? "VI" : "EN"}
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs font-bold tracking-widest uppercase">
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

        {/* Products Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => {
            const content = project.content[language];
            return (
              <article
                key={project.id}
                className="p-6 sm:p-8 rounded-xl bg-[#232326] border border-white/[0.10] hover:border-white/[0.28] transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                    <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 uppercase tracking-wider text-[11px]">
                      {content.category}
                    </span>
                    <span>{project.period}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {content.title}
                  </h2>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light">
                    {content.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${project.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-colors"
                  >
                    <span>{isVi ? "Xem Case Study" : "Explore Case Study"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs font-bold text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{isVi ? "Live" : "Visit"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
