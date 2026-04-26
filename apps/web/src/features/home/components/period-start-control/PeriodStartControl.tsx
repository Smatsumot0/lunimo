"use client"
import { FieldProps, Form, FormButtonProps } from "@/components"
import { usePeriodStartControl } from "./hooks/usePeriodStartControl"

export function PeriodStartControl() {
  const { startDate, submitStartDate, changeStartDate, error, loading } =
    usePeriodStartControl()

  const submitProps: FormButtonProps = {
    label: "開始",
  }

  const fields: FieldProps[] = [
    {
      name: "startDate",
      type: "date",
      inputProps: {
        value: startDate,
        onChange: changeStartDate,
      },
    },
  ]

  return (
    <section>
      <Form
        direction="horizontal"
        disabled={loading}
        fields={fields}
        error={error}
        submitProps={submitProps}
        onSubmit={submitStartDate}
      />
    </section>
  )
}
