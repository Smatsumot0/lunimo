"use client"

import { FieldProps, Form } from "@/components"
import { confirmPasswordReset } from "@/lib/api"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

type ResetResponse = {
  user?: {
    email?: string
  }
}

export function PasswordResetConfirmForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialToken = useMemo(() => searchParams.get("token") ?? "", [searchParams])
  const [token, setToken] = useState(initialToken)
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fields: FieldProps[] = [
    {
      label: "リセットトークン",
      name: "token",
      inputProps: {
        value: token,
        onChange: setToken,
      },
    },
    {
      label: "新しいパスワード",
      name: "password",
      type: "password",
      inputProps: {
        value: password,
        onChange: setPassword,
      },
    },
    {
      label: "新しいパスワード確認",
      name: "passwordConfirm",
      type: "password",
      inputProps: {
        value: passwordConfirm,
        onChange: setPasswordConfirm,
      },
    },
  ]

  async function handleSubmit() {
    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください。")
      return
    }

    if (password !== passwordConfirm) {
      setError("パスワードが一致しません。")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = (await confirmPasswordReset(token, password)) as ResetResponse
      const email = result.user?.email

      if (!email) {
        router.push("/login")
        return
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (!signInResult || signInResult.error) {
        router.push("/login")
        return
      }

      router.push("/home")
      router.refresh()
    } catch {
      setError("リセットトークンが無効、または期限切れです。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      disabled={loading}
      error={error}
      fields={fields}
      submitProps={{
        label: "パスワードを変更",
        style: {
          width: "100%",
        },
      }}
      onSubmit={handleSubmit}
    />
  )
}
