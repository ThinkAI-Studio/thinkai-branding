"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TAI_EASE } from "@/lib/motion";

export const taiButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-mono text-xs tracking-wider  transition-all duration-200 group cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-white/50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-neutral-950 hover:bg-neutral-100 font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_1px_2px_0_rgba(0,0,0,0.4)]",
        secondary:
          "bg-[#131316] text-white hover:bg-[#1c1c22] border border-white/[0.08] hover:border-white/[0.22] font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        outline:
          "bg-transparent text-white border border-white/[0.12] hover:border-white/[0.30] hover:bg-white/[0.03] font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        ghost:
          "bg-transparent text-white/60 hover:text-white hover:bg-white/[0.04] font-medium",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-3 py-1.5 text-[11px]",
        lg: "px-7 py-3.5 text-sm",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface TaiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof taiButtonVariants> {
  asChild?: boolean;
  href?: string;
  icon?: React.ReactNode;
}

export const TaiButton = React.forwardRef<HTMLButtonElement, TaiButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion();

    if (asChild) {
      return (
        <Slot
          className={cn(taiButtonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLElement>}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    const Component = href ? motion.a : motion.button;

    const bgVariants = prefersReduced
      ? { hover: { opacity: 1 } }
      : { hover: { y: "0%", opacity: 1 } };

    const bgInitial = prefersReduced
      ? { opacity: 0 }
      : { y: "100%", opacity: 0 };

    const contentVariants = prefersReduced
      ? { hover: { y: 0 } }
      : { hover: { y: -0.5 } };

    const iconVariants = prefersReduced
      ? { hover: { x: 0 } }
      : { hover: { x: 3 } };

    return (
      <Component
        ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
        href={href}
        className={cn(taiButtonVariants({ variant, size, className }))}
        whileHover="hover"
        whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
        {...(props as Record<string, unknown>)}
      >
        {/* Ambient Top Light Reflection Sweep */}
        {variant !== "ghost" && (
          <motion.div
            className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"
            initial={bgInitial}
            variants={bgVariants}
            transition={{
              duration: prefersReduced ? 0 : 0.22,
              ease: TAI_EASE.snappy,
            }}
          />
        )}

        {/* Inner Content with mechanical shift */}
        <motion.span
          className="relative flex items-center justify-center gap-2"
          variants={contentVariants}
          transition={{ duration: prefersReduced ? 0 : 0.18 }}
        >
          <span>{children}</span>

          {/* Directional Icon */}
          {icon && (
            <motion.span
              variants={iconVariants}
              transition={{
                duration: prefersReduced ? 0 : 0.22,
                ease: TAI_EASE.luxury,
              }}
              className="flex items-center justify-center shrink-0"
            >
              {icon}
            </motion.span>
          )}
        </motion.span>
      </Component>
    );
  }
);

TaiButton.displayName = "TaiButton";
