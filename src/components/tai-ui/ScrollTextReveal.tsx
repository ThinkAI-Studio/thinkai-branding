"use client";

import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function ScrollTextReveal({
  text,
  className = "",
  as: Component = "h3",
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLDivElement | HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const wordElements = containerRef.current?.querySelectorAll<HTMLElement>(".scroll-reveal-word");
      if (!wordElements || wordElements.length === 0) return;

      gsap.fromTo(
        wordElements,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [text, prefersReduced]);

  return (
    <Component
      ref={containerRef as unknown as React.Ref<never>}
      aria-label={text}
      className={cn(className)}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${index}-${word}`}>
          <span
            className="scroll-reveal-word inline-block will-change-[opacity]"
            style={{ opacity: prefersReduced ? 1 : 0.18 }}
            aria-hidden="true"
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Component>
  );
}
