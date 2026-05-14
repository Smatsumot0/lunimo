import { PeriodLog } from "@/lib"
import { addDays, differenceInCalendarDays, startOfDay } from "date-fns"
import { toISODate } from "@/lib/date"

const DEFAULT_CYCLE_DAYS = 28

function toStartDate(log: PeriodLog) {
  return startOfDay(new Date(log.startDate))
}

function getSortedStartDates(logs: PeriodLog[]) {
  return logs.map(toStartDate).sort((a, b) => a.getTime() - b.getTime())
}

export function getAverageCycleDays(logs: PeriodLog[]) {
  const starts = getSortedStartDates(logs)
  const intervals = starts
    .slice(1)
    .map((date, index) => differenceInCalendarDays(date, starts[index]))
    .filter((days) => days > 0)

  if (intervals.length === 0) return null

  const total = intervals.reduce((sum, days) => sum + days, 0)
  return Math.round(total / intervals.length)
}

export function getNextPeriodForecast(logs: PeriodLog[]) {
  const starts = getSortedStartDates(logs)
  const lastStart = starts.at(-1)
  if (!lastStart) return { nextDate: null, daysUntil: null }

  const cycleDays = getAverageCycleDays(logs) ?? DEFAULT_CYCLE_DAYS
  const today = startOfDay(new Date())
  let nextDate = addDays(lastStart, cycleDays)

  while (differenceInCalendarDays(nextDate, today) < 0) {
    nextDate = addDays(nextDate, cycleDays)
  }

  return {
    nextDate: toISODate(nextDate),
    daysUntil: differenceInCalendarDays(nextDate, today),
  }
}
