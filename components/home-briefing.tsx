"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { FloatingAgentAvatar } from "./floating-agent-avatar"

// Active agents for mini-avatars display
const activeAgents = [
  { initials: "CW", name: "Copywriter" },
  { initials: "PL", name: "Planner" },
  { initials: "ST", name: "Strategist" },
  { initials: "FN", name: "Funnel" },
  { initials: "SA", name: "Sales" },
  { initials: "EV", name: "Evento" },
]

// Alert data
const alerts = [
  {
    id: 1,
    type: "danger" as const,
    text: "Workshop 15 aprile: fill rate 28% — promozione urgente",
    action: "Promuovi",
    time: "2h fa",
  },
  {
    id: 2,
    type: "danger" as const,
    text: "3 contenuti in attesa di approvazione da 4 giorni",
    action: "Approva",
    time: "6h fa",
  },
  {
    id: 3,
    type: "warning" as const,
    text: "Mario Rossi (S4): nessun follow-up da 8 giorni",
    action: "Chiama",
    time: "stamattina",
  },
]

// KPI data
const kpis = [
  {
    label: "Newsletter",
    value: "142",
    trend: "+12",
    target: 200,
    current: 142,
    threshold: { value: 200, label: "Content marketing viabile" },
  },
  {
    label: "Contatti qualificati",
    value: "38",
    trend: "+5",
    target: 100,
    current: 38,
    threshold: { value: 500, label: "Sales scalabile" },
  },
  {
    label: "Eventi completati",
    value: "6",
    trend: "+1",
    target: 20,
    current: 6,
    threshold: { value: 20, label: "Revenue eventi stabile" },
  },
  {
    label: "Revenue CHF",
    value: "CHF 4'200",
    trend: "+800",
    target: 8000,
    current: 4200,
    threshold: null,
  },
]

// Agent work data with destination info
const agentWork = [
  {
    id: 1,
    agent: "Copywriter",
    initials: "CW",
    output: "Post R1: «Come cambierà il mio lavoro con l'AI?»",
    time: "stanotte",
    link: "content",
    destination: "Content Factory",
  },
  {
    id: 2,
    agent: "Planner",
    initials: "PL",
    output: "Piano editoriale settimana 15 (14 contenuti su 5 canali)",
    time: "stanotte",
    link: "editorial",
    destination: "Piano editoriale",
  },
  {
    id: 3,
    agent: "Strategist",
    initials: "ST",
    output: "Briefing: fill rate workshop critico, 4 azioni suggerite",
    time: "08:00",
    link: "command",
    destination: "Centro di Comando",
  },
  {
    id: 4,
    agent: "Funnel",
    initials: "FN",
    output: "Lead escalato: Claudia Bernasconi → Sales (score 14, 3 eventi)",
    time: "03:00",
    link: "crm",
    destination: "Contatti & CRM",
  },
]

// Content to approve (compacted for right column)
const contentToApprove = [
  {
    id: 1,
    title: "R1 — AI e coaching: una domanda che vale",
    channel: "LinkedIn",
  },
  {
    id: 2,
    title: "Newsletter: Quando l'AI sbaglia",
    channel: "Beehiiv",
  },
  {
    id: 3,
    title: "Email follow-up Claudia B.",
    channel: "Email",
  },
]

// Events data
const events = [
  {
    id: 1,
    type: "Workshop",
    name: "AI & Leadership",
    date: "15 apr",
    countdown: "D-15",
    enrolled: 7,
    target: 25,
    fillRate: 28,
    critical: true,
  },
  {
    id: 2,
    type: "Webinar",
    name: "AI per PMI",
    date: "22 apr",
    countdown: "D-22",
    enrolled: 13,
    target: 20,
    fillRate: 65,
    critical: false,
  },
]

// Hot contacts data
const hotContacts = [
  {
    id: 1,
    name: "Sara Muller",
    company: "SwissAI Lab",
    stage: "S4",
    action: "Negoziazione",
  },
  {
    id: 2,
    name: "Mario Rossi",
    company: "TechnoSwiss",
    stage: "S4",
    action: "Discovery call",
  },
  {
    id: 3,
    name: "Claudia B.",
    company: "Banca Lugano",
    stage: "S3",
    action: "Follow-up",
  },
]

// Processes data
const processes = [
  {
    id: 1,
    title: "Promozione Workshop 15/4",
    progress: 40,
    status: "running",
  },
  {
    id: 2,
    title: "Post AI+recruiting",
    progress: 50,
    status: "paused",
  },
]

interface HomeBriefingProps {
  onNavigate: (id: string) => void
}

