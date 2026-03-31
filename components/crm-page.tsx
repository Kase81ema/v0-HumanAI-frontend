"use client"

import { useState } from "react"
import { Search, Phone, Mail, Calendar, ChevronRight, ChevronDown, ExternalLink, Play, Pause, SkipForward, Edit2, Plus } from "lucide-react"

interface Contact {
  id: string
  initials: string
  name: string
  company: string
  role: string
  stage: "Prospect" | "Qualificato" | "Opportunità" | "Cliente"
  score: number
  lastContact: string
  action: string
  email: string
  phone: string
  tags: string[]
  brief: string
  dealValue?: number
  dealProduct?: string
}

const contacts: Contact[] = [
  {
    id: "1",
    initials: "SM",
    name: "Sara Müller",
    company: "SwissAI Lab",
    role: "Head of AI",
    stage: "Opportunità",
    score: 22,
    lastContact: "1 giorno fa",
    action: "Negoziazione",
    email: "s.muller@swissailab.ch",
    phone: "+41 79 123 4567",
    tags: ["AI", "enterprise", "workshop-partecipante", "newsletter", "leadership"],
    brief: "Sara è Head of AI presso SwissAI Lab a Zurigo. Ha partecipato al Webinar AI per PMI dove ha mostrato forte interesse per il coaching di team leadership AI. Budget confermato per Q2. Decisore diretto.",
    dealValue: 12000,
    dealProduct: "Coaching Team AI — 6 sessioni",
  },
  {
    id: "2",
    initials: "MR",
    name: "Mario Rossi",
    company: "TechnoSwiss AG",
    role: "HR Director",
    stage: "Opportunità",
    score: 18,
    lastContact: "8 giorni fa",
    action: "Discovery call",
    email: "m.rossi@technoswiss.ch",
    phone: "+41 79 234 5678",
    tags: ["HR", "AI", "leadership", "enterprise"],
    brief: "Mario guida le risorse umane in TechnoSwiss AG. Interessato a integrare AI nei processi HR e nella formazione manageriale. Ha chiesto demo del coaching AI leadership.",
  },
  {
    id: "3",
    initials: "CB",
    name: "Claudia Bernasconi",
    company: "Banca Lugano",
    role: "L&D Manager",
    stage: "Qualificato",
    score: 14,
    lastContact: "3 giorni fa",
    action: "Follow-up",
    email: "c.bernasconi@bancalugano.ch",
    phone: "+41 79 345 6789",
    tags: ["banking", "L&D", "workshop"],
    brief: "Claudia gestisce la formazione in Banca Lugano. Cerca soluzioni innovative per upskilling su AI. Budget da definire per H2.",
  },
  {
    id: "4",
    initials: "AF",
    name: "Andrea Fontana",
    company: "InnovaTicino",
    role: "CEO",
    stage: "Qualificato",
    score: 11,
    lastContact: "5 giorni fa",
    action: "Proposta",
    email: "a.fontana@innovaticino.ch",
    phone: "+41 79 456 7890",
    tags: ["PMI", "innovation", "CEO"],
    brief: "Andrea guida InnovaTicino, acceleratore locale. Vuole portare AI nelle PMI ticinesi attraverso workshop formativi. Potenziale partner strategico.",
  },
  {
    id: "5",
    initials: "LB",
    name: "Luca Bianchi",
    company: "Helvetia Digital",
    role: "CTO",
    stage: "Prospect",
    score: 7,
    lastContact: "12 giorni fa",
    action: "Nurturing",
    email: "l.bianchi@helvetiadigital.ch",
    phone: "+41 79 567 8901",
    tags: ["tech", "insurance", "digital"],
    brief: "Luca è CTO in Helvetia Digital. Ha scaricato il whitepaper sull'AI. Da qualificare con contenuti mirati.",
  },
  {
    id: "6",
    initials: "TW",
    name: "Thomas Weber",
    company: "Credit Suisse",
    role: "VP HR",
    stage: "Prospect",
    score: 5,
    lastContact: "20 giorni fa",
    action: "Newsletter",
    email: "t.weber@credit-suisse.com",
    phone: "+41 79 678 9012",
    tags: ["banking", "HR", "enterprise"],
    brief: "Thomas segue la newsletter. Ha presentato Sara Müller. Potenziale introduzione ad altri contatti banking.",
  },
  {
    id: "7",
    initials: "FR",
    name: "Francesca Ricci",
    company: "Ariadne Coaching",
    role: "Direttrice",
    stage: "Qualificato",
    score: 9,
    lastContact: "4 giorni fa",
    action: "Partnership",
    email: "f.ricci@ariadnecoaching.ch",
    phone: "+41 79 789 0123",
    tags: ["coaching", "partnership", "network"],
    brief: "Francesca dirige Ariadne Coaching. Interessata a partnership per integrare AI nel coaching tradizionale. Discussione in corso.",
  },
  {
    id: "8",
    initials: "PM",
    name: "Paolo Martini",
    company: "Comune Lugano",
    role: "Resp. Innovazione",
    stage: "Prospect",
    score: 4,
    lastContact: "30 giorni fa",
    action: "Nurturing",
    email: "p.martini@lugano.ch",
    phone: "+41 79 890 1234",
    tags: ["public", "innovation", "local"],
    brief: "Paolo guida l'innovazione nel Comune di Lugano. Contatto freddo, da riattivare con contenuti su AI nel settore pubblico.",
  },
]

