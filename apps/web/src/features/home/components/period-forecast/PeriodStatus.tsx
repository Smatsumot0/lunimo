import styles from "./PeriodForecast.module.css"

export type PeriodStatusProps = {
  label: string
  children: React.ReactNode
}

export function PeriodStatus({ label, children }: PeriodStatusProps) {
  return (
    <dl className={styles["period-status"]}>
      <dt className={styles["period-status-title"]}>{label}</dt>
      <dd>{children}</dd>
    </dl>
  )
}
