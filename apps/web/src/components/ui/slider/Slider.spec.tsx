import { describe, expect, it, jest } from "@jest/globals"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { Slider } from "./Slider"
import styles from "./Slider.module.css"

describe("Slider", () => {
  it("renders variable steps from a number", () => {
    render(<Slider ariaLabel="体調" steps={5} value={2} />)

    const slider = screen.getByRole("slider", { name: "体調" })

    expect(slider).toHaveAttribute("min", "0")
    expect(slider).toHaveAttribute("max", "4")
    expect(slider).toHaveValue("2")
  })

  it("renders labels when step labels are provided", () => {
    render(
      <Slider
        steps={[{ label: "低い" }, { label: "普通" }, { label: "高い" }]}
        value={1}
      />,
    )

    const labels = screen.getByRole("list")

    expect(within(labels).getAllByRole("listitem")).toHaveLength(3)
    expect(screen.getByText("普通")).toBeInTheDocument()
  })

  it("notifies the selected step", () => {
    const handleChange = jest.fn()

    render(<Slider steps={4} value={0} onChange={handleChange} />)

    fireEvent.change(screen.getByRole("slider"), { target: { value: "3" } })

    expect(handleChange).toHaveBeenCalledWith(3)
  })

  it("clamps values outside the available steps", () => {
    render(<Slider steps={3} value={10} />)

    expect(screen.getByRole("slider")).toHaveValue("2")
    expect(document.querySelectorAll(`.${styles.activeTick}`)).toHaveLength(3)
  })
})
