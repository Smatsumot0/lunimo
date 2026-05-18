"use server"

import { PeriodDayLogPatch, updatePeriodDayLog } from "@/lib/server"

export async function updatePeriodDayLogAction(
  date: string,
  patch: PeriodDayLogPatch,
) {
  await updatePeriodDayLog(date, patch)
}
