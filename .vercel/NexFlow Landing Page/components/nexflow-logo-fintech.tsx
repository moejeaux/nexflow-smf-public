interface NexFlowLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function NexFlowFintechSpiral({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fintech-spiral" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <path
          d="M32 8C32 8 50 14 50 32C50 44 42 50 32 50C22 50 16 42 20 32C24 22 32 24 32 32C32 38 28 40 24 36"
          stroke="url(#fintech-spiral)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="32" cy="32" r="3" fill="#0d9488" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowFintechConverge({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        {/* Three converging streams */}
        <path d="M12 20C20 24 26 28 32 32" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 20C44 24 38 28 32 32" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 52C32 44 32 38 32 32" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
        {/* Arrow heads */}
        <path d="M28 28L32 32L28 32" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 28L32 32L36 32" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 36L32 32L36 36" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Center point */}
        <circle cx="32" cy="32" r="4" fill="#0f172a" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowFintechAbstractN({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a" />
        {/* Stylized N with flowing curves */}
        <path d="M18 48V16" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M18 16C18 16 28 32 32 32C36 32 46 16 46 16"
          stroke="#5eead4"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M46 16V48" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" />
        {/* Flow accent */}
        <circle cx="32" cy="32" r="2" fill="#5eead4" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowFintechCircularFlow({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        {/* Flowing arcs */}
        <path d="M32 12A20 20 0 0 1 52 32" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M52 32A20 20 0 0 1 32 52" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M32 52A20 20 0 0 1 12 32" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M12 32A20 20 0 0 1 32 12" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Center */}
        <circle cx="32" cy="32" r="6" fill="#14b8a6" />
        <circle cx="32" cy="32" r="3" fill="#0f172a" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowFintechWave({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="14" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
        {/* Elegant flowing wave */}
        <path
          d="M12 38C18 28 24 42 32 32C40 22 46 36 52 26"
          stroke="#0f766e"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Secondary subtle wave */}
        <path
          d="M12 44C18 36 24 46 32 38C40 30 46 40 52 34"
          stroke="#5eead4"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowFintechGeometric({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        {/* Geometric spiral layers */}
        <path d="M32 12L48 24L48 40L32 52L16 40L16 24Z" stroke="#0d9488" strokeWidth="2" fill="none" />
        <path d="M32 18L42 26L42 38L32 46L22 38L22 26Z" stroke="#14b8a6" strokeWidth="2" fill="none" />
        <path d="M32 24L36 28L36 36L32 40L28 36L28 28Z" stroke="#2dd4bf" strokeWidth="2" fill="none" />
        <circle cx="32" cy="32" r="3" fill="#5eead4" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowFintechTripleStream({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a" />
        {/* Three parallel flowing streams */}
        <path
          d="M14 18C24 18 28 28 32 32C36 36 40 46 50 46"
          stroke="#5eead4"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 32C24 32 28 32 32 32C36 32 40 32 50 32"
          stroke="#14b8a6"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 46C24 46 28 36 32 32C36 28 40 18 50 18"
          stroke="#0d9488"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Central node */}
        <circle cx="32" cy="32" r="5" fill="#5eead4" />
        <circle cx="32" cy="32" r="2" fill="#0f172a" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowFintechOrbital({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="1.5" />
        {/* Orbital ellipses */}
        <ellipse
          cx="32"
          cy="32"
          rx="24"
          ry="10"
          stroke="#0d9488"
          strokeWidth="2"
          fill="none"
          transform="rotate(-30 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="24"
          ry="10"
          stroke="#14b8a6"
          strokeWidth="2"
          fill="none"
          transform="rotate(30 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="24"
          ry="10"
          stroke="#2dd4bf"
          strokeWidth="2"
          fill="none"
          transform="rotate(90 32 32)"
        />
        {/* Core */}
        <circle cx="32" cy="32" r="6" fill="#0f172a" />
        <circle cx="32" cy="32" r="3" fill="#14b8a6" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowMetaLayers({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a" />
        {/* Meta abstraction layers with flow */}
        <rect x="12" y="42" width="40" height="6" rx="2" fill="#0d9488" opacity="0.4" />
        <rect x="16" y="34" width="32" height="6" rx="2" fill="#14b8a6" opacity="0.6" />
        <rect x="20" y="26" width="24" height="6" rx="2" fill="#2dd4bf" opacity="0.8" />
        <rect x="24" y="18" width="16" height="6" rx="2" fill="#5eead4" />
        {/* Flow arrows connecting layers */}
        <path d="M32 48L32 44" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 40L32 32" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 32L32 24" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
        <path d="M29 15L32 12L35 15" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowInfraNetwork({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
        {/* Infrastructure nodes */}
        <circle cx="32" cy="16" r="5" fill="#0f172a" />
        <circle cx="16" cy="40" r="5" fill="#0f172a" />
        <circle cx="48" cy="40" r="5" fill="#0f172a" />
        {/* Central meta hub */}
        <circle cx="32" cy="32" r="8" fill="#0d9488" />
        <circle cx="32" cy="32" r="4" fill="#5eead4" />
        {/* Flow connections */}
        <path d="M32 21L32 24" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 38L26 35" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M44 38L38 35" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
        {/* Flowing data indicators */}
        <circle cx="32" cy="22" r="1.5" fill="#5eead4" />
        <circle cx="23" cy="36" r="1.5" fill="#5eead4" />
        <circle cx="41" cy="36" r="1.5" fill="#5eead4" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowMetaOrchestrator({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a" />
        {/* Outer infrastructure ring */}
        <circle cx="32" cy="32" r="22" stroke="#0d9488" strokeWidth="2" fill="none" strokeDasharray="4 4" />
        {/* Meta layer ring */}
        <circle cx="32" cy="32" r="14" stroke="#14b8a6" strokeWidth="2.5" fill="none" />
        {/* Orchestration flows */}
        <path d="M32 10L32 18" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 46L32 54" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 32L18 32" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 32L54 32" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
        {/* Flow arrows */}
        <path d="M29 15L32 18L35 15" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 49L32 46L35 49" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 29L18 32L15 35" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M49 29L46 32L49 35" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Central intelligence */}
        <circle cx="32" cy="32" r="6" fill="#2dd4bf" />
        <circle cx="32" cy="32" r="3" fill="#0f172a" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowInfraPipeline({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        {/* Infrastructure pipeline backbone */}
        <path d="M12 32H52" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        {/* Meta processing nodes */}
        <rect x="18" y="26" width="12" height="12" rx="3" fill="#0d9488" />
        <rect x="34" y="26" width="12" height="12" rx="3" fill="#14b8a6" />
        {/* Flow indicators */}
        <path d="M14 32L18 32" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 32L34 32" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" />
        <path d="M46 32L50 32" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" />
        {/* Direction arrows */}
        <path d="M48 29L52 32L48 35" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Node internals */}
        <circle cx="24" cy="32" r="2" fill="#5eead4" />
        <circle cx="40" cy="32" r="2" fill="#5eead4" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowMetaVortex({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a" />
        {/* Meta vortex with infrastructure nodes */}
        <path
          d="M32 8C44 8 52 16 52 28C52 36 46 42 38 42C32 42 28 38 28 32C28 28 32 26 36 28"
          stroke="#0d9488"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M32 56C20 56 12 48 12 36C12 28 18 22 26 22C32 22 36 26 36 32C36 36 32 38 28 36"
          stroke="#14b8a6"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Infrastructure anchor points */}
        <circle cx="32" cy="8" r="3" fill="#5eead4" />
        <circle cx="32" cy="56" r="3" fill="#5eead4" />
        {/* Central meta core */}
        <circle cx="32" cy="32" r="5" fill="#2dd4bf" />
        <circle cx="32" cy="32" r="2" fill="#0f172a" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowInfraStack({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />

        {/* Bottom layer - animates first */}
        <path
          d="M16 42L32 50L48 42"
          stroke="#0d9488"
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
          stroke="#14b8a6"
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
          stroke="#2dd4bf"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>

        {/* Meta top layer with pulse */}
        <path d="M16 18L32 26L48 18L32 10Z" fill="#5eead4">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

// Blue variant
export function NexFlowInfraStackBlue({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        <path
          d="M16 42L32 50L48 42"
          stroke="#1e40af"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </path>
        <path
          d="M16 34L32 42L48 34"
          stroke="#2563eb"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </path>
        <path
          d="M16 26L32 34L48 26"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>
        <path d="M16 18L32 26L48 18L32 10Z" fill="#60a5fa">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-blue-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

// Indigo/Violet variant
export function NexFlowInfraStackIndigo({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        <path
          d="M16 42L32 50L48 42"
          stroke="#4338ca"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </path>
        <path
          d="M16 34L32 42L48 34"
          stroke="#6366f1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </path>
        <path
          d="M16 26L32 34L48 26"
          stroke="#818cf8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>
        <path d="M16 18L32 26L48 18L32 10Z" fill="#a5b4fc">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-indigo-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

// Emerald/Green variant
export function NexFlowInfraStackEmerald({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        <path
          d="M16 42L32 50L48 42"
          stroke="#047857"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </path>
        <path
          d="M16 34L32 42L48 34"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </path>
        <path
          d="M16 26L32 34L48 26"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>
        <path d="M16 18L32 26L48 18L32 10Z" fill="#6ee7b7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-emerald-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

// Amber/Gold variant
export function NexFlowInfraStackAmber({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        <path
          d="M16 42L32 50L48 42"
          stroke="#b45309"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </path>
        <path
          d="M16 34L32 42L48 34"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </path>
        <path
          d="M16 26L32 34L48 26"
          stroke="#fbbf24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>
        <path d="M16 18L32 26L48 18L32 10Z" fill="#fcd34d">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-amber-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

// Rose/Pink variant
export function NexFlowInfraStackRose({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        <path
          d="M16 42L32 50L48 42"
          stroke="#be123c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </path>
        <path
          d="M16 34L32 42L48 34"
          stroke="#e11d48"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </path>
        <path
          d="M16 26L32 34L48 26"
          stroke="#fb7185"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>
        <path d="M16 18L32 26L48 18L32 10Z" fill="#fda4af">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-rose-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

// Slate/Monochrome variant
export function NexFlowInfraStackSlate({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#0f172a" />
        <path
          d="M16 42L32 50L48 42"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </path>
        <path
          d="M16 34L32 42L48 34"
          stroke="#64748b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </path>
        <path
          d="M16 26L32 34L48 26"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.2s" />
          <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </path>
        <path d="M16 18L32 26L48 18L32 10Z" fill="#cbd5e1">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0s" />
        </path>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-slate-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowMetaHub({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="14" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
        {/* Infrastructure endpoints */}
        <circle cx="14" cy="14" r="4" fill="#0f172a" />
        <circle cx="50" cy="14" r="4" fill="#0f172a" />
        <circle cx="14" cy="50" r="4" fill="#0f172a" />
        <circle cx="50" cy="50" r="4" fill="#0f172a" />
        {/* Meta hub center */}
        <circle cx="32" cy="32" r="10" fill="#0d9488" />
        <circle cx="32" cy="32" r="5" fill="#5eead4" />
        {/* Flow connections with curves */}
        <path d="M18 18C24 24 24 24 26 28" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 18C40 24 40 24 38 28" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 46C24 40 24 40 26 36" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 46C40 40 40 40 38 36" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
        {/* Flow pulses */}
        <circle cx="22" cy="22" r="1.5" fill="#5eead4" />
        <circle cx="42" cy="22" r="1.5" fill="#5eead4" />
        <circle cx="22" cy="42" r="1.5" fill="#5eead4" />
        <circle cx="42" cy="42" r="1.5" fill="#5eead4" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowMetaFlow({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="60" height="60" rx="12" fill="#0f172a" />
        {/* Multi-layer flowing N shape representing meta facilitation */}
        {/* Back layer - infrastructure */}
        <path
          d="M16 48V16L32 32L48 16V48"
          stroke="#0d9488"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
        />
        {/* Mid layer - abstraction */}
        <path
          d="M18 46V18L32 32L46 18V46"
          stroke="#14b8a6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.7"
        />
        {/* Front layer - flow */}
        <path
          d="M20 44V20L32 32L44 20V44"
          stroke="#5eead4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Central nexus point */}
        <circle cx="32" cy="32" r="4" fill="#5eead4" />
        <circle cx="32" cy="32" r="2" fill="#0f172a" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Nex<span className="text-teal-600">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}
