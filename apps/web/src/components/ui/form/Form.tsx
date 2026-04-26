import { Button, ErrorMessage } from "@/components"
import { Field, FieldProps } from "./Field"
import styles from "./Form.module.css"
import clsx from "clsx"

export type FormButtonProps = {
  label: string
  style?: React.CSSProperties
}

export type FormProps = {
  direction?: "vertical" | "horizontal"
  disabled?: boolean
  error?: string | null
  fields: FieldProps[]
  submitProps?: FormButtonProps
  cancelProps?: FormButtonProps
  onSubmit?: () => void
  onCancel?: () => void
}

export function Form({
  direction = "vertical",
  disabled,
  error,
  fields,
  submitProps,
  cancelProps,
  onSubmit,
  onCancel,
}: FormProps) {
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    onSubmit?.()
  }

  function handleCancel() {
    onCancel?.()
  }

  const isHorizontal = direction === "horizontal"

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={clsx(styles.body, isHorizontal && styles["horizontal-body"])}>
          <div
            className={clsx(styles.fields, isHorizontal && styles["horizontal-fields"])}
          >
            {fields.map((item) => (
              <Field key={item.name} disabled={disabled} {...item} />
            ))}
          </div>
          {submitProps && (
            <div className={styles.actions}>
              <Button type="submit" disabled={disabled} {...submitProps}>
                {submitProps.label}
              </Button>
              {cancelProps && (
                <Button disabled={disabled} onClick={handleCancel} {...cancelProps}>
                  {cancelProps.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </form>
      {error && <ErrorMessage text={error} />}
    </div>
  )
}
