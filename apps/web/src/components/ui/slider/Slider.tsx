"use client"

import clsx from "clsx"
import styles from "./Slider.module.css"

export type SliderStep = {
  label?: React.ReactNode
}

export type SliderProps = {
  steps: number | readonly SliderStep[]
  value: number
  ariaLabel?: string
  className?: string
  showLabels?: boolean
  onChange?: (value: number) => void
} & Omit<
  React.ComponentProps<"input">,
  "children" | "className" | "max" | "min" | "onChange" | "step" | "type" | "value"
>

function normalizeSteps(steps: SliderProps["steps"]) {
  if (typeof steps === "number") {
    return Array.from(
      { length: Math.max(1, steps) },
      (): SliderStep => ({}),
    )
  }

  return steps.length > 0 ? [...steps] : [{}]
}

function clampValue(value: number, max: number) {
  return Math.min(Math.max(0, value), max)
}

export function Slider({
  steps,
  value,
  name,
  ariaLabel = "スライダー",
  className,
  disabled = false,
  showLabels = true,
  onChange,
  ...props
}: SliderProps) {
  const normalizedSteps = normalizeSteps(steps)
  const max = normalizedSteps.length - 1
  const currentValue = clampValue(value, max)
  const progress = max === 0 ? 0 : (currentValue / max) * 100

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(Number(event.target.value))
  }

  return (
    <div
      className={clsx(styles.slider, disabled && styles.disabled, className)}
      style={
        {
          "--slider-progress": `${progress}%`,
          "--slider-label-count": normalizedSteps.length,
        } as React.CSSProperties
      }
    >
      <div className={styles.trackWrap}>
        <div className={styles.track} aria-hidden="true">
          <span className={styles.fill} />
          {normalizedSteps.map((_, index) => (
            <span
              key={index}
              className={clsx(
                styles.tick,
                index <= currentValue && styles.activeTick,
              )}
              style={
                {
                  "--slider-tick-position":
                    max === 0 ? "0%" : `${(index / max) * 100}%`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <input
          aria-label={ariaLabel}
          className={styles.input}
          disabled={disabled || max === 0}
          max={max}
          min={0}
          name={name}
          onChange={handleChange}
          step={1}
          type="range"
          value={currentValue}
          {...props}
        />
      </div>
      {showLabels && normalizedSteps.some((step) => step.label) && (
        <ol className={styles.labels}>
          {normalizedSteps.map((step, index) => (
            <li key={index} className={styles.label}>
              {step.label}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
