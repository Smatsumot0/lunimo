import { Title } from "@/components/ui"
import styles from "./Section.module.css"
import surfaceThemeStyle from "@/styles/surface.module.css"
import clsx from "clsx"

type SectionProps = {
  title?: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className={clsx(surfaceThemeStyle.surface, styles.section)}>
      {title && <Title as="h2">{title}</Title>}
      <div className={styles.content}>{children}</div>
    </section>
  )
}
