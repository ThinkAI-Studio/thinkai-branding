"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, ArrowUpRight, FileText, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

export default function CvClient() {
  const { language, toggleLanguage } = useLanguage();
  const isVi = language === "vi";

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
              <span>{isVi ? "Trang chủ" : "Studio Home"}</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs font-bold text-white">
              CV
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
              aria-label={isVi ? "Tải CV (PDF)" : "Download CV (PDF)"}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isVi ? "Tải CV (PDF)" : "Download CV"}</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
        {/* Title Bar */}
        <section className="p-6 sm:p-8 rounded-xl bg-[#232326] border border-white/[0.10] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider text-[11px]">
                {isVi ? "HỒ SƠ KỸ THUẬT" : "OFFICIAL DOSSIER"}
              </span>
              <span>2026 UPDATED</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {profile.name} — {profile.role}
            </h1>
            <p className="text-sm font-mono text-neutral-300">
              {isVi
                ? "Chuyên môn: CI/CD Pipelines, Rootless Podman, Argo CD, Kubernetes, Next.js & Go."
                : "Specialization: CI/CD Pipelines, Rootless Podman, Argo CD, Kubernetes, Next.js & Go."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
              target="_blank"
              rel="noreferrer"
              download="NguyenBinhMinh-DevOpsEngineer-2026.pdf"
              className="px-4 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold inline-flex items-center gap-2 hover:bg-neutral-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{isVi ? "Tải bản PDF gốc" : "Download Official PDF"}</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <span>{isVi ? "Liên hệ" : "Contact"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Embedded PDF Viewer */}
        <section className="rounded-xl overflow-hidden border border-white/[0.10] bg-[#141417] shadow-2xl">
          <div className="p-3.5 bg-[#1b1b1e] border-b border-white/[0.08] flex items-center justify-between font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>NguyenBinhMinh-DevOpsEngineer-2026.pdf</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Canon</span>
            </div>
          </div>
          <div className="w-full h-[75vh] min-h-[600px] bg-[#0c0c0e]">
            <object
              data="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
              type="application/pdf"
              className="w-full h-full"
              aria-label="Curriculum Vitae PDF"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                <p className="text-neutral-300 text-sm max-w-md">
                  {isVi
                    ? "Trình duyệt của bạn không hỗ trợ hiển thị PDF trực tiếp. Bạn có thể tải file về để xem toàn bộ nội dung."
                    : "Your browser does not support inline PDF viewing. Please download the file to inspect the complete CV."}
                </p>
                <a
                  href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                  target="_blank"
                  rel="noreferrer"
                  download="NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                  className="px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isVi ? "Tải xuống PDF" : "Download PDF"}</span>
                </a>
              </div>
            </object>
          </div>
        </section>
      </main>
    </div>
  );
}
