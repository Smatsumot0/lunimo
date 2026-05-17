"use client"
import clsx from "clsx"
import type { AnimationEvent, MouseEvent } from "react"
import surfaceThemeStyle from "@/styles/surface.module.css"
import styles from "./Modal.module.css"

export type ModalProps = {
  open: boolean
  closing?: boolean
  children: React.ReactNode
  ariaLabel: string
  className?: string
  surfaceClassName?: string
  onClose: () => void
  onExited?: () => void
}

export function Modal({
  open,
  closing = false,
  children,
  ariaLabel,
  className,
  surfaceClassName,
  onClose,
  onExited,
}: ModalProps) {
  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && closing) {
      onExited?.()
    }
  }

  if (!open) {
    return null
  }

  const state = closing ? "closing" : "open"

  return (
    <dialog
      open
      className={clsx(styles.dialog, className)}
      onClick={handleBackdropClick}
      aria-label={ariaLabel}
      data-state={state}
    >
      <div
        className={clsx(surfaceThemeStyle.surface, styles.surface, surfaceClassName)}
        data-state={state}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </dialog>
  )
}
