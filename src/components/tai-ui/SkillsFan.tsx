"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { useLanguage } from "@/context/LanguageContext";

interface SkillCard {
  id: string;
  mark: string;
  group: { en: string; vi: string };
  title: string;
  tech: string;
  description: { en: string; vi: string };
  tags: string[];
  accent: string;
}

const SKILL_CARDS: SkillCard[] = [
  {
    id: "go",
    mark: "01/SYS",
    group: { en: "SYSTEMS", vi: "HỆ THỐNG" },
    title: "Go & Linux",
    tech: "Go",
    description: {
      en: "High-throughput concurrent services, POSIX interfaces, and kernel telemetry.",
      vi: "Dịch vụ đồng thời hiệu năng cao, giao diện POSIX và đo đạc kernel.",
    },
    tags: ["Go 1.24", "Linux", "eBPF", "Goroutines"],
    accent: "#4ade80",
  },
  {
    id: "k8s",
    mark: "02/K8S",
    group: { en: "ORCHESTRATION", vi: "ĐIỀU PHỐI" },
    title: "Kubernetes & K3s",
    tech: "Kubernetes",
    description: {
      en: "Lightweight cluster architecture, ingress controllers, and auto-healing pods.",
      vi: "Kiến trúc cụm tối ưu, ingress controller và pod tự phục hồi.",
    },
    tags: ["K3s", "Helm", "CRDs", "CoreDNS"],
    accent: "#38bdf8",
  },
  {
    id: "podman",
    mark: "03/POD",
    group: { en: "CONTAINERS", vi: "CONTAINER" },
    title: "Rootless Podman",
    tech: "Podman",
    description: {
      en: "Daemonless rootless isolation, systemd integration, and zero privilege escalation.",
      vi: "Cô lập rootless không cần daemon, tích hợp systemd và không leo thang đặc quyền.",
    },
    tags: ["Rootless", "systemd", "OIDC", "Quadlets"],
    accent: "#a855f7",
  },
  {
    id: "tailscale",
    mark: "04/NET",
    group: { en: "NETWORKING", vi: "MẠNG LƯỚI" },
    title: "WireGuard Mesh",
    tech: "Tailscale",
    description: {
      en: "Encrypted point-to-point tunnels, dynamic ACLs, and isolated control plane.",
      vi: "Đường hầm mã hóa điểm-tới-điểm, ACL động và control plane tách biệt.",
    },
    tags: ["WireGuard", "Mesh ACL", "DERP", "Zero-Trust"],
    accent: "#f59e0b",
  },
  {
    id: "gitops",
    mark: "05/OPS",
    group: { en: "GITOPS", vi: "TỰ ĐỘNG HÓA" },
    title: "Argo CD & CI/CD",
    tech: "Argo CD",
    description: {
      en: "Declarative GitOps reconciliation, multi-stage matrix pipelines, and instant rollback.",
      vi: "Đồng bộ hóa GitOps khai báo, pipeline ma trận đa tầng và rollback tức thì.",
    },
    tags: ["Argo CD", "Actions", "Rollout", "Audit"],
    accent: "#ef4444",
  },
  {
    id: "security",
    mark: "06/SEC",
    group: { en: "SECURITY", vi: "AN TOÀN" },
    title: "SAST & Hardening",
    tech: "SonarQube",
    description: {
      en: "Automated vulnerability gating, container image signing, and supply-chain verification.",
      vi: "Quality gate kiểm tra lỗ hổng tự động, ký ảnh container và kiểm tra chuỗi cung ứng.",
    },
    tags: ["SonarQube", "CodeQL", "Trivy", "Cosign"],
    accent: "#10b981",
  },
  {
    id: "database",
    mark: "07/DAT",
    group: { en: "DATABASE", vi: "DỮ LIỆU" },
    title: "PostgreSQL & SQLite",
    tech: "PostgreSQL",
    description: {
      en: "ACID transactional integrity, WAL replication, and atomic RPC view counters.",
      vi: "Toàn vẹn giao dịch ACID, nhân bản WAL và bộ đếm nguyên tử RPC.",
    },
    tags: ["Postgres", "SQLite WAL", "RPC", "Prisma"],
    accent: "#3b82f6",
  },
  {
    id: "frontend",
    mark: "08/WEB",
    group: { en: "FRONTEND", vi: "GIAO DIỆN" },
    title: "Next.js & WebGL",
    tech: "Next.js 16",
    description: {
      en: "React 19 Server Components, Lenis momentum scroll, and procedural Three.js shaders.",
      vi: "React 19 Server Components, cuộn mượt mà Lenis và shader Three.js procedural.",
    },
    tags: ["Next.js 16", "Motion 13", "Three.js", "Tailwind"],
    accent: "#ec4899",
  },
];

