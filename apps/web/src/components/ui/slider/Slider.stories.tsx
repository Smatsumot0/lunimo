import type { Meta, StoryObj } from "@storybook/nextjs"
import { useState } from "react"
import { Slider } from "./Slider"

const meta = {
  title: "UI/Slider",
  component: Slider,
  args: {
    steps: 5,
    value: 2,
    ariaLabel: "段階スライダー",
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabels: Story = {
  args: {
    steps: [
      { label: "少ない" },
      { label: "やや少ない" },
      { label: "普通" },
      { label: "やや多い" },
      { label: "多い" },
    ],
    value: 2,
  },
}

function InteractiveSlider(args: React.ComponentProps<typeof Slider>) {
  const [value, setValue] = useState(args.value)

  return <Slider {...args} value={value} onChange={setValue} />
}

export const Interactive: Story = {
  render: (args) => <InteractiveSlider {...args} />,
}
