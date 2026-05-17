import styles from "./HomeUi.module.css"

export type UnitProps = {
  text: string
} & React.ComponentProps<"div">

export function Unit({ text, className, ...props }: UnitProps) {
  return (
    <div className={className ? `${styles.unit} ${className}` : styles.unit} {...props}>
      {text}
    </div>
  )
}
