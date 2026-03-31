"use client"

import { useState } from "react"

interface FloatingAgentAvatarProps {
  initials: string
  agentName: string
}

export function FloatingAgentAvatar({ initials, agentName }: FloatingAgentAvatarProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex h-[44px] w-[44px] items-center justify-center rounded-full text-[14px] font-bold text-white shadow-lg transition-transform hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
        }}
      >
        {initials}
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg px-3 py-2 text-[12px] font-medium text-white shadow-lg"
          style={{ backgroundColor: "#1B2B4B" }}
        >
          {agentName} — clicca per assistenza
          <div
            className="absolute -bottom-1 right-4 h-2 w-2 rotate-45"
            style={{ backgroundColor: "#1B2B4B" }}
          />
        </div>
      )}
    </div>
  )
}
