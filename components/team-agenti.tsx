"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Play, Power, Save } from "lucide-react"
import { FloatingAgentAvatar } from "./floating-agent-avatar"

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

interface Slider {
  id: string
  name: string
  leftLabel: string
  rightLabel: string
  value: number
  description: string
}

interface HistoryEntry {
  date: string
  slider: string
  from: number
  to: number
  reason: string
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
      { icon: "P", title: "Post R1: Come cambiera il mio lavoro con l'AI?", destination: "Content Factory", destinationId: "content", time: "stanotte 02:15" },
      { icon: "P", title: "Post EN Leadership AI patterns", destination: "Content Factory", destinationId: "content", time: "stanotte 02:18" },
      { icon: "N", title: "Newsletter sett.14 AI & Persone", destination: "Content Factory", destinationId: "content", time: "ieri 23:45" },
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
      { icon: "C", title: "Piano editoriale sett.15", destination: "Piano editoriale", destinationId: "editorial", time: "ieri 20:00" },
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
      { icon: "!", title: "Briefing workshop critico", destination: "Centro di Comando", destinationId: "command", time: "oggi 08:00" },
      { icon: "G", title: "Analisi trend Q1 completata", destination: "Centro di Comando", destinationId: "command", time: "ieri 18:30" },
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
      { icon: "E", title: "FN2 Step 3 inviato a Claudia B.", destination: "CRM", destinationId: "crm", time: "oggi 09:00" },
      { icon: "!", title: "Lead escalation Claudia B.", destination: "CRM", destinationId: "crm", time: "oggi 09:05" },
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
    lastWork: "Intelligence brief Sara Muller",
    score: 85,
    outputs: [
      { icon: "B", title: "Brief pre-call Sara Muller", destination: "CRM", destinationId: "crm", time: "oggi 07:30" },
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
      { icon: "S", title: "Segnale AI regulation EU", destination: "Centro di Comando", destinationId: "command", time: "oggi 06:00" },
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
      { icon: "!", title: "Alert Workshop 15/4 sotto soglia", destination: "Home", destinationId: "home", time: "oggi 08:00" },
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

const initialSliders: Slider[] = [
  {
    id: "brand-conversion",
    name: "Brand - Conversion",
    leftLabel: "Brand",
    rightLabel: "Conversion",
    value: 35,
    description: "Al 35%: il sistema favorisce contenuti educativi e brand. Il Copywriter genera piu R1/R2 riflessivi. CTA solo per eventi gratuiti.",
  },
  {
    id: "organic-paid",
    name: "Organico - Paid",
    leftLabel: "Organico",
    rightLabel: "Paid",
    value: 20,
    description: "Al 20%: il sistema massimizza contenuto organico. Non pianifica slot di supporto ads. Piu post LinkedIn, Medium, Telegram.",
  },
  {
    id: "volume-depth",
    name: "Volume - Profondita",
    leftLabel: "Volume",
    rightLabel: "Profondita",
    value: 60,
    description: "Al 60%: il sistema bilancia frequenza e qualita. 3-4 post settimanali per canale. Newsletter settimanale.",
  },
  {
    id: "education-promo",
    name: "Educazione - Promozione",
    leftLabel: "Educazione",
    rightLabel: "Promozione",
    value: 30,
    description: "Al 30%: la maggioranza dei contenuti e educativa. Max 1 post promozionale a settimana. Rubriche R1-R4 attive.",
  },
]

const history: HistoryEntry[] = [
  {
    date: "15 marzo",
    slider: "Brand - Conversion",
    from: 50,
    to: 35,
    reason: "fase fondazione, priorita brand",
  },
  {
    date: "1 marzo",
    slider: "Volume - Profondita",
    from: 40,
    to: 60,
    reason: "primi risultati, possiamo aumentare",
  },
]

export function TeamAgenti() {
  const [activeTab, setActiveTab] = useState<"team" | "orientamento">("team")
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)
  const [sliders, setSliders] = useState(initialSliders)
  const [originalValues] = useState(initialSliders.map((s) => s.value))
  const [historyOpen, setHistoryOpen] = useState(false)

  const activeCount = agents.filter((a) => a.active).length
  const totalCount = agents.length
  const hasChanges = sliders.some((s, i) => s.value !== originalValues[i])

  const getScoreColor = (score: number) => {
    if (score >= 85) return "#16A34A"
    if (score >= 70) return "#F59E0B"
    return "#DC2626"
  }

  const handleSliderChange = (id: string, newValue: number) => {
    setSliders((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          let description = s.description
          if (id === "brand-conversion") {
            if (newValue < 30) {
              description = `Al ${newValue}%: focus quasi esclusivo su brand awareness. Contenuti riflessivi, zero CTA dirette.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: il sistema favorisce contenuti educativi e brand. Il Copywriter genera piu R1/R2 riflessivi.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: equilibrio tra brand e conversion. CTA presenti ma non aggressive.`
            } else {
              description = `Al ${newValue}%: focus su conversion. Piu CTA, piu contenuti promozionali.`
            }
          } else if (id === "organic-paid") {
            if (newValue < 30) {
              description = `Al ${newValue}%: il sistema massimizza contenuto organico. Non pianifica slot di supporto ads.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: principalmente organico con occasionale supporto paid.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: mix bilanciato. Campagne ads per ogni evento.`
            } else {
              description = `Al ${newValue}%: strategia paid-first. Ogni contenuto importante ha budget ads.`
            }
          } else if (id === "volume-depth") {
            if (newValue < 30) {
              description = `Al ${newValue}%: alta frequenza, contenuti piu brevi. 5-6 post/settimana per canale.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: buona frequenza con qualita media. 4-5 post/settimana.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: bilancia frequenza e qualita. 3-4 post settimanali per canale.`
            } else {
              description = `Al ${newValue}%: focus su profondita. 2-3 post/settimana ma piu lunghi e ricercati.`
            }
          } else if (id === "education-promo") {
            if (newValue < 30) {
              description = `Al ${newValue}%: la maggioranza dei contenuti e educativa. Max 1 post promo/settimana.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: prevalenza educativa con promozione occasionale.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: mix equilibrato. Ogni contenuto educativo ha un follow-up promozionale.`
            } else {
              description = `Al ${newValue}%: focus promozionale. Ogni contenuto porta a una CTA.`
            }
          }
          return { ...s, value: newValue, description }
        }
        return s
      })
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Tabs */}
      <div className="sticky top-0 z-10 border-b bg-white" style={{ borderColor: "#E5E7EB" }}>
        <div className="flex gap-0 px-6">
          <button
            onClick={() => setActiveTab("team")}
            className="px-6 py-4 text-[14px] font-medium transition-colors"
            style={{
              color: activeTab === "team" ? "#2563EB" : "#7C8CA2",
              borderBottom: activeTab === "team" ? "2px solid #2563EB" : "2px solid transparent",
              marginBottom: "-1px"
            }}
          >
            Team Agenti
          </button>
          <button
            onClick={() => setActiveTab("orientamento")}
            className="px-6 py-4 text-[14px] font-medium transition-colors"
            style={{
              color: activeTab === "orientamento" ? "#2563EB" : "#7C8CA2",
              borderBottom: activeTab === "orientamento" ? "2px solid #2563EB" : "2px solid transparent",
              marginBottom: "-1px"
            }}
          >
            Orientamento strategico
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "team" && (
          <>
            {/* Header */}
            <div className="mb-6">
              <h1 className="mb-1 text-[16px] font-semibold" style={{ color: "#1B2B4B" }}>
                Team Agenti
              </h1>
              <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                {activeCount} attivi su {totalCount} - Ultimo ciclo: stamattina 08:00 - Prossimo: oggi 14:00
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
                          className="text-[16px] font-semibold"
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
                                  <span 
                                    className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold"
                                    style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                                  >
                                    {output.icon}
                                  </span>
                                  <div className="flex-1">
                                    <p
                                      className="text-[13px] font-medium hover:underline"
                                      style={{ color: "#1B2B4B" }}
                                    >
                                      {output.title}
                                    </p>
                                    <p className="text-[10px]" style={{ color: "#2563EB" }}>
                                      - {output.destination}
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
          </>
        )}

        {activeTab === "orientamento" && (
          <div className="mx-auto max-w-[700px]">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-2 text-[16px] font-semibold" style={{ color: "#1B2B4B" }}>
                Orientamento strategico
              </h1>
              <p className="text-[14px] leading-relaxed" style={{ color: "#7C8CA2" }}>
                Questi cursori guidano tutti gli agenti. Modificali per cambiare la direzione
                operativa dell&apos;intero sistema.
              </p>
            </div>

            {/* Sliders */}
            <div className="mb-8 space-y-6">
              {sliders.map((slider) => (
                <div
                  key={slider.id}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[15px] font-bold" style={{ color: "#1B2B4B" }}>
                      {slider.name}
                    </h3>
                    <span
                      className="text-[16px] font-bold"
                      style={{ color: "#2563EB" }}
                    >
                      {slider.value}%
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={slider.value}
                      onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full"
                      style={{
                        background: `linear-gradient(to right, #2563EB 0%, #2563EB ${slider.value}%, #E5E7EB ${slider.value}%, #E5E7EB 100%)`,
                      }}
                    />
                    <div className="mt-1 flex justify-between">
                      <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
                        {slider.leftLabel}
                      </span>
                      <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
                        {slider.rightLabel}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#F9FAFB" }}
                  >
                    <p className="text-[12px] leading-relaxed" style={{ color: "#374151" }}>
                      {slider.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* History */}
            <div className="mb-6">
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="flex w-full items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB" }}
              >
                <span className="text-[13px] font-medium" style={{ color: "#6B7280" }}>
                  Storico modifiche
                </span>
                {historyOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: "#9CA3AF" }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: "#9CA3AF" }} />
                )}
              </button>

              {historyOpen && (
                <div className="mt-2 space-y-2 rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                  {history.map((entry, idx) => (
                    <div key={idx} className="text-[12px]" style={{ color: "#6B7280" }}>
                      <span className="font-medium">{entry.date}:</span> {entry.slider} da {entry.from}% a {entry.to}% — <span className="italic">Motivo: {entry.reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save button */}
            <div className="text-center">
              <button
                disabled={!hasChanges}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[14px] font-medium text-white transition-opacity"
                style={{
                  backgroundColor: "#2563EB",
                  opacity: hasChanges ? 1 : 0.5,
                  cursor: hasChanges ? "pointer" : "not-allowed",
                }}
              >
                <Save className="h-4 w-4" /> Salva modifiche
              </button>
              <p className="mt-2 text-[12px]" style={{ color: "#9CA3AF" }}>
                Le modifiche vengono applicate al prossimo checkpoint dell&apos;orchestrator (ogni 6 ore).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Agent Avatar */}
      <FloatingAgentAvatar initials="ST" agentName="Strategist" />
    </div>
  )
}
