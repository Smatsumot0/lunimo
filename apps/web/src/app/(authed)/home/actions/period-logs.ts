"use server"

import {
  createPeriodLog,
  PeriodLogPatch,
  updatePeriodLog,
} from "@/lib/server"

export async function createPeriodLogAction(startDate: string) {
  await createPeriodLog(startDate)
}

export async function updatePeriodLogAction(id: string, patch: PeriodLogPatch) {
  await updatePeriodLog(id, patch)
}
