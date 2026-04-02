"use client"

import { useState } from "react"
import { Search, Plus, X, ExternalLink, Copy, Check, Loader2 } from "lucide-react"
import { FloatingAgentAvatar } from "./floating-agent-avatar"

interface ResearchTopic {
  id: string
  title: string
  category: string
  sources: number
  lastUpdated: string
  status: "active" | "completed" | "archived"
}

const mockTopics: ResearchTopic[] = [
  {
    id: "1",
    title: "Trend coaching digitale 2024-2025",
    category: "Mercato",
    sources: 12,
    lastUpdated: "Ieri",
    status: "active",
  },
  {
    id: "2",
    title: "Uso di AI negli spazi di coaching",
    category: "Technologia",
    sources: 8,
    lastUpdated: "3 giorni fa",
    status: "completed",
  },
  {
    id: "3",
    title: "Nuovi competitor nel coaching online",
    category: "Competizione",
    sources: 15,
    lastUpdated: "1 settimana fa",
    status: "completed",
  },
]

interface ResearchSource {
  id: string
  url: string
  title: string
  domain: string
  excerpt: string
  addedAt: string
}

const mockSources: ResearchSource[] = [
  {
    id: "1",
    url: "https://example.com/article1",
    title: "The Future of AI in Professional Coaching",
    domain: "coachingtoday.com",
    excerpt: "Exploring how artificial intelligence is transforming professional coaching practices, including new opportunities and challenges...",
    addedAt: "Oggi",
  },
  {
    id: "2",
    url: "https://example.com/article2",
    title: "Digital Transformation in Coaching: What Clients Want",
    domain: "coachfederation.org",
    excerpt: "Recent survey of 2,000+ coaching clients reveals preferences for technology integration, hybrid coaching models, and data-driven outcomes...",
    addedAt: "Ieri",
  },
]

export function DeepResearch() {
  const [activeTab, setActiveTab] = useState<"topics" | "research">("topics")
  const [selectedTopic, setSelectedTopic] = useState<ResearchTopic | null>(null)
  const [showNewTopic, setShowNewTopic] = useState(false)
  const [newTopicTitle, setNewTopicTitle] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyUrl = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b px-6 py-4" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[16px] font-semibold" style={{ color: "#1B2B4B" }}>
              Deep Research
            </h1>
            <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
              Raccogli e organizza ricerche di mercato, competitor e trend
            </p>
          </div>
          <button
            onClick={() => setShowNewTopic(true)}
            className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            <Plus className="h-4 w-4" />
            Nuovo argomento
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("topics")}
            className="pb-2 text-[14px] font-medium border-b-2 transition-colors"
            style={{
              borderColor: activeTab === "topics" ? "#2563EB" : "transparent",
              color: activeTab === "topics" ? "#2563EB" : "#7C8CA2",
            }}
          >
            Argomenti ({mockTopics.length})
          </button>
          <button
            onClick={() => setActiveTab("research")}
            className="pb-2 text-[14px] font-medium border-b-2 transition-colors"
            style={{
              borderColor: activeTab === "research" ? "#2563EB" : "transparent",
              color: activeTab === "research" ? "#2563EB" : "#7C8CA2",
            }}
          >
            Ricerca guidata
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "topics" ? (
          <div className="p-6 max-w-3xl">
            {/* Filter */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: "#9CA3AF" }} />
                <input
                  type="text"
                  placeholder="Cerca argomenti..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-3 gap-4">
              {mockTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="p-4 rounded-lg border-2 cursor-pointer transition-colors"
                  style={{
                    borderColor: selectedTopic?.id === topic.id ? "#2563EB" : "#E5E7EB",
                    backgroundColor: selectedTopic?.id === topic.id ? "#EFF6FF" : "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2563EB"
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTopic?.id !== topic.id) {
                      e.currentTarget.style.borderColor = "#E5E7EB"
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[14px]" style={{ color: "#1B2B4B" }}>
                      {topic.title}
                    </h3>
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: topic.status === "active" ? "#D1FAE5" : "#F3F4F6",
                        color: topic.status === "active" ? "#059669" : "#6B7280",
                      }}
                    >
                      {topic.status === "active" ? "Attivo" : "Completato"}
                    </span>
                  </div>

                  <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                    {topic.category}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
                      {topic.sources} fonti
                    </span>
                    <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
                      {topic.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Topic Details */}
            {selectedTopic && (
              <div className="mt-8 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
                <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#1B2B4B" }}>
                  {selectedTopic.title}
                </h2>

                <div className="space-y-3">
                  {mockSources.map((source) => (
                    <div key={source.id} className="p-4 rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-semibold hover:underline flex items-center gap-1 mb-1"
                            style={{ color: "#2563EB" }}
                          >
                            {source.title}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                            {source.domain} • {source.addedAt}
                          </p>
                          <p className="text-[12px] mt-2 line-clamp-2" style={{ color: "#6B7280" }}>
                            {source.excerpt}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopyUrl(source.id)}
                          className="p-2 hover:bg-gray-100 rounded flex-shrink-0"
                        >
                          {copiedId === source.id ? (
                            <Check className="h-4 w-4" style={{ color: "#059669" }} />
                          ) : (
                            <Copy className="h-4 w-4" style={{ color: "#9CA3AF" }} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Guided Research Tab */
          <div className="p-6 max-w-3xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-bold mb-4" style={{ color: "#1B2B4B" }}>
                  Ricerca guidata
                </h2>
                <p className="text-[13px] mb-4" style={{ color: "#7C8CA2" }}>
                  Lo Strategist ti guida attraverso una ricerca strutturata su un argomento specifico.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {["Trend di mercato", "Analisi competitor", "Sentiment analisi", "Segmentazione audience"].map(
                    (item) => (
                      <button
                        key={item}
                        className="p-4 rounded-lg border-2 hover:border-blue-500 transition-colors text-left"
                        style={{ borderColor: "var(--color-border)", backgroundColor: "#F9FAFB" }}
                      >
                        <span className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                          {item}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Start Research */}
              <div className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
                <label className="block text-[14px] font-medium mb-2" style={{ color: "#1B2B4B" }}>
                  Argomento di ricerca
                </label>
                <textarea
                  placeholder="Descrivi l'argomento che vuoi investigare..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "var(--color-border)" }}
                />
                <button
                  className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Avvia ricerca guidata
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Topic Modal */}
      {showNewTopic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                Nuovo argomento
              </h3>
              <button onClick={() => setShowNewTopic(false)}>
                <X className="h-4 w-4" style={{ color: "#9CA3AF" }} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Titolo argomento..."
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "var(--color-border)" }}
            />

            <select
              className="w-full px-3 py-2 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "var(--color-border)" }}
            >
              <option>Mercato</option>
              <option>Tecnologia</option>
              <option>Competizione</option>
              <option>Trend</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowNewTopic(false)}
                className="flex-1 px-4 py-2 rounded-lg border font-medium"
                style={{ borderColor: "var(--color-border)", color: "#1B2B4B" }}
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  setShowNewTopic(false)
                  setNewTopicTitle("")
                }}
                className="flex-1 px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                Crea
              </button>
            </div>
          </div>
        </div>
      )}

      <FloatingAgentAvatar initials="ST" agentName="Strategist" />
    </div>
  )
}
