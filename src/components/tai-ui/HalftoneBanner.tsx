"use client";

import React from "react";
import { ThreeHalftoneCanvas } from "./ThreeHalftoneCanvas";

interface HalftoneBannerProps {
  children?: React.ReactNode;
  className?: string;
  height?: string;
}

export function HalftoneBanner({
  children,
  className = "",
  height = "min-h-[480px]",
}: HalftoneBannerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center ${height} ${className}`}
    >
      {/* Interactive GPU Three.js Halftone Canvas */}
      <ThreeHalftoneCanvas />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

export function TaiLogoMark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-[2px] ${className}`}>
      <div className="w-full h-full bg-white rounded-[2px]" />
      <div className="w-full h-full bg-white rounded-[2px]" />
      <div className="w-full h-full bg-white rounded-[2px]" />
      <div className="w-full h-full bg-white rounded-[2px]" />
    </div>
  );
}
