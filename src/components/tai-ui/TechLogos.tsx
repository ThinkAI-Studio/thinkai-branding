"use client";

import React from "react";

export function TechLogo({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case "Next.js":
    case "Next.js 16":
      return (
        <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M11.75 14.25c-.24.7-.62 1.25-1.14 1.63-.52.38-1.18.57-1.98.57-.75 0-1.42-.17-2.02-.51-.6-.34-1.07-.82-1.41-1.43s-.51-1.32-.51-2.12c0-.82.18-1.55.54-2.17.36-.62.86-1.1 1.49-1.44.64-.34 1.34-.51 2.12-.51.81 0 1.5.17 2.08.52.57.34.99.8 1.26 1.38l-1.8.88c-.14-.35-.38-.63-.7-.83-.32-.2-.71-.3-1.17-.3-.51 0-.96.12-1.34.37-.38.25-.67.6-.87 1.05s-.3 1-.3 1.63c0 .64.1 1.18.3 1.62.2.44.49.78.87 1.02.38.24.83.36 1.36.36.43 0 .8-.08 1.12-.24.32-.16.57-.4.76-.71l1.86.68zm8.25-4.47h-5.22v-1.88h12.5v1.88h-5.23v8.62h-2.05v-8.62z" fill="white" transform="scale(0.85) translate(2, 2)" />
        </svg>
      );

    case "Tailwind CSS":
    case "Tailwind CSS v4":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
            fill="#38bdf8"
          />
        </svg>
      );

    case "GSAP":
    case "GSAP 3.15":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="16" fill="#0ae448" />
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#000000" fontWeight="900" fontSize="30" fontFamily="monospace">
            GSAP
          </text>
        </svg>
      );

    case "Framer Motion":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
        </svg>
      );

    case "Three.js":
    case "Three.js WebGL":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 19.5h20L12 2zm0 3.7l6.8 11.8H5.2L12 5.7z" fill="white" />
          <path d="M12 9.5l3.5 6H8.5L12 9.5z" fill="#049EF4" />
        </svg>
      );

    case "Go":
    case "Go (Golang)":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.811 10.279c.404-.08 1.144-.124 1.636-.048.491.076.674.33.633.722-.045.426-.356.666-.848.666-.492 0-.825-.175-1.127-.474-.297-.294-.407-.63-.294-.866zm2.463 3.011c.29-.057.822-.089 1.176-.035.353.054.484.237.455.518-.032.306-.255.478-.609.478-.353 0-.592-.125-.808-.34-.214-.211-.293-.453-.214-.621zm14.61-4.707c-2.478 0-4.148 1.76-4.148 4.298 0 2.57 1.654 4.314 4.195 4.314 1.88 0 3.195-.918 3.805-2.316h-4.07v-1.639h6.147v.88c0 3.618-2.673 5.09-5.914 5.09-3.757 0-6.425-2.686-6.425-6.329 0-3.611 2.684-6.314 6.41-6.314 2.531 0 4.547 1.194 5.485 3.174l-1.859.984c-.66-1.383-1.859-2.142-3.626-2.142zm-8.868 0c-2.5 0-4.195 1.791-4.195 4.314 0 2.523 1.695 4.314 4.195 4.314 2.5 0 4.195-1.791 4.195-4.314 0-2.523-1.695-4.314-4.195-4.314zm0 6.945c-1.321 0-2.203-1.077-2.203-2.631 0-1.554.882-2.631 2.203-2.631 1.321 0 2.203 1.077 2.203 2.631 0 1.554-.882 2.631-2.203 2.631z"
            fill="#00ADD8"
          />
        </svg>
      );

    case "Docker":
    case "Docker & Podman":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#0db7ed" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .103.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.953 0h2.118a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.192a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM23.713 11.64c-.368-.242-.998-.372-1.706-.296-.153-.356-.37-.678-.646-.957l-.36-.31-.476.108c-.783.177-1.32.483-1.685.945-.46-.226-.995-.357-1.571-.357H.186A.186.186 0 000 10.957v3.238c0 1.956.495 3.753 1.47 5.174 1.253 1.826 3.167 2.83 5.534 2.83 6.953 0 12.39-4.832 14.195-10.334.33-.03.74-.047 1.157-.047.887 0 1.604.148 2.072.43.125.074.28.026.34-.108l.582-1.127a.267.267 0 00-.167-.373z" />
        </svg>
      );

    case "Kubernetes":
    case "Kubernetes & K3s":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.996 2l-7.79 4.498v8.997l7.79 4.502 7.801-4.502V6.498L11.996 2zm0 1.838l6.2 3.58v7.16l-6.2 3.58-6.195-3.58v-7.16l6.195-3.58zm-1.04 3.714v2.094l-1.815 1.047-1.815-1.047-.925 1.602 1.815 1.047v2.096l1.85-.002v-2.094l1.815-1.047 1.815 1.047.925-1.602-1.815-1.047V7.552h-1.85z"
            fill="#326CE5"
          />
        </svg>
      );

    case "Linux":
    case "Linux & Networking":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.2 3C7 11 5 13.5 5 17c0 2 1 3.5 3 4.5 1 .5 2.5.5 4 .5s3 0 4-.5c2-1 3-2.5 3-4.5 0-3.5-2-6-3.7-7.5.7-.7 1.2-1.8 1.2-3C16.5 4 14.5 2 12 2zm-1.5 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-1.5 2.5c.8 0 1.5.5 1.5 1h-3c0-.5.7-1 1.5-1z" fill="#FCC624" />
          <path d="M12 14c-1.5 0-3 1-3 3s1.5 2 3 2 3-1 3-2-1.5-3-3-3z" fill="white" />
        </svg>
      );

    case "DevSecOps":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.09-2.67 7.9-6 8.91-3.33-1.01-6-4.82-6-8.91V6.43l6-2.25z" fill="#10B981" />
          <path d="M12 7a3 3 0 00-3 3v1h-1v5h8v-5h-1v-1a3 3 0 00-3-3zm-1.5 3a1.5 1.5 0 013 0v1h-3v-1z" fill="#34D399" />
        </svg>
      );

    default:
      return (
        <span className={`font-mono text-xs font-bold ${className} flex items-center justify-center text-white/70`}>
          {name.slice(0, 3).toUpperCase()}
        </span>
      );
  }
}

export default TechLogo;
