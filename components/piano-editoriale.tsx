"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles, ArrowLeftRight, Image } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  rubric?: string
  channel: string
  language: string
  status: "approved" | "draft" | "toGenerate"
  hasImage?: boolean
  preview?: string
}

interface DayContent {
  day: string
  date: string
  items: ContentItem[]
}

const weekContent: DayContent[] = [
  {
    day: "Lunedi",
    date: "7/4",
    items: [
      {
        id: "1",
        title: "R1 — Una domanda che vale",
        rubric: "R1",
        channel: "LI pers.",
        language: "IT",
        status: "approved",
        preview: "L'AI nel coaching non sostituisce l'intuizione umana: la amplifica. Ho visto coach usare strumenti AI per preparare le sessioni...",
      },
      {
        id: "2",
        title: "Evergreen AI coaching",
        channel: "LI az.",
        language: "IT",
        status: "draft",
        hasImage: true,
        preview: "Come le aziende stanno integrando l'AI nei programmi di sviluppo leadership...",
      },
      {
        id: "3",
        title: "Adattamento IG",
        channel: "IG",
        language: "IT",
        status: "toGenerate",
      },
    ],
  },
  {
    day: "Martedi",
    date: "8/4",
    items: [
      {
        id: "4",
        title: "Leadership AI",
        channel: "LI pers.",
        language: "EN",
        status: "draft",
        preview: "Three patterns I see in leaders who successfully integrate AI...",
      },
      {
        id: "5",
        title: "Post EN aziendale",
        channel: "LI az.",
        language: "EN",
        status: "toGenerate",
      },
    ],
  },
  {
    day: "Mercoledi",
    date: "9/4",
    items: [
      {
        id: "6",
        title: "Newsletter AI & Persone",
        rubric: "R5",
        channel: "Beehiiv",
        language: "IT",
        status: "approved",
        preview: "Questa settimana parliamo di come l'AI sta trasformando il modo in cui le aziende gestiscono il talento...",
      },
      {
        id: "7",
        title: "R2 — Osservatorio AI",
        rubric: "R2",
        channel: "LI az.",
        language: "IT",
        status: "draft",
        preview: "Il nuovo regolamento EU sull'AI avrà impatti significativi su come le aziende...",
      },
    ],
  },
  {
    day: "Giovedi",
    date: "10/4",
    items: [
      {
        id: "8",
        title: "R4 — In agenda",
        rubric: "R4",
        channel: "LI az.",
        language: "IT+EN",
        status: "toGenerate",
      },
      {
        id: "9",
        title: "Telegram bilingual",
        channel: "Telegram",
        language: "IT+EN",
        status: "toGenerate",
      },
    ],
  },
  {
    day: "Venerdi",
    date: "11/4",
    items: [
      {
        id: "10",
        title: "R3 — Dentro le aziende",
        rubric: "R3",
        channel: "LI pers.",
        language: "IT",
        status: "toGenerate",
      },
      {
        id: "11",
        title: "Recap settimanale",
        channel: "LI az.",
        language: "EN",
        status: "toGenerate",
      },
    ],
  },
]

const channels = [
  { id: "all", label: "Tutti i canali" },
  { id: "li-pers", label: "LinkedIn pers." },
  { id: "li-az", label: "LinkedIn az." },
  { id: "newsletter", label: "Newsletter" },
  { id: "telegram", label: "Telegram" },
  { id: "instagram", label: "Instagram" },
  { id: "email", label: "Email" },
]

const statusConfig = {
  approved: { color: "#16A34A", label: "Approvato" },
  draft: { color: "#F59E0B", label: "Bozza" },
  toGenerate: { color: "#9CA3AF", label: "Da generare" },
}