export function SkillsFan() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const cardCount = SKILL_CARDS.length;
  // Card fan math from specification:
  // Each card t has rotation θ = t * 3.5 deg
  // Container counter-rotation = -((cardCount - 1) * 3.5) / 2
  const stepDeg = 3.5;
  const containerRotation = -((cardCount - 1) * stepDeg) / 2;

  // Interactive Click Ripple (Elastic Neighbor Wave)
  const handleCardClick = (clickedIndex: number) => {
    if (prefersReduced) return;

    SKILL_CARDS.forEach((_, n) => {
      const cardEl = cardsRef.current[n];
      if (!cardEl) return;

      const d = Math.abs(n - clickedIndex);
      const A = Math.max(0.25, 1 - d * 0.18);
      const delay = d * 0.045;

      const motionWrapper = cardEl.querySelector(".toolkit-card__motion");
      if (!motionWrapper) return;

      // 3-step elastic timeline
      gsap.killTweensOf(motionWrapper);
      const tl = gsap.timeline({ delay });

      // 1. Down-press
      tl.to(motionWrapper, {
        y: 6 * A,
        scale: 1 - 0.03 * A,
        duration: 0.08,
        ease: "power2.in",
      })
      // 2. Overshoot
      .to(motionWrapper, {
        y: -24 * A,
        scale: 1 + 0.07 * A,
        duration: 0.18,
        ease: "power3.out",
      })
      // 3. Elastic Settle
      .to(motionWrapper, {
        y: 0,
        scale: 1,
        duration: 0.42,
        ease: "elastic.out(0.8, 0.35)",
      });
    });
  };

  return (
    <section
      id="skills"
      className="py-24 sm:py-36 relative z-20 bg-[#0d0d10] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === "vi" ? "NĂNG LỰC KỸ THUẬT" : "CORE TECHNICAL STACK"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
              {language === "vi" ? "Kiến Trúc & Công Nghệ" : "Engineering Matrix"}
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md">
            {language === "vi"
              ? "Hệ thống các công nghệ nền tảng được sắp xếp theo fan 3.5°. Nhấp vào thẻ để kích hoạt sóng xung động đàn hồi."
              : "Synchronized 3.5° fan deck. Click any card to trigger the elastic neighbor wave."}
          </p>
        </div>

        {/* ─── CARD FAN DECK CONTAINER ─── */}
        {prefersReduced ? (
          // Reduced Motion: Flat Accessible Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_CARDS.map((card) => (
              <div
                key={card.id}
                className="p-5 rounded-[10px] bg-[#131316] border border-white/[0.1] space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{card.mark}</span>
                  <span className="text-emerald-400 font-bold">{card.group[language]}</span>
                </div>
                <div className="text-lg font-bold text-white">{card.title}</div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {card.description[language]}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {card.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-[10px] bg-white/[0.05] border border-white/10 text-[11px] font-mono text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Scroll-Driven Mathematical 3.5° Fan Deck
          <div className="relative w-full py-16 sm:py-24 flex items-center justify-center overflow-visible select-none">
            {/* Centered Counter-Rotated Container */}
            <div
              ref={containerRef}
              className="relative w-[280px] sm:w-[320px] h-[400px] sm:h-[450px]"
              style={{
                transform: `rotate(${containerRotation}deg)`,
                transformOrigin: "center 120%",
                transition: "transform 0.4s ease-out",
              }}
            >
              {SKILL_CARDS.map((card, idx) => {
                const cardRotation = idx * stepDeg;
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    onClick={() => handleCardClick(idx)}
                    className="absolute inset-0 cursor-pointer group"
                    style={{
                      transform: `rotate(${cardRotation}deg)`,
                      transformOrigin: "center 120%",
                      zIndex: idx + 1,
                    }}
                  >
                    {/* Motion target for click ripple wave */}
                    <div className="toolkit-card__motion w-full h-full p-6 sm:p-7 rounded-[10px] bg-[#131316] border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between transition-colors duration-300 group-hover:border-white/[0.3] group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_25px_60px_rgba(0,0,0,0.95)]">
                      {/* Top Bar: Mark + Group */}
                      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 border-b border-white/[0.08] pb-3">
                        <span className="font-bold text-white/80">{card.mark}</span>
                        <span className="px-2 py-0.5 rounded-[10px] bg-white/[0.06] border border-white/10 text-emerald-400 text-[10px] font-bold">
                          {card.group[language]}
                        </span>
                      </div>

                      {/* Middle: Logo & Title */}
                      <div className="space-y-3 py-4">
                        <div className="w-12 h-12 rounded-[10px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
                          <TechLogo name={card.tech} className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          {card.title}
                        </h3>
                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                          {card.description[language]}
                        </p>
                      </div>

                      {/* Bottom Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                        {card.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-[10px] bg-white/[0.04] text-[10.5px] font-mono text-neutral-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
