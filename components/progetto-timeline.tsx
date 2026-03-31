"use client"

import { useState } from "react"
import { Check, Clock, Circle, TrendingUp } from "lucide-react"

interface Milestone {
  text: string
  status: "completed" | "inProgress" | "future"
}

interface Phase {
  id: string
  name: string
  subtitle: string
  period: string
  months: number[]
  progress: number
  milestones: Milestone[]
}

const phases: Phase[] = [
  {
    id: "1",
    name: "Fase 1",
    subtitle: "Fondazione",
    period: "Gen — Mar",
    months: [0, 1, 2],
    progress: 85,
    milestones: [
      { text: "Piattaforma operativa live", status: "completed" },
      { text: "15 agenti configurati", status: "completed" },
      { text: "Integrazioni Buffer+Beehiiv+Resend", status: "completed" },
      { text: "6 eventi completati", status: "completed" },
      { text: "200 iscritti newsletter (142/200)", status: "inProgress" },
    ],
  },
  {
    id: "2",
    name: "Fase 2",
    subtitle: "Crescita",
    period: "Apr — Giu",
    months: [3, 4, 5],
    progress: 15,
    milestones: [
      { text: "Piano editoriale attivo", status: "inProgress" },
      { text: "500 contatti qualificati (38/500)", status: "inProgress" },
      { text: "10 partnership attive (2/10)", status: "inProgress" },
      { text: "3 workshop a pagamento", status: "future" },
      { text: "Primo prodotto formativo", status: "future" },
    ],
  },
  {
    id: "3",
    name: "Fase 3",
    subtitle: "Scaling",
    period: "Lug — Set",
    months: [6, 7, 8],
    progress: 0,
    milestones: [
      { text: "Segmentazione verticale", status: "future" },
      { text: "Referral program", status: "future" },
      { text: "Espansione Svizzera tedesca", status: "future" },
      { text: "Events-as-a-Service", status: "future" },
    ],
  },
  {
    id: "4",
    name: "Fase 4",
    subtitle: "Maturita",
    period: "Ott — Dic",
    months: [9, 10, 11],
    progress: 0,
    milestones: [
      { text: "Prodotto formativo scalabile", status: "future" },
      { text: "Network auto-generativo", status: "future" },
      { text: "Revenue target CHF 8K/mese", status: "future" },
    ],
  },
]

const milestoneTargets = [
  {
    title: "200 iscritti newsletter",
    current: 142,
    target: 200,
    unlocks: "Content marketing come canale primario",
    estimate: "~4 settimane al ritmo attuale",
    velocity: "+12/settimana",
  },
  {
    title: "20 eventi completati",
    current: 6,
    target: 20,
    unlocks: "Social proof corporate",
    estimate: "~6 mesi",
    velocity: "+1.5/mese",
  },
  {
    title: "10 partnership attive",
    current: 2,
    target: 10,
    unlocks: "Network effect tra partner",
    estimate: "~4 mesi",
    velocity: "+2/mese",
  },
]

const months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
const currentMonth = 3 // Aprile (0-indexed)

