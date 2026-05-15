"use client"

import { FieldProps, Form } from "@/components"
import { requestPasswordReset } from "@/lib/api"
import Link from "next/link"
import { useState } from "react"
import styles from "../LoginScreen.module.css"

type PasswordResetResponse = {
  ok: true
  resetToken?: string
}

export function PasswordResetRequestForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resetToken, setResetToken] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const fields: FieldProps[] = [
    {
      label: "メール",
      name: "email",
      inputProps: {
        value: email,
        onChange: setEmail,
      },
    },
  ]

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    setSubmitted(false)
    setResetToken(null)

    try {
      const result = (await requestPasswordReset(email)) as PasswordResetResponse
      setResetToken(result.resetToken ?? null)
      setSubmitted(true)
    } catch {
      setError("リセットリンクを発行できませんでした。")
    } finally {
      setLoading(false)
    }
  }

  const resetHref = resetToken
    ? `/password-reset/confirm?token=${encodeURIComponent(resetToken)}`
    : null

  return (
    <div className={styles.stack}>
      <Form
        disabled={loading}
        error={error}
        fields={fields}
        submitProps={{
          label: "リセットリンクを発行",
          style: {
            width: "100%",
          },
        }}
        onSubmit={handleSubmit}
      />
      {submitted && (
        <p className={styles.note}>
          {resetHref ? (
            <Link href={resetHref}>新しいパスワードを設定</Link>
          ) : (
            "入力されたメールアドレスを確認しました。"
          )}
        </p>
      )}
    </div>
  )
}
