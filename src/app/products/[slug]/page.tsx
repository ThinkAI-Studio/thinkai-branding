import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import { ProductCaseStudy } from "@/components/products/ProductCaseStudy";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Product Not Found — ThinkAI Studio",
    };
  }

  return {
    title: `${project.content.en.title} — Case Study | ThinkAI Studio`,
    description: project.content.en.summary,
    openGraph: {
      title: `${project.content.en.title} — Case Study | ThinkAI Studio`,
      description: project.content.en.summary,
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
