# Architecture

The public application is a Next.js 16 Studio Showcase deployed via Vercel Git Integration. The `main` branch is the production source; pull requests receive Vercel previews after GitHub quality and security checks pass.

## Application Routes & Surface

1. **Studio Showcase Landing (`/`):**
   - Three.js WebGL halftone canvas background with fluid noise caustics.
   - Inset Hero frame with GSAP ScrollTrigger scale tuck (`scaleX: 0.96`, `scaleY: 0.90`).
   - Dynamic product teasers with scoped `.tai-paper` contrast block for the Wind literary platform.
   - Pinned 3.5° angular Toolkit Card Fan (`SkillsFan`) with elastic neighbor wave physics.
   - Varying-width progress rail indicator (`ScrollIndicator`: 48px active, 28px neighbor, 12px rest).
2. **Product Case Studies (`/products/[slug]`):**
   - Statically generated via `generateStaticParams` for all 4 flagship studio products: `thinkai-ui`, `wind`, `homelab`, and `thinkai`.
   - Comprehensive inline architectural deep-dive: System telemetry HUD, The 3-Act narrative, connected pipeline flow diagram, syntax-highlighted code spec viewer, domain security cards, and verifiable Git commit ledger.
3. **Studio & Founder Profile (`/about`):**
   - Full-page editorial view reusing the ThinkAI design language, bio narrative, core stack, education, and direct contact avenues.
4. **DevOps CV (`/cv`):**
   - Canonical single-page stream to the published DevOps CV PDF.

## Design System & Geometry: 10px Precision System

- **Card / Button / Input / Tag Radius:** 10px (`rounded-[10px]`).
- **Large Container Radius:** 16px (`rounded-[16px]`).
- **Section Exit Tuck Radius:** `0 0 16px 16px`.
- **Theme Blocks:** Dark Obsidian base (`#08080a`) with a scoped warm paper block (`.tai-paper`) for the Wind platform.

## Trust boundary

- The public site has no runtime monitoring, secrets, operational API or simulated telemetry surface.
- Personal claims come from the DevOps CV. Repository evidence only explains the technical problem, decision and outcome behind a claim.
- OpenScreen media is optional evidence. It must contain demo data and redact hostnames, identities, internal URLs, tokens and secrets.

## Delivery contract

GitHub Actions validates linting, TypeScript, a production build, browser smoke scenarios, workflow syntax, dependency changes, dependency audit and CodeQL. Vercel owns preview and production deployment; deploy credentials are not stored in this repository.
