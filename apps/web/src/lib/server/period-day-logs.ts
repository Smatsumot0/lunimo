import "server-only"
import { PeriodDayLog } from "@/lib/types/period-day"
import { revalidatePath } from "next/cache"
import { api, isFetchFailedError } from "./api-client"

const PATH = "period-day-logs"

export type PeriodDayLogPatch = {
  painVolume?: number
  medicineCount?: number
}

export async function getPeriodDayLogs() {
  try {
    return await api.get<PeriodDayLog[]>(PATH)
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error
    }

    if (!isFetchFailedError(error)) {
      console.warn("[period-day-logs] failed to fetch logs")
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

export async function updatePeriodDayLog(
  date: string,
  patch: PeriodDayLogPatch,
) {
  await api.patch<void, PeriodDayLogPatch>(`${PATH}/${date}`, patch)
  revalidatePath("/home")
}
