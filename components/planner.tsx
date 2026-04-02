"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Calendar, Mail, Zap } from "lucide-react"

interface SequenceStep {
  id: string
  trigger: string
  delay: string
  subject: string
  openRate: number
}

interface Sequence {
  id: string
  name: string
  channel: string
  status: "active" | "paused" | "draft"
  subscribers: number
  steps: SequenceStep[]
  createdDate: string
}

const mockSequences: Sequence[] = []

export function Planner() {
  const [activeTab, setActiveTab] = useState<"sequences" | "calendar">("sequences")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSequenceName, setNewSequenceName] = useState("")

  const channels = ["Email", "LinkedIn", "SMS"]
  const statuses = ["Tutte", "Attive", "In pausa", "Bozza"]

  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Header */}
      <div className="border-b px-8 py-6" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-bold" style={{ color: "var(--color-text-primary)" }}>
              Planner
            </h1>
            <p className="text-base mt-2" style={{ color: "var(--color-text-secondary)" }}>
              Sequenze email e comunicazioni programmate
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ 
              backgroundColor: "var(--color-primary)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <Plus className="h-5 w-5" />
            Nuova sequenza
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b px-8" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex gap-8">
          {[
            { id: "sequences", label: "Sequenze" },
            { id: "calendar", label: "Calendario invii" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "sequences" | "calendar")}
              className="border-b-2 px-1 py-4 text-base font-medium transition-colors"
              style={{
                borderBottomColor: activeTab === tab.id ? "var(--color-primary)" : "transparent",
                color: activeTab === tab.id ? "var(--color-primary)" : "var(--color-text-secondary)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {activeTab === "sequences" && (
          <>
            {mockSequences.length === 0 ? (
              /* Empty State with Guided Onboarding */
              <div className="flex h-full flex-col items-center justify-center py-24 text-center">
                <div
                  className="mb-8 flex h-24 w-24 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--color-primary-light)" }}
                >
                  <Mail className="h-12 w-12" style={{ color: "var(--color-primary)" }} />
                </div>

                <h2 className="text-4xl font-bold mb-3" style={{ color: "var(--color-text-primary)" }}>
                  Nessuna sequenza ancora
                </h2>

                <p className="text-lg mb-8 max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
                  Crea la tua prima sequenza email automatica. Guida i tuoi contatti attraverso un percorso personalizzato con trigger intelligenti.
                </p>

                {/* Feature Cards */}
                <div className="mb-12 grid grid-cols-3 gap-6 w-full max-w-2xl">
                  {[
                    {
                      icon: Zap,
                      title: "Trigger intelligenti",
                      desc: "Attiva email basate su azioni utente",
                    },
                    {
                      icon: Calendar,
                      title: "Timing perfetto",
                      desc: "Pianifica invii con ritardi automatici",
                    },
                    {
                      icon: Mail,
                      title: "Analytics integrata",
                      desc: "Traccia open rate e click rate",
                    },
                  ].map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={idx}
                        className="rounded-lg bg-white p-6 text-left shadow-sm hover:shadow-md transition-shadow"
                        style={{ border: "1px solid var(--color-border)" }}
                      >
                        <div
                          className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                          style={{ backgroundColor: "var(--color-primary-light)" }}
                        >
                          <Icon className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                        </div>
                        <h3 className="text-base font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
                          {feature.title}
                        </h3>
                        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                          {feature.desc}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ 
                    backgroundColor: "var(--color-primary)",
                    boxShadow: "var(--shadow-lg)"
                  }}
                >
                  <Plus className="h-6 w-6" />
                  Crea la tua prima sequenza
                </button>
              </div>
            ) : (
              /* Sequences List */
              <div className="grid gap-6">
                {mockSequences.map((seq) => (
                  <div
                    key={seq.id}
                    className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
                          {seq.name}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                          {seq.steps.length} step • {seq.subscribers} iscritti
                        </p>
                      </div>
                      <span
                        className="rounded-full px-4 py-2 text-sm font-medium"
                        style={{
                          backgroundColor: seq.status === "active" ? "#D1FAE5" : seq.status === "paused" ? "#FEE2E2" : "#F3F4F6",
                          color: seq.status === "active" ? "#059669" : seq.status === "paused" ? "#DC2626" : "#6B7280",
                        }}
                      >
                        {seq.status === "active" ? "Attiva" : seq.status === "paused" ? "In pausa" : "Bozza"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "calendar" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Calendar className="mb-6 h-16 w-16" style={{ color: "var(--color-text-secondary)" }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
              Calendario invii
            </h2>
            <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
              Crea una sequenza per visualizzare qui il calendario dei tuoi invii programmati
            </p>
          </div>
        )}
      </div>

      {/* Create Sequence Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="rounded-lg bg-white p-8 max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>
              Nuova sequenza
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
                Nome sequenza
              </label>
              <input
                type="text"
                placeholder="Es: Welcome series, Nurturing 30gg, Re-engagement"
                value={newSequenceName}
                onChange={(e) => setNewSequenceName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: "var(--color-border)" }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3" style={{ color: "var(--color-text-primary)" }}>
                Canale
              </label>
              <div className="flex gap-3">
                {channels.map((ch) => (
                  <button
                    key={ch}
                    className="flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all border"
                    style={{
                      backgroundColor: "var(--color-bg-secondary)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 rounded-lg px-4 py-3 text-base font-medium transition-colors border"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              >
                Annulla
              </button>
              <button
                className="flex-1 rounded-lg px-4 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Continua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
