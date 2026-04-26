import { LoginScreen } from "@/features/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const token = (await cookies()).get("access_token")?.value
  if (token) redirect("/home")
  return <LoginScreen />
}

