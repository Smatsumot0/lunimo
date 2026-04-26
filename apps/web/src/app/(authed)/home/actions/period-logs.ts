"use server"

import { createPeriodLog } from "@/lib/server"

export async function createPeriodLogAction(startDate: string) {
  await createPeriodLog(startDate)
}
