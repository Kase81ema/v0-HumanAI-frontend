"use client"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = "font-medium rounded-md transition-all 150ms ease inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm h-8",
    md: "px-4 py-2.5 text-base h-10",
    lg: "px-6 py-3 text-lg h-12",
  }

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className || ""}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block animate-spin">⏳</span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}
