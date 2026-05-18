"use client"

import clsx from "clsx"
import { format, isSameDay } from "date-fns"
import { ja } from "date-fns/locale"
import styles from "./ScrollableDateCalendar.module.css"

type CalendarDateItemProps = {
  activeIndex: number
  day: Date
  index: number
  today: Date
  todayIndex: number
}

export function CalendarDateItem({
  activeIndex,
  day,
  index,
  today,
  todayIndex,
}: CalendarDateItemProps) {
  return (
    <li
      data-index={index}
      className={clsx(
        styles.item,
        index === activeIndex && styles.active,
        index < todayIndex && styles.before,
        index > todayIndex && styles.after,
        isSameDay(day, today) && styles.today,
        index === todayIndex + 1 && styles.oneDayAfter,
        index === todayIndex + 2 && styles.twoDaysAfter,
      )}
    >
      <div className={styles.date}>
        <span className={styles.day}>{format(day, "d")}</span>
        <span className={styles.weekday}>{format(day, "(E)", { locale: ja })}</span>
      </div>
      <div className={styles.status}>
        {/* 生理予定日に赤線でしずくアイコン */}
        {/* 過去の日付 ＝ 生理日：赤でしずくアイコン、 */}
      </div>
    </li>
  )
}
