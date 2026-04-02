"use client"

import { X } from "lucide-react"

export type AlertType = "info" | "warning" | "error" | "success"

interface AlertRowProps {
  type: AlertType
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  onClose?: () => void
  icon?: React.ReactNode
}

export function AlertRow({
  type,
  title,
  description,
  action,
  onClose,
  icon,
}: AlertRowProps) {
  const colors = {
    info: {
      bg: "#DBEAFE",
      border: "#2563EB",
      text: "#1B2B4B",
      icon: "🔵",
    },
    warning: {
      bg: "#FEF3C7",
      border: "#F59E0B",
      text: "#78350F",
      icon: "⚠️",
    },
    error: {
      bg: "#FEE2E2",
      border: "#DC2626",
      text: "#7F1D1D",
      icon: "❌",
    },
    success: {
      bg: "#D1FAE5",
      border: "#059669",
      text: "#065F46",
      icon: "✅",
    },
  }

  const config = colors[type]

  return (
    <div
      className="flex items-center gap-4 rounded-lg p-4 mb-4"
      style={{
        backgroundColor: config.bg,
        borderLeft: `4px solid ${config.border}`,
        border: `1px solid ${config.border}`,
        borderLeftWidth: "4px",
      }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 text-xl">
        {icon || config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base" style={{ color: config.text }}>
          {title}
        </p>
        {description && (
          <p className="text-sm mt-1" style={{ color: config.text, opacity: 0.8 }}>
            {description}
          </p>
        )}
      </div>

      {/* Action */}
      {action && (
        <button
          onClick={action.onClick}
          className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all 150ms ease hover:opacity-80"
          style={{
            backgroundColor: config.border,
            color: "white",
          }}
        >
          {action.label}
        </button>
      )}

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded hover:opacity-70 transition-all 150ms ease"
          style={{ color: config.border }}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
