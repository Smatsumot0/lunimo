"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

export function useLogin() {
  const router = useRouter()
  // const [email, setEmail] = useState<string | null>(null)
  // const [password, setPassword] = useState<string | null>(null)
  const [email, setEmail] = useState("test1@lumino.local")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (!result || result.error) {
      setError("メールアドレスまたはパスワードが違います。")
      router.replace("/login")
      return
    }

    router.push("/home")
    router.refresh()
  }

  function handleChangeMail(value: string) {
    setEmail(value)
  }

  function handleChangePassword(value: string) {
    setPassword(value)
  }

  return {
    email,
    handleChangeMail,
    password,
    handleChangePassword,
    loading,
    error,
    handleSubmit,
  }
}

