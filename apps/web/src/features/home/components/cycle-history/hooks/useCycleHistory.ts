import { useState } from "react"
import { PeriodLog } from "@/lib"

export type CycleLogPatch = {
  startDate?: string
  endDate?: string | null
}

type UseCycleHistoryArgs = {
  logs: PeriodLog[]
}
export function useCycleHistory({ logs }: UseCycleHistoryArgs) {
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

  function handleEdit(patch: CycleLogPatch) {}

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
