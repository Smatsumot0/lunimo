import { PeriodStatus } from "./PeriodStatus"
import { NextPeriodDate } from "./NextPeriodDate"
import { NextPeriodCountdown } from "./NextPeriodCountdown"
import styles from "./PeriodForecast.module.css"
import { PeriodLog } from "@/lib"
import { getNextPeriodForecast } from "../../lib/periodStats"

export type PeriodForecastProps = {
  logs: PeriodLog[]
}

export function PeriodForecast({ logs }: PeriodForecastProps) {
  const { nextDate, daysUntil } = getNextPeriodForecast(logs)

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
