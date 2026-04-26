"use client"
import { FieldProps, Form } from "@/components"
import { useLogin } from "../hooks/useLogin"

export function LoginForm() {
  const {
    email,
    handleChangeMail,
    password,
    handleChangePassword,
    loading,
    error,
    handleSubmit,
  } = useLogin()

  const fields: FieldProps[] = [
    {
      label: "メール",
      name: "email",
      inputProps: {
        value: email,
        onChange: handleChangeMail,
      },
    },
    {
      label: "パスワード",
      name: "password",
      type: "password",
      inputProps: {
        value: password,
        onChange: handleChangePassword,
      },
    },
  ]

  const submitProps = {
    label: "ログイン",
    style: {
      width: "100%",
    },
  }

  return (
    <Form
      disabled={loading}
      error={error ?? ""}
      fields={fields}
      submitProps={submitProps}
      onSubmit={handleSubmit}
    />
  )
}

