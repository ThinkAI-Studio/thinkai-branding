"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { WipeButton } from "./WipeButton";
import { ButtonTextRoll } from "./ButtonTextRoll";
import { ArrowRoll } from "./ArrowRoll";
import { LanguageTransition } from "./LanguageTransition";
import { useLanguage } from "@/context/LanguageContext";
import { BrandMark } from "./BrandMark";
import { copy } from "@/data/portfolio";

interface TaiHeaderProps {
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function TaiHeader({ onOpenAbout, onOpenContact }: TaiHeaderProps) {
  const router = useRouter();
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const prefersReduced = useReducedMotion();
  const t = copy[language];
  const [isContactHidden, setIsContactHidden] = useState(false);
  const [isFooterHidden, setIsFooterHidden] = useState(false);
  const isHeaderHidden = isContactHidden || isFooterHidden;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const headerTransition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.35, ease: LUXURY_EASE };

  // Track scroll position for header scrim (> 24px) & same-frame footer threshold check
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 24;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      // Same-frame scroll gate: hide dock as soon as footer top crosses dock bottom
      const footerEl = document.querySelector("footer");
      if (footerEl) {
        const dockHeight = window.innerWidth >= 640 ? 96 : 80;
        const rect = footerEl.getBoundingClientRect();
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
        const footerCrossed = (Math.round(rect.top) <= dockHeight || isAtBottom) && rect.bottom > 0;
        setIsFooterHidden((prev) => (prev !== footerCrossed ? footerCrossed : prev));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sliderTransition = prefersReduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 500, damping: 35 };