const stageColors: Record<string, { bg: string; text: string }> = {
  Prospect: { bg: "#F3F4F6", text: "#6B7280" },
  Qualificato: { bg: "#DBEAFE", text: "#1D4ED8" },
  Opportunità: { bg: "#D1FAE5", text: "#059669" },
  Cliente: { bg: "#FEF3C7", text: "#D97706" },
}

const timelineData = [
  { icon: "phone", text: "Call discovery (32 min) — Note: interessata a coaching team, budget OK", time: "1g fa", link: "Trascrizione Fireflies" },
  { icon: "mail", text: "Email FN2 Step 3 aperta (100% open rate)", time: "3g fa", link: null },
  { icon: "calendar", text: "Ha partecipato al Webinar AI per PMI", time: "1 sett fa", link: null },
  { icon: "mail", text: "Email FN2 Step 2 aperta e cliccata (link: workshop)", time: "2 sett fa", link: null },
  { icon: "news", text: "Iscritta alla newsletter", time: "1 mese fa", link: null },
  { icon: "user", text: "Contatto creato da LinkedIn (Scout Agent)", time: "2 mesi fa", link: null },
]

export function CrmPage() {
  const [view, setView] = useState<"list" | "profile">("list")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [activeTab, setActiveTab] = useState("panoramica")
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("Tutti")
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)
  const [contextOpen, setContextOpen] = useState(true)

  const stages = ["Tutti", "Prospect", "Qualificato", "Opportunità", "Cliente"]
  const tabs = [
    { id: "panoramica", label: "Panoramica" },
    { id: "cronologia", label: "Cronologia" },
    { id: "opportunita", label: "Opportunità" },
    { id: "sequenze", label: "Sequenze" },
    { id: "connessioni", label: "Connessioni" },
    { id: "note", label: "Note" },
  ]

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = stageFilter === "Tutti" || c.stage === stageFilter
    return matchesSearch && matchesStage
  })

  const stageCounts = {
    Tutti: contacts.length,
    Prospect: contacts.filter((c) => c.stage === "Prospect").length,
    Qualificato: contacts.filter((c) => c.stage === "Qualificato").length,
    Opportunità: contacts.filter((c) => c.stage === "Opportunità").length,
    Cliente: contacts.filter((c) => c.stage === "Cliente").length,
  }

  const openProfile = (contact: Contact) => {
    setSelectedContact(contact)
    setView("profile")
    setActiveTab("panoramica")
  }

  if (view === "profile" && selectedContact) {
    return (
      <div className="h-full overflow-y-auto p-6">
        {/* Breadcrumb */}
        <button
          onClick={() => setView("list")}
          className="mb-4 flex items-center gap-1 text-[13px] transition-colors hover:underline"
          style={{ color: "#2563EB" }}
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Contatti & CRM
        </button>

        {/* Profile Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              {selectedContact.initials}
            </div>
            <div>
              <h1 className="text-[22px] font-bold" style={{ color: "#1B2B4B" }}>
                {selectedContact.name}
              </h1>
              <p className="text-[14px]" style={{ color: "#7C8CA2" }}>
                {selectedContact.role}
              </p>
              <button className="text-[14px] hover:underline" style={{ color: "#2563EB" }}>
                {selectedContact.company}
              </button>
              <div className="mt-1 flex items-center gap-4 text-[13px]" style={{ color: "#7C8CA2" }}>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {selectedContact.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {selectedContact.phone}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="rounded-full px-4 py-1.5 text-[13px] font-medium"
              style={{
                backgroundColor: stageColors[selectedContact.stage].bg,
                color: stageColors[selectedContact.stage].text,
              }}
            >
              {selectedContact.stage}
            </div>
            <div
              className="rounded-lg px-3 py-1.5 text-[16px] font-bold"
              style={{ backgroundColor: "#F0FDF4", color: "#059669" }}
            >
              {selectedContact.score}
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#2563EB" }}
              >
                <Phone className="h-4 w-4" />
                Chiama
              </button>
              <button
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
              >
                <Mail className="h-4 w-4" />
                Email
              </button>
              <button
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
              >
                <Calendar className="h-4 w-4" />
                Calendly
              </button>
            </div>
          </div>
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
        <div className="max-w-4xl">
          {activeTab === "panoramica" && (
            <div className="space-y-6">
              {/* Brief */}
              <div className="rounded-lg p-4" style={{ backgroundColor: "#F9FAFB" }}>
                <p className="text-[14px] leading-relaxed" style={{ color: "#1B2B4B" }}>
                  {selectedContact.brief}
                </p>
                <button className="mt-2 text-[13px] hover:underline" style={{ color: "#2563EB" }}>
                  Aggiorna brief
                </button>
              </div>

              {/* Tags */}
              <div>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Tag
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.tags.map((tag) => (
                    <span
                      key={tag}
                      className="cursor-pointer rounded-full px-3 py-1 text-[12px] transition-colors hover:bg-blue-100"
                      style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Actions */}
              <div>
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Azioni suggerite
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border p-4 transition-colors hover:border-blue-300 hover:bg-blue-50" style={{ borderColor: "#E5E7EB" }}>
                    <div className="mb-2 text-[20px]">&#128188;</div>
                    <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Invia proposta coaching team
                    </p>
                    <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Genera con Sales Agent
                    </button>
                  </div>
                  <div className="rounded-lg border p-4 transition-colors hover:border-blue-300 hover:bg-blue-50" style={{ borderColor: "#E5E7EB" }}>
                    <div className="mb-2 text-[20px]">&#128197;</div>
                    <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Invita al Workshop 15 aprile
                    </p>
                    <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Genera invito personalizzato
                    </button>
                  </div>
                  <div className="rounded-lg border p-4 transition-colors hover:border-blue-300 hover:bg-blue-50" style={{ borderColor: "#E5E7EB" }}>
                    <div className="mb-2 text-[20px]">&#128279;</div>
                    <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Connetti con Mario Rossi
                    </p>
                    <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Entrambi interessati a AI+HR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cronologia" && (
            <div className="relative pl-6">
              <div className="absolute bottom-0 left-2 top-0 w-px" style={{ backgroundColor: "#E5E7EB" }} />
              {timelineData.map((item, index) => (
                <div key={index} className="relative mb-6 pb-2">
                  <div
                    className="absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full text-[12px]"
                    style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
                  >
                    {item.icon === "phone" && <Phone className="h-3 w-3" />}
                    {item.icon === "mail" && <Mail className="h-3 w-3" />}
                    {item.icon === "calendar" && <Calendar className="h-3 w-3" />}
                    {item.icon === "news" && "&#128240;"}
                    {item.icon === "user" && "&#128100;"}
                  </div>
                  <div className="ml-4">
                    <p className="text-[14px]" style={{ color: "#1B2B4B" }}>
                      {item.text}
                    </p>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                        {item.time}
                      </span>
                      {item.link && (
                        <button className="flex items-center gap-1 text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                          {item.link}
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "opportunita" && (
            <div className="space-y-6">
              {selectedContact.dealValue && (
                <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                      Deal attivo
                    </h3>
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{ backgroundColor: "#D1FAE5", color: "#059669" }}
                    >
                      Proposta
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-[11px]" style={{ color: "#7C8CA2" }}>Valore</p>
                      <p className="text-[16px] font-bold" style={{ color: "#059669" }}>
                        CHF {selectedContact.dealValue.toLocaleString("it-CH")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px]" style={{ color: "#7C8CA2" }}>Prodotto</p>
                      <p className="text-[13px]" style={{ color: "#1B2B4B" }}>{selectedContact.dealProduct}</p>
                    </div>
                    <div>
                      <p className="text-[11px]" style={{ color: "#7C8CA2" }}>Giorni in stage</p>
                      <p className="text-[13px]" style={{ color: "#1B2B4B" }}>5</p>
                    </div>
                    <div>
                      <p className="text-[11px]" style={{ color: "#7C8CA2" }}>Prossima azione</p>
                      <p className="text-[13px]" style={{ color: "#1B2B4B" }}>Inviare proposta entro venerdì</p>
                    </div>
                  </div>
                  <button className="mt-3 text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                    Vai alla Pipeline
                  </button>
                </div>
              )}

              <div>
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Prodotti suggeriti
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                    <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>Workshop AI & Leadership</p>
                    <p className="text-[13px]" style={{ color: "#059669" }}>CHF 3&apos;500</p>
                    <p className="mt-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                      Match: ha espresso interesse per formazione team durante la call
                    </p>
                  </div>
                  <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                    <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>Coaching Individuale CEO</p>
                    <p className="text-[13px]" style={{ color: "#059669" }}>CHF 8&apos;000</p>
                    <p className="mt-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                      Match: profilo enterprise con budget confermato
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sequenze" && (
            <div className="space-y-6">
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                      FN2 — Nurturing avanzato
                    </h3>
                    <p className="text-[12px]" style={{ color: "#7C8CA2" }}>Sequenza attiva</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[12px] transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <Pause className="h-3 w-3" />
                      Pausa
                    </button>
                    <button
                      className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[12px] transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <SkipForward className="h-3 w-3" />
                      Salta
                    </button>
                    <button
                      className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[12px] transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <Edit2 className="h-3 w-3" />
                      Personalizza
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between text-[12px]">
                    <span style={{ color: "#7C8CA2" }}>Step 3 di 5</span>
                    <span style={{ color: "#2563EB" }}>60%</span>
                  </div>
                  <div className="h-2 w-full rounded-full" style={{ backgroundColor: "#E5E7EB" }}>
                    <div className="h-2 rounded-full" style={{ width: "60%", backgroundColor: "#2563EB" }} />
                  </div>
                </div>
                <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                  Prossima email: <span style={{ color: "#1B2B4B" }}>Step 4 — Case study coaching AI</span> prevista tra 3 giorni
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Storico sequenze
                </h3>
                <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}>
                  <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                    FN1 Nurturing base — completata 1 mese fa
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "connessioni" && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>Presentata da</p>
                <button className="text-[14px] font-medium hover:underline" style={{ color: "#2563EB" }}>
                  Thomas Weber (Credit Suisse)
                </button>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>Stessa azienda</p>
                <p className="text-[14px]" style={{ color: "#1B2B4B" }}>Nessun altro contatto SwissAI Lab nel CRM</p>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>Potenziale connessione</p>
                <button className="text-[14px] font-medium hover:underline" style={{ color: "#2563EB" }}>
                  Mario Rossi (TechnoSwiss)
                </button>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>Stesso interesse: AI + HR leadership</p>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[12px]" style={{ color: "#7C8CA2" }}>Partner collegato</p>
                <p className="text-[14px]" style={{ color: "#1B2B4B" }}>Nessuno</p>
              </div>
            </div>
          )}

          {activeTab === "note" && (
            <div className="space-y-4">
              <div>
                <textarea
                  className="w-full rounded-lg border p-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "#E5E7EB", minHeight: "120px" }}
                  placeholder="Aggiungi una nota..."
                />
                <button
                  className="mt-2 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  Salva nota
                </button>
              </div>
              <div>
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Storico note
                </h3>
                <div className="rounded-lg border p-4" style={{ borderColor: "#E5E7EB" }}>
                  <p className="text-[14px]" style={{ color: "#1B2B4B" }}>
                    Call molto positiva. Budget confermato, decisore diretto. Procedere con proposta formale.
                  </p>
                  <p className="mt-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                    Emanuele Casero — 1g fa
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
            Contatti & CRM
          </h1>
          <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
            {contacts.length} contatti · {contacts.filter((c) => c.stage === "Opportunità").length} lead caldi · {contacts.filter((c) => c.dealValue).length} deal attivi
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#7C8CA2" }} />
            <input
              type="text"
              placeholder="Cerca per nome, azienda, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[280px] rounded-lg border py-2 pl-9 pr-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB" }}
            />
          </div>
          <button
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            <Plus className="h-4 w-4" />
            Nuovo contatto
          </button>
        </div>
      </div>

      {/* Stage Filters */}
      <div className="mb-4 flex gap-2">
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => setStageFilter(stage)}
            className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors"
            style={{
              backgroundColor: stageFilter === stage ? "#2563EB" : "#F3F4F6",
              color: stageFilter === stage ? "white" : "#6B7280",
            }}
          >
            {stage} ({stageCounts[stage as keyof typeof stageCounts]})
          </button>
        ))}
      </div>

      {/* Contacts Table */}
      <div className="rounded-lg border" style={{ borderColor: "#E5E7EB", backgroundColor: "white" }}>
        {/* Table Header */}
        <div
          className="grid items-center gap-4 border-b px-4 py-3 text-[12px] font-semibold uppercase tracking-wide"
          style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 0.5fr 1fr", borderColor: "#E5E7EB", color: "#7C8CA2" }}
        >
          <span>Contatto</span>
          <span>Azienda / Ruolo</span>
          <span>Ultimo contatto</span>
          <span>Stage</span>
          <span>Score</span>
          <span>Azione</span>
        </div>

        {/* Table Rows */}
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="relative grid cursor-pointer items-center gap-4 border-b px-4 py-3 transition-colors"
            style={{
              gridTemplateColumns: "2fr 1.5fr 1fr 1fr 0.5fr 1fr",
              borderColor: "#E5E7EB",
              backgroundColor: hoveredContact === contact.id ? "#F0F9FF" : "transparent",
            }}
            onMouseEnter={() => setHoveredContact(contact.id)}
            onMouseLeave={() => setHoveredContact(null)}
          >
            {/* Contact */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white"
                style={{ backgroundColor: "#93C5FD" }}
              >
                {contact.initials}
              </div>
              <button
                onClick={() => openProfile(contact)}
                className="text-[14px] font-bold hover:underline"
                style={{ color: "#1B2B4B" }}
              >
                {contact.name}
              </button>
            </div>

            {/* Company / Role */}
            <div className="text-[12px]" style={{ color: "#7C8CA2" }}>
              {contact.company} · {contact.role}
            </div>

            {/* Last Contact */}
            <div className="text-[12px]" style={{ color: "#7C8CA2" }}>
              {contact.lastContact}
            </div>

            {/* Stage */}
            <div>
              <span
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  backgroundColor: stageColors[contact.stage].bg,
                  color: stageColors[contact.stage].text,
                }}
              >
                {contact.stage}
              </span>
            </div>

            {/* Score */}
            <div className="text-[14px] font-bold" style={{ color: "#1B2B4B" }}>
              {contact.score}
            </div>

            {/* Action */}
            <button className="flex items-center gap-1 text-[12px] hover:underline" style={{ color: "#2563EB" }}>
              {contact.action}
              <ChevronRight className="h-3 w-3" />
            </button>

            {/* Hover Card */}
            {hoveredContact === contact.id && (
              <div
                className="absolute left-[calc(100%-280px)] top-full z-50 w-[250px] rounded-lg border bg-white p-4 shadow-lg"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    {contact.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold" style={{ color: "#1B2B4B" }}>
                      {contact.name}
                    </p>
                    <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      {contact.company}
                    </p>
                  </div>
                </div>
                <div className="mb-3 grid grid-cols-2 gap-2 text-[12px]">
                  <div>
                    <span style={{ color: "#7C8CA2" }}>Stage: </span>
                    <span style={{ color: "#1B2B4B" }}>{contact.stage}</span>
                  </div>
                  <div>
                    <span style={{ color: "#7C8CA2" }}>Score: </span>
                    <span style={{ color: "#1B2B4B" }}>{contact.score}</span>
                  </div>
                  <div className="col-span-2">
                    <span style={{ color: "#7C8CA2" }}>Ultimo: </span>
                    <span style={{ color: "#1B2B4B" }}>{contact.lastContact}</span>
                  </div>
                  {contact.dealValue && (
                    <div className="col-span-2">
                      <span style={{ color: "#7C8CA2" }}>Deal: </span>
                      <span style={{ color: "#059669" }}>CHF {contact.dealValue.toLocaleString("it-CH")}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => openProfile(contact)}
                  className="flex w-full items-center justify-center gap-1 text-[12px] hover:underline"
                  style={{ color: "#2563EB" }}
                >
                  Apri profilo completo
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
