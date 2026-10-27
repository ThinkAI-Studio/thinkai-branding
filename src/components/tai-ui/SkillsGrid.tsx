"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  id: string;
  name: string;
  category: "FRONTEND" | "MOTION" | "BACKEND" | "PLATFORM";
  claim: {
    en: string;
    vi: string;
  };
  accentColor: string;
}

const SKILLS_DATA: SkillItem[] = [
  // Frontend
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "FRONTEND",
    claim: {
      en: "App Router architecture, React Server Components streaming, and deterministic asset caching.",
      vi: "Kiến trúc App Router, luồng React Server Component và bộ nhớ đệm tài nguyên tất định.",
    },
    accentColor: "rgba(255, 255, 255, 0.9)",
  },
  {
    id: "react",
    name: "React 19",
    category: "FRONTEND",
    claim: {
      en: "Compiler-optimized reactivity, Server Actions, useActionState, and zero-tearing UI state.",
      vi: "Tối ưu hóa bởi React Compiler, Server Actions, useActionState và trạng thái giao diện không giật xé.",
    },
    accentColor: "#58c4dc",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "FRONTEND",
    claim: {
      en: "Strict type-level arithmetic, branded primitives, exhaustive discriminant unions, and AST safety.",
      vi: "Kiểm tra kiểu nghiêm ngặt, branded primitives, discriminant union toàn diện và an toàn AST.",
    },
    accentColor: "#3178c6",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "FRONTEND",
    claim: {
      en: "Zero-runtime cascade layers, custom CSS variables engine, dynamic opacity tokens, and sharp geometry.",
      vi: "Không runtime CSS cascade layers, hệ thống CSS variable tùy biến, dynamic token và hình học sắc nét.",
    },
    accentColor: "#38bdf8",
  },

  // Motion & Graphics
  {
    id: "gsap",
    name: "GSAP 3.15",
    category: "MOTION",
    claim: {
      en: "Hardware-accelerated ScrollTrigger scrubbing, timeline coordination, and sub-pixel optical physics.",
      vi: "ScrollTrigger tăng tốc phần cứng mượt mà, điều phối timeline và vật lý quang học sub-pixel.",
    },
    accentColor: "#0ae448",
  },
  {
    id: "framer",
    name: "Framer Motion",
    category: "MOTION",
    claim: {
      en: "Spring physics choreography, shared layoutId transitions, and accessible reduced-motion backstops.",
      vi: "Vật lý lò xo linh hoạt, chuyển cảnh chia sẻ layoutId mượt mà và chế độ giảm chuyển động dễ tiếp cận.",
    },
    accentColor: "#0055ff",
  },
  {
    id: "three",
    name: "Three.js WebGL",
    category: "MOTION",
    claim: {
      en: "Custom GLSL halftone shaders, reactive wave caustics, and GPU buffer geometry optimization.",
      vi: "Shader GLSL halftone tùy chỉnh, caustics sóng tương tác và tối ưu hóa buffer geometry trên GPU.",
    },
    accentColor: "#049ef4",
  },

  // Backend & Platform
  {
    id: "golang",
    name: "Go (Golang)",
    category: "BACKEND",
    claim: {
      en: "Concurrent goroutine workers, memory-efficient micro-services, and statically linked CLI toolchains.",
      vi: "Điều phối goroutine đồng thời, microservice tối ưu bộ nhớ và bộ công cụ CLI liên kết tĩnh.",
    },
    accentColor: "#00add8",
  },
  {
    id: "docker-podman",
    name: "Docker & Podman",
    category: "PLATFORM",
    claim: {
      en: "Rootless execution namespaces, multi-stage distroless builds, and deterministic OCI image packaging.",
      vi: "Thực thi rootless cô lập namespace, đóng gói distroless đa tầng và định dạng ảnh OCI tất định.",
    },
    accentColor: "#0db7ed",
  },
  {
    id: "kubernetes-k3s",
    name: "Kubernetes & K3s",
    category: "PLATFORM",
    claim: {
      en: "Declarative GitOps sync via Argo CD, dual-pod resource topologies, and automated self-healing.",
      vi: "Đồng bộ hóa GitOps với Argo CD, tô-pô tài nguyên đa pod và tự động phục hồi lỗi.",
    },
    accentColor: "#326ce5",
  },
  {
    id: "linux-networking",
    name: "Linux & Networking",
    category: "PLATFORM",
    claim: {
      en: "Systemd unit isolation, Zero-Trust Tailscale mesh routing, reverse proxying, and POSIX reliability.",
      vi: "Cô lập tiến trình systemd, định tuyến Tailscale Zero-Trust, reverse proxy và chuẩn POSIX tin cậy.",
    },
    accentColor: "#fcc624",
  },
  {
    id: "devsecops",
    name: "DevSecOps",
    category: "PLATFORM",
    claim: {
      en: "SonarQube & CodeQL automated SAST security gates, Trivy CVE blocking, and signed commit provenance.",
      vi: "Cổng bảo mật SAST tự động với SonarQube & CodeQL, chặn CVE Trivy và xác thực chữ ký commit.",
    },
    accentColor: "#10b981",
  },
];

export function SkillsGrid() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 28,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative z-20 bg-[#0a0a0d] py-24 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === "vi" ? "CÔNG NGHỆ & TAY NGHỀ" : "STACK & CRAFT"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              {language === "vi"
                ? "NĂNG LỰC KỸ THUẬT · 12 CÔNG CỤ CỐT LÕI"
                : "TECHNICAL MASTERY · 12 CORE DISCIPLINES"}
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md">
            {language === "vi"
              ? "Tập trung vào hiệu năng thực tế, tính ổn định trong vận hành và kiến trúc tinh gọn."
              : "Zero unnecessary abstraction, verified in production pipelines and micro-interaction benchmarks."}
          </p>
        </div>

        {/* 12 Individual Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 pt-12 sm:pt-14">
          {SKILLS_DATA.map((skill, index) => (
            <div
              key={skill.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative p-5 sm:p-6 rounded-[10px] bg-[#101014] border border-white/[0.08] hover:border-white/25 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between select-none"
            >
              {/* Subtle Corner Ambient Glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-tr-[10px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: skill.accentColor }}
              />

              <div className="space-y-4 relative z-10">
                {/* Top Row: Brand Logo + Category Pill */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-white/[0.04] border border-white/10 flex items-center justify-center p-2 text-white group-hover:scale-105 transition-transform duration-300">
                    <TechLogo name={skill.name} className="w-6 h-6 object-contain" />
                  </div>

                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-[8px] bg-white/[0.05] border border-white/10 text-neutral-300 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  {skill.name}
                </h3>

                {/* 1-Sentence Technical Mastery Claim */}
                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
                  {skill.claim[language]}
                </p>
              </div>

              {/* Bottom Hairline Highlight */}
              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-500 relative z-10">
                <span>0{index + 1} / 12</span>
                <span className="text-emerald-400/80 group-hover:text-emerald-400 font-semibold tracking-wider">
                  PRODUCTION TESTED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsGrid;
