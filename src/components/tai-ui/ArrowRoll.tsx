"use client";

import React from "react";

interface ArrowRollProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ArrowRoll({ className = "", size = "md" }: ArrowRollProps) {
  const sizeClasses = {
    sm: "w-4.5 h-4.5 text-[11px]",
    md: "w-6 h-6 text-xs",
    lg: "w-8 h-8 sm:w-9 sm:h-9 text-sm sm:text-base",
  }[size];

  return (
    <span
      className={`relative overflow-hidden rounded-xl bg-black text-white group-hover:bg-white group-hover:text-black inline-flex items-center justify-center font-extrabold shrink-0 transition-colors duration-300 select-none leading-none ${sizeClasses} ${className}`}
    >
      {/* Primary Arrow: Translates diagonally up-right (↗) */}
      <span className="inline-flex items-center justify-center leading-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%]">
        ↗
      </span>

      {/* Incoming Arrow: Enters diagonally from bottom-left (↙) into center */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center leading-none -translate-x-[160%] translate-y-[160%] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
      >
        ↗
      </span>
    </span>
  );
}
