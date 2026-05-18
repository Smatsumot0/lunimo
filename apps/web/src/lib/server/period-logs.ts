import "server-only"
import { api, isFetchFailedError } from "./api-client"
import { PeriodLog } from "@/lib/types/period"
import { revalidatePath } from "next/cache"

const PATH = "period-logs"

export type PeriodLogPatch = {
  startDate?: string
  endDate?: string
}

// GET LIST
export async function getPeriodLogs() {
  try {
    const logs = await api.get<PeriodLog[]>(PATH)
    return logs
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error
    }

    if (!isFetchFailedError(error)) {
      console.warn("[period-logs] failed to fetch logs")
    }

    return []
  }
}

function isNextDynamicServerError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    error.digest === "DYNAMIC_SERVER_USAGE"
  )
}

// POST
export async function createPeriodLog(startDate: string) {
  await api.post<void, { startDate: string }>(PATH, { startDate })
  revalidatePath("/home")
}

// PATCH
export async function updatePeriodLog(id: string, patch: PeriodLogPatch) {
  await api.patch<void, PeriodLogPatch>(`${PATH}/${id}`, patch)
  revalidatePath("/home")
}

