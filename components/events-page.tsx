"use client"

import { useState } from "react"
import { Plus, ChevronDown, ChevronUp, ExternalLink, Download, Send, Edit2, Upload, Users } from "lucide-react"

interface EventAttendee {
  id: string
  initials: string
  name: string
  company: string
  date: string
  source: "LinkedIn" | "Email" | "Form"
  status: "Confermato" | "In attesa"
}

interface Event {
  id: string
  type: "Workshop" | "Webinar" | "Meetup"
  name: string
  date: string
  countdown: string
  fillRate: number
  registered: number
  capacity: number
  location: string
  attendees: EventAttendee[]
}

const events: Event[] = [
  {
    id: "1",
    type: "Workshop",
    name: "Workshop AI & Leadership",
    date: "15 aprile 2025",
    countdown: "D-15",
    fillRate: 28,
    registered: 7,
    capacity: 25,
    location: "Centro Congressi Lugano",
    attendees: [
      { id: "a1", initials: "SM", name: "Sara Müller", company: "SwissAI Lab", date: "12 mar", source: "LinkedIn", status: "Confermato" },
      { id: "a2", initials: "MB", name: "Marco Bianchi", company: "ETH", date: "15 mar", source: "Email", status: "Confermato" },
      { id: "a3", initials: "AK", name: "Anna Keller", company: "UBS", date: "18 mar", source: "Form", status: "Confermato" },
      { id: "a4", initials: "LP", name: "Luca Ponti", company: "Freelance", date: "20 mar", source: "LinkedIn", status: "Confermato" },
      { id: "a5", initials: "GF", name: "Giulia Ferrari", company: "SUPSI", date: "22 mar", source: "Email", status: "In attesa" },
      { id: "a6", initials: "RC", name: "Roberto Chen", company: "InnovaTicino", date: "25 mar", source: "Form", status: "Confermato" },
      { id: "a7", initials: "ML", name: "Maria Lopez", company: "Deloitte", date: "28 mar", source: "LinkedIn", status: "Confermato" },
    ],
  },
  {
    id: "2",
    type: "Webinar",
    name: "Webinar AI per PMI",
    date: "22 aprile 2025",
    countdown: "D-22",
    fillRate: 65,
    registered: 32,
    capacity: 50,
    location: "Online (Zoom)",
    attendees: [],
  },
  {
    id: "3",
    type: "Meetup",
    name: "Meetup AI Lugano #4",
    date: "8 maggio 2025",
    countdown: "D-38",
    fillRate: 0,
    registered: 0,
    capacity: 30,
    location: "Spazio Coworking Lugano",
    attendees: [],
  },
]

const typeColors: Record<string, { bg: string; text: string }> = {
  Workshop: { bg: "#EDE9FE", text: "#7C3AED" },
  Webinar: { bg: "#DBEAFE", text: "#2563EB" },
  Meetup: { bg: "#F3F4F6", text: "#6B7280" },
}

const sourceColors: Record<string, { bg: string; text: string }> = {
  LinkedIn: { bg: "#DBEAFE", text: "#1D4ED8" },
  Email: { bg: "#FEF3C7", text: "#D97706" },
  Form: { bg: "#D1FAE5", text: "#059669" },
}

