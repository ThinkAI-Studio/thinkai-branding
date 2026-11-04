import type { Metadata } from "next";
import CvClient from "./CvClient";

export const metadata: Metadata = {
  title: "CV - ThinkAI Studio",
  description:
    "Curriculum vitae and technical qualifications of Bình Minh, DevOps engineer: Go, Kubernetes, rootless Podman, GitHub Actions, and high-craft web systems.",
  openGraph: {
    title: "CV - ThinkAI Studio",
    description:
      "Curriculum vitae and technical qualifications of Bình Minh, DevOps engineer: Go, Kubernetes, rootless Podman, GitHub Actions, and high-craft web systems.",
    type: "profile",
  },
};

export default function CVPage() {
  return <CvClient />;
}
