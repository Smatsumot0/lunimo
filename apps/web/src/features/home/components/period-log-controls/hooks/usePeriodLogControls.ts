"use client"
import { createPeriodLogAction, updatePeriodLogAction } from "@/app/(authed)/home/actions"
import { PeriodLog } from "@/lib"
import { useRouter } from "next/navigation"
import { useState } from "react"

type UsePeriodLogControlsArgs = {
  currentLog: PeriodLog | null
  selectedDate: string
}

export function usePeriodLogControls({
  currentLog,
  selectedDate,
}: UsePeriodLogControlsArgs) {
  const router = useRouter()
  const [painVolume, setPainVolume] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
  }

  return {
    date: selectedDate,
    painVolume,
    setStartDate,
    setEndDate,
    changePainVolume,
    error,
    loading,
  }
}
