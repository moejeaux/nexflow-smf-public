interface NexFlowLogoProps {
  size?: number
  showText?: boolean
  className?: string
  variant?: "light" | "dark"
}

type ColorScheme = {
  name: string
  layers: [string, string, string, string]
  accent: string
  textClass: string
  bgLight: string
  bgDark: string
}

const colorSchemes: Record<string, ColorScheme> = {
  teal: {
    name: "Teal",
    layers: ["#0d9488", "#14b8a6", "#2dd4bf", "#5eead4"],
    accent: "text-teal-600",
    textClass: "text-teal-600",
    bgLight: "#f0fdfa",
    bgDark: "#0f172a",
  },
  blue: {
    name: "Blue",
    layers: ["#1e40af", "#2563eb", "#3b82f6", "#60a5fa"],
    accent: "text-blue-600",
    textClass: "text-blue-600",
    bgLight: "#eff6ff",
    bgDark: "#0f172a",
  },
  indigo: {
    name: "Indigo",
    layers: ["#4338ca", "#6366f1", "#818cf8", "#a5b4fc"],
    accent: "text-indigo-600",
    textClass: "text-indigo-600",
    bgLight: "#eef2ff",
    bgDark: "#0f172a",
  },
  emerald: {
    name: "Emerald",
    layers: ["#047857", "#10b981", "#34d399", "#6ee7b7"],
    accent: "text-emerald-600",
    textClass: "text-emerald-600",
    bgLight: "#ecfdf5",
    bgDark: "#0f172a",
  },
  amber: {
    name: "Amber",
    layers: ["#b45309", "#f59e0b", "#fbbf24", "#fcd34d"],
    accent: "text-amber-600",
    textClass: "text-amber-600",
    bgLight: "#fffbeb",
    bgDark: "#0f172a",
  },
  rose: {
    name: "Rose",
    layers: ["#be123c", "#e11d48", "#fb7185", "#fda4af"],
    accent: "text-rose-600",
    textClass: "text-rose-600",
    bgLight: "#fff1f2",
    bgDark: "#0f172a",
  },
  slate: {
    name: "Slate",
    layers: ["#475569", "#64748b", "#94a3b8", "#cbd5e1"],
    accent: "text-slate-600",
    textClass: "text-slate-600",
    bgLight: "#f8fafc",
    bgDark: "#0f172a",
  },
}

// Main configurable logo component
export function NexFlowInfraStackLogo({
  size = 48,
  showText = true,
  className = "",
  variant = "dark",
  color = "teal",
}: NexFlowLogoProps & { color?: keyof typeof colorSchemes }) {
  const scheme = colorSchemes[color]
  const bgColor = variant === "dark" ? scheme.bgDark : scheme.bgLight

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill={bgColor} />

        {/* Bottom layer */}
        <path
          d="M16 42L32 50L48 42"
          stroke={scheme.layers[0]}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </path>

        {/* Second layer */}
        <path
          d="M16 34L32 42L48 34"
          stroke={scheme.layers[1]}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </path>

        {/* Third layer */}
        <path
          d="M16 26L32 34L48 26"
          stroke={scheme.layers[2]}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>

        {/* Top layer with pulse */}
        <path d="M16 18L32 26L48 18L32 10Z" fill={scheme.layers[3]}>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`text-xl font-semibold tracking-tight ${variant === "dark" ? "text-white" : "text-slate-900"}`}
          >
            Nex<span className={scheme.textClass}>Flow</span>
          </span>
          <span
            className={`text-[10px] uppercase tracking-widest font-medium ${variant === "dark" ? "text-slate-400" : "text-slate-500"}`}
          >
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

// Static (no animation) version for favicons, exports, etc.
export function NexFlowInfraStackLogoStatic({
  size = 48,
  className = "",
  variant = "dark",
  color = "teal",
}: Omit<NexFlowLogoProps, "showText"> & { color?: keyof typeof colorSchemes }) {
  const scheme = colorSchemes[color]
  const bgColor = variant === "dark" ? scheme.bgDark : scheme.bgLight

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill={bgColor} />
      <path
        d="M16 42L32 50L48 42"
        stroke={scheme.layers[0]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M16 34L32 42L48 34"
        stroke={scheme.layers[1]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M16 26L32 34L48 26"
        stroke={scheme.layers[2]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
      <path d="M16 18L32 26L48 18L32 10Z" fill={scheme.layers[3]} />
    </svg>
  )
}

// Icon only (no circle background) for flexibility
export function NexFlowInfraStackIcon({
  size = 48,
  className = "",
  color = "teal",
}: Omit<NexFlowLogoProps, "showText" | "variant"> & { color?: keyof typeof colorSchemes }) {
  const scheme = colorSchemes[color]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 42L32 50L48 42"
        stroke={scheme.layers[0]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M16 34L32 42L48 34"
        stroke={scheme.layers[1]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M16 26L32 34L48 26"
        stroke={scheme.layers[2]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
      <path d="M16 18L32 26L48 18L32 10Z" fill={scheme.layers[3]} />
    </svg>
  )
}

// Export all color schemes for reference
export { colorSchemes }
export type { ColorScheme }
