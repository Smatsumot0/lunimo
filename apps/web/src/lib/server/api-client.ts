import "server-only"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const BASE_URL = process.env.NEST_API_URL
if (!BASE_URL) throw new Error("API_BASE_URL is not set")

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE"

type ApiRequestOptions<TBody> = {
  method?: HttpMethod
  path: string
  body?: TBody
  headers?: Record<string, string>
  fetchOptions?: Omit<RequestInit, "method" | "headers" | "body">
  auth?: boolean
}

async function getAccessToken() {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  if (!token) throw new Error("Unauthorized: no session")
  return token
}

function buildUrl(path: string) {
  const normalized = path.replace(/^\/+/, "")
  return new URL(`api/${normalized}`, BASE_URL)
}

export async function request<TResponse = unknown, TBody = unknown>(
  options: ApiRequestOptions<TBody>,
): Promise<TResponse> {
  const {
    method = "GET",
    path,
    body,
    headers,
    fetchOptions,
    auth = true,
  } = options

  const token = auth ? await getAccessToken() : undefined
  const url = buildUrl(path)

  const res = await fetch(url, {
    method,
    cache: "no-store",
    ...fetchOptions,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}\n${text}`)
  }

  // 204 No Content
  if (res.status === 204) return undefined as TResponse

  const contentType = res.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    return (await res.json()) as TResponse
  }

  return (await res.text()) as TResponse
}

export function isFetchFailedError(error: unknown) {
  return error instanceof TypeError && error.message === "fetch failed"
}

export const api = {
  get<TResponse>(
    path: string,
    options?: Omit<ApiRequestOptions<never>, "path" | "method" | "body">,
  ) {
    return request<TResponse>({ method: "GET", path, ...options })
  },
  post<TResponse, TBody>(
    path: string,
    body: TBody,
    options?: Omit<ApiRequestOptions<never>, "path" | "method" | "body">,
  ) {
    return request<TResponse, TBody>({ method: "POST", path, body, ...options })
  },
  patch<TResponse, TBody>(
    path: string,
    body: TBody,
    options?: Omit<ApiRequestOptions<never>, "path" | "method" | "body">,
  ) {
    return request<TResponse, TBody>({
      method: "PATCH",
      path,
      body,
      ...options,
    })
  },
  delete<TResponse>(
    path: string,
    options?: Omit<ApiRequestOptions<never>, "path" | "method" | "body">,
  ) {
    return request<TResponse>({ method: "DELETE", path, ...options })
  },
}

