"use client"

import { useState } from "react"
import { Plus, Image, RefreshCw, ClipboardCheck, MessageSquare, Share2, Check, X, Calendar, Loader2, Bold, Italic, Link2, List, Copy, History, MoreHorizontal, GripVertical } from "lucide-react"
import { FloatingAgentAvatar } from "./floating-agent-avatar"

type ContentStatus = "approved" | "draft" | "generating" | "idea" | "scheduled"
type ContentType = "post" | "newsletter" | "article" | "email" | "idea"

interface ContentItem {
  id: string
  title: string
  type: ContentType
  status: ContentStatus
  channel: string
  rubrica?: string
  date: string
  hasImage: boolean
  content?: string
  imageName?: string
  comments?: number
  versions?: number
  generatedBy?: { initials: string; name: string }
}

const contents: ContentItem[] = [
  {
    id: "1",
    title: "R1 — AI e coaching: una domanda che vale",
    type: "post",
    status: "approved",
    channel: "LinkedIn pers.",
    rubrica: "R1",
    date: "Lun 7/4",
    hasImage: true,
    imageName: "brand-ai-coaching-01.jpg - 1200x628",
    comments: 2,
    versions: 3,
    generatedBy: { initials: "CW", name: "Copywriter" },
    content: `Ogni volta che entro in un'azienda per parlare di intelligenza artificiale, la prima domanda non e mai tecnica. E sempre umana: "Come cambiera il mio lavoro?"

E una domanda che merita rispetto, non una risposta preconfezionata.

Perche la verita e che l'AI non sostituisce il lavoro — ridefinisce il valore che ciascuno porta.

Chi sa ascoltare, interpretare, connettere: diventa piu prezioso.
Chi esegue senza comprendere: e gia in competizione con un algoritmo.

La domanda giusta non e "l'AI prendera il mio posto?"
E: "Cosa so fare che nessuna macchina puo replicare?"

#AI #coaching #futurodellavoro #humanAImpact`
  },
  {
    id: "2",
    title: "Newsletter: Quando l'AI sbaglia, impariamo",
    type: "newsletter",
    status: "draft",
    channel: "Beehiiv",
    date: "Mer 9/4",
    hasImage: false,
    comments: 1,
    versions: 2,
    generatedBy: { initials: "CW", name: "Copywriter" },
    content: `Ciao,

questa settimana voglio parlarti di fallimenti. Non dei tuoi — dei miei. O meglio, di quelli dell'intelligenza artificiale che uso ogni giorno.

Perche l'AI sbaglia. Spesso. E quando sbaglia, ci offre una finestra rara: la possibilita di capire come funziona davvero.

Ho chiesto a Claude di analizzare i dati del mio ultimo workshop. Il risultato? Un'analisi impeccabile... del workshop sbagliato. Aveva confuso le date.

Cosa ho imparato: l'AI non "capisce" il contesto come noi. Connette pattern, non significati.

E questo cambia tutto nel modo in cui dobbiamo usarla.

La prossima volta che l'AI sbaglia con te, fermati. Chiediti: cosa mi sta insegnando questo errore?

A presto,
Emanuele`
  },
  {
    id: "3",
    title: "Post EN: Leadership in the age of AI",
    type: "post",
    status: "draft",
    channel: "LinkedIn pers.",
    date: "Mar 8/4",
    hasImage: false,
    versions: 1,
    generatedBy: { initials: "CW", name: "Copywriter" },
    content: `Leadership isn't about having all the answers anymore.

It's about asking the right questions — to your team, to your data, and yes, to your AI.

The leaders who will thrive aren't those who resist change.
They're the ones who learn to dance with uncertainty.

Three shifts I'm seeing in AI-era leadership:

1. From "I decide" to "We discover together"
2. From hoarding information to curating insight
3. From commanding to coaching

The future belongs to leaders who amplify human potential — not replace it.

What's your experience? How is AI changing the way you lead?

#leadership #AI #futureofwork #humanAImpact`
  },
  {
    id: "4",
    title: "Articolo Medium: AI e PMI ticinesi nel 2026",
    type: "article",
    status: "generating",
    channel: "Medium",
    date: "15/4",
    hasImage: false
  },
  {
    id: "5",
    title: "Sequenza invito Workshop — Email 2/4",
    type: "email",
    status: "scheduled",
    channel: "Email",
    date: "8/4",
    hasImage: false,
    generatedBy: { initials: "FN", name: "Funnel" },
    content: `Oggetto: [Workshop 15/4] Ultime 18 disponibilita

Ciao {{nome}},

ti scrivo perche mancano solo 7 giorni al workshop "AI & Leadership" e restano ancora 18 posti disponibili.

So che il tuo tempo e prezioso, quindi vado dritto al punto:

In 3 ore scoprirai:
- Come integrare l'AI nelle decisioni strategiche senza perdere il controllo
- I 3 errori che il 90% dei leader fa con l'AI (e come evitarli)
- Un framework pratico che potrai usare gia dal giorno dopo

Non e teoria. E esperienza condensata da 50+ workshop con aziende svizzere.

Riserva il tuo posto: [LINK]

Se hai domande, rispondi a questa email. Sono qui.

A presto,
Emanuele

P.S. Chi si iscrive entro domenica riceve la registrazione del webinar "AI per PMI" (valore CHF 97) in omaggio.`
  },
  {
    id: "6",
    title: "Post recap workshop — idea da sviluppare",
    type: "idea",
    status: "idea",
    channel: "LinkedIn pers.",
    date: "post-evento",
    hasImage: false
  }
]

