import styles from "./Label.module.css"
import clsx from "clsx"

export type LabelProps = {
  text?: string
  className?: string
  children?: React.ReactNode
}

export function Label({ text, className, children }: LabelProps) {
  return (
    <label className={clsx(styles.label, className)}>
      <span className={styles["label-text"]}>{text}</span>
      <div>{children}</div>
    </label>
  )
}
