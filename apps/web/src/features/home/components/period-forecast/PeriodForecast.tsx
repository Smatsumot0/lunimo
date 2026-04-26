"use client"
import { PeriodStatus } from "./PeriodStatus"
import { useState } from "react"
import { NextPeriodDate } from "./NextPeriodDate"
import { NextPeriodCountdown } from "./NextPeriodCountdown"
import styles from "./PeriodForecast.module.css"

export function PeriodForecast() {
  const [nextDate, setNextDate] = useState<string | null>("2025-02-10")
  const [daysUntil, setDaysUntil] = useState<number | null>(15)

  return (
    <section aria-label="生理予定日" className={styles["period-forecast"]}>
      <PeriodStatus label="生理予定日">
        <NextPeriodDate date={nextDate} />
      </PeriodStatus>
      <PeriodStatus label="あと">
        <NextPeriodCountdown days={daysUntil} />
      </PeriodStatus>
    </section>
  )
}
