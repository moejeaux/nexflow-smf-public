"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// All SVG code as strings for easy copying
const svgLogos = {
  "InfraStack (Teal)": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="30" fill="#0f172a"/>
  <path d="M16 42L32 50L48 42" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
  <path d="M16 34L32 42L48 34" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
  <path d="M16 26L32 34L48 26" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85"/>
  <path d="M16 18L32 26L48 18L32 10Z" fill="#5eead4"/>
</svg>`,

  Emergence: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="emergence-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="50%" stopColor="#3b82f6"/>
      <stop offset="100%" stopColor="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="emergence-grad-2" x1="100%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#f43f5e"/>
      <stop offset="100%" stopColor="#ec4899"/>
    </linearGradient>
  </defs>
  <path d="M16 52V12" stroke="url(#emergence-grad-1)" strokeWidth="4" strokeLinecap="round"/>
  <path d="M16 12L48 52" stroke="url(#emergence-grad-1)" strokeWidth="4" strokeLinecap="round"/>
  <path d="M48 52V12" stroke="url(#emergence-grad-2)" strokeWidth="4" strokeLinecap="round"/>
  <circle cx="16" cy="32" r="2" fill="#06b6d4" opacity="0.8"/>
  <circle cx="32" cy="32" r="2.5" fill="#8b5cf6" opacity="0.9"/>
  <circle cx="48" cy="32" r="2" fill="#f43f5e" opacity="0.8"/>
</svg>`,

  Mobius: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mobius-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="33%" stopColor="#3b82f6"/>
      <stop offset="66%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#06b6d4"/>
    </linearGradient>
  </defs>
  <path d="M8 32C8 20 18 14 28 22C38 30 42 30 52 22C62 14 56 44 46 42C36 40 32 48 22 42C12 36 8 44 8 32Z" stroke="url(#mobius-grad)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
  <path d="M22 28C32 20 32 44 42 36" stroke="url(#mobius-grad)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"/>
</svg>`,

  Quantum: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="quantum-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="100%" stopColor="#3b82f6"/>
    </linearGradient>
    <linearGradient id="quantum-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#ec4899"/>
    </linearGradient>
  </defs>
  <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#quantum-grad-1)" strokeWidth="2.5" fill="none"/>
  <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#quantum-grad-2)" strokeWidth="2.5" fill="none" transform="rotate(60 32 32)"/>
  <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#quantum-grad-1)" strokeWidth="2.5" fill="none" transform="rotate(120 32 32)" opacity="0.7"/>
  <circle cx="32" cy="32" r="5" fill="url(#quantum-grad-2)"/>
  <circle cx="32" cy="32" r="2" fill="white"/>
</svg>`,

  Pulse: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pulse-grad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="50%" stopColor="#3b82f6"/>
      <stop offset="100%" stopColor="#8b5cf6"/>
    </linearGradient>
  </defs>
  <path d="M4 32H16L22 12L32 52L42 20L48 32H60" stroke="url(#pulse-grad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  <path d="M4 32H16L22 18L32 46L42 24L48 32H60" stroke="url(#pulse-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3"/>
</svg>`,

  Helix: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="helix-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="100%" stopColor="#3b82f6"/>
    </linearGradient>
    <linearGradient id="helix-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#ec4899"/>
    </linearGradient>
  </defs>
  <path d="M20 8C36 16 36 24 20 32C36 40 36 48 20 56" stroke="url(#helix-grad-1)" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <path d="M44 8C28 16 28 24 44 32C28 40 28 48 44 56" stroke="url(#helix-grad-2)" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <line x1="24" y1="20" x2="40" y2="20" stroke="white" strokeWidth="2" opacity="0.5"/>
  <line x1="24" y1="32" x2="40" y2="32" stroke="white" strokeWidth="2" opacity="0.7"/>
  <line x1="24" y1="44" x2="40" y2="44" stroke="white" strokeWidth="2" opacity="0.5"/>
</svg>`,

  Nexus: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="nexus-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="100%" stopColor="#3b82f6"/>
    </linearGradient>
    <linearGradient id="nexus-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#ec4899"/>
    </linearGradient>
    <radialGradient id="nexus-center" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="white"/>
      <stop offset="100%" stopColor="#3b82f6"/>
    </radialGradient>
  </defs>
  <path d="M8 8Q20 20 32 32" stroke="url(#nexus-grad-1)" strokeWidth="3" strokeLinecap="round"/>
  <path d="M56 8Q44 20 32 32" stroke="url(#nexus-grad-2)" strokeWidth="3" strokeLinecap="round"/>
  <path d="M8 56Q20 44 32 32" stroke="url(#nexus-grad-2)" strokeWidth="3" strokeLinecap="round"/>
  <path d="M56 56Q44 44 32 32" stroke="url(#nexus-grad-1)" strokeWidth="3" strokeLinecap="round"/>
  <path d="M32 32L32 4" stroke="url(#nexus-grad-1)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
  <path d="M32 32L32 60" stroke="url(#nexus-grad-2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
  <path d="M32 32L4 32" stroke="url(#nexus-grad-2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
  <path d="M32 32L60 32" stroke="url(#nexus-grad-1)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
  <circle cx="32" cy="32" r="8" fill="url(#nexus-center)"/>
  <circle cx="32" cy="32" r="3" fill="white"/>
</svg>`,

  Singularity: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="singularity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="50%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#ec4899"/>
    </linearGradient>
  </defs>
  <ellipse cx="32" cy="32" rx="28" ry="8" stroke="url(#singularity-grad)" strokeWidth="2" fill="none" opacity="0.4"/>
  <ellipse cx="32" cy="32" rx="24" ry="14" stroke="url(#singularity-grad)" strokeWidth="2" fill="none" opacity="0.6"/>
  <ellipse cx="32" cy="32" rx="18" ry="20" stroke="url(#singularity-grad)" strokeWidth="2.5" fill="none" opacity="0.8"/>
  <ellipse cx="32" cy="32" rx="10" ry="26" stroke="url(#singularity-grad)" strokeWidth="3" fill="none"/>
  <circle cx="32" cy="32" r="4" fill="url(#singularity-grad)"/>
  <circle cx="32" cy="32" r="1.5" fill="white"/>
</svg>`,

  Prism: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="prism-in" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stopColor="white"/>
      <stop offset="100%" stopColor="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="prism-out-1"><stop offset="0%" stopColor="#ec4899"/><stop offset="100%" stopColor="#f43f5e"/></linearGradient>
    <linearGradient id="prism-out-2"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#eab308"/></linearGradient>
    <linearGradient id="prism-out-3"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#22c55e"/></linearGradient>
    <linearGradient id="prism-out-4"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
    <linearGradient id="prism-out-5"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#a855f7"/></linearGradient>
    <linearGradient id="prism-face" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#1e293b"/>
      <stop offset="100%" stopColor="#0f172a"/>
    </linearGradient>
  </defs>
  <line x1="4" y1="32" x2="22" y2="32" stroke="url(#prism-in)" strokeWidth="3" strokeLinecap="round"/>
  <polygon points="24,12 24,52 44,32" fill="url(#prism-face)" stroke="#3b82f6" strokeWidth="1.5"/>
  <line x1="44" y1="32" x2="60" y2="16" stroke="url(#prism-out-1)" strokeWidth="2.5" strokeLinecap="round"/>
  <line x1="44" y1="32" x2="60" y2="24" stroke="url(#prism-out-2)" strokeWidth="2.5" strokeLinecap="round"/>
  <line x1="44" y1="32" x2="60" y2="32" stroke="url(#prism-out-3)" strokeWidth="2.5" strokeLinecap="round"/>
  <line x1="44" y1="32" x2="60" y2="40" stroke="url(#prism-out-4)" strokeWidth="2.5" strokeLinecap="round"/>
  <line x1="44" y1="32" x2="60" y2="48" stroke="url(#prism-out-5)" strokeWidth="2.5" strokeLinecap="round"/>
</svg>`,

  Wormhole: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wormhole-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="50%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#ec4899"/>
    </linearGradient>
    <radialGradient id="wormhole-center" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffffff"/>
      <stop offset="40%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="28" stroke="url(#wormhole-grad)" strokeWidth="1.5" fill="none" opacity="0.3"/>
  <circle cx="32" cy="32" r="23" stroke="url(#wormhole-grad)" strokeWidth="1.5" fill="none" opacity="0.4"/>
  <circle cx="32" cy="32" r="18" stroke="url(#wormhole-grad)" strokeWidth="2" fill="none" opacity="0.5"/>
  <circle cx="32" cy="32" r="13" stroke="url(#wormhole-grad)" strokeWidth="2" fill="none" opacity="0.7"/>
  <circle cx="32" cy="32" r="8" stroke="url(#wormhole-grad)" strokeWidth="2.5" fill="none" opacity="0.9"/>
  <path d="M4 32L18 32M12 26L18 32L12 38" stroke="url(#wormhole-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M46 32L60 32M54 26L60 32L54 38" stroke="url(#wormhole-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="32" cy="32" r="3" fill="url(#wormhole-center)"/>
</svg>`,

  Tornado: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tornado-grad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="50%" stopColor="#3b82f6"/>
      <stop offset="100%" stopColor="#8b5cf6"/>
    </linearGradient>
  </defs>
  <path d="M8 8C20 12 44 12 56 8" stroke="url(#tornado-grad)" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <path d="M12 18C22 22 42 22 52 18" stroke="url(#tornado-grad)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9"/>
  <path d="M16 28C24 32 40 32 48 28" stroke="url(#tornado-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
  <path d="M22 38C28 41 36 41 42 38" stroke="url(#tornado-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7"/>
  <path d="M26 48C30 50 34 50 38 48" stroke="url(#tornado-grad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
  <path d="M30 56C31 57 33 57 34 56" stroke="url(#tornado-grad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
  <circle cx="32" cy="58" r="2" fill="url(#tornado-grad)"/>
</svg>`,

  "Fintech Spiral": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fintech-spiral" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0d9488"/>
      <stop offset="100%" stopColor="#0f172a"/>
    </linearGradient>
  </defs>
  <circle cx="32" cy="32" r="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
  <path d="M32 8C32 8 50 14 50 32C50 44 42 50 32 50C22 50 16 42 20 32C24 22 32 24 32 32C32 38 28 40 24 36" stroke="url(#fintech-spiral)" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <circle cx="32" cy="32" r="3" fill="#0d9488"/>
</svg>`,

  "Fintech Abstract N": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a"/>
  <path d="M18 48V16" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round"/>
  <path d="M18 16C18 16 28 32 32 32C36 32 46 16 46 16" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <path d="M46 16V48" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round"/>
  <circle cx="32" cy="32" r="2" fill="#5eead4"/>
</svg>`,

  "Fintech Circular Flow": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="30" fill="#0f172a"/>
  <path d="M32 12A20 20 0 0 1 52 32" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <path d="M52 32A20 20 0 0 1 32 52" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <path d="M32 52A20 20 0 0 1 12 32" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <path d="M12 32A20 20 0 0 1 32 12" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" fill="none"/>
  <circle cx="32" cy="32" r="6" fill="#14b8a6"/>
  <circle cx="32" cy="32" r="3" fill="#0f172a"/>
</svg>`,

  "Fintech Wave": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="14" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5"/>
  <path d="M12 38C18 28 24 42 32 32C40 22 46 36 52 26" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" fill="none"/>
  <path d="M12 44C18 36 24 46 32 38C40 30 46 40 52 34" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
</svg>`,

  "Meta Layers": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a"/>
  <rect x="12" y="42" width="40" height="6" rx="2" fill="#0d9488" opacity="0.4"/>
  <rect x="16" y="34" width="32" height="6" rx="2" fill="#14b8a6" opacity="0.6"/>
  <rect x="20" y="26" width="24" height="6" rx="2" fill="#2dd4bf" opacity="0.8"/>
  <rect x="24" y="18" width="16" height="6" rx="2" fill="#5eead4"/>
  <path d="M32 48L32 44" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
  <path d="M32 40L32 32" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
  <path d="M32 32L32 24" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
  <path d="M29 15L32 12L35 15" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>`,

  "Infra Network": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="30" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5"/>
  <circle cx="32" cy="16" r="5" fill="#0f172a"/>
  <circle cx="16" cy="40" r="5" fill="#0f172a"/>
  <circle cx="48" cy="40" r="5" fill="#0f172a"/>
  <circle cx="32" cy="32" r="8" fill="#0d9488"/>
  <circle cx="32" cy="32" r="4" fill="#5eead4"/>
  <path d="M32 21L32 24" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round"/>
  <path d="M20 38L26 35" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round"/>
  <path d="M44 38L38 35" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round"/>
  <circle cx="32" cy="22" r="1.5" fill="#5eead4"/>
  <circle cx="23" cy="36" r="1.5" fill="#5eead4"/>
  <circle cx="41" cy="36" r="1.5" fill="#5eead4"/>
</svg>`,

  "Meta Orchestrator": `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a"/>
  <circle cx="32" cy="32" r="22" stroke="#0d9488" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
  <circle cx="32" cy="32" r="14" stroke="#14b8a6" strokeWidth="2.5" fill="none"/>
  <path d="M32 10L32 18" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
  <path d="M32 46L32 54" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
  <path d="M10 32L18 32" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
  <path d="M46 32L54 32" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
  <path d="M29 15L32 18L35 15" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M29 49L32 46L35 49" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M15 29L18 32L15 35" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M49 29L46 32L49 35" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="32" cy="32" r="6" fill="#2dd4bf"/>
  <circle cx="32" cy="32" r="3" fill="#0f172a"/>
</svg>`,
}

export default function SVGExportPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = async (name: string, svg: string) => {
    await navigator.clipboard.writeText(svg)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">NexFlow SVG Export</h1>
          <p className="text-slate-600">Click any card to copy the SVG code. Paste directly into Figma or your code.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(svgLogos).map(([name, svg]) => (
            <button
              key={name}
              onClick={() => copyToClipboard(name, svg)}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-teal-400 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-slate-900">{name}</span>
                {copied === name ? (
                  <span className="flex items-center gap-1 text-sm text-teal-600">
                    <Check className="w-4 h-4" /> Copied!
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                )}
              </div>
              <div className="flex justify-center p-4 bg-slate-50 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: svg }} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-slate-900 text-white rounded-xl p-6">
          <h2 className="font-semibold mb-3">How to use in Figma:</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
            <li>Click any logo above to copy the SVG code</li>
            <li>
              In Figma, press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Cmd/Ctrl + V</kbd> to paste
            </li>
            <li>The SVG will appear as editable vector shapes</li>
            <li>Right-click and "Ungroup" to edit individual elements</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
