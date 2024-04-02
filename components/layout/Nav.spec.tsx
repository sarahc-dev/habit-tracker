import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Nav from "./Nav"

let MockReturn: boolean | undefined

jest.mock("../../hooks/use-media-query", () => ({
  useMediaQuery: () => MockReturn,
}))

describe("<Nav />", () => {
  it("displays the hamburger menu button at small screens", () => {
    MockReturn = false
    render(<Nav />)
    expect(screen.getByTestId("hamburger-menu")).toBeVisible()
  })

  it("clicks the button and opens the menu", () => {
    MockReturn = false
    render(<Nav />)
    expect(screen.queryByText("Home")).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("Home")).toBeVisible()
    expect(screen.getByText("Login")).toBeVisible()
    expect(screen.getByText("Signup")).toBeVisible()
  })

  it("displays the nav list at large screens", () => {
    MockReturn = true
    render(<Nav />)
    expect(screen.getByText("Home")).toBeVisible()
    expect(screen.getByText("Login")).toBeVisible()
    expect(screen.getByText("Signup")).toBeVisible()
    expect(screen.queryByTestId("hamburger-menu")).not.toBeInTheDocument()
  })
})
