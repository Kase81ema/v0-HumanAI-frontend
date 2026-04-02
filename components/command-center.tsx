"use client"

import { useState } from "react"
import { Send, Trash2, Save, Download, MoreHorizontal } from "lucide-react"

interface Message {
  id: number
  sender: "user" | "strategist"
  text: string
  time: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "user",
    text: "Come sta andando la promozione del workshop?",
    time: "09:15",
  },
  {
    id: 2,
    sender: "strategist",
    text: `Il Workshop AI & Leadership del 15 aprile ha un fill rate del 28% (7 iscritti su 25 target) a 15 giorni dall'evento. È sotto la soglia critica.

Ho pubblicato l'analisi sul canvas →

Le 4 azioni che suggerisco:
1. Post LinkedIn urgente oggi con CTA diretta
2. Email mirata ai contatti S2/S3 con tag 'leadership'
3. Telegram reminder bilingue
4. Post dello speaker come anticipazione

Vuoi che attivi il processo di promozione dalla Board?`,
    time: "09:16",
  },
  {
    id: 3,
    sender: "user",
    text: "Sì, attiva il processo. E mostrami i contatti più adatti da invitare.",
    time: "09:17",
  },
  {
    id: 4,
    sender: "strategist",
    text: "Processo attivato nella Board. Ho pubblicato sul canvas la lista dei 12 contatti più adatti con il loro score e la ragione del match. Puoi invitarli direttamente dal canvas.",
    time: "09:17",
  },
]

const suggestedContacts = [
  {
    initials: "AK",
    name: "Anna Keller",
    company: "UBS",
    score: 15,
    reason: "Partecipante workshop precedente",
  },
  {
    initials: "PL",
    name: "Pietro Lombardi",
    company: "Deloitte",
    score: 12,
    reason: "Tag: leadership, AI strategy",
  },
  {
    initials: "TW",
    name: "Thomas Weber",
    company: "Credit Suisse",
    score: 11,
    reason: "Newsletter reader, clicked workshop link",
  },
  {
    initials: "LP",
    name: "Laura Pedrini",
    company: "SUPSI",
    score: 9,
    reason: "Speaker potential, AI educator",
  },
  {
    initials: "GF",
    name: "Gianni Ferretti",
    company: "Freelance Coach",
    score: 8,
    reason: "ICF certified, AI curious",
  },
]

const suggestionChips = ["Analisi settimanale", "Stato KPI", "Prossime azioni"]

