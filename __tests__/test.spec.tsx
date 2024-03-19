import { render, screen } from "@testing-library/react"
import Button from "../components/Button"

describe("test", () => {
  it("tests", () => {
    expect(true).toBe(true)
  })

  it("tests a component", () => {
    render(<Button />)
    expect(screen.getByRole("button")).toHaveTextContent("A button")
  })
})
