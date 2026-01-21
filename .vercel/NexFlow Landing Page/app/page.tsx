import {
  NexFlowInfraStackLogo,
  NexFlowInfraStackLogoStatic,
  NexFlowInfraStackIcon,
  colorSchemes,
} from "@/components/nexflow-infra-stack-logo"

const colors = Object.keys(colorSchemes) as Array<keyof typeof colorSchemes>

export default function LogoShowcase() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">NexFlow Infra Stack Logo Kit</h1>
          <p className="text-slate-500">Complete set for each color variant</p>
        </div>

        {/* Each color gets its own section with all variants */}
        {colors.map((color) => (
          <div key={color} className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Color header */}
            <div className="px-8 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-900 capitalize">{colorSchemes[color].name}</h2>
            </div>

            <div className="p-8">
              {/* Row 1: Animated logos - light and dark */}
              <div className="mb-8">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Animated (with text)</p>
                <div className="flex flex-wrap gap-8 items-center">
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <NexFlowInfraStackLogo color={color} variant="light" size={56} />
                  </div>
                  <div className="bg-slate-900 rounded-xl p-6">
                    <NexFlowInfraStackLogo color={color} variant="dark" size={56} />
                  </div>
                </div>
              </div>

              {/* Row 2: Static icons - multiple sizes */}
              <div className="mb-8">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
                  Static (icon only, various sizes)
                </p>
                <div className="flex flex-wrap gap-6 items-end">
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="dark" size={24} />
                    </div>
                    <span className="text-xs text-slate-400">24px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="dark" size={32} />
                    </div>
                    <span className="text-xs text-slate-400">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="dark" size={48} />
                    </div>
                    <span className="text-xs text-slate-400">48px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="dark" size={64} />
                    </div>
                    <span className="text-xs text-slate-400">64px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="dark" size={96} />
                    </div>
                    <span className="text-xs text-slate-400">96px</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Light background static */}
              <div className="mb-8">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
                  Light variant (static)
                </p>
                <div className="flex flex-wrap gap-6 items-end">
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white border border-slate-200 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="light" size={32} />
                    </div>
                    <span className="text-xs text-slate-400">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white border border-slate-200 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="light" size={48} />
                    </div>
                    <span className="text-xs text-slate-400">48px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white border border-slate-200 rounded-lg p-3">
                      <NexFlowInfraStackLogoStatic color={color} variant="light" size={64} />
                    </div>
                    <span className="text-xs text-slate-400">64px</span>
                  </div>
                </div>
              </div>

              {/* Row 4: Raw icon (no background) */}
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
                  Raw Icon (no background)
                </p>
                <div className="flex flex-wrap gap-6 items-end">
                  <div className="flex flex-col items-center gap-2">
                    <NexFlowInfraStackIcon color={color} size={32} />
                    <span className="text-xs text-slate-400">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <NexFlowInfraStackIcon color={color} size={48} />
                    <span className="text-xs text-slate-400">48px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <NexFlowInfraStackIcon color={color} size={64} />
                    <span className="text-xs text-slate-400">64px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Usage example */}
        <div className="bg-slate-900 text-white rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-4">Usage</h2>
          <pre className="text-sm text-slate-300 overflow-x-auto">
            {`import { NexFlowInfraStackLogo, NexFlowInfraStackLogoStatic, NexFlowInfraStackIcon } from "@/components/nexflow-infra-stack-logo"

// Animated with text (for headers, marketing)
<NexFlowInfraStackLogo color="teal" variant="dark" size={56} />

// Static (for favicons, app icons)
<NexFlowInfraStackLogoStatic color="blue" variant="light" size={32} />

// Raw icon (for custom backgrounds)
<NexFlowInfraStackIcon color="emerald" size={48} />

// Available colors: teal, blue, indigo, emerald, amber, rose, slate`}
          </pre>
        </div>
      </div>
    </div>
  )
}
