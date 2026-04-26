import styles from "./HomeUi.module.css"

export type ValueProps = {
  children?: React.ReactNode
}

export function Value({ children }: ValueProps) {
  return <div className={styles.value}>{children}</div>
}
