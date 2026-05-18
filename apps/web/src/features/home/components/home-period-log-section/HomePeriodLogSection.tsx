"use client"

import { PeriodDayLog, PeriodLog } from "@/lib"
import { toISODate } from "@/lib/date"
import { useCallback, useMemo, useState } from "react"
import { PeriodLogControls } from "../period-log-controls/PeriodLogControls"
import { ScrollableDateCalendar } from "../scrollable-calendar/ScrollableDateCalendar"

type HomePeriodLogSectionProps = {
  currentLog: PeriodLog | null
  dayLogs: PeriodDayLog[]
}

export function HomePeriodLogSection({
  currentLog,
  dayLogs,
}: HomePeriodLogSectionProps) {
  const [selectedDate, setSelectedDate] = useState(() => toISODate(new Date()))
  const dayLogsByDate = useMemo(() => {
    return new Map(dayLogs.map((log) => [toISODate(new Date(log.date)), log]))
  }, [dayLogs])
  const selectedDayLog = dayLogsByDate.get(selectedDate) ?? null

  const handleActiveDateChange = useCallback((date: Date) => {
    setSelectedDate(toISODate(date))
  }, [])

  return (
    <>
      <ScrollableDateCalendar onActiveDateChange={handleActiveDateChange} />
      <PeriodLogControls
        currentLog={currentLog}
        selectedDate={selectedDate}
        selectedDayLog={selectedDayLog}
      />
    </>
  )
}
