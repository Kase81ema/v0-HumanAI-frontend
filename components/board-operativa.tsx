"use client"

import { useState } from "react"
import { Play, MoreHorizontal, ChevronRight, Check, X, Clock, Pause, ArrowRight, Copy, Bookmark, Trash2 } from "lucide-react"

interface ProcessStep {
  id: string
  title: string
  agent: string
  agentIcon: string
  status: "completed" | "waiting" | "pending"
  output?: string
  outputLink?: string
  timestamp?: string
  note?: string
}

interface Process {
  id: string
  title: string
  type: "processo" | "situazione"
  status: "running" | "waiting" | "completed" | "draft"
  urgent?: boolean
  progress: number
  totalSteps: number
  waitingSteps: number
  steps: ProcessStep[]
}

const processes: Process[] = [
  {
    id: "1",
    title: "Promozione Workshop 15 aprile",
    type: "processo",
    status: "waiting",
    urgent: true,
    progress: 2,
    totalSteps: 5,
    waitingSteps: 1,
    steps: [
      {
        id: "s1",
        title: "Genera piano promozione",
        agent: "Planner",
        agentIcon: "PL",
        status: "completed",
        output: "Piano: 2 post LinkedIn + 2 email + 1 Telegram",
        outputLink: "content",
        timestamp: "completato 2g fa",
      },
      {
        id: "s2",
        title: "Approva piano promozione",
        agent: "Umano",
        agentIcon: "👤",
        status: "completed",
        output: "Approvato con nota: 'Aggiungi anche post dello speaker'",
        timestamp: "completato 1g fa",
        note: "Aggiungi anche post dello speaker",
      },
      {
        id: "s3",
        title: "Genera contenuti promozionali",
        agent: "Copywriter",
        agentIcon: "CW",
        status: "waiting",
        output: `L'AI nel coaching non sostituisce l'intuizione umana: la amplifica.

Ho visto coach usare strumenti AI per preparare le sessioni. Non per avere risposte, ma per avere domande migliori.

Il pattern recognition dell'AI identifica schemi che il coach può esplorare. Ma la connessione, l'empatia, il timing giusto per una domanda difficile — quello resta profondamente umano.

Cosa cambia davvero? Il coach arriva più preparato. Il coachee riceve un'esperienza più personalizzata. Il risultato? Sessioni più profonde, non più meccaniche.`,
        timestamp: "in attesa da 3h",
      },
      {
        id: "s4",
        title: "Pubblica su LinkedIn",
        agent: "Publisher",
        agentIcon: "📤",
        status: "pending",
      },
      {
        id: "s5",
        title: "Pubblica su Telegram",
        agent: "Publisher",
        agentIcon: "📤",
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    title: "Post da insight: AI + recruiting",
    type: "situazione",
    status: "waiting",
    progress: 2,
    totalSteps: 4,
    waitingSteps: 1,
    steps: [
      {
        id: "s1",
        title: "Analizza insight",
        agent: "Scout",
        agentIcon: "SC",
        status: "completed",
        output: "Trend identificato: AI recruiting sotto scrutinio EU",
        outputLink: "command",
        timestamp: "completato 1g fa",
      },
      {
        id: "s2",
        title: "Genera brief contenuto",
        agent: "Planner",
        agentIcon: "PL",
        status: "completed",
        output: "Brief: Post riflessivo R2 su implicazioni etiche",
        timestamp: "completato 12h fa",
      },
      {
        id: "s3",
        title: "Scrivi contenuto",
        agent: "Copywriter",
        agentIcon: "CW",
        status: "waiting",
        output: "In attesa di approvazione brief",
        timestamp: "in attesa da 2h",
      },
      {
        id: "s4",
        title: "Pubblica",
        agent: "Publisher",
        agentIcon: "📤",
        status: "pending",
      },
    ],
  },
  {
    id: "3",
    title: "Follow-up Claudia Bernasconi",
    type: "situazione",
    status: "draft",
    progress: 0,
    totalSteps: 3,
    waitingSteps: 0,
    steps: [
      {
        id: "s1",
        title: "Prepara brief chiamata",
        agent: "Sales",
        agentIcon: "SA",
        status: "pending",
      },
      {
        id: "s2",
        title: "Esegui chiamata",
        agent: "Umano",
        agentIcon: "👤",
        status: "pending",
      },
      {
        id: "s3",
        title: "Aggiorna CRM",
        agent: "Funnel",
        agentIcon: "FN",
        status: "pending",
      },
    ],
  },
  {
    id: "4",
    title: "Piano editoriale settimana 14",
    type: "processo",
    status: "completed",
    progress: 4,
    totalSteps: 4,
    waitingSteps: 0,
    steps: [
      {
        id: "s1",
        title: "Genera piano",
        agent: "Planner",
        agentIcon: "PL",
        status: "completed",
        output: "Piano sett.14 con 12 contenuti",
        outputLink: "editorial",
        timestamp: "completato 5g fa",
      },
      {
        id: "s2",
        title: "Approva piano",
        agent: "Umano",
        agentIcon: "👤",
        status: "completed",
        timestamp: "completato 5g fa",
      },
      {
        id: "s3",
        title: "Genera contenuti",
        agent: "Copywriter",
        agentIcon: "CW",
        status: "completed",
        output: "12 contenuti generati",
        outputLink: "content",
        timestamp: "completato 4g fa",
      },
      {
        id: "s4",
        title: "Pubblica",
        agent: "Publisher",
        agentIcon: "📤",
        status: "completed",
        timestamp: "completato 3g fa",
      },
    ],
  },
]

const statusConfig = {
  running: { color: "#2563EB", bgColor: "rgba(37, 99, 235, 0.1)", label: "In corso" },
  waiting: { color: "#7C3AED", bgColor: "rgba(124, 58, 237, 0.1)", label: "Serve azione" },
  completed: { color: "#16A34A", bgColor: "rgba(22, 163, 74, 0.1)", label: "Completato" },
  draft: { color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)", label: "Bozza" },
}

const stepStatusConfig = {
  completed: { color: "#16A34A", bgColor: "rgba(22, 163, 74, 0.08)" },
  waiting: { color: "#7C3AED", bgColor: "rgba(124, 58, 237, 0.08)", border: "#7C3AED" },
  pending: { color: "#9CA3AF", bgColor: "rgba(156, 163, 175, 0.05)" },
}

export function BoardOperativa() {
  const [selectedProcess, setSelectedProcess] = useState<Process>(processes[0])
  const [filter, setFilter] = useState("all")
  const [showMenu, setShowMenu] = useState(false)
  const [actionNote, setActionNote] = useState("")
  const [newSituation, setNewSituation] = useState("")

  const filters = [
    { id: "all", label: "Tutti", count: 4 },
    { id: "active", label: "Attivi", count: 2 },
    { id: "waiting", label: "In attesa", count: 1 },
    { id: "completed", label: "Completati", count: 1 },
  ]

  const filteredProcesses = processes.filter((p) => {
    if (filter === "all") return true
    if (filter === "active") return p.status === "running" || p.status === "waiting"
    if (filter === "waiting") return p.status === "waiting"
    if (filter === "completed") return p.status === "completed"
    return true
  })

  const progressPercent = (selectedProcess.progress / selectedProcess.totalSteps) * 100

  return (
    <div className="flex h-full">
      {/* Lista processi */}
      <div
        className="flex h-full w-[360px] flex-col border-r"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "var(--color-border)" }}>
          <div className="mb-3">
            <h2 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
              Board Operativa
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              4 processi · 1 in attesa
            </p>
          </div>
          <button
            className="w-full py-3 rounded-lg text-base font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            + Nuova situazione
          </button>
        </div>

        {/* Filtri */}
        <div className="flex gap-2 overflow-x-auto px-6 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: filter === f.id ? "var(--color-primary)" : "var(--color-bg-secondary)",
                color: filter === f.id ? "white" : "var(--color-text-secondary)",
              }}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {filteredProcesses.map((process) => {
            const config = statusConfig[process.status]
            const isSelected = selectedProcess.id === process.id
            const pct = (process.progress / process.totalSteps) * 100

            return (
              <button
                key={process.id}
                onClick={() => setSelectedProcess(process)}
                className="flex w-full items-start gap-4 border-l-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
                style={{
                  borderLeftColor: isSelected ? "var(--color-primary)" : "transparent",
                  backgroundColor: isSelected ? "var(--color-primary-light)" : "transparent",
                }}
              >
                {/* Progress circle */}
                <div
                  className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    background: `conic-gradient(${config.color} ${pct}%, var(--color-border) ${pct}%)`,
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
                    style={{ backgroundColor: "white", color: config.color }}
                  >
                    {Math.round(pct)}%
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="text-base font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {process.title}
                    </span>
                    {process.urgent && (
                      <span
                        className="rounded px-2 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: "#DC2626" }}
                      >
                        Urgente
                      </span>
                    )}
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="rounded px-2 py-1 text-xs font-medium"
                      style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-secondary)" }}
                    >
                      {process.type === "processo" ? "Processo" : "Situazione"}
                    </span>
                    <span
                      className="rounded px-2 py-1 text-xs font-medium"
                      style={{ backgroundColor: config.bgColor, color: config.color }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                    {process.progress}/{process.totalSteps} step
                    {process.waitingSteps > 0 && (
                      <> · <Pause className="inline h-3 w-3 mb-0.5" /> {process.waitingSteps} in attesa</>
                    )}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Dettaglio processo */}
      <div className="flex flex-1 flex-col overflow-hidden" style={{ backgroundColor: "var(--color-bg-primary)" }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-6" style={{ borderColor: "var(--color-border)" }}>
          <div>
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                {selectedProcess.title}
              </h1>
              <span
                className="rounded px-3 py-1 text-sm font-medium"
                style={{
                  backgroundColor: statusConfig[selectedProcess.status].bgColor,
                  color: statusConfig[selectedProcess.status].color,
                }}
              >
                {statusConfig[selectedProcess.status].label}
              </span>
              {selectedProcess.urgent && (
                <span
                  className="rounded px-3 py-1 text-sm font-bold text-white"
                  style={{ backgroundColor: "#DC2626" }}
                >
                  Priorita alta
                </span>
              )}
            </div>
            {/* Progress bar */}
            <div className="flex items-center gap-4">
              <div className="h-3 w-64 overflow-hidden rounded-full" style={{ backgroundColor: "var(--color-border)" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: statusConfig[selectedProcess.status].color,
                  }}
                />
              </div>
              <span className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                {selectedProcess.progress} di {selectedProcess.totalSteps} step completati
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedProcess.status === "draft" && (
              <button
                className="flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Play className="h-5 w-5" /> Avvia
              </button>
            )}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-lg border p-3 transition-colors hover:bg-gray-100"
                style={{ borderColor: "var(--color-border)" }}
              >
                <MoreHorizontal className="h-5 w-5" style={{ color: "var(--color-text-secondary)" }} />
              </button>
              {showMenu && (
                <div
                  className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg border bg-white py-1 shadow-lg"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-base hover:bg-gray-50">
                    <Copy className="h-5 w-5" style={{ color: "var(--color-text-secondary)" }} />
                    Duplica processo
                  </button>
                  <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-base hover:bg-gray-50">
                    <Bookmark className="h-5 w-5" style={{ color: "var(--color-text-secondary)" }} />
                    Salva come template
                  </button>
                  <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-base text-red-600 hover:bg-red-50">
                    <Trash2 className="h-5 w-5" />
                    Annulla processo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline degli step */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div
              className="absolute bottom-0 left-3 top-0 w-1"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            {selectedProcess.steps.map((step, index) => {
              const stepConfig = stepStatusConfig[step.status]
              const isWaiting = step.status === "waiting"

              return (
                <div key={step.id} className="relative mb-6 last:mb-0">
                  {/* Dot */}
                  <div
                    className="absolute -left-7 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2"
                    style={{
                      backgroundColor: step.status === "completed" ? "#059669" : "white",
                      borderColor: stepConfig.color,
                    }}
                  >
                    {step.status === "completed" ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : step.status === "waiting" ? (
                      <Clock className="h-4 w-4" style={{ color: stepConfig.color }} />
                    ) : (
                      <span className="text-xs font-bold" style={{ color: stepConfig.color }}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Step card */}
                  <div
                    className="rounded-lg border p-6"
                    style={{
                      backgroundColor: stepConfig.bgColor,
                      borderColor: isWaiting ? stepConfig.border : "var(--color-border)",
                      borderWidth: isWaiting ? "2px" : "1px",
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                          style={{
                            backgroundColor:
                              step.agentIcon === "👤" ? "var(--color-text-secondary)" : "var(--color-primary)",
                          }}
                        >
                          {step.agentIcon === "👤" || step.agentIcon === "📤"
                            ? step.agentIcon
                            : step.agentIcon}
                        </div>
                        <span className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                          {step.agent}: {step.title}
                        </span>
                      </div>
                      {step.timestamp && (
                        <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                          {step.timestamp}
                        </span>
                      )}
                    </div>

                    {/* Output */}
                    {step.output && (
                      <div className="mb-4">
                        {step.status === "waiting" && step.output.includes("\n") ? (
                          <p
                            className="whitespace-pre-wrap text-base leading-relaxed"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {step.output.length > 300
                              ? step.output.slice(0, 300) + "..."
                              : step.output}
                            {step.output.length > 300 && (
                              <button
                                className="ml-1 text-base font-semibold"
                                style={{ color: "var(--color-primary)" }}
                              >
                                Leggi tutto
                              </button>
                            )}
                          </p>
                        ) : (
                          <button
                            className="flex items-center gap-2 text-base hover:underline"
                            style={{ color: step.outputLink ? "var(--color-primary)" : "var(--color-text-primary)" }}
                          >
                            {step.output}
                            {step.outputLink && <ChevronRight className="h-4 w-4" />}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Action area for waiting steps */}
                    {isWaiting && (
                      <div className="space-y-3">
                        {step.note && (
                          <div
                            className="rounded-lg p-4"
                            style={{ backgroundColor: "white", border: `1px solid var(--color-border-light)` }}
                          >
                            <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                              Nota per questa step
                            </p>
                            <p className="mt-2 text-base" style={{ color: "var(--color-text-secondary)" }}>
                              {step.note}
                            </p>
                          </div>
                        )}
                        <textarea
                          placeholder="Aggiungi un'azione o nota..."
                          value={actionNote}
                          onChange={(e) => setActionNote(e.target.value)}
                          className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ borderColor: "var(--color-border)" }}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <button
                            className="flex-1 rounded-lg px-4 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            Continua
                          </button>
                          <button
                            className="flex-1 rounded-lg px-4 py-3 text-base font-semibold border transition-colors hover:bg-gray-100"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                          >
                            Rimanda
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
