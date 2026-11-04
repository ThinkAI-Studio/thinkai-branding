import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About - ThinkAI Studio",
  description:
    "Explore the engineering dossier of Bình Minh, DevOps & systems engineer behind ThinkAI Studio. Proven delivery pipelines, rootless Podman, and craft web.",
  openGraph: {
    title: "About - ThinkAI Studio",
    description:
      "Explore the engineering dossier of Bình Minh, DevOps & systems engineer behind ThinkAI Studio. Proven delivery pipelines, rootless Podman, and craft web.",
    type: "profile",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
