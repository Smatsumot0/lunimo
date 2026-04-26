import { DefaultSession } from "next-auth"
import { ApiUser } from "./auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ApiUser
    accessToken: string
  }

  interface User extends ApiUser {
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: ApiUser
    accessToken: string
  }
}

