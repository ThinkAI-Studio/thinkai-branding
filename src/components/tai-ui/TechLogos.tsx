"use client";

import React from "react";

export function TechLogo({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const ariaProps = { "aria-hidden": "true" as const };

  switch (name) {
    case "Next.js":
    case "Next.js 16":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#nextjs-mask)">
            <circle cx="90" cy="90" r="90" fill="black" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
              fill="url(#next-grad-1)"
            />
            <rect x="115" y="54" width="12" height="72" fill="url(#next-grad-2)" />
          </g>
          <defs>
            <linearGradient id="next-grad-1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="next-grad-2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "React":
    case "React 19":
      return (
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <circle cx="0" cy="0" r="2.05" fill="#58c4dc" />
          <g stroke="#58c4dc" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "TypeScript":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M11.75 14.25c-.24.7-.62 1.25-1.14 1.63-.52.38-1.18.57-1.98.57-.75 0-1.42-.17-2.02-.51-.6-.34-1.07-.82-1.41-1.43s-.51-1.32-.51-2.12c0-.82.18-1.55.54-2.17.36-.62.86-1.1 1.49-1.44.64-.34 1.34-.51 2.12-.51.81 0 1.5.17 2.08.52.57.34.99.8 1.26 1.38l-1.8.88c-.14-.35-.38-.63-.7-.83-.32-.2-.71-.3-1.17-.3-.51 0-.96.12-1.34.37-.38.25-.67.6-.87 1.05s-.3 1-.3 1.63c0 .64.1 1.18.3 1.62.2.44.49.78.87 1.02.38.24.83.36 1.36.36.43 0 .8-.08 1.12-.24.32-.16.57-.4.76-.71l1.86.68zm8.25-4.47h-5.22v-1.88h12.5v1.88h-5.23v8.62h-2.05v-8.62z" fill="white" transform="scale(0.85) translate(2, 2)" />
        </svg>
      );

    case "Tailwind CSS":
    case "Tailwind CSS v4":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
            fill="#38bdf8"
          />
        </svg>
      );

    case "GSAP":
    case "GSAP 3.15":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <rect width="100" height="100" rx="16" fill="#0ae448" />
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#000000" fontWeight="900" fontSize="30" fontFamily="monospace">
            GSAP
          </text>
        </svg>
      );

    case "GSAP + Motion":
      return (
        <div className={`inline-flex items-center gap-1.5 ${className}`} {...ariaProps}>
          <TechLogo name="GSAP" className="w-1/2 h-full object-contain" />
          <TechLogo name="Motion" className="w-1/2 h-full object-contain" />
        </div>
      );
    case "Motion":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
        </svg>
      );

    case "Three.js":
    case "Three.js WebGL":
    case "Three.js / GLSL":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M12 2L2 19.5h20L12 2zm0 3.7l6.8 11.8H5.2L12 5.7z" fill="white" />
          <path d="M12 9.5l3.5 6H8.5L12 9.5z" fill="#049EF4" />
        </svg>
      );

    case "Go":
    case "Go (Golang)":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path
            d="M1.811 10.279c.404-.08 1.144-.124 1.636-.048.491.076.674.33.633.722-.045.426-.356.666-.848.666-.492 0-.825-.175-1.127-.474-.297-.294-.407-.63-.294-.866zm2.463 3.011c.29-.057.822-.089 1.176-.035.353.054.484.237.455.518-.032.306-.255.478-.609.478-.353 0-.592-.125-.808-.34-.214-.211-.293-.453-.214-.621zm14.61-4.707c-2.478 0-4.148 1.76-4.148 4.298 0 2.57 1.654 4.314 4.195 4.314 1.88 0 3.195-.918 3.805-2.316h-4.07v-1.639h6.147v.88c0 3.618-2.673 5.09-5.914 5.09-3.757 0-6.425-2.686-6.425-6.329 0-3.611 2.684-6.314 6.41-6.314 2.531 0 4.547 1.194 5.485 3.174l-1.859.984c-.66-1.383-1.859-2.142-3.626-2.142zm-8.868 0c-2.5 0-4.195 1.791-4.195 4.314 0 2.523 1.695 4.314 4.195 4.314 2.5 0 4.195-1.791 4.195-4.314 0-2.523-1.695-4.314-4.195-4.314zm0 6.945c-1.321 0-2.39-1.177-2.39-2.631 0-1.455 1.069-2.631 2.39-2.631 1.321 0 2.39 1.176 2.39 2.631 0 1.454-1.069 2.631-2.39 2.631z"
            fill="#00ADD8"
          />
        </svg>
      );

    case "Docker":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#0db7ed" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .103.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm-2.953 0h2.118a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.192a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM23.713 11.64c-.368-.242-.998-.372-1.706-.296-.153-.356-.37-.678-.646-.957l-.36-.31-.476.108c-.783.177-1.32.483-1.685.945-.46-.226-.995-.357-1.571-.357H.186A.186.186 0 000 10.957v3.238c0 1.956.495 3.753 1.47 5.174 1.253 1.826 3.167 2.83 5.534 2.83 6.953 0 12.39-4.832 14.195-10.334.33-.03.74-.047 1.157-.047.887 0 1.604.148 2.072.43.125.074.28.026.34-.108l.582-1.127a.267.267 0 00-.167-.373z" />
        </svg>
      );

    case "Podman":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.08 3.429c3.085 0 5.688 2.016 6.643 4.821a7.714 7.714 0 01-.848 7.375 7.683 7.683 0 01-5.795 2.946c-4.254 0-7.714-3.46-7.714-7.714 0-4.255 3.46-7.428 7.714-7.428zm-.08 2.571c-2.833 0-5.143 2.31-5.143 5.143s2.31 5.143 5.143 5.143 5.143-2.31 5.143-5.143-2.31-5.143-5.143-5.143zm0 1.714a3.429 3.429 0 110 6.858 3.429 3.429 0 010-6.858z" fill="#892CA0" />
        </svg>
      );

    case "Docker & Podman":
      return (
        <div className={`inline-flex items-center gap-1.5 ${className}`} {...ariaProps}>
          <TechLogo name="Docker" className="w-1/2 h-full object-contain" />
          <TechLogo name="Podman" className="w-1/2 h-full object-contain" />
        </div>
      );

    case "Kubernetes":
    case "Kubernetes & K3s":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path
            d="M11.996 2l-7.79 4.498v8.997l7.79 4.502 7.801-4.502V6.498L11.996 2zm0 1.838l6.2 3.58v7.16l-6.2 3.58-6.195-3.58v-7.16l6.195-3.58zm-1.04 3.714v2.094l-1.815 1.047-1.815-1.047-.925 1.602 1.815 1.047v2.096l1.85-.002v-2.094l1.815-1.047 1.815 1.047.925-1.602-1.815-1.047V7.552h-1.85z"
            fill="#326CE5"
          />
        </svg>
      );

    case "Linux":
    case "Linux & Networking":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.2 3C7 11 5 13.5 5 17c0 2 1 3.5 3 4.5 1 .5 2.5.5 4 .5s3 0 4-.5c2-1 3-2.5 3-4.5 0-3.5-2-6-3.7-7.5.7-.7 1.2-1.8 1.2-3C16.5 4 14.5 2 12 2zm-1.5 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-1.5 2.5c.8 0 1.5.5 1.5 1h-3c0-.5.7-1 1.5-1z" fill="#FCC624" />
          <path d="M12 14c-1.5 0-3 1-3 3s1.5 2 3 2 3-1 3-2-1.5-3-3-3z" fill="white" />
        </svg>
      );

    case "Figma":
      return (
        <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5a9.5 9.5 0 0 1 9.5-9.5H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5a9.5 9.5 0 0 0 9.5 9.5H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5a9.5 9.5 0 0 0 9.5 9.5H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      );

    case "Argo CD":
    case "Argo":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <circle cx="12" cy="12" r="10" stroke="#EF7B4D" strokeWidth="1.5" />
          <path
            d="M12 5.5c-3.6 0-6.5 2.9-6.5 6.5 0 2.4 1.3 4.5 3.3 5.6l.8-1.5c-1.5-.8-2.5-2.4-2.5-4.1 0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9c0 1.7-1 3.3-2.5 4.1l.8 1.5c2-1.1 3.3-3.2 3.3-5.6 0-3.6-2.9-6.5-6.5-6.5z"
            fill="#EF7B4D"
          />
          <circle cx="9.5" cy="11.5" r="1" fill="#EF7B4D" />
          <circle cx="14.5" cy="11.5" r="1" fill="#EF7B4D" />
          <path d="M10 14.2c.6.6 1.3.8 2 .8s1.4-.2 2-.8" stroke="#EF7B4D" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "GitHub Actions":
    case "Actions":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <rect width="24" height="24" rx="5" fill="#2088FF" />
          <path d="M18.5 12.5a2.5 2.5 0 01-2.5 2.5h-4v2.5l-5-3.75 5-3.75v2.5h4a.5.5 0 00.5-.5V8.5h2v4z" fill="white" />
        </svg>
      );

    case "GitHub Actions + Argo CD":
      return (
        <div className={`inline-flex items-center gap-1.5 ${className}`} {...ariaProps}>
          <TechLogo name="GitHub Actions" className="w-1/2 h-full object-contain" />
          <TechLogo name="Argo CD" className="w-1/2 h-full object-contain" />
        </div>
      );

    case "Tailscale":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          {/* Row 1 */}
          <circle cx="5" cy="5" r="2.5" fill="#4F46E5" />
          <circle cx="12" cy="5" r="2.5" fill="white" fillOpacity="0.2" />
          <circle cx="19" cy="5" r="2.5" fill="white" fillOpacity="0.2" />
          {/* Row 2 */}
          <circle cx="5" cy="12" r="2.5" fill="#4F46E5" />
          <circle cx="12" cy="12" r="2.5" fill="#4F46E5" />
          <circle cx="19" cy="12" r="2.5" fill="#4F46E5" />
          {/* Row 3 */}
          <circle cx="5" cy="19" r="2.5" fill="white" fillOpacity="0.2" />
          <circle cx="12" cy="19" r="2.5" fill="white" fillOpacity="0.2" />
          <circle cx="19" cy="19" r="2.5" fill="#4F46E5" />
        </svg>
      );

    case "Tailscale + SAST":
      return (
        <div className={`inline-flex items-center gap-1.5 ${className}`} {...ariaProps}>
          <TechLogo name="Tailscale" className="w-1/2 h-full object-contain" />
          <TechLogo name="DevSecOps" className="w-1/2 h-full object-contain" />
        </div>
      );

    case "SonarQube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <circle cx="6" cy="18" r="2" fill="#4B9FD5" />
          <path d="M6 13a5 5 0 015 5" stroke="#4B9FD5" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M6 8a10 10 0 0110 10" stroke="#4B9FD5" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M6 3a15 15 0 0115 15" stroke="#4B9FD5" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case "CodeQL":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M12 2L4 5.5v5.5c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V5.5L12 2z" fill="#18181B" stroke="#7957D5" strokeWidth="1.5" />
          <path d="M9.5 10.5l-2 2 2 2M14.5 10.5l2 2-2 2M13 9l-2 7" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "Design Systems":
    case "Design Systems & Tokens":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <rect x="3" y="3" width="7" height="7" rx="2" fill="#F59E0B" fillOpacity="0.85" />
          <circle cx="17.5" cy="6.5" r="3.5" fill="#F59E0B" />
          <path d="M6.5 14L10 20H3L6.5 14Z" fill="#F59E0B" />
          <rect x="14" y="14" width="7" height="7" rx="2" stroke="#F59E0B" strokeWidth="1.6" />
        </svg>
      );

    case "Typography":
    case "Typography & Art Direction":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M12 3.5L6.5 18.5H9L10.3 15H13.7L15 18.5H17.5L12 3.5ZM11 13L12 9.5L13 13H11Z" fill="#F59E0B" />
          <path d="M4 21H20" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "Motion Design":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M3 18C7 18 8 6 12 6s5 12 9 12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="3" cy="18" r="2.5" fill="#F59E0B" />
          <circle cx="12" cy="6" r="2.5" fill="#F59E0B" />
          <circle cx="21" cy="18" r="2.5" fill="#F59E0B" />
        </svg>
      );

    case "Prototyping":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <rect x="5" y="2" width="14" height="20" rx="3" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
          <path d="M11 5.5h2M12 18.5h.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M12.5 9L10 12.5h3.5L11.5 16" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "DevSecOps":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...ariaProps}>
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.09-2.67 7.9-6 8.91-3.33-1.01-6-4.82-6-8.91V6.43l6-2.25z" fill="#10B981" />
          <path d="M12 7a3 3 0 00-3 3v1h-1v5h8v-5h-1v-1a3 3 0 00-3-3zm-1.5 3a1.5 1.5 0 013 0v1h-3v-1z" fill="#34D399" />
        </svg>
      );

    default:
      return (
        <span className={`font-mono text-xs font-bold ${className} flex items-center justify-center text-white/70`} {...ariaProps}>
          {name.slice(0, 3).toUpperCase()}
        </span>
      );
  }
}

export default TechLogo;
