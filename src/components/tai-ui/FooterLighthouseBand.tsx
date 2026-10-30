"use client";

import React, { useEffect, useRef, useState } from "react";

export function FooterLighthouseBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Performance: Pause the animation when the band is offscreen or document is hidden
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isVisible = false;

    const updatePlayState = () => {
      const shouldPlay = isVisible && !document.hidden;
      setIsPlaying(shouldPlay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        updatePlayState();
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    const handleVisibilityChange = () => {
      updatePlayState();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="footer-lighthouse-band-root relative z-20 w-full overflow-hidden select-none bg-[#0a0a0b]"
      style={{
        margin: 0,
        padding: 0,
        border: "none",
        borderRadius: 0,
      }}
    >
      {/* 
        Geometry: 3086x998 -> 3.09:1 aspect ratio.
        Desktop: width 100%, height auto -> ~557px at 1720px CSS width.
        Mobile (<640px): fixed 240px with object-cover object-[50%_45%].
      */}
      <div className="relative w-full h-[240px] sm:h-auto sm:aspect-[3086/998] overflow-hidden">
        {/* Optimized image with AVIF, WebP, PNG fallback; lazy loading, explicit dimensions to prevent CLS */}
        <picture>
          <source srcSet="/images/footer-lighthouse-band.avif" type="image/avif" />
          <source srcSet="/images/footer-lighthouse-band.webp" type="image/webp" />
          <img
            src="/images/footer-lighthouse-band.png"
            alt=""
            loading="lazy"
            decoding="async"
            width={3086}
            height={998}
            className="w-full h-full object-cover sm:object-contain object-[50%_45%] block pointer-events-none"
            style={{
              filter: "saturate(0.9) brightness(0.92) contrast(1.03)",
            }}
          />
        </picture>

        {/* LIGHT SWEEP (conic gradient light beam pivoting at lantern glass) */}
        <div
          ref={sweepRef}
          className="footer-beam-sweep"
          style={{
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        />

        {/* TOP & BOTTOM BLEND OVERLAY (z-index: 3, pointer-events: none) */}
        <div
          className="footer-blend-overlay absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: `
              linear-gradient(180deg, #111113 0%, rgba(17,17,19,0.86) 4%, rgba(17,17,19,0.45) 9%, transparent 11%),
              linear-gradient(0deg, #0a0a0b 0%, rgba(10,10,11,0.82) 3%, rgba(10,10,11,0.35) 8%, transparent 11%)
            `,
          }}
        />
      </div>
    </div>
  );
}

export default FooterLighthouseBand;
