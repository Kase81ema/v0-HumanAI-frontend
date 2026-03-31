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
        className="flex h-full w-[320px] flex-col border-r"
        style={{ borderColor: "#E5E7EB" }}
      >
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
              Board operativa
            </h2>
            <button
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              + Nuova situazione
            </button>
          </div>
          <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
            4 processi &middot; 1 in attesa
          </p>
        </div>

        {/* Filtri */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-medium transition-colors"
              style={{
                backgroundColor: filter === f.id ? "#2563EB" : "#F3F4F6",
                color: filter === f.id ? "#FFFFFF" : "#6B7280",
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
                className="flex w-full items-start gap-3 border-l-[3px] px-4 py-3 text-left transition-colors"
                style={{
                  borderLeftColor: isSelected ? "#2563EB" : "transparent",
                  backgroundColor: isSelected ? "rgba(37, 99, 235, 0.06)" : "transparent",
                }}
              >
                {/* Progress circle */}
                <div
                  className="relative flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(${config.color} ${pct}%, #E5E7EB ${pct}%)`,
                  }}
                >
                  <div
                    className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[10px] font-bold"
                    style={{ color: config.color }}
                  >
                    {Math.round(pct)}%
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "#1B2B4B" }}
                    >
                      {process.title}
                    </span>
                    {process.urgent && (
                      <span
                        className="rounded px-1.5 py-0.5 text-[9px] font-bold text-white"
                        style={{ backgroundColor: "#DC2626" }}
                      >
                        Urgente
                      </span>
                    )}
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}
                    >
                      {process.type === "processo" ? "Processo" : "Situazione"}
                    </span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: config.bgColor, color: config.color }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                    {process.progress}/{process.totalSteps} step
                    {process.waitingSteps > 0 && (
                      <> &middot; <Pause className="mb-0.5 inline h-3 w-3" /> {process.waitingSteps} in attesa</>
                    )}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Dettaglio processo */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "#E5E7EB" }}>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h1 className="text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
                {selectedProcess.title}
              </h1>
              <span
                className="rounded px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: statusConfig[selectedProcess.status].bgColor,
                  color: statusConfig[selectedProcess.status].color,
                }}
              >
                {statusConfig[selectedProcess.status].label}
              </span>
              {selectedProcess.urgent && (
                <span
                  className="rounded px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ backgroundColor: "#DC2626" }}
                >
                  Priorita alta
                </span>
              )}
            </div>
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="h-2 w-[200px] overflow-hidden rounded-full" style={{ backgroundColor: "#E5E7EB" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: statusConfig[selectedProcess.status].color,
                  }}
                />
              </div>
              <span className="text-[12px]" style={{ color: "#6B7280" }}>
                {selectedProcess.progress} di {selectedProcess.totalSteps} step completati
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedProcess.status === "draft" && (
              <button
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                <Play className="h-4 w-4" /> Avvia
              </button>
            )}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-lg border p-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB" }}
              >
                <MoreHorizontal className="h-4 w-4" style={{ color: "#6B7280" }} />
              </button>
              {showMenu && (
                <div
                  className="absolute right-0 top-full z-10 mt-1 w-[200px] rounded-lg border bg-white py-1 shadow-lg"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-gray-50">
                    <Copy className="h-4 w-4" style={{ color: "#6B7280" }} />
                    Duplica processo
                  </button>
                  <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-gray-50">
                    <Bookmark className="h-4 w-4" style={{ color: "#6B7280" }} />
                    Salva come template
                  </button>
                  <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                    Annulla processo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline degli step */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div
              className="absolute bottom-0 left-[15px] top-0 w-[2px]"
              style={{ backgroundColor: "#E5E7EB" }}
            />

            {selectedProcess.steps.map((step, index) => {
              const stepConfig = stepStatusConfig[step.status]
              const isWaiting = step.status === "waiting"

              return (
                <div key={step.id} className="relative mb-4 last:mb-0">
                  {/* Dot */}
                  <div
                    className="absolute -left-8 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2"
                    style={{
                      backgroundColor: step.status === "completed" ? "#16A34A" : "#FFFFFF",
                      borderColor: stepConfig.color,
                    }}
                  >
                    {step.status === "completed" ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : step.status === "waiting" ? (
                      <Clock className="h-4 w-4" style={{ color: stepConfig.color }} />
                    ) : (
                      <span className="text-[10px] font-bold" style={{ color: stepConfig.color }}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Step card */}
                  <div
                    className="rounded-lg border p-4"
                    style={{
                      backgroundColor: stepConfig.bgColor,
                      borderColor: isWaiting ? stepConfig.border : "#E5E7EB",
                      borderWidth: isWaiting ? "2px" : "1px",
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                          style={{
                            backgroundColor:
                              step.agentIcon === "👤" ? "#6B7280" : "#2563EB",
                          }}
                        >
                          {step.agentIcon === "👤" || step.agentIcon === "📤"
                            ? step.agentIcon
                            : step.agentIcon}
                        </div>
                        <span className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                          {step.agent}: {step.title}
                        </span>
                      </div>
                      {step.timestamp && (
                        <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
                          {step.timestamp}
                        </span>
                      )}
                    </div>

                    {/* Output */}
                    {step.output && (
                      <div className="mb-3">
                        {step.status === "waiting" && step.output.includes("\n") ? (
                          <p
                            className="whitespace-pre-wrap text-[14px] leading-relaxed"
                            style={{ color: "#374151" }}
                          >
                            {step.output.length > 300
                              ? step.output.slice(0, 300) + "..."
                              : step.output}
                            {step.output.length > 300 && (
                              <button
                                className="ml-1 text-[13px] font-medium"
                                style={{ color: "#2563EB" }}
                              >
                                Leggi tutto
                              </button>
                            )}
                          </p>
                        ) : (
                          <button
                            className="flex items-center gap-1 text-[13px] hover:underline"
                            style={{ color: step.outputLink ? "#2563EB" : "#374151" }}
                          >
                            {step.output}
                            {step.outputLink && <ChevronRight className="h-3 w-3" />}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Action area for waiting steps */}
                    {isWaiting && (
                      <div
                        className="mt-3 rounded-lg border p-3"
                        style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                      >
                        <div className="mb-2 flex items-center gap-1">
                          <span
                            className="rounded px-2 py-0.5 text-[11px] font-medium"
                            style={{ backgroundColor: "rgba(124, 58, 237, 0.1)", color: "#7C3AED" }}
                          >
                            Serve il tuo intervento
                          </span>
                        </div>
                        <div className="mb-3 flex gap-2">
                          <button
                            className="flex items-center gap-1 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                            style={{ backgroundColor: "#16A34A" }}
                          >
                            <Check className="h-4 w-4" /> Approva
                          </button>
                          <button
                            className="rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                            style={{ borderColor: "#E5E7EB", color: "#374151" }}
                          >
                            Modifica
                          </button>
                          <button
                            className="rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-red-50"
                            style={{ borderColor: "#FCA5A5", color: "#DC2626" }}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Nota (opzionale)"
                          value={actionNote}
                          onChange={(e) => setActionNote(e.target.value)}
                          className="w-full rounded-lg border px-3 py-2 text-[13px]"
                          style={{ borderColor: "#E5E7EB" }}
                        />
                      </div>
                    )}

                    {/* Pending state message */}
                    {step.status === "pending" && (
                      <p className="text-[12px] italic" style={{ color: "#9CA3AF" }}>
                        In attesa che lo step precedente venga completato
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* New situation card */}
          <div
            className="mt-6 rounded-lg border p-4"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
          >
            <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
              Nuova situazione
            </p>
            <textarea
              placeholder="Descrivi cosa devi fare..."
              value={newSituation}
              onChange={(e) => setNewSituation(e.target.value)}
              className="mb-3 w-full resize-none rounded-lg border px-3 py-2 text-[13px]"
              style={{ borderColor: "#E5E7EB" }}
              rows={2}
            />
            <button
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              Analizza con Operator <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
