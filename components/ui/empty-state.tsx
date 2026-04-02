"use client"

import { ReactNode } from "react"

interface EmptyStateProps {
  icon: string | ReactNode
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
      {/* Icon */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
        style={{ backgroundColor: "var(--color-primary-light)" }}
      >
        {typeof icon === "string" ? (
          <span className="text-xl">{icon}</span>
        ) : (
          icon
        )}
      </div>

      {/* Title */}
      <h2
        className="mb-1.5 text-base font-semibold"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h2>

      {/* Description */}
      <p
        className="mb-5 max-w-sm text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100"
            style={{ 
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-primary)",
              border: "1px solid var(--color-border)"
            }}
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  )
}
