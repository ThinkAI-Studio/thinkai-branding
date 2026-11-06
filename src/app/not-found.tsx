"use client";

import React from "react";
import Link from "next/link";
import { BrandMark } from "@/components/tai-ui/BrandMark";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-xl bg-[#1E1E1E] border border-white/[0.10] shadow-2xl flex flex-col items-center text-center space-y-6">
        {/* Wordmark */}
        <div className="flex items-center gap-3">
          <BrandMark size={28} framed />
          <span className="font-mono font-extrabold text-lg sm:text-xl tracking-tight text-white uppercase">
            THINKAI STUDIO
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tighter">
            404
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#A3A3A3] leading-relaxed">
            {language === "vi"
              ? "Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển."
              : "The requested page could not be found or has been moved."}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 r-btn bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
          style={{ "--btn-h": "40px" } as React.CSSProperties}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === "vi" ? "Về trang chủ" : "Return to Home"}</span>
        </Link>
      </div>
    </main>
  );
}
