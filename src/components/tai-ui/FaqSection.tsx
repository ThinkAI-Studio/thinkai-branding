"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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

// Animated accordion item
function FaqItem({
  item,
  idx,
  language,
  defaultOpen,
  reducedMotion,
}: {
  item: FAQItem;
  idx: number;
  language: "en" | "vi";
  defaultOpen?: boolean;
  reducedMotion: boolean;
}) {
  const [isOpen, setIsOpen] = useState(!!defaultOpen);

  const itemVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 24 },
    visible: reducedMotion
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            delay: idx * 0.06,
          },
        },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`group rounded-xl border transition-all duration-200 cursor-pointer select-none ${
        isOpen
          ? "bg-[#1A1A20] border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-[#141418] border-white/10 hover:border-white/25 hover:bg-[#18181E]"
      } active:scale-[0.99]`}
      style={{ transition: "transform 150ms cubic-bezier(0.22,1,0.36,1), border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease" }}
      onClick={() => setIsOpen((v) => !v)}
    >
      {/* Header row */}
      <div
        role="button"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-trigger-${item.id}`}
        className="flex items-center justify-between gap-4 p-5 sm:p-6 w-full text-left"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((v) => !v);
          }
        }}
        tabIndex={0}
      >
        <span className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
          <span className="font-bold text-white text-base sm:text-lg leading-tight">
            {item.question[language]}
          </span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }
          className="shrink-0 text-neutral-400"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Animated body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            key="body"
            initial={reducedMotion ? false : { gridTemplateRows: "0fr" }}
            animate={{ gridTemplateRows: "1fr" }}
            exit={reducedMotion ? {} : { gridTemplateRows: "0fr" }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ display: "grid", overflow: "hidden" }}
          >
            <div style={{ minHeight: 0 }}>
              <p className="pb-5 sm:pb-6 px-5 sm:px-6 pt-0 text-sm sm:text-base text-neutral-300 leading-relaxed font-light border-t border-white/[0.06] pt-4 pl-[52px]">
                {item.answer[language]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(() => reducedMotion);

  // Trigger stagger once on scroll into view (skipped when reducedMotion starts true)
  useEffect(() => {
    if (reducedMotion) {
      // reducedMotion flip: show immediately without IntersectionObserver
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

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

  // Heading masked-reveal variants (same approach as MaskedTextReveal)
  const headingVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 32 },
    visible: reducedMotion
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        },
  };

  const eyebrowVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 12 },
    visible: reducedMotion
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0 } }, // stagger handled per-item via delay
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section
        id="faq"
        ref={sectionRef}
        aria-labelledby="faq-heading"
        className="relative z-20 bg-[#0A0A0B] py-20 sm:py-28 border-t border-white/[0.10] shadow-2xl"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
          {/* Heading block — masked reveal on scroll */}
          <div className="text-center space-y-3 overflow-hidden">
            <motion.div
              variants={eyebrowVariants}
              initial="hidden"
              animate={hasEntered ? "visible" : "hidden"}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs font-bold tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{isVi ? "CÂU HỎI THƯỜNG GẶP" : "FREQUENTLY ASKED QUESTIONS"}</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                id="faq-heading"
                variants={headingVariants}
                initial="hidden"
                animate={hasEntered ? "visible" : "hidden"}
                className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
              >
                {isVi ? "Giải đáp thắc mắc về Studio" : "Studio Inquiries & FAQ"}
              </motion.h2>
            </div>

            <motion.p
              variants={{
                hidden: reducedMotion ? {} : { opacity: 0 },
                visible: reducedMotion
                  ? {}
                  : {
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
                    },
              }}
              initial="hidden"
              animate={hasEntered ? "visible" : "hidden"}
              className="max-w-xl mx-auto text-neutral-400 text-sm sm:text-base font-light"
            >
              {isVi
                ? "Thông tin chi tiết về năng lực kỹ thuật, quy trình làm việc và cam kết của ThinkAI Studio."
                : "Core capabilities, response velocity, technical stack, and direct founder engineering."}
            </motion.p>
          </div>

          {/* Staggered FAQ items */}
          <motion.div
            className="space-y-4"
            variants={listVariants}
            initial="hidden"
            animate={hasEntered ? "visible" : "hidden"}
          >
            {FAQ_DATA.map((item, idx) => (
              <FaqItem
                key={item.id}
                item={item}
                idx={idx}
                language={language}
                defaultOpen={idx === 0}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default FaqSection;
