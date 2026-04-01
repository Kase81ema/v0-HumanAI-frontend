"use client"

import { useState } from "react"
import { Plus, ArrowRight, MoreHorizontal, Trash2, Copy, Eye, Edit2, X, Check } from "lucide-react"
import { FloatingAgentAvatar } from "./floating-agent-avatar"

interface ContentItem {
  id: string
  title: string
  type: "post" | "newsletter" | "email" | "idea"
  status: "idea" | "draft" | "approved" | "scheduled" | "published"
  channel: string
  agentInitials: string
  agentName: string
  draftedAt: string
  scheduledDate?: string
  engagement?: number
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "AI e coaching: come integrarli senza perdere l'umanità",
    type: "post",
    status: "approved",
    channel: "LinkedIn pers.",
    agentInitials: "CW",
    agentName: "Copywriter",
    draftedAt: "Ieri 14:32",
    scheduledDate: "Oggi 9:00",
  },
  {
    id: "2",
    title: "Newsletter #47 - Maggio: Focus su Relazione",
    type: "newsletter",
    status: "draft",
    channel: "Beehiiv",
    agentInitials: "CW",
    agentName: "Copywriter",
    draftedAt: "Ieri 10:15",
  },
  {
    id: "3",
    title: "Email reminder workshop - 15 posti rimasti",
    type: "email",
    status: "scheduled",
    channel: "Email",
    agentInitials: "FN",
    agentName: "Funnel",
    draftedAt: "2 giorni fa",
    scheduledDate: "Oggi 14:00",
  },
  {
    id: "4",
    title: "Post engagement - Domande sul ROI del coaching",
    type: "post",
    status: "published",
    channel: "LinkedIn pers.",
    agentInitials: "CW",
    agentName: "Copywriter",
    draftedAt: "3 giorni fa",
    engagement: 156,
  },
  {
    id: "5",
    title: "Deep dive: Cosa NON facciamo (e perché)",
    type: "idea",
    status: "idea",
    channel: "Blog",
    agentInitials: "ST",
    agentName: "Strategist",
    draftedAt: "Oggi 11:20",
  },
]

const statusConfig = {
  idea: { label: "Idea", bg: "#F3F4F6", text: "#6B7280", badgeBg: "#9CA3AF" },
  draft: { label: "Bozza", bg: "#FEF3C7", text: "#B45309", badgeBg: "#F59E0B" },
  approved: { label: "Approvato", bg: "#D1FAE5", text: "#047857", badgeBg: "#10B981" },
  scheduled: { label: "Programmato", bg: "#DBEAFE", text: "#1E40AF", badgeBg: "#3B82F6" },
  published: { label: "Pubblicato", bg: "#E0E7FF", text: "#4F46E5", badgeBg: "#6366F1" },
}

const typeIcons = {
  post: "📱",
  newsletter: "📧",
  email: "💌",
  idea: "💡",
}

