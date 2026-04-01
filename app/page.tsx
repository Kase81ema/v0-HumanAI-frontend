"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { HomeBriefing } from "@/components/home-briefing"
import { CommandCenter } from "@/components/command-center"
import { ContentStudio } from "@/components/content-studio"
import { DeepResearch } from "@/components/deep-research"
import { Planner } from "@/components/planner"
import { ApprovalPage } from "@/components/approval-page"
import { CrmPage } from "@/components/crm-page"
import { EventsPage } from "@/components/events-page"
import { PipelinePage } from "@/components/pipeline-page"
import { BoardOperativa } from "@/components/board-operativa"
import { ProgettoTimeline } from "@/components/progetto-timeline"
import { PianoEditoriale } from "@/components/piano-editoriale"
import { TeamAgenti } from "@/components/team-agenti"
import { Workspace } from "@/components/workspace"
import { UserProfile } from "@/components/user-profile"

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
        ) : activeItem === "content-studio" ? (
          <ContentStudio />
        ) : activeItem === "deep-research" ? (
          <DeepResearch />
        ) : activeItem === "planner" ? (
          <Planner />
        ) : activeItem === "approval" ? (
          <ApprovalPage />
        ) : activeItem === "crm" ? (
          <CrmPage />
        ) : activeItem === "events" ? (
          <EventsPage />
        ) : activeItem === "pipeline" ? (
          <PipelinePage />
        ) : activeItem === "board" ? (
          <BoardOperativa />
        ) : activeItem === "timeline" ? (
          <ProgettoTimeline />
        ) : activeItem === "editorial" ? (
          <PianoEditoriale />
        ) : activeItem === "agents" ? (
          <TeamAgenti />
        ) : activeItem === "workspace" ? (
          <Workspace />
        ) : activeItem === "profile" ? (
          <UserProfile />
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
