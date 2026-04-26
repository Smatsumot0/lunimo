import clsx from "clsx"
import { Button, ButtonProps } from "./Button"
import style from "./Button.module.css"

export type IconButtonProps = {
  icon: React.ReactNode
} & Omit<ButtonProps, "children">

export function IconButton({ icon, className, ...props }: IconButtonProps) {
  return (
    <Button className={clsx(style["icon-button"], className)} {...props}>
      {icon}
    </Button>
  )
}
