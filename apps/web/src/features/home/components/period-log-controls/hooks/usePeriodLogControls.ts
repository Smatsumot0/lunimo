"use client"
import {
  createPeriodLogAction,
  updatePeriodDayLogAction,
  updatePeriodLogAction,
} from "@/app/(authed)/home/actions"
import { PeriodDayLog, PeriodLog } from "@/lib"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type UsePeriodLogControlsArgs = {
  currentLog: PeriodLog | null
  selectedDate: string
  selectedDayLog: PeriodDayLog | null
}

export function usePeriodLogControls({
  currentLog,
  selectedDate,
  selectedDayLog,
}: UsePeriodLogControlsArgs) {
  const router = useRouter()
  const [painVolume, setPainVolume] = useState(
    () => selectedDayLog?.painVolume ?? 0,
  )
  const [medicineCount, setMedicineCount] = useState(
    () => selectedDayLog?.medicineCount ?? 0,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setPainVolume(selectedDayLog?.painVolume ?? 0)
    setMedicineCount(selectedDayLog?.medicineCount ?? 0)
  }, [selectedDayLog, selectedDate])

  async function setStartDate() {
    if (currentLog) return

    setLoading(true)
    setError(null)

    try {
      await createPeriodLogAction(selectedDate)
      router.refresh()
    } catch {
      setError("開始日の設定に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  async function setEndDate() {
    if (!currentLog) return

    setLoading(true)
    setError(null)

    try {
      await updatePeriodLogAction(currentLog.id, { endDate: selectedDate })
      router.refresh()
    } catch {
      setError("終了日の設定に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  function changePainVolume(value: number) {
    setPainVolume(value)
    updateSymptoms({ painVolume: value })
  }

  function increaseMedicineCount() {
    const nextCount = Math.min(medicineCount + 1, 99)
    setMedicineCount(nextCount)
    updateSymptoms({ medicineCount: nextCount })
  }

  function decreaseMedicineCount() {
    const nextCount = Math.max(medicineCount - 1, 0)
    setMedicineCount(nextCount)
    updateSymptoms({ medicineCount: nextCount })
  }

  async function updateSymptoms(patch: {
    painVolume?: number
    medicineCount?: number
  }) {
    setError(null)

    try {
      await updatePeriodDayLogAction(selectedDate, patch)
      router.refresh()
    } catch {
      setError("記録の更新に失敗しました。")
    }
  }

  return {
    date: selectedDate,
    painVolume,
    medicineCount,
    setStartDate,
    setEndDate,
    changePainVolume,
    increaseMedicineCount,
    decreaseMedicineCount,
    error,
    loading,
  }
}
