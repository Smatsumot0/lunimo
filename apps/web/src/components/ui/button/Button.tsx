"use client"
import styles from "./Button.module.css"
import clsx from "clsx"
import controlThemeStyle from "@/styles/control.module.css"

type ButtonVariant = "primary" | "secondary" | "danger"

export type ButtonProps = {
  variant?: ButtonVariant
  size?: "large" | "medium" | "small" | "circle"
} & React.ComponentProps<"button">

export function Button({
  variant = "primary",
  type = "button",
  size = "medium",
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
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
