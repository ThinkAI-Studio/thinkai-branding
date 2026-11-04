import React from "react";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const path = item.href || "";
      const fullUrl = path.startsWith("http")
        ? path
        : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: fullUrl,
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={`inline-flex items-center ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/30 select-none">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="font-bold text-white truncate max-w-[180px] sm:max-w-none"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