const statusColors: Record<ContentStatus, { bg: string; text: string; label: string }> = {
  approved: { bg: "#DCFCE7", text: "#059669", label: "Approvato" },
  draft: { bg: "#FEF3C7", text: "#D97706", label: "Bozza" },
  generating: { bg: "#DBEAFE", text: "#2563EB", label: "In generazione" },
  idea: { bg: "#F3F4F6", text: "#6B7280", label: "Idea" },
  scheduled: { bg: "#EDE9FE", text: "#7C3AED", label: "Programmato" }
}

const statusDotColors: Record<ContentStatus, string> = {
  approved: "#059669",
  draft: "#D97706",
  generating: "#2563EB",
  idea: "#9CA3AF",
  scheduled: "#7C3AED"
}

const typeFilters = [
  { key: "all", label: "Tutti", count: 6 },
  { key: "post", label: "Post", count: 3 },
  { key: "newsletter", label: "Newsletter", count: 1 },
  { key: "article", label: "Articoli", count: 1 },
  { key: "email", label: "Email", count: 1 },
  { key: "idea", label: "Idee", count: 1 }
]

const duplicateChannels = [
  { id: "instagram", label: "Instagram", icon: "IG" },
  { id: "newsletter", label: "Newsletter", icon: "NL" },
  { id: "telegram", label: "Telegram", icon: "TG" },
  { id: "linkedin-az", label: "LinkedIn aziendale", icon: "LA" },
]

