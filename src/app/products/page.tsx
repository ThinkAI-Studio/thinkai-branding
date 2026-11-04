import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products - ThinkAI Studio",
  description:
    "Explore production engineering systems and interactive platforms built by ThinkAI Studio, spanning component registries, 3D folios, and GitOps pipelines.",
  openGraph: {
    title: "Products - ThinkAI Studio",
    description:
      "Explore production engineering systems and interactive platforms built by ThinkAI Studio, spanning component registries, 3D folios, and GitOps pipelines.",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
