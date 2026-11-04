import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import { ProductCaseStudy } from "@/components/products/ProductCaseStudy";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.id,
  }));
}

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  "thinkai-ui":
    "An infrastructure-grade component registry crafted with 0px sharp geometry, obsidian depth, spring physics, and an automated zero-overhead CLI installer.",
  wind:
    "Commissioned literary platform and teaching archive with a 3D dual-spread folio reader, four-season shaders, bookshelf, and procedural Web Audio synthesis.",
  homelab:
    "HostDeck: a private bare-metal operations workbench for a nine-service Podman homelab with WireGuard mesh ingress and real-time telemetry streaming.",
  thinkai:
    "ThinkAI Learning: a DevSecOps delivery path for an education backend featuring automated SAST CodeQL scans, Trivy container gates, and Argo CD GitOps.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Product Not Found - ThinkAI Studio",
    };
  }

  const description =
    PRODUCT_DESCRIPTIONS[slug] || project.content.en.summary;

  return {
    title: `${project.content.en.title} - ThinkAI Studio`,
    description,
    openGraph: {
      title: `${project.content.en.title} - ThinkAI Studio`,
      description,
      images: [project.preview.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProductCaseStudy project={project} />;
}
