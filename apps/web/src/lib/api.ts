export async function signup(email: string, password: string) {
  const res = await fetch(`/api/account/signup`, {
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

export async function requestPasswordReset(email: string) {
  const res = await fetch(`/api/account/password-reset/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) throw new Error("Failed to request password reset")
  return res.json()
}

export async function confirmPasswordReset(token: string, password: string) {
  const res = await fetch(`/api/account/password-reset/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, password }),
  })
  if (!res.ok) throw new Error("Failed to reset password")
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

