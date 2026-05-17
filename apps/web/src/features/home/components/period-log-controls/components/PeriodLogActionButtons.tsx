import { Button } from "@/components"

import styles from "./PeriodLogActionButtons.module.css"

export type PeriodLogActionButtonsProps = {
  canStart: boolean
  canEnd: boolean
  loading: boolean
  onStart: () => void
  onEnd: () => void
}

export function PeriodLogActionButtons({
  canStart,
  canEnd,
  loading,
  onStart,
  onEnd,
}: PeriodLogActionButtonsProps) {
  return (
    <div className={styles.root}>
      <Button disabled={loading || !canStart} onClick={onStart}>
        開始
      </Button>
      <Button variant="secondary" disabled={loading || !canEnd} onClick={onEnd}>
        終了
      </Button>
    </div>
  )
}
