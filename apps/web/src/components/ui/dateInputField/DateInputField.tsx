"use client"
import { useMemo, useState } from "react"
import { Input, InputProps } from "../input/Input"
import { DayPicker } from "react-day-picker"
import { Popover } from "@/components"
import styles from "./DateInputField.module.css"
import clsx from "clsx"
import "react-day-picker/style.css"

export type DateInputFieldProps = {} & InputProps

function formatDisplay(value?: string | null) {
  if (!value) return ""
  const date = new Date(value)
  return date.toLocaleDateString("ja-JP")
}

function toISODate(date: Date | undefined) {
  if (!date) return ""

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function fromISODate(value?: string | null) {
  if (!value) return undefined
  return new Date(value)
}

export function DateInputField({
  value,
  disabled,
  className,
  onChange,
  onFocus,
  ...props
}: DateInputFieldProps) {
  const [open, setOpen] = useState(false)
  const selectedDate = useMemo(() => fromISODate(value), [value])
  const textValue = useMemo(() => formatDisplay(value), [value])

  function openPicker() {
    if (disabled) return
    setOpen(true)
  }

  function closePicker() {
    setOpen(false)
  }

  function handleFocus() {
    console.log("focus", open)
    openPicker()
    onFocus?.()
  }

  function handleSelect(date: Date | undefined) {
    onChange?.(toISODate(date))
    closePicker()
  }

  return (
    <div className={clsx(styles["date-input"], className)}>
      <Input value={textValue} onFocus={handleFocus} {...props} />
      <Popover open={open} onRequestClose={closePicker} ariaLabel="day-picker-popover">
        <DayPicker
          animate
          mode="single"
          className={styles.daypicker}
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </Popover>
    </div>
  )
}
