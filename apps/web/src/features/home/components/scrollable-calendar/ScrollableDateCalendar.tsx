"use client"

import { Fragment, type UIEvent, useCallback, useMemo, useState } from "react"
import { addDays, format } from "date-fns"
import styles from "./ScrollableDateCalendar.module.css"
import { CalendarDateItem } from "./CalendarDateItem"

const RANGE_DAYS = 10
const TOTAL_DAYS = RANGE_DAYS * 2 + 1
const VISIBLE_DAYS = 7
const ACTIVE_ITEM_WIDTH_RATIO = 1.45
const ITEM_HEIGHT_RATIO = 1.34

type ScrollableDateCalendarProps = {
  onActiveDateChange?: (date: Date) => void
}

function getLeftEdgeIndex(container: HTMLDivElement) {
  const list = container.firstElementChild

  if (!list) {
    return null
  }

  const items = Array.from(list.children) as HTMLElement[]

  if (items.length === 0) {
    return null
  }

  return items.reduce((closestIndex, item, index) => {
    const closestItem = items[closestIndex]
    const currentDistance = Math.abs(item.offsetLeft - container.scrollLeft)
    const closestDistance = Math.abs(closestItem.offsetLeft - container.scrollLeft)

    return currentDistance < closestDistance ? index : closestIndex
  }, 0)
}

function getListGap(list: Element | null) {
  if (!list) {
    return 0
  }

  const gap = Number.parseFloat(window.getComputedStyle(list).columnGap)
  return Number.isFinite(gap) ? gap : 0
}

function setCalendarItemWidths(container: HTMLDivElement) {
  const list = container.firstElementChild
  const visibleGapWidth = getListGap(list) * (VISIBLE_DAYS - 1)
  const availableWidth = container.clientWidth - visibleGapWidth
  const itemWidth = availableWidth / (VISIBLE_DAYS - 1 + ACTIVE_ITEM_WIDTH_RATIO)
  const activeItemWidth = itemWidth * ACTIVE_ITEM_WIDTH_RATIO
  const itemHeight = itemWidth * ITEM_HEIGHT_RATIO
  const activeItemHeight = activeItemWidth * ITEM_HEIGHT_RATIO

  if (
    availableWidth <= 0 ||
    itemWidth <= 0 ||
    activeItemWidth <= 0 ||
    itemHeight <= 0 ||
    activeItemHeight <= 0
  ) {
    return
  }

  container.style.setProperty("--calendar-item-width", `${itemWidth}px`)
  container.style.setProperty("--calendar-item-height", `${itemHeight}px`)
  container.style.setProperty("--calendar-active-item-width", `${activeItemWidth}px`)
  container.style.setProperty("--calendar-active-item-height", `${activeItemHeight}px`)
}

export function ScrollableDateCalendar({
  onActiveDateChange,
}: ScrollableDateCalendarProps = {}) {
  const [activeIndex, setActiveIndex] = useState(RANGE_DAYS)

  const today = useMemo(() => new Date(), [])
  const days = useMemo(
    () => Array.from({ length: TOTAL_DAYS }, (_, i) => addDays(today, i - RANGE_DAYS)),
    [today],
  )

  const setInitialScrollPosition = useCallback(
    (container: HTMLDivElement | null) => {
      if (!container) {
        return
      }

      const list = container.firstElementChild
      const todayItem = list?.children[RANGE_DAYS] as HTMLElement | undefined

      setCalendarItemWidths(container)

      if (todayItem) {
        container.scrollLeft = todayItem.offsetLeft
      }

      onActiveDateChange?.(days[RANGE_DAYS])
    },
    [days, onActiveDateChange],
  )

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      const container = event.currentTarget
      const nextActiveIndex = getLeftEdgeIndex(container)

      if (nextActiveIndex === null || nextActiveIndex === activeIndex) {
        return
      }

      setActiveIndex(nextActiveIndex)
      onActiveDateChange?.(days[nextActiveIndex])
    },
    [activeIndex, days, onActiveDateChange],
  )

  return (
    <section aria-label="カレンダー">
      <div className={styles.calendar}>
        <div
          ref={setInitialScrollPosition}
          className={styles.container}
          onScroll={handleScroll}
        >
          <ul className={styles.list}>
            {days.map((day, index) => {
              const startsMonth =
                index > 0 && day.getMonth() !== days[index - 1].getMonth()

              return (
                <Fragment key={format(day, "yyyy-MM-dd")}>
                  {startsMonth && (
                    <li className={styles.month}>
                      <span className={styles.monthLabel}>{format(day, "M月")}</span>
                    </li>
                  )}
                  <CalendarDateItem
                    activeIndex={activeIndex}
                    day={day}
                    index={index}
                    today={today}
                    todayIndex={RANGE_DAYS}
                  />
                </Fragment>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
