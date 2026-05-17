import React from "react"
import styles from "./Message.module.css"
import clsx from "clsx"

export type MessageVariant = "info" | "warning" | "error" | "success"

export type MessageProps = {
  variant?: MessageVariant
  text?: string
  icon?: React.ReactNode
} & React.ComponentProps<"div">

export function Message({ variant = "info", text, icon, className, ...props }: MessageProps) {
  if (!text) {
    return null
  }

  return (
    <div
      role="alert"
      className={clsx(styles.message, styles[variant], className)}
      {...props}
    >
      {icon}
      <span>{text}</span>
    </div>
  )
}
