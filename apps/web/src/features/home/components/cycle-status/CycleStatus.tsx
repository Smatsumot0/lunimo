import { Unit, Value } from "../ui"
import { Title } from "@/components"
import styles from "./CycleStatus.module.css"
import { PeriodLog } from "@/lib"
import { getAverageCycleDays } from "../../lib/periodStats"

export type CycleStatusProps = {
  logs: PeriodLog[]
}

export function CycleStatus({ logs }: CycleStatusProps) {
  const averageCycleDays = getAverageCycleDays(logs)

  return (
    <section className={styles["cycle-status"]}>
      <Title as="h2">生理周期</Title>
      <Value>
        {averageCycleDays}
        {averageCycleDays !== null && <Unit text={"日"} />}
      </Value>
      <div></div>
    </section>
  )
}
