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
 * Renders the authentic monogram vector with consistent optical scale and an optional
 * unified rounded-square frame (consistent radius, padding ratio, background, and border).
 */
export function BrandMark({
  size = 28,
  framed = false,
  className = "",
}: BrandMarkProps) {
  const markSvg = (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none pointer-events-none"
      style={{
        width: framed ? "84%" : "100%",
        height: framed ? "84%" : "100%",
      }}
      aria-hidden="true"
    >
      {/* Top Horizontal Bar */}
      <rect x="144" y="120" width="224" height="44" rx="22" />
      {/* Center Vertical Stem */}
      <rect x="234" y="120" width="44" height="272" rx="22" />
      {/* Left Diagonal Leg */}
      <rect
        x="0"
        y="0"
        width="44"
        height="210"
        rx="22"
        transform="translate(182, 235) rotate(38)"
      />
      {/* Right Diagonal Leg */}
      <rect
        x="0"
        y="0"
        width="44"
        height="210"
        rx="22"
        transform="translate(330, 208) rotate(-38)"
      />
    </svg>
  );

  if (!framed) {
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center shrink-0 select-none",
          className
        )}
        style={{ width: size, height: size }}
      >
        {markSvg}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 select-none r-btn bg-white/[0.08] border border-white/20 shadow-sm overflow-hidden",
        className
      )}
      style={{ width: size, height: size, "--btn-h": `${size}px` } as React.CSSProperties}
    >
      {markSvg}
    </div>
  );
}

export default BrandMark;
