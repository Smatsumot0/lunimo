"use client"
import styles from "./Button.module.css"
import clsx from "clsx"
import controlThemeStyle from "@/styles/control.module.css"

type ButtonVariant = "primary" | "secondary" | "danger"

export type ButtonProps = {
  variant?: ButtonVariant
  type?: "submit" | "button"
  size?: "large" | "medium" | "small" | "circle"
  className?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = "primary",
  type = "button",
  size = "medium",
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  function handleClick() {
    onClick?.()
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        controlThemeStyle.control,
        styles.button,
        styles[variant],
        styles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
