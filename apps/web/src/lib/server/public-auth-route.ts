import { NextResponse } from "next/server"

export async function proxyPublicAuthRequest(request: Request, path: string) {
  const baseUrl = process.env.NEST_API_URL
  if (!baseUrl) {
    return NextResponse.json({ message: "NEST_API_URL is not set" }, { status: 500 })
  }

  const body = await request.json()
  const response = await fetch(new URL(`/api/auth/${path}`, baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const text = await response.text()
  const contentType = response.headers.get("content-type") ?? ""
  const payload =
    contentType.includes("application/json") && text ? JSON.parse(text) : text

  return NextResponse.json(payload, { status: response.status })
}