export function PianoEditoriale() {
  const [activeChannel, setActiveChannel] = useState("all")
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const approvedCount = weekContent.flatMap(d => d.items).filter(i => i.status === "approved").length
  const draftCount = weekContent.flatMap(d => d.items).filter(i => i.status === "draft").length
  const toGenerateCount = weekContent.flatMap(d => d.items).filter(i => i.status === "toGenerate").length
  const totalCount = approvedCount + draftCount + toGenerateCount
  const rubricCount = new Set(weekContent.flatMap(d => d.items).filter(i => i.rubric).map(i => i.rubric)).size

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "#E5E7EB" }}>
        <div>
          <h1 className="mb-1 text-[16px] font-semibold" style={{ color: "#1B2B4B" }}>
            Piano editoriale — Settimana 15
          </h1>
          <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
            7-11 aprile 2026 &middot; {totalCount} contenuti &middot; {rubricCount} rubriche
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#374151" }}
          >
            <ChevronLeft className="h-4 w-4" /> Prec.
          </button>
          <button
            className="flex items-center gap-1 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#374151" }}
          >
            Succ. <ChevronRight className="h-4 w-4" />
          </button>
          <button
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            <Sparkles className="h-4 w-4" /> Genera piano
          </button>
        </div>
      </div>

      {/* Channel tabs */}
      <div className="flex gap-1 overflow-x-auto border-b px-4 py-2" style={{ borderColor: "#E5E7EB" }}>
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setActiveChannel(channel.id)}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors"
            style={{
              backgroundColor: activeChannel === channel.id ? "#2563EB" : "transparent",
              color: activeChannel === channel.id ? "#FFFFFF" : "#6B7280",
            }}
          >
            {channel.label}
          </button>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex flex-1 overflow-hidden">
        {weekContent.map((day) => (
          <div
            key={day.day}
            className="flex flex-1 flex-col border-r last:border-r-0"
            style={{ borderColor: "#E5E7EB" }}
          >
            {/* Day header */}
            <div className="border-b p-3 text-center" style={{ borderColor: "#E5E7EB" }}>
              <p className="text-[13px] font-semibold" style={{ color: "#1B2B4B" }}>
                {day.day}
              </p>
              <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                {day.date}
              </p>
            </div>

            {/* Content items */}
            <div className="flex-1 space-y-2 overflow-y-auto p-2">
              {day.items.map((item) => {
                const config = statusConfig[item.status]
                const isHovered = hoveredItem === item.id
                const isDragging = draggedItem === item.id

                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative cursor-grab rounded-lg border-l-[3px] bg-white p-2.5 shadow-sm transition-all active:cursor-grabbing"
                    style={{
                      borderLeftColor: config.color,
                      opacity: isDragging ? 0.5 : 1,
                      boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <p
                      className="mb-1.5 text-[13px] font-medium leading-tight"
                      style={{ color: "#1B2B4B" }}
                    >
                      {item.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-1">
                      {item.rubric && (
                        <span
                          className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                          style={{ backgroundColor: "rgba(124, 58, 237, 0.1)", color: "#7C3AED" }}
                        >
                          {item.rubric}
                        </span>
                      )}
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                        style={{ backgroundColor: "rgba(37, 99, 235, 0.1)", color: "#2563EB" }}
                      >
                        {item.channel}
                      </span>
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                        style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}
                      >
                        {item.language}
                      </span>
                      {item.hasImage && (
                        <Image className="h-3 w-3" style={{ color: "#9CA3AF" }} />
                      )}
                    </div>

                    {/* Preview on hover */}
                    {isHovered && item.preview && (
                      <div
                        className="absolute left-full top-0 z-10 ml-2 w-[200px] rounded-lg border bg-white p-3 shadow-lg"
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        <p
                          className="line-clamp-3 text-[12px] leading-relaxed"
                          style={{ color: "#374151" }}
                        >
                          {item.preview}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between border-t p-4"
        style={{ borderColor: "#E5E7EB" }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#16A34A" }} />
            <span className="text-[12px]" style={{ color: "#6B7280" }}>
              Approvato
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
            <span className="text-[12px]" style={{ color: "#6B7280" }}>
              Bozza
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#9CA3AF" }} />
            <span className="text-[12px]" style={{ color: "#6B7280" }}>
              Da generare
            </span>
          </div>
          <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
            {approvedCount} approvati &middot; {draftCount} bozze &middot; {toGenerateCount} da generare
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#374151" }}
          >
            <ArrowLeftRight className="h-4 w-4" /> Confronta con sett. precedente
          </button>
          <button
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            <Sparkles className="h-4 w-4" /> Genera tutti i contenuti mancanti
          </button>
        </div>
      </div>
    </div>
  )
}