export function CommandCenter() {
  const [messages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [showCanvasMenu, setShowCanvasMenu] = useState(false)
  const [showChatMenu, setShowChatMenu] = useState(false)
  const [savedCanvases, setSavedCanvases] = useState<string[]>([])

  const handleSaveCanvas = () => {
    const canvasName = `Canvas ${new Date().toLocaleDateString('it-IT')} - Workshop Analysis`
    setSavedCanvases([...savedCanvases, canvasName])
    setShowCanvasMenu(false)
    // In a real app, this would save to backend
  }

  const handleExportConversation = () => {
    // In a real app, this would export to PDF or text
    setShowChatMenu(false)
  }

  return (
    <div className="flex h-full">
      {/* Chat Panel - 55% */}
      <div
        className="flex flex-col"
        style={{ width: "55%", borderRight: "1px solid #E5E7EB" }}
      >
        {/* Chat Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              🧠
            </div>
            <div>
              <p
                className="text-[14px] font-semibold"
                style={{ color: "#1B2B4B" }}
              >
                Strategist
              </p>
              <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                Visione strategica e analisi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "#059669" }}
              />
              <span className="text-[12px]" style={{ color: "#059669" }}>
                Online
              </span>
            </div>
            {/* Chat Menu */}
            <div className="relative">
              <button
                onClick={() => setShowChatMenu(!showChatMenu)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <MoreHorizontal size={18} style={{ color: "#7C8CA2" }} />
              </button>
              {showChatMenu && (
                <div 
                  className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-white shadow-lg z-10"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button
                    onClick={handleExportConversation}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-left hover:bg-gray-50 transition-colors"
                    style={{ color: "#1B2B4B" }}
                  >
                    <Download size={14} />
                    Esporta conversazione
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-5"
          style={{ backgroundColor: "#FAFBFC" }}
        >
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%]"
                  style={{
                    backgroundColor:
                      message.sender === "user" ? "#1B2B4B" : "#FFFFFF",
                    color: message.sender === "user" ? "#FFFFFF" : "#1B2B4B",
                    padding: "14px 18px",
                    borderRadius:
                      message.sender === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    border:
                      message.sender === "strategist"
                        ? "1px solid #E5E7EB"
                        : "none",
                    boxShadow:
                      message.sender === "strategist"
                        ? "0 1px 3px rgba(0,0,0,0.05)"
                        : "none",
                  }}
                >
                  <p
                    className="whitespace-pre-line text-[14px] leading-relaxed"
                    style={{ lineHeight: "1.6" }}
                  >
                    {message.text}
                  </p>
                  <p
                    className="mt-2 text-[11px]"
                    style={{
                      color:
                        message.sender === "user"
                          ? "rgba(255,255,255,0.6)"
                          : "#7C8CA2",
                      textAlign: message.sender === "user" ? "right" : "left",
                    }}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div
          className="px-5 py-4"
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Scrivi allo Strategist..."
              className="flex-1 rounded-lg border px-4 py-3 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              style={{
                borderColor: "var(--color-border)",
                color: "#1B2B4B",
              }}
            />
            <button
              className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                className="rounded-full px-4 py-2 text-[13px] transition-colors hover:bg-gray-200"
                style={{
                  backgroundColor: "#F3F4F6",
                  color: "#4B5563",
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Panel - 45% */}
      <div
        className="flex flex-col"
        style={{ width: "45%", backgroundColor: "#FFFFFF" }}
      >
        {/* Canvas Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #E5E7EB" }}
        >
          <p className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
            Canvas Strategist
          </p>
          <div className="flex items-center gap-2">
            {/* Canvas Menu */}
            <div className="relative">
              <button
                onClick={() => setShowCanvasMenu(!showCanvasMenu)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium border transition-colors hover:bg-gray-50"
                style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
              >
                <Save size={14} />
                Salva
              </button>
              {showCanvasMenu && (
                <div 
                  className="absolute right-0 top-full mt-1 w-56 rounded-lg border bg-white shadow-lg z-10"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button
                    onClick={handleSaveCanvas}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-left hover:bg-gray-50 transition-colors"
                    style={{ color: "#1B2B4B" }}
                  >
                    <Save size={14} />
                    Salva canvas corrente
                  </button>
                  {savedCanvases.length > 0 && (
                    <>
                      <div className="border-t my-1" style={{ borderColor: "var(--color-border)" }} />
                      <p className="px-4 py-1.5 text-[10px] uppercase font-medium" style={{ color: "#7C8CA2" }}>
                        Canvas salvati
                      </p>
                      {savedCanvases.map((canvas, i) => (
                        <button
                          key={i}
                          className="w-full px-4 py-2 text-[12px] text-left hover:bg-gray-50 transition-colors truncate"
                          style={{ color: "#6B7280" }}
                        >
                          {canvas}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] transition-colors hover:bg-gray-100"
              style={{ color: "#7C8CA2" }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Pulisci
            </button>
          </div>
        </div>

        {/* Canvas Content */}
        <div
          className="flex-1 overflow-y-auto p-5"
          style={{ backgroundColor: "#FAFBFC" }}
        >
          <div className="flex flex-col gap-5">
            {/* Block 1 - Workshop Analysis */}
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <p
                className="mb-4 text-[14px] font-semibold"
                style={{ color: "#1B2B4B" }}
              >
                Workshop AI & Leadership — Stato promozione
              </p>

              {/* Metrics Row */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ backgroundColor: "#FEF2F2" }}
                >
                  <p
                    className="text-[16px] font-bold"
                    style={{ color: "#DC2626" }}
                  >
                    7/25
                  </p>
                  <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    iscritti
                  </p>
                </div>
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ backgroundColor: "#FEF2F2" }}
                >
                  <p
                    className="text-[16px] font-bold"
                    style={{ color: "#DC2626" }}
                  >
                    28%
                  </p>
                  <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    fill rate
                  </p>
                </div>
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ backgroundColor: "#F3F4F6" }}
                >
                  <p
                    className="text-[16px] font-bold"
                    style={{ color: "#1B2B4B" }}
                  >
                    D-15
                  </p>
                  <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                    countdown
                  </p>
                </div>
              </div>

              {/* Promotion Channels */}
              <p
                className="mb-3 text-[12px] font-medium"
                style={{ color: "#7C8CA2" }}
              >
                Canali di promozione
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                      LinkedIn post (2 pubblicati)
                    </span>
                    <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      60%
                    </span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: "#E5E7EB" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: "60%", backgroundColor: "#059669" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                      Email inviti (1 inviata)
                    </span>
                    <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      40%
                    </span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: "#E5E7EB" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: "40%", backgroundColor: "#D97706" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                      Telegram (0)
                    </span>
                    <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      0%
                    </span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: "#E5E7EB" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: "0%", backgroundColor: "#9CA3AF" }}
                    />
                  </div>
                </div>
              </div>

              <button
                className="mt-5 w-full rounded-lg py-3 text-[13px] font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#2563EB" }}
              >
                Attiva promozione urgente →
              </button>
            </div>

            {/* Block 2 - Contacts to Invite */}
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <p
                className="mb-4 text-[14px] font-semibold"
                style={{ color: "#1B2B4B" }}
              >
                12 contatti suggeriti per invito diretto
              </p>

              <div className="flex flex-col gap-3">
                {suggestedContacts.map((contact) => (
                  <div
                    key={contact.name}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50"
                    style={{ backgroundColor: "#FAFBFC" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold"
                        style={{
                          backgroundColor: "#DBEAFE",
                          color: "#2563EB",
                        }}
                      >
                        {contact.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[13px] font-medium"
                            style={{ color: "#1B2B4B" }}
                          >
                            {contact.name}
                          </span>
                          <span
                            className="text-[11px]"
                            style={{ color: "#7C8CA2" }}
                          >
                            {contact.company}
                          </span>
                          <span
                            className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: "#DBEAFE",
                              color: "#2563EB",
                            }}
                          >
                            {contact.score}
                          </span>
                        </div>
                        <p
                          className="mt-0.5 text-[11px]"
                          style={{ color: "#7C8CA2" }}
                        >
                          {contact.reason}
                        </p>
                      </div>
                    </div>
                    <button
                      className="rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-blue-50"
                      style={{
                        borderColor: "#2563EB",
                        color: "#2563EB",
                      }}
                    >
                      Invita
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="mt-4 w-full text-center text-[13px] font-medium transition-colors hover:underline"
                style={{ color: "#2563EB" }}
              >
                Mostra altri 7 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
