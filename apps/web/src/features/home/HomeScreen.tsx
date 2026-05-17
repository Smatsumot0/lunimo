import { getPeriodLogs } from "@/lib/server"
import styles from "./HomeScreen.module.css"
import { Section } from "@/components"
import { PeriodLogControls } from "./components/period-log-controls/PeriodLogControls"
import { PeriodForecast } from "./components/period-forecast/PeriodForecast"
import { ScrollableDateCalendar } from "./components/scrollable-calendar/ScrollableDateCalendar"
import { CycleStatus } from "./components/cycle-status/CycleStatus"
import { CycleHistory } from "./components/cycle-history/CycleHistory"
import { PeriodLog } from "@/lib"

function getCurrentPeriodLog(logs: PeriodLog[]) {
  return (
    logs
      .filter((log) => !log.endDate)
      .toSorted((a, b) => b.startDate.localeCompare(a.startDate))[0] ?? null
  )
}

export async function HomeScreen() {
  const periodLogs = await getPeriodLogs()
  const currentPeriodLog = getCurrentPeriodLog(periodLogs)

  return (
    <div className={styles.homeScreen}>
      <Section>
        {/* 生理予定日・カウントダウン */}
        <PeriodForecast logs={periodLogs} />
      </Section>

      <Section className={styles.actions}>
        {/* カレンダー */}
        <ScrollableDateCalendar />
        {/* 記録 */}
        <PeriodLogControls currentLog={currentPeriodLog} />
      </Section>

      <Section>
        {/* 生理周期 */}
        <CycleStatus logs={periodLogs} />
        {/* 履歴 */}
        <CycleHistory logs={periodLogs} />
      </Section>
    </div>
  )
}