export function HomeBriefing({ onNavigate }: HomeBriefingProps) {
  return (
    <div className="flex h-full gap-6 overflow-auto p-6">
      {/* Main Column - 70% */}
      <div className="flex w-[70%] flex-col gap-6">
        {/* Section 1 - Greeting with Project Selector */}
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-[22px] font-bold"
              style={{ color: "#1B2B4B" }}
            >
              Buongiorno Emanuele
            </h1>
            <p className="text-[14px]" style={{ color: "#7C8CA2" }}>
              Martedi 1 aprile - 3 azioni urgenti - 3 contenuti da approvare
            </p>
          </div>
          {/* Project Selector */}
          <button 
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
          >
            Progetto: HumanAImpact
            <ChevronDown className="h-4 w-4" style={{ color: "#7C8CA2" }} />
          </button>
        </div>

        {/* Section 2 - Alerts */}
        <div className="flex flex-col gap-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{
                backgroundColor:
                  alert.type === "danger" ? "#FEF2F2" : "#FFFBEB",
                border: `1px solid ${
                  alert.type === "danger"
                    ? "rgba(220, 38, 38, 0.2)"
                    : "rgba(217, 119, 6, 0.2)"
                }`,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      alert.type === "danger" ? "#DC2626" : "#D97706",
                  }}
                />
                <span className="text-[14px]" style={{ color: "#1B2B4B" }}>
                  {alert.text}
                </span>
                <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                  {alert.time}
                </span>
              </div>
              <button
                className="flex items-center gap-1 text-[14px] font-medium transition-opacity hover:opacity-80"
                style={{ color: "#2563EB" }}
              >
                {alert.action}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Section 3 - KPIs */}
        <div>
          <h2
            className="mb-4 text-[12px] font-semibold uppercase tracking-wider"
            style={{ color: "#7C8CA2" }}
          >
            Indicatori e soglie di crescita
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {kpis.map((kpi, index) => {
              const percentage = Math.round((kpi.current / kpi.target) * 100)
              const barColor =
                percentage >= 70
                  ? "#059669"
                  : percentage >= 40
                    ? "#D97706"
                    : "#DC2626"

              return (
                <div
                  key={index}
                  className="rounded-lg bg-white p-4"
                  style={{ border: "1px solid #E5E7EB" }}
                >
                  <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                    {kpi.label}
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span
                      className="text-[24px] font-bold"
                      style={{ color: "#1B2B4B" }}
                    >
                      {kpi.value}
                    </span>
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: "#059669" }}
                    >
                      ^ {kpi.trend}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div
                      className="h-1.5 flex-1 rounded-full"
                      style={{ backgroundColor: "#E5E7EB" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>
                    <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                      {percentage}%
                    </span>
                  </div>
                  {kpi.threshold && (
                    <div
                      className="mt-2 rounded px-2 py-1"
                      style={{ backgroundColor: "#F3F4F6" }}
                    >
                      <span className="text-[10px]" style={{ color: "#7C8CA2" }}>
                        Soglia {kpi.threshold.value}: {kpi.threshold.label} (
                        {percentage}%)
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 4 - Agent Work with destination indicators */}
        <div>
          <div className="mb-4">
            <h2
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: "#7C8CA2" }}
            >
              Il tuo team AI ha lavorato stanotte
            </h2>
            {/* Mini avatars row */}
            <div className="mt-2 flex items-center gap-1">
              {activeAgents.map((agent) => (
                <div
                  key={agent.initials}
                  className="flex h-[24px] w-[24px] items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: "#2563EB" }}
                  title={agent.name}
                >
                  {agent.initials}
                </div>
              ))}
              <span className="ml-2 text-[11px]" style={{ color: "#7C8CA2" }}>
                6 agenti attivi
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {agentWork.map((work) => (
              <button
                key={work.id}
                onClick={() => onNavigate(work.link)}
                className="flex w-full items-center gap-3 rounded-lg bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                >
                  {work.initials}
                </div>
                <div className="flex-1">
                  <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                    <strong>{work.agent}:</strong> {work.output}
                  </span>
                  <span className="ml-2 text-[11px]" style={{ color: "#2563EB" }}>
                    → {work.destination}
                  </span>
                </div>
                <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                  {work.time}
                </span>
                <ArrowRight className="h-4 w-4" style={{ color: "#7C8CA2" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - 30% */}
      <div className="flex w-[30%] flex-col gap-5">
        {/* Card 1 - Upcoming Events */}
        <div
          className="rounded-lg bg-white p-4"
          style={{ border: "1px solid #E5E7EB" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: "#7C8CA2" }}
            >
              Eventi prossimi
            </h3>
            <button
              onClick={() => onNavigate("events")}
              className="flex items-center gap-1 text-[12px] font-medium transition-opacity hover:opacity-80"
              style={{ color: "#2563EB" }}
            >
              Tutti
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-lg p-3"
                style={{
                  border: event.critical
                    ? "1px solid rgba(220, 38, 38, 0.3)"
                    : "1px solid #E5E7EB",
                  backgroundColor: event.critical ? "#FEF2F2" : "white",
                }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="rounded px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor:
                        event.type === "Workshop" ? "#EDE9FE" : "#DBEAFE",
                      color: event.type === "Workshop" ? "#7C3AED" : "#2563EB",
                    }}
                  >
                    {event.type}
                  </span>
                  <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    {event.countdown}
                  </span>
                </div>
                <h4
                  className="mt-2 text-[13px] font-semibold"
                  style={{ color: "#1B2B4B" }}
                >
                  {event.name}
                </h4>
                <p className="mt-1 text-[12px]" style={{ color: "#7C8CA2" }}>
                  {event.date} - {event.enrolled}/{event.target} iscritti
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="h-1.5 flex-1 rounded-full"
                    style={{ backgroundColor: "#E5E7EB" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${event.fillRate}%`,
                        backgroundColor:
                          event.fillRate < 40
                            ? "#DC2626"
                            : event.fillRate > 70
                              ? "#059669"
                              : "#D97706",
                      }}
                    />
                  </div>
                  <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    {event.fillRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 - Hot Contacts */}
        <div
          className="rounded-lg bg-white p-4"
          style={{ border: "1px solid #E5E7EB" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: "#7C8CA2" }}
            >
              Contatti caldi
            </h3>
            <button
              onClick={() => onNavigate("crm")}
              className="flex items-center gap-1 text-[12px] font-medium transition-opacity hover:opacity-80"
              style={{ color: "#2563EB" }}
            >
              CRM
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {hotContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p
                    className="text-[13px] font-semibold"
                    style={{ color: "#1B2B4B" }}
                  >
                    {contact.name}
                  </p>
                  <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    {contact.company}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="rounded px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor:
                        contact.stage === "S4" ? "#DBEAFE" : "#E0F2FE",
                      color: contact.stage === "S4" ? "#2563EB" : "#0284C7",
                    }}
                  >
                    {contact.stage}
                  </span>
                  <span className="text-[11px]" style={{ color: "#2563EB" }}>
                    {contact.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3 - Content to Approve (moved from main column) */}
        <div
          className="rounded-lg bg-white p-4"
          style={{ border: "1px solid #E5E7EB" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: "#7C8CA2" }}
            >
              Da approvare
            </h3>
            <span 
              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
            >
              3
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {contentToApprove.map((content) => (
              <button
                key={content.id}
                onClick={() => onNavigate("approval")}
                className="flex items-center justify-between rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <span 
                  className="text-[12px] font-medium truncate flex-1"
                  style={{ color: "#1B2B4B" }}
                >
                  {content.title}
                </span>
                <span 
                  className="ml-2 text-[10px] px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                >
                  {content.channel}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => onNavigate("approval")}
            className="mt-3 flex w-full items-center justify-center gap-1 text-[12px] font-medium transition-opacity hover:opacity-80"
            style={{ color: "#2563EB" }}
          >
            Approva tutti
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Card 4 - Active Processes */}
        <div
          className="rounded-lg bg-white p-4"
          style={{ border: "1px solid #E5E7EB" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: "#7C8CA2" }}
            >
              Processi attivi
            </h3>
            <button
              onClick={() => onNavigate("board")}
              className="flex items-center gap-1 text-[12px] font-medium transition-opacity hover:opacity-80"
              style={{ color: "#2563EB" }}
            >
              Board
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {processes.map((process) => (
              <div key={process.id} className="flex items-center gap-3">
                {/* Circular Progress */}
                <div className="relative h-[32px] w-[32px]">
                  <svg className="h-full w-full -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke={process.status === "paused" ? "#7C3AED" : "#2563EB"}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${(process.progress / 100) * 88} 88`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold"
                    style={{ color: "#1B2B4B" }}
                  >
                    {process.progress}%
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-[12px] font-semibold"
                    style={{ color: "#1B2B4B" }}
                  >
                    {process.title}
                  </p>
                  {process.status === "paused" && (
                    <p className="text-[10px]" style={{ color: "#7C3AED" }}>
                      In attesa
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Agent Avatar */}
      <FloatingAgentAvatar initials="ST" agentName="Strategist" />
    </div>
  )
}
