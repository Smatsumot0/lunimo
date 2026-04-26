"use client"
import { IconButton, Logo, Title } from "@/components"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import styles from "./Header.module.css"

export function Header() {
  function handleLogout() {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <header className={styles.header}>
      <div />
      <Title>
        <Logo />
      </Title>
      <IconButton
        icon={<LogOut />}
        variant="secondary"
        className={styles["logout-button"]}
        onClick={handleLogout}
      />
    </header>
  )
}