export function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event>(events[0])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [listFilter, setListFilter] = useState("prossimi")
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "iscritti", label: `Iscritti (${selectedEvent.registered})` },
    { id: "promozione", label: "Promozione" },
    { id: "post-evento", label: "Post-evento" },
    { id: "logistica", label: "Logistica" },
  ]

  const isCritical = selectedEvent.fillRate < 40 && parseInt(selectedEvent.countdown.replace("D-", "")) < 20

  return (
    <div className="flex h-full">
      {/* Left Panel - Events List */}
      <div
        className="h-full w-[280px] shrink-0 overflow-y-auto border-r"
        style={{ borderColor: "#E5E7EB", backgroundColor: "white" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "#E5E7EB" }}>
          <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
            Eventi
          </h2>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: "#2563EB" }}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-1 border-b p-2" style={{ borderColor: "#E5E7EB" }}>
          {[
            { id: "prossimi", label: "Prossimi (3)" },
            { id: "passati", label: "Passati (6)" },
            { id: "bozze", label: "Bozze (1)" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setListFilter(filter.id)}
              className="rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors"
              style={{
                backgroundColor: listFilter === filter.id ? "#EFF6FF" : "transparent",
                color: listFilter === filter.id ? "#2563EB" : "#7C8CA2",
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="p-2">
          {events.map((event) => {
            const eventCritical = event.fillRate < 40 && parseInt(event.countdown.replace("D-", "")) < 20
            return (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event)
                  setActiveTab("dashboard")
                }}
                className="mb-2 w-full rounded-lg p-3 text-left transition-colors"
                style={{
                  backgroundColor: selectedEvent.id === event.id ? "#EFF6FF" : "transparent",
                  border: eventCritical ? "1px solid #FCA5A5" : selectedEvent.id === event.id ? "1px solid #BFDBFE" : "1px solid transparent",
                }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: typeColors[event.type].bg,
                      color: typeColors[event.type].text,
                    }}
                  >
                    {event.type}
                  </span>
                  <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    {event.countdown}
                  </span>
                </div>
                <p className="mb-1 text-[13px] font-semibold" style={{ color: "#1B2B4B" }}>
                  {event.name}
                </p>
                <p className="mb-2 text-[11px]" style={{ color: "#7C8CA2" }}>
                  {event.date}
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: "#E5E7EB" }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${event.fillRate}%`,
                        backgroundColor: event.fillRate < 40 ? "#EF4444" : event.fillRate < 70 ? "#F59E0B" : "#10B981",
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: event.fillRate < 40 ? "#EF4444" : event.fillRate < 70 ? "#F59E0B" : "#10B981" }}
                  >
                    {event.fillRate}%
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right Panel - Event Detail */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Event Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: typeColors[selectedEvent.type].bg,
                  color: typeColors[selectedEvent.type].text,
                }}
              >
                {selectedEvent.type}
              </span>
              <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                {selectedEvent.countdown}
              </span>
            </div>
            <h1 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
              {selectedEvent.name}
            </h1>
            <p className="text-[14px]" style={{ color: "#7C8CA2" }}>
              {selectedEvent.date} · {selectedEvent.location}
            </p>
          </div>
          <div className="text-right">
            <div
              className="text-[48px] font-bold leading-none"
              style={{ color: isCritical ? "#EF4444" : selectedEvent.fillRate < 70 ? "#F59E0B" : "#10B981" }}
            >
              {selectedEvent.fillRate}%
            </div>
            <p className="text-[14px]" style={{ color: "#7C8CA2" }}>
              {selectedEvent.registered}/{selectedEvent.capacity} iscritti
            </p>
            <div className="mt-2 h-3 w-40 rounded-full" style={{ backgroundColor: "#E5E7EB" }}>
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${selectedEvent.fillRate}%`,
                  backgroundColor: isCritical ? "#EF4444" : selectedEvent.fillRate < 70 ? "#F59E0B" : "#10B981",
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-2">
          <button
            className="rounded-lg px-4 py-2 text-[13px] font-medium text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            Promuovi evento
          </button>
          <button
            onClick={() => setShowRegisterForm(true)}
            className="rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
          >
            Registra partecipante
          </button>
          <button
            className="rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
          >
            Morning briefing
          </button>
          <button
            className="rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
          >
            Modifica evento
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b" style={{ borderColor: "#E5E7EB" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2.5 text-[13px] font-medium transition-colors"
              style={{
                color: activeTab === tab.id ? "#2563EB" : "#7C8CA2",
                borderBottom: activeTab === tab.id ? "2px solid #2563EB" : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Chart Placeholder */}
            <div className="rounded-lg border p-6" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="mb-4 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Andamento iscrizioni
              </h3>
              <div
                className="flex h-40 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                  Grafico fill rate nel tempo
                </p>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                  Da LinkedIn
                </p>
                <p className="text-[24px] font-bold" style={{ color: "#1B2B4B" }}>
                  3
                </p>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                  Da Email
                </p>
                <p className="text-[24px] font-bold" style={{ color: "#1B2B4B" }}>
                  2
                </p>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                  Diretti
                </p>
                <p className="text-[24px] font-bold" style={{ color: "#1B2B4B" }}>
                  2
                </p>
              </div>
            </div>

            {/* Comparison */}
            <div className="rounded-lg p-4" style={{ backgroundColor: "#FEF3C7" }}>
              <p className="text-[13px]" style={{ color: "#92400E" }}>
                Media eventi precedenti: <strong>72% fill rate a D-15</strong>
              </p>
              <p className="text-[12px]" style={{ color: "#B45309" }}>
                Attualmente sotto la media del 44%
              </p>
            </div>
          </div>
        )}

        {activeTab === "iscritti" && (
          <div className="space-y-4">
            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowRegisterForm(true)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                <Plus className="h-4 w-4" />
                Registra partecipante
              </button>
              <button
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
              >
                <Download className="h-4 w-4" />
                Esporta CSV
              </button>
              <button
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
              >
                <Send className="h-4 w-4" />
                Invia reminder
              </button>
            </div>

            {/* Register Form Modal */}
            {showRegisterForm && (
              <div className="rounded-lg border p-4" style={{ borderColor: "#2563EB", backgroundColor: "#EFF6FF" }}>
                <h4 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                  Registrazione rapida
                </h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    className="flex-1 rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                  <button
                    className="rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    Registra
                  </button>
                  <button
                    onClick={() => setShowRegisterForm(false)}
                    className="rounded-lg border px-4 py-2 text-[13px] font-medium"
                    style={{ borderColor: "#E5E7EB", color: "#7C8CA2" }}
                  >
                    Annulla
                  </button>
                </div>
              </div>
            )}

            {/* Attendees List */}
            <div className="rounded-lg border" style={{ borderColor: "#E5E7EB" }}>
              {selectedEvent.attendees.map((attendee, index) => (
                <div
                  key={attendee.id}
                  className="flex items-center justify-between border-b px-4 py-3 transition-colors hover:bg-gray-50"
                  style={{ borderColor: index === selectedEvent.attendees.length - 1 ? "transparent" : "#E5E7EB" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: "#93C5FD" }}
                    >
                      {attendee.initials}
                    </div>
                    <div>
                      <button className="text-[14px] font-medium hover:underline" style={{ color: "#1B2B4B" }}>
                        {attendee.name}
                      </button>
                      <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                        {attendee.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      {attendee.date}
                    </span>
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: sourceColors[attendee.source].bg,
                        color: sourceColors[attendee.source].text,
                      }}
                    >
                      {attendee.source}
                    </span>
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: attendee.status === "Confermato" ? "#D1FAE5" : "#FEF3C7",
                        color: attendee.status === "Confermato" ? "#059669" : "#D97706",
                      }}
                    >
                      {attendee.status}
                    </span>
                  </div>
                </div>
              ))}
              {selectedEvent.attendees.length === 0 && (
                <div className="p-8 text-center">
                  <Users className="mx-auto mb-2 h-8 w-8" style={{ color: "#D1D5DB" }} />
                  <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                    Nessun iscritto ancora
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "promozione" && (
          <div className="space-y-6">
            {/* Email Sequence */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Sequenza email
              </h3>
              <div className="space-y-2">
                {[
                  { status: "done", name: "Invito iniziale", date: "1 mar", sent: true, openRate: 45 },
                  { status: "done", name: "Reminder 1", date: "15 mar", sent: true, openRate: 38 },
                  { status: "scheduled", name: "Reminder 2", date: "8 apr", sent: false },
                  { status: "draft", name: "Last call", date: "13 apr", sent: false },
                ].map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[14px]">
                        {email.status === "done" ? "✅" : email.status === "scheduled" ? "⏰" : "📝"}
                      </span>
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                          {email.name}
                        </p>
                        <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                          {email.date} · {email.sent ? "Inviata" : email.status === "scheduled" ? "Programmata" : "Bozza"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {email.openRate && (
                        <span className="text-[12px]" style={{ color: "#059669" }}>
                          Open rate {email.openRate}%
                        </span>
                      )}
                      {!email.sent && (
                        <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                          {email.status === "draft" ? "Apri in Content Factory" : "Modifica"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Posts */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Post promozionali
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px]">✅</span>
                    <div>
                      <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                        Post LinkedIn: Workshop in arrivo
                      </p>
                      <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                        Pubblicato · 234 views · 12 reactions
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px]">📝</span>
                    <div>
                      <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                        Post speaker anticipation
                      </p>
                      <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                        Bozza
                      </p>
                    </div>
                  </div>
                  <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                    Apri in Content Factory
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "post-evento" && (
          <div className="space-y-6">
            {/* Transcriptions */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Trascrizioni Fireflies
              </h3>
              <div className="space-y-2">
                <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[14px]">📞</span>
                    <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Call con Sara Muller · 32 min · 20 mar
                    </p>
                  </div>
                  <p className="mb-2 text-[13px]" style={{ color: "#7C8CA2" }}>
                    Key: Interessata a coaching team. Budget confermato.
                  </p>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-1 text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Apri trascrizione completa
                      <ExternalLink className="h-3 w-3" />
                    </button>
                    <button className="flex items-center gap-1 text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Vai al profilo CRM
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[14px]">📞</span>
                    <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Call con Marco Bianchi · 18 min · 25 mar
                    </p>
                  </div>
                  <p className="mb-2 text-[13px]" style={{ color: "#7C8CA2" }}>
                    Key: Vuole portare 2 colleghi. Chiede sconto gruppo.
                  </p>
                  <button className="flex items-center gap-1 text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                    Apri trascrizione
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Recycling */}
            <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Content recycling
              </h3>
              <button
                className="flex items-center gap-2 rounded-lg px-6 py-3 text-[14px] font-medium text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                <span className="text-[16px]">&#x1F504;</span>
                Genera contenuti post-evento
              </button>
              <p className="mt-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                Crea automaticamente: post recap, newsletter, email di ringraziamento
              </p>
            </div>

            {/* Feedback */}
            <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="mb-2 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Feedback
              </h3>
              <p className="text-[24px] font-bold" style={{ color: "#059669" }}>
                NPS: 8.5/10
              </p>
              <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                Basato su 5 risposte
              </p>
            </div>
          </div>
        )}

        {activeTab === "logistica" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label className="mb-1 block text-[12px] font-semibold" style={{ color: "#7C8CA2" }}>
                  Location
                </label>
                <input
                  type="text"
                  defaultValue={selectedEvent.location}
                  className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "#E5E7EB" }}
                />
              </div>

              {/* Time */}
              <div>
                <label className="mb-1 block text-[12px] font-semibold" style={{ color: "#7C8CA2" }}>
                  Orario
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue="09:00"
                    className="w-24 rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                  <span className="py-2">—</span>
                  <input
                    type="text"
                    defaultValue="17:00"
                    className="w-24 rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
              </div>
            </div>

            {/* Speaker */}
            <div>
              <label className="mb-2 block text-[12px] font-semibold" style={{ color: "#7C8CA2" }}>
                Speaker
              </label>
              <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    EC
                  </div>
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>
                      Emanuele Casero
                    </p>
                    <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      Coach AI & Strategist
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agenda */}
            <div>
              <label className="mb-2 block text-[12px] font-semibold" style={{ color: "#7C8CA2" }}>
                Agenda
              </label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: "#E5E7EB", minHeight: "100px" }}
                defaultValue={`09:00 — Registrazione e welcome coffee
09:30 — Introduzione: AI e leadership oggi
10:30 — Coffee break
10:45 — Workshop pratico: prompt engineering
12:30 — Pranzo
14:00 — Sessione coaching di gruppo
16:00 — Q&A e networking
17:00 — Chiusura`}
              />
            </div>

            {/* Materials */}
            <div>
              <label className="mb-2 block text-[12px] font-semibold" style={{ color: "#7C8CA2" }}>
                Materiali
              </label>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB", borderStyle: "dashed" }}>
                <div className="flex items-center justify-center gap-2">
                  <Upload className="h-5 w-5" style={{ color: "#7C8CA2" }} />
                  <span className="text-[13px]" style={{ color: "#7C8CA2" }}>
                    Trascina file qui o clicca per caricare
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block text-[12px] font-semibold" style={{ color: "#7C8CA2" }}>
                Note operative
              </label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: "#E5E7EB", minHeight: "80px" }}
                placeholder="Aggiungi note operative..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
