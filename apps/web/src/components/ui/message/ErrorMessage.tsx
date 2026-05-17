import { ShieldX } from "lucide-react"
import { Message } from "./Message"

export type ErrorMessageProps = {
  text: string
} & React.ComponentProps<"div">

export function ErrorMessage({ text, ...props }: ErrorMessageProps) {
  return <Message variant="error" text={text} icon={<ShieldX />} {...props} />
}

