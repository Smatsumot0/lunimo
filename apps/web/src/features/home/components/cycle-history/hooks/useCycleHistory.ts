import { useState } from "react"
import { PeriodLog } from "@/lib"
import { updatePeriodLogAction } from "@/app/(authed)/home/actions"
import { useRouter } from "next/navigation"

export type CycleLogPatch = {
  startDate?: string
  endDate?: string
}

type UseCycleHistoryArgs = {
  logs: PeriodLog[]
}
export function useCycleHistory({ logs }: UseCycleHistoryArgs) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function closeForm() {
    setOpen(false)
  }

  function selectRow(id: string) {
    setOpen(true)
    setSelectedId(id)
  }

  const selected = selectedId ? (logs.find((log) => log.id === selectedId) ?? null) : null

  async function handleEdit(patch: CycleLogPatch) {
    if (!selectedId) return

    setLoading(true)
    setError(null)

    try {
      await updatePeriodLogAction(selectedId, patch)
      router.refresh()
    } catch {
      setError("履歴の更新に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  return {
    open,
    selected,
    loading,
    error,
    closeForm,
    selectRow,
    handleEdit,
  }
}
