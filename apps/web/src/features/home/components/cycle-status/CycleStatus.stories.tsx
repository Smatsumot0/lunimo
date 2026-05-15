import type { Meta, StoryObj } from "@storybook/nextjs"
import { PeriodLog } from "@/lib"
import { CycleStatus } from "./CycleStatus"

const logs: PeriodLog[] = [
  createLog("1", "2026-02-21"),
  createLog("2", "2026-03-21"),
  createLog("3", "2026-04-18"),
]

function createLog(id: string, startDate: string): PeriodLog {
  return {
    id,
    userId: "storybook-user",
    startDate,
    endDate: null,
    createdAt: `${startDate}T00:00:00.000Z`,
    updatedAt: `${startDate}T00:00:00.000Z`,
  }
}

const meta = {
  title: "Features/Home/CycleStatus",
  component: CycleStatus,
  args: {
    logs,
  },
} satisfies Meta<typeof CycleStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoHistory: Story = {
  args: {
    logs: [],
  },
}
