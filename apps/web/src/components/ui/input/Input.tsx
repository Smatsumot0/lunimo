"use client"
import { useState } from "react"
import clsx from "clsx"
import styles from "./Input.module.css"
import controlThemeStyle from "@/styles/control.module.css"

export type InputProps = {
  name: string
  value?: string | null
  placeholder?: string
  type?: "text" | "password"
  className?: string
  readOnly?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBluer?: () => void
}

export function Input({
  value,
  className,
  onChange,
  onFocus,
  onBluer,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value)
  }

  function handleFocus() {
    setFocused(true)
    onFocus?.()
  }

  function handleBluer() {
    setFocused(false)
    onBluer?.()
  }

  return (
    <input
      value={value ?? ""}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBluer}
      className={clsx(
        controlThemeStyle.control,
        styles.input,
        focused && styles.focus,
        className,
      )}
      {...props}
    />
  )
}
