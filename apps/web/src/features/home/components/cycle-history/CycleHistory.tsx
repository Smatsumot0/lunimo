"use client"
import { Title } from "@/components"
import { CycleHistoryTable } from "./CycleHistoryTable"
import { PeriodLog } from "@/lib"
import styles from "./CycleHistory.module.css"
import { CycleLogDetailPopover } from "./CycleLogDetailPopover"
import { useCycleHistory } from "./hooks/useCycleHistory"

export type CycleHistoryProps = {
  logs: PeriodLog[]
}

export function CycleHistory({ logs }: CycleHistoryProps) {
  const { open, selected, loading, error, closeForm, selectRow, handleEdit } =
    useCycleHistory({ logs })

  return (
    <section className={styles["cycle-history"]}>
      <Title as="h2">履歴</Title>
      <CycleHistoryTable logs={logs} onSelectRow={selectRow} />
      <CycleLogDetailPopover
        log={selected}
        open={open}
        loading={loading}
        error={error}
        onRequestClose={closeForm}
        onEdit={handleEdit}
      />
    </section>
  )
}
