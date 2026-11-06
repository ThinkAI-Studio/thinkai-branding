import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Nguyen Binh Minh | ThinkAI Studio",
  description:
    "Engineering dossier of Nguyen Binh Minh, DevOps and Systems Engineer behind ThinkAI Studio. High-performance web architecture, rootless Podman, and GitOps delivery.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About — Nguyen Binh Minh | ThinkAI Studio",
    description:
      "Engineering dossier of Nguyen Binh Minh, DevOps and Systems Engineer behind ThinkAI Studio. High-performance web architecture, rootless Podman, and GitOps delivery.",
    url: `${SITE_URL}/about`,
    type: "profile",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nguyen Binh Minh",
  jobTitle: "DevOps & Systems Engineer",
  worksFor: {
    "@type": "Organization",
    name: "ThinkAI Studio",
    url: SITE_URL,
  },
  sameAs: [
    "https://github.com/bnhminh1010",
    "https://linkedin.com/in/bnhminh",
    "https://x.com/bnhminh1010",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thu Duc City",
    addressRegion: "Ho Chi Minh City",
    addressCountry: "Vietnam",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
