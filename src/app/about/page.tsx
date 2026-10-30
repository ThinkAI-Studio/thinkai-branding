"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { profile, copy } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language, toggleLanguage } = useLanguage();
  const t = copy[language].aboutDrawer;

  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-white selection:text-black">
      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "vi" ? "Trang chủ" : "Studio Home"}</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs font-bold text-white ">
              {language === "vi" ? "Giới thiệu" : "About"}
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

            <a
              href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
              target="_blank"
              rel="noreferrer"
              download="NguyenBinhMinh-DevOpsEngineer-2026.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black font-mono text-xs font-bold  tracking-wider hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === "vi" ? "Tải CV (PDF)" : "Download CV"}</span>
              <span className="sm:hidden">CV</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16 sm:space-y-20">
        {/* Founder Hero Card */}
        <section className="p-6 sm:p-10 rounded-xl bg-[#121216] border border-white/[0.08] shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-10">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-white/10 shadow-lg bg-[#18181c] shrink-0 group">
            <Image
              src="/images/binhminh-sketch.jpg"
              alt="Nguyen Binh Minh - DevOps & Systems Engineer"
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-xl bg-white/10 text-white font-mono text-[11px] font-bold tracking-wider">
                FOUNDER & ENGINEER
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR WORK
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t.founderName}
            </h1>

            <p className="text-xs sm:text-sm font-mono text-neutral-300 font-medium">
              {t.founderRole}
            </p>

            <p className="text-xs font-mono text-neutral-400 flex items-center gap-1.5 pt-0.5">
              <span>📍 {t.founderStatus}</span>
            </p>
          </div>
        </section>

        {/* Editorial Bio Paragraphs */}
        <section className="space-y-6 max-w-4xl text-lg sm:text-2xl text-neutral-200 font-light leading-relaxed">
          {t.bioParagraphs.map((para, idx) => (
            <p key={idx} className="tracking-tight">
              {para}
            </p>
          ))}
        </section>

        {/* 4 Core Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
          {/* 1. Flagship Products */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#101014] border border-white/[0.08] space-y-4 hover:border-white/[0.18] transition-colors">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold  tracking-widest text-neutral-400 border-b border-white/[0.06] pb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{t.productsLabel}</span>
            </div>
            <ul className="space-y-3 font-mono text-sm text-neutral-200">
              {t.productsList.map((prod, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-500 shrink-0">↳</span>
                  <span className="leading-snug">{prod}</span>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 shrink-0">↳</span>
                <span className="leading-snug">Wind — Thi Quán Đường Đại (huuthinh.thinkai.id.vn)</span>
              </li>
            </ul>
          </div>

          {/* 2. Core Stack */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#101014] border border-white/[0.08] space-y-4 hover:border-white/[0.18] transition-colors">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold  tracking-widest text-neutral-400 border-b border-white/[0.06] pb-3">
              <span className="w-2 h-2 rounded-full bg-neutral-300" />
              <span>{t.stackLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              {t.stackList.map((stk, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-200"
                >
                  {stk}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Education & Recognition */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#101014] border border-white/[0.08] space-y-4 hover:border-white/[0.18] transition-colors">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold  tracking-widest text-neutral-400 border-b border-white/[0.06] pb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{t.educationLabel}</span>
            </div>
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="text-sm font-bold text-white">{t.degree}</div>
                <div className="text-neutral-400 text-xs mt-0.5">{t.schoolMeta}</div>
              </div>
              <div className="pt-2 border-t border-white/[0.04]">
                <div className="text-sm font-bold text-emerald-400">{t.awardTitle}</div>
                <div className="text-neutral-400 text-xs mt-0.5">{t.awardMeta}</div>
              </div>
            </div>
          </div>

          {/* 4. Core Principles */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#101014] border border-white/[0.08] space-y-4 hover:border-white/[0.18] transition-colors">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold  tracking-widest text-neutral-400 border-b border-white/[0.06] pb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{t.principlesLabel}</span>
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-neutral-300">
              {t.principlesList.map((prin, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">●</span>
                  <span className="leading-snug">{prin}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── CONTACT & DIRECT LINKS ─── */}
        <section className="p-6 sm:p-10 rounded-xl bg-[#121216] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono  tracking-widest text-neutral-400 font-bold">
              {language === "vi" ? "LIÊN HỆ TRỰC TIẾP" : "DIRECT CONTACT"}
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="text-lg sm:text-2xl font-mono font-extrabold text-white hover:text-emerald-400 transition-colors mt-1 block"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
              target="_blank"
              rel="noreferrer"
              download="NguyenBinhMinh-DevOpsEngineer-2026.pdf"
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 font-mono text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV (PDF)</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 font-mono text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 font-mono text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
