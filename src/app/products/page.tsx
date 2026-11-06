import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products & Engineering Case Studies — ThinkAI Studio",
  description:
    "Production web platforms, design systems, and resilient infrastructure case studies engineered by ThinkAI Studio.",
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
  openGraph: {
    title: "Products & Engineering Case Studies — ThinkAI Studio",
    description:
      "Production web platforms, design systems, and resilient infrastructure case studies engineered by ThinkAI Studio.",
    url: `${SITE_URL}/products`,
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
