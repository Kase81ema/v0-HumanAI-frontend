"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Play, Power } from "lucide-react"

interface AgentOutput {
  icon: string
  title: string
  destination: string
  destinationId: string
  time: string
}

interface Agent {
  id: string
  name: string
  initials: string
  active: boolean
  lastWork: string
  score: number
  outputs: AgentOutput[]
  metrics: { label: string; value: string }[]
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Copywriter",
    initials: "CW",
    active: true,
    lastWork: "3 post generati stanotte",
    score: 92,
    outputs: [
      { icon: "📝", title: "Post R1: Come cambierà il mio lavoro con l'AI?", destination: "Content Factory", destinationId: "content", time: "stanotte 02:15" },
      { icon: "📝", title: "Post EN Leadership AI patterns", destination: "Content Factory", destinationId: "content", time: "stanotte 02:18" },
      { icon: "📰", title: "Newsletter sett.14 AI & Persone", destination: "Content Factory", destinationId: "content", time: "ieri 23:45" },
    ],
    metrics: [
      { label: "Tasso approvazione", value: "85%" },
      { label: "Engagement medio", value: "3.2%" },
    ],
  },
  {
    id: "2",
    name: "Planner",
    initials: "PL",
    active: true,
    lastWork: "Piano sett.15 generato",
    score: 88,
    outputs: [
      { icon: "📋", title: "Piano editoriale sett.15", destination: "Piano editoriale", destinationId: "editorial", time: "ieri 20:00" },
    ],
    metrics: [
      { label: "Piani generati", value: "14" },
      { label: "Slot riempiti", value: "89%" },
    ],
  },
  {
    id: "3",
    name: "Strategist",
    initials: "ST",
    active: true,
    lastWork: "Briefing mattutino con 4 azioni",
    score: 95,
    outputs: [
      { icon: "⚠️", title: "Briefing workshop critico", destination: "Centro di Comando", destinationId: "command", time: "oggi 08:00" },
      { icon: "📊", title: "Analisi trend Q1 completata", destination: "Centro di Comando", destinationId: "command", time: "ieri 18:30" },
    ],
    metrics: [
      { label: "Azioni suggerite", value: "45" },
      { label: "Azioni completate", value: "82%" },
    ],
  },
  {
    id: "4",
    name: "Funnel",
    initials: "FN",
    active: true,
    lastWork: "4 sequenze avanzate, 1 escalation",
    score: 78,
    outputs: [
      { icon: "✉️", title: "FN2 Step 3 inviato a Claudia B.", destination: "CRM", destinationId: "crm", time: "oggi 09:00" },
      { icon: "⚠️", title: "Lead escalation Claudia B.", destination: "CRM", destinationId: "crm", time: "oggi 09:05" },
    ],
    metrics: [
      { label: "Sequenze attive", value: "12" },
      { label: "Open rate medio", value: "34%" },
    ],
  },
  {
    id: "5",
    name: "Sales",
    initials: "SA",
    active: true,
    lastWork: "Intelligence brief Sara Müller",
    score: 85,
    outputs: [
      { icon: "📋", title: "Brief pre-call Sara Müller", destination: "CRM", destinationId: "crm", time: "oggi 07:30" },
    ],
    metrics: [
      { label: "Brief generati", value: "8" },
      { label: "Conversion rate", value: "25%" },
    ],
  },
  {
    id: "6",
    name: "Scout",
    initials: "SC",
    active: true,
    lastWork: "2 segnali L4 identificati",
    score: 70,
    outputs: [
      { icon: "🔍", title: "Segnale AI regulation EU", destination: "Centro di Comando", destinationId: "command", time: "oggi 06:00" },
    ],
    metrics: [
      { label: "Segnali questa sett.", value: "8" },
      { label: "Rilevanza media", value: "L3.2" },
    ],
  },
  {
    id: "7",
    name: "Evento",
    initials: "EV",
    active: true,
    lastWork: "Fill rate monitoring attivo",
    score: 82,
    outputs: [
      { icon: "⚠️", title: "Alert Workshop 15/4 sotto soglia", destination: "Home", destinationId: "home", time: "oggi 08:00" },
    ],
    metrics: [
      { label: "Eventi monitorati", value: "3" },
      { label: "Fill rate medio", value: "45%" },
    ],
  },
  {
    id: "8",
    name: "Partnership",
    initials: "PA",
    active: false,
    lastWork: "Sweep completato 2 sett. fa",
    score: 60,
    outputs: [],
    metrics: [
      { label: "Partner identificati", value: "5" },
      { label: "Match rate", value: "40%" },
    ],
  },
]

export function TeamAgenti() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  const activeCount = agents.filter((a) => a.active).length
  const totalCount = agents.length

  const getScoreColor = (score: number) => {
    if (score >= 85) return "#16A34A"
    if (score >= 70) return "#F59E0B"
    return "#DC2626"
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
          Team Agenti
        </h1>
        <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
          {activeCount} attivi su {totalCount} &middot; Ultimo ciclo: stamattina 08:00 &middot; Prossimo: oggi 14:00
        </p>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-3 gap-4">
        {agents.map((agent) => {
          const isExpanded = expandedAgent === agent.id

          return (
            <div
              key={agent.id}
              className="rounded-xl border transition-all"
              style={{
                borderColor: isExpanded ? "#2563EB" : "#E5E7EB",
                opacity: agent.active ? 1 : 0.6,
              }}
            >
              {/* Card header */}
              <button
                onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    {agent.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold" style={{ color: "#1B2B4B" }}>
                        {agent.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: agent.active ? "#16A34A" : "#9CA3AF" }}
                        />
                        <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          {agent.active ? "Attivo" : "Inattivo"}
                        </span>
                      </div>
                    </div>
                    <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      {agent.lastWork}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="text-[20px] font-bold"
                    style={{ color: getScoreColor(agent.score) }}
                  >
                    {agent.score}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" style={{ color: "#9CA3AF" }} />
                  ) : (
                    <ChevronDown className="h-5 w-5" style={{ color: "#9CA3AF" }} />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: "#E5E7EB" }}>
                  {/* Outputs */}
                  {agent.outputs.length > 0 && (
                    <div className="mb-4">
                      <p
                        className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: "#7C8CA2" }}
                      >
                        Output recenti
                      </p>
                      <div className="space-y-2">
                        {agent.outputs.map((output, idx) => (
                          <button
                            key={idx}
                            className="flex w-full items-start gap-2 rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
                          >
                            <span className="text-[14px]">{output.icon}</span>
                            <div className="flex-1">
                              <p
                                className="text-[13px] font-medium hover:underline"
                                style={{ color: "#1B2B4B" }}
                              >
                                {output.title}
                              </p>
                              <p className="text-[10px]" style={{ color: "#2563EB" }}>
                                → {output.destination}
                              </p>
                            </div>
                            <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
                              {output.time}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  <div className="mb-4">
                    <p
                      className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: "#7C8CA2" }}
                    >
                      Metriche
                    </p>
                    <div className="flex gap-4">
                      {agent.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                            {metric.label}
                          </p>
                          <p className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <p
                      className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: "#7C8CA2" }}
                    >
                      Azioni
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
                      >
                        <Power className="h-3.5 w-3.5" />
                        {agent.active ? "Disabilita" : "Abilita"}
                      </button>
                      <button
                        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-blue-50"
                        style={{ borderColor: "#2563EB", color: "#2563EB" }}
                      >
                        <Play className="h-3.5 w-3.5" />
                        Forza esecuzione
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
