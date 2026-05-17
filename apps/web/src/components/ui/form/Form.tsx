import { Button, ErrorMessage, type ButtonProps } from "@/components"
import { Field, FieldProps } from "./Field"
import styles from "./Form.module.css"
import clsx from "clsx"

export type FormButtonProps = {
  label: string
} & Omit<ButtonProps, "children">

export type FormProps = {
  direction?: "vertical" | "horizontal"
  disabled?: boolean
  error?: string | null
  fields: FieldProps[]
  submitProps?: FormButtonProps
  cancelProps?: FormButtonProps
  onSubmit?: () => void
  onCancel?: () => void
} & Omit<React.ComponentProps<"form">, "onSubmit">

export function Form({
  direction = "vertical",
  disabled,
  error,
  fields,
  submitProps,
  cancelProps,
  onSubmit,
  onCancel,
  className,
  ...props
}: FormProps) {
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    onSubmit?.()
  }

  function handleCancel() {
    onCancel?.()
  }

  const isHorizontal = direction === "horizontal"

  function renderButton(
    { label, ...buttonProps }: FormButtonProps,
    extraProps: ButtonProps = {},
  ) {
    return (
      <Button disabled={disabled} {...buttonProps} {...extraProps}>
        {label}
      </Button>
    )
  }

  return (
    <div className={styles.root}>
      <form className={clsx(styles.form, className)} onSubmit={handleSubmit} {...props}>
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
              {renderButton(submitProps, { type: "submit" })}
              {cancelProps && (
                renderButton(cancelProps, { onClick: handleCancel })
              )}
            </div>
          )}
        </div>
      </form>
      {error && <ErrorMessage text={error} />}
    </div>
  )
}
