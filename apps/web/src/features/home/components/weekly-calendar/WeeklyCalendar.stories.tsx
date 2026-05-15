import type { Meta, StoryObj } from "@storybook/nextjs"
import { WeeklyCalendar } from "./WeeklyCalendar"

const meta = {
  title: "Features/Home/WeeklyCalendar",
  component: WeeklyCalendar,
} satisfies Meta<typeof WeeklyCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
