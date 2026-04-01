"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, GripVertical, Trash2, Eye } from "lucide-react"
import { FloatingAgentAvatar } from "./floating-agent-avatar"

interface PlannedContent {
  id: string
  title: string
  channel: string
  time?: string
  status: "planned" | "draft" | "scheduled" | "published"
  agent: string
}

interface DaySchedule {
  date: string
  dayName: string
  items: PlannedContent[]
}

const mockSchedule: DaySchedule[] = [
  {
    date: "Lun 8/4",
    dayName: "Lunedì",
    items: [
      { id: "1", title: "Post: AI e coaching", channel: "LinkedIn", time: "9:00", status: "published", agent: "CW" },
      { id: "2", title: "Email: Workshop reminder", channel: "Email", time: "14:00", status: "scheduled", agent: "FN" },
    ],
  },
  {
    date: "Mar 9/4",
    dayName: "Martedì",
    items: [
      { id: "3", title: "Newsletter #47", channel: "Newsletter", time: "8:00", status: "draft", agent: "CW" },
      { id: "4", title: "Post: Case study", channel: "LinkedIn", status: "planned", agent: "CW" },
    ],
  },
  {
    date: "Mer 10/4",
    dayName: "Mercoledì",
    items: [
      { id: "5", title: "Instagram story", channel: "Instagram", status: "planned", agent: "CW" },
    ],
  },
  {
    date: "Gio 11/4",
    dayName: "Giovedì",
    items: [
      { id: "6", title: "Post: Blog announcement", channel: "LinkedIn", status: "draft", agent: "CW" },
    ],
  },
  {
    date: "Ven 12/4",
    dayName: "Venerdì",
    items: [
      { id: "7", title: "Weekly digest", channel: "Newsletter", status: "planned", agent: "CW" },
    ],
  },
]

const channels = ["Tutti", "LinkedIn pers.", "LinkedIn az.", "Newsletter", "Instagram", "Email"]

const statusConfig = {
  planned: { bg: "#F3F4F6", text: "#6B7280", label: "Pianificato" },
  draft: { bg: "#FEF3C7", text: "#B45309", label: "Bozza" },
  scheduled: { bg: "#DBEAFE", text: "#1E40AF", label: "Programmato" },
  published: { bg: "#D1FAE5", text: "#047857", label: "Pubblicato" },
}

export function Planner() {
  const [activeTab, setActiveTab] = useState<"week" | "sequences">("week")
  const [selectedChannel, setSelectedChannel] = useState("Tutti")
  const [currentWeek, setCurrentWeek] = useState(0)

  const channelEmojis: Record<string, string> = {
    "LinkedIn": "💼",
    "Newsletter": "📧",
    "Instagram": "📷",
    "Email": "💌",
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b px-6 py-4" style={{ borderColor: "#E5E7EB" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[22px] font-bold" style={{ color: "#1B2B4B" }}>
              Planner
            </h1>
            <p className="text-[13px]" style={{ color: "#7C8CA2" }}>
              Pianifica e visualizza i tuoi contenuti per la settimana
            </p>
          </div>
          <button
            className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            <Plus className="h-4 w-4" />
            Aggiungi contenuto
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab("week")}
            className="pb-2 text-[14px] font-medium border-b-2 transition-colors"
            style={{
              borderColor: activeTab === "week" ? "#2563EB" : "transparent",
              color: activeTab === "week" ? "#2563EB" : "#7C8CA2",
            }}
          >
            Calendario settimanale
          </button>
          <button
            onClick={() => setActiveTab("sequences")}
            className="pb-2 text-[14px] font-medium border-b-2 transition-colors"
            style={{
              borderColor: activeTab === "sequences" ? "#2563EB" : "transparent",
              color: activeTab === "sequences" ? "#2563EB" : "#7C8CA2",
            }}
          >
            Sequenze
          </button>
        </div>

        {/* Channel Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {channels.map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChannel(ch)}
              className="rounded-full px-3 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors"
              style={{
                backgroundColor: selectedChannel === ch ? "#2563EB" : "#F3F4F6",
                color: selectedChannel === ch ? "#FFFFFF" : "#6B7280",
              }}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "week" ? (
          <div className="p-6">
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="h-5 w-5" style={{ color: "#9CA3AF" }} />
              </button>
              <h2 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                Settimana 8-12 Aprile
              </h2>
              <button
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="h-5 w-5" style={{ color: "#9CA3AF" }} />
              </button>
            </div>

            {/* Weekly Grid */}
            <div className="grid grid-cols-5 gap-4">
              {mockSchedule.map((day) => (
                <div
                  key={day.date}
                  className="rounded-lg border p-4"
                  style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
                >
                  <h3 className="font-semibold text-[13px] mb-3" style={{ color: "#1B2B4B" }}>
                    <div>{day.dayName}</div>
                    <div style={{ color: "#9CA3AF" }}>{day.date}</div>
                  </h3>

                  <div className="space-y-2 min-h-[300px]">
                    {day.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-lg border cursor-move group hover:shadow-sm transition-shadow"
                        style={{
                          backgroundColor: statusConfig[item.status].bg,
                          borderColor: "#E5E7EB",
                        }}
                      >
                        <div className="flex items-start gap-1.5">
                          <GripVertical className="h-3 w-3 mt-0.5 opacity-0 group-hover:opacity-100" style={{ color: "#9CA3AF" }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium truncate" style={{ color: statusConfig[item.status].text }}>
                              {item.title}
                            </p>
                            <div className="flex items-center justify-between gap-1 mt-1">
                              <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                                {item.channel}
                              </span>
                              {item.time && (
                                <span className="text-[10px] font-medium" style={{ color: "#2563EB" }}>
                                  {item.time}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full mt-4 py-2 rounded-lg border-2 border-dashed text-[12px] font-medium transition-colors"
                    style={{ borderColor: "#E5E7EB", color: "#7C8CA2" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#2563EB"
                      e.currentTarget.style.color = "#2563EB"
                      e.currentTarget.style.backgroundColor = "#EFF6FF"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E5E7EB"
                      e.currentTarget.style.color = "#7C8CA2"
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    + Aggiungi
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Sequences Tab */
          <div className="p-6 max-w-4xl">
            <h2 className="text-[18px] font-bold mb-4" style={{ color: "#1B2B4B" }}>
              Sequenze attive
            </h2>

            <div className="space-y-3">
              {[
                { name: "Welcome sequence", status: "active", sends: "245/500 inviate" },
                { name: "Post-evento follow-up", status: "active", sends: "18/25 inviate" },
                { name: "Newsletter automation", status: "paused", sends: "Sospesa" },
              ].map((seq) => (
                <div key={seq.name} className="p-4 rounded-lg border" style={{ borderColor: "#E5E7EB" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[13px]" style={{ color: "#1B2B4B" }}>
                        {seq.name}
                      </p>
                      <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                        {seq.sends}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <Eye className="h-4 w-4" style={{ color: "#2563EB" }} />
                      </button>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          backgroundColor: seq.status === "active" ? "#D1FAE5" : "#FEE2E2",
                          color: seq.status === "active" ? "#059669" : "#DC2626",
                        }}
                      >
                        {seq.status === "active" ? "Attiva" : "Sospesa"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FloatingAgentAvatar initials="CW" agentName="Copywriter" />
    </div>
  )
}
