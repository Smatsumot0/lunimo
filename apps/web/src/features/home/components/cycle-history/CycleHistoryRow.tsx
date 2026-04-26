import styles from "./CycleHistory.module.css"

export type CycleHistoryRowProps = {
  children: React.ReactNode
  onSelect?: () => void
}

export function CycleHistoryRow({ children, onSelect }: CycleHistoryRowProps) {
  return (
    <div onClick={onSelect} onTouchEnd={onSelect} className={styles.row}>
      {children}
    </div>
  )
}
