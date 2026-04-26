"use client"

import { useEffect, useRef } from "react"
import { addDays, format, isToday } from "date-fns"
import { ja } from "date-fns/locale"
import styles from "./WeeklyCalendar.module.css"
import clsx from "clsx"

const RANGE_DAYS = 30

export function WeeklyCalendar() {
  const containerRef = useRef<HTMLDivElement>(null)

  const days = Array.from({ length: RANGE_DAYS * 2 + 1 }, (_, i) =>
    addDays(new Date(), i - RANGE_DAYS),
  )

  return (
    <section aria-label="カレンダー">
      <div className={styles.calendar}>
        <div className={styles.highlight}></div>
        <div ref={containerRef} className={styles.container}>
          <ul className={styles.list}>
            {days.map((day) => (
              <li
                key={format(day, "yyyy-MM-dd")}
                className={clsx(styles.item, isToday(day) && styles.today)}
              >
                <div className={styles.date}>
                  <span className={styles.month}>{format(day, "M/")}</span>
                  <span className={styles.day}>{format(day, "d")}</span>
                  <span className={styles.weekday}>
                    {format(day, "(E)", { locale: ja })}
                  </span>
                </div>
                {/* 生理予定日に赤でしずくアイコン */}
                {/* 過去の日付 ＝ 生理日：赤でしずくアイコン、 */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
