import styles from "./Label.module.css"
import clsx from "clsx"

export type LabelProps = {
  text?: string
} & React.ComponentProps<"label">

export function Label({ text, className, children, ...props }: LabelProps) {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      <span className={styles["label-text"]}>{text}</span>
      <div>{children}</div>
    </label>
  )
}
