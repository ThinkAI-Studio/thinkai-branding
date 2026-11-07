"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/tai-ui/Breadcrumbs";
import { StudioFooter } from "@/components/tai-ui/StudioFooter";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ContactModal } from "@/components/tai-ui/ContactModal";

export default function PrivacyClient() {
  const { language, toggleLanguage } = useLanguage();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isVi = language === "vi";

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-white selection:text-black flex flex-col justify-between">
      <div>
        {/* ─── STICKY HEADER ─── */}
        <header className="sticky top-0 z-50 bg-[#141414]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
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
                  { label: isVi ? "Chính sách bảo mật" : "Privacy" },
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
            </div>
          </div>
        </header>

        {/* ─── MAIN CONTENT ─── */}
        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-12">
          {/* Title Header */}
          <section className="space-y-4 border-b border-white/[0.08] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 r-chip bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs font-bold tracking-widest uppercase" style={{ "--chip-h": "26px" } as React.CSSProperties}>
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isVi ? "MINH BẠCH & BẢO VỆ DỮ LIỆU" : "TRANSPARENCY & DATA PROTECTION"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {isVi ? "Chính sách bảo vệ dữ liệu" : "Privacy & Data Policy"}
            </h1>
            <p className="text-neutral-400 font-mono text-xs">
              {isVi ? "Phiên bản hiệu lực: Tháng 11, 2026" : "Effective: November 2026"}
            </p>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              {isVi
                ? "ThinkAI Studio tuân thủ nguyên tắc tối thiểu hoá dữ liệu. Chúng tôi không lưu trữ dữ liệu người dùng trên máy chủ, không sử dụng cookies theo dõi, không chèn mã quảng cáo hay công cụ phân tích của bên thứ ba."
                : "ThinkAI Studio operates under strict data minimization principles. We do not maintain visitor user accounts, forms, databases, tracking cookies, advertising pixels, or session replay scripts."}
            </p>
          </section>

          {/* Quick Overview Bento Summary */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 r-panel bg-[#1E1E1E] border border-white/[0.10] space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isVi ? "ZERO COOKIES" : "ZERO COOKIES"}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {isVi ? "Không lưu bất kỳ HTTP cookie theo dõi nào trên trình duyệt." : "Zero tracking or marketing cookies set by this domain."}
              </p>
            </div>

            <div className="p-5 r-panel bg-[#1E1E1E] border border-white/[0.10] space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isVi ? "LOCAL FONTS & MEDIA" : "LOCAL FONTS & ASSETS"}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {isVi ? "Font chữ và tài nguyên tự lưu trữ cục bộ, không gọi Google Fonts." : "All typography and images are self-hosted directly without third-party CDN leaks."}
              </p>
            </div>

            <div className="p-5 r-panel bg-[#1E1E1E] border border-white/[0.10] space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isVi ? "NO DB / NO FORMS" : "NO DATABASE STORAGE"}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {isVi ? "Nút liên hệ chỉ khởi tạo liên kết gửi thư điện tử mailto:." : "Inquiries trigger your default mail client via mailto: with no database recording."}
              </p>
            </div>
          </section>

          {/* Section 1: Data Controller */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-neutral-500 font-normal">01.</span>
              <span>{isVi ? "Chủ thể chịu trách nhiệm xử lý dữ liệu" : "Data Controller"}</span>
            </h2>
            <div className="p-6 r-panel bg-[#1E1E1E] border border-white/[0.10] space-y-3 font-mono text-xs leading-relaxed text-neutral-300">
              <p><strong className="text-white">{isVi ? "Chủ sở hữu / Kỹ sư đại diện:" : "Founder & Principal Engineer:"}</strong> Nguyen Binh Minh</p>
              <p><strong className="text-white">{isVi ? "Thương hiệu:" : "Studio:"}</strong> ThinkAI Studio</p>
              <p><strong className="text-white">{isVi ? "Địa chỉ hoạt động:" : "Registered Location:"}</strong> Thu Duc City, Ho Chi Minh City, Vietnam</p>
              <p><strong className="text-white">{isVi ? "Thư điện tử liên hệ:" : "Direct Inquiry Email:"}</strong> <a href={`mailto:${profile.email}`} className="text-emerald-400 hover:underline">{profile.email}</a></p>
            </div>
          </section>

          {/* Section 2: What Data is Processed (Data Matrix Table) */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-neutral-500 font-normal">02.</span>
              <span>{isVi ? "Danh mục dữ liệu & mục đích xử lý" : "What Data is Processed"}</span>
            </h2>

            <div className="r-panel overflow-x-auto border border-white/[0.10] bg-[#1E1E1E]">
              <table className="w-full text-left font-mono text-xs text-neutral-300">
                <thead className="bg-white/[0.05] border-b border-white/[0.08] text-white font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5 sm:p-4">{isVi ? "Nguồn thu thập" : "Source"}</th>
                    <th className="p-3.5 sm:p-4">{isVi ? "Dữ liệu" : "Data Elements"}</th>
                    <th className="p-3.5 sm:p-4">{isVi ? "Mục đích" : "Purpose"}</th>
                    <th className="p-3.5 sm:p-4">{isVi ? "Cơ sở pháp lý" : "Legal Basis"}</th>
                    <th className="p-3.5 sm:p-4">{isVi ? "Thời hạn lưu trữ" : "Retention"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  <tr>
                    <td className="p-3.5 sm:p-4 text-white font-semibold">{isVi ? "Edge Logs (Vercel)" : "Edge Access Logs (Vercel)"}</td>
                    <td className="p-3.5 sm:p-4">IP, User Agent, URL path, timestamp</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Định tuyến, phân phối mạng CDN, chống tấn công DDoS" : "Delivery, CDN routing, and DDoS / abuse mitigation"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Lợi ích hợp pháp (Legitimate Interest)" : "Legitimate Interest (Art. 6(1)(f) GDPR)"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Tạm thời (ngắn hạn, tự động xoá theo chu kỳ edge)" : "Ephemeral (short-lived, days)"}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 text-white font-semibold">{isVi ? "Thư liên hệ (Mailto)" : "Email Inquiries (Mailto)"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Tên người gửi, email, nội dung trao đổi" : "Sender name, email address, message body"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Phản hồi báo giá & tư vấn kỹ thuật dự án" : "Business correspondence & engineering consultation"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Đồng ý của người gửi / Tiền hợp đồng" : "Consent & pre-contractual inquiry"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Trong suốt thời gian hợp tác kinh doanh" : "Duration of business relationship"}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 text-white font-semibold">{isVi ? "Bộ nhớ trình duyệt (Local)" : "Client Browser (localStorage)"}</td>
                    <td className="p-3.5 sm:p-4">portfolio-language, portfolio-theme</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Ghi nhớ ngôn ngữ & giao diện người dùng" : "Remembering UI language & theme preference"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Chức năng thiết yếu do người dùng chọn" : "Functional necessity"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Lưu trên thiết bị cho tới khi người dùng xoá" : "Persistent on device until cleared"}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 text-white font-semibold">{isVi ? "Bộ nhớ phiên (Session)" : "Session Storage (sessionStorage)"}</td>
                    <td className="p-3.5 sm:p-4">thinkai_preloader_seen</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Tránh lặp lại hiệu ứng splash khi tải trang cùng phiên" : "Suppressing preloader splash within active tab"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Chức năng thiết yếu" : "Functional necessity"}</td>
                    <td className="p-3.5 sm:p-4">{isVi ? "Tự xoá khi đóng tab trình duyệt" : "Cleared when tab closes"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Cookies and Local Storage */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-neutral-500 font-normal">03.</span>
              <span>{isVi ? "Cookies & bộ nhớ cục bộ trên thiết bị" : "Cookies & Local Storage"}</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              <p>
                {isVi
                  ? "Trang web này khẳng định không sử dụng bất kỳ HTTP Cookie nào. Chúng tôi không cài đặt các tập tin cookie theo dõi bên thứ ba, không nhúng mã phân tích (Google Analytics, Mixpanel), không dùng pixel tiếp thị (Facebook/Meta Pixel, TikTok Pixel, LinkedIn Insight Tag) và không ghi lại phiên màn hình (Hotjar, FullStory, Microsoft Clarity)."
                  : "This website sets zero HTTP cookies. We do not use third-party analytics trackers (e.g. Google Analytics), retargeting marketing pixels (Meta, LinkedIn, X, TikTok), or session recording software (Hotjar, FullStory)."}
              </p>
              <div className="p-5 r-panel bg-[#1E1E1E] border border-white/[0.10] space-y-3 font-mono text-xs">
                <div className="text-white font-bold">{isVi ? "Ba khóa dữ liệu duy nhất lưu trên trình duyệt của bạn:" : "The only three storage keys stored on your device:"}</div>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                  <li><code className="text-emerald-400">{"localStorage.getItem('portfolio-language')"}</code>: {isVi ? "Lưu giá trị 'en' hoặc 'vi'." : "Stores 'en' or 'vi' preference."}</li>
                  <li><code className="text-emerald-400">{"localStorage.getItem('portfolio-theme')"}</code>: {isVi ? "Lưu giá trị giao diện ('dark')." : "Stores active visual theme ('dark')."}</li>
                  <li><code className="text-emerald-400">{"sessionStorage.getItem('thinkai_preloader_seen')"}</code>: {isVi ? "Lưu cờ 'true' tạm thời để không phát lại animation mở đầu trong cùng phiên làm việc." : "Temporary session boolean flag to prevent splash replay within the current tab."}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Hosting and Processors */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-neutral-500 font-normal">04.</span>
              <span>{isVi ? "Hạ tầng máy chủ & Bên xử lý dữ liệu" : "Hosting & Processors"}</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              <p>
                {isVi
                  ? "Website được lưu trữ và phân phối thông qua nền tảng Vercel Inc. (San Francisco, CA, Hoa Kỳ). Vercel đóng vai trò là Bên xử lý dữ liệu (Data Processor) chịu trách nhiệm định tuyến máy chủ biên và ngăn chặn tấn công mạng."
                  : "This website is deployed on Vercel Inc. (San Francisco, CA, USA) as our infrastructure processor. Vercel routes global edge traffic, provides SSL certificates, and operates network-level DDoS filtering."}
              </p>
              <p>
                {isVi
                  ? "Mọi luồng truyền dữ liệu qua biên giới tuân thủ Thoả thuận Xử lý Dữ liệu (DPA) của Vercel kết hợp cùng các Điều khoản Hợp đồng Tiêu chuẩn (SCCs) đã được Uỷ ban Châu Âu (EC) và Cơ quan Bảo vệ Dữ liệu Vương quốc Anh (ICO) phê duyệt."
                  : "International data transfers are governed under Vercel's Data Processing Addendum (DPA) incorporating European Commission and UK ICO-approved Standard Contractual Clauses (SCCs)."}
              </p>
            </div>
          </section>

          {/* Section 5: International Rights (GDPR & UK GDPR) */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-neutral-500 font-normal">05.</span>
              <span>{isVi ? "Quyền riêng tư quốc tế (GDPR & UK GDPR)" : "Your International Rights (GDPR & UK DPA)"}</span>
            </h2>
            <div className="p-6 r-panel bg-[#1E1E1E] border border-white/[0.10] space-y-4 text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
              <p className="text-white font-bold font-sans text-sm">
                {isVi
                  ? "Dành cho khách truy cập thuộc Liên minh Châu Âu (EU) theo Quy định 2016/679 (GDPR) và Vương quốc Anh theo UK GDPR / Đạo luật Bảo vệ Dữ liệu 2018:"
                  : "For individuals located in the European Economic Area (EEA) and the United Kingdom under Regulation (EU) 2016/679 and UK Data Protection Act 2018:"}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <li className="p-3 bg-white/[0.04] border border-white/10 r-inner">
                  <strong className="text-emerald-400 block mb-1">{isVi ? "Quyền tiếp cận (Art. 15)" : "Right of Access (Art. 15)"}</strong>
                  {isVi ? "Yêu cầu cung cấp thông tin dữ liệu chúng tôi có về bạn." : "Request a copy of your personal data."}
                </li>
                <li className="p-3 bg-white/[0.04] border border-white/10 r-inner">
                  <strong className="text-emerald-400 block mb-1">{isVi ? "Quyền cải chính (Art. 16)" : "Right to Rectification (Art. 16)"}</strong>
                  {isVi ? "Yêu cầu chỉnh sửa thông tin chưa chính xác." : "Request correction of inaccurate information."}
                </li>
                <li className="p-3 bg-white/[0.04] border border-white/10 r-inner">
                  <strong className="text-emerald-400 block mb-1">{isVi ? "Quyền xoá bỏ (Art. 17)" : "Right to Erasure (Art. 17)"}</strong>
                  {isVi ? "Yêu cầu xoá thư từ trao đổi khi không còn cơ sở lưu giữ." : "Request deletion of your communications ('Right to be forgotten')."}
                </li>
                <li className="p-3 bg-white/[0.04] border border-white/10 r-inner">
                  <strong className="text-emerald-400 block mb-1">{isVi ? "Quyền hạn chế (Art. 18)" : "Right to Restriction (Art. 18)"}</strong>
                  {isVi ? "Tạm ngưng xử lý thông tin cá nhân." : "Request restriction of data processing activities."}
                </li>
                <li className="p-3 bg-white/[0.04] border border-white/10 r-inner">
                  <strong className="text-emerald-400 block mb-1">{isVi ? "Quyền chuyển dữ liệu (Art. 20)" : "Data Portability (Art. 20)"}</strong>
                  {isVi ? "Nhận dữ liệu dạng có cấu trúc, đọc được bằng máy." : "Obtain personal data in a machine-readable format."}
                </li>
                <li className="p-3 bg-white/[0.04] border border-white/10 r-inner">
                  <strong className="text-emerald-400 block mb-1">{isVi ? "Quyền khiếu nại (Art. 77)" : "Right to Lodge a Complaint"}</strong>
                  {isVi ? "Khiếu nại đến Cơ quan bảo vệ dữ liệu có thẩm quyền tại EU/UK." : "Lodge a complaint with your local EU DPA or UK Information Commissioner."}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Vietnam Rights (Law 91/2025/QH15 & Decree 356/2025/ND-CP) */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-neutral-500 font-normal">06.</span>
              <span>{isVi ? "Quyền của chủ thể dữ liệu theo Pháp luật Việt Nam" : "Data Subject Rights under Vietnam Law"}</span>
            </h2>
            <div className="p-6 r-panel bg-[#1E1E1E] border border-white/[0.10] space-y-4 text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
              <div className="space-y-2 border-b border-white/[0.08] pb-4">
                <span className="inline-flex items-center px-2.5 py-1 r-chip bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-xs" style={{ "--chip-h": "24px" } as React.CSSProperties}>
                  {isVi ? "CĂN CỨ PHÁP LÝ CHÍNH THỨC" : "STATUTORY LEGAL BASIS"}
                </span>
                <p className="text-white font-bold font-sans text-sm sm:text-base">
                  {isVi
                    ? "Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 (Quốc hội thông qua ngày 26/06/2025, có hiệu lực từ ngày 01/01/2026) và Nghị định số 356/2025/NĐ-CP (Chính phủ ban hành ngày 31/12/2025, có hiệu lực từ ngày 01/01/2026, thay thế Nghị định 13/2023/NĐ-CP):"
                    : "Law on Personal Data Protection No. 91/2025/QH15 (enacted 26/06/2025, in force 01/01/2026) and Decree No. 356/2025/ND-CP (issued 31/12/2025, in force 01/01/2026, superseding Decree 13/2023/ND-CP):"}
                </p>
              </div>

              <div className="space-y-3 font-sans text-xs sm:text-sm text-neutral-200">
                <p>
                  {isVi
                    ? "Theo quy định hiện hành, Quý khách truy cập tại Việt Nam được đảm bảo đầy đủ các quyền: Quyền được biết; Quyền đồng ý và rút lại sự đồng ý; Quyền tiếp cận, truy xuất và chỉnh sửa dữ liệu; Quyền xóa dữ liệu cá nhân; Quyền hạn chế và phản đối xử lý dữ liệu; Quyền yêu cầu cung cấp dữ liệu; Quyền khiếu nại, tố cáo và yêu cầu bồi thường thiệt hại."
                    : "You are entitled to full statutory rights under Vietnamese law: Right to be informed; Right to consent and withdraw consent; Right to access and rectify data; Right to erasure; Right to restrict and object to processing; Right to data portability; and Right to claim compensation."}
                </p>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 r-inner text-emerald-300 font-mono text-xs space-y-1.5">
                  <p><strong>{isVi ? "Thời hạn phản hồi cam kết:" : "Commitment Response SLA:"}</strong> {isVi ? "Chúng tôi tiếp nhận, xác minh và xử lý mọi yêu cầu liên quan đến dữ liệu cá nhân trong vòng tối đa 72 giờ làm việc." : "We review, verify, and resolve all data rights requests within a maximum of 72 hours."}</p>
                  <p><strong>{isVi ? "Cơ quan chuyên trách bảo vệ dữ liệu:" : "Competent Supervisory Authority:"}</strong> {isVi ? "Trường hợp có khiếu nại, Quý khách có quyền phản ánh tới Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (A05) - Bộ Công an." : "Complaints can be escalated to the Department of Cybersecurity and High-Tech Crime Prevention (A05), Ministry of Public Security of Vietnam."}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Outbound Links, Security & Contact */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-neutral-500 font-normal">07.</span>
              <span>{isVi ? "Liên kết ngoài, Bảo mật & Cập nhật" : "Outbound Links, Security & Contact"}</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              <p>
                {isVi
                  ? "Trang web dẫn liên kết tới các nền tảng bên ngoài gồm GitHub, LinkedIn, X và các tên miền sản phẩm do studio vận hành (như Hostdeck, Wind, Homelab). Các dịch vụ bên ngoài hoạt động theo chính sách bảo mật riêng của họ."
                  : "This site contains outbound links to third-party services including GitHub, LinkedIn, X, and studio-built project domains. Their respective independent privacy policies apply upon navigation."}
              </p>
              <p>
                {isVi
                  ? "Chúng tôi không bán, chia sẻ hoặc thương mại hóa dữ liệu cá nhân của bạn dưới bất kỳ hình thức nào. Website không áp dụng công nghệ chấm điểm người dùng hay ra quyết định tự động."
                  : "We never sell, rent, or trade personal data. There is no automated profiling, scoring, or automated decision-making on this site."}
              </p>
              <div className="pt-2">
                <p className="font-mono text-xs text-neutral-400">
                  {isVi
                    ? "Mọi thắc mắc pháp lý hoặc đề nghị thực hiện quyền riêng tư xin gửi thư trực tiếp về: "
                    : "For all privacy or legal correspondence, reach us directly at: "}
                  <a href={`mailto:${profile.email}`} className="text-emerald-400 hover:underline">{profile.email}</a>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ─── FOOTER ─── */}
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
