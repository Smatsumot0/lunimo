import { IconButton, Slider } from "@/components"

import styles from "./PeriodLogStatusControls.module.css"

export type PeriodLogStatusControlsProps = {
  painVolume: number
  onPainVolumeChange: (value: number) => void
}

export function PeriodLogStatusControls({
  painVolume,
  onPainVolumeChange,
}: PeriodLogStatusControlsProps) {
  return (
    <dl className={styles.root}>
      <div>
        <dt>痛み</dt>
        <dd>
          <Slider steps={5} value={painVolume} onChange={onPainVolumeChange} />
        </dd>
      </div>
      <div className={styles.medicine}>
        <dt>薬</dt>
        <dd>
          <IconButton icon={<span>+</span>} />
          <div>〇</div>
          <IconButton icon={<span>-</span>} />
        </dd>
      </div>
    </dl>
  )
}
