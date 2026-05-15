import { jest, describe, expect, it, afterEach } from "@jest/globals"
import { PeriodLog } from "@/lib"
import { getAverageCycleDays, getNextPeriodForecast } from "./periodStats"

const baseLog = {
  userId: "user-1",
  endDate: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

function periodLog(id: string, startDate: string): PeriodLog {
  return {
    ...baseLog,
    id,
    startDate,
  }
}

describe("periodStats", () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it("calculates the rounded average cycle length from sorted start dates", () => {
    const logs = [
      periodLog("3", "2026-03-01"),
      periodLog("1", "2026-01-01"),
      periodLog("2", "2026-01-29"),
    ]

    expect(getAverageCycleDays(logs)).toBe(30)
  })

  it("returns null when there are no valid intervals", () => {
    expect(getAverageCycleDays([periodLog("1", "2026-01-01")])).toBeNull()
  })

  it("forecasts the next period from the latest log and average cycle", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 15))

    const logs = [
      periodLog("1", "2026-03-20"),
      periodLog("2", "2026-04-17"),
    ]

    expect(getNextPeriodForecast(logs)).toEqual({
      nextDate: "2026-05-15",
      daysUntil: 0,
    })
  })

  it("uses the default cycle length when only one log exists", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 15))

    expect(getNextPeriodForecast([periodLog("1", "2026-05-01")])).toEqual({
      nextDate: "2026-05-29",
      daysUntil: 14,
    })
  })
})
