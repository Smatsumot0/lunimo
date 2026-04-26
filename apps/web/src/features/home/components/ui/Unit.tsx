import styles from "./HomeUi.module.css"

export type UnitProps = {
  text: string
}

export function Unit({ text }: UnitProps) {
  return <div className={styles.unit}>{text}</div>
}
