import React from "react";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

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
      <nav aria-label="Breadcrumb" className={cn("inline-flex items-center min-w-0 select-none", className)}>
        <ol className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs text-neutral-400 min-w-0 flex-nowrap">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/20 select-none shrink-0">
                    /
                  </span>
                )}
                {isFirst && item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 r-chip bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-colors shrink-0"
                    style={{ "--chip-h": "24px" } as React.CSSProperties}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="font-bold text-white truncate max-w-[130px] sm:max-w-none shrink"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors truncate max-w-[100px] sm:max-w-none shrink"
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
