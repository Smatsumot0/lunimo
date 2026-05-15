import { proxyPublicAuthRequest } from "@/lib/server/public-auth-route"

export async function POST(request: Request) {
  return proxyPublicAuthRequest(request, "password-reset/confirm")
}
