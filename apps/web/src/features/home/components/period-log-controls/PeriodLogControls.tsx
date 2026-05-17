"use client"

import { Button, ErrorMessage } from "@/components"
import { PeriodLog } from "@/lib"
import { usePeriodLogControls } from "./hooks/usePeriodLogControls"
import styles from "./PeriodLogControls.module.css"

export type PeriodLogControlsProps = {
  currentLog: PeriodLog | null
}

export function PeriodLogControls({ currentLog }: PeriodLogControlsProps) {
  const { loading, error, submitStartDate, submitEndDate } = usePeriodLogControls({
    currentLog,
  })

  return (
    <section className={styles.root}>
      <div className={styles.actions}>
        <Button disabled={loading || Boolean(currentLog)} onClick={submitStartDate}>
          開始
        </Button>
        <Button
          variant="secondary"
          disabled={loading || !currentLog}
          onClick={submitEndDate}
        >
          終了
        </Button>
      </div>
      {error && <ErrorMessage text={error} />}
    </section>
  )
}
