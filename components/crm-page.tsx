"use client"

import { useState } from "react"
import { Search, Phone, Mail, Calendar, ChevronRight, ChevronDown, ExternalLink, Play, Pause, SkipForward, Edit2, Plus, Upload, MoreHorizontal, Check, Users, Download, X, MessageCircle, Paperclip, Sparkles, AtSign } from "lucide-react"

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
  whatsapp?: string
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
    whatsapp: "+41791234567",
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
    whatsapp: "+41792345678",
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
    whatsapp: "+41793456789",
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
  { icon: "whatsapp", text: "Messaggio WhatsApp inviato: conferma call", time: "2 sett fa", link: null },
  { icon: "news", text: "Iscritta alla newsletter", time: "1 mese fa", link: null },
  { icon: "user", text: "Contatto creato da LinkedIn (Scout Agent)", time: "2 mesi fa", link: null },
]

const activeEvents = [
  { id: "e1", name: "Workshop AI & Leadership", date: "15 aprile" },
  { id: "e2", name: "Webinar AI per PMI", date: "22 aprile" },
  { id: "e3", name: "Meetup AI Lugano #4", date: "8 maggio" },
]

const emailTemplates = [
  { id: "invite", name: "Invito evento", description: "Invito personalizzato con nome evento e data" },
  { id: "followup", name: "Follow-up post-evento", description: "Ringraziamento e prossimi passi" },
  { id: "proposal", name: "Proposta commerciale", description: "Template per offerte e preventivi" },
  { id: "welcome", name: "Benvenuto newsletter", description: "Email di benvenuto per nuovi iscritti" },
  { id: "reactivate", name: "Riattivazione contatto", description: "Per contatti inattivi da tempo" },
  { id: "announcement", name: "Annuncio prodotto/corso", description: "Lancio di nuove offerte" },
]

