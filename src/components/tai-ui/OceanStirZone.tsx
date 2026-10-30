"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { copy } from "@/data/portfolio";

export function OceanStirZone() {
  const { language } = useLanguage();
  const t = copy[language];

  const [isHovered, setIsHovered] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isEquilibrium, setIsEquilibrium] = useState(false);

  const oceanZoneRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const rafIdRef = useRef<number | null>(null);
  const equilibriumTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const activePointerIdRef = useRef<number | null>(null);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });

  const updateStirBridge = useCallback((stir: number, clientX?: number, clientY?: number) => {
    if (typeof window !== "undefined" && "__setOceanStir" in window) {
      const bridge = (window as Record<string, unknown>).__setOceanStir;
      if (typeof bridge === "function") {
        if (typeof clientX === "number" && typeof clientY === "number") {
          const nx = clientX / window.innerWidth;
          const ny = clientY / window.innerHeight;
          bridge(stir, nx, ny);
        } else {
          bridge(stir);
        }
      }
    }
  }, []);

  const updatePillPosition = (clientX: number, clientY: number, isTouch = false) => {
    if (!pillRef.current) return;
    const offsetX = isTouch ? -60 : 18;
    const offsetY = isTouch ? -50 : 18;
    pillRef.current.style.transform = `translate3d(${clientX + offsetX}px, ${clientY + offsetY}px, 0)`;
  };

  const stopHolding = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    activePointerIdRef.current = null;
    updateStirBridge(0.0);

    if (!isEquilibrium) {
      setIsHolding(false);
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = "56.54";
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = t.ocean.holdPrompt;
      }
    }
  }, [isEquilibrium, t.ocean.holdPrompt, updateStirBridge]);

  const startHolding = (clientX: number, clientY: number, pointerId: number, isTouch = false) => {
    activePointerIdRef.current = pointerId;
    lastPointerPosRef.current = { x: clientX, y: clientY };

    updatePillPosition(clientX, clientY, isTouch);
    updateStirBridge(0.25, clientX, clientY);

    setIsHolding(true);
    setIsEquilibrium(false);

    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = "56.54";
    }

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const startTime = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = `${56.54 - (56.54 * pct) / 100}`;
      }

      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${t.ocean.stirring} ${pct}%`;
      }

      updateStirBridge(0.25 + (pct / 100) * 0.5, lastPointerPosRef.current.x, lastPointerPosRef.current.y);

      if (pct < 100) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        rafIdRef.current = null;
        setIsEquilibrium(true);
        updateStirBridge(0.85, lastPointerPosRef.current.x, lastPointerPosRef.current.y);

        clearTimeout(equilibriumTimerRef.current);
        equilibriumTimerRef.current = setTimeout(() => {
          setIsEquilibrium(false);
          setIsHolding(false);
          updateStirBridge(0.0);
          if (circleRef.current) {
            circleRef.current.style.strokeDashoffset = "56.54";
          }
        }, 3000);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const isTouch = e.pointerType === "touch";
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
    setIsHovered(true);
    startHolding(e.clientX, e.clientY, e.pointerId, isTouch);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isTouch = e.pointerType === "touch";
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    updatePillPosition(e.clientX, e.clientY, isTouch);

    if (isHolding) {
      updateStirBridge(0.75, e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
    if (e.pointerType === "touch") {
      setIsHovered(false);
    }
    stopHolding();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
    if (e.pointerType === "touch") {
      setIsHovered(false);
    }
    stopHolding();
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") {
      setIsHovered(true);
      updatePillPosition(e.clientX, e.clientY, false);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") {
      setIsHovered(false);
      stopHolding();
    }
  };

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      clearTimeout(equilibriumTimerRef.current);
      updateStirBridge(0.0);
    };
  }, [updateStirBridge]);

  return (
    <div
      id="interactive-ocean-zone"
      ref={oceanZoneRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className="tai-ocean-interactive-zone relative z-20 w-full py-8 border-y border-white/[0.08] bg-[#040920]/35 bg-gradient-to-b from-[#040920]/20 via-[#040920]/35 to-[#040920]/55 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 lg:px-16 gap-4 overflow-hidden select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* Studio Brand Mark & Glyph */}
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-xs text-blue-200 uppercase tracking-widest font-bold">THINKAI STUDIO · OCEAN TELEMETRY EDITION</span>
      </div>

      <div className="hidden md:inline-flex items-center font-mono text-xs text-blue-300/80">
        {t.ocean.quote}
      </div>

      <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>{t.ocean.holdPrompt}</span>
      </div>

      {/* Floating Indicator (Tracked with direct transform without React 60fps re-renders) */}
      <div
        ref={pillRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          opacity: isHovered || isHolding ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
        className={`tai-hold-pill ${isHolding ? "is-holding" : ""}`}
      >
        <svg className="tai-hold-ring" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2.5" />
          <circle
            ref={circleRef}
            cx="12"
            cy="12"
            r="9"
            fill="none"
            strokeWidth="2.5"
            strokeDasharray={56.54}
            strokeDashoffset={56.54}
            strokeLinecap="round"
            className="tai-hold-ring-circle"
          />
        </svg>

        <span className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
          {isEquilibrium ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-emerald-300 font-bold tracking-wide">
                {t.ocean.equilibrium}
              </span>
            </>
          ) : isHolding ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-white animate-spin shrink-0" />
              <span ref={progressTextRef}>{t.ocean.stirring} 0%</span>
            </>
          ) : (
            <span ref={progressTextRef}>{t.ocean.holdPrompt}</span>
          )}
        </span>
      </div>
    </div>
  );
}

export default OceanStirZone;
