"use client"

import { useState } from "react"
import { Plus, X, ChevronRight, ExternalLink, FileText, Phone, Calendar, GripVertical, AlertTriangle } from "lucide-react"

interface Deal {
  id: string
  contactName: string
  contactInitials: string
  company: string
  product: string
  value: number
  daysInStage: number
  nextAction: string
  stage: "discovery" | "qualifica" | "proposta" | "negoziazione"
  isStalled: boolean
}

const initialDeals: Deal[] = [
  {
    id: "1",
    contactName: "Claudia Bernasconi",
    contactInitials: "CB",
    company: "Banca Lugano",
    product: "Workshop custom",
    value: 0,
    daysInStage: 2,
    nextAction: "Preparare discovery call",
    stage: "discovery",
    isStalled: false,
  },
  {
    id: "2",
    contactName: "Mario Rossi",
    contactInitials: "MR",
    company: "TechnoSwiss AG",
    product: "Coaching AI leadership",
    value: 8000,
    daysInStage: 3,
    nextAction: "Inviare proposta preliminare",
    stage: "qualifica",
    isStalled: false,
  },
  {
    id: "3",
    contactName: "Sara Müller",
    contactInitials: "SM",
    company: "SwissAI Lab",
    product: "Coaching Team AI — 6 sessioni",
    value: 12000,
    daysInStage: 5,
    nextAction: "Inviare proposta entro venerdì",
    stage: "proposta",
    isStalled: false,
  },
  {
    id: "4",
    contactName: "Andrea Fontana",
    contactInitials: "AF",
    company: "InnovaTicino",
    product: "Workshop PMI",
    value: 5500,
    daysInStage: 12,
    nextAction: "Follow-up sulla proposta",
    stage: "proposta",
    isStalled: true,
  },
]

const stages = [
  { id: "discovery", label: "Discovery", color: "#6B7280" },
  { id: "qualifica", label: "Qualifica", color: "#2563EB" },
  { id: "proposta", label: "Proposta", color: "#7C3AED" },
  { id: "negoziazione", label: "Negoziazione", color: "#059669" },
]

const interactionHistory = [
  { text: "Proposta inviata via email", time: "2g fa", hasLink: false },
  { text: "Call discovery (32 min)", time: "5g fa", hasLink: true, linkText: "Trascrizione" },
  { text: "Primo contatto via LinkedIn", time: "2 sett fa", hasLink: false },
]

const materials = [
  { name: "Proposta_SwissAI_Coaching.pdf", generated: "2g fa" },
  { name: "Presentazione HumanAImpact.pdf", generated: null },
]