export function CrmPage() {
  const [view, setView] = useState<"list" | "profile">("list")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [activeTab, setActiveTab] = useState("panoramica")
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("Tutti")
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)
  const [contextOpen, setContextOpen] = useState(true)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [showAddInteractionModal, setShowAddInteractionModal] = useState(false)
  const [showAddToEventDropdown, setShowAddToEventDropdown] = useState(false)
  const [showBatchActions, setShowBatchActions] = useState(false)
  const [showEmailComposer, setShowEmailComposer] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false)
  const [activeSmartFilter, setActiveSmartFilter] = useState<string | null>(null)

  const stages = ["Tutti", "Prospect", "Qualificato", "Opportunità", "Cliente"]
  
  const smartFilters = [
    { id: "hot-leads", label: "Lead caldi senza follow-up", emoji: "🔥" },
    { id: "event-participants", label: "Partecipanti ultimo evento", emoji: "📆" },
    { id: "newsletter-active", label: "Newsletter attivi", emoji: "📰" },
    { id: "with-deal", label: "Con deal attivo", emoji: "💰" },
    { id: "inactive-30", label: "Inattivi 30+ giorni", emoji: "😴" },
  ]
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
    
    // Smart filter logic
    let matchesSmartFilter = true
    if (activeSmartFilter === "hot-leads") {
      matchesSmartFilter = c.score >= 15 && c.lastContact.includes("giorni")
    } else if (activeSmartFilter === "event-participants") {
      matchesSmartFilter = c.tags.includes("workshop-partecipante") || c.tags.includes("workshop")
    } else if (activeSmartFilter === "newsletter-active") {
      matchesSmartFilter = c.tags.includes("newsletter")
    } else if (activeSmartFilter === "with-deal") {
      matchesSmartFilter = !!c.dealValue
    } else if (activeSmartFilter === "inactive-30") {
      matchesSmartFilter = c.lastContact.includes("30") || parseInt(c.lastContact) >= 20
    }
    
    return matchesSearch && matchesStage && matchesSmartFilter
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

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const selectAllContacts = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id))
    }
  }

  const openWhatsApp = (whatsappNumber: string) => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\s/g, '')}`, '_blank')
  }

  const openEmailComposerForSelected = () => {
    setShowEmailComposer(true)
  }

  const selectedContactsData = contacts.filter(c => selectedContacts.includes(c.id))

  // Email Composer Modal
  const EmailComposerModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[680px] max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "var(--color-border)" }}>
          <div>
            <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
              Nuova email
            </h2>
            <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
              {selectedContacts.length} destinatari selezionati
            </p>
          </div>
          <button onClick={() => setShowEmailComposer(false)}>
            <X className="h-5 w-5" style={{ color: "#7C8CA2" }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* From */}
          <div className="flex items-center gap-3">
            <label className="w-16 text-[13px] font-medium" style={{ color: "#7C8CA2" }}>Da:</label>
            <select
              className="flex-1 rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "var(--color-border)" }}
            >
              <option>emanuele@human-aimpact.ch</option>
              <option>info@human-aimpact.ch</option>
            </select>
          </div>

          {/* To */}
          <div className="flex items-start gap-3">
            <label className="w-16 pt-2 text-[13px] font-medium" style={{ color: "#7C8CA2" }}>A:</label>
            <div className="flex-1">
              <div 
                className="flex flex-wrap gap-2 rounded-lg border p-2"
                style={{ borderColor: "var(--color-border)", minHeight: "42px" }}
              >
                <span
                  className="flex items-center gap-1 rounded-full px-3 py-1 text-[12px]"
                  style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
                >
                  {selectedContacts.length} contatti
                  <button className="hover:text-blue-800">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </span>
              </div>
              {/* Recipients preview */}
              <div className="mt-2 max-h-24 overflow-y-auto">
                {selectedContactsData.slice(0, 3).map(c => (
                  <div key={c.id} className="flex items-center gap-2 py-1 text-[12px]" style={{ color: "#7C8CA2" }}>
                    <span className="font-medium" style={{ color: "#1B2B4B" }}>{c.name}</span>
                    <span>&lt;{c.email}&gt;</span>
                  </div>
                ))}
                {selectedContactsData.length > 3 && (
                  <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                    + altri {selectedContactsData.length - 3} destinatari
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="flex items-center gap-3">
            <label className="w-16 text-[13px] font-medium" style={{ color: "#7C8CA2" }}>Oggetto:</label>
            <div className="flex flex-1 gap-2">
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Oggetto dell'email..."
                className="flex-1 rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: "var(--color-border)" }}
              />
              <button
                className="flex items-center gap-1 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors hover:bg-blue-50"
                style={{ borderColor: "var(--color-border)", color: "#2563EB" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Suggerisci
              </button>
            </div>
          </div>

          {/* Body */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Formatting toolbar */}
                <button className="rounded px-2 py-1 text-[12px] font-bold transition-colors hover:bg-gray-100" style={{ color: "#7C8CA2" }}>B</button>
                <button className="rounded px-2 py-1 text-[12px] italic transition-colors hover:bg-gray-100" style={{ color: "#7C8CA2" }}>I</button>
                <button className="rounded px-2 py-1 text-[12px] transition-colors hover:bg-gray-100" style={{ color: "#7C8CA2" }}>Link</button>
                <button className="rounded px-2 py-1 text-[12px] transition-colors hover:bg-gray-100" style={{ color: "#7C8CA2" }}>Lista</button>
                <div className="mx-2 h-4 w-px" style={{ backgroundColor: "#E5E7EB" }} />
                {/* Personalization */}
                <div className="relative">
                  <button
                    className="flex items-center gap-1 rounded px-2 py-1 text-[12px] transition-colors hover:bg-blue-50"
                    style={{ color: "#2563EB" }}
                  >
                    <AtSign className="h-3.5 w-3.5" />
                    Variabile
                  </button>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                  className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-gray-50"
                  style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
                >
                  Template
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {showTemplateDropdown && (
                  <div
                    className="absolute right-0 top-full z-10 mt-1 w-72 rounded-lg border bg-white py-1 shadow-lg"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    {emailTemplates.map(template => (
                      <button
                        key={template.id}
                        className="w-full px-4 py-2 text-left transition-colors hover:bg-gray-50"
                        onClick={() => {
                          setEmailSubject(template.name)
                          setShowTemplateDropdown(false)
                        }}
                      >
                        <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                          {template.name}
                        </p>
                        <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          {template.description}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Scrivi il contenuto dell'email...

Usa {nome}, {azienda}, {evento} per personalizzare."
              className="w-full rounded-lg border px-4 py-3 text-[14px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "var(--color-border)", minHeight: "200px" }}
            />
            <div className="mt-2 flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors hover:bg-blue-50"
                style={{ borderColor: "#2563EB", color: "#2563EB" }}
              >
                <Sparkles className="h-4 w-4" />
                Genera con Copywriter
              </button>
              <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                Variabili disponibili: {"{nome}"}, {"{azienda}"}, {"{evento}"}
              </p>
            </div>
          </div>

          {/* Attachments */}
          <div className="flex items-center gap-3 rounded-lg border-2 border-dashed p-3" style={{ borderColor: "var(--color-border)" }}>
            <Paperclip className="h-4 w-4" style={{ color: "#7C8CA2" }} />
            <span className="text-[13px]" style={{ color: "#7C8CA2" }}>
              Trascina file o clicca per allegare
            </span>
          </div>

          {/* Signature */}
          <div className="rounded-lg p-3" style={{ backgroundColor: "#F9FAFB" }}>
            <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
              — Firma precompilata —
            </p>
            <p className="mt-1 text-[13px]" style={{ color: "#1B2B4B" }}>
              Emanuele Casero<br />
              Founder, HumanAImpact<br />
              emanuele@human-aimpact.ch
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t p-4" style={{ borderColor: "var(--color-border)" }}>
          <button
            className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
          >
            Anteprima
          </button>
          <div className="flex gap-2">
            <button
              className="rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: "var(--color-border)", color: "#7C8CA2" }}
            >
              Salva bozza
            </button>
            <button
              className="rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
            >
              Salva come template
            </button>
            <button
              className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-amber-50"
              style={{ borderColor: "#F59E0B", color: "#D97706" }}
            >
              <Calendar className="h-4 w-4" />
              Programma
            </button>
            <button
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Mail className="h-4 w-4" />
              Invia ora
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (view === "profile" && selectedContact) {
    return (
      <div className="h-full overflow-y-auto p-6 max-w-4xl">
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
              <h1 className="text-[16px] font-semibold" style={{ color: "#1B2B4B" }}>
                {selectedContact.name}
              </h1>
              <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
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
                style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
              >
                <Mail className="h-4 w-4" />
                Email
              </button>
              {/* NEW: WhatsApp Button */}
              {selectedContact.whatsapp && (
                <button
                  onClick={() => openWhatsApp(selectedContact.whatsapp!)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
              )}
              <button
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
              >
                <Calendar className="h-4 w-4" />
                Calendly
              </button>
              <button
                className="flex items-center justify-center rounded-lg border px-2 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "var(--color-border)", color: "#7C8CA2" }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b" style={{ borderColor: "var(--color-border)" }}>
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border bg-white p-4 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50" style={{ borderColor: "var(--color-border)" }}>
                    <div className="mb-2 text-[20px]">&#128188;</div>
                    <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Invia proposta coaching team
                    </p>
                    <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Genera con Sales Agent
                    </button>
                  </div>
                  <div className="rounded-lg border bg-white p-4 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50" style={{ borderColor: "var(--color-border)" }}>
                    <div className="mb-2 text-[20px]">&#128197;</div>
                    <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Invita al Workshop 15 aprile
                    </p>
                    <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Genera invito personalizzato
                    </button>
                  </div>
                  <div className="rounded-lg border bg-white p-4 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50" style={{ borderColor: "var(--color-border)" }}>
                    <div className="mb-2 text-[20px]">&#128279;</div>
                    <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Connetti con Mario Rossi
                    </p>
                    <button className="text-[12px] hover:underline" style={{ color: "#2563EB" }}>
                      Entrambi interessati a AI+HR
                    </button>
                  </div>
                  {/* Add to Event */}
                  <div className="relative rounded-lg border bg-white p-4 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50" style={{ borderColor: "var(--color-border)" }}>
                    <div className="mb-2 text-[20px]">&#127919;</div>
                    <p className="mb-2 text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Aggiungi a evento
                    </p>
                    <button 
                      onClick={() => setShowAddToEventDropdown(!showAddToEventDropdown)}
                      className="flex items-center gap-1 text-[12px] hover:underline" 
                      style={{ color: "#2563EB" }}
                    >
                      Seleziona evento
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    {showAddToEventDropdown && (
                      <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border bg-white shadow-lg" style={{ borderColor: "var(--color-border)" }}>
                        {activeEvents.map(event => (
                          <button
                            key={event.id}
                            className="w-full px-3 py-2 text-left text-[12px] transition-colors hover:bg-gray-50"
                            style={{ color: "#1B2B4B" }}
                            onClick={() => setShowAddToEventDropdown(false)}
                          >
                            {event.name} ({event.date})
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Quick Actions Row */}
                <div className="mt-4 flex gap-2">
                  <button
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-blue-50"
                    style={{ borderColor: "#2563EB", color: "#2563EB" }}
                  >
                    <Plus className="h-4 w-4" />
                    Crea deal
                  </button>
                  <button
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
                    style={{ borderColor: "var(--color-border)", color: "#7C8CA2" }}
                  >
                    Archivia contatto
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cronologia" && (
            <div>
              {/* Add Manual Interaction Button */}
              <button
                onClick={() => setShowAddInteractionModal(true)}
                className="mb-4 flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-blue-50"
                style={{ borderColor: "#2563EB", color: "#2563EB" }}
              >
                <Plus className="h-4 w-4" />
                Aggiungi interazione manuale
              </button>

              {/* Add Interaction Modal */}
              {showAddInteractionModal && (
                <div className="mb-4 rounded-lg border p-4" style={{ borderColor: "#2563EB", backgroundColor: "#EFF6FF" }}>
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                      Nuova interazione
                    </h4>
                    <button onClick={() => setShowAddInteractionModal(false)}>
                      <X className="h-4 w-4" style={{ color: "#7C8CA2" }} />
                    </button>
                  </div>
                  <div className="mb-3 flex gap-2">
                    <select
                      className="rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <option>Tipo: Call</option>
                      <option>Tipo: Meeting</option>
                      <option>Tipo: Email</option>
                      <option>Tipo: WhatsApp</option>
                      <option>Tipo: Nota</option>
                    </select>
                    <input
                      type="date"
                      className="rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                  </div>
                  <textarea
                    placeholder="Descrizione dell'interazione..."
                    className="mb-3 w-full rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "var(--color-border)", minHeight: "80px" }}
                  />
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                      style={{ backgroundColor: "#2563EB" }}
                    >
                      Salva
                    </button>
                    <button
                      onClick={() => setShowAddInteractionModal(false)}
                      className="rounded-lg border px-4 py-2 text-[13px] font-medium"
                      style={{ borderColor: "var(--color-border)", color: "#7C8CA2" }}
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              )}

              <div className="relative pl-6">
                <div className="absolute bottom-0 left-2 top-0 w-px" style={{ backgroundColor: "#E5E7EB" }} />
                {timelineData.map((item, index) => (
                  <div key={index} className="relative mb-6 pb-2">
                    <div
                      className="absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full text-[12px]"
                      style={{ 
                        backgroundColor: item.icon === "whatsapp" ? "#D1FAE5" : "#EFF6FF", 
                        color: item.icon === "whatsapp" ? "#059669" : "#2563EB" 
                      }}
                    >
                      {item.icon === "phone" && <Phone className="h-3 w-3" />}
                      {item.icon === "mail" && <Mail className="h-3 w-3" />}
                      {item.icon === "calendar" && <Calendar className="h-3 w-3" />}
                      {item.icon === "whatsapp" && <MessageCircle className="h-3 w-3" />}
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
            </div>
          )}

          {activeTab === "opportunita" && (
            <div className="space-y-6">
              {selectedContact.dealValue && (
                <div className="rounded-lg border bg-white p-4 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
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

              {!selectedContact.dealValue && (
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors hover:border-blue-300 hover:bg-blue-50"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <Plus className="h-5 w-5" style={{ color: "#2563EB" }} />
                  <span className="text-[14px] font-medium" style={{ color: "#2563EB" }}>
                    Crea nuovo deal
                  </span>
                </button>
              )}

              <div>
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Prodotti suggeriti
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border bg-white p-4 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
                    <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>Workshop AI & Leadership</p>
                    <p className="text-[13px]" style={{ color: "#059669" }}>CHF 3&apos;500</p>
                    <p className="mt-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                      Match: ha espresso interesse per formazione team durante la call
                    </p>
                  </div>
                  <div className="rounded-lg border bg-white p-4 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
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
            <div className="space-y-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{ backgroundColor: "#D1FAE5", color: "#059669" }}
                    >
                      Attiva
                    </span>
                    <h3 className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                      FN2 — Conversione Lead Qualificati
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-1 rounded border px-2 py-1 text-[11px] transition-colors hover:bg-gray-50"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <Pause className="h-3 w-3" />
                      Pausa
                    </button>
                    <button
                      className="flex items-center gap-1 rounded border px-2 py-1 text-[11px] transition-colors hover:bg-gray-50"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <SkipForward className="h-3 w-3" />
                      Salta step
                    </button>
                    <button
                      className="flex items-center gap-1 rounded border px-2 py-1 text-[11px] transition-colors hover:bg-gray-50"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <Edit2 className="h-3 w-3" />
                      Personalizza
                    </button>
                  </div>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full" style={{ backgroundColor: "#E5E7EB" }}>
                    <div className="h-2 rounded-full" style={{ width: "60%", backgroundColor: "#2563EB" }} />
                  </div>
                  <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                    Step 3/5
                  </span>
                </div>
                <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                  Prossimo step: Follow-up personale — tra 2 giorni
                </p>
              </div>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Plus className="h-4 w-4" style={{ color: "#2563EB" }} />
                <span className="text-[13px]" style={{ color: "#2563EB" }}>
                  Aggiungi a nuova sequenza
                </span>
              </button>
            </div>
          )}

          {activeTab === "connessioni" && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Presentato da
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{ backgroundColor: "#93C5FD" }}
                  >
                    TW
                  </div>
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>
                      Thomas Weber
                    </p>
                    <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      VP HR · Credit Suisse
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "#7C8CA2" }}>
                  Contatti correlati (stessa azienda/settore)
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm transition-colors hover:bg-gray-50" style={{ borderColor: "var(--color-border)" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ backgroundColor: "#93C5FD" }}
                      >
                        MR
                      </div>
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                          Mario Rossi
                        </p>
                        <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          HR Director · TechnoSwiss AG
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px]" style={{ color: "#2563EB" }}>
                      Stesso settore: AI+HR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "note" && (
            <div className="space-y-4">
              <textarea
                className="w-full rounded-lg border px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: "var(--color-border)", minHeight: "120px" }}
                placeholder="Aggiungi una nota..."
              />
              <button
                className="rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                Salva nota
              </button>

              <div className="mt-6 space-y-3">
                <div className="rounded-lg border bg-white p-4 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
                  <p className="text-[14px]" style={{ color: "#1B2B4B" }}>
                    Molto interessata al coaching team. Ha menzionato che il CEO è favorevole.
                    Budget già allocato per Q2.
                  </p>
                  <p className="mt-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                    1 giorno fa · Emanuele Casero
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
      {/* Email Composer Modal */}
      {showEmailComposer && <EmailComposerModal />}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[16px] font-semibold" style={{ color: "#1B2B4B" }}>
            Contatti & CRM
          </h1>
          <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
            {contacts.length} contatti · {contacts.filter((c) => c.stage === "Opportunità").length} opportunità attive
          </p>
        </div>
        <div className="flex gap-2">
          {/* Import Button */}
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
          >
            <Upload className="h-4 w-4" />
            Importa
          </button>
          <button
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            <Plus className="h-4 w-4" />
            Nuovo contatto
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[480px] rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                Importa contatti
              </h2>
              <button onClick={() => setShowImportModal(false)}>
                <X className="h-5 w-5" style={{ color: "#7C8CA2" }} />
              </button>
            </div>
            <div
              className="mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8"
              style={{ borderColor: "var(--color-border)" }}
            >
              <Upload className="mb-2 h-8 w-8" style={{ color: "#7C8CA2" }} />
              <p className="mb-1 text-[14px] font-medium" style={{ color: "#1B2B4B" }}>
                Trascina il file CSV qui
              </p>
              <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                oppure clicca per selezionare
              </p>
            </div>
            <p className="mb-4 text-[12px]" style={{ color: "#7C8CA2" }}>
              Colonne supportate: Nome, Email, Azienda, Ruolo, Telefono, WhatsApp, Tag
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="rounded-lg border px-4 py-2 text-[13px] font-medium"
                style={{ borderColor: "var(--color-border)", color: "#7C8CA2" }}
              >
                Annulla
              </button>
              <button
                className="rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                Importa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Actions Bar */}
      {selectedContacts.length > 0 && (
        <div
          className="mb-4 flex items-center justify-between rounded-lg px-4 py-3"
          style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <span className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
            {selectedContacts.length} contatti selezionati
          </span>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
            >
              Tagga
            </button>
            <button
              className="flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
            >
              Invita a evento
            </button>
            <button
              onClick={openEmailComposerForSelected}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Mail className="h-3.5 w-3.5" />
              Invia email
            </button>
            <button
              className="flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
            >
              <Download className="h-3.5 w-3.5" />
              Esporta
            </button>
            <button
              onClick={() => setSelectedContacts([])}
              className="rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-red-50"
              style={{ color: "#EF4444" }}
            >
              Deseleziona
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-4 flex flex-col gap-4 px-6 py-4" style={{ backgroundColor: "var(--color-bg-primary)" }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "var(--color-text-secondary)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca per nome o azienda..."
            className="w-full rounded-lg border py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ 
              borderColor: "var(--color-border)",
              height: "var(--input-height)"
            }}
          />
        </div>
        <div className="flex gap-2">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setStageFilter(stage)}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: stageFilter === stage ? "var(--color-primary-light)" : "white",
                color: stageFilter === stage ? "var(--color-primary)" : "var(--color-text-secondary)",
                border: `1px solid ${stageFilter === stage ? "var(--color-primary)" : "var(--color-border)"}`,
              }}
            >
              {stage} ({stageCounts[stage as keyof typeof stageCounts]})
            </button>
          ))}
        </div>
      </div>

      {/* Smart Filters Row */}
      <div className="mb-4 flex flex-wrap gap-2">
        {smartFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveSmartFilter(activeSmartFilter === filter.id ? null : filter.id)}
            className="rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors"
            style={{
              backgroundColor: activeSmartFilter === filter.id ? "#EFF6FF" : "#F9FAFB",
              color: activeSmartFilter === filter.id ? "#2563EB" : "#6B7280",
              border: activeSmartFilter === filter.id ? "1px solid #2563EB" : "1px solid #E5E7EB",
            }}
          >
            {filter.emoji} {filter.label}
          </button>
        ))}
        {activeSmartFilter && (
          <button
            onClick={() => setActiveSmartFilter(null)}
            className="text-[12px] hover:underline"
            style={{ color: "#7C8CA2" }}
          >
            Rimuovi filtro
          </button>
        )}
      </div>

      {/* Contacts Table */}
      <div className="rounded-lg border" style={{ borderColor: "var(--color-border)", backgroundColor: "white" }}>
        {/* Table Header */}
        <div
          className="grid items-center gap-4 border-b px-6 py-3"
          style={{ 
            borderColor: "var(--color-border)", 
            gridTemplateColumns: "40px minmax(200px, 1.5fr) minmax(180px, 1.2fr) minmax(120px, 1fr) 100px 80px",
            height: "var(--table-row-height)"
          }}
        >
          <button
            onClick={selectAllContacts}
            className="flex h-6 w-6 items-center justify-center rounded border transition-colors"
            style={{
              borderColor: selectedContacts.length === filteredContacts.length && selectedContacts.length > 0 ? "var(--color-primary)" : "var(--color-border)",
              backgroundColor: selectedContacts.length === filteredContacts.length && selectedContacts.length > 0 ? "var(--color-primary)" : "transparent",
            }}
          >
            {selectedContacts.length === filteredContacts.length && selectedContacts.length > 0 && (
              <Check className="h-4 w-4 text-white" />
            )}
          </button>
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
            Contatto
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
            Email
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
            Ultimo contatto
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
            Stage
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
            Azione
          </span>
        </div>

        {/* Table Rows */}
        {filteredContacts.map((contact, index) => (
          <div
            key={contact.id}
            className="relative grid items-center gap-4 border-b px-6 py-0 transition-colors hover:bg-gray-50 cursor-pointer"
            style={{
              borderColor: index === filteredContacts.length - 1 ? "transparent" : "var(--color-border)",
              gridTemplateColumns: "40px minmax(200px, 1.5fr) minmax(180px, 1.2fr) minmax(120px, 1fr) 100px 80px",
              height: "var(--table-row-height)"
            }}
            onMouseEnter={() => setHoveredContact(contact.id)}
            onMouseLeave={() => setHoveredContact(null)}
          >
            {/* Selection Checkbox */}
            <button
              onClick={() => toggleContactSelection(contact.id)}
              className="flex h-6 w-6 items-center justify-center rounded border transition-colors"
              style={{
                borderColor: selectedContacts.includes(contact.id) ? "var(--color-primary)" : "var(--color-border)",
                backgroundColor: selectedContacts.includes(contact.id) ? "var(--color-primary)" : "transparent",
              }}
            >
              {selectedContacts.includes(contact.id) && (
                <Check className="h-4 w-4 text-white" />
              )}
            </button>

            {/* Contact Name & Company */}
            <button
              onClick={() => openProfile(contact)}
              className="flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity text-left"
            >
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
              >
                {contact.initials}
              </div>
              <div className="min-w-0">
                <p
                  className="text-base font-semibold truncate"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {contact.name}
                </p>
                <p className="text-sm truncate" style={{ color: "var(--color-text-secondary)" }}>
                  {contact.company}
                </p>
              </div>
            </button>

            {/* Email */}
            <span 
              className="text-base truncate" 
              style={{ color: "var(--color-text-secondary)" }}
              title={contact.email}
            >
              {contact.email}
            </span>

            {/* Last Contact */}
            <span className="text-base" style={{ color: "var(--color-text-secondary)" }}>
              {contact.lastContact}
            </span>

            {/* Stage */}
            <span
              className="w-fit rounded-full px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: contact.stage === "Opportunità" ? "#DBEAFE" : contact.stage === "Qualificato" ? "#FEF3C7" : "#F3F4F6",
                color: contact.stage === "Opportunità" ? "#2563EB" : contact.stage === "Qualificato" ? "#92400E" : "#6B7280",
              }}
            >
              {contact.stage}
            </span>

            {/* Action - Click to expand */}
            <button
              onClick={() => openProfile(contact)}
              className="flex items-center justify-center h-10 w-10 rounded-lg transition-all hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" style={{ color: "var(--color-text-secondary)" }} />
            </button>

            {/* Hover Card */}
            {hoveredContact === contact.id && (
              <div
                className="absolute left-0 top-full z-20 w-80 rounded-lg border bg-white p-4 shadow-lg"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-[14px] font-bold text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    {contact.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                      {contact.name}
                    </p>
                    <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      {contact.role}
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-[12px] leading-relaxed" style={{ color: "#7C8CA2" }}>
                  {contact.brief.substring(0, 120)}...
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openProfile(contact)}
                    className="flex-1 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    Vedi profilo
                  </button>
                  {contact.whatsapp && (
                    <button
                      onClick={() => openWhatsApp(contact.whatsapp!)}
                      className="flex items-center justify-center rounded-lg px-3 py-1.5 text-[12px] font-medium text-white"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    className="flex items-center justify-center rounded-lg border px-3 py-1.5"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <Phone className="h-4 w-4" style={{ color: "#7C8CA2" }} />
                  </button>
                  <button
                    className="flex items-center justify-center rounded-lg border px-3 py-1.5"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <Mail className="h-4 w-4" style={{ color: "#7C8CA2" }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between">
        <button
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors hover:bg-gray-50"
          style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
        >
          <Download className="h-4 w-4" />
          Esporta lista
        </button>
        <button
          className="text-[12px] hover:underline"
          style={{ color: "#7C8CA2" }}
        >
          Unisci duplicati
        </button>
      </div>
    </div>
  )
}
