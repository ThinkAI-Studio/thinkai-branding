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
          en: "Engineered ThinkAI UI registry and App Router architecture with zero-overhead server actions.",
          vi: "Kiến trúc ThinkAI UI registry và App Router với Server Actions tối ưu tải trang.",
        },
        tags: ["App Router", "Turbopack", "SSR / SSG", "Server Actions"],
        proofReference: "ThinkAI UI",
      },
      {
        id: "react",
        name: "React 19",
        logo: "React 19",
        chapter: "web",
        proof: {
          en: "Action state hooks, concurrent transitions, and strict hydration boundaries across landing surfaces.",
          vi: "Action state hooks, chuyển cảnh bất đồng bộ và boundary hydration nghiêm ngặt.",
        },
        tags: ["Actions", "useTransition", "Server Components", "Suspense"],
        proofReference: "Landing Surface",
      },
      {
        id: "typescript",
        name: "TypeScript",
        logo: "TypeScript",
        chapter: "web",
        proof: {
          en: "Strict end-to-end type safety across registry schemas, animation props, and API contracts.",
          vi: "Kiểm soát kiểu dữ liệu nghiêm ngặt trên toàn bộ registry schema và API contract.",
        },
        tags: ["Strict Mode", "Generics", "Type Inference", "Zod Validation"],
        proofReference: "CLI Registry",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS v4",
        logo: "Tailwind CSS v4",
        chapter: "web",
        proof: {
          en: "CSS-first architecture with custom @theme tokens, zero runtime overhead, and 10px precision system.",
          vi: "Kiến trúc CSS-first với token @theme tùy biến, không runtime overhead và hệ 10px.",
        },
        tags: ["v4 Engine", "@theme", "Precision Tokens", "JIT Engine"],
        proofReference: "ThinkAI UI 10px",
      },
      {
        id: "gsap-motion",
        name: "GSAP + Motion",
        logo: "GSAP 3.15",
        chapter: "web",
        proof: {
          en: "Pinned 250vh timeline coordination, sub-pixel scrubbing, and hardware-accelerated transforms.",
          vi: "Điều phối timeline cuộn 250vh ghim mượt mà và transform tăng tốc phần cứng.",
        },
        tags: ["ScrollTrigger", "Motion 13", "Scrubbed Timelines", "Springs"],
        proofReference: "Stack & Craft",
      },
      {
        id: "three-glsl",
        name: "Three.js / GLSL",
        logo: "Three.js WebGL",
        chapter: "web",
        proof: {
          en: "Procedural noise fluid canvas shader and Wind 3D interactive book spread reader.",
          vi: "Shader nhiễu chất lỏng procedural trên canvas và bộ lật sách 3D độc bản Wind.",
        },
        tags: ["WebGL", "Custom Shaders", "Procedural Noise", "r185 Canvas"],
        proofReference: "Wind & Canvas",
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
          en: "Systemd unit isolation, kernel tuning, POSIX reliability, and secure host baselines.",
          vi: "Cô lập dịch vụ systemd, tinh chỉnh kernel, chuẩn POSIX và baseline bảo mật máy chủ.",
        },
        tags: ["Debian / Alpine", "systemd Units", "Kernel Tuning", "POSIX Shell"],
        proofReference: "HostDeck Nodes",
      },
      {
        id: "golang",
        name: "Go",
        logo: "Go",
        chapter: "devops",
        proof: {
          en: "High-throughput concurrent services, CLI installers, and lightweight WebSocket RPC pipelines.",
          vi: "Dịch vụ đồng thời hiệu năng cao, bộ cài CLI và luồng WebSocket RPC nhẹ.",
        },
        tags: ["Go 1.24", "Goroutines", "CLI Tooling", "Low-Latency Net"],
        proofReference: "HostDeck Daemon",
      },
      {
        id: "docker-podman",
        name: "Docker & Podman",
        logo: "Docker & Podman",
        chapter: "devops",
        proof: {
          en: "Rootless daemonless Podman execution and multi-stage container builds in HostDeck.",
          vi: "Thực thi Podman rootless không daemon và build container đa giai đoạn trong HostDeck.",
        },
        tags: ["Rootless Podman", "Multi-stage Builds", "Quadlets", "OCI Standard"],
        proofReference: "HostDeck 9 Services",
      },
      {
        id: "kubernetes-k3s",
        name: "Kubernetes & K3s",
        logo: "Kubernetes & K3s",
        chapter: "devops",
        proof: {
          en: "Two-pod production K3s cluster topologies, Traefik ingress, and automated self-healing.",
          vi: "Tô-pô cụm K3s production hai pod, Traefik ingress và cơ chế tự phục hồi lỗi.",
        },
        tags: ["K3s Lightweight", "Ingress Routes", "Declarative YAML", "Self-Healing"],
        proofReference: "ThinkAI K3s",
      },
      {
        id: "actions-argo",
        name: "GitHub Actions + Argo CD",
        logo: "Argo CD",
        chapter: "devops",
        proof: {
          en: "Automated CI/CD matrix checks and declarative GitOps reconciliation with instant rollback.",
          vi: "Kiểm thử ma trận CI/CD tự động và đồng bộ hóa GitOps khai báo với rollback tức thì.",
        },
        tags: ["GitOps Sync", "CI Matrix", "Pull Reconciliation", "Automated Rollback"],
        proofReference: "GitOps Pipeline",
      },
      {
        id: "tailscale-sast",
        name: "Tailscale + SAST",
        logo: "Tailscale",
        chapter: "devops",
        proof: {
          en: "Zero-Trust WireGuard mesh routing, SonarQube quality gates, and CodeQL security checks.",
          vi: "Định tuyến mesh WireGuard Zero-Trust, cổng chất lượng SonarQube và kiểm tra bảo mật CodeQL.",
        },
        tags: ["Zero-Trust Mesh", "SonarQube Gates", "CodeQL Rules", "100% Remediated"],
        proofReference: "Hospital SAST Gates",
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
          en: "Crafted the 10px precision geometry, Obsidian surface tokens, and component registry standards.",
          vi: "Xây dựng hệ hình học chuẩn xác 10px, token màu Obsidian và chuẩn component registry.",
        },
        tags: ["10px Precision", "Semantic Tokens", "Dark Obsidian", "Atomic Craft"],
        proofReference: "ThinkAI UI 10px",
      },
      {
        id: "figma",
        name: "Figma",
        logo: "Figma",
        chapter: "designer",
        proof: {
          en: "Component variant architectures, auto-layout wireframes, and production-ready handoff tokens.",
          vi: "Kiến trúc component variant, wireframe auto-layout và bàn giao token chuẩn kỹ thuật.",
        },
        tags: ["Component Variants", "Auto-layout", "Design Tokens", "Design Handoff"],
        proofReference: "Figma Workspace",
      },
      {
        id: "typography",
        name: "Typography & Art Direction",
        logo: "Typography",
        chapter: "designer",
        proof: {
          en: "Editorial typography hierarchies, typographic rhythm, and high-contrast dark room aesthetics.",
          vi: "Phân cấp typography báo chí, nhịp điệu chữ và thẩm mỹ dark room tương phản cao.",
        },
        tags: ["Geist Sans / Mono", "Editorial Hierarchy", "Visual Hierarchy", "Micro-typographic"],
        proofReference: "Editorial Layout",
      },
      {
        id: "motion-design",
        name: "Motion Design",
        logo: "Motion Design",
        chapter: "designer",
        proof: {
          en: "Physics-based spring curves, continuous gesture choreography, and zero vestibular trigger fallbacks.",
          vi: "Đường cong lò xo vật lý, vũ đạo cử chỉ mượt mà và phương án an toàn không gây chóng mặt.",
        },
        tags: ["Spring Physics", "Micro-gestures", "Choreography", "WCAG AAA Motion"],
        proofReference: "Motion 13 Physics",
      },
      {
        id: "prototyping",
        name: "Prototyping",
        logo: "Prototyping",
        chapter: "designer",
        proof: {
          en: "High-fidelity interactive code prototypes validating real user tactile feedback and latency.",
          vi: "Bản mẫu tương tác mã nguồn chân thực kiểm thử phản hồi xúc giác và độ trễ.",
        },
        tags: ["Interactive Prototypes", "Haptic Feedback", "UX Benchmarking", "Tactile Feel"],
        proofReference: "Wind Platform",
      },
    ],
  },
];
