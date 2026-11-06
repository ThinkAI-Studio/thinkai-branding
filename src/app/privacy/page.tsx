import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy — ThinkAI Studio",
  description:
    "Privacy and data protection commitment of ThinkAI Studio: zero tracking cookies, no third-party telemetry, minimal edge delivery logs, and full compliance with GDPR and Vietnam Law 91/2025/QH15.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy — ThinkAI Studio",
    description:
      "Privacy and data protection commitment of ThinkAI Studio: zero tracking cookies, no third-party telemetry, minimal edge delivery logs, and full compliance with GDPR and Vietnam Law 91/2025/QH15.",
    url: `${SITE_URL}/privacy`,
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