export function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null)
  const [newNote, setNewNote] = useState("")

  const getStageDeals = (stageId: string) => deals.filter((d) => d.stage === stageId)
  const getStageTotal = (stageId: string) =>
    deals.filter((d) => d.stage === stageId).reduce((sum, d) => sum + d.value, 0)
  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0)

  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (stageId: string) => {
    if (draggedDeal) {
      setDeals((prev) =>
        prev.map((d) =>
          d.id === draggedDeal.id ? { ...d, stage: stageId as Deal["stage"], daysInStage: 0, isStalled: false } : d
        )
      )
      setDraggedDeal(null)
    }
  }

  const moveToStage = (dealId: string, newStage: string) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId ? { ...d, stage: newStage as Deal["stage"], daysInStage: 0, isStalled: false } : d
      )
    )
    if (selectedDeal?.id === dealId) {
      setSelectedDeal({ ...selectedDeal, stage: newStage as Deal["stage"], daysInStage: 0, isStalled: false })
    }
  }

  return (
    <div className="flex h-full">
      {/* Main Kanban Area */}
      <div className={`flex-1 overflow-x-auto p-6 transition-all ${selectedDeal ? "pr-0" : ""}`}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
              Pipeline vendite
            </h1>
            <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
              {deals.length} deal attivi · CHF {totalPipeline.toLocaleString("it-CH")} in pipeline
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB" }}
            >
              <option>Periodo: Tutti</option>
              <option>Questo mese</option>
              <option>Questo trimestre</option>
            </select>
            <button
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Plus className="h-4 w-4" />
              Nuovo deal
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4" style={{ minWidth: "fit-content" }}>
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="w-[280px] shrink-0 rounded-lg"
              style={{ backgroundColor: "#FAFBFC" }}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id)}
            >
              {/* Column Header */}
              <div className="p-3">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                      {stage.label}
                    </span>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[11px]"
                      style={{ backgroundColor: "#E5E7EB", color: "#6B7280" }}
                    >
                      {getStageDeals(stage.id).length}
                    </span>
                  </div>
                </div>
                <p className="text-[14px] font-bold" style={{ color: "#059669" }}>
                  CHF {getStageTotal(stage.id).toLocaleString("it-CH")}
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-2 p-2 pt-0">
                {getStageDeals(stage.id).map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal)}
                    onClick={() => setSelectedDeal(deal)}
                    className="cursor-pointer rounded-lg border bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                    style={{
                      borderColor: deal.isStalled ? "#FCA5A5" : "#E5E7EB",
                      borderLeftWidth: "3px",
                      borderLeftColor: deal.isStalled ? "#EF4444" : "#2563EB",
                    }}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 cursor-grab" style={{ color: "#D1D5DB" }} />
                        <button
                          className="text-[14px] font-semibold hover:underline"
                          style={{ color: "#1B2B4B" }}
                        >
                          {deal.contactName}
                        </button>
                      </div>
                      {deal.isStalled && (
                        <span
                          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
                          style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
                        >
                          <AlertTriangle className="h-3 w-3" />
                          Stallo
                        </span>
                      )}
                    </div>
                    <p className="mb-1 text-[12px]" style={{ color: "#7C8CA2" }}>
                      {deal.company}
                    </p>
                    <p className="mb-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                      {deal.product}
                    </p>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[16px] font-bold" style={{ color: "#059669" }}>
                        {deal.value > 0 ? `CHF ${deal.value.toLocaleString("it-CH")}` : "Da definire"}
                      </span>
                      <span
                        className="text-[11px]"
                        style={{ color: deal.daysInStage > 10 ? "#EF4444" : "#7C8CA2" }}
                      >
                        {deal.daysInStage} giorni
                      </span>
                    </div>
                    <p className="mb-3 text-[12px]" style={{ color: "#2563EB" }}>
                      {deal.nextAction}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1 rounded border px-2 py-1 text-[11px] transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#E5E7EB" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDeal(deal)
                        }}
                      >
                        <FileText className="h-3 w-3" />
                        Materiali
                      </button>
                      <button
                        className="flex items-center gap-1 rounded border px-2 py-1 text-[11px] transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#E5E7EB" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="h-3 w-3" />
                        Log
                      </button>
                    </div>
                  </div>
                ))}

                {getStageDeals(stage.id).length === 0 && (
                  <div
                    className="rounded-lg border-2 border-dashed p-4 text-center"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <p className="text-[12px]" style={{ color: "#9CA3AF" }}>
                      Trascina un deal qui
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-out Panel */}
      {selectedDeal && (
        <div
          className="h-full w-[400px] shrink-0 overflow-y-auto border-l bg-white"
          style={{ borderColor: "#E5E7EB" }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "#E5E7EB" }}>
            <div>
              <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                {selectedDeal.contactName}
              </h2>
              <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                {selectedDeal.company} · {stages.find((s) => s.id === selectedDeal.stage)?.label}
              </p>
            </div>
            <button
              onClick={() => setSelectedDeal(null)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <X className="h-5 w-5" style={{ color: "#7C8CA2" }} />
            </button>
          </div>

          <div className="space-y-6 p-4">
            {/* Deal Detail */}
            <div>
              <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                Dettaglio deal
              </h3>
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <span style={{ color: "#7C8CA2" }}>Prodotto</span>
                  <p style={{ color: "#1B2B4B" }}>{selectedDeal.product}</p>
                </div>
                <div>
                  <span style={{ color: "#7C8CA2" }}>Valore</span>
                  <p className="font-bold" style={{ color: "#059669" }}>
                    {selectedDeal.value > 0 ? `CHF ${selectedDeal.value.toLocaleString("it-CH")}` : "Da definire"}
                  </p>
                </div>
                <div>
                  <span style={{ color: "#7C8CA2" }}>Giorni in stage</span>
                  <p style={{ color: selectedDeal.daysInStage > 10 ? "#EF4444" : "#1B2B4B" }}>
                    {selectedDeal.daysInStage}
                  </p>
                </div>
                <div>
                  <span style={{ color: "#7C8CA2" }}>Owner</span>
                  <p style={{ color: "#1B2B4B" }}>Emanuele Casero</p>
                </div>
              </div>
            </div>

            {/* Contact Mini-Profile */}
            <div>
              <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                Contatto
              </h3>
              <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    {selectedDeal.contactInitials}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>
                      {selectedDeal.contactName}
                    </p>
                    <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      {selectedDeal.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: "#D1FAE5", color: "#059669" }}
                    >
                      Opportunità
                    </span>
                    <p className="mt-1 text-[12px] font-bold" style={{ color: "#1B2B4B" }}>
                      Score: 22
                    </p>
                  </div>
                </div>
                <button
                  className="mt-2 flex w-full items-center justify-center gap-1 text-[12px] hover:underline"
                  style={{ color: "#2563EB" }}
                >
                  Apri profilo completo
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Interaction History */}
            <div>
              <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                Cronologia interazioni
              </h3>
              <div className="space-y-2">
                {interactionHistory.map((item, index) => (
                  <div key={index} className="flex items-start justify-between text-[13px]">
                    <div>
                      <p style={{ color: "#1B2B4B" }}>{item.text}</p>
                      {item.hasLink && (
                        <button
                          className="flex items-center gap-1 text-[12px] hover:underline"
                          style={{ color: "#2563EB" }}
                        >
                          {item.linkText}
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <span style={{ color: "#7C8CA2" }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                Materiali
              </h3>
              <div className="space-y-2">
                {materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-2"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" style={{ color: "#7C8CA2" }} />
                      <div>
                        <p className="text-[13px]" style={{ color: "#1B2B4B" }}>
                          {material.name}
                        </p>
                        {material.generated && (
                          <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                            Generata {material.generated}
                          </p>
                        )}
                      </div>
                    </div>
                    <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Apri
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#2563EB" }}
              >
                Genera nuova proposta
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Actions */}
            <div>
              <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                Azioni
              </h3>
              <div className="space-y-2">
                <button
                  className="flex w-full items-center justify-center gap-1 rounded-lg py-2.5 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  Genera follow-up email
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  className="flex w-full items-center justify-center gap-1 rounded-lg border py-2.5 text-[13px] font-medium transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                >
                  <Calendar className="h-4 w-4" />
                  Programma call (Calendly)
                </button>
              </div>
            </div>

            {/* Note */}
            <div>
              <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                Aggiungi nota
              </h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: "#E5E7EB", minHeight: "80px" }}
                placeholder="Scrivi una nota..."
              />
              <button
                className="mt-2 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                Salva nota
              </button>
            </div>

            {/* Move to Stage */}
            <div>
              <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                Sposta a
              </h3>
              <select
                value={selectedDeal.stage}
                onChange={(e) => moveToStage(selectedDeal.id, e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: "#E5E7EB" }}
              >
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
