const BASE_URL = process.env.NEST_API_URL

if (!BASE_URL) {
  throw new Error("API_BASE_URL is not set")
}
export async function signup(email: string, password: string) {
  const res = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error("Failed to signup")
  return res.json()
}

export async function setPeriodLogEndDate(
  id: string,
  endDate: string,
): Promise<void> {
  const res = await fetch(`/api/period-logs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ endDate }),
  })
  if (!res.ok) throw new Error("Failed to set period log end date")
}

export async function removePeriodLog(id: string): Promise<void> {
  const res = await fetch(`/api/period-logs/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to remove period log")
}

