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
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      {/* Icon */}
      <div
        className="mb-8 flex h-20 w-20 items-center justify-center rounded-lg"
        style={{ backgroundColor: "var(--color-primary-light)" }}
      >
        {typeof icon === "string" ? (
          <span className="text-5xl">{icon}</span>
        ) : (
          icon
        )}
      </div>

      {/* Title */}
      <h2
        className="mb-3 text-3xl font-bold"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h2>

      {/* Description */}
      <p
        className="mb-8 max-w-md text-base leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="px-6 py-3 text-base font-semibold text-white rounded-lg transition-all 150ms ease hover:opacity-90 active:scale-95"
            style={{ 
              backgroundColor: "var(--color-primary)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="px-6 py-3 text-base font-medium rounded-lg transition-all 150ms ease hover:bg-gray-100"
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
