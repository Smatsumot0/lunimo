import { afterEach, describe, expect, it, jest } from "@jest/globals"
import { render, screen, within } from "@testing-library/react"
import { WeeklyCalendar } from "./WeeklyCalendar"

describe("WeeklyCalendar", () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders ten days before and after today", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 15))

    render(<WeeklyCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = within(calendar).getAllByRole("listitem")

    expect(days).toHaveLength(21)
    expect(days[0]).toHaveTextContent("5/5(火)")
    expect(days[10]).toHaveTextContent("5/15(金)")
    expect(days[20]).toHaveTextContent("5/25(月)")
  })
})
