"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BrandMarkProps {
  /** Outer size in pixels (width and height). Defaults to 28. */
  size?: number;
  /** Whether to render inside the unified studio rounded-square frame. Defaults to false. */
  framed?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * ThinkAI Studio Unified Brand Mark.
 * Uses the authentic brand-mark.png as a CSS mask so currentColor flows through cleanly
 * at any scale without hand-drawn geometry discrepancies.
 */
export function BrandMark({
  size = 28,
  framed = false,
  className = "",
}: BrandMarkProps) {
  const maskStyle: React.CSSProperties = {
    backgroundColor: "currentColor",
    maskImage: "url(/images/brand-mark.png)",
    WebkitMaskImage: "url(/images/brand-mark.png)",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };

  if (!framed) {
    return (
      <div
        className={cn("inline-block shrink-0 select-none", className)}
        style={{
          width: size,
          height: size,
          ...maskStyle,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center shrink-0 select-none r-btn overflow-hidden",
        className
      )}
      style={
        {
          width: size,
          height: size,
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.20)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          "--btn-h": `${size}px`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div
        className="inline-block"
        style={{ width: "84%", height: "84%", ...maskStyle }}
      />
    </div>
  );
}

export default BrandMark;
