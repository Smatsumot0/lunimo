import {
  CycleHistory,
  CycleStatus,
  PeriodForecast,
  PeriodStartControl,
  ScrollableDateCalendar,
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
        <PeriodForecast logs={periodLogs} />
      </Section>
      <Section>
        {/* カレンダー */}
        <ScrollableDateCalendar />
        {/* 開始日 */}
        <PeriodStartControl />
        {/* 体調／服薬 */}
        {/* <TodayCondition/> */}
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
