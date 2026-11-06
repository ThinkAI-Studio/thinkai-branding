import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Engineering Showcase & Product Portfolio`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} — Engineering Showcase & Product Portfolio`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    images: [{ url: "/og-image.png?v=20261030", width: 1200, height: 630, alt: `${SITE_NAME}: Engineering Showcase & Product Portfolio` }],
  },
};

export default function Page() {
  return <PortfolioClient />;
}
