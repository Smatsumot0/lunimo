import { Unit, Value } from "../ui"

export type NextPeriodDateProps = {
  date: string | null
}

function parseYmd(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function getJaWeekday(date: Date) {
  return ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]
}

export function NextPeriodDate({ date: nextDate }: NextPeriodDateProps) {
  if (!nextDate) return <Value></Value>

  const date = parseYmd(nextDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = getJaWeekday(date)

  return (
    <Value>
      {month}
      <Unit text="月" />
      {day}
      <Unit text="日" />
      <Unit text={`(${weekday})`} />
    </Value>
  )
}

