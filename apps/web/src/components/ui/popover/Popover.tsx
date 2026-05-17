"use client"
import styles from "./Popover.module.css"
import clsx from "clsx"
import surfaceThemeStyle from "@/styles/surface.module.css"
import { createPortal } from "react-dom"

export type PopoverProps = {
  open: boolean
  onRequestClose: () => void
  children: React.ReactNode
  mode?: "anchored" | "center"
  panelClassName?: string
  ariaLabel?: string
  anchorEl?: HTMLElement | null
} & Omit<React.ComponentProps<"div">, "children">

export function Popover({
  open,
  onRequestClose,
  children,
  mode = "center",
  panelClassName,
  ariaLabel = "popover",
  anchorEl,
  className,
  onMouseDown,
  onTouchStart,
  style,
  ...props
}: PopoverProps) {
  if (!open) return null
  if (typeof document === "undefined") return null

  const anchoredStyle: React.CSSProperties = (() => {
    if (mode === "anchored") {
      if (!anchorEl) return {}
      const rect = anchorEl.getBoundingClientRect()
      return {
        position: "absolute",
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      }
    }
    return {}
  })()

  function handleBackdropDown() {
    onRequestClose()
  }

  function stopPropagation(e: React.SyntheticEvent) {
    e.stopPropagation()
  }

  function handlePanelMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    stopPropagation(e)
    onMouseDown?.(e)
  }

  function handlePanelTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    stopPropagation(e)
    onTouchStart?.(e)
  }

  return createPortal(
    <>
      <div
        className={styles.backdrop}
        onMouseDown={handleBackdropDown}
        onTouchStart={handleBackdropDown}
      ></div>
      <div
        role="dialog"
        className={clsx(
          surfaceThemeStyle.surface,
          styles.panel,
          panelClassName,
          className,
        )}
        aria-label={ariaLabel}
        onMouseDown={handlePanelMouseDown}
        onTouchStart={handlePanelTouchStart}
        style={{ ...anchoredStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    </>,
    document.body,
  )
}
