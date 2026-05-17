"use client"
import { DateInputField, Input, InputProps, Label } from "@/components"
import clsx from "clsx"
import styles from "./Field.module.css"

export type inputType = "text" | "password" | "date"

export type FieldProps = {
  name: string
  label?: string
  type?: inputType
  disabled?: boolean
  inputProps?: Omit<InputProps, "name" | "disabled">
} & React.ComponentProps<"div">

export function Field({
  name,
  label,
  type = "text",
  disabled,
  className,
  inputProps = {},
  ...props
}: FieldProps) {
  const { className: inputClassName } = inputProps
  const mergedInputClassName = clsx(!label && styles["input-only"], inputClassName)

  const inputElement =
    type === "date" ? (
      <DateInputField
        name={name}
        disabled={disabled}
        className={mergedInputClassName}
        {...inputProps}
      />
    ) : (
      <Input
        type={type}
        name={name}
        disabled={disabled}
        className={mergedInputClassName}
        {...inputProps}
      />
    )

  return (
    <div className={clsx(styles.field, className)} {...props}>
      {label ? (
        <Label text={label} className={styles.label}>
          {inputElement}
        </Label>
      ) : (
        inputElement
      )}
    </div>
  )
}