export function ProgettoTimeline() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null)

  const getPhaseStyle = (phase: Phase) => {
    const isActive = phase.months.includes(currentMonth)
    const isFuture = phase.months[0] > currentMonth
    const isCompleted = phase.months[phase.months.length - 1] < currentMonth

    if (isCompleted || (isActive && phase.progress > 0)) {
      return {
        backgroundColor: "#2563EB",
        opacity: isActive ? 1 : 0.8,
      }
    }
    if (isActive) {
      return {
        backgroundColor: "#2563EB",
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 10px)",
      }
    }
    return {
      backgroundColor: "#E5E7EB",
      opacity: 0.6,
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
          Progetto HumanAImpact — Piano Anno 1
        </h1>
        <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
          Gennaio 2026 → Dicembre 2026 &middot; Fase 1 all&apos;85% &middot; Fase 2 in avvio
        </p>
      </div>

      {/* Timeline Gantt */}
      <div className="mb-8">
        {/* Phase bars */}
        <div className="relative mb-2 h-[50px]">
          {phases.map((phase) => {
            const startPercent = (phase.months[0] / 12) * 100
            const widthPercent = (phase.months.length / 12) * 100
            const style = getPhaseStyle(phase)

            return (
              <div
                key={phase.id}
                className="absolute top-0 flex h-full cursor-pointer items-center justify-center rounded-lg transition-all"
                style={{
                  left: `${startPercent}%`,
                  width: `calc(${widthPercent}% - 4px)`,
                  ...style,
                }}
                onMouseEnter={() => setHoveredPhase(phase.id)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                <span className="text-[12px] font-semibold text-white">
                  {phase.name} {phase.progress > 0 && `(${phase.progress}%)`}
                </span>
              </div>
            )
          })}

          {/* Today indicator */}
          <div
            className="absolute top-0 h-full w-[2px]"
            style={{
              left: `${((currentMonth + 0.2) / 12) * 100}%`,
              background: "repeating-linear-gradient(to bottom, #DC2626 0, #DC2626 5px, transparent 5px, transparent 10px)",
            }}
          >
            <span
              className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white"
            >
              OGGI
            </span>
          </div>
        </div>

        {/* Month labels */}
        <div className="flex">
          {months.map((month, index) => (
            <div
              key={month}
              className="flex-1 text-center text-[11px]"
              style={{
                color: index === currentMonth ? "#DC2626" : "#9CA3AF",
                fontWeight: index === currentMonth ? 600 : 400,
              }}
            >
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Phase cards */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        {phases.map((phase) => {
          const isActive = phase.months.includes(currentMonth)
          const isFuture = phase.months[0] > currentMonth

          return (
            <div
              key={phase.id}
              className="rounded-xl border p-4 transition-all"
              style={{
                borderColor: isActive ? "#2563EB" : "#E5E7EB",
                borderWidth: isActive ? "2px" : "1px",
                opacity: isFuture ? 0.5 : 1,
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-bold" style={{ color: "#1B2B4B" }}>
                    {phase.name} — {phase.subtitle}
                  </h3>
                  <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                    {phase.period}
                  </p>
                </div>
                {phase.progress > 0 && (
                  <span
                    className="text-[20px] font-bold"
                    style={{ color: phase.progress >= 80 ? "#16A34A" : "#2563EB" }}
                  >
                    {phase.progress}%
                  </span>
                )}
              </div>

              {phase.progress > 0 && (
                <div
                  className="mb-3 h-2 overflow-hidden rounded-full"
                  style={{ backgroundColor: "#E5E7EB" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${phase.progress}%`,
                      backgroundColor: phase.progress >= 80 ? "#16A34A" : "#2563EB",
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                {phase.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {milestone.status === "completed" ? (
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "#16A34A" }} />
                    ) : milestone.status === "inProgress" ? (
                      <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "#F59E0B" }} />
                    ) : (
                      <Circle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "#D1D5DB" }} />
                    )}
                    <span
                      className="text-[12px]"
                      style={{
                        color:
                          milestone.status === "completed"
                            ? "#16A34A"
                            : milestone.status === "inProgress"
                            ? "#F59E0B"
                            : "#9CA3AF",
                      }}
                    >
                      {milestone.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Prossimi traguardi */}
      <div>
        <h2
          className="mb-4 text-[12px] font-semibold uppercase tracking-wider"
          style={{ color: "#7C8CA2" }}
        >
          Prossimi traguardi
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {milestoneTargets.map((target, idx) => {
            const percent = Math.round((target.current / target.target) * 100)

            return (
              <div
                key={idx}
                className="rounded-xl border p-4"
                style={{ borderColor: "#E5E7EB" }}
              >
                <h3 className="mb-2 text-[14px] font-bold" style={{ color: "#1B2B4B" }}>
                  {target.title}
                </h3>

                <div className="mb-2 flex items-center gap-2">
                  <div
                    className="h-2 flex-1 overflow-hidden rounded-full"
                    style={{ backgroundColor: "#E5E7EB" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: percent >= 70 ? "#16A34A" : "#2563EB",
                      }}
                    />
                  </div>
                  <span className="text-[13px] font-semibold" style={{ color: "#1B2B4B" }}>
                    {target.current}/{target.target} ({percent}%)
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-medium" style={{ color: "#16A34A" }}>
                      Sblocca:
                    </span>
                    <span className="text-[12px]" style={{ color: "#374151" }}>
                      {target.unlocks}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      Stima:
                    </span>
                    <span className="text-[12px]" style={{ color: "#374151" }}>
                      {target.estimate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3" style={{ color: "#16A34A" }} />
                    <span className="text-[12px]" style={{ color: "#374151" }}>
                      {target.velocity}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
