import {
  CycleHistory,
  CycleStatus,
  PeriodForecast,
  PeriodStartControl,
  WeeklyCalendar,
} from "./components"
import { getPeriodLogs } from "@/lib/server"
import styles from "./HomeScreen.module.css"
import { Section } from "@/components"

export async function HomeScreen() {
  const periodLogs = await getPeriodLogs()

  return (
    <div className={styles["home-screen"]}>
      <Section>
        {/* 生理予定日・カウントダウン */}
        <PeriodForecast />
        {/* カレンダー */}
        <WeeklyCalendar />
      </Section>
      <Section>
        {/* 開始日 */}
        <PeriodStartControl />
        {/* 体調／服薬 */}
        {/* <TodayCondition/> */}
      </Section>
      <Section>
        {/* 生理周期 */}
        <CycleStatus />
        {/* 履歴 */}
        <CycleHistory logs={periodLogs} />
      </Section>
    </div>
  )
}
