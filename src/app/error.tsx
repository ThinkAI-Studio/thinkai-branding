"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { RotateCw, Home } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-xl bg-[#232326] border border-white/[0.10] shadow-2xl flex flex-col items-center text-center space-y-6">
        {/* Wordmark */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 p-1 flex items-center justify-center rounded-xl bg-white/[0.08] border border-white/20 shadow-sm shrink-0">
            <Image
              src="/images/thinkai_studio_logo.png"
              alt="ThinkAI Studio"
              fill
              sizes="28px"
              className="object-contain"
            />
          </div>
          <span className="font-mono font-extrabold text-lg sm:text-xl tracking-tight text-white uppercase">
            THINKAI STUDIO
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tighter">
            {language === "vi" ? "ĐÃ XẢY RA LỖI" : "SOMETHING WENT WRONG"}
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#A3A3A3] leading-relaxed">
            {language === "vi"
              ? "Ứng dụng gặp sự cố ngoài dự kiến. Vui lòng thử lại."
              : "An unexpected error occurred. Please try again."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{language === "vi" ? "Thử lại" : "Try Again"}</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#141414] text-white border border-white/[0.10] hover:border-white/[0.28] font-mono text-xs font-bold transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{language === "vi" ? "Trang chủ" : "Home"}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
