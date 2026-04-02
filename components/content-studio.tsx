"use client"

import { useState } from "react"
import { Plus, ArrowRight, MoreHorizontal, Trash2, Copy, Eye, Edit2, X, Check, ChevronRight } from "lucide-react"
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

// Suggested topics for Step 1
const suggestedTopics = [
  { id: "1", label: "«Come cambierà il mio lavoro con l'AI?»", channel: "LinkedIn", type: "post" },
  { id: "2", label: "Newsletter #48 - Giugno: Focus su Efficacia", channel: "Beehiiv", type: "newsletter" },
  { id: "3", label: "Email reminder: ultimi 3 giorni iscrizioni", channel: "Email", type: "email" },
  { id: "4", label: "Testimonianza cliente: ROI coaching 320%", channel: "LinkedIn", type: "post" },
  { id: "5", label: "Deep dive: Posizionamento vs competitor", channel: "Blog", type: "post" },
]

export function ContentStudio() {
  const [viewMode, setViewMode] = useState<"list" | "wizard">("list")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  
  // Wizard state
  const [wizardStep, setWizardStep] = useState(1)
  const [selectedTopic, setSelectedTopic] = useState<typeof suggestedTopics[0] | null>(null)
  const [customizations, setCustomizations] = useState({
    tone: "professional",
    length: "medium",
    cta: "engagement",
    targetAudience: "",
  })
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  const filteredContent = filterStatus === "all" 
    ? mockContent 
    : mockContent.filter(c => c.status === filterStatus)

  // Handle wizard step 1 - topic selection
  const handleTopicSelect = (topic: typeof suggestedTopics[0]) => {
    setSelectedTopic(topic)
    setWizardStep(2)
  }

  // Handle wizard step 2 - customization
  const handleCustomizationNext = () => {
    // Simulate content generation
    setGeneratedContent(`# ${selectedTopic?.label}\n\nContenuto generato in base alle personalizzazioni:\n- Tono: ${customizations.tone}\n- Lunghezza: ${customizations.length}\n- CTA: ${customizations.cta}`)
    setWizardStep(3)
  }

  // Handle wizard step 3 - approval
  const handleApproveContent = () => {
    // Add to content list
    alert("Contenuto approvato e aggiunto alla lista!")
    setViewMode("list")
    setWizardStep(1)
    setSelectedTopic(null)
  }

  const handleWizardCancel = () => {
    setViewMode("list")
    setWizardStep(1)
    setSelectedTopic(null)
    setGeneratedContent(null)
  }

  if (viewMode === "wizard") {
    return (
      <div className="flex h-full flex-col p-6" style={{ backgroundColor: "var(--color-bg-primary)" }}>
        {/* Header with close button */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Crea nuovo contenuto
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              Step {wizardStep} di 3
            </p>
          </div>
          <button
            onClick={handleWizardCancel}
            className="p-2 rounded-lg transition-colors hover:bg-gray-200"
          >
            <X className="h-6 w-6" style={{ color: "var(--color-text-secondary)" }} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="h-1 flex-1 rounded-full transition-colors"
              style={{
                backgroundColor: step <= wizardStep ? "var(--color-primary)" : "var(--color-border)"
              }}
            />
          ))}
        </div>

        <div className="flex-1">
          {/* STEP 1: Choose Topic */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Scegli un argomento
                </h2>
                <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                  Seleziona uno dei topic suggeriti o crea un nuovo contenuto partendo da zero.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {suggestedTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className="flex items-center justify-between rounded-lg border-2 p-5 text-left transition-all hover:border-primary hover:bg-gray-50"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
                        {topic.label}
                      </h3>
                      <div className="flex gap-2">
                        <span
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: "#DBEAFE",
                            color: "#2563EB"
                          }}
                        >
                          {topic.type}
                        </span>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: "#F3F4F6",
                            color: "var(--color-text-secondary)"
                          }}
                        >
                          {topic.channel}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5" style={{ color: "var(--color-text-secondary)" }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Customize */}
          {wizardStep === 2 && selectedTopic && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Personalizza il contenuto
                </h2>
                <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                  Ajusta i parametri per adattare il contenuto alle tue esigenze.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6" style={{ border: "1px solid var(--color-border)" }}>
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
                  Argomento selezionato: {selectedTopic.label}
                </h3>

                {/* Tone */}
                <div className="mb-6">
                  <label className="text-base font-medium mb-3 block" style={{ color: "var(--color-text-primary)" }}>
                    Tono
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["professional", "conversational", "inspiring"].map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setCustomizations({ ...customizations, tone })}
                        className="px-4 py-3 rounded-lg border-2 font-medium transition-all"
                        style={{
                          borderColor: customizations.tone === tone ? "var(--color-primary)" : "var(--color-border)",
                          backgroundColor: customizations.tone === tone ? "var(--color-primary-light)" : "white",
                          color: customizations.tone === tone ? "var(--color-primary)" : "var(--color-text-secondary)"
                        }}
                      >
                        {tone === "professional" && "Professionale"}
                        {tone === "conversational" && "Conversazionale"}
                        {tone === "inspiring" && "Ispirante"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length */}
                <div className="mb-6">
                  <label className="text-base font-medium mb-3 block" style={{ color: "var(--color-text-primary)" }}>
                    Lunghezza
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["short", "medium", "long"].map((length) => (
                      <button
                        key={length}
                        onClick={() => setCustomizations({ ...customizations, length })}
                        className="px-4 py-3 rounded-lg border-2 font-medium transition-all"
                        style={{
                          borderColor: customizations.length === length ? "var(--color-primary)" : "var(--color-border)",
                          backgroundColor: customizations.length === length ? "var(--color-primary-light)" : "white",
                          color: customizations.length === length ? "var(--color-primary)" : "var(--color-text-secondary)"
                        }}
                      >
                        {length === "short" && "Breve"}
                        {length === "medium" && "Medio"}
                        {length === "long" && "Lungo"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mb-6">
                  <label className="text-base font-medium mb-3 block" style={{ color: "var(--color-text-primary)" }}>
                    Call-to-Action
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["engagement", "conversion", "awareness", "none"].map((cta) => (
                      <button
                        key={cta}
                        onClick={() => setCustomizations({ ...customizations, cta })}
                        className="px-4 py-3 rounded-lg border-2 font-medium transition-all"
                        style={{
                          borderColor: customizations.cta === cta ? "var(--color-primary)" : "var(--color-border)",
                          backgroundColor: customizations.cta === cta ? "var(--color-primary-light)" : "white",
                          color: customizations.cta === cta ? "var(--color-primary)" : "var(--color-text-secondary)"
                        }}
                      >
                        {cta === "engagement" && "Engagement"}
                        {cta === "conversion" && "Conversione"}
                        {cta === "awareness" && "Consapevolezza"}
                        {cta === "none" && "Nessuna"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                  <label className="text-base font-medium mb-3 block" style={{ color: "var(--color-text-primary)" }}>
                    Audience aggiuntivo (opzionale)
                  </label>
                  <textarea
                    value={customizations.targetAudience}
                    onChange={(e) => setCustomizations({ ...customizations, targetAudience: e.target.value })}
                    placeholder="Es: Manager, imprenditori, startup 0-5 dipendenti"
                    className="w-full rounded-lg border px-4 py-3"
                    style={{ borderColor: "var(--color-border)" }}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Approve */}
          {wizardStep === 3 && generatedContent && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Rivedi e approva
                </h2>
                <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                  Controlla il contenuto generato dal Copywriter prima di programmare la pubblicazione.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6" style={{ border: "1px solid var(--color-border)" }}>
                <div className="prose max-w-none">
                  <div 
                    className="text-base leading-relaxed whitespace-pre-wrap"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {generatedContent}
                  </div>
                </div>
              </div>

              {/* Content metadata */}
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-6" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Tipo</p>
                  <p className="text-base font-semibold mt-1" style={{ color: "var(--color-text-primary)" }}>
                    {selectedTopic?.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Canale</p>
                  <p className="text-base font-semibold mt-1" style={{ color: "var(--color-text-primary)" }}>
                    {selectedTopic?.channel}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex justify-between gap-4">
          {wizardStep > 1 && (
            <button
              onClick={() => setWizardStep(wizardStep - 1)}
              className="px-6 py-3 rounded-lg border-2 font-semibold transition-colors hover:bg-gray-100"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)"
              }}
            >
              Indietro
            </button>
          )}
          <div className="flex-1" />
          {wizardStep < 3 && (
            <button
              onClick={() => wizardStep === 1 && selectedTopic === null ? null : handleCustomizationNext()}
              className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "var(--color-primary)",
                opacity: wizardStep === 1 && selectedTopic === null ? 0.5 : 1
              }}
            >
              Continua
              <ArrowRight className="inline ml-2 h-4 w-4" />
            </button>
          )}
          {wizardStep === 3 && (
            <>
              <button
                onClick={handleWizardCancel}
                className="px-6 py-3 rounded-lg border-2 font-semibold transition-colors hover:bg-gray-100"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)"
                }}
              >
                Rifiuta
              </button>
              <button
                onClick={handleApproveContent}
                className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 active:scale-95 flex items-center gap-2"
                style={{
                  backgroundColor: "#059669"
                }}
              >
                <Check className="h-4 w-4" />
                Approva e programma
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // LIST VIEW (default)
  return (
    <div className="flex h-full flex-col p-6" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Content Studio
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
            Gestisci e monitora tutti i tuoi contenuti
          </p>
        </div>
        <button
          onClick={() => setViewMode("wizard")}
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Plus className="h-4 w-4" />
          Nuovo contenuto
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        {["all", "idea", "draft", "approved", "scheduled", "published"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className="px-4 py-2 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: filterStatus === status ? "var(--color-primary)" : "var(--color-bg-secondary)",
              color: filterStatus === status ? "white" : "var(--color-text-primary)",
              border: filterStatus === status ? "none" : "1px solid var(--color-border)"
            }}
          >
            {status === "all" && "Tutti"}
            {status === "idea" && "Idee"}
            {status === "draft" && "Bozze"}
            {status === "approved" && "Approvati"}
            {status === "scheduled" && "Programmati"}
            {status === "published" && "Pubblicati"}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-3">
          {filteredContent.map((content) => (
            <div
              key={content.id}
              className="flex items-center gap-4 rounded-lg bg-white p-5 border transition-all hover:shadow-md cursor-pointer"
              style={{ borderColor: "var(--color-border)" }}
              onClick={() => setSelectedContent(content)}
            >
              {/* Type icon */}
              <div className="text-2xl">
                {typeIcons[content.type]}
              </div>

              {/* Content info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {content.title}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: statusConfig[content.status].bg,
                      color: statusConfig[content.status].text
                    }}
                  >
                    {statusConfig[content.status].label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    {content.channel}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    • {content.draftedAt}
                  </span>
                </div>
              </div>

              {/* Agent avatar */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white flex-shrink-0"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {content.agentInitials}
              </div>

              {/* Actions */}
              <button className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                <MoreHorizontal className="h-5 w-5" style={{ color: "var(--color-text-secondary)" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Agent */}
      <FloatingAgentAvatar initials="CW" agentName="Copywriter" />
    </div>
  )
}
