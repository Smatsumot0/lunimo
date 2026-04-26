import { Logo, Title } from "@/components"
import { LoginForm } from "./components/LoginForm"
import mainThemeStyle from "@/styles/main.module.css"
import surfaceThemeStyle from "@/styles/surface.module.css"
import styles from "./LoginScreen.module.css"
import clsx from "clsx"

export function LoginScreen() {
  return (
    <div className={styles.page}>
      <main className={clsx(mainThemeStyle.main, styles.main)}>
        <section className={clsx(surfaceThemeStyle.surface, styles.surface)}>
          <header className={styles.header}>
            <Title>
              <Logo size="large" />
            </Title>
          </header>
          <LoginForm />
        </section>
      </main>
    </div>
  )
}
