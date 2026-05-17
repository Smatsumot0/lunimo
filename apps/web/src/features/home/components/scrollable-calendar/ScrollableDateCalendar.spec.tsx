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

describe("ScrollableDateCalendar", () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders ten days before and after today", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 15))

    render(<ScrollableDateCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = within(calendar).getAllByRole("listitem")

    expect(days).toHaveLength(21)
    expect(screen.getByText("5/")).toBeInTheDocument()
    expect(days[0]).toHaveTextContent("5(火)")
    expect(days[10]).toHaveTextContent("15(金)")
    expect(days[20]).toHaveTextContent("25(月)")
    expect(days[10]).toHaveClass(styles.active)
    expect(days[0]).not.toHaveClass(styles.active)
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
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 15))

    const handleActiveDateChange = jest.fn()

    render(<ScrollableDateCalendar onActiveDateChange={handleActiveDateChange} />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = within(calendar).getAllByRole("listitem")
    const container = within(calendar).getByRole("list").parentElement

    expect(handleActiveDateChange).toHaveBeenCalledWith(new Date(2026, 4, 15))
    expect(container).not.toBeNull()
    mockItemPositions(days, 100)

    Object.defineProperty(container, "scrollLeft", {
      configurable: true,
      value: 1100,
    })

    fireEvent.scroll(container!)

    expect(handleActiveDateChange).toHaveBeenLastCalledWith(
      new Date(2026, 4, 16),
    )
  })

  it("shows the active month at the fixed left edge", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 4, 25))

    render(<ScrollableDateCalendar />)

    const calendar = screen.getByLabelText("カレンダー")
    const days = within(calendar).getAllByRole("listitem")
    const container = within(calendar).getByRole("list").parentElement

    expect(screen.getByText("5/")).toBeInTheDocument()
    expect(container).not.toBeNull()
    mockItemPositions(days, 100)

    Object.defineProperty(container, "scrollLeft", {
      configurable: true,
      value: 1700,
    })

    fireEvent.scroll(container!)

    expect(screen.getByText("6/")).toBeInTheDocument()
  })
})
