"use client"
import {
  createPeriodLogAction,
  updatePeriodLogAction,
} from "@/app/(authed)/home/actions"
import { PeriodLog } from "@/lib"
import { toISODate } from "@/lib/date"
import { useRouter } from "next/navigation"
import { useState } from "react"

type UsePeriodLogControlsArgs = {
  currentLog: PeriodLog | null
}

export function usePeriodLogControls({ currentLog }: UsePeriodLogControlsArgs) {
  const router = useRouter()
  const today = toISODate(new Date())
  const [date, setDate] = useState(today)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submitStartDate() {
    if (currentLog) return

    setLoading(true)
    setError(null)

    try {
      await createPeriodLogAction(date)
      router.refresh()
    } catch {
      setError("開始日の設定に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  async function submitEndDate() {
    if (!currentLog) return

    setLoading(true)
    setError(null)

    try {
      await updatePeriodLogAction(currentLog.id, { endDate: date })
      router.refresh()
    } catch {
      setError("終了日の設定に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  function changeDate(value: string) {
    setDate(value)
  }

  return { date, submitStartDate, submitEndDate, changeDate, error, loading }
}

