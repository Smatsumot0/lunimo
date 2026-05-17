import Image from "next/image"
import styles from "./Logo.module.css"
import clsx from "clsx"

export type LogoProps = {
  size?: "large" | "medium" | "small"
} & React.ComponentProps<"div">

export function Logo({ size = "medium", className, ...props }: LogoProps) {
  return (
    <div className={clsx(styles.logo, styles[size], className)} {...props}>
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
