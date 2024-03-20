import React from "react"
import "@testing-library/jest-dom"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import LoginForm from "./LoginForm"

// eslint-disable-next-line react/display-name
jest.mock("./SubmitButton", () => () => {
  return (
    <button type="submit" data-testid="mock">
      Mock Submit
    </button>
  )
})

jest.mock("../../actions/login", () => ({
  __esModule: true,
  loginUser: jest.fn(),
}))

describe("<LoginForm />", () => {
  it("displays correct error messages if nothing submitted", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />)

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      const emailInput = getByPlaceholderText("Email")
      const emailError = getByText("Invalid email address")
      expect(emailInput.nextSibling).toBe(emailError)

      const passwordInput = getByPlaceholderText("Password")
      const noPasswordError = getByText("Password is required")
      expect(passwordInput.nextSibling).toBe(noPasswordError)
    })
  })

  it("displays error if invalid email entered", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />)

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "example" },
    })

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument()
    })
  })
})
