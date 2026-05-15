import { Logo, Title } from "@/components"
import { PasswordResetRequestForm } from "@/features/auth/components/PasswordResetRequestForm"
import mainThemeStyle from "@/styles/main.module.css"
import surfaceThemeStyle from "@/styles/surface.module.css"
import clsx from "clsx"
import Link from "next/link"
import styles from "@/features/auth/LoginScreen.module.css"

export default function PasswordResetPage() {
  return (
    <div className={styles.page}>
      <main className={clsx(mainThemeStyle.main, styles.main)}>
        <section className={clsx(surfaceThemeStyle.surface, styles.surface)}>
          <header className={styles.header}>
            <Title>
              <Logo size="large" />
            </Title>
          </header>
          <PasswordResetRequestForm />
          <nav className={styles.links} aria-label="認証メニュー">
            <Link href="/login">ログイン</Link>
            <Link href="/signup">会員登録</Link>
          </nav>
        </section>
      </main>
    </div>
  )
}
