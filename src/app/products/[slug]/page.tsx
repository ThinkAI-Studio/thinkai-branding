import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";
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

  const title = `${project.content.en.title} — Case Study | ThinkAI Studio`;
  const description = project.content.en.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${slug}`,
      images: [project.preview.image],
      type: "article",
      locale: "en_US",
      alternateLocale: ["vi_VN"],
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

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${project.content.en.title} — Engineering Case Study`,
    description: project.content.en.summary,
    image: project.preview.image,
    author: {
      "@type": "Person",
      name: "Nguyen Binh Minh",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "ThinkAI Studio",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/products/${project.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <ProductCaseStudy project={project} />
    </>
  );
}
