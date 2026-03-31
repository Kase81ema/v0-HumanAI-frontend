"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { QuickCaptureModal } from "./quick-capture-modal"

interface NavItem {
  emoji: string
  label: string
  badge?: number
  id: string
}

interface NavSection {
  title?: string
  collapsible?: boolean
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    items: [
      { emoji: "🏠", label: "Home", badge: 3, id: "home" },
      { emoji: "💬", label: "Centro di Comando", id: "command" },
      { emoji: "▦", label: "Board operativa", badge: 1, id: "board" },
      { emoji: "📊", label: "Progetto & Timeline", id: "timeline" },
    ],
  },
  {
    title: "CONTENUTI",
    items: [
      { emoji: "✏️", label: "Content Factory", id: "content-factory" },
      { emoji: "📅", label: "Piano editoriale", id: "editorial" },
      { emoji: "✓", label: "Approvazione", badge: 3, id: "approval" },
    ],
  },
  {
    title: "GESTIONE",
    items: [
      { emoji: "👤", label: "Contatti & CRM", id: "crm" },
      { emoji: "📆", label: "Eventi", id: "events" },
      { emoji: "💰", label: "Pipeline vendite", id: "pipeline" },
    ],
  },
  {
    title: "SISTEMA",
    collapsible: true,
    items: [
      { emoji: "🤖", label: "Team Agenti", id: "agents" },
      { emoji: "🎯", label: "Orientamento", id: "orientation" },
      { emoji: "⚙️", label: "Impostazioni", id: "settings" },
    ],
  },
]

interface SidebarNavProps {
  activeItem: string
  onNavigate: (id: string) => void
}

export function SidebarNav({ activeItem, onNavigate }: SidebarNavProps) {
  const [systemOpen, setSystemOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <aside
        className="flex h-screen w-[220px] flex-col"
        style={{ backgroundColor: "#0C1729" }}
      >
        {/* Logo */}
        <div
          className="p-4"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="text-[18px]">
            <span className="font-bold text-white">HumanAI</span>
            <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>mpact</span>
          </div>
          <div
            className="text-[12px]"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            piattaforma operativa
          </div>
        </div>

        {/* Quick Capture Button */}
        <div className="p-4 pt-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 transition-colors"
            style={{
              border: "1px dashed rgba(255, 255, 255, 0.25)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.45)"
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)"
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            <span
              className="text-[14px] font-medium"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              +
            </span>
            <span
              className="text-[13px]"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              Cattura idea...
            </span>
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <>
                  {section.collapsible ? (
                    <button
                      onClick={() => setSystemOpen(!systemOpen)}
                      className="flex w-full items-center justify-between px-[14px] pb-[4px] pt-[14px]"
                      style={{
                        color: "rgba(255, 255, 255, 0.45)",
                        fontSize: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                      }}
                    >
                      <span>{section.title}</span>
                      {systemOpen ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>
                  ) : (
                    <div
                      className="px-[14px] pb-[4px] pt-[14px]"
                      style={{
                        color: "rgba(255, 255, 255, 0.45)",
                        fontSize: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                      }}
                    >
                      {section.title}
                    </div>
                  )}
                </>
              )}

              {/* Items - hide if collapsible and closed */}
              {(!section.collapsible || systemOpen) &&
                section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="flex w-full items-center px-[14px] py-[9px] transition-colors"
                    style={{
                      backgroundColor:
                        activeItem === item.id ? "#2563EB" : "transparent",
                      color:
                        activeItem === item.id
                          ? "rgba(255, 255, 255, 1)"
                          : "rgba(255, 255, 255, 0.75)",
                      fontSize: "14px",
                    }}
                    onMouseEnter={(e) => {
                      if (activeItem !== item.id) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.07)"
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeItem !== item.id) {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)"
                      }
                    }}
                  >
                    <span
                      className="w-[22px] text-center"
                      style={{ marginRight: "10px", fontSize: "15px" }}
                    >
                      {item.emoji}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className="rounded-[8px] px-[6px] py-[2px] text-[10px] font-bold text-white"
                        style={{ backgroundColor: "#DC2626" }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="flex items-center gap-3 px-[14px] py-[14px]"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            EC
          </div>
          <div className="flex flex-col">
            <span
              className="text-[13px] font-medium"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
            >
              Emanuele Casero
            </span>
            <span
              className="text-[11px]"
              style={{ color: "rgba(255, 255, 255, 0.45)" }}
            >
              HumanAImpact
            </span>
          </div>
        </div>
      </aside>

      <QuickCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
