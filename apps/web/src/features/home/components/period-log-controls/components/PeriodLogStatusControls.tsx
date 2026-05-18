import { IconButton, MinusIcon, PillIcon, PlusIcon, Slider } from "@/components"

import styles from "./PeriodLogStatusControls.module.css"

export type PeriodLogStatusControlsProps = {
  painVolume: number
  medicineCount: number
  onPainVolumeChange: (value: number) => void
  onMedicineIncrease: () => void
  onMedicineDecrease: () => void
}

export function PeriodLogStatusControls({
  painVolume,
  medicineCount,
  onPainVolumeChange,
  onMedicineIncrease,
  onMedicineDecrease,
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
          <IconButton
            aria-label="薬の回数を増やす"
            icon={<PlusIcon height={20} width={20} />}
            onClick={onMedicineIncrease}
          />
          <div className={styles.medicineIcon} aria-label={`薬 ${medicineCount}回`}>
            <PillIcon className={styles.pillIcon} />
            <span className={styles.medicineBadge}>{medicineCount}</span>
          </div>
          <IconButton
            aria-label="薬の回数を減らす"
            disabled={medicineCount === 0}
            icon={<MinusIcon height={20} width={20} />}
            onClick={onMedicineDecrease}
          />
        </dd>
      </div>
    </dl>
  )
}
