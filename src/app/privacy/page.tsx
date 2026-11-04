import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy - ThinkAI Studio",
  description:
    "Privacy policy for ThinkAI Studio: zero tracking cookies, no third-party analytics, mailto inquiries only, and minimal hosting access logs on Vercel.",
  openGraph: {
    title: "Privacy Policy - ThinkAI Studio",
    description:
      "Privacy policy for ThinkAI Studio: zero tracking cookies, no third-party analytics, mailto inquiries only, and minimal hosting access logs on Vercel.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
