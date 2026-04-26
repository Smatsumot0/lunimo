import "server-only"
import { api } from "./api-client"
import { PeriodLog } from "@/lib/types/period"
import { revalidatePath } from "next/cache"

const PATH = "period-logs"

// GET LIST
export async function getPeriodLogs() {
  const logs = await api.get<PeriodLog[]>(PATH)
  return logs
}

// POST
export async function createPeriodLog(startDate: string) {
  await api.post<void, { startDate: string }>(PATH, { startDate })
  revalidatePath("/home")
}

// PATCH
export async function setEndDate(endDate: string) {
  await api.patch<void, { endDate: string }>(PATH, { endDate })
}

