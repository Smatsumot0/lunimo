"use server"

import { createPeriodLog, updatePeriodLog } from "@/lib/server"

export async function createPeriodLogAction(startDate: string) {
  await createPeriodLog(startDate)
}

export async function updatePeriodLogAction(
  id: string,
  patch: { startDate?: string; endDate?: string },
) {
  await updatePeriodLog(id, patch)
}
