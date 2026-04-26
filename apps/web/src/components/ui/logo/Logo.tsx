import Image from "next/image"
import styles from "./Logo.module.css"
import clsx from "clsx"

export type LogoProps = {
  size?: "large" | "medium" | "small"
  className?: string
}

export function Logo({ size = "medium", className }: LogoProps) {
  return (
    <div className={clsx(styles.logo, styles[size], className)}>
      <span className={styles.visuallyHidden}>LuNimo</span>
      <Image
        src="/images/logo.svg"
        alt=""
        className={styles.image}
        width={200}
        height={50}
        priority
      />
    </div>
  )
}
