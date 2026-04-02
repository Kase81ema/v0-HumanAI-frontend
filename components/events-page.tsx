"use client"

import { useState } from "react"
import { Plus, ChevronDown, ChevronUp, ExternalLink, Download, Send, Edit2, Upload, Users, MoreHorizontal, Copy, Archive, FileText, Check, X } from "lucide-react"

interface EventAttendee {
  id: string
  initials: string
  name: string
  company: string
  date: string
  source: "LinkedIn" | "Email" | "Form"
  status: "Confermato" | "In attesa"
  checkedIn?: boolean
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
  registrationLink?: string
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
    registrationLink: "https://humanai.ch/events/workshop-ai-leadership",
    attendees: [
      { id: "a1", initials: "SM", name: "Sara Müller", company: "SwissAI Lab", date: "12 mar", source: "LinkedIn", status: "Confermato", checkedIn: false },
      { id: "a2", initials: "MB", name: "Marco Bianchi", company: "ETH", date: "15 mar", source: "Email", status: "Confermato", checkedIn: false },
      { id: "a3", initials: "AK", name: "Anna Keller", company: "UBS", date: "18 mar", source: "Form", status: "Confermato", checkedIn: false },
      { id: "a4", initials: "LP", name: "Luca Ponti", company: "Freelance", date: "20 mar", source: "LinkedIn", status: "Confermato", checkedIn: false },
      { id: "a5", initials: "GF", name: "Giulia Ferrari", company: "SUPSI", date: "22 mar", source: "Email", status: "In attesa", checkedIn: false },
      { id: "a6", initials: "RC", name: "Roberto Chen", company: "InnovaTicino", date: "25 mar", source: "Form", status: "Confermato", checkedIn: false },
      { id: "a7", initials: "ML", name: "Maria Lopez", company: "Deloitte", date: "28 mar", source: "LinkedIn", status: "Confermato", checkedIn: false },
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
    registrationLink: "https://humanai.ch/events/webinar-ai-pmi",
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
    registrationLink: "https://humanai.ch/events/meetup-ai-4",
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
  const [showEventMenu, setShowEventMenu] = useState(false)
  const [attendees, setAttendees] = useState<EventAttendee[]>(events[0].attendees)
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
  const [linkCopied, setLinkCopied] = useState(false)

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "iscritti", label: `Iscritti (${selectedEvent.registered})` },
    { id: "promozione", label: "Promozione" },
    { id: "post-evento", label: "Post-evento" },
    { id: "logistica", label: "Logistica" },
    { id: "progettazione", label: "Progettazione" },
  ]

  const isCritical = selectedEvent.fillRate < 40 && parseInt(selectedEvent.countdown.replace("D-", "")) < 20

  const toggleCheckIn = (attendeeId: string) => {
    setAttendees(prev => prev.map(a => 
      a.id === attendeeId ? { ...a, checkedIn: !a.checkedIn } : a
    ))
  }

  const markAllPresent = () => {
    setAttendees(prev => prev.map(a => ({ ...a, checkedIn: true })))
  }

  const toggleAttendeeSelection = (attendeeId: string) => {
    setSelectedAttendees(prev => 
      prev.includes(attendeeId) 
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    )
  }

  const copyRegistrationLink = () => {
    if (selectedEvent.registrationLink) {
      navigator.clipboard.writeText(selectedEvent.registrationLink)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }

  const checkedInCount = attendees.filter(a => a.checkedIn).length

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
                  setAttendees(event.attendees)
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
          <div className="flex items-start gap-4">
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
            {/* NEW: Event Menu */}
            <div className="relative">
              <button
                onClick={() => setShowEventMenu(!showEventMenu)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB" }}
              >
                <MoreHorizontal className="h-5 w-5" style={{ color: "#7C8CA2" }} />
              </button>
              {showEventMenu && (
                <div
                  className="absolute right-0 top-full z-10 mt-1 w-56 rounded-lg border bg-white py-1 shadow-lg"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-[13px] transition-colors hover:bg-gray-50"
                    style={{ color: "#1B2B4B" }}
                    onClick={() => setShowEventMenu(false)}
                  >
                    <Copy className="h-4 w-4" />
                    Duplica evento
                  </button>
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-[13px] transition-colors hover:bg-gray-50"
                    style={{ color: "#1B2B4B" }}
                    onClick={() => setShowEventMenu(false)}
                  >
                    <FileText className="h-4 w-4" />
                    Crea template da evento
                  </button>
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-[13px] transition-colors hover:bg-gray-50"
                    style={{ color: "#1B2B4B" }}
                    onClick={() => setShowEventMenu(false)}
                  >
                    <Download className="h-4 w-4" />
                    Esporta report
                  </button>
                  <div className="my-1 border-t" style={{ borderColor: "#E5E7EB" }} />
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-[13px] transition-colors hover:bg-gray-50"
                    style={{ color: "#EF4444" }}
                    onClick={() => setShowEventMenu(false)}
                  >
                    <Archive className="h-4 w-4" />
                    Archivia evento
                  </button>
                </div>
              )}
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
            {/* Share Report Button */}
            <div className="flex justify-end">
              <button
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
              >
                <ExternalLink className="h-4 w-4" />
                Condividi report
              </button>
            </div>

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
              <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                  Da LinkedIn
                </p>
                <p className="text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
                  3
                </p>
              </div>
              <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                  Da Email
                </p>
                <p className="text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
                  2
                </p>
              </div>
              <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                  Diretti
                </p>
                <p className="text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
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
            {/* WhatsApp Group Link Banner */}
            <div
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{ backgroundColor: "#D1FAE5", border: "1px solid #6EE7B7" }}
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#059669">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-[13px] font-medium" style={{ color: "#059669" }}>
                  Gruppo WhatsApp evento disponibile
                </span>
              </div>
              <button
                onClick={() => window.open("https://chat.whatsapp.com/ABC123workshop", "_blank")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                Apri gruppo
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
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
              {/* Check-in Actions */}
              <div className="flex items-center gap-3">
                <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                  Check-in: {checkedInCount}/{attendees.length}
                </span>
                <button
                  onClick={markAllPresent}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors hover:bg-green-50"
                  style={{ borderColor: "#10B981", color: "#10B981" }}
                >
                  <Check className="h-3.5 w-3.5" />
                  Segna tutti presenti
                </button>
              </div>
            </div>

            {/* Batch Actions for Selected Attendees */}
            {selectedAttendees.length > 0 && (
              <div
                className="flex items-center justify-between rounded-lg px-4 py-3"
                style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}
              >
                <span className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                  {selectedAttendees.length} iscritti selezionati
                </span>
                <div className="flex gap-2">
                  <button
                    className="rounded-lg border bg-white px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                  >
                    Invia email
                  </button>
                  <button
                    onClick={() => setSelectedAttendees([])}
                    className="rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{ color: "#EF4444" }}
                  >
                    Deseleziona
                  </button>
                </div>
              </div>
            )}

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
              {/* Table Header */}
              <div
                className="grid items-center gap-4 border-b px-4 py-3"
                style={{ borderColor: "#E5E7EB", gridTemplateColumns: "32px 1fr 120px 100px 100px 80px" }}
              >
                <span></span>
                <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Partecipante
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Data iscrizione
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Fonte
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Stato
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-center" style={{ color: "#7C8CA2" }}>
                  Check-in
                </span>
              </div>

              {attendees.map((attendee, index) => (
                <div
                  key={attendee.id}
                  className="grid items-center gap-4 border-b px-4 py-3 transition-colors hover:bg-gray-50"
                  style={{ 
                    borderColor: index === attendees.length - 1 ? "transparent" : "#E5E7EB",
                    gridTemplateColumns: "32px 1fr 120px 100px 100px 80px"
                  }}
                >
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => toggleAttendeeSelection(attendee.id)}
                    className="flex h-5 w-5 items-center justify-center rounded border transition-colors"
                    style={{
                      borderColor: selectedAttendees.includes(attendee.id) ? "#2563EB" : "#E5E7EB",
                      backgroundColor: selectedAttendees.includes(attendee.id) ? "#2563EB" : "transparent",
                    }}
                  >
                    {selectedAttendees.includes(attendee.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </button>

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

                  <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                    {attendee.date}
                  </span>

                  <span
                    className="w-fit rounded px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: sourceColors[attendee.source].bg,
                      color: sourceColors[attendee.source].text,
                    }}
                  >
                    {attendee.source}
                  </span>

                  <span
                    className="w-fit rounded px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: attendee.status === "Confermato" ? "#D1FAE5" : "#FEF3C7",
                      color: attendee.status === "Confermato" ? "#059669" : "#D97706",
                    }}
                  >
                    {attendee.status}
                  </span>

                  {/* NEW: Check-in Checkbox */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleCheckIn(attendee.id)}
                      className="flex h-6 w-6 items-center justify-center rounded border-2 transition-colors"
                      style={{
                        borderColor: attendee.checkedIn ? "#10B981" : "#E5E7EB",
                        backgroundColor: attendee.checkedIn ? "#10B981" : "transparent",
                      }}
                    >
                      {attendee.checkedIn && <Check className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                </div>
              ))}

              {attendees.length === 0 && (
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
            {/* NEW: Copy Registration Link */}
            <div className="flex items-center justify-between rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                  Link registrazione
                </p>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                  {selectedEvent.registrationLink}
                </p>
              </div>
              <button
                onClick={copyRegistrationLink}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors"
                style={{
                  backgroundColor: linkCopied ? "#D1FAE5" : "#EFF6FF",
                  color: linkCopied ? "#059669" : "#2563EB",
                }}
              >
                {linkCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copiato!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copia link
                  </>
                )}
              </button>
            </div>

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
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            email.status === "done"
                              ? "#10B981"
                              : email.status === "scheduled"
                              ? "#F59E0B"
                              : "#D1D5DB",
                        }}
                      />
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                          {email.name}
                        </p>
                        <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          {email.sent ? `Inviata ${email.date}` : `Programmata ${email.date}`}
                        </p>
                      </div>
                    </div>
                    {email.openRate && (
                      <span className="text-[12px] font-medium" style={{ color: "#059669" }}>
                        {email.openRate}% open rate
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Posts */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Post collegati
              </h3>
              <div className="space-y-2">
                {[
                  { title: "Promo Workshop — LinkedIn personale", status: "Pubblicato", date: "5 mar" },
                  { title: "Promo Workshop — LinkedIn aziendale", status: "Programmato", date: "10 apr" },
                ].map((post, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[16px]">&#128221;</span>
                      <div>
                        <p className="text-[13px] font-medium hover:underline" style={{ color: "#1B2B4B" }}>
                          {post.title}
                        </p>
                        <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          {post.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: post.status === "Pubblicato" ? "#D1FAE5" : "#FEF3C7",
                        color: post.status === "Pubblicato" ? "#059669" : "#D97706",
                      }}
                    >
                      {post.status}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className="mt-2 flex items-center gap-1 text-[13px] hover:underline"
                style={{ color: "#2563EB" }}
              >
                <Plus className="h-4 w-4" />
                Collega post dalla Content Factory
              </button>
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
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                  Nessuna trascrizione disponibile. Le trascrizioni appariranno qui dopo l&apos;evento.
                </p>
              </div>
            </div>

            {/* Content Recycling */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Content recycling
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="rounded-lg border p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <span className="mb-2 block text-[20px]">&#128221;</span>
                  <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                    Genera post recap
                  </p>
                  <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    Crea un post con i momenti salienti
                  </p>
                </button>
                <button
                  className="rounded-lg border p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <span className="mb-2 block text-[20px]">&#127897;</span>
                  <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                    Estrai citazioni
                  </p>
                  <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    Quote degli speaker per social
                  </p>
                </button>
              </div>
            </div>

            {/* NPS */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Feedback (NPS)
              </h3>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                  Il sondaggio NPS verrà inviato 24h dopo l&apos;evento.
                </p>
                <button className="mt-2 text-[13px] hover:underline" style={{ color: "#2563EB" }}>
                  Configura domande NPS
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "logistica" && (
          <div className="space-y-6">
            {/* WhatsApp Group */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Gruppo WhatsApp evento
              </h3>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#D1FAE5" }}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#059669">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Link gruppo WhatsApp
                    </p>
                    <input
                      type="text"
                      placeholder="https://chat.whatsapp.com/..."
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-500"
                      style={{ borderColor: "#E5E7EB" }}
                      defaultValue="https://chat.whatsapp.com/ABC123workshop"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => window.open("https://chat.whatsapp.com/ABC123workshop", "_blank")}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium text-white transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    Apri gruppo
                  </button>
                  <button
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copia link
                  </button>
                  <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    Il link appare automaticamente nel tab Iscritti e nelle email di conferma
                  </p>
                </div>
              </div>
            </div>

            {/* Speakers */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Speaker
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold text-white"
                      style={{ backgroundColor: "#2563EB" }}
                    >
                      EC
                    </div>
                    <div>
                      <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                        Emanuele Casero
                      </p>
                      <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                        Host & Facilitatore
                      </p>
                    </div>
                  </div>
                  <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                    Modifica
                  </button>
                </div>
              </div>
              <button className="mt-2 flex items-center gap-1 text-[13px] hover:underline" style={{ color: "#2563EB" }}>
                <Plus className="h-4 w-4" />
                Aggiungi speaker
              </button>
            </div>

            {/* Agenda */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Agenda
              </h3>
              <div className="space-y-2">
                {[
                  { time: "09:00", title: "Registrazione e welcome coffee" },
                  { time: "09:30", title: "Introduzione all'AI & Leadership" },
                  { time: "10:30", title: "Coffee break" },
                  { time: "10:45", title: "Workshop interattivo" },
                  { time: "12:30", title: "Q&A e networking lunch" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border p-3"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <span className="text-[13px] font-medium" style={{ color: "#2563EB" }}>
                      {item.time}
                    </span>
                    <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Materiali
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px]">&#128196;</span>
                    <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                      Slide presentazione.pdf
                    </span>
                  </div>
                  <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                    Download
                  </button>
                </div>
              </div>
              <button className="mt-2 flex items-center gap-1 text-[13px] hover:underline" style={{ color: "#2563EB" }}>
                <Upload className="h-4 w-4" />
                Carica materiale
              </button>
            </div>
          </div>
        )}

        {/* Progettazione Tab */}
        {activeTab === "progettazione" && (
          <div className="space-y-6">
            <div className="rounded-lg border p-6" style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}>
              <h3 className="mb-4 text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                Modalità progettazione
              </h3>
              <p className="text-[13px] mb-6" style={{ color: "#7C8CA2" }}>
                Lo Strategist ti guida nella pianificazione strutturata dell'evento. Rispondi alle domande seguenti per definire il concept, il messaggio e i KPI dell'evento.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Obiettivo primario dell'evento", placeholder: "Es: Acquisire 20 nuovi contatti qualificati", section: "concept" },
                  { label: "Pubblico target", placeholder: "Es: CTOe CIO di aziende 50-500 dipendenti", section: "concept" },
                  { label: "Messaggio chiave", placeholder: "Es: AI come amplificatore di potenziale umano", section: "concept" },
                  { label: "KPI di successo", placeholder: "Es: 30 registrazioni, 80% fill rate, 5 deal da contatti", section: "kpi" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-[12px] font-medium mb-2" style={{ color: "#1B2B4B" }}>
                      {field.label}
                    </label>
                    <textarea
                      placeholder={field.placeholder}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  className="flex-1 px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  Genera piano dettagliato con Strategist
                </button>
                <button
                  className="px-4 py-2 rounded-lg border font-medium"
                  style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                >
                  Salva bozza
                </button>
              </div>
            </div>

            {/* Generated Plan */}
            <div className="rounded-lg border p-6" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="mb-4 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                Piano generato dallo Strategist
              </h3>
              <div className="space-y-3 text-[13px]" style={{ color: "#7C8CA2" }}>
                <p>
                  <strong style={{ color: "#1B2B4B" }}>Fasi proposte:</strong> 1) Teaser 2 settimane prima, 2) Email sequenze personalizzate, 3) Post LinkedIn con testimonial, 4) Reminder 48h, 5) Follow-up post-evento
                </p>
                <p>
                  <strong style={{ color: "#1B2B4B" }}>Budget stimato:</strong> CHF 2'500 (location, catering, tech, promo)
                </p>
                <p>
                  <strong style={{ color: "#1B2B4B" }}>Timeline critica:</strong> Annuncio lunedì, iscrizioni fino a giovedì, invio agenda venerdì
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
