"use client"

import { PeriodLog } from "@/lib"
import { toISODate } from "@/lib/date"
import { useCallback, useState } from "react"
import { PeriodLogControls } from "../period-log-controls/PeriodLogControls"
import { ScrollableDateCalendar } from "../scrollable-calendar/ScrollableDateCalendar"

type HomePeriodLogSectionProps = {
  currentLog: PeriodLog | null
}

export function HomePeriodLogSection({ currentLog }: HomePeriodLogSectionProps) {
  const [selectedDate, setSelectedDate] = useState(() => toISODate(new Date()))
  const handleActiveDateChange = useCallback((date: Date) => {
    setSelectedDate(toISODate(date))
  }, [])

  return (
    <>
      <ScrollableDateCalendar onActiveDateChange={handleActiveDateChange} />
      <PeriodLogControls currentLog={currentLog} selectedDate={selectedDate} />
    </>
  )
}
