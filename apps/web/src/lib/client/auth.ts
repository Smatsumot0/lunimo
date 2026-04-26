export async function login(email: string, password: string) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error("Failed to login")
  return res.json()
}

export async function me() {
  const res = await fetch(`/api/auth/me`, {
    cache: "no-store",
    credentials: "include",
  })
  if (!res.ok) return null
  return res.json()
}

export async function logout() {
  const res = await fetch(`/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to logout")
}

