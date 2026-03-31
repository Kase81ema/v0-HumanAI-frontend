"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { HomeBriefing } from "@/components/home-briefing"
import { CommandCenter } from "@/components/command-center"

export default function Home() {
  const [activeItem, setActiveItem] = useState("home")

  const handleNavigate = (id: string) => {
    setActiveItem(id)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarNav activeItem={activeItem} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden" style={{ backgroundColor: "#F7F8FA" }}>
        {activeItem === "home" ? (
          <HomeBriefing onNavigate={handleNavigate} />
        ) : activeItem === "command" ? (
          <CommandCenter />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-[14px]" style={{ color: "#7C8CA2" }}>
              Pagina &quot;{activeItem}&quot; in costruzione
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
