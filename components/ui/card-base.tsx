"use client"

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
}

export function Card({ children, className = "", onClick, interactive = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg p-6 transition-all 150ms ease ${
        interactive ? "cursor-pointer hover:shadow-lg" : ""
      } ${className || ""}`}
      style={{
        backgroundColor: "var(--color-white)",
        border: "1px solid var(--color-border)",
        boxShadow: interactive ? "var(--shadow-sm)" : "none",
      }}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h3 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-base" style={{ color: "var(--color-text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`space-y-4 ${className}`}>{children}</div>
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`flex items-center justify-between gap-4 border-t pt-4 ${className}`} style={{ borderColor: "var(--color-border)" }}>
      {children}
    </div>
  )
}
