import { afterEach, describe, expect, it, jest } from "@jest/globals"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { ScrollableDateCalendar } from "./ScrollableDateCalendar"
import styles from "./ScrollableDateCalendar.module.css"

function mockItemPositions(items: HTMLElement[], itemWidth: number) {
  items.forEach((item, index) => {
    Object.defineProperty(item, "offsetLeft", {
      configurable: true,
      value: itemWidth * index,
    })
  })
}

function getDateItems(calendar: HTMLElement) {
  return Array.from(calendar.querySelectorAll<HTMLElement>("li[data-index]"))
}

describe("ScrollableDateCalendar", () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders ten days before and after today", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 30))

    render(<ScrollableDateCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = getDateItems(calendar)

    expect(days).toHaveLength(21)
    expect(days[0]).toHaveTextContent("20(水)")
    expect(days[10]).toHaveTextContent("30(土)")
    expect(days[20]).toHaveTextContent("9(火)")
    expect(days[10]).toHaveClass(styles.active)
    expect(days[0]).not.toHaveClass(styles.active)
  })

  it("adds relative classes to today and the two days around it", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 15))

    render(<ScrollableDateCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = getDateItems(calendar)

    expect(days[8]).toHaveClass(styles.before)
    expect(days[9]).toHaveClass(styles.before)
    expect(days[10]).toHaveClass(styles.today)
    expect(days[11]).toHaveClass(styles.oneDayAfter)
    expect(days[12]).toHaveClass(styles.twoDaysAfter)
    expect(days[7]).toHaveClass(styles.before)
    expect(days[13]).not.toHaveClass(styles.twoDaysAfter)
  })

  it("marks the boundary when the visible range crosses into a new month", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 30))

    render(<ScrollableDateCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = getDateItems(calendar)

    expect(days[12]).toHaveTextContent("1(月)")
    expect(screen.getByText("6月")).toBeInTheDocument()
  })

  it("restores the original size when a day reaches the left edge", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 15))

    render(<ScrollableDateCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = within(calendar).getAllByRole("listitem")
    const container = within(calendar).getByRole("list").parentElement

    expect(container).not.toBeNull()
    mockItemPositions(days, 100)

    Object.defineProperty(container, "scrollLeft", {
      configurable: true,
      value: 1100,
    })

    fireEvent.scroll(container!)

    expect(days[11]).toHaveClass(styles.active)
    expect(days[10]).not.toHaveClass(styles.active)
  })

  it("notifies the date at the left edge", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 30))

    const handleActiveDateChange = jest.fn()

    render(<ScrollableDateCalendar onActiveDateChange={handleActiveDateChange} />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = within(calendar).getAllByRole("listitem")
    const container = within(calendar).getByRole("list").parentElement

    expect(handleActiveDateChange).toHaveBeenCalledWith(new Date(2026, 4, 30))
    expect(container).not.toBeNull()
    mockItemPositions(days, 100)

    Object.defineProperty(container, "scrollLeft", {
      configurable: true,
      value: 1100,
    })

    fireEvent.scroll(container!)

    expect(handleActiveDateChange).toHaveBeenLastCalledWith(
      new Date(2026, 4, 31),
    )
  })

  it("updates the active date when a day reaches the fixed left edge", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 25))

    render(<ScrollableDateCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = within(calendar).getAllByRole("listitem")
    const container = within(calendar).getByRole("list").parentElement

    expect(container).not.toBeNull()
    mockItemPositions(days, 100)

    Object.defineProperty(container, "scrollLeft", {
      configurable: true,
      value: 1700,
    })

    fireEvent.scroll(container!)

    expect(days[18]).toHaveClass(styles.active)
  })
})
