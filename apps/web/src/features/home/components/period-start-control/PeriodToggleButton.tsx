import { Button, ButtonProps } from "@/components"

export type PeriodToggleButtonProps = {
  isStarted: boolean
  onClickStart: () => void
  onClickEnd: () => void
} & Omit<ButtonProps, "onClick" | "children">

export function PeriodToggleButton({
  isStarted,
  onClickStart,
  onClickEnd,
  ...props
}: PeriodToggleButtonProps) {
  const handleClick = isStarted ? onClickEnd : onClickStart

  return (
    <Button onClick={handleClick} {...props}>
      {isStarted ? "終了" : "開始"}
    </Button>
  )
}

