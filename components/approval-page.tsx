"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronRight, ChevronDown, Check, Image } from "lucide-react"

interface ApprovalItem {
  id: string
  title: string
  type: "post" | "newsletter" | "email" | "process"
  channel: string
  agent: string
  scheduledDate: string
  daysWaiting?: number
  content?: string
  hasImage?: boolean
  context?: {
    process?: string
    rubric?: string
    scheduledFull?: string
  }
}

const approvalItems: ApprovalItem[] = [
  {
    id: "1",
    title: "R1 — AI e coaching: una domanda che vale",
    type: "post",
    channel: "LinkedIn pers.",
    agent: "Copywriter",
    scheduledDate: "oggi",
    daysWaiting: 4,
    hasImage: true,
    content: `Ogni volta che entro in un'azienda per parlare di intelligenza artificiale, la prima domanda non e mai tecnica. E sempre umana: "Come cambiera il mio lavoro?"

E una domanda che merita rispetto, non una risposta preconfezionata.

Perche la verita e che l'AI non sostituisce il lavoro — ridefinisce il valore che ciascuno porta.

Chi sa ascoltare, interpretare, connettere: diventa piu prezioso.
Chi esegue senza comprendere: e gia in competizione con un algoritmo.

La domanda giusta non e "l'AI prendera il mio posto?"
E: "Cosa so fare che nessuna macchina puo replicare?"

#AI #coaching #futurodellavoro #humanAImpact`,
    context: {
      process: "Piano editoriale settimana 15",
      rubric: "R1 — Una domanda che vale",
      scheduledFull: "Lunedi 7 aprile, 08:30"
    }
  },
  {
    id: "2",
    title: "Azione Board: Brief promozione workshop",
    type: "process",
    channel: "Processo",
    agent: "Operator",
    scheduledDate: "urgente",
    daysWaiting: 5,
    content: `BRIEF AZIONE: Promozione Workshop AI & Leadership

SITUAZIONE ATTUALE:
- Fill rate: 28% (7/25 iscritti)
- Giorni mancanti: 15
- Soglia minima viabilita: 60%

AZIONI DA APPROVARE:
1. Post LinkedIn urgente con CTA diretta
2. Email mirata a 12 contatti target (score >8)
3. Reminder Telegram bilingue
4. Coinvolgimento speaker per post anticipazione

RISULTATO ATTESO:
Raggiungere almeno 15 iscritti (60%) entro 7 giorni.

Approvi l'attivazione del processo di promozione urgente?`,
    context: {
      process: "Promozione evento",
      rubric: "Azione operativa",
      scheduledFull: "Immediato"
    }
  },
  {
    id: "3",
    title: "Newsletter — Settimana 14",
    type: "newsletter",
    channel: "Beehiiv",
    agent: "Copywriter",
    scheduledDate: "domani 8:00",
    content: `Ciao,

Questa settimana parliamo di errori. Si, proprio di errori.

Quando un'intelligenza artificiale sbaglia, cosa possiamo imparare? 

La risposta non e scontata: l'errore di un algoritmo spesso rivela i nostri bias nascosti, i dati che abbiamo trascurato, le domande che non ci siamo posti.

In questo numero esploriamo tre casi reali di "fallimenti AI" che si sono trasformati in lezioni preziose per le aziende coinvolte.

Buona lettura,
Emanuele`,
    context: {
      process: "Newsletter settimanale",
      rubric: "Editoriale",
      scheduledFull: "Mercoledi 9 aprile, 08:00"
    }
  },
  {
    id: "4",
    title: "Email follow-up Claudia Bernasconi",
    type: "email",
    channel: "Email",
    agent: "Funnel",
    scheduledDate: "oggi 14:00",
    content: `Gentile Claudia,

grazie per la piacevole conversazione di settimana scorsa. Come promesso, le invio alcuni materiali sul nostro approccio all'AI nel settore bancario.

In allegato trova:
- Il case study "AI-driven customer insights" 
- La presentazione del workshop del 15 aprile

Sarebbe interessata a partecipare? Potrebbe essere un'occasione per approfondire i temi discussi.

Resto a disposizione per qualsiasi domanda.

Cordiali saluti,
Emanuele Casero`,
    context: {
      process: "Sequenza nurturing S3",
      rubric: "Follow-up personalizzato",
      scheduledFull: "Oggi, 14:00"
    }
  },
  {
    id: "5",
    title: "Post EN: Leadership in the age of AI",
    type: "post",
    channel: "LinkedIn pers.",
    agent: "Copywriter",
    scheduledDate: "Mar 8/4",
    content: `The question I hear most from leaders isn't about technology.

It's about identity.

"What does leadership mean when AI can analyze faster, predict better, and never sleep?"

Here's what I've learned from working with 50+ executives on their AI journey:

The best leaders aren't competing with AI. They're becoming more human.

More curious. More empathetic. More willing to say "I don't know."

Because in a world of artificial intelligence, authentic leadership becomes the ultimate competitive advantage.

#Leadership #AI #FutureOfWork`,
    context: {
      process: "Piano editoriale settimana 15",
      rubric: "R3 — Leadership content",
      scheduledFull: "Martedi 8 aprile, 14:00"
    }
  }
]