  // Hide header when scrolling into the CTA section (#contact)
  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsContactHidden(entry.isIntersecting && entry.boundingClientRect.top <= 120);
      },
      {
        rootMargin: "-120px 0px 0px 0px",
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  // First-class IntersectionObserver on <footer> sentinel / container beside #contact
  useEffect(() => {
    const footerEl = document.querySelector("footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const dockHeight = window.innerWidth >= 640 ? 96 : 80;
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
        const footerCrossed = entry.isIntersecting && (Math.round(entry.boundingClientRect.top) <= dockHeight || isAtBottom);
        setIsFooterHidden((prev) => (prev !== footerCrossed ? footerCrossed : prev));
      },
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  // Track active section for aria-current on nav items
  useEffect(() => {
    const handleScrollActive = () => {
      const contactEl = document.getElementById("contact");
      const productsEl = document.getElementById("products");

      if (contactEl && contactEl.getBoundingClientRect().top <= 300 && contactEl.getBoundingClientRect().bottom > 0) {
        setActiveSection((prev) => (prev !== "contact" ? "contact" : prev));
      } else if (productsEl && productsEl.getBoundingClientRect().top <= 300 && productsEl.getBoundingClientRect().bottom > 0) {
        setActiveSection((prev) => (prev !== "products" ? "products" : prev));
      } else {
        setActiveSection((prev) => (prev !== null ? null : prev));
      }
    };

    handleScrollActive();
    window.addEventListener("scroll", handleScrollActive, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  // Focus trap, Esc key & return focus for mobile menu drawer
  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuTriggerRef.current = document.activeElement as HTMLButtonElement | null;
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        if (!mobileMenuRef.current) return;
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsMobileMenuOpen(false);
          return;
        }

        if (e.key === "Tab") {
          if (!mobileMenuRef.current) return;
          const focusable = (
            Array.from(
              mobileMenuRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
              )
            ) as HTMLElement[]
          ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
        if (mobileMenuTriggerRef.current) {
          mobileMenuTriggerRef.current.focus();
        }
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (anchorId?: string) => {
    setIsMobileMenuOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.location.replace(window.location.pathname);
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <>
      {/* ─── SCROLL-STATE TOP GRADIENT SCRIM ─── */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isScrolled && !isHeaderHidden ? 1 : 0,
        }}
        transition={headerTransition}
        className="fixed top-0 inset-x-0 h-20 sm:h-24 z-40 pointer-events-none select-none"
        style={{
          background: "linear-gradient(to bottom, rgba(20, 20, 20, 0.96) 0%, rgba(20, 20, 20, 0.88) 55%, rgba(20, 20, 20, 0) 100%)",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.10]" />
      </motion.div>

      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={
          isHeaderHidden && !isMobileMenuOpen
            ? {
                opacity: 0,
                y: -14,
                transition: headerTransition,
              }
            : {
                opacity: 1,
                y: 0,
                transition: headerTransition,
              }
        }
        className="fixed top-0 inset-x-0 z-50 bg-transparent px-3.5 sm:px-10 lg:px-12 py-3.5 sm:py-6 flex sm:grid sm:grid-cols-[1fr_auto_1fr] items-center justify-between pointer-events-none select-none"
      >
        {/* Left: Pure Floating Logo Icon (Authentic Studio Style) */}
        <button
          type="button"
          onClick={handleLogoClick}
          className={`group cursor-pointer flex items-center justify-center sm:justify-self-start p-1 select-none transition-transform hover:scale-105 active:scale-95 ${
            isHeaderHidden && !isMobileMenuOpen ? "pointer-events-none" : "pointer-events-auto"
          }`}
          aria-label="ThinkAI Studio"
        >
          <span className="sm:hidden text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] inline-flex items-center justify-center">
            <BrandMark size={24} framed={false} priority />
          </span>
          <span className="hidden sm:inline-flex text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] items-center justify-center">
            <BrandMark size={26} framed={false} priority />
          </span>
        </button>

        {/* Center: Floating Navigation Links with Signature Directional Wipe Motion */}
        <nav
          className={`hidden sm:flex items-center justify-self-center gap-1.5 lg:gap-2.5 ${
            isHeaderHidden ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <WipeButton
            onClick={onOpenAbout}
            wipeColor="#1e2026"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            borderColor="transparent"
            hoverBorderColor="transparent"
            className="group h-8.5 sm:h-9 inline-flex items-center justify-center px-3.5 sm:px-4 r-btn text-sm sm:text-[15px] font-bold tracking-tight cursor-pointer select-none bg-transparent border-0 active:scale-[0.96] transition-transform duration-150 leading-none shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            style={{ "--btn-h": "34px" } as React.CSSProperties}
          >
            <LanguageTransition langKey={language}>
              {t.nav.about}
            </LanguageTransition>
          </WipeButton>
          <WipeButton
            as="a"
            href="#products"
            aria-current={activeSection === "products" ? "page" : undefined}
            wipeColor="#1e2026"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            borderColor="transparent"
            hoverBorderColor="transparent"
            className="group h-8.5 sm:h-9 inline-flex items-center justify-center px-3.5 sm:px-4 r-btn text-sm sm:text-[15px] font-bold tracking-tight cursor-pointer select-none bg-transparent border-0 active:scale-[0.96] transition-transform duration-150 leading-none shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            style={{ "--btn-h": "34px" } as React.CSSProperties}
          >
            <LanguageTransition langKey={language}>
              {t.nav.work}
            </LanguageTransition>
          </WipeButton>
          <WipeButton
            onClick={onOpenContact}
            aria-current={activeSection === "contact" ? "page" : undefined}
            wipeColor="#1e2026"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            borderColor="transparent"
            hoverBorderColor="transparent"
            className="group h-8.5 sm:h-9 inline-flex items-center justify-center px-3.5 sm:px-4 r-btn text-sm sm:text-[15px] font-bold tracking-tight cursor-pointer select-none bg-transparent border-0 active:scale-[0.96] transition-transform duration-150 leading-none shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            style={{ "--btn-h": "34px" } as React.CSSProperties}
          >
            <LanguageTransition langKey={language}>
              {t.nav.contact}
            </LanguageTransition>
          </WipeButton>
        </nav>

        {/* Right: Language Switcher + Start a project Button + Mobile Close / Menu Toggle */}
        <div
          className={`flex items-center sm:justify-self-end gap-2 sm:gap-3.5 ${
            isHeaderHidden && !isMobileMenuOpen ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          {/* Studio Polished Monolithic Segmented Language Switcher (No '/', No Slop) */}
          <div
            data-testid="language-toggle-button"
            role="group"
            aria-label={t.nav.switchLangAria}
            onClick={toggleLanguage}
            title={t.nav.switchLangAria}
            className="group relative h-8 sm:h-8.5 hidden sm:inline-flex items-center p-[3px] r-btn bg-[#141414]/90 backdrop-blur-md border border-white/15 hover:border-white/30 transition-colors cursor-pointer select-none shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.6)] active:scale-[0.97]"
            style={{ "--btn-h": "34px", "--nest-inset": "4px" } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (language === "en") toggleLanguage();
                else setLanguage("en");
              }}
              data-lang="en"
              aria-pressed={language === "en"}
              aria-label="EN - Switch to English"
              className={`relative z-10 h-full w-8 sm:w-9 flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold tracking-wider r-btn-inner transition-colors cursor-pointer ${
                language === "en" ? "text-black font-extrabold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {language === "en" && (
                <motion.span
                  layoutId="active-header-lang-slider"
                  className="absolute inset-0 bg-white shadow-sm r-btn-inner"
                  transition={sliderTransition}
                />
              )}
              <span className="relative z-10">EN</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (language === "vi") toggleLanguage();
                else setLanguage("vi");
              }}
              data-lang="vi"
              aria-pressed={language === "vi"}
              aria-label="VI - Chuyển sang Tiếng Việt"
              className={`relative z-10 h-full w-8 sm:w-9 flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold tracking-wider r-btn-inner transition-colors cursor-pointer ${
                language === "vi" ? "text-black font-extrabold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {language === "vi" && (
                <motion.span
                  layoutId="active-header-lang-slider"
                  className="absolute inset-0 bg-white shadow-sm r-btn-inner"
                  transition={sliderTransition}
                />
              )}
              <span className="relative z-10">VI</span>
            </button>
          </div>

          <WipeButton
            onClick={onOpenContact}
            wipeColor="#05070a"
            textColor="#05070a"
            hoverTextColor="#ffffff"
            borderColor="#ffffff"
            hoverBorderColor="rgba(255, 255, 255, 0.4)"
            className="group h-8.5 sm:h-9.5 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 r-btn text-xs sm:text-[13.5px] font-bold cursor-pointer shadow-lg select-none bg-white border border-white active:scale-[0.94] transition-transform duration-150 leading-none shrink-0"
            style={{ "--btn-h": "34px" } as React.CSSProperties}
          >
            <ButtonTextRoll
              text={t.hero.primary}
              className="font-bold text-xs sm:text-[13.5px] tracking-tight leading-none"
            />
            <ArrowRoll size="sm" />
          </WipeButton>

          {/* Mobile Menu / Close Text Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-white hover:text-neutral-300 active:opacity-70 font-medium text-sm tracking-tight cursor-pointer px-1 py-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded transition-opacity duration-150"
            aria-label="Toggle navigation menu"
          >
            <div className="relative h-[1.2em] w-14 overflow-hidden text-right flex items-center justify-end">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? "Close" : "Menu"}
                  initial={{ y: isMobileMenuOpen ? 14 : -14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: isMobileMenuOpen ? -14 : 14, opacity: 0 }}
                  transition={{ duration: 0.28, ease: LUXURY_EASE }}
                  className="block text-sm font-medium leading-none"
                >
                  {isMobileMenuOpen ? t.nav.close : t.nav.menu}
                </motion.span>
              </AnimatePresence>
            </div>
          </button>
        </div>
      </motion.header>

      {/* ─── AUTHENTIC THINKAI MOBILE NAVIGATION DRAWER (Upper Curtain with Grab Handle) ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            data-testid="mobile-nav-drawer"
            className="fixed top-0 inset-x-0 z-40 bg-[#141414]/98 backdrop-blur-3xl pt-24 pb-4 px-6 border-b border-white/[0.10] shadow-[0_30px_80px_rgba(0,0,0,0.95)] sm:hidden flex flex-col justify-between"
          >
            {/* Big Bold Vertical Links - Stable direct rendering without stuck variant trap */}
            <div className="flex flex-col gap-4 text-4xl font-bold tracking-tight text-white pt-2">
              {[
                {
                  label: t.nav.about,
                  action: () => {
                    if (onOpenAbout) onOpenAbout();
                    else router.push("/about");
                  },
                },
                { label: t.nav.work, action: () => handleNavClick("products") },
                {
                  label: t.nav.contact,
                  action: () => {
                    if (onOpenContact) onOpenContact();
                    else handleNavClick("contact");
                  },
                },
                {
                  label: t.nav.resume,
                  action: () => window.open("/NguyenBinhMinh-DevOpsEngineer-2026.pdf", "_blank"),
                },
              ].map((item) => (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      item.action();
                    }}
                    className="text-left text-white hover:text-neutral-300 active:scale-[0.98] transition-all cursor-pointer font-bold select-none"
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Language Switcher Row */}
            <div className="flex items-center justify-between py-3.5 border-y border-white/[0.10] my-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-400 font-bold  tracking-wider text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <LanguageTransition langKey={language}>
                  <span>{language === "vi" ? "NGÔN NGỮ" : "LANGUAGE"}</span>
                </LanguageTransition>
              </div>
              <div className="relative inline-flex items-center p-[3px] bg-[#141414] border border-white/15 r-btn shadow-inner" style={{ "--btn-h": "30px", "--nest-inset": "4px" } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => {
                    if (language === "en") toggleLanguage();
                    else setLanguage("en");
                  }}
                  data-lang-mobile="en"
                  aria-label="EN - Switch to English"
                  className={`relative z-10 w-9 h-7 flex items-center justify-center text-xs font-mono font-bold tracking-wider r-btn-inner transition-colors cursor-pointer select-none ${
                    language === "en" ? "text-black font-extrabold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {language === "en" && (
                    <motion.span
                      layoutId="active-mobile-lang-slider"
                      className="absolute inset-0 bg-white shadow-sm r-btn-inner"
                      transition={sliderTransition}
                    />
                  )}
                  <span className="relative z-10">EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (language === "vi") toggleLanguage();
                    else setLanguage("vi");
                  }}
                  data-lang-mobile="vi"
                  aria-label="VI - Chuyển sang Tiếng Việt"
                  className={`relative z-10 w-9 h-7 flex items-center justify-center text-xs font-mono font-bold tracking-wider r-btn-inner transition-colors cursor-pointer select-none ${
                    language === "vi" ? "text-black font-extrabold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {language === "vi" && (
                    <motion.span
                      layoutId="active-mobile-lang-slider"
                      className="absolute inset-0 bg-white shadow-sm r-btn-inner"
                      transition={sliderTransition}
                    />
                  )}
                  <span className="relative z-10">VI</span>
                </button>
              </div>
            </div>

            {/* Bottom Featured Live Product Callout Card */}
            <div className="mt-2 mb-4">
              <a
                href="https://hostdeck.thinkai.id.vn"
                target="_blank"
                className="p-3.5 r-panel bg-white/[0.04] border border-white/[0.08] flex items-center justify-between gap-3 group hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative w-12 h-10 r-inner overflow-hidden border border-white/10 shrink-0 bg-[#161619]" style={{ "--nest-inset": "4px" } as React.CSSProperties}>
                    <Image
                      src="/images/products/hostdeck-screen.png"
                      alt="HostDeck Console"
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <div className="text-xs font-bold text-white tracking-tight truncate">
                      {language === "vi" ? "HostDeck đang hoạt động — Bare-Metal CLI" : "HostDeck is live — Bare-Metal CLI"}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      {language === "vi" ? "THÁNG 8, 2026" : "AUGUST 2026"}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white shrink-0 transition-colors" />
              </a>
            </div>

            {/* Bottom Grab Bar Handle */}
            <div className="flex justify-center items-center py-2">
              <div className="flex flex-col gap-1 items-center">
                <div className="w-8 h-[2px] rounded-full bg-neutral-600/80" />
                <div className="w-8 h-[2px] rounded-full bg-neutral-600/80" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
