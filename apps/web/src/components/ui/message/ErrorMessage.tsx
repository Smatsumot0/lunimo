import { ShieldXIcon } from "@/components"
import { Message } from "./Message"

export type ErrorMessageProps = {
  text: string
} & React.ComponentProps<"div">

export function ErrorMessage({ text, ...props }: ErrorMessageProps) {
  return <Message variant="error" text={text} icon={<ShieldXIcon />} {...props} />
}

