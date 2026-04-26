"use client"
import { createPeriodLogAction } from "@/app/(authed)/home/actions"
import { toISODate } from "@/lib/date"
import { useState } from "react"

export function usePeriodStartControl() {
  const today = toISODate(new Date())
  const [startDate, setStartDate] = useState(today)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submitStartDate() {
    setLoading(true)
    setError(null)

    try {
      await createPeriodLogAction(startDate)
    } catch {
      setError("開始日の設定に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  function changeStartDate(value: string) {
    setStartDate(value)
  }

  return { startDate, submitStartDate, changeStartDate, error, loading }
}

