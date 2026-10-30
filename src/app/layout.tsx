import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const barlowCondensed = localFont({
  src: [
    { path: "./fonts/BarlowCondensed-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/BarlowCondensed-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/BarlowCondensed-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-display-local",
});

const socialImage = "/og-image.png?v=20261030";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — Engineering Showcase & Product Portfolio`,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/icon.png?v=20260902", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg?v=20260902", type: "image/svg+xml" },
      { url: "/favicon.ico?v=20260902", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png?v=20260902", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=20260902"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} — Engineering Showcase & Product Portfolio`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: socialImage, width: 1200, height: 630, alt: `${SITE_NAME}: Engineering Showcase & Product Portfolio` }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Engineering Showcase & Product Portfolio`,
    description: SITE_DESCRIPTION,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={barlowCondensed.variable} data-theme="dark" suppressHydrationWarning>
      <body>
        <div className="tai-grain-overlay" aria-hidden="true" />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
