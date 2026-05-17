import styles from "./Title.module.css"
import clsx from "clsx"

export type TitleProps = {
  as?: "h1" | "h2" | "h3"
} & React.ComponentProps<"h1">

export function Title({ as: Tag = "h1", className, children, ...props }: TitleProps) {
  return (
    <Tag className={clsx(styles.title, className)} {...props}>
      {children}
    </Tag>
  )
}
