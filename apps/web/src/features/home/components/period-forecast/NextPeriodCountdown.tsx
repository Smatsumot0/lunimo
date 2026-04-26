import { Unit, Value } from "../ui"

export type NextPeriodCountdownProps = {
  days: number | null
}

export function NextPeriodCountdown({ days }: NextPeriodCountdownProps) {
  if (!days) return <Value></Value>

  return (
    <Value>
      {days}
      <Unit text="日" />
    </Value>
  )
}