const typeColors: Record<string, { bg: string; text: string }> = {
  post: { bg: "#DBEAFE", text: "#1D4ED8" },
  newsletter: { bg: "#F3E8FF", text: "#7C3AED" },
  email: { bg: "#FEF3C7", text: "#D97706" },
  process: { bg: "#D1FAE5", text: "#059669" }
}

const typeLabels: Record<string, string> = {
  post: "Post",
  newsletter: "Newsletter",
  email: "Email",
  process: "Processo"
}

export function ApprovalPage() {
  const [selectedId, setSelectedId] = useState("1")
  const [activeFilter, setActiveFilter] = useState("all")
  const [contextExpanded, setContextExpanded] = useState(true)
  const [approvedCount, setApprovedCount] = useState(0)
  const [animatingOut, setAnimatingOut] = useState<string | null>(null)

  // Sort items: urgent first (higher daysWaiting first)
  const sortedItems = [...approvalItems].sort((a, b) => {
    const aUrgent = a.daysWaiting && a.daysWaiting >= 3 ? a.daysWaiting : 0
    const bUrgent = b.daysWaiting && b.daysWaiting >= 3 ? b.daysWaiting : 0
    return bUrgent - aUrgent
  })

  const selectedItem = sortedItems.find(item => item.id === selectedId)

  const filters = [
    { id: "all", label: "Tutti", count: 5 },
    { id: "post", label: "Post", count: 2 },
    { id: "newsletter", label: "Newsletter", count: 1 },
    { id: "email", label: "Email", count: 1 },
    { id: "process", label: "Processi", count: 1 }
  ]

  const filteredItems = activeFilter === "all" 
    ? sortedItems 
    : sortedItems.filter(item => item.type === activeFilter)

  const goToNext = useCallback(() => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedId)
    if (currentIndex < filteredItems.length - 1) {
      setSelectedId(filteredItems[currentIndex + 1].id)
    }
  }, [filteredItems, selectedId])

  const handleApprove = useCallback(() => {
    setAnimatingOut(selectedId)
    setApprovedCount(prev => prev + 1)
    
    setTimeout(() => {
      setAnimatingOut(null)
      goToNext()
    }, 300)
  }, [selectedId, goToNext])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      
      switch (e.key.toLowerCase()) {
        case "e":
          handleApprove()
          break
        case "m":
          // Edit action
          break
        case "r":
          // Reject action
          break
        case "arrowright":
          goToNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, handleApprove])

  return (
    <div className="flex h-full">
      {/* Left Panel - List */}
      <div 
        className="w-[30%] flex flex-col border-r"
        style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
      >
        {/* Header */}
        <div className="p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
          <h1 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
            Approvazione
          </h1>
          <p className="text-[12px] mt-1" style={{ color: "#7C8CA2" }}>
            5 in attesa
          </p>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium" style={{ color: "#1B2B4B" }}>
                {approvedCount}/5 approvati
              </span>
              <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                {Math.round((approvedCount / 5) * 100)}%
              </span>
            </div>
            <div 
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "#E5E7EB" }}
            >
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: "#059669",
                  width: `${(approvedCount / 5) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div 
          className="flex border-b overflow-x-auto"
          style={{ borderColor: "#E5E7EB" }}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="px-4 py-3 text-[13px] whitespace-nowrap transition-colors"
              style={{
                color: activeFilter === filter.id ? "#2563EB" : "#7C8CA2",
                borderBottom: activeFilter === filter.id ? "2px solid #2563EB" : "2px solid transparent",
                marginBottom: "-1px"
              }}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`w-full text-left p-4 border-b transition-all duration-300 ${
                animatingOut === item.id ? 'opacity-0 transform -translate-x-full' : ''
              }`}
              style={{
                borderColor: "#E5E7EB",
                backgroundColor: selectedId === item.id ? "#EFF6FF" : "transparent",
                borderLeft: selectedId === item.id ? "3px solid #2563EB" : "3px solid transparent"
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 
                  className="text-[13px] font-semibold line-clamp-2"
                  style={{ color: "#1B2B4B" }}
                >
                  {item.title}
                </h3>
                {item.daysWaiting && item.daysWaiting >= 3 && (
                  <span 
                    className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0"
                    style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
                  >
                    {item.daysWaiting}gg
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span 
                  className="text-[11px] px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#F3F4F6", color: "#7C8CA2" }}
                >
                  {item.channel}
                </span>
                <span 
                  className="text-[11px] px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                >
                  {item.agent}
                </span>
                <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                  {item.scheduledDate}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-[70%] flex flex-col bg-white">
        {selectedItem && (
          <>
            {/* Header */}
            <div 
              className="p-5 border-b flex items-start justify-between"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div>
                <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                  {selectedItem.title}
                </h2>
                <p className="text-[13px] mt-1" style={{ color: "#7C8CA2" }}>
                  {selectedItem.agent} - {selectedItem.channel} - {selectedItem.scheduledDate}
                </p>
              </div>
              <span 
                className="text-[12px] px-3 py-1 rounded font-medium"
                style={{ 
                  backgroundColor: typeColors[selectedItem.type].bg,
                  color: typeColors[selectedItem.type].text
                }}
              >
                {typeLabels[selectedItem.type]}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Context Section */}
              {selectedItem.context && (
                <div 
                  className="mb-6 rounded-lg border"
                  style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                >
                  <button
                    onClick={() => setContextExpanded(!contextExpanded)}
                    className="w-full flex items-center justify-between p-3 text-left"
                  >
                    <span className="text-[12px] font-medium" style={{ color: "#7C8CA2" }}>
                      Contesto
                    </span>
                    {contextExpanded ? (
                      <ChevronDown className="w-4 h-4" style={{ color: "#7C8CA2" }} />
                    ) : (
                      <ChevronRight className="w-4 h-4" style={{ color: "#7C8CA2" }} />
                    )}
                  </button>
                  {contextExpanded && (
                    <div className="px-3 pb-3 space-y-1">
                      {selectedItem.context.process && (
                        <p className="text-[12px]" style={{ color: "#6B7280" }}>
                          Generato dal processo: <span className="font-medium">{selectedItem.context.process}</span>
                        </p>
                      )}
                      {selectedItem.context.rubric && (
                        <p className="text-[12px]" style={{ color: "#6B7280" }}>
                          Rubrica: <span className="font-medium">{selectedItem.context.rubric}</span>
                        </p>
                      )}
                      {selectedItem.context.scheduledFull && (
                        <p className="text-[12px]" style={{ color: "#6B7280" }}>
                          Pubblicazione prevista: <span className="font-medium">{selectedItem.context.scheduledFull}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Main Content */}
              <div 
                className="bg-white rounded-lg border p-6 max-w-[640px]"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div 
                  className="text-[15px] leading-[1.8] whitespace-pre-wrap"
                  style={{ color: "#1F2937" }}
                >
                  {selectedItem.content}
                </div>
              </div>

              {/* Image Preview - Enhanced */}
              {selectedItem.hasImage && (
                <div 
                  className="mt-6 max-w-[640px] rounded-lg border overflow-hidden"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <div 
                    className="w-full h-[200px] flex items-center justify-center"
                    style={{ backgroundColor: "#F3F4F6" }}
                  >
                    <div className="text-center">
                      <Image size={48} style={{ color: "#9CA3AF" }} className="mx-auto mb-3" />
                      <p className="text-[13px] font-medium" style={{ color: "#6B7280" }}>
                        brand-ai-coaching-01.jpg
                      </p>
                      <p className="text-[11px] mt-1" style={{ color: "#9CA3AF" }}>
                        1200 x 628 px
                      </p>
                    </div>
                  </div>
                  <div className="p-3 border-t" style={{ borderColor: "#E5E7EB" }}>
                    <button 
                      className="text-[12px] px-3 py-1.5 rounded border transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#D1D5DB", color: "#6B7280" }}
                    >
                      Cambia immagine
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar - Enhanced */}
            <div 
              className="border-t p-4 flex items-center justify-between"
              style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-2 px-7 py-3 rounded-lg text-[15px] font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#059669" }}
                >
                  <Check size={18} />
                  Approva e pubblica
                </button>
                <button
                  className="px-5 py-3 rounded-lg text-[14px] font-medium border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#D1D5DB", color: "#374151" }}
                >
                  Modifica
                </button>
                <button
                  className="px-5 py-3 rounded-lg text-[14px] font-medium border transition-colors hover:bg-red-50"
                  style={{ borderColor: "#FCA5A5", color: "#DC2626" }}
                >
                  Rifiuta
                </button>
              </div>
              <button
                onClick={goToNext}
                className="px-5 py-3 rounded-lg text-[14px] font-medium border transition-colors hover:bg-blue-50 flex items-center gap-2"
                style={{ borderColor: "#2563EB", color: "#2563EB" }}
              >
                Prossimo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Keyboard Shortcuts */}
            <div 
              className="px-4 pb-3 text-center"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
                E = Approva - M = Modifica - R = Rifiuta - → = Prossimo
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
