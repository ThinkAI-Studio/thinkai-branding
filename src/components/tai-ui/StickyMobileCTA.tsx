"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { copy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface StickyMobileCTAProps {
  isContactOpen: boolean;
  onOpenContact: () => void;
}

export function StickyMobileCTA({ isContactOpen, onOpenContact }: StickyMobileCTAProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const [isPastHero, setIsPastHero] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isContactInView, setIsContactInView] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("top");
    const footer = document.querySelector("footer");
    const contact = document.getElementById("contact");
    if (!hero && !footer && !contact) return;
    const update = () => {
      const scrollY = window.scrollY;
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight * 0.85;
      setIsPastHero(scrollY > heroHeight * 0.9);

      if (footer) {
        const rect = footer.getBoundingClientRect();
        const vh = window.innerHeight;
        const footerVisible = rect.top < vh && rect.bottom > 0;
        const near = footerVisible && rect.top < vh * 0.85;
        setIsNearFooter(near);
      } else {
        setIsNearFooter(false);
      }

      if (contact) {
        const rect = contact.getBoundingClientRect();
        const vh = window.innerHeight;
        const contactVisible = rect.top < vh && rect.bottom > 0;
        setIsContactInView(contactVisible);
      } else {
        setIsContactInView(false);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const visible = isPastHero && !isNearFooter && !isContactInView && !isContactOpen;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden pointer-events-none transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      <div className="px-4 pb-3">
        <button
          type="button"
          onClick={onOpenContact}
          tabIndex={visible ? 0 : -1}
          className="pointer-events-auto w-full h-14 r-btn bg-white text-black text-base font-bold shadow-2xl flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          style={{ "--btn-h": "56px" } as React.CSSProperties}
        >
          <span>{t.cta.startProject}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
