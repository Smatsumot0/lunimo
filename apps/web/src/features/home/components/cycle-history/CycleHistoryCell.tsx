import clsx from "clsx"
import styles from "./CycleHistory.module.css"

export type CycleHistoryCellProps = {
  hasLeftBorder?: boolean
  className?: string
  children: React.ReactNode
}

export function CycleHistoryCell({
  hasLeftBorder = true,
  className,
  children,
}: CycleHistoryCellProps) {
  return (
    <div
      className={clsx(
        styles.cell,
        hasLeftBorder && styles["cell-has-left-border"],
        className,
      )}
    >
      {children}
    </div>
  )
}
