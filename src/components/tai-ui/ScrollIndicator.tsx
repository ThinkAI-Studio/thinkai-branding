"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "top", label: "Hero" },
  { id: "products", label: "Products" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function ScrollIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;

      // Edge Dismissal: near bottom <= 48px
      if (maxScroll - scrollY <= 48) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // Calculate active section and progress within that section
      const sectionElements = SECTIONS.map((s) => document.getElementById(s.id));
      let currentIdx = 0;
      let currentProgress = 0;

      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = rect.top;
        const height = rect.height;

        // When section is active in the upper half of the viewport
        if (top <= winHeight * 0.4 && top + height > winHeight * 0.4) {
          currentIdx = i;
          // Progress from 0 to 1 inside current section
          const traversed = winHeight * 0.4 - top;
          currentProgress = Math.min(Math.max(traversed / height, 0), 1);
          break;
        }
      }

      setActiveIndex(currentIdx);
      setSectionProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHidden) {
    return null;
  }

  return (
    <nav
      aria-label="Page scroll progress"
      className="scroll-indicator fixed bottom-6 sm:bottom-8 right-6 sm:right-10 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl transition-opacity duration-300 select-none"
    >
      {SECTIONS.map((section, idx) => {
        // Geometric states from specification:
        // Active: 48px
        // Neighbor: 28px (|n - active| === 1)
        // Rest: 12px
        const isActive = activeIndex === idx;
        const isNeighbor = Math.abs(idx - activeIndex) === 1;

        let width = 12;
        if (isActive) width = 48;
        else if (isNeighbor) width = 28;

        // Hover magnification
        if (hoveredIndex !== null) {
          if (hoveredIndex === idx) width = 48;
          else if (Math.abs(idx - hoveredIndex) === 1) width = 28;
          else width = 12;
        }

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={`Jump to ${section.label}`}
            aria-current={isActive ? "location" : undefined}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="scroll-indicator__item relative h-2.5 rounded-full bg-white/20 hover:bg-white/40 overflow-hidden cursor-pointer"
            style={{
              width: prefersReduced ? 20 : width,
              transition: prefersReduced ? "none" : "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s",
            }}
          >
            {/* Fill progress inside active section pill */}
            {isActive && (
              <span
                className="absolute inset-y-0 left-0 bg-emerald-400 rounded-full"
                style={{
                  width: prefersReduced ? "100%" : `${Math.round(sectionProgress * 100)}%`,
                  transition: prefersReduced ? "none" : "width 0.1s linear",
                }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
