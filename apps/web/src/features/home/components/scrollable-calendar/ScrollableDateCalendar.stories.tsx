import type { Meta, StoryObj } from "@storybook/nextjs"
import { ScrollableDateCalendar } from "./ScrollableDateCalendar"

const meta = {
  title: "Features/Home/ScrollableDateCalendar",
  component: ScrollableDateCalendar,
} satisfies Meta<typeof ScrollableDateCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
