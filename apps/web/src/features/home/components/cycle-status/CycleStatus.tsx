import { Unit, Value } from "../ui"
import { Title } from "@/components"
import styles from "./CycleStatus.module.css"

export function CycleStatus() {
  return (
    <section className={styles["cycle-status"]}>
      <Title as="h2">生理周期</Title>
      <Value>
        32
        <Unit text={"日"} />
      </Value>
      <div></div>
    </section>
  )
}
