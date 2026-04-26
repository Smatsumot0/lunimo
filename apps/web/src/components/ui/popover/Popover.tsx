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
}

export function Popover({
  open,
  onRequestClose,
  children,
  mode = "center",
  panelClassName,
  ariaLabel = "popover",
  anchorEl,
}: PopoverProps) {
  if (!open) return null
  if (typeof document === "undefined") return null

  const anchoredStyle: React.CSSProperties = () => {
    if (mode === "anchored") {
      if (!anchorEl) return {}
      const rect = anchorEl.getBoundingClientRect()
      return {
        position: "absolute",
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.screenX,
      }
    }
    return {}
  }

  function handleBackdropDown() {
    onRequestClose()
  }

  function stopPropagation(e: React.SyntheticEvent) {
    e.stopPropagation()
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
        className={clsx(surfaceThemeStyle.surface, styles.panel, panelClassName)}
        aria-label={ariaLabel}
        onMouseDown={stopPropagation}
        onTouchStart={stopPropagation}
        style={anchoredStyle}
      >
        {children}
      </div>
    </>,
    document.body,
  )
}
