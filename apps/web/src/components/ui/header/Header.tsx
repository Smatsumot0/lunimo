"use client"
import { IconButton, Logo, Modal, SettingsIcon, Title } from "@/components"
import { signOut } from "next-auth/react"
import { useState } from "react"
import styles from "./Header.module.css"

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSettingsClosing, setIsSettingsClosing] = useState(false)

  function handleSettingsToggle() {
    if (isSettingsOpen) {
      handleSettingsClose()
      return
    }

    setIsSettingsClosing(false)
    setIsSettingsOpen(true)
  }

  function handleSettingsClose() {
    setIsSettingsClosing(true)
  }

  function handleSettingsExited() {
    setIsSettingsOpen(false)
    setIsSettingsClosing(false)
  }

  function handleLogout() {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <header className={styles.header}>
      <div />
      <Title>
        <Logo />
      </Title>
      <div className={styles.settings}>
        <IconButton
          icon={<SettingsIcon height={20} width={20} />}
          variant="secondary"
          className={styles["settings-button"]}
          onClick={handleSettingsToggle}
          aria-expanded={isSettingsOpen && !isSettingsClosing}
          aria-haspopup="menu"
          aria-label="設定メニューを開く"
        />
        {isSettingsOpen && (
          <Modal
            open={isSettingsOpen}
            closing={isSettingsClosing}
            onClose={handleSettingsClose}
            onExited={handleSettingsExited}
            ariaLabel="設定メニュー"
            className={styles["settings-modal"]}
            surfaceClassName={styles["settings-menu"]}
          >
            <button
              type="button"
              className={styles["logout-link"]}
              onClick={handleLogout}
              role="menuitem"
            >
              ログアウト
            </button>
          </Modal>
        )}
      </div>
    </header>
  )
}