export function ContentStudio() {
  const [viewMode, setViewMode] = useState<"list" | "create">("list")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)

  const filteredContent = filterStatus === "all" 
    ? mockContent 
    : mockContent.filter(c => c.status === filterStatus)

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b px-6 py-4" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-[22px] font-bold" style={{ color: "#1B2B4B" }}>
                Content Studio
              </h1>
              <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
                Gestisci tutti i tuoi contenuti in un unico posto
              </p>
            </div>
            <button
              onClick={() => setViewMode("create")}
              className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Plus className="h-4 w-4" />
              Nuovo contenuto
            </button>
          </div>

          {/* Status filters */}
          <div className="flex gap-2">
            {["all", "idea", "draft", "approved", "scheduled", "published"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className="rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors"
                style={{
                  backgroundColor: filterStatus === status ? "#2563EB" : "#F3F4F6",
                  color: filterStatus === status ? "#FFFFFF" : "#6B7280",
                }}
              >
                {status === "all" ? "Tutti" : statusConfig[status as keyof typeof statusConfig]?.label}
                {status === "all" && ` (${mockContent.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === "list" ? (
            <div>
              {filteredContent.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedContent(item)}
                  className="border-b p-4 cursor-pointer transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-[24px]">{typeIcons[item.type]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[14px] font-medium truncate" style={{ color: "#1B2B4B" }}>
                          {item.title}
                        </h3>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: statusConfig[item.status].bg,
                            color: statusConfig[item.status].text,
                          }}
                        >
                          {statusConfig[item.status].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[12px]" style={{ color: "#7C8CA2" }}>
                        <span>{item.channel}</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="inline-flex h-[16px] w-[16px] items-center justify-center rounded-full text-[7px] font-bold text-white"
                            style={{ backgroundColor: "#2563EB" }}
                          >
                            {item.agentInitials}
                          </span>
                          {item.agentName}
                        </span>
                        <span>{item.draftedAt}</span>
                        {item.engagement && (
                          <span style={{ color: "#059669" }}>
                            {item.engagement} engagement
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.scheduledDate && (
                        <span className="text-[11px] px-2 py-1 rounded" style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}>
                          {item.scheduledDate}
                        </span>
                      )}
                      <button className="p-2 hover:bg-gray-200 rounded">
                        <MoreHorizontal className="h-4 w-4" style={{ color: "#9CA3AF" }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Create View */
            <div className="p-6 max-w-4xl">
              <button
                onClick={() => setViewMode("list")}
                className="mb-6 text-[13px] font-medium" 
                style={{ color: "#2563EB" }}
              >
                ← Torna alla lista
              </button>

              <div className="space-y-6">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-[14px] font-medium mb-3" style={{ color: "#1B2B4B" }}>
                    Tipo di contenuto
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {["post", "newsletter", "email", "idea"].map((type) => (
                      <button
                        key={type}
                        className="p-4 rounded-lg border-2 transition-colors text-center"
                        style={{
                          borderColor: "#E5E7EB",
                          backgroundColor: "#F9FAFB",
                          color: "#1B2B4B",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#2563EB"
                          e.currentTarget.style.backgroundColor = "#EFF6FF"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#E5E7EB"
                          e.currentTarget.style.backgroundColor = "#F9FAFB"
                        }}
                      >
                        <div className="text-[24px] mb-1">{typeIcons[type as keyof typeof typeIcons]}</div>
                        <div className="text-[12px] font-medium capitalize">{type}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collapsible Configuration Sections */}
                <div className="space-y-3">
                  {["Tema e ricerca", "Tone & Style", "Distribuzione", "Meta & SEO"].map((section) => (
                    <div key={section} className="border rounded-lg" style={{ borderColor: "#E5E7EB" }}>
                      <button
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                        style={{ backgroundColor: "#F9FAFB" }}
                      >
                        <span className="font-medium text-[14px]" style={{ color: "#1B2B4B" }}>
                          {section}
                        </span>
                        <ArrowRight className="h-4 w-4" style={{ color: "#9CA3AF" }} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Generate Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    className="flex-1 px-4 py-3 rounded-lg font-medium text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                    Genera con AI
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className="flex-1 px-4 py-3 rounded-lg border font-medium"
                    style={{ borderColor: "#E5E7EB", color: "#1B2B4B" }}
                  >
                    Annulla
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side Panel - Content Details */}
      {selectedContent && (
        <div
          className="w-[360px] border-l flex flex-col"
          style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
        >
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
            <h2 className="text-[14px] font-bold" style={{ color: "#1B2B4B" }}>
              Dettagli
            </h2>
            <button
              onClick={() => setSelectedContent(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" style={{ color: "#9CA3AF" }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Status */}
            <div>
              <label className="text-[11px] uppercase font-semibold" style={{ color: "#7C8CA2" }}>
                Stato
              </label>
              <span
                className="inline-block rounded-full px-3 py-1 text-[12px] font-medium mt-1"
                style={{
                  backgroundColor: statusConfig[selectedContent.status].bg,
                  color: statusConfig[selectedContent.status].text,
                }}
              >
                {statusConfig[selectedContent.status].label}
              </span>
            </div>

            {/* Agent */}
            <div>
              <label className="text-[11px] uppercase font-semibold" style={{ color: "#7C8CA2" }}>
                Generato da
              </label>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  {selectedContent.agentInitials}
                </span>
                <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                  {selectedContent.agentName}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-4 border-t" style={{ borderColor: "#E5E7EB" }}>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50" style={{ borderColor: "#E5E7EB" }}>
                <Eye className="h-4 w-4" style={{ color: "#2563EB" }} />
                <span className="text-[13px]" style={{ color: "#1B2B4B" }}>Anteprima</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50" style={{ borderColor: "#E5E7EB" }}>
                <Copy className="h-4 w-4" style={{ color: "#2563EB" }} />
                <span className="text-[13px]" style={{ color: "#1B2B4B" }}>Duplica</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50" style={{ borderColor: "#E5E7EB" }}>
                <Edit2 className="h-4 w-4" style={{ color: "#2563EB" }} />
                <span className="text-[13px]" style={{ color: "#1B2B4B" }}>Modifica</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Agent */}
      <FloatingAgentAvatar initials="CW" agentName="Copywriter" />
    </div>
  )
}