export function ContentFactory() {
  const [selectedId, setSelectedId] = useState("1")
  const [activeFilter, setActiveFilter] = useState("all")
  const [ideaBrief, setIdeaBrief] = useState("")
  const [ideaType, setIdeaType] = useState("post")
  const [ideaChannel, setIdeaChannel] = useState("linkedin")
  const [ideaRubrica, setIdeaRubrica] = useState("r1")
  const [ideaLanguage, setIdeaLanguage] = useState("it")
  const [showChannelPreview, setShowChannelPreview] = useState(false)
  const [showDuplicateMenu, setShowDuplicateMenu] = useState(false)
  const [showVersionsModal, setShowVersionsModal] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const filteredContents = activeFilter === "all" 
    ? contents 
    : contents.filter(c => c.type === activeFilter)

  const selectedContent = contents.find(c => c.id === selectedId)

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredContents.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredContents.map(c => c.id))
    }
  }

  const draftCount = filteredContents.filter(c => c.status === "draft").length

  return (
    <div className="flex h-full">
      {/* Left Panel - Content List */}
      <div 
        className="w-[30%] border-r flex flex-col"
        style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
      >
        {/* Header */}
        <div className="p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
              Content Factory
            </h1>
            <button 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Plus size={14} />
              Nuovo
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {typeFilters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className="px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: activeFilter === filter.key ? "#DBEAFE" : "#F3F4F6",
                  color: activeFilter === filter.key ? "#2563EB" : "#6B7280",
                  border: activeFilter === filter.key ? "1px solid #2563EB" : "1px solid transparent"
                }}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Batch Actions Bar */}
        {selectedItems.length > 0 && (
          <div 
            className="p-3 border-b flex items-center justify-between"
            style={{ borderColor: "#E5E7EB", backgroundColor: "#EFF6FF" }}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedItems.length === filteredContents.length}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                {selectedItems.length} selezionati
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1.5 rounded-md text-[11px] font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#059669" }}
              >
                Approva tutti
              </button>
              <button 
                className="px-3 py-1.5 rounded-md text-[11px] font-medium border transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
                onClick={() => setSelectedItems([])}
              >
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* Content List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContents.map((item, index) => (
            <div
              key={item.id}
              className="p-3 border-b cursor-pointer transition-colors flex items-start gap-2"
              style={{
                borderColor: "#E5E7EB",
                backgroundColor: selectedId === item.id ? "#EFF6FF" : "transparent",
                borderLeft: selectedId === item.id ? "3px solid #2563EB" : "3px solid transparent"
              }}
            >
              {/* Drag Handle */}
              <div className="pt-1 cursor-grab" title="Trascina per riordinare">
                <GripVertical size={14} style={{ color: "#D1D5DB" }} />
              </div>
              
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => {
                  e.stopPropagation()
                  handleSelectItem(item.id)
                }}
                className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              
              <div 
                className="flex-1 min-w-0"
                onClick={() => setSelectedId(item.id)}
              >
                <div className="flex items-start gap-2">
                  <div 
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: statusDotColors[item.status] }}
                  />
                  <div className="flex-1 min-w-0">
                    <p 
                      className="text-[13px] font-semibold truncate"
                      style={{ color: "#1B2B4B" }}
                    >
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
<span 
                                        className="px-2 py-0.5 rounded text-[10px] font-medium"
                                        style={{ 
                                          backgroundColor: statusColors[item.status].bg,
                                          color: statusColors[item.status].text
                                        }}
                                      >
                                        {statusColors[item.status].label}
                                      </span>
                                      {item.generatedBy && (
                                        <span className="flex items-center gap-1 text-[10px]" style={{ color: "#9CA3AF" }}>
                                          <span
                                            className="flex h-[14px] w-[14px] items-center justify-center rounded-full text-[7px] font-bold text-white"
                                            style={{ backgroundColor: "#2563EB" }}
                                          >
                                            {item.generatedBy.initials}
                                          </span>
                                          {item.generatedBy.name}
                                        </span>
                                      )}
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-medium"
                        style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                      >
                        {item.channel}
                      </span>
                      <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                        {item.date}
                      </span>
                      {item.hasImage && (
                        <Image size={12} style={{ color: "#7C8CA2" }} />
                      )}
                      {item.comments && item.comments > 0 && (
                        <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "#7C8CA2" }}>
                          <MessageSquare size={10} />
                          {item.comments}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Content Detail */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedContent && (
          <>
            {/* Detail Header */}
            <div className="p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                    {selectedContent.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span 
                      className="px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{ 
                        backgroundColor: statusColors[selectedContent.status].bg,
                        color: statusColors[selectedContent.status].text
                      }}
                    >
                      {statusColors[selectedContent.status].label}
                    </span>
                    {selectedContent.rubrica && (
                      <span 
                        className="px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{ backgroundColor: "#EDE9FE", color: "#7C3AED" }}
                      >
                        {selectedContent.rubrica}
                      </span>
                    )}
                    <span className="text-[12px]" style={{ color: "#7C8CA2" }}>
                      Copywriter - {selectedContent.channel} - Italiano
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* Duplicate for other channel */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowDuplicateMenu(!showDuplicateMenu)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                    >
                      <Copy size={14} />
                      Duplica per...
                    </button>
                    {showDuplicateMenu && (
                      <div 
                        className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-white shadow-lg z-10"
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        <p className="px-3 py-2 text-[10px] uppercase font-medium border-b" style={{ color: "#7C8CA2", borderColor: "#E5E7EB" }}>
                          Duplica per altro canale
                        </p>
                        {duplicateChannels.map(ch => (
                          <button
                            key={ch.id}
                            onClick={() => setShowDuplicateMenu(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-left hover:bg-gray-50 transition-colors"
                            style={{ color: "#1B2B4B" }}
                          >
                            <span 
                              className="w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center"
                              style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                            >
                              {ch.icon}
                            </span>
                            {ch.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Previous versions */}
                  {selectedContent.versions && selectedContent.versions > 1 && (
                    <button 
                      onClick={() => setShowVersionsModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                    >
                      <History size={14} />
                      Versioni ({selectedContent.versions})
                    </button>
                  )}
                  
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                  >
                    <Image size={14} />
                    Immagine
                  </button>
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                  >
                    <RefreshCw size={14} />
                    Rigenera
                  </button>
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                  >
                    <ClipboardCheck size={14} />
                    Verifica coerenza
                  </button>
                </div>
              </div>
              
              {/* Channel Preview Toggle */}
              {selectedContent.channel === "LinkedIn pers." && selectedContent.status !== "idea" && selectedContent.status !== "generating" && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => setShowChannelPreview(!showChannelPreview)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors"
                    style={{ 
                      backgroundColor: showChannelPreview ? "#DBEAFE" : "#F3F4F6",
                      color: showChannelPreview ? "#2563EB" : "#6B7280"
                    }}
                  >
                    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${showChannelPreview ? 'border-blue-500' : 'border-gray-400'}`}>
                      {showChannelPreview && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                    </span>
                    Preview canale
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: "#F7F8FA" }}>
              {selectedContent.status === "idea" ? (
                /* Idea Editor */
                <div className="max-w-[620px] mx-auto">
                  <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "#E5E7EB" }}>
                    <h3 className="text-[16px] font-semibold text-center mb-4" style={{ color: "#1B2B4B" }}>
                      Descrivi la tua idea
                    </h3>
                    <textarea
                      value={ideaBrief}
                      onChange={(e) => setIdeaBrief(e.target.value)}
                      placeholder="Descrivi il tema, l'angolo, il tono che vuoi..."
                      className="w-full h-[120px] p-4 border rounded-lg text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                    />
                    
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      <div>
                        <label className="text-[11px] font-medium mb-1 block" style={{ color: "#7C8CA2" }}>
                          Tipo
                        </label>
                        <select
                          value={ideaType}
                          onChange={(e) => setIdeaType(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                        >
                          <option value="post">Post</option>
                          <option value="newsletter">Newsletter</option>
                          <option value="article">Articolo</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-medium mb-1 block" style={{ color: "#7C8CA2" }}>
                          Canale
                        </label>
                        <select
                          value={ideaChannel}
                          onChange={(e) => setIdeaChannel(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                        >
                          <option value="linkedin">LinkedIn pers.</option>
                          <option value="linkedin-company">LinkedIn aziendale</option>
                          <option value="beehiiv">Beehiiv</option>
                          <option value="medium">Medium</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-medium mb-1 block" style={{ color: "#7C8CA2" }}>
                          Rubrica
                        </label>
                        <select
                          value={ideaRubrica}
                          onChange={(e) => setIdeaRubrica(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                        >
                          <option value="r1">R1 — Una domanda</option>
                          <option value="r2">R2 — Caso studio</option>
                          <option value="r3">R3 — Behind the scenes</option>
                          <option value="r4">R4 — Tools & Tips</option>
                          <option value="r5">R5 — Opinione</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-medium mb-1 block" style={{ color: "#7C8CA2" }}>
                          Lingua
                        </label>
                        <select
                          value={ideaLanguage}
                          onChange={(e) => setIdeaLanguage(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                        >
                          <option value="it">Italiano</option>
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      className="w-full mt-6 py-3 rounded-lg text-[14px] font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#2563EB" }}
                    >
                      Genera con Copywriter
                    </button>
                  </div>
                </div>
              ) : selectedContent.status === "generating" ? (
                /* Generating State */
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-white rounded-lg p-8 border text-center" style={{ borderColor: "#E5E7EB" }}>
                    <Loader2 
                      size={48} 
                      className="animate-spin mx-auto mb-4"
                      style={{ color: "#2563EB" }}
                    />
                    <p className="text-[15px] font-medium" style={{ color: "#1B2B4B" }}>
                      Il Copywriter sta generando questo contenuto...
                    </p>
                    <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="h-full rounded-full animate-pulse"
                        style={{ 
                          backgroundColor: "#2563EB",
                          width: "60%",
                          animation: "pulse 1.5s ease-in-out infinite"
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : showChannelPreview && selectedContent.channel === "LinkedIn pers." ? (
                /* LinkedIn Preview Mockup */
                <div className="max-w-[620px] mx-auto">
                  <div 
                    className="bg-white rounded-lg border overflow-hidden"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    {/* LinkedIn Header */}
                    <div className="p-4 flex items-start gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-bold flex-shrink-0"
                        style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                      >
                        EC
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-semibold" style={{ color: "#000000" }}>
                          Emanuele Casero
                        </p>
                        <p className="text-[12px]" style={{ color: "#666666" }}>
                          Coach AI & Strategist | Founder HumanAImpact
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: "#999999" }}>
                          1 g - Modificato - 🌐
                        </p>
                      </div>
                    </div>
                    
                    {/* LinkedIn Content */}
                    <div className="px-4 pb-3">
                      <p 
                        className="text-[14px] whitespace-pre-wrap"
                        style={{ color: "#000000", lineHeight: 1.5 }}
                      >
                        {selectedContent.content}
                      </p>
                    </div>
                    
                    {/* LinkedIn Image */}
                    {selectedContent.hasImage && (
                      <div 
                        className="w-full h-[300px] flex items-center justify-center"
                        style={{ backgroundColor: "#F3F4F6" }}
                      >
                        <div className="text-center">
                          <Image size={48} style={{ color: "#9CA3AF" }} className="mx-auto mb-2" />
                          <p className="text-[12px]" style={{ color: "#6B7280" }}>
                            {selectedContent.imageName}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* LinkedIn Engagement Bar */}
                    <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: "#E5E7EB" }}>
                      <div className="flex items-center gap-1 text-[12px]" style={{ color: "#666666" }}>
                        <span className="flex -space-x-1">
                          <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                          <span className="w-4 h-4 rounded-full bg-red-500"></span>
                        </span>
                        <span className="ml-1">24</span>
                      </div>
                      <div className="text-[12px]" style={{ color: "#666666" }}>
                        3 commenti - 2 diffusioni
                      </div>
                    </div>
                    
                    {/* LinkedIn Actions */}
                    <div className="px-4 py-2 border-t flex items-center justify-around" style={{ borderColor: "#E5E7EB" }}>
                      <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 text-[13px]" style={{ color: "#666666" }}>
                        Consiglia
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 text-[13px]" style={{ color: "#666666" }}>
                        Commenta
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 text-[13px]" style={{ color: "#666666" }}>
                        Diffondi
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 text-[13px]" style={{ color: "#666666" }}>
                        Invia
                      </button>
                    </div>
                  </div>
                  <p className="text-center mt-4 text-[11px]" style={{ color: "#7C8CA2" }}>
                    Anteprima LinkedIn - come apparira nel feed
                  </p>
                </div>
              ) : (
                /* Content Display */
                <div className="max-w-[620px] mx-auto">
                  {/* Editing Toolbar */}
                  <div 
                    className="bg-white rounded-t-lg border border-b-0 px-3 py-2 flex items-center gap-1"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <button 
                      className="p-2 rounded hover:bg-gray-100 transition-colors"
                      title="Grassetto"
                    >
                      <Bold size={16} style={{ color: "#6B7280" }} />
                    </button>
                    <button 
                      className="p-2 rounded hover:bg-gray-100 transition-colors"
                      title="Corsivo"
                    >
                      <Italic size={16} style={{ color: "#6B7280" }} />
                    </button>
                    <button 
                      className="p-2 rounded hover:bg-gray-100 transition-colors"
                      title="Link"
                    >
                      <Link2 size={16} style={{ color: "#6B7280" }} />
                    </button>
                    <button 
                      className="p-2 rounded hover:bg-gray-100 transition-colors"
                      title="Lista"
                    >
                      <List size={16} style={{ color: "#6B7280" }} />
                    </button>
                    <div className="h-5 w-px mx-2" style={{ backgroundColor: "#E5E7EB" }} />
                    <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
                      Modifica inline
                    </span>
                  </div>
                  
                  <div 
                    className="bg-white rounded-b-lg border p-6"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <p 
                      className="text-[15px] whitespace-pre-wrap"
                      style={{ 
                        color: "#1F2937",
                        lineHeight: 1.8
                      }}
                    >
                      {selectedContent.content}
                    </p>
                  </div>

                  {/* Image Area */}
                  {selectedContent.hasImage && (
                    <div 
                      className="mt-4 bg-white rounded-lg border p-4"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <div 
                        className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center"
                        style={{ borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" }}
                      >
                        <div 
                          className="w-full h-[160px] rounded-md flex items-center justify-center mb-3"
                          style={{ backgroundColor: "#E5E7EB" }}
                        >
                          <Image size={32} style={{ color: "#9CA3AF" }} />
                        </div>
                        <p className="text-[12px] mb-2" style={{ color: "#6B7280" }}>
                          {selectedContent.imageName}
                        </p>
                        <button 
                          className="px-4 py-2 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                          style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                        >
                          Cambia immagine
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div 
              className="p-3 border-t flex items-center justify-between"
              style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
            >
              <div className="flex gap-2">
                {selectedContent.status === "draft" && (
                  <>
                    <button 
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-md text-[14px] font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#059669" }}
                    >
                      <Check size={16} />
                      Approva
                    </button>
                    <button 
                      className="px-4 py-2.5 rounded-md text-[13px] font-medium border transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                    >
                      Modifica
                    </button>
                    <button 
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-[13px] font-medium border transition-colors hover:bg-red-50"
                      style={{ borderColor: "#E5E7EB", color: "#DC2626" }}
                    >
                      <X size={14} />
                      Rifiuta
                    </button>
                  </>
                )}
                {selectedContent.status === "approved" && (
                  <>
                    <button 
                      className="px-5 py-2.5 rounded-md text-[14px] font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#2563EB" }}
                    >
                      Pubblica ora
                    </button>
                    <button 
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-[13px] font-medium border transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                    >
                      <Calendar size={14} />
                      Programma
                    </button>
                  </>
                )}
                {selectedContent.status === "scheduled" && (
                  <>
                    <button 
                      className="px-5 py-2.5 rounded-md text-[14px] font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#2563EB" }}
                    >
                      Pubblica ora
                    </button>
                    <button 
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-[13px] font-medium border transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                    >
                      <Calendar size={14} />
                      Modifica programmazione
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#E5E7EB", color: "#7C8CA2" }}
                >
                  <MessageSquare size={14} />
                  Commenta
                </button>
                <button 
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-medium border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#E5E7EB", color: "#7C8CA2" }}
                >
                  <Share2 size={14} />
                  Assegna
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Versions Modal */}
      {showVersionsModal && selectedContent && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowVersionsModal(false)}
        >
          <div 
            className="bg-white rounded-xl w-[500px] max-h-[80vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="text-[16px] font-semibold" style={{ color: "#1B2B4B" }}>
                Versioni precedenti
              </h3>
              <button 
                onClick={() => setShowVersionsModal(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X size={18} style={{ color: "#6B7280" }} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {[...Array(selectedContent.versions || 1)].map((_, i) => (
                <div 
                  key={i}
                  className="p-3 rounded-lg border mb-2 cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ borderColor: i === 0 ? "#2563EB" : "#E5E7EB", backgroundColor: i === 0 ? "#EFF6FF" : "white" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                      Versione {(selectedContent.versions || 1) - i}
                      {i === 0 && <span className="ml-2 text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}>Attuale</span>}
                    </span>
                    <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                      {i === 0 ? "oggi 08:15" : i === 1 ? "ieri 14:30" : "2 giorni fa"}
                    </span>
                  </div>
                  <p className="text-[12px] line-clamp-2" style={{ color: "#6B7280" }}>
                    {selectedContent.content?.substring(0, 100)}...
                  </p>
                  {i > 0 && (
                    <button 
                      className="mt-2 text-[11px] font-medium"
                      style={{ color: "#2563EB" }}
                    >
                      Ripristina questa versione
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Agent Avatar */}
      <FloatingAgentAvatar initials="CW" agentName="Copywriter" />
    </div>
  )
}
