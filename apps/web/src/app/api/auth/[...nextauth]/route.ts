import { loginResponseSchema, tokenSchema } from "@/types"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import z from "zod"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials)
        if (!parsedCredentials.success) {
          console.warn("[auth] invalid credentials shape")
          return null
        }

        const { email, password } = parsedCredentials.data
        console.info("[auth] try:login:", { email })

        // ログイン
        const loginRes = await fetch(
          `${process.env.NEST_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          },
        )
        console.info("[auth] login status:", loginRes.status)
        if (!loginRes.ok) {
          const text = await loginRes.text().catch(() => "")
          console.warn("[auth] login failed body:", text.slice(0, 300))
          return null
        }

        // ZODで型を確定
        const loginJson = await loginRes.json()

        const parsedLogin = loginResponseSchema.safeParse(loginJson)
        if (!parsedLogin.success) {
          console.warn(
            "[auth] login response invalid:",
            parsedLogin.error.flatten(),
          )
          return null
        }

        return {
          ...parsedLogin.data.user,
          accessToken: parsedLogin.data.accessToken,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.user = { id: user.id, email: user.email!, name: null }
      }
      return token
    },
    async session({ session, token }) {
      const parsed = tokenSchema.safeParse(token)
      if (!parsed.success) return session
      session.accessToken = token.accessToken
      session.user = parsed.data.user
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

