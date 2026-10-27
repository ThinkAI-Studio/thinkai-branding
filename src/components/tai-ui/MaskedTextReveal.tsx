"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MaskedTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  splitBy?: "lines" | "words";
  once?: boolean;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function MaskedTextReveal({
  text,
  className = "",
  delay = 0,
  as: Component = "h1",
  splitBy = "lines",
  once = true,
}: MaskedTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, margin: "0px 0px -5% 0px", amount: 0.05 });
  const prefersReducedMotion = useReducedMotion();

  const renderContentWithBoldArrow = (itemText: string) => {
    if (itemText.includes("→")) {
      const parts = itemText.split("→");
      return (
        <span className="inline-flex items-center justify-center gap-[0.18em] leading-none">
          {parts[0]}
          <svg
            className="inline-block w-[0.82em] h-[0.82em] text-white shrink-0 self-center"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="13 5 20 12 13 19" />
          </svg>
          {parts[1]}
        </span>
      );
    }
    return itemText;
  };

  if (prefersReducedMotion) {
    return <Component className={className}>{renderContentWithBoldArrow(text)}</Component>;
  }

  const items = splitBy === "lines" ? text.split("\n") : text.split(" ");

  return (
    <Component ref={containerRef} className={cn("block", className)}>
      {items.map((item, idx) => (
        <span
          key={idx}
          className={cn(
            "block overflow-hidden pb-1",
            splitBy === "words" && "inline-block mr-[0.25em]"
          )}
        >
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + idx * (splitBy === "lines" ? 0.12 : 0.04),
              ease: LUXURY_EASE,
            }}
            className="block will-change-transform"
          >
            {renderContentWithBoldArrow(item)}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
