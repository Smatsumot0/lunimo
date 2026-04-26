import { formatDisplay } from "@/lib/date"
import { CycleHistoryCell } from "./CycleHistoryCell"
import { CycleHistoryHeader } from "./CycleHistoryHeader"
import { CycleHistoryRow } from "./CycleHistoryRow"
import { PeriodLog } from "@/lib"
import styles from "./CycleHistory.module.css"

export type CycleHistoryTableProps = {
  logs: PeriodLog[]
  onSelectRow?: (id: string) => void
}

type CycleHistoryItem = {
  id: string
  startDate: string
  endDate: string | null
  durationDays: number | null
  cycleDays: number | null
}

function diffDays(from: Date, to: Date) {
  const ms = to.getTime() - from.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

function calcDurationDays(start: Date, end: Date | null) {
  if (!end) return null
  const days = diffDays(start, end)
  return days + 1
}

export function CycleHistoryTable({ logs, onSelectRow }: CycleHistoryTableProps) {
  const sorted = [...logs].sort(
    (a, b) =>
      (new Date(a.startDate)?.getTime() ?? 0) - (new Date(b.startDate)?.getTime() ?? 0),
  )

  const items: CycleHistoryItem[] = sorted.map((log, index) => {
    const start = new Date(log.startDate)
    const end = log.endDate ? new Date(log.endDate) : null
    const prevStart = index > 0 ? new Date(sorted[index - 1].startDate) : null

    const cycleDays = prevStart ? Math.max(0, diffDays(prevStart, start)) : null

    return {
      id: log.id,
      startDate: log.startDate,
      endDate: log.endDate,
      durationDays: calcDurationDays(start, end),
      cycleDays,
    }
  })

  return (
    <div className={styles.table}>
      <CycleHistoryHeader />
      {items.map((item) => (
        <CycleHistoryRow key={item.id} onSelect={() => onSelectRow?.(item.id)}>
          {/* 開始日 */}
          <CycleHistoryCell hasLeftBorder={false}>
            {formatDisplay(item.startDate)}
          </CycleHistoryCell>
          {/* 終了日 */}
          <CycleHistoryCell>{formatDisplay(item.endDate)}</CycleHistoryCell>
          {/* 期間 */}
          <CycleHistoryCell>{item.durationDays}</CycleHistoryCell>
          {/* 周期 */}
          <CycleHistoryCell>{item.cycleDays}</CycleHistoryCell>
        </CycleHistoryRow>
      ))}
    </div>
  )
}
