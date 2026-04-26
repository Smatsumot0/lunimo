import { ShieldX } from "lucide-react"
import { Message } from "./Message"

export type ErrorMessageProps = {
  text: string
}

export function ErrorMessage({ text }: ErrorMessageProps) {
  return <Message variant="error" text={text} icon={<ShieldX />} />
}

