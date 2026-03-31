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

export function SidebarNav() {
  const [activeItem, setActiveItem] = useState("home")
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
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}
        >
          <div className="text-[16px]">
            <span className="font-bold text-white">HumanAI</span>
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>mpact</span>
          </div>
          <div
            className="text-[11px]"
            style={{ color: "rgba(255, 255, 255, 0.25)" }}
          >
            piattaforma operativa
          </div>
        </div>

        {/* Quick Capture Button */}
        <div className="p-4 pt-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors"
            style={{
              border: "1px dashed rgba(255, 255, 255, 0.15)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"
            }}
          >
            <span
              className="text-[12px]"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
            >
              +
            </span>
            <span
              className="text-[12px]"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
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
                      className="flex w-full items-center justify-between px-[14px] pb-[2px] pt-[10px]"
                      style={{
                        color: "rgba(255, 255, 255, 0.25)",
                        fontSize: "9px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                      }}
                    >
                      <span>{section.title}</span>
                      {systemOpen ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </button>
                  ) : (
                    <div
                      className="px-[14px] pb-[2px] pt-[10px]"
                      style={{
                        color: "rgba(255, 255, 255, 0.25)",
                        fontSize: "9px",
                        fontWeight: "bold",
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
                    onClick={() => setActiveItem(item.id)}
                    className="flex w-full items-center px-[14px] py-[7px] transition-colors"
                    style={{
                      backgroundColor:
                        activeItem === item.id
                          ? "#2563EB"
                          : "transparent",
                      color:
                        activeItem === item.id
                          ? "rgba(255, 255, 255, 1)"
                          : "rgba(255, 255, 255, 0.55)",
                      fontSize: "12.5px",
                    }}
                    onMouseEnter={(e) => {
                      if (activeItem !== item.id) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeItem !== item.id) {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }
                    }}
                  >
                    <span
                      className="w-[18px] text-center"
                      style={{ marginRight: "8px" }}
                    >
                      {item.emoji}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className="rounded-[7px] px-[5px] py-[1px] text-[8px] font-bold text-white"
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
          className="flex items-center gap-3 px-[14px] py-[12px]"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            EC
          </div>
          <div className="flex flex-col">
            <span
              className="text-[12px]"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              Emanuele Casero
            </span>
            <span
              className="text-[10px]"
              style={{ color: "rgba(255, 255, 255, 0.3)" }}
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
