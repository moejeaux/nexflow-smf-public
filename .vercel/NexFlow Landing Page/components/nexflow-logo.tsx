interface NexFlowLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function NexFlowLogoEmergence({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="emergence-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="emergence-grad-2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow-emergence">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Abstract N formed from flowing lines */}
        <path
          d="M16 52V12"
          stroke="url(#emergence-grad-1)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow-emergence)"
        />
        <path
          d="M16 12L48 52"
          stroke="url(#emergence-grad-1)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow-emergence)"
        />
        <path
          d="M48 52V12"
          stroke="url(#emergence-grad-2)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow-emergence)"
        />
        {/* Energy particles */}
        <circle cx="16" cy="32" r="2" fill="#06b6d4" opacity="0.8" />
        <circle cx="32" cy="32" r="2.5" fill="#8b5cf6" opacity="0.9" />
        <circle cx="48" cy="32" r="2" fill="#f43f5e" opacity="0.8" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoMobius({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mobius-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="33%" stopColor="#3b82f6" />
            <stop offset="66%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow-mobius">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Twisted infinity/möbius strip */}
        <path
          d="M8 32C8 20 18 14 28 22C38 30 42 30 52 22C62 14 56 44 46 42C36 40 32 48 22 42C12 36 8 44 8 32Z"
          stroke="url(#mobius-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-mobius)"
        />
        {/* Crossing flow line */}
        <path
          d="M22 28C32 20 32 44 42 36"
          stroke="url(#mobius-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoQuantum({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="quantum-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="quantum-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow-quantum">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Orbital rings representing quantum states */}
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          stroke="url(#quantum-grad-1)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#glow-quantum)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          stroke="url(#quantum-grad-2)"
          strokeWidth="2.5"
          fill="none"
          transform="rotate(60 32 32)"
          filter="url(#glow-quantum)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          stroke="url(#quantum-grad-1)"
          strokeWidth="2.5"
          fill="none"
          transform="rotate(120 32 32)"
          filter="url(#glow-quantum)"
          opacity="0.7"
        />
        {/* Central nucleus */}
        <circle cx="32" cy="32" r="5" fill="url(#quantum-grad-2)" filter="url(#glow-quantum)" />
        <circle cx="32" cy="32" r="2" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoPulse({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pulse-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow-pulse">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Main pulse wave */}
        <path
          d="M4 32H16L22 12L32 52L42 20L48 32H60"
          stroke="url(#pulse-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow-pulse)"
        />
        {/* Secondary echo wave */}
        <path
          d="M4 32H16L22 18L32 46L42 24L48 32H60"
          stroke="url(#pulse-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoHelix({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="helix-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="helix-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow-helix">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* First helix strand */}
        <path
          d="M20 8C36 16 36 24 20 32C36 40 36 48 20 56"
          stroke="url(#helix-grad-1)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-helix)"
        />
        {/* Second helix strand */}
        <path
          d="M44 8C28 16 28 24 44 32C28 40 28 48 44 56"
          stroke="url(#helix-grad-2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-helix)"
        />
        {/* Connecting rungs */}
        <line x1="24" y1="20" x2="40" y2="20" stroke="white" strokeWidth="2" opacity="0.5" />
        <line x1="24" y1="32" x2="40" y2="32" stroke="white" strokeWidth="2" opacity="0.7" />
        <line x1="24" y1="44" x2="40" y2="44" stroke="white" strokeWidth="2" opacity="0.5" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoNexus({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nexus-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="nexus-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <radialGradient id="nexus-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="#3b82f6" />
          </radialGradient>
          <filter id="glow-nexus">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Converging flow streams */}
        <path
          d="M8 8Q20 20 32 32"
          stroke="url(#nexus-grad-1)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-nexus)"
        />
        <path
          d="M56 8Q44 20 32 32"
          stroke="url(#nexus-grad-2)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-nexus)"
        />
        <path
          d="M8 56Q20 44 32 32"
          stroke="url(#nexus-grad-2)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-nexus)"
        />
        <path
          d="M56 56Q44 44 32 32"
          stroke="url(#nexus-grad-1)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-nexus)"
        />
        {/* Emanating streams */}
        <path d="M32 32L32 4" stroke="url(#nexus-grad-1)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M32 32L32 60" stroke="url(#nexus-grad-2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M32 32L4 32" stroke="url(#nexus-grad-2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M32 32L60 32" stroke="url(#nexus-grad-1)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        {/* Central nexus point */}
        <circle cx="32" cy="32" r="8" fill="url(#nexus-center)" filter="url(#glow-nexus)" />
        <circle cx="32" cy="32" r="3" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoSingularity({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="singularity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow-singularity">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Gravitational lensing effect - space warping around a point */}
        <ellipse
          cx="32"
          cy="32"
          rx="28"
          ry="8"
          stroke="url(#singularity-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-singularity)"
          opacity="0.4"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="24"
          ry="14"
          stroke="url(#singularity-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-singularity)"
          opacity="0.6"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="18"
          ry="20"
          stroke="url(#singularity-grad)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#glow-singularity)"
          opacity="0.8"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="10"
          ry="26"
          stroke="url(#singularity-grad)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow-singularity)"
        />
        {/* Event horizon center */}
        <circle cx="32" cy="32" r="4" fill="url(#singularity-grad)" filter="url(#glow-singularity)" />
        <circle cx="32" cy="32" r="1.5" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoTesseract({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tesseract-grad-1" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="tesseract-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="tesseract-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="tesseract-grad-4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="tesseract-grad-5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="tesseract-grad-6" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="tesseract-face" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="glow-tesseract">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* White light entering */}
        <line
          x1="4"
          y1="32"
          x2="22"
          y2="32"
          stroke="url(#tesseract-grad-1)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-tesseract)"
        />
        {/* Triangular prism */}
        <polygon points="24,12 24,52 44,32" fill="url(#tesseract-face)" stroke="#3b82f6" strokeWidth="1.5" />
        {/* Rainbow spectrum output */}
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="16"
          stroke="url(#tesseract-grad-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-tesseract)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="24"
          stroke="url(#tesseract-grad-3)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-tesseract)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="32"
          stroke="url(#tesseract-grad-4)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-tesseract)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="40"
          stroke="url(#tesseract-grad-5)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-tesseract)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="48"
          stroke="url(#tesseract-grad-6)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-tesseract)"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoAurora({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aurora-grad-1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="aurora-grad-2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="aurora-grad-3" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow-aurora">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Northern lights flowing curtains */}
        <path
          d="M8 56C12 40 16 20 20 8C24 20 28 40 32 56C36 36 40 16 44 8C48 24 52 44 56 56"
          stroke="url(#aurora-grad-1)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-aurora)"
        />
        <path
          d="M12 56C16 44 20 28 24 16C28 28 32 44 36 56"
          stroke="url(#aurora-grad-2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-aurora)"
          opacity="0.7"
        />
        <path
          d="M36 56C40 40 44 24 48 12C52 28 54 44 56 56"
          stroke="url(#aurora-grad-3)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-aurora)"
          opacity="0.6"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoWormhole({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wormhole-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <radialGradient id="wormhole-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-wormhole">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Concentric rings creating depth illusion */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="url(#wormhole-grad)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow-wormhole)"
          opacity="0.3"
        />
        <circle
          cx="32"
          cy="32"
          r="23"
          stroke="url(#wormhole-grad)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow-wormhole)"
          opacity="0.4"
        />
        <circle
          cx="32"
          cy="32"
          r="18"
          stroke="url(#wormhole-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-wormhole)"
          opacity="0.5"
        />
        <circle
          cx="32"
          cy="32"
          r="13"
          stroke="url(#wormhole-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-wormhole)"
          opacity="0.7"
        />
        <circle
          cx="32"
          cy="32"
          r="8"
          stroke="url(#wormhole-grad)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#glow-wormhole)"
          opacity="0.9"
        />
        {/* Flow arrow entering wormhole */}
        <path
          d="M4 32L18 32M12 26L18 32L12 38"
          stroke="url(#wormhole-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow-wormhole)"
        />
        {/* Exit on other side */}
        <path
          d="M46 32L60 32M54 26L60 32L54 38"
          stroke="url(#wormhole-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow-wormhole)"
        />
        {/* Center portal */}
        <circle cx="32" cy="32" r="3" fill="url(#wormhole-center)" filter="url(#glow-wormhole)" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoTornado({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tornado-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow-tornado">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Spinning vortex widening at top */}
        <path
          d="M8 8C20 12 44 12 56 8"
          stroke="url(#tornado-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-tornado)"
        />
        <path
          d="M12 18C22 22 42 22 52 18"
          stroke="url(#tornado-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-tornado)"
          opacity="0.9"
        />
        <path
          d="M16 28C24 32 40 32 48 28"
          stroke="url(#tornado-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-tornado)"
          opacity="0.8"
        />
        <path
          d="M22 38C28 41 36 41 42 38"
          stroke="url(#tornado-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-tornado)"
          opacity="0.7"
        />
        <path
          d="M26 48C30 50 34 50 38 48"
          stroke="url(#tornado-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-tornado)"
          opacity="0.6"
        />
        <path
          d="M30 56C31 57 33 57 34 56"
          stroke="url(#tornado-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-tornado)"
          opacity="0.5"
        />
        {/* Focus point at base */}
        <circle cx="32" cy="58" r="2" fill="url(#tornado-grad)" filter="url(#glow-tornado)" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoPrism({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="prism-in" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="prism-out-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="prism-out-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="prism-out-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="prism-out-4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="prism-out-5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="prism-face" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="glow-prism">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* White light entering */}
        <line
          x1="4"
          y1="32"
          x2="22"
          y2="32"
          stroke="url(#prism-in)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-prism)"
        />
        {/* Triangular prism */}
        <polygon points="24,12 24,52 44,32" fill="url(#prism-face)" stroke="#3b82f6" strokeWidth="1.5" />
        {/* Rainbow spectrum output */}
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="16"
          stroke="url(#prism-out-1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-prism)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="24"
          stroke="url(#prism-out-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-prism)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="32"
          stroke="url(#prism-out-3)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-prism)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="40"
          stroke="url(#prism-out-4)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-prism)"
        />
        <line
          x1="44"
          y1="32"
          x2="60"
          y2="48"
          stroke="url(#prism-out-5)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-prism)"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoVortexSpiral({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vortex-spiral-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow-vortex-spiral">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Logarithmic spiral vortex */}
        <path
          d="M32 32 Q56 32 52 16 Q48 4 32 8 Q16 12 12 28 Q8 44 24 52 Q40 60 52 48 Q60 36 48 24 Q36 16 28 28 Q24 36 32 40 Q40 44 44 36 Q46 30 38 28 Q32 28 32 32"
          stroke="url(#vortex-spiral-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-spiral)"
        />
        <circle cx="32" cy="32" r="3" fill="url(#vortex-spiral-grad)" filter="url(#glow-vortex-spiral)" />
        <circle cx="32" cy="32" r="1" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoVortexTriple({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vortex-triple-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="vortex-triple-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="vortex-triple-grad-3" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow-vortex-triple">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Three curved arms spiraling inward */}
        <path
          d="M32 4 Q60 20 44 44 Q36 56 32 32"
          stroke="url(#vortex-triple-grad-1)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-triple)"
        />
        <path
          d="M8 52 Q8 20 32 12 Q48 8 32 32"
          stroke="url(#vortex-triple-grad-2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-triple)"
        />
        <path
          d="M56 52 Q32 64 16 44 Q8 32 32 32"
          stroke="url(#vortex-triple-grad-3)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-triple)"
        />
        <circle cx="32" cy="32" r="4" fill="white" />
        <circle cx="32" cy="32" r="2" fill="#3b82f6" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoVortexWave({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vortex-wave-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="33%" stopColor="#3b82f6" />
            <stop offset="66%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow-vortex-wave">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Flowing S-curve vortex */}
        <path
          d="M8 48 Q8 32 20 24 Q32 16 32 32 Q32 48 44 40 Q56 32 56 16"
          stroke="url(#vortex-wave-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-wave)"
        />
        {/* Secondary echo */}
        <path
          d="M12 52 Q12 36 24 28 Q36 20 36 36 Q36 52 48 44 Q60 36 60 20"
          stroke="url(#vortex-wave-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        {/* Flow dots */}
        <circle cx="8" cy="48" r="2.5" fill="#06b6d4" filter="url(#glow-vortex-wave)" />
        <circle cx="56" cy="16" r="2.5" fill="#ec4899" filter="url(#glow-vortex-wave)" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoVortexFunnel({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vortex-funnel-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow-vortex-funnel">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Wide ellipse at top */}
        <ellipse
          cx="32"
          cy="10"
          rx="26"
          ry="6"
          stroke="url(#vortex-funnel-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-vortex-funnel)"
          opacity="0.5"
        />
        {/* Converging funnel lines */}
        <path
          d="M6 10 Q10 32 32 56"
          stroke="url(#vortex-funnel-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-funnel)"
        />
        <path
          d="M58 10 Q54 32 32 56"
          stroke="url(#vortex-funnel-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-funnel)"
        />
        {/* Interior spiral lines */}
        <path
          d="M18 14 Q22 28 32 48"
          stroke="url(#vortex-funnel-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M46 14 Q42 28 32 48"
          stroke="url(#vortex-funnel-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* Focal point */}
        <circle cx="32" cy="56" r="4" fill="url(#vortex-funnel-grad)" filter="url(#glow-vortex-funnel)" />
        <circle cx="32" cy="56" r="1.5" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoVortexBlades({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vortex-blades-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow-vortex-blades">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Four curved blades creating rotation */}
        <path
          d="M32 32 Q32 8 52 12"
          stroke="url(#vortex-blades-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-blades)"
        />
        <path
          d="M32 32 Q56 32 52 52"
          stroke="url(#vortex-blades-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-blades)"
        />
        <path
          d="M32 32 Q32 56 12 52"
          stroke="url(#vortex-blades-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-blades)"
        />
        <path
          d="M32 32 Q8 32 12 12"
          stroke="url(#vortex-blades-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-blades)"
        />
        {/* Center hub */}
        <circle cx="32" cy="32" r="6" fill="url(#vortex-blades-grad)" filter="url(#glow-vortex-blades)" />
        <circle cx="32" cy="32" r="2.5" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export function NexFlowLogoVortexCyclone({ size = 48, showText = true, className = "" }: NexFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vortex-cyclone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow-vortex-cyclone">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Cyclone eye wall */}
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke="url(#vortex-cyclone-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-vortex-cyclone)"
          opacity="0.3"
        />
        {/* Spiral arms */}
        <path
          d="M32 6 Q58 6 58 32 Q58 50 40 54 Q28 56 28 44 Q28 36 36 36"
          stroke="url(#vortex-cyclone-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-cyclone)"
        />
        <path
          d="M32 58 Q6 58 6 32 Q6 14 24 10 Q36 8 36 20 Q36 28 28 28"
          stroke="url(#vortex-cyclone-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-vortex-cyclone)"
        />
        {/* Eye of the storm */}
        <circle cx="32" cy="32" r="5" fill="url(#vortex-cyclone-grad)" filter="url(#glow-vortex-cyclone)" />
        <circle cx="32" cy="32" r="2" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Smart Meta-Facilitator
          </span>
        </div>
      )}
    </div>
  )
}

export { NexFlowLogoEmergence as NexFlowLogo }
