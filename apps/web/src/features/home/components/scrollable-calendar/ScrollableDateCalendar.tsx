"use client"

import { type UIEvent, useCallback, useMemo, useState } from "react"
import { addDays, format, isToday } from "date-fns"
import { ja } from "date-fns/locale"
import styles from "./ScrollableDateCalendar.module.css"
import clsx from "clsx"

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

function setCalendarItemWidths(container: HTMLDivElement) {
  const itemWidth =
    container.clientWidth / (VISIBLE_DAYS - 1 + ACTIVE_ITEM_WIDTH_RATIO)
  const activeItemWidth = itemWidth * ACTIVE_ITEM_WIDTH_RATIO
  const itemHeight = itemWidth * ITEM_HEIGHT_RATIO
  const activeItemHeight = activeItemWidth * ITEM_HEIGHT_RATIO

  if (
    itemWidth <= 0 ||
    activeItemWidth <= 0 ||
    itemHeight <= 0 ||
    activeItemHeight <= 0
  ) {
    return
  }

  container.style.setProperty("--calendar-item-width", `${itemWidth}px`)
  container.style.setProperty("--calendar-item-height", `${itemHeight}px`)
  container.style.setProperty(
    "--calendar-active-item-width",
    `${activeItemWidth}px`,
  )
  container.style.setProperty(
    "--calendar-active-item-height",
    `${activeItemHeight}px`,
  )
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
        <span className={styles.month}>{format(days[activeIndex], "M/")}</span>
        <div
          ref={setInitialScrollPosition}
          className={styles.container}
          onScroll={handleScroll}
        >
          <ul className={styles.list}>
            {days.map((day, index) => (
              <li
                key={format(day, "yyyy-MM-dd")}
                className={clsx(
                  styles.item,
                  index === activeIndex && styles.active,
                  index === RANGE_DAYS - 2 && styles.twoDaysBefore,
                  index === RANGE_DAYS - 1 && styles.oneDayBefore,
                  isToday(day) && styles.today,
                  index === RANGE_DAYS + 1 && styles.oneDayAfter,
                  index === RANGE_DAYS + 2 && styles.twoDaysAfter,
                )}
              >
                <div className={styles.date}>
                  <span className={styles.day}>{format(day, "d")}</span>
                  <span className={styles.weekday}>
                    {format(day, "(E)", { locale: ja })}
                  </span>
                </div>
                <div className={styles.status}>
                  {/* 生理予定日に赤線でしずくアイコン */}
                  {/* 過去の日付 ＝ 生理日：赤でしずくアイコン、 */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
