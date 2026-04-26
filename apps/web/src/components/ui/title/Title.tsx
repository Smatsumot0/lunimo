import styles from "./Title.module.css"
import clsx from "clsx"

export type TitleProps = {
  as?: "h1" | "h2" | "h3"
  className?: string
  children?: React.ReactNode
}

export function Title({ as: Tag = "h1", className, children }: TitleProps) {
  return <Tag className={clsx(styles.title, className)}>{children}</Tag>
}
