"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Cookie, BarChart3, Mail, Server } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyClient() {
  const { language, toggleLanguage } = useLanguage();
  const isVi = language === "vi";

  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-white selection:text-black">
      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
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
              {isVi ? "Chính sách bảo mật" : "Privacy"}
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
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-12">
        {/* Title Section */}
        <section className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs font-bold tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isVi ? "MINH BẠCH & BẢO MẬT" : "TRANSPARENCY & PRIVACY"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {isVi ? "Chính sách bảo mật" : "Privacy Policy"}
          </h1>
          <p className="text-neutral-400 font-mono text-xs">
            {isVi ? "Cập nhật lần cuối: Tháng 11, 2026" : "Last updated: November 2026"}
          </p>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            {isVi
              ? "ThinkAI Studio tôn trọng quyền riêng tư tuyệt đối của khách truy cập. Dưới đây là thông tin minh bạch về những gì chúng tôi không thu thập và cách hệ thống vận hành thực tế."
              : "ThinkAI Studio values privacy and minimal data footprints. Below is an accurate, transparent accounting of how this site operates and what is never collected."}
          </p>
        </section>

        {/* Core Declarations */}
        <div className="space-y-6">
          {/* 1. Zero Cookies */}
          <article className="p-6 sm:p-8 rounded-xl bg-[#232326] border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Cookie className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isVi ? "1. Không sử dụng Cookie" : "1. Zero Cookies"}
              </h2>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light pl-0 sm:pl-11">
              {isVi
                ? "Website này không cài đặt bất kỳ cookie nào trên thiết bị của bạn. Không có cookie phiên, cookie theo dõi hay bộ nhận diện cá nhân trong local storage phục vụ tiếp thị hoặc lưu vết người dùng."
                : "ThinkAI Studio sets zero cookies. We do not use session cookies, persistent tracking cookies, or browser storage identifiers for advertising or user tracking."}
            </p>
          </article>

          {/* 2. No Third-Party Analytics */}
          <article className="p-6 sm:p-8 rounded-xl bg-[#232326] border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isVi ? "2. Không có công cụ phân tích bên thứ ba" : "2. No Third-Party Analytics"}
              </h2>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light pl-0 sm:pl-11">
              {isVi
                ? "Chúng tôi không nhúng Google Analytics, Meta Pixel hay bất kỳ script theo dõi hành vi nào. Trải nghiệm duyệt web của bạn hoàn toàn riêng tư và không bị truyền tải sang các mạng quảng cáo bên ngoài."
                : "We do not embed third-party tracking scripts, telemetry beacons, or behavioral trackers such as Google Analytics or Meta Pixel. Your browsing activity stays between your device and the edge host."}
            </p>
          </article>

          {/* 3. Direct Contact (Mailto Only) */}
          <article className="p-6 sm:p-8 rounded-xl bg-[#232326] border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isVi ? "3. Liên hệ trực tiếp (Chỉ qua Mailto)" : "3. Direct Contact (Mailto Only)"}
              </h2>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light pl-0 sm:pl-11">
              {isVi
                ? "Trang web không có form nhập liệu hay cơ sở dữ liệu lưu trữ thông tin liên hệ. Mọi yêu cầu kết nối đều kích hoạt liên kết mailto tới ứng dụng email của bạn. Chúng tôi chỉ tiếp nhận thông tin bạn tự nguyện gửi qua email."
                : "The site contains no submission forms or backend form databases. All inquiries trigger a standard mailto link that opens your local email client. We only receive information that you explicitly choose to email us."}
            </p>
          </article>

          {/* 4. Hosting Infrastructure Logs */}
          <article className="p-6 sm:p-8 rounded-xl bg-[#232326] border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isVi ? "4. Hạ tầng máy chủ & Nhật ký truy cập" : "4. Hosting Infrastructure & Access Logs"}
              </h2>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light pl-0 sm:pl-11">
              {isVi
                ? "Website được lưu trữ trên nền tảng Vercel Edge. Để đảm bảo an ninh mạng, chống tấn công DDoS và duy trì độ ổn định, Vercel tự động ghi nhận nhật ký truy cập máy chủ ngắn hạn (địa chỉ IP, thời điểm yêu cầu, user-agent). Các bản ghi này không được dùng để theo dõi danh tính cá nhân."
                : "This site is hosted on Vercel's global edge network. Vercel automatically collects standard ephemeral server access logs (including IP address, request timestamp, HTTP method, and user-agent string) solely for DDoS mitigation, network integrity, and infrastructure health."}
            </p>
          </article>
        </div>

        {/* Contact Note */}
        <section className="p-6 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs text-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-neutral-400">{isVi ? "Mọi thắc mắc về quyền riêng tư xin gửi tới:" : "Privacy inquiries or questions:"}</span>
            <span className="block text-white font-bold text-sm mt-0.5">{profile.email}</span>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="px-4 py-2 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
          >
            {isVi ? "Gửi email" : "Send Email"}
          </a>
        </section>
      </main>
    </div>
  );
}
