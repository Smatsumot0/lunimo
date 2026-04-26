import { CycleHistoryCell } from "./CycleHistoryCell"
import { CycleHistoryRow } from "./CycleHistoryRow"
import styles from "./CycleHistory.module.css"
import { Title } from "@/components"

const titles = ["開始日", "終了日", "期間", "周期"]
export function CycleHistoryHeader() {
  return (
    <div className={styles.header}>
      <CycleHistoryRow>
        {titles.map((title, i) => (
          <CycleHistoryCell
            key={i}
            hasLeftBorder={i > 0}
            className={styles["header-cell"]}
          >
            {title}
          </CycleHistoryCell>
        ))}
      </CycleHistoryRow>
    </div>
  )
}
