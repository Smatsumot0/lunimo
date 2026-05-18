"use client"

import { ErrorMessage } from "@/components"
import { PeriodDayLog, PeriodLog } from "@/lib"
import { PeriodLogActionButtons } from "./components/PeriodLogActionButtons"
import { PeriodLogStatusControls } from "./components/PeriodLogStatusControls"
import { usePeriodLogControls } from "./hooks/usePeriodLogControls"
import styles from "./PeriodLogControls.module.css"

export type PeriodLogControlsProps = {
  currentLog: PeriodLog | null
  selectedDate: string
  selectedDayLog: PeriodDayLog | null
}

export function PeriodLogControls({
  currentLog,
  selectedDate,
  selectedDayLog,
}: PeriodLogControlsProps) {
  const {
    painVolume,
    medicineCount,
    setStartDate,
    setEndDate,
    changePainVolume,
    increaseMedicineCount,
    decreaseMedicineCount,
    loading,
    error,
  } = usePeriodLogControls({
    currentLog,
    selectedDate,
    selectedDayLog,
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
        medicineCount={medicineCount}
        onPainVolumeChange={changePainVolume}
        onMedicineIncrease={increaseMedicineCount}
        onMedicineDecrease={decreaseMedicineCount}
      />
      {error && <ErrorMessage text={error} />}
    </section>
  )
}
