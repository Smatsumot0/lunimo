"use client"

import { ErrorMessage } from "@/components"
import { PeriodLog } from "@/lib"
import { PeriodLogActionButtons } from "./components/PeriodLogActionButtons"
import { PeriodLogStatusControls } from "./components/PeriodLogStatusControls"
import { usePeriodLogControls } from "./hooks/usePeriodLogControls"
import styles from "./PeriodLogControls.module.css"

export type PeriodLogControlsProps = {
  currentLog: PeriodLog | null
}

export function PeriodLogControls({ currentLog }: PeriodLogControlsProps) {
  const { painVolume, setStartDate, setEndDate, changePainVolume, loading, error } =
    usePeriodLogControls({
      currentLog,
    })

  return (
    <section className={styles.root}>
      <PeriodLogActionButtons
        canStart={!currentLog}
        canEnd={Boolean(currentLog)}
        loading={loading}
        onStart={setStartDate}
        onEnd={setEndDate}
      />
      <PeriodLogStatusControls
        painVolume={painVolume}
        onPainVolumeChange={changePainVolume}
      />
      {error && <ErrorMessage text={error} />}
    </section>
  )
}
