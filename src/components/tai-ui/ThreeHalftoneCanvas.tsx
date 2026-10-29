"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

interface ThreeHalftoneCanvasProps {
  className?: string;
}

export function ThreeHalftoneCanvas({ className = "" }: ThreeHalftoneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Device & Sizing Detection
    const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const maxDpr = isCoarse ? 1.25 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const renderScale = isCoarse ? 0.75 : 1.0;

    const getStableHeight = () => {
      if (typeof window === "undefined") return 800;
      let h = window.innerHeight;
      if (typeof document !== "undefined") {
        const testEl = document.createElement("div");
        testEl.style.cssText = "position:fixed;height:100lvh;width:0;visibility:hidden;pointer-events:none;top:0;left:0;";
        document.body.appendChild(testEl);
        const lvh = testEl.clientHeight;
        document.body.removeChild(testEl);
        if (lvh > 0) {
          h = lvh;
        }
      }
      return h;
    };

    let currentWidth = window.innerWidth;
    let currentHeight = getStableHeight();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setPixelRatio(dpr);

    const scaledInitW = Math.round(currentWidth * renderScale);
    const scaledInitH = Math.round(currentHeight * renderScale);
    renderer.setSize(scaledInitW, scaledInitH, false);

    // GPU containment & styling
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.contain = "strict";
    renderer.domElement.style.transform = "translateZ(0)";
    renderer.domElement.style.willChange = "transform";
    container.appendChild(renderer.domElement);

    // 2. Uniforms for Venice Ocean Caustics Shader
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_target_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_scroll: { value: 0 },
      u_target_scroll: { value: 0 },
      u_stir: { value: 0.0 },
      u_target_stir: { value: 0.0 },
      u_stir_pos: { value: new THREE.Vector2(0.5, 0.5) },
    };

    // 3. GLSL Shaders: 04 Venice Adriatic Emerald Caustics (1.5x Dynamic Speed)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll;
      uniform float u_stir;
      uniform vec2 u_stir_pos;
      varying vec2 vUv;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      vec2 rotate2D(vec2 v, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c) * v;
      }

      // Rotated 45-degree halftone print screen
      vec3 applyRotatedHalftone(vec3 color, vec2 fragCoord, float spacing, float dotSize, float darkness) {
        vec2 rotCoord = rotate2D(fragCoord, 0.785398);
        vec2 cell = fract(rotCoord / spacing) - 0.5;
        float dist = length(cell);
        float mask = 1.0 - smoothstep(dotSize - 0.05, dotSize + 0.05, dist);
        return mix(color, vec3(0.012, 0.022, 0.032), mask * darkness);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.y = 1.0 - st.y;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = st;
        p.x *= aspect;

        // 1.5x Dynamic Wave & Caustic Velocity
        float scrollOffset = u_scroll * 1.5;
        float speed = 0.19 + u_stir * 0.08; // Subtle, elegant flow acceleration
        float t = u_time * speed + scrollOffset * 0.2;

        // Interactive Subtle Water Ripple (Localized around cursor, no giant blowout)
        vec2 stirOrigin = u_stir_pos;
        stirOrigin.x *= aspect;
        float distToStir = distance(p, stirOrigin);
        float stirWave = sin(distToStir * 44.0 - u_time * 6.5) * exp(-distToStir * 11.5) * u_stir * 0.10;

        // Gentle ocean wave undulations (1.5x velocity)
        vec2 waveUv = rotate2D(p, 0.38);
        float w1 = sin(waveUv.x * 2.6 + waveUv.y * 1.2 + t * 1.05 + stirWave);
        float w2 = sin(waveUv.x * 5.4 - waveUv.y * 2.2 - t * 0.85);
        float wave = w1 * 0.6 + w2 * 0.4;

        // Procedural Voronoi-like water caustic mesh
        vec2 cCoord = p * 4.2 + vec2(t * 0.27, t * 0.18) + stirWave * 0.35;
        float c1 = abs(snoise(cCoord));
        float c2 = abs(snoise(cCoord * 1.8 - vec2(t * 0.21)));
        float caustics = pow(1.0 - (c1 * 0.6 + c2 * 0.4), 2.2);

        // Subtle localized caustic shimmer around cursor
        caustics += u_stir * exp(-distToStir * 12.0) * 0.22;

        // Venetian Adriatic Emerald Color Palette
        vec3 cAdriaticDeep  = vec3(0.04, 0.14, 0.22);
        vec3 cEmeraldLagoon = vec3(0.12, 0.46, 0.48);
        vec3 cSapphireBlue  = vec3(0.16, 0.52, 0.72);
        vec3 cCrystalAqua   = vec3(0.32, 0.68, 0.76);
        vec3 cSunlightFoam  = vec3(0.55, 0.85, 0.90);

        vec3 col = cAdriaticDeep;
        col = mix(col, cEmeraldLagoon, smoothstep(-0.35, 0.35, wave) * 0.92);
        col = mix(col, cSapphireBlue, smoothstep(0.0, 0.65, caustics) * 0.88);
        col = mix(col, cCrystalAqua, caustics * 0.78);
        col = mix(col, cSunlightFoam, pow(smoothstep(0.45, 0.90, wave + caustics * 0.45), 2.8) * 0.65);

        // Apply Rotated Halftone Print Screen
        col = applyRotatedHalftone(col, gl_FragCoord.xy, 6.5, 0.23, 0.70);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Global Event Listeners & Bridge
    const calculateMaxScroll = () => {
      return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    let cachedMaxScroll = calculateMaxScroll();
    let latestScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      uniforms.u_target_mouse.value.set(x, y);
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY;
    };

    const updateCanvasSize = (w: number, h: number) => {
      const scaledW = Math.round(w * renderScale);
      const scaledH = Math.round(h * renderScale);
      renderer.setSize(scaledW, scaledH, false);
      uniforms.u_resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };

    let resizeTimeout: NodeJS.Timeout | number | undefined;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = getStableHeight();
        const widthChanged = Math.abs(newWidth - currentWidth) > 1;
        const heightDelta = Math.abs(newHeight - currentHeight);

        // Ignore height-only resize under 120px (mobile address-bar collapse)
        if (!widthChanged && heightDelta < 120) {
          return;
        }

        currentWidth = newWidth;
        currentHeight = newHeight;
        updateCanvasSize(currentWidth, currentHeight);
        cachedMaxScroll = calculateMaxScroll();
      }, 150);
    };

    // Custom Window Bridge for Footer "Hold to create waves" interaction
    (window as unknown as { __setOceanStir?: (stir: number, x?: number, y?: number) => void }).__setOceanStir = (
      stir: number,
      x?: number,
      y?: number
    ) => {
      uniforms.u_target_stir.value = stir;
      if (typeof x === "number" && typeof y === "number") {
        uniforms.u_stir_pos.value.set(x, y);
      }
    };

    if (!isCoarse) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // 5. Render Loop (Capped to ~60 FPS with pause on document.hidden)
    let animationId: number;
    let isPaused = false;
    const clock = new THREE.Clock();
    const TARGET_FRAME_MS = 1000 / 60;
    let lastFrameTime = performance.now();

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        clock.getDelta(); // Reset clock delta to avoid sudden time jump
        lastFrameTime = performance.now();
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      if (isPaused || document.hidden) return;

      const now = performance.now();
      const elapsed = now - lastFrameTime;
      if (elapsed < TARGET_FRAME_MS - 2) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = now - (elapsed % TARGET_FRAME_MS);

      if (prefersReduced) {
        renderer.render(scene, camera);
        return;
      }

      const delta = clock.getDelta();
      uniforms.u_time.value += delta;

      // Update scroll from cachedMaxScroll inside rAF loop
      uniforms.u_target_scroll.value = latestScrollY / (cachedMaxScroll || 1);

      // Smooth interpolation for mouse, scroll, and stir pressure
      uniforms.u_mouse.value.lerp(uniforms.u_target_mouse.value, 0.06);
      uniforms.u_scroll.value += (uniforms.u_target_scroll.value - uniforms.u_scroll.value) * 0.08;
      uniforms.u_stir.value += (uniforms.u_target_stir.value - uniforms.u_stir.value) * 0.12;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!isCoarse) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      delete (window as unknown as { __setOceanStir?: unknown }).__setOceanStir;

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        // Explicit fixed box so the CSS box and the WebGL drawing buffer (sized
        // from the same 100lvh measurement) always agree — no vertical squash
        // when the mobile address bar shifts the visual viewport.
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100lvh",
        zIndex: 0,
        contain: "strict",
        transform: "translateZ(0)",
      }}
    />
  );
}
