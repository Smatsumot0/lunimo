import { Form, Popover } from "@/components"
import { PeriodLog } from "@/lib"
import { FieldProps } from "@/components"
import { CycleLogPatch } from "./hooks/useCycleHistory"

export type CycleLogDetailPopoverPops = {
  log: PeriodLog | null
  open: boolean
  loading: boolean
  error: string | null
  onRequestClose: () => void
  onEdit: (patch: CycleLogPatch) => void
}

export function CycleLogDetailPopover({
  log,
  loading,
  error,
  onEdit,
  ...props
}: CycleLogDetailPopoverPops) {
  function handleChangeStartDate(value: string) {
    onEdit({ startDate: value })
  }

  function handleChangeEndDate(value: string) {
    onEdit({ endDate: value })
  }

  const fields: FieldProps[] = [
    {
      label: "開始日",
      name: "startDate",
      inputProps: {
        value: log?.startDate,
        onChange: handleChangeStartDate,
      },
    },
    {
      label: "終了日",
      name: "endDate",
      inputProps: {
        value: log?.endDate,
        onChange: handleChangeEndDate,
      },
    },
  ]

  return (
    <Popover ariaLabel="cycle-history-form" {...props}>
      <Form disabled={loading} error={error} fields={fields} />
    </Popover>
  )
}
