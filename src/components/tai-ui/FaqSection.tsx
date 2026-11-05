"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface FAQItem {
  id: string;
  question: {
    en: string;
    vi: string;
  };
  answer: {
    en: string;
    vi: string;
  };
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: {
      en: "What does ThinkAI Studio build?",
      vi: "ThinkAI Studio xây những gì?",
    },
    answer: {
      en: "High-performance web applications, precision UI design systems, and resilient cloud delivery pipelines.",
      vi: "Ứng dụng web hiệu năng cao, hệ thống thiết kế UI chính xác và đường triển khai cloud ổn định.",
    },
  },
  {
    id: "faq-2",
    question: {
      en: "How fast do you reply?",
      vi: "Bao lâu thì được phản hồi?",
    },
    answer: {
      en: "Within 4-8 hours on working days.",
      vi: "Trong vòng 4-8 giờ vào ngày làm việc.",
    },
  },
  {
    id: "faq-3",
    question: {
      en: "Which stack do you use?",
      vi: "Bạn dùng công nghệ gì?",
    },
    answer: {
      en: "Next.js, React and TypeScript on the front; Go, Docker, Kubernetes and Argo CD on the delivery side.",
      vi: "Next.js, React và TypeScript ở phía giao diện; Go, Docker, Kubernetes và Argo CD ở phía triển khai.",
    },
  },
  {
    id: "faq-4",
    question: {
      en: "Are you available for new work?",
      vi: "Hiện có nhận dự án mới không?",
    },
    answer: {
      en: "Yes - currently available for systems and web engineering work.",
      vi: "Có - hiện đang nhận các dự án hệ thống và web.",
    },
  },
  {
    id: "faq-5",
    question: {
      en: "Who runs ThinkAI Studio?",
      vi: "Ai đứng sau ThinkAI Studio?",
    },
    answer: {
      en: "Bình Minh, a DevOps and systems engineer. The studio stays small so the engineering does not get handed off.",
      vi: "Bình Minh, kỹ sư DevOps và hệ thống. Studio giữ quy mô nhỏ để phần kỹ thuật không bị chuyển tay qua lại.",
    },
  },
];

export function FaqSection() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  // Generate FAQPage JSON-LD from the exact same array
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question[language],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[language],
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative z-20 bg-[#0A0A0B] py-20 sm:py-28 border-t border-white/[0.10] shadow-2xl"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{isVi ? "CÂU HỎI THƯỜNG GẶP" : "FREQUENTLY ASKED QUESTIONS"}</span>
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            {isVi ? "Giải đáp thắc mắc về Studio" : "Studio Inquiries & FAQ"}
          </h2>
          <p className="max-w-xl mx-auto text-neutral-400 text-sm sm:text-base font-light">
            {isVi
              ? "Thông tin chi tiết về năng lực kỹ thuật, quy trình làm việc và cam kết của ThinkAI Studio."
              : "Core capabilities, response velocity, technical stack, and direct founder engineering."}
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => (
            <details
              key={item.id}
              open={idx === 0}
              className="group p-5 sm:p-6 rounded-xl bg-[#232326] border border-white/10 hover:border-white/[0.28] transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-white text-base sm:text-lg select-none">
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-500">
                    0{idx + 1}
                  </span>
                  <span>{item.question[language]}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light border-t border-white/[0.06] pt-4 pl-7">
                {item.answer[language]}
              </p>
            </details>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}

export default FaqSection;
