"use client"

import { FieldProps, Form } from "@/components"
import { signup } from "@/lib/api"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fields: FieldProps[] = [
    {
      label: "メール",
      name: "email",
      inputProps: {
        value: email,
        onChange: setEmail,
      },
    },
    {
      label: "パスワード",
      name: "password",
      type: "password",
      inputProps: {
        value: password,
        onChange: setPassword,
      },
    },
    {
      label: "パスワード確認",
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
      await signup(email, password)
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (!result || result.error) {
        router.push("/login")
        return
      }

      router.push("/home")
      router.refresh()
    } catch {
      setError("会員登録できませんでした。メールアドレスを確認してください。")
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
        label: "登録する",
        style: {
          width: "100%",
        },
      }}
      onSubmit={handleSubmit}
    />
  )
}
