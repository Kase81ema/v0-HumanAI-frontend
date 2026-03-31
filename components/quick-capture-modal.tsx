"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface QuickCaptureModalProps {
  isOpen: boolean
  onClose: () => void
}

const tags = [
  { emoji: "💡", label: "Idea contenuto" },
  { emoji: "👤", label: "Nuovo contatto" },
  { emoji: "📋", label: "Task operativa" },
  { emoji: "💬", label: "Nota per Strategist" },
]

export function QuickCaptureModal({ isOpen, onClose }: QuickCaptureModalProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [text, setText] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    // Handle submission logic here
    setText("")
    setSelectedTag(null)
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleOverlayClick}
    >
      <div
        className="w-[520px] rounded-2xl bg-white p-[22px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="mb-4 text-[16px] font-bold text-gray-900">
          Cattura rapida
        </h2>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrivi un'idea, un appunto, una richiesta... L'Operator la analizzerà e suggerirà come procedere."
          className="mb-4 h-[100px] w-full resize-none rounded-[10px] border border-gray-200 p-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.label}
              onClick={() =>
                setSelectedTag(selectedTag === tag.label ? null : tag.label)
              }
              className="rounded-lg border px-3 py-1.5 text-[11px] transition-colors"
              style={{
                borderColor:
                  selectedTag === tag.label ? "#2563EB" : "#E5E7EB",
                backgroundColor:
                  selectedTag === tag.label ? "#EFF6FF" : "transparent",
                color: selectedTag === tag.label ? "#2563EB" : "#374151",
              }}
              onMouseEnter={(e) => {
                if (selectedTag !== tag.label) {
                  e.currentTarget.style.borderColor = "#2563EB"
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTag !== tag.label) {
                  e.currentTarget.style.borderColor = "#E5E7EB"
                }
              }}
            >
              {tag.emoji} {tag.label}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-500"
          >
            Annulla
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#2563EB] font-bold text-white hover:bg-[#1D4ED8]"
          >
            {"Invia all'Operator →"}
          </Button>
        </div>
      </div>
    </div>
  )
}
