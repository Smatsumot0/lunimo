import styles from "./HomeUi.module.css"

export type ValueProps = {
} & React.ComponentProps<"div">

export function Value({ children, className, ...props }: ValueProps) {
  return (
    <div className={className ? `${styles.value} ${className}` : styles.value} {...props}>
      {children}
    </div>
  )
}
