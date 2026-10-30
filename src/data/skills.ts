export type SkillChapterId = "web" | "devops" | "designer";

export interface SkillCardItem {
  id: string;
  name: string;
  logo: string;
  chapter: SkillChapterId;
  proof: {
    en: string;
    vi: string;
  };
  tags: string[];
  proofReference?: string;
}

export interface SkillChapterData {
  id: SkillChapterId;
  index: string;
  category: string;
  label: {
    en: string;
    vi: string;
  };
  title: {
    en: string;
    vi: string;
  };
  subtitle: {
    en: string;
    vi: string;
  };
  accentColor: string;
  accentClass: string;
  accentBorder: string;
  accentBg: string;
  cards: SkillCardItem[];
}

export const SKILL_CHAPTERS: SkillChapterData[] = [
  {
    id: "web",
    index: "01",
    category: "WEB",
    label: {
      en: "WEB ARCHITECTURE",
      vi: "KIẾN TRÚC GIAO DIỆN",
    },
    title: {
      en: "Web Engineering & Shaders",
      vi: "Kỹ Thuật Web & Shader 3D",
    },
    subtitle: {
      en: "Zero-bloat React 19 architecture, Next.js 16 App Router, mathematical motion curves, and procedural WebGL shaders.",
      vi: "Kiến trúc React 19 không dư thừa, Next.js 16 App Router, đường cong chuyển động toán học và shader WebGL procedural.",
    },
    accentColor: "#4ADE80",
    accentClass: "text-emerald-400",
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-500/10",
    cards: [
      {
        id: "nextjs",
        name: "Next.js 16",
        logo: "Next.js 16",
        chapter: "web",
        proof: {
          en: "App Router architecture & zero-overhead Server Actions.",
          vi: "Kiến trúc App Router và Server Actions tối ưu hiệu năng.",
        },
        tags: ["App Router", "Turbopack", "Server Actions"],
      },
      {
        id: "react",
        name: "React 19",
        logo: "React 19",
        chapter: "web",
        proof: {
          en: "Action state hooks, concurrent transitions & server components.",
          vi: "Action state hooks, concurrent transitions và server components.",
        },
        tags: ["Actions", "useTransition", "Server Components"],
      },
      {
        id: "typescript",
        name: "TypeScript",
        logo: "TypeScript",
        chapter: "web",
        proof: {
          en: "Strict type safety across schemas, props & API contracts.",
          vi: "Hệ type an toàn tuyệt đối cho schemas, props và API contracts.",
        },
        tags: ["Strict Mode", "Generics", "Type Inference"],
      },
      {
        id: "tailwind",
        name: "Tailwind CSS v4",
        logo: "Tailwind CSS v4",
        chapter: "web",
        proof: {
          en: "CSS-first architecture with custom @theme tokens & zero runtime.",
          vi: "Kiến trúc CSS-first với token @theme và không runtime overhead.",
        },
        tags: ["v4 Engine", "@theme", "Precision Tokens"],
      },
      {
        id: "gsap-motion",
        name: "GSAP + Motion",
        logo: "GSAP 3.15",
        chapter: "web",
        proof: {
          en: "Smooth ScrollTrigger scrubbed timelines & spring physics.",
          vi: "Timeline cuộn ScrollTrigger mượt mà và vật lý lò xo.",
        },
        tags: ["ScrollTrigger", "Motion 13", "Springs"],
      },
      {
        id: "three-glsl",
        name: "Three.js / GLSL",
        logo: "Three.js WebGL",
        chapter: "web",
        proof: {
          en: "Procedural WebGL shaders & interactive 3D canvas.",
          vi: "Shader WebGL procedural và hiệu ứng tương tác 3D canvas.",
        },
        tags: ["WebGL", "Custom Shaders", "Procedural Noise"],
      },
    ],
  },
  {
    id: "devops",
    index: "02",
    category: "DEVOPS",
    label: {
      en: "SYSTEMS & INFRASTRUCTURE",
      vi: "HỆ THỐNG & HẠ TẦNG",
    },
    title: {
      en: "DevOps & Zero-Trust Mesh",
      vi: "DevOps & Mạng Zero-Trust",
    },
    subtitle: {
      en: "Rootless container orchestration, GitOps continuous delivery, Tailscale point-to-point mesh, and strict SAST security gates.",
      vi: "Điều phối container rootless, phân phối GitOps liên tục, mạng lưới Tailscale điểm-tới-điểm và cổng bảo mật SAST nghiêm ngặt.",
    },
    accentColor: "#06B6D4",
    accentClass: "text-cyan-400",
    accentBorder: "border-cyan-500/30",
    accentBg: "bg-cyan-500/10",
    cards: [
      {
        id: "linux",
        name: "Linux",
        logo: "Linux",
        chapter: "devops",
        proof: {
          en: "Systemd unit isolation, kernel tuning & POSIX reliability.",
          vi: "Cô lập dịch vụ systemd, tinh chỉnh kernel và chuẩn POSIX.",
        },
        tags: ["Debian / Alpine", "systemd", "Kernel Tuning"],
      },
      {
        id: "golang",
        name: "Go",
        logo: "Go",
        chapter: "devops",
        proof: {
          en: "High-throughput concurrent services & CLI tooling.",
          vi: "Dịch vụ đồng thời cao, CLI tooling và WebSocket RPC.",
        },
        tags: ["Goroutines", "CLI Tooling", "Low-Latency"],
      },
      {
        id: "docker-podman",
        name: "Docker & Podman",
        logo: "Docker & Podman",
        chapter: "devops",
        proof: {
          en: "Rootless container execution & multi-stage OCI builds.",
          vi: "Thực thi rootless container và multi-stage OCI builds.",
        },
        tags: ["Rootless", "Multi-stage", "OCI Standard"],
      },
      {
        id: "kubernetes-k3s",
        name: "Kubernetes & K3s",
        logo: "Kubernetes & K3s",
        chapter: "devops",
        proof: {
          en: "Production K3s clusters, Traefik ingress & self-healing.",
          vi: "Cụm K3s production tinh gọn, Traefik ingress và tự phục hồi.",
        },
        tags: ["K3s", "Ingress Routes", "Self-Healing"],
      },
      {
        id: "actions-argo",
        name: "GitHub Actions + Argo CD",
        logo: "Argo CD",
        chapter: "devops",
        proof: {
          en: "Automated CI/CD matrix checks & declarative GitOps sync.",
          vi: "Tự động hóa CI/CD ma trận và đồng bộ GitOps tức thì.",
        },
        tags: ["GitOps Sync", "CI Matrix", "Auto Rollback"],
      },
      {
        id: "tailscale-sast",
        name: "Tailscale + SAST",
        logo: "Tailscale",
        chapter: "devops",
        proof: {
          en: "Zero-Trust WireGuard mesh routing & SAST security gates.",
          vi: "Định tuyến WireGuard Zero-Trust và cổng bảo mật SAST.",
        },
        tags: ["Zero-Trust", "SonarQube", "CodeQL"],
      },
    ],
  },
  {
    id: "designer",
    index: "03",
    category: "DESIGNER",
    label: {
      en: "DESIGN & CRAFT",
      vi: "THIẾT KẾ & TAY NGHỀ",
    },
    title: {
      en: "Spatial Systems & Editorial Layout",
      vi: "Hệ Thống Không Gian & Bố Cục Báo Chí",
    },
    subtitle: {
      en: "10px precision token architecture, Figma component variant mastery, and typographic hierarchy.",
      vi: "Kiến trúc token hình học chuẩn xác 10px, quản trị variant trong Figma và phân cấp bố cục chữ sắc sảo.",
    },
    accentColor: "#F59E0B",
    accentClass: "text-amber-400",
    accentBorder: "border-amber-500/30",
    accentBg: "bg-amber-500/10",
    cards: [
      {
        id: "design-systems",
        name: "Design Systems & Tokens",
        logo: "Design Systems",
        chapter: "designer",
        proof: {
          en: "Precision geometry tokens, obsidian depth & UI registry.",
          vi: "Kiến trúc token hình học, obsidian depth và UI registry.",
        },
        tags: ["Precision Tokens", "Obsidian Depth", "UI Registry"],
      },
      {
        id: "figma",
        name: "Figma",
        logo: "Figma",
        chapter: "designer",
        proof: {
          en: "Component variant systems, auto-layout & design tokens.",
          vi: "Quản trị component variants, auto-layout và design tokens.",
        },
        tags: ["Variants", "Auto-layout", "Design Tokens"],
      },
      {
        id: "typography",
        name: "Typography & Art Direction",
        logo: "Typography",
        chapter: "designer",
        proof: {
          en: "Editorial typographic hierarchy & high-contrast aesthetics.",
          vi: "Phân cấp typography báo chí và thẩm mỹ tương phản cao.",
        },
        tags: ["Typographic Hierarchy", "Contrast", "Micro-type"],
      },
      {
        id: "motion-design",
        name: "Motion Design",
        logo: "Motion Design",
        chapter: "designer",
        proof: {
          en: "Physics spring curves & fluid micro-gesture choreography.",
          vi: "Đường cong lò xo vật lý và vũ đạo cử chỉ mượt mà.",
        },
        tags: ["Spring Physics", "Micro-gestures", "Motion Physics"],
      },
      {
        id: "prototyping",
        name: "Prototyping",
        logo: "Prototyping",
        chapter: "designer",
        proof: {
          en: "Interactive code prototypes validating haptics & latency.",
          vi: "Bản mẫu tương tác mã nguồn kiểm thử độ trễ và xúc giác.",
        },
        tags: ["Prototypes", "Tactile Feel", "Low Latency"],
      },
    ],
  },
];
