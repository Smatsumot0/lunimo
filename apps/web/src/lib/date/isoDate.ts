export function formatDisplay(value?: string | null) {
  if (!value) return ""
  const date = new Date(value)
  return date.toLocaleDateString("ja-JP")
}

export function toISODate(date: Date | undefined) {
  if (!date) return ""

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function fromISODate(value?: string | null) {
  if (!value) return undefined
  return new Date(value)
}
